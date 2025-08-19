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

// Categorize articles based on title and description with enhanced keyword matching
function categorizeArticle(title: string, description: string | null): string {
    const content = `${title} ${description || ''}`.toLowerCase()

    // AI Models & LLMs
    const modelKeywords = ['openai', 'gpt', 'chatgpt', 'claude', 'gemini', 'llama', 'language model', 'llm', 'transformer', 'neural network', 'deep learning', 'machine learning', 'anthropic', 'mistral', 'palm', 'bard']
    if (modelKeywords.some(keyword => content.includes(keyword))) {
        return 'AI Models'
    }

    // AI Research & Breakthroughs
    const researchKeywords = ['research', 'study', 'breakthrough', 'discovery', 'paper', 'arxiv', 'experiment', 'algorithm', 'intelligence', 'cognitive', 'neural', 'academic', 'university', 'mit', 'stanford', 'deepmind']
    if (researchKeywords.some(keyword => content.includes(keyword))) {
        return 'AI Research'
    }

    // Autonomous AI & Robotics
    const autonomousKeywords = ['autonomous', 'self-driving', 'tesla', 'robotics', 'robot', 'automation', 'autopilot', 'waymo', 'cruise', 'drone', 'unmanned', 'self-driving', 'autonomous vehicle']
    if (autonomousKeywords.some(keyword => content.includes(keyword))) {
        return 'Autonomous AI'
    }

    // AI in Healthcare
    const healthcareKeywords = ['healthcare', 'medical', 'drug', 'disease', 'diagnosis', 'treatment', 'patient', 'medicine', 'clinical', 'biotech', 'pharmaceutical', 'health', 'cancer', 'therapy']
    if (healthcareKeywords.some(keyword => content.includes(keyword))) {
        return 'AI Healthcare'
    }

    // AI Tools & Applications
    const toolKeywords = ['tool', 'productivity', 'copilot', 'assistant', 'app', 'software', 'platform', 'api', 'integration', 'workflow', 'automation', 'business', 'enterprise', 'saas']
    if (toolKeywords.some(keyword => content.includes(keyword))) {
        return 'AI Tools'
    }

    // AI Hardware & Infrastructure
    const hardwareKeywords = ['chip', 'nvidia', 'processor', 'hardware', 'gpu', 'tpu', 'semiconductor', 'computing', 'infrastructure', 'data center', 'cloud', 'amd', 'intel', 'quantum']
    if (hardwareKeywords.some(keyword => content.includes(keyword))) {
        return 'AI Hardware'
    }

    // AI Ethics, Safety & Regulation
    const ethicsKeywords = ['ethics', 'safety', 'regulation', 'policy', 'governance', 'bias', 'fairness', 'transparency', 'accountability', 'privacy', 'security', 'legislation', 'law', 'guidelines', 'responsible']
    if (ethicsKeywords.some(keyword => content.includes(keyword))) {
        return 'AI Ethics'
    }

    // Default to General AI for all other AI-related content
    return 'General AI'
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
        category: categorizeArticle(article.title, article.description),
        summary: article.description || 'No description available',
        image: article.urlToImage,
        readTime: calculateReadTime(article.content, article.description),
        views: generateViewCount(),
        featured: index === 0, // Make first article featured
        author: article.author || undefined,
        publishedAt: article.publishedAt
    }
}

// Fetch AI news from NewsAPI
export async function fetchAINews(): Promise<NewsAPIResponse> {
    const apiKey = process.env.NEWSAPI_API_KEY

    if (!apiKey) {
        throw new Error('NewsAPI key is not configured')
    }

    const searchQueries = [
        'artificial intelligence',
        'machine learning',
        'AI technology',
        'neural networks',
        'deep learning',
        'OpenAI',
        'ChatGPT',
        'AI research'
    ]

    // Use multiple search terms to get more comprehensive AI news
    const query = searchQueries.join(' OR ')

    const url = new URL('https://newsapi.org/v2/everything')
    url.searchParams.append('q', query)
    url.searchParams.append('sortBy', 'publishedAt')
    url.searchParams.append('language', 'en')
    url.searchParams.append('pageSize', '50') // Get more articles to filter from
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
