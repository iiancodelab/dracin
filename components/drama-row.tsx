"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { DramaCard } from "./drama-card"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import { Drama } from "@/lib/types"

interface DramaRowProps {
  title: string
  dramas: Drama[]
}

export function DramaRow({ title, dramas }: DramaRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth
      const newScrollPosition =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      })

      setTimeout(() => {
        if (scrollContainerRef.current) {
          setShowLeftButton(scrollContainerRef.current.scrollLeft > 0)
          setShowRightButton(
            scrollContainerRef.current.scrollLeft <
            scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth,
          )
        }
      }, 300)
    }
  }

  return (
    <div className="group relative mb-12">
      <h2 className="mb-4 text-xl font-semibold md:text-2xl px-4 md:px-6">{title}</h2>

      <div className="relative">
        {showLeftButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 z-10 h-full w-12 -translate-y-1/2 rounded-none bg-background/80 opacity-0 backdrop-blur transition-opacity hover:bg-background/90 group-hover:opacity-100"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {dramas.map((drama) => (
            <div key={drama.bookId} className="min-w-[150px] md:min-w-[200px]">
              <DramaCard
                bookId={drama.bookId}
                bookName={drama.bookName}
                coverWap={drama.coverWap}
                chapterCount={drama.chapterCount}
                tags={drama.tags}
                rankVo={drama.rankVo}
              />
            </div>
          ))}
        </div>

        {showRightButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 z-10 h-full w-12 -translate-y-1/2 rounded-none bg-background/80 opacity-0 backdrop-blur transition-opacity hover:bg-background/90 group-hover:opacity-100"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}
      </div>
    </div>
  )
}
