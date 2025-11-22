import { useMemo } from 'react'
import { Brain, Shuffle, HelpCircle } from 'lucide-react'

export default function LearningModes({ t }) {
  const modes = useMemo(() => ([
    { key: 'flashcards', icon: <Brain size={18} />, title: t('modeFlashcards'), desc: t('modeFlashcardsDesc') },
    { key: 'quiz', icon: <HelpCircle size={18} />, title: t('modeQuiz'), desc: t('modeQuizDesc') },
    { key: 'random', icon: <Shuffle size={18} />, title: t('modeRandom'), desc: t('modeRandomDesc') },
  ]), [t])

  return (
    <section className="bg-slate-800/50 border border-slate-700/70 rounded-2xl p-5">
      <h2 className="text-white font-medium mb-4 flex items-center gap-2">
        <Brain size={18} className="text-blue-300" /> {t('learningModes')}
      </h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {modes.map((m) => (
          <div key={m.key} className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/70 hover:border-blue-500/40 hover:bg-slate-900/80 transition">
            <div className="flex items-center gap-2 text-blue-300 mb-1">{m.icon}<span className="text-white font-medium">{m.title}</span></div>
            <div className="text-blue-200/80 text-sm">{m.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
