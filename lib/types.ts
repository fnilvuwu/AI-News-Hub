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
    timestamp: string
    summary: string
    image: string | null
    readTime: string
    views: string
    featured: boolean
    author?: string
    publishedAt: string
}

export interface NewsResponse {
    articles: Article[]
    totalResults: number
    status: string
    error?: string
    message?: string
}
