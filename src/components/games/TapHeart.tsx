import React, { useState } from 'react'
export default function TapHeart({ to }: { to: string }) {
  const [count, setCount] = useState(0)
  return (
    <div style={{textAlign:'center'}}>
      <p className="small">Tap the icon to score points</p>
      <div style={{fontSize:48,margin:'12px 0',cursor:'pointer'}} onClick={() => setCount(c=>c+1)}>★</div>
      <div className="small">Taps: {count}</div>
      <div className="small" style={{marginTop:8}}>For: {to}</div>
    </div>
  )
}
