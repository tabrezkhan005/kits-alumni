'use client'
import { useEffect, useRef } from 'react'

interface EntropyProps {
  className?: string
  width?: number
  height?: number
}

export function Entropy({ className = "", width = 1920, height = 400 }: EntropyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 基础设置
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.setTransform(1, 0, 0, 1, 0, 0) // reset transform
    ctx.scale(dpr, dpr)

    // 主题色
    const particleColor = '#ffffff'
    const lineColor = '#e0b3ff'

    class Particle {
      x: number
      y: number
      size: number
      order: boolean
      velocity: { x: number; y: number }
      originalX: number
      originalY: number
      influence: number
      neighbors: Particle[]

      constructor(x: number, y: number, order: boolean) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = 5 // Bigger dots
        this.order = order
        this.velocity = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        }
        this.influence = 0
        this.neighbors = []
      }

      update() {
        if (this.order) {
          const dx = this.originalX - this.x
          const dy = this.originalY - this.y
          const chaosInfluence = { x: 0, y: 0 }
          this.neighbors.forEach(neighbor => {
            if (!neighbor.order) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
              const strength = Math.max(0, 1 - distance / 100)
              chaosInfluence.x += (neighbor.velocity.x * strength)
              chaosInfluence.y += (neighbor.velocity.y * strength)
              this.influence = Math.max(this.influence, strength)
            }
          })
          this.x += dx * 0.05 * (1 - this.influence) + chaosInfluence.x * this.influence
          this.y += dy * 0.05 * (1 - this.influence) + chaosInfluence.y * this.influence
          this.influence *= 0.99
        } else {
          this.velocity.x += (Math.random() - 0.5) * 0.5
          this.velocity.y += (Math.random() - 0.5) * 0.5
          this.velocity.x *= 0.95
          this.velocity.y *= 0.95
          this.x += this.velocity.x
          this.y += this.velocity.y
          if (this.x < width / 2 || this.x > width) this.velocity.x *= -1
          if (this.y < 0 || this.y > height) this.velocity.y *= -1
          this.x = Math.max(width / 2, Math.min(width, this.x))
          this.y = Math.max(0, Math.min(height, this.y))
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const alpha = this.order ? 0.9 - this.influence * 0.4 : 0.9
        ctx.fillStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // 创建粒子网格（横向拉伸）
    const particles: Particle[] = []
    const gridX = 40 // more columns for horizontal
    const gridY = 12 // fewer rows for horizontal
    const spacingX = width / gridX
    const spacingY = height / gridY

    for (let i = 0; i < gridX; i++) {
      for (let j = 0; j < gridY; j++) {
        const x = spacingX * i + spacingX / 2
        const y = spacingY * j + spacingY / 2
        const order = x < width / 2
        particles.push(new Particle(x, y, order))
      }
    }

    function updateNeighbors() {
      particles.forEach(particle => {
        particle.neighbors = particles.filter(other => {
          if (other === particle) return false
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          return distance < 100
        })
      })
    }

    let time = 0
    let animationId: number

    function animate() {
      ctx.clearRect(0, 0, width, height)
      if (time % 30 === 0) {
        updateNeighbors()
      }
      particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)
        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          if (distance < 60) { // slightly more visible
            const alpha = 0.7 * (1 - distance / 60) // more visible
            ctx.save()
            ctx.strokeStyle = `${lineColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
            ctx.lineWidth = 2.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(neighbor.x, neighbor.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })
      ctx.strokeStyle = `${lineColor}CC`
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.moveTo(width / 2, 0)
      ctx.lineTo(width / 2, height)
      ctx.stroke()
      ctx.font = '12px monospace'
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      time++
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [width, height])

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`} style={{ pointerEvents: 'none' }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  )
}
