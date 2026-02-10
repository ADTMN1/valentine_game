import React from 'react'
export default function EmojiMatch({ to }: { to: string }) {
  return (
    <div>
      <p className="small">Match the emoji pairs — cute and quick.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginTop:8}}>
        {['😊','😊','🎵','🎵','🍫','🍫','🌹','🌹'].map((e,i)=> (
          <div key={i} className="gameBtn">{e}</div>
        ))}
      </div>
      <div className="small" style={{marginTop:12}}>Good luck, {to}</div>
    </div>
  )
}
