import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Gift, Sparkles } from 'lucide-react'

export default function SurpriseIntro({ onNext }: { onNext: () => void }) {
  const [mobileView, setMobileView] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setMobileView(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: mobileView ? '20px 15px' : '0' // Mobile padding
    }}>
      <motion.div
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,227,236,0.9))',
          borderRadius: '30px',
          padding: mobileView ? '40px 25px' : '60px 40px',
          textAlign: 'center',
          boxShadow: '0 30px 80px rgba(255,77,125,0.2)',
          border: '3px solid #ffccd5',
          backdropFilter: 'blur(20px)',
          maxWidth: mobileView ? '350px' : '500px',
          width: '90%'
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Gift size={80} color="#ff4d7d" style={{ marginBottom: '20px' }} />
        </motion.div>

        <motion.h1
          style={{
            fontSize: '36px',
            fontWeight: 700,
            color: '#ff4d7d',
            marginBottom: '20px',
            textShadow: '0 2px 4px rgba(255,77,125,0.2)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          💕 Surprise For You 💕
        </motion.h1>

        <motion.p
          style={{
            fontSize: '18px',
            color: '#8d99ae',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          I've prepared something special just for you. 
          <br />
          Ready to discover your surprise?
        </motion.p>

        <motion.button
          onClick={onNext}
          style={{
            background: 'linear-gradient(135deg, #ff4d7d, #ff8fab)',
            color: 'white',
            border: 'none',
            padding: mobileView ? '15px 30px' : '18px 40px',
            borderRadius: '50px',
            fontSize: mobileView ? '16px' : '18px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '0 auto',
            boxShadow: '0 10px 30px rgba(255,77,125,0.3)',
            width: mobileView ? '100%' : 'auto',
            maxWidth: '250px'
          }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: '0 15px 40px rgba(255,77,125,0.4)' 
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Sparkles size={20} />
       Open Your Surprise
          <Sparkles size={20} />
        </motion.button>
      </motion.div>
    </div>
  )
}
