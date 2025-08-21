import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/ui/footer"
import { Header } from "@/components/ui/header"
import { AlertTriangle, Building, FileText, Globe, Mail, Scale, Shield, User, Users } from "lucide-react"
import Link from "next/link"

export default function TermsOfServicePage() {
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
                            <Scale className="h-20 w-20 text-primary mx-auto mb-6" />
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                                Terms of Service
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-4">
                                Please read these terms carefully before using AI News Hub
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
                                        <a href="#acceptance" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            Acceptance of Terms
                                        </a>
                                        <a href="#use-license" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            Use License
                                        </a>
                                        <a href="#disclaimer" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            Disclaimer
                                        </a>
                                        <a href="#content-accuracy" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            Content and Accuracy
                                        </a>
                                        <a href="#prohibited-uses" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            Prohibited Uses
                                        </a>
                                        <a href="#intellectual-property" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            Intellectual Property
                                        </a>
                                        <a href="#limitations" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            Limitations
                                        </a>
                                        <a href="#modifications" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            Terms Modifications
                                        </a>
                                        <a href="#contact-info" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            Contact Information
                                        </a>
                                        <a href="#governing-law" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                                            Governing Law
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
                                        <FileText className="h-6 w-6 text-primary" />
                                    </div>
                                    Introduction
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <p className="text-muted-foreground leading-relaxed">
                                    Welcome to AI News Hub. These Terms of Service ("Terms") govern your use of our website
                                    and services. This project was created by <span className="font-semibold text-foreground">Rahmatullah R (fnilvuwu)</span> as a technical demonstration for a
                                    Web Developer Internship position at <span className="font-semibold text-primary">Digital Hero</span>.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    By accessing or using AI News Hub, you agree to be bound by these Terms. If you disagree
                                    with any part of these terms, then you may not access the service.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Acceptance of Terms */}
                        <Card id="acceptance" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center text-2xl font-serif">
                                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                                        <Users className="h-6 w-6 text-primary" />
                                    </div>
                                    Acceptance of Terms
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        By accessing and using this website, you accept and agree to be bound by the terms and
                                        provision of this agreement. Additionally, when using this website's particular services,
                                        you shall be subject to any posted guidelines or rules applicable to such services.
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        This agreement is effective as of the date you first access or use the website.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Use License */}
                        <Card id="use-license" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center text-2xl font-serif">
                                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                                        <Globe className="h-6 w-6 text-primary" />
                                    </div>
                                    Use License
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    Permission is granted to temporarily download one copy of AI News Hub for personal,
                                    non-commercial transitory viewing only. This is the grant of a license, not a transfer
                                    of title, and under this license you may not:
                                </p>
                                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                                    <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                                        Prohibited Actions:
                                    </h4>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            Modify or copy the materials
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            Use the materials for any commercial purpose or for any public display
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            Attempt to reverse engineer any software contained on the website
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            Remove any copyright or other proprietary notations from the materials
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                    <p className="text-muted-foreground text-sm">
                                        This license shall automatically terminate if you violate any of these restrictions and
                                        may be terminated by us at any time.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Disclaimer */}
                        <Card id="disclaimer" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center text-2xl font-serif">
                                    <div className="p-2 bg-amber-100 dark:bg-amber-950/20 rounded-lg mr-3">
                                        <AlertTriangle className="h-6 w-6 text-amber-600" />
                                    </div>
                                    Disclaimer
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
                                    <div className="flex items-start mb-4">
                                        <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                                        <p className="text-muted-foreground leading-relaxed">
                                            The materials on AI News Hub are provided on an 'as is' basis. AI News Hub makes no
                                            warranties, expressed or implied, and hereby disclaims and negates all other warranties
                                            including without limitation, implied warranties or conditions of merchantability,
                                            fitness for a particular purpose, or non-infringement of intellectual property or other
                                            violation of rights.
                                        </p>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Further, AI News Hub does not warrant or make any representations concerning the accuracy,
                                        likely results, or reliability of the use of the materials on its website or otherwise
                                        relating to such materials or on any sites linked to this site.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Content and Accuracy */}
                        <Card id="content-accuracy" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-2xl font-serif">Content and Accuracy</CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    AI News Hub aggregates news content from third-party sources, primarily through NewsAPI.
                                    We strive to provide accurate and up-to-date information, but we cannot guarantee the
                                    accuracy, completeness, or timeliness of the content displayed.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                                        <h4 className="font-semibold text-foreground mb-2">External Sources</h4>
                                        <p className="text-sm text-muted-foreground">News articles are sourced from external publishers</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                                        <h4 className="font-semibold text-foreground mb-2">Original Content</h4>
                                        <p className="text-sm text-muted-foreground">We do not create or modify the original news content</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                                        <h4 className="font-semibold text-foreground mb-2">Source Links</h4>
                                        <p className="text-sm text-muted-foreground">All articles link back to their original sources</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                                        <h4 className="font-semibold text-foreground mb-2">AI Focus</h4>
                                        <p className="text-sm text-muted-foreground">We filter content to focus on AI-related topics</p>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                    <p className="text-muted-foreground text-sm">
                                        Users should verify important information with original sources before making decisions
                                        based on the content provided.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Prohibited Uses */}
                        <Card id="prohibited-uses" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-2xl font-serif">Prohibited Uses</CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <p className="text-muted-foreground leading-relaxed mb-6">You may not use AI News Hub:</p>
                                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                                    <div className="space-y-3">
                                        {[
                                            "For any unlawful purpose or to solicit others to unlawful acts",
                                            "To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances",
                                            "To infringe upon or violate our intellectual property rights or the intellectual property rights of others",
                                            "To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate",
                                            "To submit false or misleading information",
                                            "To upload or transmit viruses or any other type of malicious code",
                                            "To spam, phish, pharm, pretext, spider, crawl, or scrape",
                                            "For any obscene or immoral purpose",
                                            "To interfere with or circumvent the security features of the service"
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-start">
                                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                <span className="text-muted-foreground text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Intellectual Property */}
                        <Card id="intellectual-property" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center text-2xl font-serif">
                                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                                        <Shield className="h-6 w-6 text-primary" />
                                    </div>
                                    Intellectual Property
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    The website design, code, and original content of AI News Hub are the intellectual property
                                    of <span className="font-semibold text-foreground">Rahmatullah R (fnilvuwu)</span>. This includes but is not limited to:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <div className="border border-border rounded-lg p-4">
                                        <h4 className="font-semibold text-foreground mb-2">Design & Code</h4>
                                        <ul className="text-sm text-muted-foreground space-y-1">
                                            <li>• Website design and layout</li>
                                            <li>• Source code and functionality</li>
                                        </ul>
                                    </div>
                                    <div className="border border-border rounded-lg p-4">
                                        <h4 className="font-semibold text-foreground mb-2">Visual Elements</h4>
                                        <ul className="text-sm text-muted-foreground space-y-1">
                                            <li>• Original graphics and logos</li>
                                            <li>• User interface design</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                    <p className="text-muted-foreground text-sm">
                                        News articles and associated content remain the property of their respective publishers
                                        and are used under fair use principles for aggregation and linking purposes.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Limitations */}
                        <Card id="limitations" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-2xl font-serif">Limitations</CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        In no event shall AI News Hub or its suppliers be liable for any damages (including,
                                        without limitation, damages for loss of data or profit, or due to business interruption)
                                        arising out of the use or inability to use the materials on AI News Hub, even if AI News Hub
                                        or an AI News Hub authorized representative has been notified orally or in writing of the
                                        possibility of such damage.
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Because some jurisdictions do not allow limitations on implied warranties, or limitations
                                        of liability for consequential or incidental damages, these limitations may not apply to you.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Modifications */}
                        <Card id="modifications" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-2xl font-serif">Terms Modifications</CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <div className="space-y-4">
                                    <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                                        <p className="text-muted-foreground leading-relaxed">
                                            AI News Hub may revise these terms of service for its website at any time without notice.
                                            By using this website, you are agreeing to be bound by the then current version of these
                                            terms of service.
                                        </p>
                                    </div>
                                    <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                                        <p className="text-muted-foreground leading-relaxed">
                                            It is your responsibility to check this page periodically for changes. Your continued use
                                            of the website following the posting of changes constitutes your acceptance of those changes.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card id="contact-info" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-2xl font-serif">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    If you have any questions about these Terms of Service, please contact us:
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

                        {/* Governing Law */}
                        <Card id="governing-law" className="border-border bg-card hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-2xl font-serif">Governing Law</CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate dark:prose-invert max-w-none prose-lg">
                                <div className="bg-gray-50 dark:bg-gray-950/20 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        These terms and conditions are governed by and construed in accordance with applicable
                                        laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that
                                        state or location.
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        This agreement constitutes the entire agreement between AI News Hub and you in relation
                                        to your use of this website, and supersedes all prior agreements and understandings.
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
