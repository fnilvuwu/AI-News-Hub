import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/ui/footer"
import { Header } from "@/components/ui/header"
import { Building, Database, Eye, Globe, Lock, Mail, Shield, User, Users } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl blur-3xl"></div>
                        <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12">
                            <Shield className="h-20 w-20 text-primary mx-auto mb-6" />
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                                Privacy Policy
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-4">
                                We respect your privacy and are committed to protecting your personal information
                            </p>
                            <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                                <p className="text-sm font-medium text-primary">
                                    Last updated: August 19, 2025
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Table of Contents - Desktop Sidebar */}
                    <aside className="lg:col-span-3">
                        <div className="sticky top-24">
                            <Card className="border-border bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-lg font-serif">Contents</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <nav className="space-y-2">
                                        <a href="#introduction" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            Introduction
                                        </a>
                                        <a href="#information-collect" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            Information We Collect
                                        </a>
                                        <a href="#how-we-use" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            How We Use Information
                                        </a>
                                        <a href="#third-party" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            Third-Party Services
                                        </a>
                                        <a href="#data-security" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            Data Security
                                        </a>
                                        <a href="#your-rights" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            Your Rights
                                        </a>
                                        <a href="#contact-us" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            Contact Us
                                        </a>
                                        <a href="#updates" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            Policy Updates
                                        </a>
                                    </nav>
                                </CardContent>
                            </Card>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-8">
                        {/* Introduction */}
                        <Card id="introduction" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center text-2xl font-serif">
                                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                                        <Eye className="h-6 w-6 text-primary" />
                                    </div>
                                    Introduction
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <p className="text-muted-foreground leading-relaxed">
                                    This Privacy Policy describes how AI News Hub ("we," "our," or "us") collects, uses,
                                    and protects your information when you use our website. This project was created by
                                    <span className="font-semibold text-foreground"> Rahmatullah R (fnilvuwu)</span> as a technical demonstration for a Web Developer Internship position at
                                    <span className="font-semibold text-primary"> Digital Hero</span>.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    By using our service, you agree to the collection and use of information in accordance
                                    with this policy.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Information We Collect */}
                        <Card id="information-collect" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center text-2xl font-serif">
                                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                                        <Database className="h-6 w-6 text-primary" />
                                    </div>
                                    Information We Collect
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <div className="space-y-6">
                                    <div className="bg-muted/30 rounded-lg p-6 border border-border">
                                        <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
                                            <Users className="h-5 w-5 text-primary mr-2" />
                                            Personal Information
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed mb-4">
                                            Currently, AI News Hub does not require user registration or collect personal information
                                            such as names, email addresses, or phone numbers. However, if you contact us through our
                                            contact form, we may collect:
                                        </p>
                                        <ul className="space-y-2 text-muted-foreground">
                                            <li className="flex items-start">
                                                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                Your name and email address (when provided voluntarily)
                                            </li>
                                            <li className="flex items-start">
                                                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                Any message content you choose to send
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-muted/30 rounded-lg p-6 border border-border">
                                        <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
                                            <Globe className="h-5 w-5 text-primary mr-2" />
                                            Automatically Collected Information
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed mb-4">
                                            When you visit our website, we may automatically collect certain information, including:
                                        </p>
                                        <ul className="space-y-2 text-muted-foreground">
                                            <li className="flex items-start">
                                                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                Your IP address and general location information
                                            </li>
                                            <li className="flex items-start">
                                                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                Browser type and version
                                            </li>
                                            <li className="flex items-start">
                                                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                Device information and screen resolution
                                            </li>
                                            <li className="flex items-start">
                                                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                Pages visited and time spent on our site
                                            </li>
                                            <li className="flex items-start">
                                                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                Referring website information
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* How We Use Information */}
                        <Card id="how-we-use" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center text-2xl font-serif">
                                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                                        <Users className="h-6 w-6 text-primary" />
                                    </div>
                                    How We Use Your Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    We use the collected information for the following purposes:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                                        <h4 className="font-semibold text-foreground mb-2">Service Provision</h4>
                                        <p className="text-sm text-muted-foreground">To provide and maintain our AI news aggregation service</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                                        <h4 className="font-semibold text-foreground mb-2">Improvement</h4>
                                        <p className="text-sm text-muted-foreground">To understand how users interact with our website and improve functionality</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                                        <h4 className="font-semibold text-foreground mb-2">Communication</h4>
                                        <p className="text-sm text-muted-foreground">To respond to your inquiries and provide customer support</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                                        <h4 className="font-semibold text-foreground mb-2">Analytics</h4>
                                        <p className="text-sm text-muted-foreground">To analyze usage patterns and optimize user experience</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800 md:col-span-2">
                                        <h4 className="font-semibold text-foreground mb-2">Technical Security</h4>
                                        <p className="text-sm text-muted-foreground">To ensure website security and prevent abuse</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Third-Party Services */}
                        <Card id="third-party" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center text-2xl font-serif">
                                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                                        <Globe className="h-6 w-6 text-primary" />
                                    </div>
                                    Third-Party Services
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    Our website integrates with the following third-party services:
                                </p>

                                <div className="space-y-6">
                                    <div className="border border-border rounded-lg p-6 bg-gradient-to-r from-primary/5 to-primary/10">
                                        <div className="flex items-center mb-3">
                                            <div className="p-2 bg-primary/20 rounded-lg mr-3">
                                                <Database className="h-5 w-5 text-primary" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-foreground">NewsAPI</h3>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            We use NewsAPI to fetch news articles. When you search for news, your search queries
                                            may be processed by NewsAPI. Please review NewsAPI's privacy policy for more information
                                            about their data handling practices.
                                        </p>
                                    </div>

                                    <div className="border border-border rounded-lg p-6 bg-gradient-to-r from-secondary/5 to-secondary/10">
                                        <div className="flex items-center mb-3">
                                            <div className="p-2 bg-secondary/20 rounded-lg mr-3">
                                                <Globe className="h-5 w-5 text-primary" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-foreground">Hosting and Analytics</h3>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Our website may be hosted on platforms like Vercel or Netlify, and we may use analytics
                                            services to understand website usage. These services may collect additional information
                                            as described in their respective privacy policies.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Data Security */}
                        <Card id="data-security" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center text-2xl font-serif">
                                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                                        <Lock className="h-6 w-6 text-primary" />
                                    </div>
                                    Data Security
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    We implement appropriate technical and organizational security measures to protect your
                                    personal information against unauthorized access, alteration, disclosure, or destruction.
                                    However, please note that no method of transmission over the internet or electronic storage
                                    is 100% secure.
                                </p>
                                <div className="bg-muted/30 rounded-lg p-6 border border-border">
                                    <h4 className="text-lg font-semibold text-foreground mb-4">Security measures include:</h4>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div className="flex items-center">
                                            <Lock className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                                            <span className="text-muted-foreground">HTTPS encryption for all data transmission</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Shield className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                                            <span className="text-muted-foreground">Secure hosting infrastructure</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Eye className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                                            <span className="text-muted-foreground">Regular security updates and monitoring</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                                            <span className="text-muted-foreground">Limited access to personal information</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Your Rights */}
                        <Card id="your-rights" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-2xl font-serif">Your Rights and Choices</CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <p className="text-muted-foreground leading-relaxed mb-6">You have the right to:</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="border border-border rounded-lg p-4">
                                        <h4 className="font-semibold text-foreground mb-2">Access</h4>
                                        <p className="text-sm text-muted-foreground">Request information about what personal data we have about you</p>
                                    </div>
                                    <div className="border border-border rounded-lg p-4">
                                        <h4 className="font-semibold text-foreground mb-2">Correction</h4>
                                        <p className="text-sm text-muted-foreground">Request correction of inaccurate personal information</p>
                                    </div>
                                    <div className="border border-border rounded-lg p-4">
                                        <h4 className="font-semibold text-foreground mb-2">Deletion</h4>
                                        <p className="text-sm text-muted-foreground">Request deletion of your personal information</p>
                                    </div>
                                    <div className="border border-border rounded-lg p-4">
                                        <h4 className="font-semibold text-foreground mb-2">Opt-out</h4>
                                        <p className="text-sm text-muted-foreground">Disable cookies in your browser settings</p>
                                    </div>
                                    <div className="border border-border rounded-lg p-4 md:col-span-2">
                                        <h4 className="font-semibold text-foreground mb-2">Contact</h4>
                                        <p className="text-sm text-muted-foreground">Reach out to us with any privacy-related questions</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card id="contact-us" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-2xl font-serif">Contact Us</CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                                </p>
                                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <User className="h-5 w-5 text-primary mr-3" />
                                            <span className="font-semibold text-foreground">Developer:</span>
                                            <span className="text-muted-foreground ml-2">Rahmatullah R (fnilvuwu)</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Building className="h-5 w-5 text-primary mr-3" />
                                            <span className="font-semibold text-foreground">Project Context:</span>
                                            <span className="text-muted-foreground ml-2">Technical Interview Project for Digital Hero</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Mail className="h-5 w-5 text-primary mr-3" />
                                            <span className="font-semibold text-foreground">Contact:</span>
                                            <Link href="/contact" className="text-primary hover:underline ml-2">Contact Form</Link>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Updates */}
                        <Card id="updates" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-2xl font-serif">Policy Updates</CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
                                    <p className="text-muted-foreground leading-relaxed">
                                        We may update this Privacy Policy from time to time. Any changes will be posted on this page
                                        with an updated "Last updated" date. We encourage you to review this Privacy Policy periodically
                                        for any changes. Continued use of our service after any modifications indicates your acceptance of the updated
                                        Privacy Policy.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
