import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { DramaRow } from "@/components/drama-row"
import { getTrending, getLatest, getPopular } from "@/lib/api"

export default async function HomePage() {
  // Fetch all sections in parallel from their respective endpoints
  const [trendingDramas, latestDramas, popularDramas] = await Promise.all([
    getTrending(),
    getLatest(),
    getPopular()
  ])

  // Pick a random drama from top 5 for the hero section
  const randomIndex = Math.floor(Math.random() * Math.min(5, trendingDramas.length))
  const featuredDrama = trendingDramas[randomIndex]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection drama={featuredDrama} />
        <div className="py-8">
          <DramaRow title="🔥 Trending Now" dramas={trendingDramas.slice(0, 10)} />
          <DramaRow title="📺 New Releases" dramas={latestDramas.slice(0, 10)} />
          <DramaRow title="⭐ Most Popular" dramas={popularDramas.slice(0, 10)} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

