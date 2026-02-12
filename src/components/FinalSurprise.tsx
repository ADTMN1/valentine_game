import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Music } from 'lucide-react'

export default function FinalSurprise({ to, photoUrl }: { to: string; photoUrl?: string }) {
  const [showHearts, setShowHearts] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mobileView, setMobileView] = useState(false)
  const audioRef = React.useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setMobileView(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Start music automatically
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.4
      audio.play().catch(e => console.log('Auto-play prevented:', e))
      setIsPlaying(true)
    }

    // Start heart animations
    setTimeout(() => setShowHearts(true), 500)

    return () => {
      if (audio) {
        audio.pause()
      }
    }
  }, [])

  const FloatingHearts = () => {
    if (!showHearts) return null

    const hearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      size: Math.random() * 20 + 15,
      symbol: ['💕', '💖', '💗', '💝', '💘', '💓', '❤️', '🌹'][Math.floor(Math.random() * 8)]
    }))

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000
      }}>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            style={{
              position: 'absolute',
              left: heart.left,
              bottom: '-50px',
              fontSize: `${heart.size}px`,
            }}
            animate={{
              y: ['-50px', '-120vh'],
              rotate: [0, 360],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 6,
              delay: parseFloat(heart.delay),
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            <span className="emoji">{heart.symbol}</span>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/romantic-music.mp3"
        loop
        preload="auto"
      />
      
      <FloatingHearts />

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: mobileView ? '20px 15px' : '0', // Mobile padding
        background: 'radial-gradient(ellipse at center, #fff5f8, #ffe0ec, #ffc2d4)'
      }}>
        <motion.div
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,227,236,0.9))',
            borderRadius: '30px',
            padding: mobileView ? '25px 20px' : '40px',
            textAlign: 'center',
            boxShadow: '0 30px 80px rgba(255,77,125,0.3)',
            border: '3px solid #ffccd5',
            backdropFilter: 'blur(20px)',
            maxWidth: mobileView ? '350px' : '600px',
            width: '90%'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            style={{
              fontSize: '60px',
              marginBottom: '20px'
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💕
          </motion.div>
<h2>Happy Valentine's Day!</h2>
          <motion.h1
            style={{
              fontSize: '42px',
              fontWeight: 700,
              color: '#ff4d7d',
              marginBottom: '20px',
              textShadow: '0 2px 4px rgba(255,77,125,0.2)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            You are my everything! 💕
          </motion.h1>

          <motion.div
            style={{
              width: mobileView ? '250px' : '300px',
              height: mobileView ? '250px' : '300px',
              borderRadius: '20px',
              margin: mobileView ? '25px auto' : '30px auto',
              background: photoUrl ? `url(${photoUrl})` : 'url(/photo.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '5px solid #ff4d7d',
              boxShadow: '0 20px 60px rgba(255,77,125,0.4)',
              position: 'relative',
              overflow: 'hidden'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              fontSize: '100px'
            }}>
              {/* Photo is loading... */}
            </div>
            
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '80px',
                color: 'rgba(255,77,125,0.8)',
                textShadow: '0 0 20px rgba(255,77,125,0.6)'
              }}
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              💖
            </motion.div>
          </motion.div>

          <motion.p
            style={{
              fontSize: '20px',
              color: '#8d99ae',
              marginBottom: '30px',
              lineHeight: '1.6',
              fontStyle: 'italic'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Every moment with you feels like Valentine's Day! 💝
            <br />
           For You, your 💕
            <br/>
            <b>
  እወድሻለሁ የኔ ብርሀን
            </b>
          
          </motion.p>

          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontSize: '16px',
              color: '#ff4d7d',
              fontWeight: 600
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Music size={20} />
            {isPlaying ? 'Romantic music playing...' : 'Music loading...'}
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
