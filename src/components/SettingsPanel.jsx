import { useEffect, useState } from 'react'
import { SlidersHorizontal, LayoutGrid, Zap } from 'lucide-react'

export default function SettingsPanel({ onChange }) {
  const [compact, setCompact] = useState(false)
  const [bgStyle, setBgStyle] = useState('gradient')

  useEffect(() => {
    // load saved
    const saved = JSON.parse(localStorage.getItem('uiSettings') || '{}')
    if (typeof saved.compact === 'boolean') setCompact(saved.compact)
    if (saved.bgStyle) setBgStyle(saved.bgStyle)
  }, [])

  useEffect(() => {
    const next = { compact, bgStyle }
    localStorage.setItem('uiSettings', JSON.stringify(next))
    onChange?.(next)
  }, [compact, bgStyle, onChange])

  return (
    <section className={`bg-slate-800/50 border border-slate-700/70 rounded-2xl p-5`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white font-medium flex items-center gap-2"><SlidersHorizontal size={18} className="text-blue-300"/> Customize</h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <button
          onClick={() => setCompact((v) => !v)}
          className={`px-4 py-3 rounded-xl border transition text-left ${compact ? 'bg-blue-600/20 border-blue-500/40' : 'bg-slate-900/60 border-slate-700/70'} text-blue-100`}
        >
          <div className="flex items-center gap-2"><Zap size={16} className="text-blue-300"/> Compact mode</div>
          <div className="text-xs text-blue-200/70">Tighter spacing for dense layouts</div>
        </button>

        <div className={`px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/70 text-blue-100`}>
          <div className="text-sm mb-2 flex items-center gap-2"><LayoutGrid size={16} className="text-blue-300"/> Background</div>
          <div className="flex gap-2">
            {['gradient','mesh'].map((opt) => (
              <button
                key={opt}
                onClick={() => setBgStyle(opt)}
                className={`px-3 py-1.5 rounded-lg border text-xs ${bgStyle===opt ? 'bg-blue-600/20 border-blue-500/40' : 'bg-slate-800/80 border-slate-700/70'} `}
              >{opt}</button>
            ))}
          </div>
        </div>

        <div className="px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/70 text-blue-100">
          <div className="text-sm mb-2">Theme</div>
          <div className="flex gap-2">
            {['blue','emerald','rose','amber'].map((c) => (
              <span key={c} className={`w-6 h-6 rounded-full border border-slate-600 inline-block`} style={{ background: `var(--accent-${c})`}} title={c}></span>
            ))}
          </div>
          <div className="text-xs text-blue-200/70 mt-2">(Theme presets coming soon)</div>
        </div>
      </div>
    </section>
  )
}
