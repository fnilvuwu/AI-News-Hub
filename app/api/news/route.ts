import { GuardianAPI } from '@/lib/guardianapi'
import { fetchAINews, transformNewsAPIArticle } from '@/lib/newsapi'
import { Article, NewsResponse } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const search = searchParams.get('search')
        const page = parseInt(searchParams.get('page') || '1')

        // Determine limit based on whether it's a search or regular browsing
        let limit: number
        if (search && search.trim()) {
            // Search results: always 18 articles per page
            limit = 18
        } else {
            // Regular browsing: 19 for first page, 18 for subsequent pages
            limit = page === 1 ? 19 : 18
        }

        console.log('🔍 API Request Details:', {
            search,
            limit,
            page,
            timestamp: new Date().toISOString()
        })

        // Initialize all articles array
        let allArticles: Article[] = []

        // Calculate how many articles we need total (for proper multi-source pagination)
        const articlesNeeded = page * 18

        // Fetch from NewsAPI - get more articles for later pages
        try {
            const newsData = await fetchAINews()
            console.log('📰 Raw NewsAPI Response:', {
                totalArticles: newsData.articles.length,
                status: newsData.status
            })

            // Transform and filter NewsAPI articles
            const newsAPIArticles = newsData.articles
                .filter(article => {
                    return article.title &&
                        article.description &&
                        article.title !== '[Removed]' &&
                        article.description !== '[Removed]'
                })
                .filter(article => isAIRelated(article.title, article.description))
                .map((article, index) => transformNewsAPIArticle(article, index))

            allArticles.push(...newsAPIArticles)
            console.log('✅ NewsAPI articles:', newsAPIArticles.length)

            // Log first few NewsAPI articles to check dates
            if (newsAPIArticles.length > 0) {
                console.log('📰 First 3 NewsAPI articles:')
                newsAPIArticles.slice(0, 3).forEach((article, i) => {
                    console.log(`${i + 1}. [${article.source}] ${article.publishedAt} - ${article.headline.substring(0, 50)}...`)
                })
            }
        } catch (error) {
            console.error('❌ NewsAPI failed:', error)
        }

        // Fetch from The Guardian API - get more articles for later pages
        try {
            const guardianApiKey = process.env.GUARDIAN_API_KEY
            if (guardianApiKey) {
                const guardianAPI = new GuardianAPI(guardianApiKey)

                // Fetch multiple pages from Guardian to ensure we have enough articles
                const pagesToFetch = Math.min(3, Math.ceil(articlesNeeded / 20)) // Guardian returns 20 per page
                console.log(`🔍 Fetching ${pagesToFetch} pages from Guardian API for page ${page}`)

                for (let guardianPage = 1; guardianPage <= pagesToFetch; guardianPage++) {
                    const guardianData = await guardianAPI.searchArticles({
                        q: search || undefined,
                        pageSize: 20,
                        page: guardianPage,
                        orderBy: 'newest'
                    })

                    const guardianArticles = guardianData.response.results
                        .map((article, index) => guardianAPI.transformArticle(article, allArticles.length + index))

                    allArticles.push(...guardianArticles)
                    console.log(`✅ Guardian articles (page ${guardianPage}):`, guardianArticles.length)
                }

                // Log first few Guardian articles to check dates
                const allGuardianArticles = allArticles.filter(a => a.source === 'The Guardian')
                if (allGuardianArticles.length > 0) {
                    console.log('🏛️ First 3 Guardian articles:')
                    allGuardianArticles.slice(0, 3).forEach((article, i) => {
                        console.log(`${i + 1}. [${article.source}] ${article.publishedAt} - ${article.headline.substring(0, 50)}...`)
                    })
                }
            } else {
                console.log('⚠️ Guardian API key not configured, skipping')
            }
        } catch (error) {
            console.error('❌ Guardian API failed:', error)
        } console.log('🔄 Combined articles from all sources:', {
            totalArticles: allArticles.length,
            sources: [...new Set(allArticles.map(a => a.source))].filter(Boolean)
        })

        // Deduplicate articles by URL to prevent duplicates from different sources
        const seenUrls = new Set<string>()
        allArticles = allArticles.filter(article => {
            if (seenUrls.has(article.link)) {
                return false
            }
            seenUrls.add(article.link)
            return true
        })

        console.log('🔄 After deduplication:', {
            totalArticles: allArticles.length,
            duplicatesRemoved: seenUrls.size - allArticles.length
        })

        // Sort by published date to ensure consistent ordering for pagination
        allArticles = allArticles.sort((a: Article, b: Article) => {
            const dateA = new Date(a.publishedAt).getTime()
            const dateB = new Date(b.publishedAt).getTime()
            return dateB - dateA // Newest first
        })

        // Log first few articles to verify sorting
        console.log('📅 Top 5 articles after sorting:')
        allArticles.slice(0, 5).forEach((article, i) => {
            console.log(`${i + 1}. [${article.source}] ${article.publishedAt} - ${article.headline.substring(0, 50)}...`)
        })

        // Filter by search query if provided
        if (search && search.trim()) {
            const searchLower = search.toLowerCase()
            const beforeSearchFilter = allArticles.length
            allArticles = allArticles.filter((article: Article) =>
                article.headline.toLowerCase().includes(searchLower) ||
                article.summary.toLowerCase().includes(searchLower)
            )
            console.log('🔎 Search filtering:', {
                searchQuery: search,
                beforeFilter: beforeSearchFilter,
                afterFilter: allArticles.length
            })
        }

        // Calculate pagination offset - 18 articles per page for all cases
        const offset = (page - 1) * 18

        console.log('📄 Pagination calculation:', {
            page,
            limit,
            offset,
            totalAvailable: allArticles.length,
            requestedEnd: offset + limit,
            willGetArticles: Math.min(limit, Math.max(0, allArticles.length - offset))
        })

        const totalResults = allArticles.length
        const paginatedArticles = allArticles.slice(offset, offset + limit)

        console.log('📋 Articles at pagination boundaries:', {
            articleTitles: paginatedArticles.map((article: Article, idx: number) => ({
                index: offset + idx,
                title: article.headline.substring(0, 50) + '...'
            }))
        })

        console.log('✅ Final response:', {
            returnedArticles: paginatedArticles.length,
            totalResults,
            hasMore: offset + limit < totalResults,
            nextPageWouldStart: offset + limit
        })

        const response: NewsResponse = {
            articles: paginatedArticles,
            totalResults,
            status: 'ok'
        }

        return NextResponse.json(response)
    } catch (error) {
        console.error('Error fetching news:', error)

        return NextResponse.json(
            {
                error: 'Failed to fetch news',
                message: error instanceof Error ? error.message : 'Unknown error',
                articles: [],
                totalResults: 0,
                status: 'error'
            },
            { status: 500 }
        )
    }
}

// Helper function to ensure articles are AI-related
function isAIRelated(title: string, description: string | null): boolean {
    const content = `${title} ${description || ''}`.toLowerCase()
    const aiKeywords = [
        'artificial intelligence', 'machine learning', 'deep learning', 'neural network',
        'ai ', ' ai', 'openai', 'chatgpt', 'gpt', 'llm', 'language model',
        'computer vision', 'natural language processing', 'nlp',
        'robotics', 'automation', 'algorithm', 'data science',
        'tensorflow', 'pytorch', 'transformer', 'bert', 'claude',
        'anthropic', 'google ai', 'microsoft ai', 'meta ai'
    ]

    return aiKeywords.some(keyword => content.includes(keyword))
}

// Enable CORS for local development
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    })
}
