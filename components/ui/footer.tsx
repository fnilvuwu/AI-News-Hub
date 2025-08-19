"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Footer() {
    const pathname = usePathname()

    return (
        <footer className="border-t border-border bg-muted/30 mt-16">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 items-center">
                    <div className="flex items-center">
                        <div className="w-6 h-6 mr-2 flex items-center justify-center">
                            <Image
                                src="/ai-news-hub-logo.png"
                                alt="AI News Hub Logo"
                                width={24}
                                height={24}
                                className="rounded"
                            />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-primary">AI News Hub</h3>
                        <span className="text-muted-foreground font-sans text-sm ml-2">© 2025 All rights reserved</span>
                    </div>
                    <nav className="flex items-center space-x-6">
                        <Link
                            href="/privacy"
                            className={`hover:text-primary transition-colors font-sans text-sm ${pathname === "/privacy" ? "text-foreground font-medium" : "text-muted-foreground"
                                }`}
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className={`hover:text-primary transition-colors font-sans text-sm ${pathname === "/terms" ? "text-foreground font-medium" : "text-muted-foreground"
                                }`}
                        >
                            Terms of Service
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    )
}
