"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNews } from "@/hooks/use-news"
import { AlertCircle, Brain, Clock, ExternalLink, Eye, Menu, RefreshCw, Search, TrendingUp, X } from "lucide-react"
import { useState } from "react"

const categoryColors = {
  "AI Models": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "AI Research": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "Autonomous AI": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "AI Healthcare": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "AI Tools": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "AI Hardware": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "AI Ethics": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
}

export default function NewsPortal() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { articles, loading, error, refetch } = useNews(searchQuery)

  const featuredArticle = articles.find((article) => article.featured)
  const regularArticles = articles.filter((article) => !article.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg mr-3 flex items-center justify-center">
                <Brain className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-primary">AI News Hub</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors font-sans">
                Home
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-sans">
                Categories
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-sans">
                About
              </a>
              <Button
                variant="ghost"
                size="sm"
                onClick={refetch}
                disabled={loading}
                className="ml-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Search Bar */}
          <div className="mt-4 md:mt-4 lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:mt-0">
            <div className="relative lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search AI news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border focus:ring-primary w-full"
              />
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-border">
              <nav className="flex flex-col space-y-3">
                <a
                  href="#"
                  className="text-foreground hover:text-primary transition-colors font-sans py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors font-sans py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors font-sans py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
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
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading AI news...</span>
          </div>
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
                  <img
                    src={featuredArticle.image || "/placeholder.svg"}
                    alt={featuredArticle.headline}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={categoryColors[featuredArticle.category as keyof typeof categoryColors]}>
                      {featuredArticle.category}
                    </Badge>
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
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.headline}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={categoryColors[article.category as keyof typeof categoryColors]}>
                        {article.category}
                      </Badge>
                    </div>
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
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors font-sans bg-transparent"
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
          </section>
        )}

        {/* No Results */}
        {!loading && articles.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-sans text-lg mb-4">No AI articles found matching your search.</p>
            <Button variant="outline" onClick={() => setSearchQuery("")} className="font-sans">
              Clear Search
            </Button>
          </div>
        )}

        {/* No Articles State */}
        {!loading && articles.length === 0 && !searchQuery && !error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-sans text-lg mb-4">No AI news available at the moment.</p>
            <Button variant="outline" onClick={refetch} className="font-sans">
              Refresh
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded mr-2 flex items-center justify-center">
                <Brain className="h-3 w-3 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-serif font-bold text-primary">AI News Hub</h3>
              <span className="text-muted-foreground font-sans text-sm ml-2">© 2025 All rights reserved</span>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-sans text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-sans text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-sans text-sm">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
