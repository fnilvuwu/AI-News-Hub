import { Loader2 } from "lucide-react"

interface LoadingIndicatorProps {
    message?: string
    className?: string
    compact?: boolean
}

export function LoadingIndicator({
    message = "Loading AI news...",
    className = "",
    compact = false
}: LoadingIndicatorProps) {
    if (compact) {
        return (
            <div className={`text-center ${className}`}>
                <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">
                        {message}
                    </span>
                </div>
            </div>
        )
    }

    return (
        <div className={`flex flex-col items-center justify-center min-h-[60vh] w-full ${className}`}>
            <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground font-sans text-lg animate-pulse">
                    {message}
                </p>
            </div>
        </div>
    )
}
