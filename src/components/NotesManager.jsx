import { useEffect, useState } from 'react'
import { Plus, Tags, FileText } from 'lucide-react'

export default function NotesManager({ t, apiBase, currentLang, context, onList }) {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchNotes = async () => {
    try {
      const url = new URL(`${apiBase}/api/notes`)
      if (context?._id) url.searchParams.set('context_id', context._id)
      if (currentLang) url.searchParams.set('language', currentLang)
      const res = await fetch(url.toString())
      const data = await res.json()
      const items = data.items || []
      setNotes(items)
      onList?.(items)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (context) fetchNotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context, currentLang])

  const create = async () => {
    if (!title.trim() || !content.trim()) return
    setLoading(true)
    try {
      await fetch(`${apiBase}/api/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          context_id: context?._id || null,
          language: currentLang,
          tags: tags.split(',').map((t) => t.trim()).filter(Boolean)
        })
      })
      setTitle('')
      setContent('')
      setTags('')
      fetchNotes()
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
          <FileText size={18} className="text-blue-300" /> {t('notes')}
        </h2>
        {context && (
          <div className="text-xs text-blue-200/70">{t('inContext')} {context.name}</div>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-4 mb-4">
        <input
          placeholder={t('noteTitle')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-700/70 text-blue-100"
        />
        <input
          placeholder={t('noteContent')}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-700/70 text-blue-100"
        />
        <div className="flex items-center gap-2">
          <div className="px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-700/70 text-blue-100 flex-1">
            <input
              placeholder={t('tagsPlaceholder')}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="bg-transparent outline-none w-full"
            />
          </div>
          <Tags size={18} className="text-blue-300" />
        </div>
        <button
          onClick={create}
          disabled={loading}
          className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition text-white flex items-center justify-center gap-2"
        >
          <Plus size={16} /> {t('addNote')}
        </button>
      </div>

      <div className="grid gap-2">
        {notes.map((n) => (
          <div key={n._id} className="px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/70">
            <div className="flex items-center justify-between">
              <div className="text-white font-medium">{n.title}</div>
              {n.tags?.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {n.tags.map((t, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-200">{t}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="text-blue-200/80 mt-1">{n.content}</div>
          </div>
        ))}
        {notes.length === 0 && (
          <div className="text-sm text-blue-200/70">{t('noNotes')}</div>
        )}
      </div>
    </section>
  )
}
