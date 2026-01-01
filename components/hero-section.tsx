"use client"

import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Drama } from "@/lib/types"
import Link from "next/link"

interface HeroSectionProps {
  drama?: Drama
}

export function HeroSection({ drama }: HeroSectionProps) {
  // Fallback content if no drama provided
  const title = drama?.bookName || "Welcome to Dracin"
  const description = drama?.introduction || "Discover the best Korean and Asian dramas, all in one place."
  const coverImage = drama?.coverWap || "/placeholder.svg?height=800&width=1600"
  const episodes = drama?.chapterCount || 0
  const tags = drama?.tags || []
  const year = drama?.shelfTime ? new Date(drama.shelfTime).getFullYear() : new Date().getFullYear()

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />

      <img
        src={coverImage}
        alt={title}
        className="h-full w-full object-cover object-top"
      />

      <div className="absolute bottom-0 left-0 z-20 p-8 md:p-16 lg:p-24 max-w-2xl">
        <Badge className="mb-4 bg-accent text-accent-foreground">Featured</Badge>
        <h1 className="text-4xl font-bold leading-tight text-balance mb-4 md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-6 text-pretty md:text-lg line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
          <span className="text-accent font-semibold">{episodes} Episodes</span>
          <span className="text-muted-foreground">{year}</span>
          {tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="px-2 py-0.5 border border-border rounded text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {drama && (
            <Link href={`/drama/${drama.bookId}`}>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Play className="mr-2 h-5 w-5 fill-current" />
                Play
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
