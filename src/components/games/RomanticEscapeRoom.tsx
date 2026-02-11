import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Lock, Key, Eye, Gift, Sparkles } from 'lucide-react'

export default function RomanticEscapeRoom({ to, from, onGameComplete }: { 
  to: string; 
  from: string; 
  onGameComplete?: () => void 
}) {
  const [currentRoom, setCurrentRoom] = useState(0)
  const [unlockedRooms, setUnlockedRooms] = useState([0])
  const [foundClues, setFoundClues] = useState<string[]>([])
  const [showPuzzle, setShowPuzzle] = useState(false)
  const [puzzleSolved, setPuzzleSolved] = useState<{ [key: number]: boolean }>({})
  const [finalCode, setFinalCode] = useState('')
  const [showFinalMessage, setShowFinalMessage] = useState(false)
  const [showWrongAnswer, setShowWrongAnswer] = useState(false)

  // Mobile detection
  const [mobileView, setMobileView] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setMobileView(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

 const rooms = [
    {
      id: 0,
      name: "Memory Lane",
      emoji: "🌸",
      description: "Recalling the sweet names that started it all...",
      clue: "The language of my heart since day one.",
      puzzle: {
        question: "What did I call you?",
        options: ["Enat", "Mare", "Fikir", "Liyu"],
        correct: 2, // Fikir
        hint: "It’s the foundation of every heartbeat we’ve shared. ❤️"
      }
    },
    {
      id: 1,
      name: "Heart Garden", 
      emoji: "💕",
      description: "Exploring the light that draws me to you...",
      clue: "A silent expression that says a thousand words.",
      puzzle: {
        question: "What do I like most about you?",
        options: ["hairstyle", "Smile", "Shape", "you"],
        correct: 1, // Smile
        hint: "It’s the first thing that warms me up, even on a cold day. ☀️"
      }
    },
    {
      id: 2,
      name: "Secret Chamber",
      emoji: "🔐", 
      description: "The side of us that only comes out in heated moments...",
      clue: "When things get serious, the nicknames disappear.",
      puzzle: {
        question: "What do I call you when I am angry?",
        options: ["Rich", "Rahel", "Habtam", "Kaliye"],
        correct: 2, // Habtam
        hint: "Think of the name I use when I’m not being 'sweet' anymore. 😤"
      }
    }
  ]

  const handleRoomClick = (roomId: number) => {
    if (unlockedRooms.includes(roomId)) {
      setCurrentRoom(roomId)
      setShowPuzzle(true)
    }
  }

  const handlePuzzleAnswer = (answerIndex: number) => {
    const currentPuzzle = rooms[currentRoom].puzzle
    if (answerIndex === currentPuzzle.correct) {
      const newPuzzleSolved = { ...puzzleSolved, [currentRoom]: true }
      setPuzzleSolved(newPuzzleSolved)
      
      const clue = rooms[currentRoom].clue
      setFoundClues([...foundClues, clue])
      
      // Unlock next room
      if (currentRoom < rooms.length - 1) {
        setUnlockedRooms([...unlockedRooms, currentRoom + 1])
      }
      
      setShowPuzzle(false)
      setShowWrongAnswer(false)
      
      // Check if all puzzles solved
      if (Object.keys(newPuzzleSolved).length === rooms.length) {
        setTimeout(() => {
          setShowFinalMessage(true)
        }, 1000)
      }
    } else {
      setShowWrongAnswer(true)
      setTimeout(() => {
        setShowWrongAnswer(false)
      }, 2000)
    }
  }

  const handleFinalCode = () => {
    if (finalCode.toLowerCase() === 'love') {
      setTimeout(() => {
        if (onGameComplete) {
          onGameComplete()
        }
      }, 2000)
    }
  }

  if (showFinalMessage) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', padding: '40px' }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ fontSize: '60px', marginBottom: '20px' }}
        >
          🔓
        </motion.div>
        
        <h2 style={{ 
          color: '#ff4d7d', 
          fontSize: '28px', 
          marginBottom: '20px',
          fontWeight: 700 
        }}>
          All Rooms Unlocked! 💕
        </h2>
        
       

        <div style={{ marginBottom: '25px' }}>
          <p style={{ 
            color: '#8d99ae', 
            fontSize: '18px', 
            marginBottom: '15px',
            fontWeight: 600 
          }}>
            Final Challenge: Enter the secret code to unlock my heart 💝
          </p>
          <input
            type="text"
            value={finalCode}
            onChange={(e) => setFinalCode(e.target.value)}
            placeholder="Enter 4-letter code..."
            style={{
              padding: mobileView ? '12px 15px' : '15px 20px',
              fontSize: mobileView ? '16px' : '18px',
              borderRadius: '15px',
              border: '2px solid #ffccd5',
              background: 'linear-gradient(135deg, #ffffff, #fff5f8)',
              color: '#ff4d7d',
              fontWeight: 600,
              textAlign: 'center',
              width: mobileView ? '100%' : '250px',
              maxWidth: '300px',
              marginBottom: '15px',
              boxSizing: 'border-box' // Better mobile input
            }}
          />
          <motion.button
            onClick={handleFinalCode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, #ff4d7d, #ff8fab)',
              color: 'white',
              border: 'none',
              padding: mobileView ? '12px 20px' : '15px 30px',
              borderRadius: '25px',
              fontSize: mobileView ? '16px' : '18px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 auto',
              width: mobileView ? '100%' : 'auto',
              maxWidth: '250px',
              justifyContent: 'center'
            }}
          >
            <Key size={18} />
            Unlock My Heart
          </motion.button>
        </div>

        <p style={{ 
          color: '#8d99ae', 
          fontSize: '16px',
          fontStyle: 'italic' 
        }}>
          Hint: The most powerful 4-letter word in the universe ✨
        </p>
      </motion.div>
    )
  }

  return (
    <div>
      <p className="small" style={{ marginBottom: '20px' }}>
        🗝️ Escape Room Challenge: Unlock all 3 rooms to reveal the final surprise!
      </p>

      {/* Room Selection */}
      <div style={{
        display: mobileView ? 'flex' : 'grid',
        flexDirection: mobileView ? 'column' : 'row',
        gridTemplateColumns: mobileView ? 'none' : 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '15px',
        marginBottom: '25px',
        padding: mobileView ? '0 5px' : '0 10px'
      }}>
        {rooms.map((room) => {
          const isUnlocked = unlockedRooms.includes(room.id)
          const isCompleted = puzzleSolved[room.id]
          
          return (
            <motion.div
              key={room.id}
              onClick={() => isUnlocked && handleRoomClick(room.id)}
              whileHover={isUnlocked ? { scale: 1.02 } : {}}
              style={{
                background: isUnlocked 
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,227,236,0.9))'
                  : 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
                borderRadius: '20px',
                padding: mobileView ? '18px 15px' : '20px',
                border: isUnlocked ? '3px solid #ffccd5' : '3px solid #ccc',
                cursor: isUnlocked ? 'pointer' : 'not-allowed',
                position: 'relative',
                opacity: isUnlocked ? 1 : 0.6,
                transition: 'all 0.3s ease',
                minHeight: mobileView ? '120px' : '140px',
                width: mobileView ? '100%' : 'auto'
              }}
            >
              <div style={{ display: 'flex', alignItems: mobileView ? 'flex-start' : 'center', gap: '10px', marginBottom: '10px', flexDirection: mobileView ? 'column' : 'row' }}>
                <span style={{ fontSize: mobileView ? '25px' : '30px' }}>{room.emoji}</span>
                <div>
                  <h3 style={{ 
                    color: isUnlocked ? '#ff4d7d' : '#999',
                    fontSize: mobileView ? '16px' : '18px',
                    fontWeight: 700,
                    margin: 0
                  }}>
                    {room.name}
                  </h3>
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        background: '#4CAF50',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'inline-block'
                      }}
                    >
                      ✓ Completed
                    </motion.div>
                  )}
                </div>
              </div>
              
              <p style={{ 
                color: isUnlocked ? '#8d99ae' : '#999',
                fontSize: mobileView ? '12px' : '14px',
                margin: '5px 0 10px 0',
                fontStyle: 'italic'
              }}>
                {room.description}
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isUnlocked ? (
                  <>
                    <Key size={16} color="#ff4d7d" />
                    <span style={{ color: '#ff4d7d', fontSize: mobileView ? '12px' : '14px', fontWeight: 600 }}>
                      Click to Enter
                    </span>
                  </>
                ) : (
                  <>
                    <Lock size={16} color="#999" />
                    <span style={{ color: '#999', fontSize: '14px' }}>
                      Locked
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Puzzle Modal */}
      <AnimatePresence>
        {showPuzzle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
            onClick={() => setShowPuzzle(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,227,236,0.95))',
                borderRadius: '25px',
                padding: mobileView ? '20px 15px' : '40px',
                maxWidth: '500px',
                width: mobileView ? '92%' : '95%',
                maxHeight: '92vh',
                overflowY: 'auto',
                border: '3px solid #ffccd5',
                boxShadow: '0 20px 60px rgba(255,77,125,0.4)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: mobileView ? '15px' : '20px', flexDirection: mobileView ? 'column' : 'row', textAlign: mobileView ? 'center' : 'left' }}>
                <span style={{ fontSize: '40px' }}>{rooms[currentRoom].emoji}</span>
                <h2 style={{ 
                  color: '#ff4d7d', 
                  fontSize: '24px',
                  fontWeight: 700,
                  margin: 0
                }}>
                  {rooms[currentRoom].name}
                </h2>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #fff5f8, #ffe0ec)',
                borderRadius: '15px',
                padding: mobileView ? '15px' : '20px',
                marginBottom: mobileView ? '20px' : '25px',
                border: '2px solid #ffccd5'
              }}>
                <h3 style={{ 
                  color: '#ff6b9d', 
                  fontSize: mobileView ? '16px' : '18px',
                  marginBottom: mobileView ? '12px' : '15px',
                  fontWeight: 600,
                  textAlign: 'center'
                }}>
                  {rooms[currentRoom].puzzle.question}
                </h3>

                {showWrongAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      background: 'linear-gradient(135deg, #ffe0e0, #ffcccc)',
                      borderRadius: '12px',
                      padding: mobileView ? '12px' : '15px',
                      border: '2px solid #ff9999',
                      marginBottom: mobileView ? '12px' : '15px',
                      textAlign: 'center'
                    }}
                  >
                    <p style={{ 
                      color: '#d32f2f', 
                      fontSize: mobileView ? '12px' : '14px',
                      margin: 0,
                      fontWeight: 600
                    }}>
                      💔 Not quite right... Try again!
                    </p>
                  </motion.div>
                )}
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: mobileView ? '8px' : '10px' }}>
                  {rooms[currentRoom].puzzle.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handlePuzzleAnswer(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        background: 'linear-gradient(135deg, #ffffff, #fff5f8)',
                        border: '2px solid #ffccd5',
                        borderRadius: '12px',
                        padding: mobileView ? '12px 15px' : '15px 20px',
                        fontSize: mobileView ? '14px' : '16px',
                        cursor: 'pointer',
                        color: '#2d1b3d',
                        fontWeight: 500,
                        textAlign: 'left',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #ffccd5, #ff8fab)'
                        e.currentTarget.style.color = 'white'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff, #fff5f8)'
                        e.currentTarget.style.color = '#2d1b3d'
                      }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #fff9e6, #fff3d6)',
                borderRadius: '12px',
                padding: '15px',
                border: '2px solid #ffd4a3'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Eye size={16} color="#ff9800" />
                  <span style={{ color: '#ff9800', fontWeight: 600, fontSize: '14px' }}>
                    Hint:
                  </span>
                </div>
                <p style={{ 
                  color: '#8d99ae', 
                  fontSize: '14px',
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  {rooms[currentRoom].puzzle.hint}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="small" style={{ marginTop: '20px' }}>
        From: {from} 💕 • Found Clues: {foundClues.length}/{rooms.length}
      </div>
    </div>
  )
}
