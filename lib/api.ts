import { Drama, SearchDrama, DramaDetailResponse } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.dramabox.com/api'

/**
 * Fetch trending dramas from DramaBox API
 */
export async function getTrending(): Promise<Drama[]> {
  const response = await fetch(`${API_BASE_URL}/trending`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch trending: ${response.status}`)
  }

  return response.json()
}

/**
 * Fetch latest/new release dramas from DramaBox API
 */
export async function getLatest(): Promise<Drama[]> {
  const response = await fetch(`${API_BASE_URL}/latest`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch latest: ${response.status}`)
  }

  return response.json()
}

/**
 * Fetch popular search dramas from DramaBox API
 */
export async function getPopular(): Promise<Drama[]> {
  const response = await fetch(`${API_BASE_URL}/populersearch`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch popular: ${response.status}`)
  }

  return response.json()
}

/**
 * Search dramas by keyword
 */
export async function searchDramas(query: string): Promise<SearchDrama[]> {
  const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`, {
    next: { revalidate: 300 } // Cache for 5 minutes
  })

  if (!response.ok) {
    throw new Error(`Failed to search dramas: ${response.status}`)
  }

  return response.json()
}

/**
 * Get full drama details including chapters and video URLs
 */
export async function getDramaDetail(bookId: string): Promise<DramaDetailResponse> {
  const response = await fetch(`${API_BASE_URL}/detail?bookId=${bookId}`, {
    next: { revalidate: 300 } // Cache for 5 minutes
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch drama detail: ${response.status}`)
  }

  return response.json()
}
