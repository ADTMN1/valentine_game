import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Music, Heart } from 'lucide-react'

interface GamePageProps {
  gameName: string
  gameComponent: React.ReactNode
  to: string
  from: string
  onBack: () => void
  onGameComplete: () => void
  photoUrl?: string
}

export default function GamePage({ 
  gameName, 
  gameComponent, 
  to, 
  from, 
  onBack, 
  onGameComplete,
  photoUrl 
}: GamePageProps) {
  const [showCompletion, setShowCompletion] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = React.useRef<HTMLAudioElement>(null)

  const handleGameComplete = () => {
    setShowCompletion(true)
    
    // Start music automatically
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.4
      audio.play().catch(e => console.log('Auto-play prevented:', e))
      setIsPlaying(true)
    }

    // Show completion screen for 3 seconds then notify parent
    setTimeout(() => {
      onGameComplete()
    }, 3000)
  }

  if (showCompletion) {
    return (
      <>
        <audio
          ref={audioRef}
          src="/romantic-music.mp3"
          loop
          preload="auto"
        />
        
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: 'radial-gradient(ellipse at center, #fff5f8, #ffe0ec, #ffc2d4)'
        }}>
          {/* Floating hearts */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1000
          }}>
            {Array.from({ length: 15 }, (_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 100}%`,
                  bottom: '-50px',
                  fontSize: `${Math.random() * 20 + 15}px`,
                }}
                animate={{
                  y: ['-50px', '-100vh'],
                  rotate: [0, 360],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 4,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                {['💕', '💖', '💗', '💝', '💘', '💓', '❤️', '🌹'][Math.floor(Math.random() * 8)]}
              </motion.div>
            ))}
          </div>

          <motion.div
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,227,236,0.9))',
              borderRadius: '30px',
              padding: '40px',
              textAlign: 'center',
              boxShadow: '0 30px 80px rgba(255,77,125,0.3)',
              border: '3px solid #ffccd5',
              backdropFilter: 'blur(20px)',
              maxWidth: '500px'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              style={{
                fontSize: '60px',
                marginBottom: '20px'
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎉
            </motion.div>

            <motion.h1
              style={{
                fontSize: '36px',
                fontWeight: 700,
                color: '#ff4d7d',
                marginBottom: '20px'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Game Complete! 💕
            </motion.h1>

            <motion.div
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '20px',
                margin: '20px auto',
                background: photoUrl ? `url(${photoUrl})` : 'url(/photo.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '4px solid #ff4d7d',
                boxShadow: '0 15px 40px rgba(255,77,125,0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {!photoUrl && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  fontSize: '60px'
                }}>
                  
                </div>
              )}
              
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '50px',
                  color: 'rgba(255,77,125,0.8)'
                }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                💖
              </motion.div>
            </motion.div>

            <motion.p
              style={{
                fontSize: '18px',
                color: '#8d99ae',
                marginBottom: '20px'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Great job, {to}! You completed {gameName}!
            </motion.p>

            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#ff4d7d',
                fontWeight: 600
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Music size={16} />
              {isPlaying ? 'Romantic music playing...' : 'Music loading...'}
            </motion.div>
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'inherit' }}>
      {/* Back button */}
      <motion.button
        onClick={onBack}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,227,236,0.9))',
          border: '2px solid #ffccd5',
          borderRadius: '15px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(255,77,125,0.2)',
          backdropFilter: 'blur(10px)',
          zIndex: 100
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} color="#ff4d7d" />
        <span style={{ color: '#ff4d7d', fontWeight: 600 }}>Back to Games</span>
      </motion.button>

      {/* Game content */}
      <motion.div
        style={{
          padding: '80px 20px 20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,227,236,0.9))',
            borderRadius: '24px',
            padding: '30px',
            boxShadow: '0 20px 60px rgba(255,77,125,0.15)',
            border: '2px solid #ffccd5',
            backdropFilter: 'blur(20px)',
            textAlign: 'center'
          }}
        >
          <motion.h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#ff4d7d',
              marginBottom: '20px'
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {gameName}
          </motion.h1>

          <motion.div
            style={{
              fontSize: '14px',
              color: '#8d99ae',
              marginBottom: '30px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            For: <span style={{ color: '#ff4d7d', fontWeight: 600 }}>{to}</span> — By: <span style={{ color: '#ff4d7d', fontWeight: 600 }}>{from}</span>
          </motion.div>

          <div>
            {React.cloneElement(gameComponent as React.ReactElement, { 
              onGameComplete: handleGameComplete 
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
