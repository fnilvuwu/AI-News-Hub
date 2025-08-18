import { fetchAINews, transformNewsAPIArticle } from '@/lib/newsapi'
import { NewsResponse } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const search = searchParams.get('search')
        const limit = parseInt(searchParams.get('limit') || '20')

        // Fetch news from NewsAPI
        const newsData = await fetchAINews()

        // Transform articles to our format
        let articles = newsData.articles
            .filter(article =>
                article.title &&
                article.description &&
                article.title !== '[Removed]' &&
                article.description !== '[Removed]'
            )
            .map((article, index) => transformNewsAPIArticle(article, index))

        // Filter by search query if provided
        if (search && search.trim()) {
            const searchLower = search.toLowerCase()
            articles = articles.filter(article =>
                article.headline.toLowerCase().includes(searchLower) ||
                article.category.toLowerCase().includes(searchLower) ||
                article.summary.toLowerCase().includes(searchLower)
            )
        }

        // Limit results
        articles = articles.slice(0, limit)

        const response: NewsResponse = {
            articles,
            totalResults: articles.length,
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
