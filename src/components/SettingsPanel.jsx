import { useEffect, useState } from 'react'
import { SlidersHorizontal, LayoutGrid, Zap, Rows, Monitor, Image as ImageIcon, Maximize2 } from 'lucide-react'

export default function SettingsPanel({ onChange }) {
  const [compact, setCompact] = useState(false)
  const [bgStyle, setBgStyle] = useState('gradient')
  const [layout, setLayout] = useState('accordion') // 'accordion' | 'free'
  const [size, setSize] = useState('md') // 'sm' | 'md' | 'lg'

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('uiSettings') || '{}')
    if (typeof saved.compact === 'boolean') setCompact(saved.compact)
    if (saved.bgStyle) setBgStyle(saved.bgStyle)
    if (saved.layout) setLayout(saved.layout)
    if (saved.size) setSize(saved.size)
  }, [])

  useEffect(() => {
    const next = { compact, bgStyle, layout, size }
    localStorage.setItem('uiSettings', JSON.stringify(next))
    onChange?.(next)
  }, [compact, bgStyle, layout, size, onChange])

  const SizeButton = ({ val, label }) => (
    <button
      onClick={() => setSize(val)}
      className={`px-3 py-1.5 rounded-lg border text-xs ${size===val ? 'bg-blue-600/20 border-blue-500/40 text-blue-100' : 'bg-slate-800/80 border-slate-700/70 text-slate-200'}`}
    >{label}</button>
  )

  return (
    <section className={`bg-slate-800/50 border border-slate-700/70 rounded-2xl p-5`}
      aria-label="Customization settings">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white font-medium flex items-center gap-2"><SlidersHorizontal size={18} className="text-blue-300"/> Customize</h2>
      </div>

      <div className="grid sm:grid-cols-4 gap-3">
        <button
          onClick={() => setCompact((v) => !v)}
          className={`px-4 py-3 rounded-xl border transition text-left ${compact ? 'bg-blue-600/20 border-blue-500/40' : 'bg-slate-900/60 border-slate-700/70'} text-blue-100`}
          aria-pressed={compact}
        >
          <div className="flex items-center gap-2"><Zap size={16} className="text-blue-300"/> Compact mode</div>
          <div className="text-xs text-blue-200/70">Tighter spacing for dense layouts</div>
        </button>

        <div className={`px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/70 text-blue-100`}>
          <div className="text-sm mb-2 flex items-center gap-2"><LayoutGrid size={16} className="text-blue-300"/> Background</div>
          <div className="flex flex-wrap gap-2">
            {['gradient','mesh','aurora','photo1','photo2'].map((opt) => (
              <button
                key={opt}
                onClick={() => setBgStyle(opt)}
                className={`px-3 py-1.5 rounded-lg border text-xs capitalize ${bgStyle===opt ? 'bg-blue-600/20 border-blue-500/40' : 'bg-slate-800/80 border-slate-700/70'} `}
              >{opt}</button>
            ))}
          </div>
        </div>

        <div className={`px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/70 text-blue-100`}>
          <div className="text-sm mb-2 flex items-center gap-2"><Rows size={16} className="text-blue-300"/> Layout</div>
          <div className="flex gap-2">
            <button
              onClick={() => setLayout('accordion')}
              className={`px-3 py-1.5 rounded-lg border text-xs ${layout==='accordion' ? 'bg-blue-600/20 border-blue-500/40' : 'bg-slate-800/80 border-slate-700/70'}`}
            >One-screen (Accordion)</button>
            <button
              onClick={() => setLayout('free')}
              className={`px-3 py-1.5 rounded-lg border text-xs ${layout==='free' ? 'bg-blue-600/20 border-blue-500/40' : 'bg-slate-800/80 border-slate-700/70'}`}
            >Free scroll</button>
          </div>
        </div>

        <div className="px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/70 text-blue-100">
          <div className="text-sm mb-2 flex items-center gap-2"><Monitor size={16} className="text-blue-300"/> Widget size</div>
          <div className="flex gap-2">
            <SizeButton val="sm" label="Small" />
            <SizeButton val="md" label="Medium" />
            <SizeButton val="lg" label="Large" />
          </div>
          <div className="text-xs text-blue-200/70 mt-2">Controls overall card and text size</div>
        </div>

        <div className="px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/70 text-blue-100 sm:col-span-4">
          <div className="text-sm mb-2 flex items-center gap-2"><ImageIcon size={16} className="text-blue-300"/> Covers</div>
          <div className="flex flex-wrap gap-2">
            {['Minimal','Glass','Neon','Paper'].map((c) => (
              <span key={c} className={`px-3 py-1.5 rounded-lg border border-slate-700/70 bg-slate-800/60 text-xs text-slate-200`} title={c}>{c}</span>
            ))}
          </div>
          <div className="text-xs text-blue-200/70 mt-2">Visual presets for the overall look (more coming)</div>
        </div>
      </div>
    </section>
  )
}
