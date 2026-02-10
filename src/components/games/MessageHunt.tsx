import React, { useState } from 'react'
export default function MessageHunt({ to, from }: { to: string; from: string }) {
  const [found, setFound] = useState(false)
  return (
    <div>
      <p className="small">Find the hidden message in the grid.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:6,marginTop:8}}>
        {Array.from({length:18}).map((_,i)=> (
          <div key={i} onClick={() => setFound(true)} className="gameBtn">{i===5? '★': '•'}</div>
        ))}
      </div>
      {found && (
        <div style={{marginTop:12,textAlign:'center'}}>You found it! <strong>Secret revealed</strong><div className="small">— By: {from}</div></div>
      )}
    </div>
  )
}
