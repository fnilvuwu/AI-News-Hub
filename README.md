# AI News Hub

A modern, responsive AI news portal built with Next.js 15, TypeScript, and Tailwind CSS. Get the latest AI and technology news from NewsAPI.

## Features

- **Real-time AI News**: Fetches latest AI-related news from NewsAPI
- **Smart Categorization**: Automatically categorizes articles into AI-specific topics
- **Search Functionality**: Search through articles in real-time
- **Responsive Design**: Fully responsive design that works on all devices
- **Dark Mode Support**: Built-in theme switching with next-themes
- **Featured Articles**: Highlights important stories
- **Modern UI**: Clean, professional interface using shadcn/ui components

## Categories

- AI Models (GPT, ChatGPT, Language Models)
- AI Research (Studies, Breakthroughs, Discoveries)
- Autonomous AI (Self-driving, Robotics)
- AI Healthcare (Medical AI, Drug Discovery)
- AI Tools (Productivity, Copilot, Assistants)
- AI Hardware (Chips, NVIDIA, Processors)
- AI Ethics (Safety, Regulation, Policy)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- NewsAPI account (free at [newsapi.org](https://newsapi.org/register))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/AI-News-Hub.git
   cd AI-News-Hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your NewsAPI key:
   ```env
   NEWSAPI_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Setup

1. Go to [NewsAPI.org](https://newsapi.org/register)
2. Create a free account
3. Get your API key from the dashboard
4. Add it to your `.env.local` file

**Note**: The free tier of NewsAPI allows 1,000 requests per day and doesn't include live data for non-developer accounts.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Fonts**: Space Grotesk, DM Sans
- **Theme**: next-themes for dark mode
- **API**: NewsAPI for real-time news data

## Project Structure

```
├── app/
│   ├── api/news/          # API routes for fetching news
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Main news portal page
├── components/
│   ├── ui/                # shadcn/ui components
│   └── theme-provider.tsx # Theme context provider
├── hooks/
│   └── use-news.ts        # Custom hook for news data
├── lib/
│   ├── newsapi.ts         # NewsAPI integration utilities
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## Features in Detail

### Real-time News Fetching
- Fetches AI-related news from multiple search terms
- Filters out removed/invalid articles
- Transforms NewsAPI data to app format
- Handles errors gracefully with fallbacks

### Smart Categorization
Articles are automatically categorized based on keywords in titles and descriptions:
- AI Models: OpenAI, GPT, ChatGPT, language models
- AI Research: research, study, breakthrough, discovery
- Autonomous AI: autonomous, self-driving, Tesla, robotics
- AI Healthcare: healthcare, medical, drug, disease
- AI Tools: tool, productivity, copilot, assistant
- AI Hardware: chip, NVIDIA, processor, hardware
- AI Ethics: ethics, safety, regulation, policy

### Search & Filtering
- Real-time search across headlines, categories, and summaries
- Debounced search to reduce API calls
- Clear search functionality
- Shows result counts

### Responsive Design
- Mobile-first approach
- Collapsible navigation menu
- Responsive grid layouts
- Touch-friendly interactions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [NewsAPI](https://newsapi.org/) for providing news data
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Lucide](https://lucide.dev/) for icons
- [Next.js](https://nextjs.org/) team for the amazing framework