"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

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
