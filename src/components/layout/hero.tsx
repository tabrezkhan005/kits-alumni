'use client'

import React, { useEffect, useState } from 'react'
import { Entropy } from '@/components/ui/entropy'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

interface HeroProps {
  title: string
  subtitle?: string
  size?: number // ignored, for compatibility
}

export function Hero({ title, subtitle }: HeroProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const [dimensions, setDimensions] = useState({ width: 1920, height: 500 })

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: Math.max(window.innerHeight, 400),
      })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#301936' }}
    >
      {/* Entropy background */}
      <Entropy
        width={dimensions.width}
        height={dimensions.height}
        className="z-0"
      />
      {/* Overlay for readability if needed */}
      <div className="absolute inset-0 bg-[#301936]/80 z-10" aria-hidden="true" />
      <div className="container relative z-20 flex flex-col items-center justify-center px-4 md:flex-row md:space-x-8">
        <motion.div
          className="mb-8 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:text-left"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h1
            className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
            variants={itemVariants}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              className="max-w-md text-lg text-gray-200"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
