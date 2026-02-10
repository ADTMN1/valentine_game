import React from 'react'
import { motion } from 'framer-motion'
import { Heart, CheckCircle } from 'lucide-react'

interface GameProgressProps {
  completedGames: string[]
  totalGames: number
}

export default function GameProgress({ completedGames, totalGames }: GameProgressProps) {
  const progress = (completedGames.length / totalGames) * 100

  return (
    <motion.div
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,227,236,0.9))',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '20px',
        border: '2px solid #ffccd5',
        backdropFilter: 'blur(10px)'
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '15px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '16px',
          fontWeight: 600,
          color: '#ff4d7d'
        }}>
          <Heart size={20} fill="#ff4d7d" />
          Your Progress
        </div>
        <div style={{
          fontSize: '14px',
          color: '#8d99ae',
          fontWeight: 600
        }}>
          {completedGames.length} / {totalGames} Games
        </div>
      </div>

      <div style={{
        width: '100%',
        height: '12px',
        background: '#ffe5ec',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #ff4d7d, #ff8fab)',
            borderRadius: '10px'
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      <div style={{
        marginTop: '15px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {completedGames.map((game, index) => (
          <motion.div
            key={game}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: 'linear-gradient(135deg, #ffccd5, #ff8fab)',
              padding: '5px 10px',
              borderRadius: '15px',
              fontSize: '12px',
              color: '#ff4d7d',
              fontWeight: 600
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <CheckCircle size={12} fill="#ff4d7d" />
            {game}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
