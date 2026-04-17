import React, { useEffect, useRef } from 'react'
import { AgentAudioVisualizerBar } from '@agents-ui/shadcn'

interface AudioVisualizerProps {
  className?: string
  agent?: any // Will be typed properly when Agents UI is installed
}

export default function AudioVisualizer({ className, agent }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !agent) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const draw = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get audio data from agent
      const audioData = agent.audioLevels || []
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, 'hsl(var(--primary) / 0.1)')
      gradient.addColorStop(1, 'hsl(var(--primary) / 0.05)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw frequency bars
      const barWidth = canvas.width / audioData.length
      const centerY = canvas.height / 2

      audioData.forEach((value: number, index: number) => {
        const barHeight = (value / 255) * canvas.height * 0.8
        const x = index * barWidth
        const y = centerY - barHeight / 2

        // Create bar gradient
        const barGradient = ctx.createLinearGradient(0, y, 0, y + barHeight)
        barGradient.addColorStop(0, 'hsl(var(--accent))')
        barGradient.addColorStop(1, 'hsl(var(--primary))')
        ctx.fillStyle = barGradient

        // Draw rounded bar
        const radius = 2
        ctx.beginPath()
        ctx.moveTo(x + radius, y)
        ctx.lineTo(x + barWidth - radius, y)
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius)
        ctx.lineTo(x + barWidth, y + barHeight - radius)
        ctx.quadraticCurveTo(x + barWidth, y + barHeight, x + barWidth - radius, y + barHeight)
        ctx.lineTo(x + radius, y + barHeight)
        ctx.quadraticCurveTo(x, y + barHeight, x, y + barHeight - radius)
        ctx.closePath()
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    // Set canvas size
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [agent])

  return (
    <div className={`bg-card p-4 rounded-lg ${className || ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Audio Visualizer</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Live Audio</span>
        </div>
      </div>
      
      <AgentAudioVisualizerBar
        agent={agent}
        className="w-full h-32"
      />
      
      <canvas
        ref={canvasRef}
        className="audio-visualizer-canvas w-full h-24 rounded bg-background/50"
      />
    </div>
  )
}
