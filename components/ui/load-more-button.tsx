import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface LoadMoreButtonProps {
    onLoadMore: () => void
    loading: boolean
    hasMore: boolean
    className?: string
}

export function LoadMoreButton({ onLoadMore, loading, hasMore, className }: LoadMoreButtonProps) {
    if (!hasMore) {
        return null
    }

    return (
        <div className={`flex justify-center ${className || ''}`}>
            <Button
                onClick={onLoadMore}
                disabled={loading}
                variant="outline"
                size="lg"
                className="min-w-[200px]"
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading more...
                    </>
                ) : (
                    'Load More Articles'
                )}
            </Button>
        </div>
    )
}
