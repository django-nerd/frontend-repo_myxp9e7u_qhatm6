import { useMemo } from 'react'
import { Map, MapPin, Link as LinkIcon } from 'lucide-react'

// Simple relationship map between contexts and notes
export default function MapOverview({ contexts = [], notes = [], currentContext }) {
  const nodes = useMemo(() => {
    const cx = (contexts || []).map(c => ({ id: c._id, type: 'context', label: c.name }))
    const ns = (notes || []).map(n => ({ id: n._id, type: 'note', label: n.title, context_id: n.context_id }))
    return [...cx, ...ns]
  }, [contexts, notes])

  const edges = useMemo(() => {
    return (notes || [])
      .filter(n => n.context_id)
      .map(n => ({ from: n.context_id, to: n._id }))
  }, [notes])

  return (
    <section className="bg-slate-800/50 border border-slate-700/70 rounded-2xl p-5">
      <h2 className="text-white font-medium mb-3 flex items-center gap-2"><Map size={18} className="text-blue-300"/> Overview Map</h2>
      <div className="relative overflow-hidden rounded-xl bg-slate-900/60 border border-slate-700/70 p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-blue-200/70 mb-1">Contexts</div>
            <div className="flex flex-wrap gap-2">
              {(contexts||[]).map(c => (
                <span key={c._id} className={`px-2 py-1 rounded-lg border text-xs ${currentContext?._id===c._id?'bg-blue-600/20 border-blue-500/40 text-blue-100':'bg-slate-800/80 border-slate-700/70 text-blue-200'}`}>{c.name}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-blue-200/70 mb-1">Notes</div>
            <div className="flex flex-wrap gap-2">
              {(notes||[]).slice(0,40).map(n => (
                <span key={n._id} className={`px-2 py-1 rounded-lg border text-xs ${currentContext && n.context_id===currentContext._id ? 'bg-blue-600/20 border-blue-500/40 text-blue-100' : 'bg-slate-800/80 border-slate-700/70 text-blue-200'}`}>{n.title}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 text-blue-200/70 flex items-center gap-2 text-xs"><LinkIcon size={14}/> Lines indicate context → note relationships (simplified)</div>
      </div>
    </section>
  )
}
