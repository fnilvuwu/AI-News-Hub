// The New York Times Article Search API integration
// Documentation: https://developer.nytimes.com/docs/articlesearch-product/1/overview

interface NYTimesApiResponse {
    status: string
    copyright: string
    response: {
        docs: NYTimesArticle[] | null
        meta?: {
            hits: number
            offset: number
            time: number
        }
    }
}

interface NYTimesArticle {
    abstract: string
    web_url: string
    snippet: string
    lead_paragraph: string
    source: string
    multimedia: {
        caption: string
        credit: string
        default: {
            url: string
            height: number
            width: number
        }
        thumbnail: {
            url: string
            height: number
            width: number
        }
    } | null
    headline: {
        main: string
        kicker: string | null
        content_kicker: string | null
        print_headline: string | null
        name: string | null
        seo: string | null
        sub: string | null
    }
    keywords: Array<{
        name: string
        value: string
        rank: number
        major?: string
    }>
    pub_date: string
    document_type: string
    news_desk: string
    section_name: string
    subsection_name: string | null
    byline: {
        original: string | null
        person: Array<{
            firstname: string
            middlename: string | null
            lastname: string
            qualifier: string | null
            title: string | null
            role: string
            organization: string
            rank: number
        }>
        organization: string | null
    }
    type_of_material: string
    _id: string
    word_count: number
    uri: string
    print_page: string | null
    print_section: string | null
    subsection: string | null
}

interface NYTimesSearchParams {
    q?: string          // Search query
    fq?: string         // Filter query (Lucene syntax)
    begin_date?: string // Begin date (YYYYMMDD)
    end_date?: string   // End date (YYYYMMDD)
    sort?: 'newest' | 'oldest' | 'relevance'
    page?: number       // Page number (0-based)
}

class NYTimesAPI {
    private baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
    private apiKey: string
    private cache: Map<string, { data: NYTimesApiResponse; timestamp: number }> = new Map()
    private lastRequestTime: number = 0
    private readonly rateLimitDelay = 6000 // 6 seconds between requests (10 per minute max)

    constructor(apiKey: string) {
        if (!apiKey) {
            throw new Error('NYTimes API key is required')
        }
        this.apiKey = apiKey
    }

    /**
     * Ensure we don't exceed rate limits
     */
    private async rateLimit(): Promise<void> {
        const now = Date.now()
        const timeSinceLastRequest = now - this.lastRequestTime

        if (timeSinceLastRequest < this.rateLimitDelay) {
            const waitTime = this.rateLimitDelay - timeSinceLastRequest
            console.log(`⏳ NYTimes: Waiting ${waitTime}ms to avoid rate limit...`)
            await new Promise(resolve => setTimeout(resolve, waitTime))
        }

        this.lastRequestTime = Date.now()
    }

    /**
     * Get cached result if available and not expired (5 minutes)
     */
    private getCachedResult(cacheKey: string): NYTimesApiResponse | null {
        const cached = this.cache.get(cacheKey)
        if (cached && Date.now() - cached.timestamp < 300000) { // 5 minutes
            console.log('📦 NYTimes: Using cached result')
            return cached.data
        }
        return null
    }

    /**
     * Cache the result
     */
    private setCachedResult(cacheKey: string, data: NYTimesApiResponse): void {
        this.cache.set(cacheKey, { data, timestamp: Date.now() })
    }

    /**
     * Search for AI-related articles from The New York Times
     */
    async searchArticles(params: NYTimesSearchParams = {}): Promise<NYTimesApiResponse> {
        // Create a cache key based on search parameters
        const cacheKey = JSON.stringify(params)

        // Check cache first
        const cachedResult = this.getCachedResult(cacheKey)
        if (cachedResult) {
            return cachedResult
        }

        // Use a single, effective search strategy to avoid rate limits
        let searchTerm: string
        let filterQuery: string | undefined

        if (params.q && params.q.trim()) {
            // If user provided a search query, use it with AI context
            searchTerm = params.q.trim()
            // Add filter to ensure it's related to technology/AI topics
            filterQuery = 'section.name:("Technology" OR "Science" OR "Business") OR timesTag.subject:("Artificial Intelligence" OR "Machine Learning" OR "Technology")'
        } else {
            // Default to a broad AI search with proper filtering
            searchTerm = 'artificial intelligence OR machine learning OR AI technology'
            // Filter for relevant sections and topics
            filterQuery = 'typeOfMaterials:("News" OR "Article") AND (section.name:("Technology" OR "Science" OR "Business") OR timesTag.subject:("Artificial Intelligence" OR "Machine Learning" OR "Technology" OR "Computer Science"))'
        }

        try {
            await this.rateLimit() // Ensure we don't exceed rate limits
            const result = await this.performSearch(searchTerm, {
                ...params,
                fq: filterQuery
            })

            // Cache the result
            this.setCachedResult(cacheKey, result)

            const articlesFound = result.response?.docs?.length || 0
            console.log(`✅ NYTimes: Found ${articlesFound} articles with search term: "${searchTerm}"`)
            return result

        } catch (error) {
            console.error(`❌ NYTimes: Error with search term "${searchTerm}":`, error)

            // If we hit a rate limit, return cached result or empty result gracefully
            if (error instanceof Error && error.message.includes('Rate limit exceeded')) {
                console.log('⚠️ NYTimes: Rate limit hit, returning empty result to avoid blocking other sources')
                return {
                    status: 'OK',
                    copyright: '',
                    response: {
                        docs: [],
                        meta: { hits: 0, offset: 0, time: 0 }
                    }
                }
            }

            throw error
        }
    }

