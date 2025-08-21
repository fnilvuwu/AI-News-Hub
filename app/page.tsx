"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Footer } from "@/components/ui/footer"
import { Header } from "@/components/ui/header"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"
import { Input } from "@/components/ui/input"
import { LoadMoreButton } from "@/components/ui/load-more-button"
import { LoadingIndicator } from "@/components/ui/loading-indicator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNews } from "@/hooks/use-news"
import { AlertCircle, ChevronDown, Clock, ExternalLink, Eye, Filter, Newspaper, Search } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function NewsPortal() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ""
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [inputValue, setInputValue] = useState(initialSearch)
  const [isClearing, setIsClearing] = useState(false)
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'views'>('date')
  const [sourceFilters, setSourceFilters] = useState<string[]>(['newsapi', 'guardian', 'nytimes']) // All sources enabled by default

  const { articles, loading, loadingMore, error, hasMore, refetch, loadMore } = useNews(searchQuery, sourceFilters)

  // Debounced search - wait 800ms after user stops typing
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setSearchQuery(inputValue)
    }, 800)

    return () => clearTimeout(delayTimer)
  }, [inputValue])

  // Update search query when URL search param changes
  useEffect(() => {
    const urlSearch = searchParams.get('search') || ""
    setSearchQuery(urlSearch)
    setInputValue(urlSearch)
  }, [searchParams])

  // Handle clearing search with loading state
  const handleClearSearch = () => {
    setIsClearing(true)
    setSearchQuery("")
    setInputValue("")
    setSourceFilters(['newsapi', 'guardian', 'nytimes']) // Reset to all sources enabled
    // Reset clearing state after search completes
    setTimeout(() => setIsClearing(false), 500)
  }

  // Format publication date to show actual date and time (consistent with NewsAPI format)
  const formatPublicationDate = (publishedAt: string) => {
    const date = new Date(publishedAt)

    // Always show actual date and time in NewsAPI format: "Aug 19, 12:54 AM"
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Sort articles based on selected criteria
  const sortedArticles = [...articles].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      case 'title':
        return a.headline.localeCompare(b.headline)
      case 'views':
        // Convert view strings like "1.2K" to numbers for sorting
        const getViewCount = (views: string) => {
          const num = parseFloat(views.replace(/[^\d.]/g, ''))
          return views.includes('K') ? num * 1000 : num
        }
        return getViewCount(b.views) - getViewCount(a.views)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">

        {/* Error Display */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}. <Button variant="link" onClick={refetch} className="p-0 h-auto">Try again</Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State - Only show when no articles are available */}
        {loading && articles.length === 0 && (
          <LoadingIndicator message="Loading AI news..." />
        )}

        {/* Main content - Show articles if we have any, regardless of loading state */}
        {sortedArticles.length > 0 && (
          <section>
            {/* Header with Search and Sort Controls */}
            <div className="flex flex-col gap-6 mb-8">
              {/* Enhanced Header */}
              <div className="text-center">
                <Newspaper className="h-16 w-16 text-primary mx-auto mb-4" />
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-2 leading-tight">
                  {searchQuery || sourceFilters.length < 3 ? "Filtered Results" : "Latest AI News"}
                </h1>
                {!searchQuery && sourceFilters.length === 3 && (
                  <p className="text-muted-foreground font-sans mt-3 text-lg">
                    Stay updated with the latest developments in artificial intelligence
                  </p>
                )}
              </div>

              {/* Search, Filter, and Sort Controls - Responsive layout */}
              <div className="flex flex-col xl:flex-row gap-4 w-full">
                {/* Search Input - Full width on mobile/tablet, part of row on xl+ */}
                <div className="relative w-full xl:flex-1 xl:min-w-0">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search AI news..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="pl-10 bg-input border-border focus:ring-primary w-full"
                  />
                </div>

                {/* Filter and Sort Row - Responsive layout */}
                <div className="flex flex-col xl:flex-row gap-4 w-full xl:w-auto">
                  {/* Filter and Sort Container - Handles small screen stacking */}
                  <div className="flex flex-col min-[470px]:flex-row gap-4 min-[470px]:justify-between w-full xl:w-auto xl:gap-4 xl:justify-start">
                    {/* Source Filters */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground font-sans whitespace-nowrap">Filter:</span>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-[200px] justify-between"
                          >
                            {sourceFilters.length === 3
                              ? "All Sources"
                              : sourceFilters.length === 0
                                ? "No Sources"
                                : `${sourceFilters.length} Selected`}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <div className="p-2 space-y-2">
                            {[
                              { id: 'newsapi', label: 'NewsAPI', description: 'General news sources' },
                              { id: 'guardian', label: 'The Guardian', description: 'UK newspaper' },
                              { id: 'nytimes', label: 'NY Times', description: 'US newspaper' }
                            ].map((source) => (
                              <div key={source.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={source.id}
                                  checked={sourceFilters.includes(source.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSourceFilters(prev => [...prev, source.id])
                                    } else {
                                      setSourceFilters(prev => prev.filter(id => id !== source.id))
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={source.id}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                  title={source.description}
                                >
                                  {source.label}
                                </label>
                              </div>
                            ))}
                            <div className="border-t pt-2 mt-2">
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 text-xs"
                                  onClick={() => setSourceFilters(['newsapi', 'guardian', 'nytimes'])}
                                >
                                  All
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 text-xs"
                                  onClick={() => setSourceFilters([])}
                                >
                                  None
                                </Button>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-sm text-muted-foreground font-sans whitespace-nowrap">Sort:</span>
                      <Select value={sortBy} onValueChange={(value: 'date' | 'title' | 'views') => setSortBy(value)}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="date">Latest</SelectItem>
                          <SelectItem value="title">Title A-Z</SelectItem>
                          <SelectItem value="views">Most Views</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Results Info - Below search controls */}
              {(searchQuery || sourceFilters.length < 3) && !loading && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-muted-foreground font-sans">
                    <p>
                      {sortedArticles.length} article{sortedArticles.length !== 1 ? "s" : ""} found
                      {searchQuery && ` for "${searchQuery}"`}
                      {sourceFilters.length < 3 && sourceFilters.length > 0 && (
                        <span>
                          {" "}from {sourceFilters.map(id => {
                            const sourceNames = { newsapi: 'NewsAPI', guardian: 'The Guardian', nytimes: 'New York Times' }
                            return sourceNames[id as keyof typeof sourceNames] || id
                          }).join(', ')}
                        </span>
                      )}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearSearch}
                    disabled={isClearing}
                    className="font-sans"
                  >
                    {isClearing ? "Clearing..." : "Clear Filters"}
                  </Button>
                </div>
              )}
            </div>            {/* Loading/Search Status */}
            {((inputValue !== searchQuery && inputValue.length > 0) || (searchQuery && loading) || isClearing) && (
              <div className="mb-6">
                <LoadingIndicator
                  message={isClearing ? "Clearing search..." : "Searching..."}
                  compact={true}
                />
              </div>
            )}

            {/* Hero Article - First article in a large format */}
            {!searchQuery && sourceFilters.length === 3 && sortedArticles.length > 0 && (
              <div className="mb-8">
                <Card className="overflow-hidden border-border bg-card hover:shadow-xl transition-all duration-300">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <ImagePlaceholder
                        src={sortedArticles[0].image}
                        alt={sortedArticles[0].headline}
                        className="w-full h-64 md:h-full"
                        aspectRatio="auto"
                      />
                    </div>
                    <div className="md:w-1/2 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-muted-foreground font-sans gap-4">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatPublicationDate(sortedArticles[0].publishedAt)}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {sortedArticles[0].views}
                          </div>
                          {sortedArticles[0].source && (
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                              {sortedArticles[0].source}
                            </span>
                          )}
                        </div>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-card-foreground mb-3 leading-tight">
                        {sortedArticles[0].headline}
                      </h3>
                      <p className="text-muted-foreground font-sans mb-4 leading-relaxed">{sortedArticles[0].summary}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground font-sans">{sortedArticles[0].readTime}</span>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans" asChild>
                          <a href={sortedArticles[0].link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            Read Full Story
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Articles Grid - Clean responsive layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {((searchQuery || sourceFilters.length < 3) ? sortedArticles : sortedArticles.slice(1)).map((article, index) => (
                <Card
                  key={article.id}
                  className="group hover:shadow-lg transition-all duration-200 border-border bg-card overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <ImagePlaceholder
                      src={article.image}
                      alt={article.headline}
                      className="w-full h-48 group-hover:scale-105 transition-transform duration-300"
                      aspectRatio="auto"
                    />
                    {article.source && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-black/80 text-white px-2 py-1 rounded-full text-xs">
                          {article.source}
                        </span>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-xs text-muted-foreground font-sans">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatPublicationDate(article.publishedAt)}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground font-sans">
                        <Eye className="h-3 w-3 mr-1" />
                        {article.views}
                      </div>
                    </div>
                    <h2 className="text-lg font-serif font-bold text-card-foreground group-hover:text-primary transition-colors leading-tight">
                      {article.headline}
                    </h2>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground font-sans mb-4 leading-relaxed">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-sans">{article.readTime}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors font-sans bg-transparent border-border dark:border-border dark:text-foreground dark:hover:bg-primary dark:hover:text-primary-foreground"
                        asChild
                      >
                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          Read More
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <LoadMoreButton
              onLoadMore={loadMore}
              loading={loadingMore}
              hasMore={hasMore}
              className="mt-8"
            />
          </section>
        )}

        {/* No Results - Only show when not loading or when loading is complete */}
        {!loading && sortedArticles.length === 0 && (searchQuery || sourceFilters.length < 3) && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground font-sans text-lg">
                No AI articles found matching your {searchQuery ? 'search' : 'filters'}.
              </p>
              <Button
                variant="outline"
                onClick={handleClearSearch}
                disabled={isClearing}
                className="font-sans"
              >
                {isClearing ? "Clearing..." : "Clear All Filters"}
              </Button>
            </div>
          </div>
        )}

        {/* No Articles State */}
        {!loading && sortedArticles.length === 0 && !searchQuery && sourceFilters.length === 3 && !error && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground font-sans text-lg">No AI news available at the moment.</p>
              <Button variant="outline" onClick={refetch} className="font-sans">
                Refresh
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
