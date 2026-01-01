import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 w-full bg-black/90 border-b border-white/10">
        <div className="container flex h-14 items-center justify-between px-4">
          <Skeleton className="h-5 w-32 bg-white/10" />
          <Skeleton className="h-5 w-48 bg-white/10" />
          <div className="w-20" />
        </div>
      </header>

      <main className="container px-0 md:px-6">
        {/* Video Player Skeleton */}
        <div className="relative w-full max-w-6xl mx-auto">
          <Skeleton className="aspect-video bg-white/5" />
          <div className="flex items-center justify-between p-4 bg-black/50">
            <Skeleton className="h-8 w-16 bg-white/10" />
            <div className="text-center space-y-1">
              <Skeleton className="h-5 w-24 mx-auto bg-white/10" />
              <Skeleton className="h-4 w-32 mx-auto bg-white/10" />
            </div>
            <Skeleton className="h-8 w-16 bg-white/10" />
          </div>
        </div>

        {/* Episode List Skeleton */}
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <Skeleton className="h-24 w-full rounded-xl bg-white/5" />
          <div>
            <Skeleton className="h-6 w-40 mb-4 bg-white/10" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-video rounded-lg bg-white/5" />
                  <Skeleton className="h-4 w-16 bg-white/10" />
                  <Skeleton className="h-3 w-20 bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