    /**
     * Perform a single search with the given term
     */
    private async performSearch(searchTerm: string, params: NYTimesSearchParams): Promise<NYTimesApiResponse> {
        const searchParams = new URLSearchParams()

        // Add API key
        searchParams.append('api-key', this.apiKey)
        searchParams.append('q', searchTerm)

        // Add helpful default parameters for better results
        if (!params.sort) searchParams.append('sort', 'newest')
        if (!params.begin_date) {
            // Default to articles from the last 6 months to ensure we get recent content
            const sixMonthsAgo = new Date()
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
            const beginDate = sixMonthsAgo.toISOString().slice(0, 10).replace(/-/g, '')
            searchParams.append('begin_date', beginDate)
        }

        // Add other parameters
        if (params.fq) searchParams.append('fq', params.fq)
        if (params.end_date) searchParams.append('end_date', params.end_date)
        if (params.sort) searchParams.append('sort', params.sort)
        if (params.page !== undefined) searchParams.append('page', params.page.toString())

        const url = `${this.baseUrl}?${searchParams.toString()}`

        console.log('🔍 NYTimes API Request:', url.replace(this.apiKey, 'API_KEY_HIDDEN'))
        console.log('🔍 NYTimes Search Query:', searchTerm)
        if (params.fq) console.log('🔍 NYTimes Filter Query:', params.fq)

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'AI-News-Hub/1.0 (fnilvuwu)',
            },
        })

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('NYTimes API: Invalid API key')
            }
            if (response.status === 429) {
                throw new Error('NYTimes API: Rate limit exceeded')
            }
            throw new Error(`NYTimes API error: ${response.status} ${response.statusText}`)
        }

        const data: NYTimesApiResponse = await response.json()

        // Debug: Log the response structure keys to understand the format
        console.log('🔍 NYTimes API Response Keys:', Object.keys(data))
        if (data.response) {
            console.log('🔍 NYTimes API Response.response Keys:', Object.keys(data.response))
        } else {
            console.log('🔍 NYTimes API Response.response is null/undefined')
        }

        // Handle potential changes in response structure
        const totalHits = data.response?.meta?.hits || 0
        const returnedDocs = data.response?.docs?.length || 0

        console.log(`📰 NYTimes API: Found ${totalHits} total articles (returned ${returnedDocs} articles)`)

        return data
    }

    /**
     * Transform NYTimes article to our internal format
     */
    transformArticle(nytArticle: NYTimesArticle, index: number = 0): any {
        // Generate views (mock data for demo)
        const baseViews = Math.floor(Math.random() * 8000) + 2000 // NYT typically has higher readership
        const views = `${(baseViews / 1000).toFixed(1)}k`

        // Generate read time based on word count or content length
        const wordCount = nytArticle.word_count ||
            (nytArticle.abstract || nytArticle.lead_paragraph || nytArticle.snippet || '').split(' ').length
        const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`

        // Get the best available image (simplified multimedia structure)
        const getImageUrl = (multimedia: typeof nytArticle.multimedia): string | null => {
            if (!multimedia) return null

            // Try default image first
            if (multimedia.default?.url) {
                return multimedia.default.url.startsWith('http')
                    ? multimedia.default.url
                    : `https://static01.nyt.com/${multimedia.default.url}`
            }

            // Fall back to thumbnail
            if (multimedia.thumbnail?.url) {
                return multimedia.thumbnail.url.startsWith('http')
                    ? multimedia.thumbnail.url
                    : `https://static01.nyt.com/${multimedia.thumbnail.url}`
            }

            return null
        }

        // Extract author name
        const getAuthor = (byline: typeof nytArticle.byline): string => {
            if (byline.person && byline.person.length > 0) {
                const person = byline.person[0]
                return `${person.firstname} ${person.lastname}`.trim()
            }
            if (byline.original) {
                // Clean up byline (remove "By " prefix if present)
                return byline.original.replace(/^By\s+/i, '').trim()
            }
            return 'The New York Times'
        }

        // Extract tags from keywords
        const tags = nytArticle.keywords
            ?.filter(keyword => keyword.major === 'N' || keyword.name === 'subject')
            .map(keyword => keyword.value) || []

        return {
            id: `nytimes-${nytArticle._id}-${Date.now()}-${index}`,
            headline: nytArticle.headline.main,
            summary: nytArticle.abstract || nytArticle.lead_paragraph || nytArticle.snippet || 'Read the full article for more details.',
            image: getImageUrl(nytArticle.multimedia) || '/placeholder.jpg',
            link: nytArticle.web_url,
            views: views,
            readTime: readTime,
            source: 'The New York Times',
            sourceId: 'nytimes',
            section: nytArticle.section_name || nytArticle.news_desk,
            author: getAuthor(nytArticle.byline),
            publishedAt: nytArticle.pub_date,
            tags: tags
        }
    }
}

export { NYTimesAPI, type NYTimesApiResponse, type NYTimesArticle, type NYTimesSearchParams }

