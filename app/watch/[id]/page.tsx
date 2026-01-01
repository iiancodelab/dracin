import { getDramaDetail, getAllEpisodes } from "@/lib/api"
import { Play, ArrowLeft, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { VideoPlayer } from "@/components/video-player"
import Link from "next/link"
import { notFound } from "next/navigation"

interface WatchPageProps {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    ep?: string
  }>
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export default async function WatchPage({ params, searchParams }: WatchPageProps) {
  const { id } = await params
  const { ep } = await searchParams
  const episodeIndex = parseInt(ep || '0', 10)

  let dramaData
  let allEpisodes
  try {
    // Fetch drama details and all episodes in parallel
    [dramaData, allEpisodes] = await Promise.all([
      getDramaDetail(id),
      getAllEpisodes(id)
    ])
  } catch (error) {
    notFound()
  }

  if (!dramaData?.data?.book || !allEpisodes || allEpisodes.length === 0) {
    notFound()
  }

  const { book } = dramaData.data

  // Find the current episode using chapterIndex
  const currentEpisode = allEpisodes.find(ep => ep.chapterIndex === episodeIndex) || allEpisodes[0]
  const currentEpisodeIdx = allEpisodes.findIndex(ep => ep.chapterId === currentEpisode.chapterId)
  const prevEpisode = currentEpisodeIdx > 0 ? allEpisodes[currentEpisodeIdx - 1] : null
  const nextEpisode = currentEpisodeIdx < allEpisodes.length - 1 ? allEpisodes[currentEpisodeIdx + 1] : null

  // Extract video URL from cdnList - get default quality (720p) or first available
  const getVideoUrl = () => {
    if (!currentEpisode.cdnList || currentEpisode.cdnList.length === 0) return null

    const defaultCdn = currentEpisode.cdnList.find(cdn => cdn.isDefault === 1) || currentEpisode.cdnList[0]
    if (!defaultCdn.videoPathList || defaultCdn.videoPathList.length === 0) return null

    // Try to get 720p (default) or fall back to any available
    const defaultVideo = defaultCdn.videoPathList.find(v => v.isDefault === 1)
      || defaultCdn.videoPathList.find(v => v.quality === 720)
      || defaultCdn.videoPathList[0]

    return defaultVideo?.videoPath || null
  }

  const videoUrl = getVideoUrl()

  return (
    <div className="min-h-screen bg-black">
      {/* Minimal Header for Watch Page */}
      <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur border-b border-white/10">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link href={`/drama/${id}`} className="flex items-center gap-2 text-white hover:text-accent transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Back to Details</span>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-sm font-medium text-white truncate max-w-md mx-auto">
              {book.bookName} - Episode {currentEpisode.chapterIndex}
            </h1>
          </div>
          <div className="w-20" />
        </div>
      </header>

      <main className="container px-0 md:px-6">
        {/* Video Player Section */}
        <div className="relative w-full max-w-6xl mx-auto">
          <div className="relative aspect-video bg-black">
            <VideoPlayer
              key={currentEpisode.chapterId}
              src={videoUrl}
              poster={currentEpisode.chapterImg}
              autoPlay={true}
            />
          </div>

          {/* Episode Navigation */}
          <div className="flex items-center justify-between p-4 bg-black/50">
            {prevEpisode ? (
              <Link href={`/watch/${id}?ep=${prevEpisode.chapterIndex}`}>
                <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/20">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Prev
                </Button>
              </Link>
            ) : (
              <div className="w-20" />
            )}

            <div className="text-center">
              <p className="text-white font-medium">Episode {currentEpisode.chapterIndex}</p>
              <p className="text-sm text-white/60">{currentEpisode.chapterName}</p>
            </div>

            {nextEpisode ? (
              <Link href={`/watch/${id}?ep=${nextEpisode.chapterIndex}`}>
                <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/20">
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            ) : (
              <div className="w-20" />
            )}
          </div>
        </div>

        {/* Episode Info & List */}
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
          {/* Current Episode Info */}
          <div className="bg-white/5 rounded-xl p-4 md:p-6">
            <div className="flex items-start gap-4">
              <img
                src={book.cover}
                alt={book.bookName}
                className="w-16 md:w-24 aspect-[2/3] rounded-lg object-cover hidden sm:block"
              />
              <div className="flex-1">
                <Link href={`/drama/${id}`} className="hover:text-accent transition-colors">
                  <h2 className="text-xl font-bold text-white mb-1">{book.bookName}</h2>
                </Link>
                <p className="text-white/60 text-sm mb-3">
                  Episode {currentEpisode.chapterIndex}: {currentEpisode.chapterName}
                </p>
                <div className="flex flex-wrap gap-2">
                  {book.tags?.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-white/10 text-white/80">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Episode List */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              All Episodes ({allEpisodes.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {allEpisodes.map((episode) => {
                const isCurrentEpisode = episode.chapterId === currentEpisode.chapterId
                return (
                  <Link
                    key={episode.chapterId}
                    href={`/watch/${id}?ep=${episode.chapterIndex}`}
                    className={`group relative rounded-lg overflow-hidden ${isCurrentEpisode ? 'ring-2 ring-accent' : ''
                      }`}
                  >
                    <div className="relative aspect-video bg-white/5">
                      <img
                        src={episode.chapterImg}
                        alt={episode.chapterName}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      {isCurrentEpisode && (
                        <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                          <Badge className="bg-accent">Playing</Badge>
                        </div>
                      )}
                      {!isCurrentEpisode && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="h-8 w-8 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="p-2 bg-white/5">
                      <p className="text-sm font-medium text-white truncate">Ep {episode.chapterIndex}</p>
                      <p className="text-xs text-white/60 truncate">{episode.chapterName}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
