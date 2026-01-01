"use client"

import { Button } from "@/components/ui/button"

const categories = [
  "All",
  "Action",
  "Drama",
  "Comedy",
  "Thriller",
  "Romance",
  "Sci-Fi",
  "Horror",
  "Documentary",
  "Animation",
]

export function Categories() {
  return (
    <div className="border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container px-4 md:px-6">
        <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className={
                category === "All"
                  ? "whitespace-nowrap bg-accent hover:bg-accent/90 text-accent-foreground"
                  : "whitespace-nowrap"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
