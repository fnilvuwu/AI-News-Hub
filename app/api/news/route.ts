import { fetchAINews, transformNewsAPIArticle } from '@/lib/newsapi'
import { NewsResponse } from '@/lib/types'
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

        // Fetch AI news from NewsAPI
        const newsData = await fetchAINews()
        console.log('📰 Raw NewsAPI Response:', {
            totalArticles: newsData.articles.length,
            status: newsData.status
        })

        // Transform articles to our format and filter out invalid ones
        const initialCount = newsData.articles.length
        let filteredCount = 0
        let aiFilteredCount = 0

        let articles = newsData.articles
            .filter(article => {
                const isValid = article.title &&
                    article.description &&
                    article.title !== '[Removed]' &&
                    article.description !== '[Removed]'

                if (isValid) filteredCount++
                return isValid
            })
            .filter(article => {
                const isAI = isAIRelated(article.title, article.description)
                if (isAI) aiFilteredCount++
                return isAI
            })
            .map((article, index) => transformNewsAPIArticle(article, index))

        console.log('🔄 Filtering process:', {
            initialCount,
            afterValidityFilter: filteredCount,
            afterAIFilter: aiFilteredCount,
            finalCount: articles.length,
            removedByValidity: initialCount - filteredCount,
            removedByAIFilter: filteredCount - aiFilteredCount
        })

        console.log('🔄 After filtering and transformation:', {
            filteredArticles: articles.length,
            originalCount: newsData.articles.length
        })

        // Sort by published date to ensure consistent ordering for pagination
        articles = articles.sort((a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )

        // Filter by search query if provided
        if (search && search.trim()) {
            const searchLower = search.toLowerCase()
            const beforeSearchFilter = articles.length
            articles = articles.filter(article =>
                article.headline.toLowerCase().includes(searchLower) ||
                article.summary.toLowerCase().includes(searchLower)
            )
            console.log('🔎 Search filtering:', {
                searchQuery: search,
                beforeFilter: beforeSearchFilter,
                afterFilter: articles.length
            })
        }

        // Calculate pagination offset
        // For search queries: 18 articles per page (no featured article)
        // For regular browsing:
        //   Page 1: 0-18 (19 articles including featured)
        //   Page 2: 19-36 (18 articles)
        //   Page 3: 37-54 (18 articles), etc.
        let offset: number
        if (search && search.trim()) {
            // Search results: 18 articles per page, no featured article
            offset = (page - 1) * 18
        } else {
            // Regular browsing with featured article on first page
            if (page === 1) {
                offset = 0
            } else {
                offset = 19 + (page - 2) * 18
            }
        }

        console.log('📄 Pagination calculation:', {
            page,
            limit,
            offset,
            totalAvailable: articles.length,
            requestedEnd: offset + limit,
            willGetArticles: Math.min(limit, Math.max(0, articles.length - offset))
        })

        const totalResults = articles.length
        const paginatedArticles = articles.slice(offset, offset + limit)

        console.log('📋 Articles at pagination boundaries:', {
            articleTitles: paginatedArticles.map((article, idx) => ({
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
