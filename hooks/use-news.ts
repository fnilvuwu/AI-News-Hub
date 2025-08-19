import { Article, NewsResponse } from '@/lib/types'
import { useEffect, useState } from 'react'

interface UseNewsResult {
    articles: Article[]
    loading: boolean
    error: string | null
    refetch: () => void
}

export function useNews(searchQuery: string = ''): UseNewsResult {
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchNews = async () => {
        try {
            setLoading(true)
            setError(null)

            const params = new URLSearchParams()
            if (searchQuery.trim()) {
                params.append('search', searchQuery.trim())
            }
            params.append('limit', '19')

            const response = await fetch(`/api/news?${params.toString()}`)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data: NewsResponse = await response.json()

            if (data.status === 'error') {
                throw new Error(data.message || 'Failed to fetch news')
            }

            setArticles(data.articles)
        } catch (err) {
            console.error('Error fetching news:', err)
            setError(err instanceof Error ? err.message : 'Failed to fetch news')
            // Keep existing articles on error
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNews()
    }, [searchQuery])

    const refetch = () => {
        fetchNews()
    }

    return {
        articles,
        loading,
        error,
        refetch
    }
}
