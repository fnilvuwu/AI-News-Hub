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
                        <span className="text-muted-foreground font-sans text-sm">©2025 fnilvuwu. All rights reserved</span>
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
