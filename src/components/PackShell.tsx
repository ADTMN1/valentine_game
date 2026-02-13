import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Gamepad2, X, Sparkles, Key, Gift } from 'lucide-react'
import GameProgress from './GameProgress'
import GamePage from './GamePage'
import CuteQuiz from './games/CuteQuiz'
import PickOne from './games/PickOne'
import MemoryPuzzle from './games/MemoryPuzzle'
import TapHeart from './games/TapHeart'
import EmojiMatch from './games/EmojiMatch'
import MiniTrivia from './games/MiniTrivia'
import MessageHunt from './games/MessageHunt'
import RomanticEscapeRoom from './games/RomanticEscapeRoom'
import SpinTheWheel from './games/SpinTheWheel'

const gameIcons: Record<string, React.ReactNode> = {
  'Quiz': <Star size={24} />,
  'Pick-One': <Heart size={24} />,
  'Memory Puzzle': <Gamepad2 size={24} />,
  'Tap Heart': <Heart size={24} />,
  'Emoji Match': <Sparkles size={24} />,
  'Mini Trivia': <Star size={24} />,
  'Message Hunt': <Heart size={24} />,
  'EscapeRoom': <Key size={24} />,
  'SpinTheWheel': <Gift size={24} />
}

const gameDescriptions: Record<string, string> = {
  'Quiz': 'Test your knowledge together',
  'Pick-One': 'Make fun choices together',
  'Memory Puzzle': 'Match sweet memories',
  'Tap Heart': 'Catch falling symbols',
  'Emoji Match': 'Match fun emojis',
  'Mini Trivia': 'Quick fun questions',
  'Message Hunt': 'Find hidden messages',
  'EscapeRoom': 'Solve romantic puzzles to escape',
  'SpinTheWheel': 'Spin to win romantic surprises'
}

export default function PackShell({ 
  pack, 
  to, 
  from, 
  onGameComplete, 
  completedGames, 
  totalGames,
  photoUrl
}: { 
  pack: string; 
  to: string; 
  from: string; 
  onGameComplete?: (gameName: string) => void; 
  completedGames?: string[]; 
  totalGames?: number; 
  photoUrl?: string;
}) {
  const packs: Record<string, string[]> = {
    cute: ['SpinTheWheel'],
    fun: ['SpinTheWheel'],
    emotional: ['SpinTheWheel'],
    full: ['SpinTheWheel'],
  }

  const games = packs[pack] || packs.cute
  const [active, setActive] = useState<string | null>(null)
  const [mobileView, setMobileView] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setMobileView(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getGameComponent = (name: string) => {
    const props = { to, from }
    switch (name) {
      case 'Quiz':
        return <CuteQuiz {...props} />
      case 'Pick-One':
        return <PickOne {...props} />
      case 'Memory Puzzle':
        return <MemoryPuzzle {...props} />
      case 'Tap Heart':
        return <TapHeart {...props} />
      case 'Emoji Match':
        return <EmojiMatch {...props} />
      case 'Mini Trivia':
        return <MiniTrivia {...props} />
      case 'Message Hunt':
        return <MessageHunt {...props} />
      case 'EscapeRoom':
        return <RomanticEscapeRoom {...props} onGameComplete={() => handleGameComplete(name)} />
      case 'SpinTheWheel':
        return <SpinTheWheel {...props} onGameComplete={() => handleGameComplete(name)} />
      default:
        return <div>Coming soon</div>
    }
  }

  const handleGameComplete = (gameName: string) => {
    if (onGameComplete) {
      onGameComplete(gameName)
    }
    // Only go back to game selection if it's not EscapeRoom or SpinTheWheel (which should go to final)
    if (gameName !== 'EscapeRoom' && gameName !== 'SpinTheWheel') {
      setActive(null) // Go back to game selection
    }
  }

  if (active) {
    return (
      <GamePage
        gameName={active}
        gameComponent={getGameComponent(active)}
        to={to}
        from={from}
        onBack={() => setActive(null)}
        onGameComplete={() => handleGameComplete(active)}
        photoUrl={photoUrl}
      />
    )
  }

  return (
    <div>
      {completedGames && totalGames && (
        <GameProgress />
      )}
      
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="small"
          style={{ 
            fontSize: '16px', 
            fontWeight: 600, 
            color: '#ff4d7d',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Sparkles size={18} />
          Choose a fun mini-game
          <Sparkles size={18} />
        </motion.div>
        <div className="grid" style={{ 
          gridTemplateColumns: mobileView ? 'repeat(auto-fit, minmax(200px, 1fr))' : undefined,
          padding: mobileView ? '0 10px' : '0'
        }}>
          {games.map((g, index) => (
            <motion.div
              key={g}
              onClick={() => setActive(g)}
              className="gameBtn"
              style={{
                padding: mobileView ? '15px 10px' : '20px 15px',
                minHeight: mobileView ? '120px' : 'auto'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 30px 60px rgba(255,77,125,0.25), 0 0 0 1px rgba(255,215,0,0.4)' 
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                style={{ 
                  color: '#ff4d7d', 
                  marginBottom: '8px',
                  background: 'linear-gradient(135deg, #ff4d7d, #ff8fab)',
                  borderRadius: '50%',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {gameIcons[g]}
              </motion.div>
              <div style={{ fontWeight: 700, fontSize: '16px', color: '#2d1b3d', marginBottom: '4px' }}>
                {g}
              </div>
              <div className="small" style={{ fontSize: '11px', color: '#8d99ae', fontStyle: 'italic' }}>
                {gameDescriptions[g]}
              </div>
              <motion.div
                style={{
                  marginTop: '8px',
                  fontSize: '11px',
                  color: '#ff4d7d',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                whileHover={{ scale: 1.1 }}
              >
                <Heart size={12} fill="#ff4d7d" />
                Tap to play
                <Heart size={12} fill="#ff4d7d" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            style={{ marginTop: 24 }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="card"
              style={{ 
                border: '3px solid #ff4d7d',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,227,236,0.95))',
                padding: mobileView ? '15px 10px' : '16px',
                margin: mobileView ? '10px 0' : '24px 0'
              }}
            >
              <motion.div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: 16,
                  padding: '16px',
                  background: 'linear-gradient(135deg, #ff4d7d, #ff8fab)',
                  borderRadius: '16px',
                  color: 'white'
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ 
                  fontWeight: 700, 
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {gameIcons[active]}
                  {active}
                </div>
                <motion.button
                  onClick={() => setActive(null)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: '2px solid rgba(255,255,255,0.4)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    background: 'rgba(255,255,255,0.3)',
                    rotate: 5
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={16} />
                  Close
                </motion.button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {getGameComponent(active)}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
