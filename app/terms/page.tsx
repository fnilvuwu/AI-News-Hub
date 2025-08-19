import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/ui/footer"
import { Header } from "@/components/ui/header"
import { AlertTriangle, FileText, Globe, Scale, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <section className="text-center mb-12">
                    <Scale className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Please read these terms carefully before using AI News Hub
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                        Last updated: August 19, 2025
                    </p>
                </section>

                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Introduction */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <FileText className="h-5 w-5 text-primary mr-2" />
                                Introduction
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>
                                Welcome to AI News Hub. These Terms of Service ("Terms") govern your use of our website
                                and services. This project was created by fnilvuwu as a technical demonstration for a
                                Web Developer Internship position at Digital Hero.
                            </p>
                            <p>
                                By accessing or using AI News Hub, you agree to be bound by these Terms. If you disagree
                                with any part of these terms, then you may not access the service.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Acceptance of Terms */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Users className="h-5 w-5 text-primary mr-2" />
                                Acceptance of Terms
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>
                                By accessing and using this website, you accept and agree to be bound by the terms and
                                provision of this agreement. Additionally, when using this website's particular services,
                                you shall be subject to any posted guidelines or rules applicable to such services.
                            </p>
                            <p>
                                This agreement is effective as of the date you first access or use the website.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Use License */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Globe className="h-5 w-5 text-primary mr-2" />
                                Use License
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>
                                Permission is granted to temporarily download one copy of AI News Hub for personal,
                                non-commercial transitory viewing only. This is the grant of a license, not a transfer
                                of title, and under this license you may not:
                            </p>
                            <ul>
                                <li>Modify or copy the materials</li>
                                <li>Use the materials for any commercial purpose or for any public display</li>
                                <li>Attempt to reverse engineer any software contained on the website</li>
                                <li>Remove any copyright or other proprietary notations from the materials</li>
                            </ul>
                            <p>
                                This license shall automatically terminate if you violate any of these restrictions and
                                may be terminated by us at any time.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Disclaimer */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <AlertTriangle className="h-5 w-5 text-primary mr-2" />
                                Disclaimer
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>
                                The materials on AI News Hub are provided on an 'as is' basis. AI News Hub makes no
                                warranties, expressed or implied, and hereby disclaims and negates all other warranties
                                including without limitation, implied warranties or conditions of merchantability,
                                fitness for a particular purpose, or non-infringement of intellectual property or other
                                violation of rights.
                            </p>
                            <p>
                                Further, AI News Hub does not warrant or make any representations concerning the accuracy,
                                likely results, or reliability of the use of the materials on its website or otherwise
                                relating to such materials or on any sites linked to this site.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Content and Accuracy */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle>Content and Accuracy</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>
                                AI News Hub aggregates news content from third-party sources, primarily through NewsAPI.
                                We strive to provide accurate and up-to-date information, but we cannot guarantee the
                                accuracy, completeness, or timeliness of the content displayed.
                            </p>
                            <ul>
                                <li>News articles are sourced from external publishers</li>
                                <li>We do not create or modify the original news content</li>
                                <li>All articles link back to their original sources</li>
                                <li>We filter content to focus on AI-related topics</li>
                            </ul>
                            <p>
                                Users should verify important information with original sources before making decisions
                                based on the content provided.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Prohibited Uses */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle>Prohibited Uses</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>You may not use AI News Hub:</p>
                            <ul>
                                <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                                <li>To submit false or misleading information</li>
                                <li>To upload or transmit viruses or any other type of malicious code</li>
                                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                                <li>For any obscene or immoral purpose</li>
                                <li>To interfere with or circumvent the security features of the service</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Intellectual Property */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Shield className="h-5 w-5 text-primary mr-2" />
                                Intellectual Property
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>
                                The website design, code, and original content of AI News Hub are the intellectual property
                                of fnilvuwu. This includes but is not limited to:
                            </p>
                            <ul>
                                <li>Website design and layout</li>
                                <li>Source code and functionality</li>
                                <li>Original graphics and logos</li>
                                <li>User interface and user experience design</li>
                            </ul>
                            <p>
                                News articles and associated content remain the property of their respective publishers
                                and are used under fair use principles for aggregation and linking purposes.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Limitations */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle>Limitations</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>
                                In no event shall AI News Hub or its suppliers be liable for any damages (including,
                                without limitation, damages for loss of data or profit, or due to business interruption)
                                arising out of the use or inability to use the materials on AI News Hub, even if AI News Hub
                                or an AI News Hub authorized representative has been notified orally or in writing of the
                                possibility of such damage.
                            </p>
                            <p>
                                Because some jurisdictions do not allow limitations on implied warranties, or limitations
                                of liability for consequential or incidental damages, these limitations may not apply to you.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Modifications */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle>Terms Modifications</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>
                                AI News Hub may revise these terms of service for its website at any time without notice.
                                By using this website, you are agreeing to be bound by the then current version of these
                                terms of service.
                            </p>
                            <p>
                                It is your responsibility to check this page periodically for changes. Your continued use
                                of the website following the posting of changes constitutes your acceptance of those changes.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>
                                If you have any questions about these Terms of Service, please contact us:
                            </p>
                            <ul>
                                <li><strong>Developer:</strong> fnilvuwu</li>
                                <li><strong>Project Context:</strong> Technical Interview Project for Digital Hero</li>
                                <li><strong>Contact:</strong> <Link href="/contact" className="text-primary hover:underline">Contact Form</Link></li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Governing Law */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle>Governing Law</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>
                                These terms and conditions are governed by and construed in accordance with applicable
                                laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that
                                state or location.
                            </p>
                            <p>
                                This agreement constitutes the entire agreement between AI News Hub and you in relation
                                to your use of this website, and supersedes all prior agreements and understandings.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    )
}
