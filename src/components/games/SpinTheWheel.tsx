import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Gift, Star, Music, Volume2, VolumeX } from 'lucide-react'

interface Question {
  id: number
  question: string
  answer: string
  romanticMessage: string
  emoji: string
}

interface Prize {
  spin: number
  title: string
  message?: string
  emoji: string
  buttonText: string
  audioFile?: string
}

export default function SpinTheWheel({ to, from, onGameComplete }: { to: string; from: string; onGameComplete?: () => void }) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [showQuestion, setShowQuestion] = useState(false)
  const [showPrize, setShowPrize] = useState(false)
  const [currentPrize, setCurrentPrize] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio] = useState(() => new Audio('/7th.mp3'))
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [totalSpins, setTotalSpins] = useState(3) // Total spins allowed
  const [spinCount, setSpinCount] = useState(0) // Current spin number
  const [gameStarted, setGameStarted] = useState(false)
  const [showCountdown, setShowCountdown] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const wheelRef = useRef<HTMLDivElement>(null)

  const prizes: Prize[] = [
    {
      spin: 1,
      title: "🎉 Mobile Card Prize! 🎉",
      message: `💕765839838043043 💕📱`,
      emoji: "📱",
      buttonText: "Continue to Next Spin"
    },
    {
      spin: 2,
      title: "🎵 Audio Message Prize! 🎵",
      emoji: "🎵",
      buttonText: "Final Spin",
      audioFile: "/public/7th.mp3"
    },
    {
      spin: 3,
      title: "🌟 Final Grand Prize! 🌟",
      message: `Incredible ${to}! You've won the ultimate prize - my eternal love and devotion! This journey leads us to our final destination together. Are you ready for the grand finale? 💕✨`,
      emoji: "🏆",
      buttonText: "Redirecting to Final gift..."
    }
  ]

  const segmentAngle = 360 / prizes.length

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    const handleAudioEnd = () => setIsPlaying(false)
    audio.addEventListener('ended', handleAudioEnd)
    return () => audio.removeEventListener('ended', handleAudioEnd)
  }, [audio])

  const playSound = (type: 'spin' | 'correct' | 'wrong' | 'final') => {
    if (isMuted) return
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const now = audioContext.currentTime
      
      if (type === 'spin') {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        oscillator.frequency.value = 800
        oscillator.type = 'sine'
        gainNode.gain.setValueAtTime(0.1, now)
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1)
        oscillator.start(now)
        oscillator.stop(now + 0.1)
      } else if (type === 'wrong') {
        // Wrong answer sound - lower pitch
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        oscillator.frequency.value = 200 // Low frequency for wrong sound
        oscillator.type = 'sawtooth'
        gainNode.gain.setValueAtTime(0.1, now)
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3)
        oscillator.start(now)
        oscillator.stop(now + 0.3)
      } else if (type === 'correct') {
        const notes = [523.25, 659.25, 783.99]
        notes.forEach((freq, i) => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)
          oscillator.frequency.value = freq
          oscillator.type = 'sine'
          const start = now + i * 0.15
          gainNode.gain.setValueAtTime(0, start)
          gainNode.gain.linearRampToValueAtTime(0.2, start + 0.05)
          gainNode.gain.exponentialRampToValueAtTime(0.01, start + 0.5)
          oscillator.start(start)
          oscillator.stop(start + 0.5)
        })
      } else if (type === 'final') {
        const notes = [523.25, 659.25, 783.99, 1046.50]
        notes.forEach((freq, i) => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)
          oscillator.frequency.value = freq
          oscillator.type = 'sine'
          const start = now + i * 0.2
          gainNode.gain.setValueAtTime(0, start)
          gainNode.gain.linearRampToValueAtTime(0.3, start + 0.1)
          gainNode.gain.exponentialRampToValueAtTime(0.01, start + 1)
          oscillator.start(start)
          oscillator.stop(start + 1)
        })
      }
    } catch (error) {
      console.log('Audio playback failed:', error)
    }
  }

  const spinWheel = () => {
    if (isSpinning || spinCount >= totalSpins) return

    setIsSpinning(true)
    setShowCountdown(true)
    setCountdown(3)
    setShowPrize(false)
    setCurrentPrize('')

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          setShowCountdown(false)
          return 3
        }
        return prev - 1
      })
    }, 1000)

    setTimeout(() => {
      playSound('spin')
      
      // Always select the next prize based on spin count
      const targetPrize = prizes[spinCount]
      
      const spins = 5 + Math.random() * 5
      const targetAngle = prizes.indexOf(targetPrize) * segmentAngle
      const finalAngle = targetAngle + (Math.random() * segmentAngle * 0.8)
      const totalRotation = rotation + (spins * 360) + finalAngle
      
      setRotation(totalRotation)
      setSpinCount(spinCount + 1)

      setTimeout(() => {
        setCurrentPrize(targetPrize.title)
        setShowPrize(true)
        setIsSpinning(false)
        playSound('correct')
        
        // Check if this is the final spin
        if (spinCount + 1 === 3) {
          setTimeout(() => {
            playSound('final')
            setShowConfetti(true)
          }, 2000)
          
          // Auto-redirect after 4 seconds for final spin (show popup longer)
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('goldenHeartWon', { detail: { gameName: 'SpinTheWheel' } }))
          }, 4000)
        }
      }, 4000)
    }, 3000)
  }

  const continueToNext = () => {
    setShowPrize(false)
    setCurrentPrize('')
  }

  const Confetti = () => {
    if (!showConfetti) return null

    const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 2}s`,
      emoji: ['💕', '💖', '💗', '💝', '🌹', '✨', '🎉', '💛'][Math.floor(Math.random() * 8)]
    }))

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2000
      }}>
        {confettiPieces.map((piece) => (
          <motion.div
            key={piece.id}
            style={{
              position: 'absolute',
              left: piece.left,
              top: '-50px',
              fontSize: '20px'
            }}
            animate={{
              y: ['0px', '100vh'],
              rotate: [0, 720],
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: parseFloat(piece.duration),
              delay: parseFloat(piece.delay),
              ease: 'easeOut'
            }}
          >
            {piece.emoji}
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: 'clamp(8px, 2vw, 15px)', 
      minHeight: '100vh',
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden',
      boxSizing: 'border-box'
    }}>
      <h2 style={{ 
        color: '#ff4d7d', 
        fontSize: 'clamp(18px, 4.5vw, 28px)', 
        marginBottom: 'clamp(10px, 2.5vw, 15px)',
        fontWeight: 700,
        lineHeight: '1.2',
        padding: '0 clamp(10px, 3vw, 20px)'
      }}>
        💕 Spin the Wheel of Love Questions 💕
      </h2>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 'clamp(15px, 3vw, 20px)',
        maxWidth: 'clamp(300px, 85vw, 500px)',
        margin: '0 auto clamp(10px, 2.5vw, 15px)',
        padding: '0 clamp(5px, 2vw, 10px)',
        position: 'relative'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #ff4d7d, #ff8fab)',
          color: 'white',
          padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px)',
          borderRadius: 'clamp(10px, 2.5vw, 15px)',
          fontWeight: 600,
          fontSize: 'clamp(11px, 2.5vw, 14px)',
          boxShadow: '0 2px 8px rgba(255,77,125,0.3)',
          flexShrink: 0
        }}>
          Spin {spinCount}/{totalSpins}
        </div>
        
        <button
          onClick={() => setIsMuted(!isMuted)}
          style={{
            background: 'rgba(255,77,125,0.1)',
            border: '2px solid #ff4d7d',
            borderRadius: '50%',
            width: 'clamp(30px, 7vw, 35px)',
            height: 'clamp(30px, 7vw, 35px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'absolute',
            right: 'clamp(10px, 2.5vw, 20px)',
            top: '50%',
            transform: 'translateY(-50%)',
            flexShrink: 0
          }}
        >
          {isMuted ? <VolumeX size={16} color="#ff4d7d" /> : <Volume2 size={16} color="#ff4d7d" />}
        </button>
      </div>

      <div style={{ 
        position: 'relative', 
        display: 'inline-block', 
        marginBottom: 'clamp(20px, 5vw, 30px)',
        width: '100%',
        maxWidth: 'clamp(280px, 80vw, 350px)',
        margin: '0 auto clamp(20px, 5vw, 30px)'
      }}>
        {/* Pointer */}
        <div style={{
          position: 'absolute',
          top: 'clamp(-15px, -4vw, -20px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          fontSize: 'clamp(30px, 8vw, 40px)',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          👇
        </div>

        {/* Wheel */}
        <motion.div
          ref={wheelRef}
          style={{
            width: 'clamp(200px, 60vw, 280px)',
            height: 'clamp(200px, 60vw, 280px)',
            borderRadius: '50%',
            position: 'relative',
            overflow: 'hidden',
            border: 'clamp(4px, 1.2vw, 6px) solid #ff4d7d',
            boxShadow: '0 8px 32px rgba(255,77,125,0.3)',
            cursor: isSpinning ? 'not-allowed' : 'pointer',
            margin: '0 auto',
            maxWidth: '100%'
          }}
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: 'easeOut' }}
          onClick={spinWheel}
          whileHover={!isSpinning ? { scale: 1.05 } : {}}
          whileTap={!isSpinning ? { scale: 0.95 } : {}}
        >
        {prizes.map((prize, index) => {
            const angle = index * segmentAngle
            const midAngle = angle + segmentAngle / 2
            const textAngle = midAngle - 90
            
            return (
              <div
                key={prize.spin}
                style={{
                  position: 'absolute',
                  width: '50%',
                  height: '50%',
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0 0',
                  transform: `rotate(${angle}deg)`,
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    width: '200%',
                    height: '200%',
                    top: '-100%',
                    left: '-100%',
                    background: `linear-gradient(135deg, #ff6b9d, #ff8fab, #ff4d7d, #ffb3c1)`,
                    transform: `rotate(${segmentAngle / 2}deg)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid white'
                  }}
                >
                  <div
                    style={{
                      transform: `rotate(${-textAngle}deg)`,
                      textAlign: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '12px',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}
                  >
                    <div style={{ fontSize: '20px', marginBottom: '2px' }}>{prize.emoji}</div>
                    <div>Prize {index + 1}</div>
                  </div>
                </div>
              </div>
            )
          })}
          
          {/* Center circle */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(35px, 10vw, 50px)',
            height: 'clamp(35px, 10vw, 50px)',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff4d7d, #ff8fab)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'clamp(2px, 0.6vw, 3px) solid white',
            boxShadow: '0 3px 12px rgba(255,77,125,0.4)'
          }}>
            <Heart size={16} color="white" />
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={spinWheel}
        disabled={isSpinning || spinCount >= totalSpins}
        style={{
          background: isSpinning || spinCount >= totalSpins 
            ? '#ccc' 
            : 'linear-gradient(135deg, #ff4d7d, #ff8fab)',
          color: 'white',
          border: 'none',
          padding: 'clamp(10px, 2.5vw, 15px) clamp(20px, 5vw, 40px)',
          borderRadius: 'clamp(20px, 5vw, 30px)',
          fontSize: 'clamp(14px, 3.5vw, 18px)',
          fontWeight: 600,
          cursor: isSpinning || spinCount >= totalSpins ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(8px, 2vw, 10px)',
          margin: '0 auto',
          boxShadow: '0 8px 24px rgba(255,77,125,0.3)',
          transition: 'all 0.3s ease',
          maxWidth: 'clamp(250px, 70vw, 350px)',
          width: 'clamp(200px, 60vw, 300px)',
          minHeight: 'clamp(44px, 10vw, 54px)'
        }}
        whileHover={!isSpinning && spinCount < totalSpins ? { scale: 1.05 } : {}}
        whileTap={!isSpinning && spinCount < totalSpins ? { scale: 0.95 } : {}}
      >
        <Sparkles size={20} />
        {isSpinning ? 'Spinning...' : spinCount >= totalSpins ? 'All Spins Complete!' : 'Spin for Prize!'}
        <Sparkles size={20} />
      </motion.button>

      {/* Countdown Overlay */}
      <AnimatePresence>
        {showCountdown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '120px',
              fontWeight: 700,
              color: '#ff4d7d',
              textShadow: '0 0 40px rgba(255,77,125,0.5)',
              zIndex: 1500
            }}
          >
            {countdown}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prize Modal */}
      <AnimatePresence>
        {showPrize && currentPrize && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,227,236,0.95))',
              borderRadius: 'clamp(15px, 4vw, 20px)',
              padding: 'clamp(15px, 4vw, 30px)',
              maxWidth: 'clamp(280px, 85vw, 400px)',
              width: 'clamp(250px, 80vw, 350px)',
              maxHeight: 'clamp(400px, 80vh, 600px)',
              overflowY: 'auto',
              boxShadow: '0 16px 48px rgba(255,77,125,0.3)',
              border: 'clamp(2px, 0.5vw, 3px) solid #ffccd5',
              zIndex: 1000,
              boxSizing: 'border-box'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(35px, 9vw, 60px)', marginBottom: 'clamp(10px, 2.5vw, 15px)' }}>
                <span className="emoji">{prizes[spinCount - 1]?.emoji}</span>
              </div>
              <h3 style={{
                color: '#ff4d7d',
                fontSize: 'clamp(18px, 4.5vw, 24px)',
                fontWeight: 700,
                marginBottom: 'clamp(10px, 2.5vw, 15px)',
                lineHeight: '1.3'
              }}>
                {currentPrize}
              </h3>
              {prizes[spinCount - 1]?.message && (
                <div style={{
                  background: 'linear-gradient(135deg, #fff5f8, #ffe0ec)',
                  borderRadius: 'clamp(10px, 2.5vw, 15px)',
                  padding: 'clamp(10px, 2.5vw, 15px)',
                  border: 'clamp(1px, 0.3vw, 1.5px) solid #ffccd5',
                  marginBottom: 'clamp(8px, 2vw, 12px)'
                }}>
                  <p style={{
                    color: '#ff4d7d',
                    fontSize: 'clamp(12px, 3vw, 14px)',
                    lineHeight: '1.5',
                    fontStyle: 'italic',
                    margin: 0
                  }}>
                    {prizes[spinCount - 1]?.message}
                  </p>
                </div>
              )}

              {/* Audio Player for Second Prize */}
              {spinCount === 2 && (
                <div style={{
                  background: 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
                  borderRadius: '15px',
                  padding: 'clamp(10px, 2.5vw, 15px)',
                  border: 'clamp(1.5px, 0.4vw, 2px) solid #ffccd5',
                  marginBottom: 'clamp(10px, 2.5vw, 15px)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '15px'
                  }}>
                    <motion.button
                      onClick={toggleAudio}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        background: isPlaying 
                          ? 'linear-gradient(135deg, #ff4d7d, #ff8fab)' 
                          : 'linear-gradient(135deg, #4CAF50, #66BB6A)',
                        border: 'none',
                        borderRadius: '50%',
                        width: 'clamp(50px, 12vw, 60px)',
                        height: 'clamp(50px, 12vw, 60px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 3px 12px rgba(255,77,125,0.3)'
                      }}
                    >
                      {isPlaying ? (
                        <VolumeX size={20} color="white" />
                      ) : (
                        <Volume2 size={20} color="white" />
                      )}
                    </motion.button>
                    <div style={{
                      textAlign: 'center',
                      color: '#ff4d7d',
                      fontSize: 'clamp(11px, 2.5vw, 14px)',
                      fontWeight: 600
                    }}>
                      {isPlaying ? 'Playing...' : 'Click to Play'}
                    </div>
                  </div>
                </div>
              )}
              
              <motion.button
                onClick={continueToNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: spinCount === 3 
                    ? 'linear-gradient(135deg, #ff6b9d, #ff8fab)'
                    : 'linear-gradient(135deg, #ff4d7d, #ff8fab)',
                  color: 'white',
                  border: 'none',
                  padding: 'clamp(10px, 2.5vw, 15px) clamp(20px, 5vw, 30px)',
                  borderRadius: 'clamp(15px, 4vw, 20px)',
                  fontSize: 'clamp(13px, 3vw, 16px)',
                  fontWeight: 600,
                  cursor: spinCount === 3 ? 'default' : 'pointer',
                  width: '100%',
                  opacity: spinCount === 3 ? 0.7 : 1
                }}
                disabled={spinCount === 3}
              >
                {prizes[spinCount - 1]?.buttonText}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Confetti />

      <div className="small" style={{ 
        marginTop: 'clamp(15px, 3vw, 20px)',
        fontSize: 'clamp(11px, 2.5vw, 13px)',
        padding: '0 clamp(10px, 3vw, 20px)'
      }}>
        From: {from} 💕 • Spin {spinCount}/{totalSpins}
      </div>
    </div>
  )
}
