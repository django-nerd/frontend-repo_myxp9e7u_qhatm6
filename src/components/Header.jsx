import { useMemo } from 'react'
import { BookOpen, NotebookPen, Sparkles } from 'lucide-react'

export default function Header({ t, currentLang, onChangeLang, languages }) {
  const langOptions = useMemo(() => languages || [], [languages])

  return (
    <header className="relative z-10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300">
            <BookOpen size={22} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight flex items-center gap-2">
              <span>StudyFlow</span>
              <Sparkles size={18} className="text-blue-300" />
            </h1>
            <p className="text-xs sm:text-sm text-blue-200/70">{t('tagline')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/70">
            <NotebookPen size={16} className="text-blue-300" />
            <span className="text-xs text-blue-200/80">{t('language')}</span>
          </div>
          <select
            value={currentLang}
            onChange={(e) => onChangeLang(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/70 text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {langOptions.map((l) => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  )
}
