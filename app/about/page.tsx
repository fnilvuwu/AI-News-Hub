"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/ui/footer"
import { Header } from "@/components/ui/header"
import { Brain, Database, Globe, Palette, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <div className="mb-6">
                        <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                            About AI News Hub
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Your premier destination for the latest artificial intelligence news, insights, and breakthroughs
                        </p>
                    </div>
                </section>

                {/* Mission Statement */}
                <section className="mb-16">
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="text-2xl font-serif text-center">Mission</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                                AI News Hub is dedicated to providing comprehensive, up-to-date coverage of the rapidly evolving
                                artificial intelligence landscape. We curate and present the most important AI developments,
                                research breakthroughs, and industry insights to keep our readers informed about the technologies
                                shaping our future.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Developer Information */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif font-bold text-center mb-8">Meet the Developer</h2>
                    <Card className="max-w-2xl mx-auto border-border bg-card">
                        <CardContent className="text-center p-8">
                            <div className="mb-6">
                                <div className="w-24 h-24 mx-auto mb-4 relative overflow-hidden rounded-full border-4 border-primary/20">
                                    <Image
                                        src="/fnilvuwu-photo.png"
                                        alt="fnilvuwu - Developer"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 96px, 96px"
                                    />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Rahmatullah R</h3>
                                <Badge variant="secondary" className="mb-4">Web Developer</Badge>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                A passionate web developer with expertise in modern frontend technologies. This project was
                                created as part of a technical interview for a Web Developer Internship position at Digital Hero,
                                showcasing skills in React, Next.js, TypeScript, and modern web development practices.
                            </p>
                            <div className="flex justify-center space-x-4">
                                <Button variant="outline" asChild>
                                    <Link href="/contact">Get in Touch</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Project Context */}
                <section className="mb-16">
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="text-2xl font-serif text-center">Project Context</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-6">
                                This AI News Hub was developed as a technical demonstration for a Web Developer Internship
                                position at <strong>Digital Hero</strong>. The project showcases modern web development
                                capabilities including responsive design, API integration, real-time data fetching, and
                                user-centric features.
                            </p>
                            <Badge variant="outline" className="text-sm">
                                Technical Interview Project - Digital Hero
                            </Badge>
                        </CardContent>
                    </Card>
                </section>

                {/* Technology Stack */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif font-bold text-center mb-8">Technology Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="border-border bg-card">
                            <CardHeader className="text-center">
                                <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                                <CardTitle className="text-lg">Frontend</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <div className="space-y-2">
                                    <Badge variant="secondary">Next.js 15</Badge>
                                    <Badge variant="secondary">React 18</Badge>
                                    <Badge variant="secondary">TypeScript</Badge>
                                    <Badge variant="secondary">Tailwind CSS</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card">
                            <CardHeader className="text-center">
                                <Database className="h-8 w-8 text-primary mx-auto mb-2" />
                                <CardTitle className="text-lg">API & Data</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <div className="space-y-2">
                                    <Badge variant="secondary">NewsAPI</Badge>
                                    <Badge variant="secondary">The Guardian API</Badge>
                                    <Badge variant="secondary">The New York Times API</Badge>
                                    <Badge variant="secondary">REST APIs</Badge>
                                    <Badge variant="secondary">AI Content Filtering</Badge>
                                    <Badge variant="secondary">Real-time Updates</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card">
                            <CardHeader className="text-center">
                                <Palette className="h-8 w-8 text-primary mx-auto mb-2" />
                                <CardTitle className="text-lg">UI/UX</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <div className="space-y-2">
                                    <Badge variant="secondary">Radix UI</Badge>
                                    <Badge variant="secondary">Lucide Icons</Badge>
                                    <Badge variant="secondary">Responsive Design</Badge>
                                    <Badge variant="secondary">Dark Mode</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Features */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif font-bold text-center mb-8">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Zap className="h-5 w-5 text-primary mr-2" />
                                    Real-time AI News
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Automatically curated AI news from multiple sources with intelligent filtering
                                    to ensure only relevant artificial intelligence content is displayed.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Brain className="h-5 w-5 text-primary mr-2" />
                                    Smart Search
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Intelligent search functionality that filters through AI articles based on
                                    headlines and content, making it easy to find specific topics.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Globe className="h-5 w-5 text-primary mr-2" />
                                    Responsive Design
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Fully responsive design that works seamlessly across desktop, tablet,
                                    and mobile devices with optimized user experience.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Palette className="h-5 w-5 text-primary mr-2" />
                                    Modern UI
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Clean, modern interface with dark/light mode support, smooth animations,
                                    and accessibility-focused design principles.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center">
                    <Card className="border-border bg-card max-w-2xl mx-auto">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-serif font-bold mb-4">Ready to Explore?</h2>
                            <p className="text-muted-foreground mb-6">
                                Discover the latest AI developments and stay ahead of the curve with our curated news feed.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button asChild className="w-full sm:w-auto">
                                    <Link href="/">Browse Latest News</Link>
                                </Button>
                                <Button variant="outline" asChild className="w-full sm:w-auto">
                                    <Link href="/contact">Contact Developer</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </main>

            <Footer />
        </div>
    )
}
