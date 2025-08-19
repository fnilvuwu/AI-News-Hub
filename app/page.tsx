"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Footer } from "@/components/ui/footer"
import { Header } from "@/components/ui/header"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"
import { LoadMoreButton } from "@/components/ui/load-more-button"
import { LoadingIndicator } from "@/components/ui/loading-indicator"
import { useNews } from "@/hooks/use-news"
import { AlertCircle, Clock, ExternalLink, Eye, TrendingUp } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function NewsPortal() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ""
  const [searchQuery, setSearchQuery] = useState(initialSearch)

  const { articles, loading, loadingMore, error, hasMore, refetch, loadMore } = useNews(searchQuery)

  const featuredArticle = articles.find((article) => article.featured)
  const regularArticles = articles.filter((article) => !article.featured)

  // Update search query when URL search param changes
  useEffect(() => {
    const urlSearch = searchParams.get('search') || ""
    setSearchQuery(urlSearch)
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onRefresh={refetch}
        loading={loading}
      />

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

        {/* Loading State */}
        {loading && articles.length === 0 && (
          <LoadingIndicator message="Loading AI news..." />
        )}

        {/* Search Results Info */}
        {searchQuery && !loading && (
          <div className="mb-6">
            <p className="text-muted-foreground font-sans">
              {articles.length} article{articles.length !== 1 ? "s" : ""} found for "{searchQuery}"
            </p>
          </div>
        )}

        {featuredArticle && !searchQuery && !loading && (
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-xl font-serif font-bold text-foreground">Featured Story</h2>
            </div>
            <Card className="overflow-hidden border-border bg-card hover:shadow-xl transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <ImagePlaceholder
                    src={featuredArticle.image}
                    alt={featuredArticle.headline}
                    className="w-full h-64 md:h-full"
                    aspectRatio="auto"
                  />
                </div>
                <div className="md:w-1/2 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-muted-foreground font-sans gap-4">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {featuredArticle.timestamp}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {featuredArticle.views}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-card-foreground mb-3 leading-tight">
                    {featuredArticle.headline}
                  </h3>
                  <p className="text-muted-foreground font-sans mb-4 leading-relaxed">{featuredArticle.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-sans">{featuredArticle.readTime}</span>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans" asChild>
                      <a href={featuredArticle.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Read Full Story
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {!loading && articles.length > 0 && (
          <section>
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-serif font-bold text-foreground">
                {searchQuery ? "Search Results" : "Latest AI News"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(searchQuery ? articles : regularArticles).map((article) => (
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
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-xs text-muted-foreground font-sans">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.timestamp}
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
                    <p className="text-sm text-muted-foreground font-sans mb-4 leading-relaxed">{article.summary}</p>
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

        {/* No Results */}
        {!loading && articles.length === 0 && searchQuery && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground font-sans text-lg">No AI articles found matching your search.</p>
              <Button variant="outline" onClick={() => setSearchQuery("")} className="font-sans">
                Clear Search
              </Button>
            </div>
          </div>
        )}

        {/* No Articles State */}
        {!loading && articles.length === 0 && !searchQuery && !error && (
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
