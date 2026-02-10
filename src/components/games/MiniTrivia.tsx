import React from 'react'
export default function MiniTrivia({ to }: { to: string }) {
  return (
    <div>
      <p className="small">Tiny trivia: Which month sometimes has 29 days?</p>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <button className="gameBtn">February</button>
        <button className="gameBtn">March</button>
      </div>
      <div className="small" style={{marginTop:12}}>Nice try, {to}!</div>
    </div>
  )
}
