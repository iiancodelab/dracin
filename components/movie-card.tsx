import { Play, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface MovieCardProps {
  id: string
  title: string
  image: string
  year: string
  rating: string
  duration: string
}

export function MovieCard({ id, title, image, year, rating, duration }: MovieCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-lg border-0 bg-card transition-all hover:scale-105 hover:shadow-xl">
      <Link href={`/watch/${id}`}>
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <Button size="icon" className="h-12 w-12 rounded-full bg-accent hover:bg-accent/90">
              <Play className="h-6 w-6 fill-current" />
            </Button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform group-hover:translate-y-0">
            <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1">{title}</h3>
            <div className="flex items-center gap-2 text-xs text-white/80 mb-2">
              <span>{year}</span>
              <span>•</span>
              <span>{duration}</span>
              <span>•</span>
              <span className="text-accent">{rating}</span>
            </div>
            <Button size="sm" variant="secondary" className="w-full">
              <Plus className="mr-1 h-4 w-4" />
              My List
            </Button>
          </div>
        </div>
      </Link>
    </Card>
  )
}
