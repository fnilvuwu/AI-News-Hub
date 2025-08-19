// NewsAPI response types
export interface NewsAPISource {
    id: string | null
    name: string
}

export interface NewsAPIArticle {
    source: NewsAPISource
    author: string | null
    title: string
    description: string | null
    url: string
    urlToImage: string | null
    publishedAt: string
    content: string | null
}

export interface NewsAPIResponse {
    status: string
    totalResults: number
    articles: NewsAPIArticle[]
}

// Our app's article type
export interface Article {
    id: string
    headline: string
    link: string
    summary: string
    image: string | null
    readTime: string
    views: string
    author?: string
    publishedAt: string
    source?: string        // Source name (e.g., "NewsAPI", "The Guardian")
    sourceId?: string      // Source identifier (e.g., "newsapi", "guardian")
    section?: string       // Article section/category
    tags?: string[]        // Article tags
}

export interface NewsResponse {
    articles: Article[]
    totalResults: number
    status: string
    error?: string
    message?: string
}
