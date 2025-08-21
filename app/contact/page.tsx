"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/ui/footer"
import { Header } from "@/components/ui/header"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Building, Code, Github, Globe, Linkedin, Mail, MessageSquare, Send, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Construct email parameters
        const emailTo = 'mamatmks45@gmail.com'
        const emailSubject = encodeURIComponent(formData.subject || 'Contact from AI News Hub')
        const emailBody = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n\n` +
            `Message:\n${formData.message}`
        )

        // Create mailto link
        const mailtoLink = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`

        // Try to open default mail client
        try {
            window.location.href = mailtoLink
        } catch (error) {
            // Fallback: show instructions to user
            alert(
                'Please send your message to: mamatmks45@gmail.com\n\n' +
                `Subject: ${formData.subject}\n\n` +
                `Name: ${formData.name}\n` +
                `Email: ${formData.email}\n\n` +
                `Message: ${formData.message}`
            )
        }

        // Reset form after submission
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <section className="text-center mb-12">
                    <Mail className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Have questions about AI News Hub or want to connect with the developer?
                    </p>
                </section>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <MessageSquare className="h-5 w-5 text-primary mr-2" />
                                Send a Message
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="your.email@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        placeholder="What's this about?"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Tell me about your question, feedback, or collaboration idea..."
                                        className="min-h-[120px]"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    <Send className="h-4 w-4 mr-2" />
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Developer Information */}
                    <div className="space-y-8">
                        {/* Developer Card */}
                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <User className="h-5 w-5 text-primary mr-2" />
                                    Developer Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center mb-6">
                                    <div className="w-20 h-20 mx-auto mb-4 relative overflow-hidden rounded-full border-4 border-primary/20">
                                        <Image
                                            src="/fnilvuwu-photo.png"
                                            alt="fnilvuwu - Developer"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 80px, 80px"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Rahmatullah R</h3>
                                    <Badge variant="secondary" className="mb-2">Web Developer</Badge>
                                    <p className="text-muted-foreground">
                                        Passionate about creating modern, user-friendly web applications with clean code and great user experience.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <Code className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="font-medium">Specializes in</p>
                                            <p className="text-sm text-muted-foreground">React, Next.js, TypeScript, Tailwind CSS</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Building className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="font-medium">Project Context</p>
                                            <p className="text-sm text-muted-foreground">Technical Interview for Digital Hero</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Social Links */}
                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle>Connect on Social</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <p className="text-muted-foreground text-sm">
                                        While this is a demo project, here's where you might typically find developer social links:
                                    </p>

                                    <div className="grid grid-cols-1 gap-3">
                                        <Link
                                            href="mailto:mamatmks45@gmail.com"
                                            className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                                        >
                                            <Mail className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium">Email</p>
                                                <p className="text-sm text-muted-foreground">mamatmks45@gmail.com</p>
                                            </div>
                                        </Link>
                                        
                                        <Link
                                            href="https://github.com/fnilvuwu"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                                        >
                                            <Github className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium">GitHub</p>
                                                <p className="text-sm text-muted-foreground">github.com/fnilvuwu</p>
                                            </div>
                                        </Link>

                                        <Link
                                            href="https://linkedin.com/in/fnilvuwu"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                                        >
                                            <Linkedin className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium">LinkedIn</p>
                                                <p className="text-sm text-muted-foreground">linkedin.com/in/fnilvuwu</p>
                                            </div>
                                        </Link>

                                        <Link
                                            href="https://fnilvuwu.vercel.app"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                                        >
                                            <Globe className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium">Portfolio</p>
                                                <p className="text-sm text-muted-foreground">fnilvuwu.vercel.app</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Project Information */}
                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle>About This Project</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <p className="text-muted-foreground">
                                        AI News Hub was created as a technical demonstration showcasing modern web development
                                        skills and best practices for a Web Developer Internship position at Digital Hero.
                                    </p>

                                    <div className="space-y-3">
                                        <div>
                                            <p className="font-medium text-sm">Key Features Demonstrated:</p>
                                            <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                                                <li>• Responsive design and mobile optimization</li>
                                                <li>• API integration and data fetching</li>
                                                <li>• Modern React patterns and hooks</li>
                                                <li>• TypeScript for type safety</li>
                                                <li>• Tailwind CSS for styling</li>
                                                <li>• User experience considerations</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <p className="font-medium text-sm">Technical Highlights:</p>
                                            <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                                                <li>• Server-side rendering with Next.js</li>
                                                <li>• Real-time news filtering and search</li>
                                                <li>• Load more pagination functionality</li>
                                                <li>• Accessibility-focused design</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Call to Action */}
                <section className="text-center mt-16">
                    <Card className="border-border bg-card max-w-2xl mx-auto">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-serif font-bold mb-4">Ready to Collaborate?</h2>
                            <p className="text-muted-foreground mb-6">
                                Whether you have questions about this project, want to discuss opportunities, or just
                                want to connect, I'd love to hear from you!
                            </p>
                            <Button asChild>
                                <Link href="/">Explore the Project</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </section>
            </main>

            <Footer />
        </div>
    )
}
