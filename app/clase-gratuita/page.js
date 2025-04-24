'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ChevronRight, Maximize, Minimize, Pause, Play } from "lucide-react"
import { Button } from '@/components/ui/button'

function ClaseGratuita() {
  const videoRef = useRef(null)
  const videoContainerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const lastTimeRef = useRef(0)
  const isSeekingRef = useRef(false)

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    }

    setIsMobile(checkMobile())
  }, [])

  const checkFullscreen = () => {
    return !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    )
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenStatus = checkFullscreen()
      setIsFullscreen(fullscreenStatus)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("mozfullscreenchange", handleFullscreenChange)
    document.addEventListener("MSFullscreenChange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange)
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playVideo = async () => {
      try {
        video.volume = 1.0
        video.muted = false

        await video.play()
        setIsPlaying(true)
      } catch (error) {
        console.error("Autoplay failed:", error)
        setIsPlaying(false)
      }
    }

    playVideo()

    const handleTimeUpdate = () => {
      if (isSeekingRef.current) {
        isSeekingRef.current = false
        return
      }

      const currentTime = video.currentTime
      const timeDiff = Math.abs(currentTime - lastTimeRef.current)

      if (timeDiff > 0.5 && lastTimeRef.current > 0) {
        console.log("Detected seek attempt, resetting time")
        isSeekingRef.current = true
        video.currentTime = lastTimeRef.current
      } else {
        lastTimeRef.current = currentTime
      }
    }

    const handleSeeking = () => {
      if (lastTimeRef.current > 0) {
        isSeekingRef.current = true
        video.currentTime = lastTimeRef.current
      }
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("seeking", handleSeeking)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("seeking", handleSeeking)
    }
  }, [])

  const togglePlayPause = async (e) => {
    if (e) {
      e.stopPropagation() // Prevent double-triggering with container click
    }

    const video = videoRef.current
    if (!video) return

    try {
      if (video.paused) {
        video.muted = false
        video.volume = 1.0
        await video.play()
        setIsPlaying(true)
      } else {
        video.pause()
        setIsPlaying(false)
      }
    } catch (error) {
      console.error("Play/pause action failed:", error)
    }
  }

  const requestFullscreen = async (element) => {
    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen()
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen()
      } else if (element.mozRequestFullScreen) {
        await element.mozRequestFullScreen()
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen()
      }
    } catch (error) {
      console.error("Request fullscreen failed:", error)
    }
  }

  const exitFullscreen = async () => {
    try {
      if (!checkFullscreen()) {
        setIsFullscreen(false)
        return
      }

      if (document.exitFullscreen) {
        await document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        await document.mozCancelFullScreen()
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen()
      }
    } catch (error) {
      const actualFullscreenState = checkFullscreen()
      setIsFullscreen(actualFullscreenState)
      console.error("Exit fullscreen failed:", error)
    }
  }

  const toggleFullscreen = async (e) => {
    e.stopPropagation() // Prevent triggering play/pause

    const container = videoContainerRef.current
    if (!container) return

    try {
      if (!isFullscreen) {
        await requestFullscreen(container)
      } else {
        await exitFullscreen()
      }
    } catch (error) {
      console.error("Fullscreen toggle failed:", error)
      // Update state to match reality in case of error
      setIsFullscreen(checkFullscreen())
    }
  }

  const handleContainerClick = (e) => {
    togglePlayPause()
    if (e.target === e.currentTarget || e.target.tagName === "VIDEO") {
      // togglePlayPause()
    }
  }

  const shouldShowControls = isHovering || !isPlaying || isMobile

  return (
    <section className="flex flex-col px-4 pb-10 pt-4 gap-8 relative md:flex-row md:px-16 min-h-screen w-full">
      <div className="flex flex-col gap-8 w-full">
        <div className="w-full">
          <h1 className="text-primary text-center text-3xl font-bold leading-7 md:text-5xl md:leading-14 md:font-extrabold pb-4">
            Clase gratuita con la Dra. Idoia Álvarez
          </h1>
          <p className="text-primary text-center text-lg font-normal leading-7 md:text-xl md:leading-10">
            Aplica un método que mejora la salud real de tus pacientes y amplía tu impacto clínico
          </p>
        </div>

        <div className="aspect-video w-full h-fit relative max-w-6xl mx-auto">
          <div className="w-[100%] h-full bg-[#02ACC4] blur-3xl opacity-25 absolute inset-0 mx-auto z-[-1]"></div>
          <div
            ref={videoContainerRef}
            className="w-full relative cursor-pointer rounded-lg"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={handleContainerClick}
            onDoubleClick={toggleFullscreen}
          >
            <video
              ref={videoRef}
              className="w-full rounded-lg h-full bg-primary/20"
              src="/video.mov"
              playsInline
              autoPlay
              controls={false}
              onContextMenu={(e) => e.preventDefault()}
            />

            <div
              className={`absolute inset-0 flex my-auto items-center justify-center transition-opacity duration-300 ${shouldShowControls ? "opacity-100" : "opacity-0"
                }`}
            >
              <button
                onClick={togglePlayPause}
                className="bg-primary hover:bg-primary/90 text-white font-bold p-4 rounded-full flex items-center justify-center transition-colors z-10 cursor-pointer"
                aria-label={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
              </button>
            </div>
            <div className="absolute bottom-4 right-4">
              <button
                onClick={toggleFullscreen}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full flex items-center justify-center transition-colors z-10 cursor-pointer"
                aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
              >
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <section className="flex flex-col px-4 py-10 mt-10 gap-4 relative md:px-15 md:py-16 md:gap-8 md:items-center">
          <h2 className="text-primary font-bold text-lg md:text-3xl text-center">
            ¿Listo para llevar tu práctica al siguiente nivel?
          </h2>
          <p className="text-base md:text-xl text-gray-600 text-center md:max-w-2xl">
            Si te ha gustado esta clase y quieres profundizar en el método, te invitamos a conocer nuestro programa completo.
          </p>
          <Button onClick={() => { }} className='w-full py-6 md:w-fit rounded-xl cursor-pointer'>
            <div className='inline-flex items-center gap-2 px-4'>Habla con la Dra. Idoia <ChevronRight className="h-4 w-4" /></div>
          </Button>

        </section>
      </div>
    </section>
  )
}

export default ClaseGratuita