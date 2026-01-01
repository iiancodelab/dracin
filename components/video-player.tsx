"use client"

import { useEffect, useRef } from "react"
import Hls from "hls.js"
import { Play } from "lucide-react"

interface VideoPlayerProps {
  src: string | null
  poster?: string
  autoPlay?: boolean
}

export function VideoPlayer({ src, poster, autoPlay = true }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !src) return

    // Clean up previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy()
      hlsRef.current = null
    }

    // Check if the source is HLS (m3u8)
    const isHLS = src.includes('.m3u8') || src.includes('m3u8')

    if (isHLS) {
      if (Hls.isSupported()) {
        // Use HLS.js for browsers that don't support HLS natively
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90,
        })

        hlsRef.current = hls
        hls.loadSource(src)
        hls.attachMedia(video)

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (autoPlay) {
            video.play().catch(() => {
              // Autoplay was prevented, user needs to interact first
            })
          }
        })

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error('Network error, trying to recover...')
                hls.startLoad()
                break
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error('Media error, trying to recover...')
                hls.recoverMediaError()
                break
              default:
                console.error('Fatal error, destroying HLS instance')
                hls.destroy()
                break
            }
          }
        })
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        video.src = src
        if (autoPlay) {
          video.play().catch(() => { })
        }
      }
    } else {
      // Regular video (mp4, webm, etc.)
      video.src = src
      if (autoPlay) {
        video.play().catch(() => { })
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
    }
  }, [src, autoPlay])

  if (!src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <div className="text-center">
          <Play className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Video not available</p>
        </div>
      </div>
    )
  }

  return (
    <video
      ref={videoRef}
      className="w-full h-full bg-black"
      controls
      playsInline
      poster={poster}
    />
  )
}
