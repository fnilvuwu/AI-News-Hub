import { fetchAINews, transformNewsAPIArticle } from '@/lib/newsapi'
import { NewsResponse } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const search = searchParams.get('search')
        const limit = parseInt(searchParams.get('limit') || '20')
        // Prepare for pagination implementation
        const page = parseInt(searchParams.get('page') || '1')

        // Fetch AI news from NewsAPI
        const newsData = await fetchAINews()

        // Transform articles to our format and filter out invalid ones
        let articles = newsData.articles
            .filter(article =>
                article.title &&
                article.description &&
                article.title !== '[Removed]' &&
                article.description !== '[Removed]' &&
                // Additional AI content filtering
                isAIRelated(article.title, article.description)
            )
            .map((article, index) => transformNewsAPIArticle(article, index))

        // Sort by published date to ensure consistent ordering for pagination
        articles = articles.sort((a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )

        // Filter by search query if provided
        if (search && search.trim()) {
            const searchLower = search.toLowerCase()
            articles = articles.filter(article =>
                article.headline.toLowerCase().includes(searchLower) ||
                article.summary.toLowerCase().includes(searchLower)
            )
        }

        // Apply pagination offset (ready for pagination implementation)
        const offset = (page - 1) * limit
        const totalResults = articles.length
        articles = articles.slice(offset, offset + limit)

        const response: NewsResponse = {
            articles,
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
}// Enable CORS for local development
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
