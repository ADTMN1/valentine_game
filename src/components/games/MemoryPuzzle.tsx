import React from 'react'
export default function MemoryPuzzle({ to }: { to: string }) {
  return (
    <div>
      <p className="small">A tiny memory puzzle — match the pairs!</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginTop:8}}>
        {Array.from({length:8}).map((_,i)=> (
          <div key={i} className="gameBtn">🔷</div>
        ))}
      </div>
      <div className="small" style={{marginTop:12}}>Good luck, {to}!</div>
    </div>
  )
}
