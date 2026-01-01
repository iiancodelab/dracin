import { Header } from "@/components/header"
import { HeroSkeleton, DramaRowSkeleton } from "@/components/skeletons"

export default function Loading() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSkeleton />
        <div className="py-8 space-y-8">
          <DramaRowSkeleton />
          <DramaRowSkeleton />
          <DramaRowSkeleton />
        </div>
      </main>
    </div>
  )
}
