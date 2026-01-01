import { Header } from "@/components/header"
import { DramaDetailSkeleton } from "@/components/skeletons"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <DramaDetailSkeleton />
    </div>
  )
}
