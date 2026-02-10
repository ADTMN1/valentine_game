import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Music, Music2, Volume2, VolumeX } from 'lucide-react'

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = volume
      audio.loop = true
    }
  }, [volume])

  const togglePlay = () => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play().catch(e => console.log('Audio play failed:', e))
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/romantic-music.mp3"
        preload="auto"
      />
      
      <motion.div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,227,236,0.9))',
          borderRadius: '20px',
          padding: '12px',
          boxShadow: '0 10px 30px rgba(255,77,125,0.2)',
          border: '2px solid #ffccd5',
          backdropFilter: 'blur(10px)'
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <motion.button
            onClick={togglePlay}
            style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              background: isPlaying 
                ? 'linear-gradient(135deg, #ff4d7d, #ff8fab)' 
                : 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <Volume2 size={20} color="white" />
            ) : (
              <VolumeX size={20} color="#666" />
            )}
          </motion.button>

          {isPlaying && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Music2 size={16} color="#ff4d7d" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                style={{
                  width: '80px',
                  height: '4px',
                  background: '#ffccd5',
                  outline: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  )
}
