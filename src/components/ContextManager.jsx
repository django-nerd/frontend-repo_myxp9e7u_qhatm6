import { useEffect, useState } from 'react'
import { FolderPlus, FolderOpen, Globe2 } from 'lucide-react'

export default function ContextManager({ t, apiBase, currentLang, onSelect, onList }) {
  const [contexts, setContexts] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchContexts = async () => {
    try {
      const res = await fetch(`${apiBase}/api/contexts?language=${currentLang}`)
      const data = await res.json()
      const items = data.items || []
      setContexts(items)
      onList?.(items)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchContexts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLang])

  const create = async () => {
    if (!name.trim()) return
    setLoading(true)
    try {
      await fetch(`${apiBase}/api/contexts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, language: currentLang })
      })
      setName('')
      setDescription('')
      fetchContexts()
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-slate-800/50 border border-slate-700/70 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-medium flex items-center gap-2">
          <FolderOpen size={18} className="text-blue-300" /> {t('contexts')}
        </h2>
        <div className="text-xs text-blue-200/70 flex items-center gap-1">
          <Globe2 size={14} /> {t('showingFor')} {currentLang.toUpperCase()}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <input
          placeholder={t('contextName')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-700/70 text-blue-100"
        />
        <input
          placeholder={t('contextDesc')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-700/70 text-blue-100"
        />
        <button
          onClick={create}
          disabled={loading}
          className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition text-white flex items-center justify-center gap-2"
        >
          <FolderPlus size={16} /> {t('addContext')}
        </button>
      </div>

      <div className="grid gap-2">
        {contexts.map((c) => (
          <button
            key={c._id}
            onClick={() => onSelect(c)}
            className="w-full text-left px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/70 hover:border-blue-500/40 hover:bg-slate-900/80 transition"
          >
            <div className="text-white font-medium">{c.name}</div>
            {c.description && (
              <div className="text-sm text-blue-200/70">{c.description}</div>
            )}
          </button>
        ))}
        {contexts.length === 0 && (
          <div className="text-sm text-blue-200/70">{t('noContexts')}</div>
        )}
      </div>
    </section>
  )
}
