import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/ui/footer"
import { Header } from "@/components/ui/header"
import { Database, Eye, Globe, Lock, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <section className="text-center mb-12">
                    <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        We respect your privacy and are committed to protecting your personal information
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
                                <Eye className="h-5 w-5 text-primary mr-2" />
                                Introduction
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>
                                This Privacy Policy describes how AI News Hub ("we," "our," or "us") collects, uses,
                                and protects your information when you use our website. This project was created by
                                fnilvuwu as a technical demonstration for a Web Developer Internship position at Digital Hero.
                            </p>
                            <p>
                                By using our service, you agree to the collection and use of information in accordance
                                with this policy.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Information We Collect */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Database className="h-5 w-5 text-primary mr-2" />
                                Information We Collect
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <h3>Personal Information</h3>
                            <p>
                                Currently, AI News Hub does not require user registration or collect personal information
                                such as names, email addresses, or phone numbers. However, if you contact us through our
                                contact form, we may collect:
                            </p>
                            <ul>
                                <li>Your name and email address (when provided voluntarily)</li>
                                <li>Any message content you choose to send</li>
                            </ul>

                            <h3>Automatically Collected Information</h3>
                            <p>
                                When you visit our website, we may automatically collect certain information, including:
                            </p>
                            <ul>
                                <li>Your IP address and general location information</li>
                                <li>Browser type and version</li>
                                <li>Device information and screen resolution</li>
                                <li>Pages visited and time spent on our site</li>
                                <li>Referring website information</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* How We Use Information */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Users className="h-5 w-5 text-primary mr-2" />
                                How We Use Your Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>We use the collected information for the following purposes:</p>
                            <ul>
                                <li><strong>Service Provision:</strong> To provide and maintain our AI news aggregation service</li>
                                <li><strong>Improvement:</strong> To understand how users interact with our website and improve functionality</li>
                                <li><strong>Communication:</strong> To respond to your inquiries and provide customer support</li>
                                <li><strong>Analytics:</strong> To analyze usage patterns and optimize user experience</li>
                                <li><strong>Technical:</strong> To ensure website security and prevent abuse</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Third-Party Services */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Globe className="h-5 w-5 text-primary mr-2" />
                                Third-Party Services
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>Our website integrates with the following third-party services:</p>

                            <h3>NewsAPI</h3>
                            <p>
                                We use NewsAPI to fetch news articles. When you search for news, your search queries
                                may be processed by NewsAPI. Please review NewsAPI's privacy policy for more information
                                about their data handling practices.
                            </p>

                            <h3>Hosting and Analytics</h3>
                            <p>
                                Our website may be hosted on platforms like Vercel or Netlify, and we may use analytics
                                services to understand website usage. These services may collect additional information
                                as described in their respective privacy policies.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Data Security */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Lock className="h-5 w-5 text-primary mr-2" />
                                Data Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>
                                We implement appropriate technical and organizational security measures to protect your
                                personal information against unauthorized access, alteration, disclosure, or destruction.
                                However, please note that no method of transmission over the internet or electronic storage
                                is 100% secure.
                            </p>
                            <p>Security measures include:</p>
                            <ul>
                                <li>HTTPS encryption for all data transmission</li>
                                <li>Secure hosting infrastructure</li>
                                <li>Regular security updates and monitoring</li>
                                <li>Limited access to personal information</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Your Rights */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle>Your Rights and Choices</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>You have the right to:</p>
                            <ul>
                                <li><strong>Access:</strong> Request information about what personal data we have about you</li>
                                <li><strong>Correction:</strong> Request correction of inaccurate personal information</li>
                                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                                <li><strong>Opt-out:</strong> Disable cookies in your browser settings</li>
                                <li><strong>Contact:</strong> Reach out to us with any privacy-related questions</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle>Contact Us</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>
                                If you have any questions about this Privacy Policy or our data practices, please contact us:
                            </p>
                            <ul>
                                <li><strong>Developer:</strong> fnilvuwu</li>
                                <li><strong>Project Context:</strong> Technical Interview Project for Digital Hero</li>
                                <li><strong>Contact:</strong> <Link href="/contact" className="text-primary hover:underline">Contact Form</Link></li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Updates */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle>Policy Updates</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>
                                We may update this Privacy Policy from time to time. Any changes will be posted on this page
                                with an updated "Last updated" date. We encourage you to review this Privacy Policy periodically
                                for any changes.
                            </p>
                            <p>
                                Continued use of our service after any modifications indicates your acceptance of the updated
                                Privacy Policy.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    )
}
