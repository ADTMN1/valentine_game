import React, { useState } from 'react'

export default function CuteQuiz({ to, from, onGameComplete }: { 
  to: string; 
  from: string; 
  onGameComplete?: () => void 
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const questions = [
    {
      question: "Which sweet treat says 'I care'?",
      options: ["Chocolate", "Cookies"],
      correct: 0
    },
    {
      question: "What's the most romantic color?",
      options: ["Blue", "Pink"],
      correct: 1
    },
    {
      question: "Complete: 'Roses are red, violets are...'",
      options: ["Green", "Blue"],
      correct: 1
    }
  ]

  const handleAnswer = (answerIndex: number) => {
    if (answerIndex === questions[currentQuestion].correct) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setShowResult(true)
        setTimeout(() => {
          if (onGameComplete) {
            onGameComplete()
          }
        }, 2000)
      }
    }
  }

  if (showResult) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
        <h2 style={{ color: '#ff4d7d', fontSize: '24px', marginBottom: '10px' }}>
          Perfect! You completed the quiz!
        </h2>
        <p style={{ color: '#8d99ae', fontSize: '16px' }}>
          Great job, {to}! You know all the right answers! 💕
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="small" style={{ marginBottom: '20px' }}>
        Question {currentQuestion + 1} of {questions.length} for {to}
      </p>
      
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,227,236,0.8))',
        borderRadius: '16px',
        padding: '30px',
        marginBottom: '20px',
        border: '2px solid #ffccd5'
      }}>
        <h3 style={{ 
          color: '#ff4d7d', 
          fontSize: '18px', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {questions[currentQuestion].question}
        </h3>
        
        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              style={{
                background: 'linear-gradient(135deg, #ffffff, #fff5f8)',
                border: '2px solid #ffccd5',
                borderRadius: '12px',
                padding: '15px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: '#2d1b3d',
                fontWeight: 500
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #ffccd5, #ff8fab)'
                e.currentTarget.style.color = 'white'
                e.currentTarget.style.transform = 'scale(1.02)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff, #fff5f8)'
                e.currentTarget.style.color = '#2d1b3d'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <p className="small" style={{ marginTop: '20px' }}>
        From: {from} 💕
      </p>
    </div>
  )
}
