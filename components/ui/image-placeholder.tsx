'use client'

import { cn } from "@/lib/utils"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ImagePlaceholderProps {
    src?: string | null
    alt: string
    className?: string
    aspectRatio?: "square" | "video" | "auto"
    showIcon?: boolean
}

export function ImagePlaceholder({
    src,
    alt,
    className,
    aspectRatio = "auto",
    showIcon = true
}: ImagePlaceholderProps) {
    const [imageError, setImageError] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)

    const aspectRatioClasses = {
        square: "aspect-square",
        video: "aspect-video",
        auto: "aspect-[16/10]"
    }

    // Show placeholder if no src, src is empty, or image failed to load
    const showPlaceholder = !src || src.trim() === "" || imageError

    if (showPlaceholder) {
        return (
            <div className={cn(
                "flex items-center justify-center bg-muted rounded-md overflow-hidden",
                aspectRatioClasses[aspectRatio],
                className
            )}>
                <div className="flex flex-col items-center justify-center text-muted-foreground p-4">
                    {showIcon && <ImageIcon className="h-8 w-8 mb-2 opacity-50" />}
                    <span className="text-xs text-center opacity-70">No image available</span>
                </div>
            </div>
        )
    }

    return (
        <div className={cn(
            "relative overflow-hidden rounded-md bg-muted",
            aspectRatioClasses[aspectRatio],
            className
        )}>
            {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent mb-2" />
                        <span className="text-xs opacity-70">Loading...</span>
                    </div>
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                fill
                className={cn(
                    "object-cover transition-opacity duration-300",
                    imageLoading ? "opacity-0" : "opacity-100"
                )}
                onError={() => {
                    setImageError(true)
                    setImageLoading(false)
                }}
                onLoad={() => {
                    setImageLoading(false)
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
    )
}
