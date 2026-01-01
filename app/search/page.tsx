import { searchDramas } from "@/lib/api"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Search, Film } from "lucide-react"
import Link from "next/link"

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = q?.trim() || ""

  let results: Awaited<ReturnType<typeof searchDramas>> = []
  let error: string | null = null

  if (query) {
    try {
      results = await searchDramas(query)
    } catch (e) {
      error = "Failed to search. Please try again."
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container px-4 md:px-6 py-8">
        {/* Search Header */}
        <div className="mb-8">
          {query ? (
            <>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Search results for "{query}"
              </h1>
              <p className="text-muted-foreground">
                {results.length} {results.length === 1 ? 'result' : 'results'} found
              </p>
            </>
          ) : (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Search Dramas
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Use the search bar above to find your favorite dramas
              </p>
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* No Results */}
        {query && !error && results.length === 0 && (
          <div className="text-center py-16">
            <Film className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find any dramas matching "{query}". Try different keywords.
            </p>
          </div>
        )}

        {/* Search Results Grid */}
        {results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {results.map((drama) => (
              <Link
                key={drama.bookId}
                href={`/drama/${drama.bookId}`}
                className="group"
              >
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-secondary shadow-lg transition-all group-hover:scale-105 group-hover:shadow-xl">
                  <img
                    src={drama.cover}
                    alt={drama.bookName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Hover Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">
                      {drama.bookName}
                    </h3>
                    {drama.protagonist && (
                      <p className="text-xs text-white/70 mb-2">
                        {drama.protagonist}
                      </p>
                    )}
                    {drama.tagNames && drama.tagNames.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {drama.tagNames.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-accent/80 text-white px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Title below card */}
                <div className="mt-3">
                  <h3 className="font-medium text-sm line-clamp-2 group-hover:text-accent transition-colors">
                    {drama.bookName}
                  </h3>
                  {drama.tagNames && drama.tagNames.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {drama.tagNames.join(' • ')}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
