import { Article, NewsAPIArticle, NewsAPIResponse } from './types'

// Calculate estimated read time based on content length
function calculateReadTime(content: string | null, description: string | null): string {
    const text = (content || description || '').replace(/<[^>]*>/g, '') // Remove HTML tags
    const wordsPerMinute = 200
    const wordCount = text.split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${Math.max(1, minutes)} min read`
}

// Generate random view count for demo purposes
function generateViewCount(): string {
    const views = Math.floor(Math.random() * 50000) + 1000
    if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
}

// Format timestamp to relative time
function formatTimestamp(publishedAt: string): string {
    const now = new Date()
    const published = new Date(publishedAt)
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
        return 'Just now'
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    } else {
        const diffInDays = Math.floor(diffInHours / 24)
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    }
}

// Convert NewsAPI article to our Article format
export function transformNewsAPIArticle(article: NewsAPIArticle, index: number): Article {
    return {
        id: `${Date.now()}-${index}`,
        headline: article.title,
        link: article.url,
        timestamp: formatTimestamp(article.publishedAt),
        summary: article.description || 'No description available',
        image: article.urlToImage,
        readTime: calculateReadTime(article.content, article.description),
        views: generateViewCount(),
        featured: index === 0, // Make first article featured
        author: article.author || undefined,
        publishedAt: article.publishedAt
    }
}

// Fetch AI-specific news from NewsAPI
export async function fetchAINews(): Promise<NewsAPIResponse> {
    const apiKey = process.env.NEWSAPI_API_KEY

    if (!apiKey) {
        throw new Error('NewsAPI key is not configured')
    }

    // Use specific AI keywords for consistent AI-focused results
    const aiKeywords = [
        'artificial intelligence',
        'machine learning',
        'deep learning',
        'neural networks',
        'AI technology',
        'OpenAI',
        'ChatGPT',
        'GPT',
        'large language model',
        'LLM',
        'computer vision',
        'natural language processing',
        'robotics AI',
        'AI research'
    ].join(' OR ')

    const url = new URL('https://newsapi.org/v2/everything')
    url.searchParams.append('q', aiKeywords)
    url.searchParams.append('language', 'en')
    url.searchParams.append('sortBy', 'publishedAt') // Consistent sorting for pagination
    url.searchParams.append('pageSize', '50')
    url.searchParams.append('apiKey', apiKey)

    const response = await fetch(url.toString(), {
        headers: {
            'User-Agent': 'AI-News-Hub/1.0'
        }
    })

    if (!response.ok) {
        throw new Error(`NewsAPI request failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
}
