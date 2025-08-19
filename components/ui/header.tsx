"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, RefreshCw, Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

interface HeaderProps {
    searchQuery?: string
    onSearchChange?: (query: string) => void
    onRefresh?: () => void
    loading?: boolean
}

export function Header({ searchQuery = "", onSearchChange, onRefresh, loading = false }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
    const router = useRouter()
    const pathname = usePathname()

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (pathname !== "/") {
            // If not on home page, redirect to home with search query
            router.push(`/?search=${encodeURIComponent(localSearchQuery)}`)
        } else if (onSearchChange) {
            // If on home page, use the provided handler
            onSearchChange(localSearchQuery)
        }
    }

    const handleSearchChange = (value: string) => {
        setLocalSearchQuery(value)
        if (pathname === "/" && onSearchChange) {
            // Real-time search on home page
            onSearchChange(value)
        }
    }

    return (
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <div className="w-8 h-8 mr-3 flex items-center justify-center">
                            <Image
                                src="/ai-news-hub-logo.png"
                                alt="AI News Hub Logo"
                                width={32}
                                height={32}
                                className="rounded-lg"
                            />
                        </div>
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-primary">AI News Hub</h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/"
                            className={`hover:text-primary transition-colors font-sans ${pathname === "/" ? "text-foreground" : "text-muted-foreground"
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className={`hover:text-primary transition-colors font-sans ${pathname === "/about" ? "text-foreground" : "text-muted-foreground"
                                }`}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className={`hover:text-primary transition-colors font-sans ${pathname === "/contact" ? "text-foreground" : "text-muted-foreground"
                                }`}
                        >
                            Contact
                        </Link>
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
                    <form onSubmit={handleSearchSubmit} className="relative lg:w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Search AI news..."
                            value={localSearchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-10 bg-input border-border focus:ring-primary w-full"
                        />
                    </form>
                </div>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-border">
                        <nav className="flex flex-col space-y-3 items-center">
                            <Link
                                href="/"
                                className={`hover:text-primary transition-colors font-sans py-2 ${pathname === "/" ? "text-foreground" : "text-muted-foreground"
                                    }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                className={`hover:text-primary transition-colors font-sans py-2 ${pathname === "/about" ? "text-foreground" : "text-muted-foreground"
                                    }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className={`hover:text-primary transition-colors font-sans py-2 ${pathname === "/contact" ? "text-foreground" : "text-muted-foreground"
                                    }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}
