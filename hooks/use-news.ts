import { Article, NewsResponse } from '@/lib/types'
import { useEffect, useState } from 'react'

interface UseNewsResult {
    articles: Article[]
    loading: boolean
    error: string | null
    currentPage: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
    totalResults: number
    loadingMore: boolean
    hasMore: boolean
    refetch: () => void
    goToPage: (page: number) => void
    nextPage: () => void
    prevPage: () => void
    loadMore: () => void
}

export function useNews(searchQuery: string = '', sourceFilters: string[] = []): UseNewsResult {
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalResults, setTotalResults] = useState(0)

    const fetchNews = async (page: number = 1, append: boolean = false) => {
        try {
            console.log('🚀 Hook fetchNews called:', {
                page,
                append,
                currentPage,
                searchQuery: searchQuery.trim(),
                timestamp: new Date().toISOString()
            })

            if (append) {
                setLoadingMore(true)
            } else {
                setLoading(true)
            }
            setError(null)

            const params = new URLSearchParams()
            if (searchQuery.trim()) {
                params.append('search', searchQuery.trim())
            }
            if (sourceFilters.length > 0) {
                params.append('sources', sourceFilters.join(','))
            }

            // Don't send limit - let API decide based on search vs browsing
            params.append('page', page.toString())

            console.log('📡 Making API request:', {
                url: `/api/news?${params.toString()}`,
                page,
                isSearch: !!searchQuery.trim()
            })

            const response = await fetch(`/api/news?${params.toString()}`)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data: NewsResponse = await response.json()

            console.log('📦 API response received:', {
                articlesReceived: data.articles.length,
                totalResults: data.totalResults,
                status: data.status,
                append
            })

            if (data.status === 'error') {
                throw new Error(data.message || 'Failed to fetch news')
            }

            if (append) {
                // Append new articles to existing ones
                console.log('➕ Appending articles:', {
                    existingCount: articles.length,
                    newCount: data.articles.length,
                    totalAfterAppend: articles.length + data.articles.length
                })
                setArticles(prevArticles => [...prevArticles, ...data.articles])
            } else {
                // Replace articles (initial load or page navigation)
                console.log('🔄 Replacing articles:', {
                    newCount: data.articles.length
                })
                setArticles(data.articles)
            }

            setTotalResults(data.totalResults)

            // Calculate total pages 
            let calculatedTotalPages: number
            if (searchQuery.trim()) {
                // Search results: 18 articles per page
                calculatedTotalPages = Math.ceil(data.totalResults / 18)
            } else {
                // Regular browsing: first page has 19 articles, rest have 18
                const remainingAfterFirstPage = Math.max(0, data.totalResults - 19)
                const additionalPages = Math.ceil(remainingAfterFirstPage / 18)
                calculatedTotalPages = data.totalResults <= 19 ? 1 : 1 + additionalPages
            }

            console.log('📊 Pagination calculation:', {
                totalResults: data.totalResults,
                isSearch: !!searchQuery.trim(),
                calculatedTotalPages,
                currentPage: page
            })

            setTotalPages(calculatedTotalPages)
        } catch (err) {
            console.error('Error fetching news:', err)
            setError(err instanceof Error ? err.message : 'Failed to fetch news')
            // Keep existing articles on error
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }

    useEffect(() => {
        setCurrentPage(1) // Reset to page 1 when search or filters change
        fetchNews(1)
    }, [searchQuery, sourceFilters]) // Watch both searchQuery and sourceFilters

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page)
            fetchNews(page, false) // false = replace mode for page navigation
        }
    }

    const nextPage = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1
            setCurrentPage(newPage)
            fetchNews(newPage, false) // false = replace mode for page navigation
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1
            setCurrentPage(newPage)
            fetchNews(newPage, false) // false = replace mode for page navigation
        }
    }

    const loadMore = () => {
        console.log('🔽 LoadMore called:', {
            currentPage,
            totalPages,
            loadingMore,
            hasMore: currentPage < totalPages,
            currentArticlesCount: articles.length
        })

        if (currentPage < totalPages && !loadingMore) {
            const nextPageNum = currentPage + 1
            console.log('✅ LoadMore proceeding:', {
                nextPageNum,
                willSetCurrentPage: nextPageNum
            })
            setCurrentPage(nextPageNum)
            fetchNews(nextPageNum, true) // true = append mode
        } else {
            console.log('❌ LoadMore blocked:', {
                reason: currentPage >= totalPages ? 'No more pages' : 'Already loading'
            })
        }
    }

    const refetch = () => {
        fetchNews(currentPage, false) // false = replace mode
    }

    return {
        articles,
        loading,
        loadingMore,
        error,
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
        hasMore: currentPage < totalPages,
        totalResults,
        refetch,
        goToPage,
        nextPage,
        prevPage,
        loadMore
    }
}
