import React, { useState, useMemo, useEffect } from 'react'

type Suggestion = { title: string; desc: string; icon: string }

export default function PickOne({ to, from }: { to: string; from: string }) {
  const options: [string,string][] = [["Chocolate","Ice Cream"],["Movie night","Long drive"],["Coffee","Walk"]]
  const [step, setStep] = useState(0)
  const [chosen, setChosen] = useState<string[]>([])

  const pick = (opt: string) => {
    setChosen((s)=>[...s,opt])
    if (step+1 >= options.length) {
      setStep(options.length)
    } else {
      setStep(step+1)
    }
  }

  const suggestions = useMemo((): Suggestion[] => {
    if (chosen.length === 0) return []
    const text = chosen.join(' ').toLowerCase()
    const res: Suggestion[] = []
    if (text.includes('chocolate') || text.includes('ice cream')) {
      res.push({ title: 'Sweet Gift Box', desc: 'Curated chocolates and treats in a stylish box.', icon: '🍬' })
    }
    if (text.includes('movie') || text.includes('drive')) {
      res.push({ title: 'Experience Voucher', desc: 'A movie night or a scenic drive voucher.', icon: '🎟️' })
    }
    if (text.includes('coffee') || text.includes('walk')) {
      res.push({ title: 'Cozy Date Kit', desc: 'Coffee beans, a thermos, and a map for a relaxed walk.', icon: '☕' })
    }
    if (res.length === 0) {
      res.push({ title: 'Surprise Box', desc: 'A hand-picked surprise based on your choices.', icon: '🎁' })
    }
    return res
  }, [chosen])

  const [showHearts, setShowHearts] = useState(false)

  const q = new URLSearchParams(window.location.search)
  const revealSong = q.get('song')

  useEffect(() => {
    if (step >= options.length) {
      // add romance class to body
      document.body.classList.add('romance')
      setShowHearts(true)
      // try to play a user-provided song first (must be hosted and licensed)
      // priority: ?song param -> synthesized melody
      const candidate = revealSong
      if (candidate) {
        try {
          const a = new Audio(candidate)
          a.volume = 0.9
          a.play().catch(()=> playSynth('romantic'))
        } catch (e) {
          playSynth('romantic')
        }
      } else {
        playSynth('romantic')
      }

      const t = setTimeout(() => {
        setShowHearts(false)
      }, 6500)
      return () => {
        clearTimeout(t)
        document.body.classList.remove('romance')
      }
    }
  }, [step])

  // simple synthesized melody (no copyrighted music)
  function playMelody() {
    try {
      const ac = new (window.AudioContext || (window as any).webkitAudioContext)()
      const now = ac.currentTime
      const notes = [440, 523.25, 659.25, 880] // A4, C5, E5, A5
      notes.forEach((freq, i) => {
        const o = ac.createOscillator()
        const g = ac.createGain()
        o.type = 'sine'
        o.frequency.value = freq
        g.gain.value = 0.0001
        o.connect(g)
        g.connect(ac.destination)
        const start = now + i * 0.25
        const end = start + 0.22
        g.gain.setValueAtTime(0.0001, start)
        g.gain.exponentialRampToValueAtTime(0.12, start + 0.02)
        g.gain.exponentialRampToValueAtTime(0.0001, end)
        o.start(start)
        o.stop(end + 0.02)
      })
    } catch (e) {
      // audio may be blocked - ignore
    }
  }
  
    // synthesized, royalty-free presets (no copyrighted music)
    function playSynth(preset = 'romantic') {
      try {
        const ac = new (window.AudioContext || (window as any).webkitAudioContext)()
        const now = ac.currentTime

        const playNotes = (notes: number[], type: OscillatorType, startOffset = 0, length = 0.36) => {
          notes.forEach((freq, i) => {
            const o = ac.createOscillator()
            const g = ac.createGain()
            o.type = type
            o.frequency.value = freq
            o.connect(g)
            g.connect(ac.destination)
            const start = now + startOffset + i * (length * 0.6)
            const end = start + length
            g.gain.setValueAtTime(0.0001, start)
            g.gain.exponentialRampToValueAtTime(0.12, start + 0.02)
            g.gain.exponentialRampToValueAtTime(0.0001, end)
            o.start(start)
            o.stop(end + 0.02)
          })
        }

        if (preset === 'romantic') {
          // arpeggiated progression (warm sine)
          playNotes([440, 523.25, 659.25, 880], 'sine', 0, 0.36)
          playNotes([392, 494, 622, 784], 'sine', 0.6, 0.36)
        } else if (preset === 'classical') {
          // simple classical-like motif (triangle)
          playNotes([330, 392, 440, 494], 'triangle', 0, 0.32)
          playNotes([262, 330, 392, 440], 'triangle', 0.5, 0.32)
        } else if (preset === 'lullaby') {
          // gentle plucked feel (sine)
          playNotes([262, 294, 330, 349], 'sine', 0, 0.4)
          playNotes([196, 220, 247, 262], 'sine', 0.7, 0.4)
        } else {
          // fallback short chime
          playNotes([523.25, 659.25], 'sine', 0, 0.24)
        }
      } catch (e) {
        // ignore audio errors
      }
    }

  return (
    <div>
      {! (step >= options.length) ? (
        <div>
          <div className="small">Choice {step+1} of {options.length}</div>
          <div style={{display:'flex',gap:12,marginTop:12}}>
            <button onClick={() => pick(options[step][0])} className="gameBtn">{options[step][0]}</button>
            <button onClick={() => pick(options[step][1])} className="gameBtn">{options[step][1]}</button>
          </div>
        </div>
      ) : (
        <div>
          <div style={{textAlign:'center'}}>
            <h3 style={{marginBottom:6}}>Surprise Ready</h3>
            <div className="small">You chose: <strong>{chosen.join(', ') || '—'}</strong></div>
          </div>

          <div style={{marginTop:12}} className="card">
            <div style={{fontWeight:700,marginBottom:8}}>Recommended Surprise</div>
            <div className="surpriseGrid">
              {suggestions.map((s) => (
                <div key={s.title} className="suggestionCard">
                  <div style={{fontSize:28}}>{s.icon}</div>
                  <div style={{fontWeight:700,marginTop:8}}>{s.title}</div>
                  <div className="small" style={{marginTop:6}}>{s.desc}</div>
                  <button className="gameBtn" style={{marginTop:10}}>Save idea</button>
                </div>
              ))}
            </div>
          </div>

          <div style={{marginTop:12}} className="card">
            <div style={{fontWeight:700,marginBottom:8}}>Reveal Song</div>
            {revealSong ? (
              <div>
                <div className="small">Using external song: <strong>{revealSong}</strong></div>
                <div style={{display:'flex',gap:8,marginTop:10,alignItems:'center'}}>
                  <button
                    className="gameBtn"
                    onClick={() => {
                      try { new Audio(revealSong).play().catch(()=>playSynth('romantic')) } catch(e){ playSynth('romantic') }
                    }}
                  >Preview external</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="small">No external song selected. Try a built-in royalty-free track:</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:10}}>
                  <button className="gameBtn" onClick={() => playSynth('romantic')}>Romantic</button>
                  <button className="gameBtn" onClick={() => playSynth('classical')}>Classical</button>
                  <button className="gameBtn" onClick={() => playSynth('lullaby')}>Lullaby</button>
                  <button className="gameBtn" onClick={() => playSynth('chime')}>Chime</button>
                </div>
              </div>
            )}
          </div>

          {/* hearts overlay */}
          {showHearts && (
            <div className="heartsOverlay" aria-hidden>
              {Array.from({length:18}).map((_,i)=> (
                <div key={i} className="floatingHeart">❤</div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="small" style={{marginTop:12}}>By: {from}</div>
    </div>
  )
}
