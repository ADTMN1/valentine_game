import React, { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Gift } from 'lucide-react'
import SurpriseIntro from './components/SurpriseIntro'
import PackShell from './components/PackShell'
import FinalSurprise from './components/FinalSurprise'
import RomanticParticles from './components/RomanticParticles'
import RomanticEscapeRoom from './components/games/RomanticEscapeRoom'

type Step = 'intro' | 'games' | 'final'

function useQuery() {
  return new URLSearchParams(window.location.search)
}

export default function App() {
  const q = useQuery()
  const packParam = q.get('pack') || 'cute'
  const to = q.get('to') || 'your'
  const from = q.get('from') || '💕 '
  const photoUrl = q.get('photo') || ''
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState<Step>('intro')
  const [completedGames, setCompletedGames] = useState<string[]>([])

  useEffect(() => {
    setMounted(true)
    document.body.classList.add('romance')
    return () => {
      document.body.classList.remove('romance')
    }
  }, [])

  const pack = useMemo(() => {
    const p = packParam.toLowerCase()
    if (['cute', 'fun', 'emotional', 'full'].includes(p)) return p as 'cute' | 'fun' | 'emotional' | 'full'
    return 'cute'
  }, [packParam])

  const packs: Record<string, string[]> = {
    cute: ['EscapeRoom'],
    fun: ['EscapeRoom'],
    emotional: ['EscapeRoom'],
    full: ['EscapeRoom'],
  }

  const totalGames = packs[pack]?.length || 1

  const handleGameComplete = (gameName: string) => {
    if (!completedGames.includes(gameName)) {
      const newCompleted = [...completedGames, gameName]
      setCompletedGames(newCompleted)
      
      // Since we only have one game (EscapeRoom), go directly to final when it's completed
      if (gameName === 'EscapeRoom' || newCompleted.length === totalGames) {
        setTimeout(() => {
          setCurrentStep('final')
        }, 1500)
      }
    }
  }

  const handleIntroComplete = () => {
    setCurrentStep('games')
  }

  if (!mounted) return null

  return (
    <>
      <RomanticParticles />
      
      <AnimatePresence mode="wait">
        {currentStep === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SurpriseIntro onNext={handleIntroComplete} />
          </motion.div>
        )}

        {currentStep === 'games' && (
          <motion.div 
            key="games"
            className="container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="header"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Gift size={28} color="#ff4d7d" />
                </motion.div>
                <div>
                  <motion.div 
                    className="title"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    💕 Special Surprise Games 💕
                  </motion.div>
                  <motion.div 
                    className="small"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    For: <span style={{ color: '#ff4d7d', fontWeight: 600 }}>{to}</span> — By: <span style={{ color: '#ff4d7d', fontWeight: 600 }}>{from}</span>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div 
                className="small"
                style={{ 
                  background: 'linear-gradient(135deg, #ff4d7d, #ff8fab)', 
                  color: 'white', 
                  padding: '8px 16px', 
                  borderRadius: '20px',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
                {pack.charAt(0).toUpperCase() + pack.slice(1)}
              </motion.div>
            </motion.div>

            <PackShell 
              pack={pack} 
              to={to} 
              from={from} 
              onGameComplete={handleGameComplete}
              completedGames={completedGames}
              totalGames={totalGames}
              photoUrl={photoUrl}
            />
          </motion.div>
        )}

        {currentStep === 'final' && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <FinalSurprise to={to} photoUrl={photoUrl} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
