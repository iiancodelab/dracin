import { Skeleton } from "@/components/ui/skeleton"

export function DramaCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[2/3] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}

export function DramaRowSkeleton() {
  return (
    <div className="space-y-4 px-4 md:px-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <DramaCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[70vh] min-h-[500px] w-full">
      <Skeleton className="absolute inset-0" />
      <div className="absolute bottom-0 left-0 z-20 p-8 md:p-16 lg:p-24 max-w-2xl space-y-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-12 w-80" />
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-4 w-full max-w-lg" />
        <Skeleton className="h-4 w-3/4 max-w-md" />
        <div className="flex gap-3 pt-4">
          <Skeleton className="h-12 w-24" />
          <Skeleton className="h-12 w-24" />
        </div>
      </div>
    </div>
  )
}

export function DramaDetailSkeleton() {
  return (
    <div className="container px-4 md:px-6 pt-8 pb-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Cover */}
        <div className="flex-shrink-0">
          <Skeleton className="w-48 md:w-64 aspect-[2/3] rounded-xl mx-auto md:mx-0" />
        </div>

        {/* Details */}
        <div className="flex-1 space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="flex gap-4">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-24 w-full max-w-2xl" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>

      {/* Episodes */}
      <div className="mt-12 space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-video rounded-lg" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <DramaCardSkeleton key={i} />
      ))}
    </div>
  )
}
