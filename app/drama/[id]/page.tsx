import { getDramaDetail } from "@/lib/api"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Play, Calendar, Film, Eye, Heart, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { notFound } from "next/navigation"

interface DramaDetailPageProps {
  params: Promise<{
    id: string
  }>
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export default async function DramaDetailPage({ params }: DramaDetailPageProps) {
  const { id } = await params

  let dramaData
  try {
    dramaData = await getDramaDetail(id)
  } catch (error) {
    notFound()
  }

  if (!dramaData?.data?.book) {
    notFound()
  }

  const { book, chapterList, recommends } = dramaData.data
  const year = book.shelfTime ? new Date(book.shelfTime).getFullYear() : null

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Cover */}
      <div className="relative">
        <div className="absolute inset-0 h-[50vh] overflow-hidden">
          <img
            src={book.cover}
            alt={book.bookName}
            className="w-full h-full object-cover object-top blur-sm opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>

        <div className="relative container px-4 md:px-6 pt-8 pb-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cover Image */}
            <div className="flex-shrink-0">
              <div className="relative w-48 md:w-64 mx-auto md:mx-0 rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={book.cover}
                  alt={book.bookName}
                  className="w-full aspect-[2/3] object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                {book.bookName}
              </h1>

              {book.bookNameEn && book.bookNameEn !== book.bookName && (
                <p className="text-lg text-muted-foreground">{book.bookNameEn}</p>
              )}

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {year && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{year}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Film className="h-4 w-4" />
                  <span>{book.chapterCount} Episodes</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span>{formatNumber(book.viewCount)} Views</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Heart className="h-4 w-4" />
                  <span>{formatNumber(book.followCount)} Follows</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {book.tags?.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-secondary/80">
                    {tag}
                  </Badge>
                ))}
                {book.labels?.map((label, index) => (
                  <Badge key={`label-${index}`} variant="outline">
                    {label}
                  </Badge>
                ))}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                {book.introduction}
              </p>

              {/* Performers */}
              {book.performerList && book.performerList.length > 0 && (
                <div className="pt-2">
                  <h3 className="text-sm font-medium text-foreground mb-2">Cast</h3>
                  <div className="flex flex-wrap gap-3">
                    {book.performerList.slice(0, 5).map((performer) => (
                      <div key={performer.performerId} className="flex items-center gap-2">
                        <img
                          src={performer.performerAvatar}
                          alt={performer.performerName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm text-muted-foreground">{performer.performerName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Play Button */}
              {chapterList && chapterList.length > 0 && (
                <div className="pt-4">
                  <Link href={`/watch/${id}?ep=${chapterList[0].index}`}>
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Play className="mr-2 h-5 w-5 fill-current" />
                      Play
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      {chapterList && chapterList.length > 0 && (
        <section className="container px-4 md:px-6 py-8">
          <h2 className="text-2xl font-bold mb-6">Episodes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {chapterList.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/watch/${id}?ep=${chapter.index}`}
                className="group"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary">
                  <img
                    src={chapter.cover}
                    alt={chapter.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="h-8 w-8 text-white fill-current" />
                  </div>
                  {chapter.new && (
                    <Badge className="absolute top-2 right-2 bg-accent text-xs">NEW</Badge>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                    <Clock className="inline h-3 w-3 mr-1" />
                    {formatDuration(chapter.duration)}
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium line-clamp-1">Episode {chapter.index}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{chapter.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recommendations Section */}
      {recommends && recommends.length > 0 && (
        <section className="container px-4 md:px-6 py-8 border-t border-border">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {recommends.slice(0, 12).map((drama) => (
              <Link
                key={drama.bookId}
                href={`/drama/${drama.bookId}`}
                className="group"
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-secondary">
                  <img
                    src={drama.cover}
                    alt={drama.bookName}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-sm font-medium text-white line-clamp-2">{drama.bookName}</p>
                    <p className="text-xs text-white/70 mt-1">{drama.chapterCount} Episodes</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      <Footer />
    </div>
  )
}
