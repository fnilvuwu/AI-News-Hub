// The Guardian Open Platform API integration
// Documentation: https://open-platform.theguardian.com/documentation/

interface GuardianApiResponse {
    response: {
        status: string
        userTier: string
        total: number
        startIndex: number
        pageSize: number
        currentPage: number
        pages: number
        orderBy: string
        results: GuardianArticle[]
    }
}

interface GuardianArticle {
    id: string
    type: string
    sectionId: string
    sectionName: string
    webPublicationDate: string
    webTitle: string
    webUrl: string
    apiUrl: string
    pillarId?: string
    pillarName?: string
    fields?: {
        thumbnail?: string
        bodyText?: string
        trailText?: string
        headline?: string
        standfirst?: string
        byline?: string
        main?: string
    }
    tags?: Array<{
        id: string
        type: string
        webTitle: string
        webUrl: string
        apiUrl: string
    }>
    references?: Array<{
        id: string
        type: string
    }>
}

interface GuardianSearchParams {
    q?: string          // Search query
    page?: number       // Page number (default: 1)
    pageSize?: number   // Number of results per page (default: 10, max: 50)
    fromDate?: string   // From date (YYYY-MM-DD)
    toDate?: string     // To date (YYYY-MM-DD)
    orderBy?: 'newest' | 'oldest' | 'relevance'
    showFields?: string // Comma-separated list of fields to return
    showTags?: string   // Comma-separated list of tag types
    section?: string    // Section filter
    tag?: string        // Tag filter
}

class GuardianAPI {
    private baseUrl = 'https://content.guardianapis.com'
    private apiKey: string

    constructor(apiKey: string) {
        if (!apiKey) {
            throw new Error('Guardian API key is required')
        }
        this.apiKey = apiKey
    }

    /**
     * Search for AI-related articles from The Guardian
     */
    async searchArticles(params: GuardianSearchParams = {}): Promise<GuardianApiResponse> {
        const searchParams = new URLSearchParams()

        // Add API key
        searchParams.append('api-key', this.apiKey)

        // Default AI-related search query
        const aiQuery = params.q
            ? `(${params.q}) AND (artificial intelligence OR AI OR machine learning OR deep learning OR neural network OR automation OR robotics OR algorithm OR data science)`
            : 'artificial intelligence OR AI OR machine learning OR deep learning OR neural network OR automation OR robotics OR algorithm OR data science'

        searchParams.append('q', aiQuery)

        // Add other parameters
        if (params.page) searchParams.append('page', params.page.toString())
        if (params.pageSize) searchParams.append('page-size', Math.min(params.pageSize, 50).toString())
        if (params.fromDate) searchParams.append('from-date', params.fromDate)
        if (params.toDate) searchParams.append('to-date', params.toDate)
        if (params.orderBy) searchParams.append('order-by', params.orderBy)
        if (params.section) searchParams.append('section', params.section)
        if (params.tag) searchParams.append('tag', params.tag)

        // Request additional fields for better content
        const defaultFields = 'thumbnail,bodyText,trailText,headline,standfirst,byline'
        const fields = params.showFields ? `${defaultFields},${params.showFields}` : defaultFields
        searchParams.append('show-fields', fields)

        // Request tags for categorization
        const defaultTags = 'keyword,contributor'
        const tags = params.showTags ? `${defaultTags},${params.showTags}` : defaultTags
        searchParams.append('show-tags', tags)

        const url = `${this.baseUrl}/search?${searchParams.toString()}`

        console.log('🔍 Guardian API Request:', url.replace(this.apiKey, 'API_KEY_HIDDEN'))

        try {
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'AI-News-Hub/1.0 (fnilvuwu)',
                },
            })

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Guardian API: Invalid API key or quota exceeded')
                }
                if (response.status === 429) {
                    throw new Error('Guardian API: Rate limit exceeded')
                }
                throw new Error(`Guardian API error: ${response.status} ${response.statusText}`)
            }

            const data: GuardianApiResponse = await response.json()

            console.log(`📰 Guardian API: Found ${data.response.total} articles (page ${data.response.currentPage}/${data.response.pages})`)

            return data
        } catch (error) {
            console.error('Guardian API Error:', error)
            throw error
        }
    }

    /**
     * Get a single article by ID
     */
    async getArticle(articleId: string): Promise<GuardianApiResponse> {
        const searchParams = new URLSearchParams()
        searchParams.append('api-key', this.apiKey)
        searchParams.append('show-fields', 'thumbnail,bodyText,trailText,headline,standfirst,byline')
        searchParams.append('show-tags', 'keyword,contributor')

        const url = `${this.baseUrl}/${articleId}?${searchParams.toString()}`

        try {
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(`Guardian API error: ${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (error) {
            console.error('Guardian API Error:', error)
            throw error
        }
    }

    /**
     * Transform Guardian article to our internal format
     */
    transformArticle(guardianArticle: GuardianArticle, index: number = 0): any {
        // Generate views (mock data for demo)
        const baseViews = Math.floor(Math.random() * 5000) + 1000
        const views = `${(baseViews / 1000).toFixed(1)}k`

        // Generate read time based on content length
        const bodyText = guardianArticle.fields?.bodyText || guardianArticle.fields?.trailText || ''
        const wordCount = bodyText.split(' ').length
        const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`

        return {
            id: `guardian-${guardianArticle.id}-${Date.now()}-${index}`,
            headline: guardianArticle.fields?.headline || guardianArticle.webTitle,
            summary: guardianArticle.fields?.trailText || guardianArticle.fields?.standfirst || 'Read the full article for more details.',
            image: guardianArticle.fields?.thumbnail || guardianArticle.fields?.main || '/placeholder.jpg',
            link: guardianArticle.webUrl,
            views: views,
            readTime: readTime,
            source: 'The Guardian',
            sourceId: 'guardian',
            section: guardianArticle.sectionName,
            author: guardianArticle.fields?.byline || 'The Guardian',
            publishedAt: guardianArticle.webPublicationDate,
            tags: guardianArticle.tags?.map(tag => tag.webTitle) || []
        }
    }
}

export { GuardianAPI, type GuardianApiResponse, type GuardianArticle, type GuardianSearchParams }

