import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ContextManager from './components/ContextManager'
import NotesManager from './components/NotesManager'
import LearningModes from './components/LearningModes'
import SettingsPanel from './components/SettingsPanel'
import MapOverview from './components/MapOverview'

const strings = {
  en: {
    tagline: 'Organize notes by topic and learn in multiple ways',
    language: 'Language',
    contexts: 'Contexts',
    showingFor: 'Showing',
    contextName: 'Context name',
    contextDesc: 'Short description',
    addContext: 'Add context',
    noContexts: 'No contexts yet — create one to get started',
    notes: 'Notes',
    inContext: 'in',
    noteTitle: 'Title / Question',
    noteContent: 'Content / Answer',
    tagsPlaceholder: 'tags, comma, separated',
    addNote: 'Add note',
    noNotes: 'No notes found for this context',
    learningModes: 'Learning Modes',
    // 10 modes
    modeFlashcards: 'Flashcards',
    modeFlashcardsDesc: 'Practice active recall with Q&A cards',
    modeQuiz: 'Quiz',
    modeQuizDesc: 'Multiple-choice quizzes from your notes',
    modeRandom: 'Random',
    modeRandomDesc: 'Shuffle notes for varied practice',
    modeTyping: 'Typing',
    modeTypingDesc: 'Type the answer to reinforce recall',
    modeCloze: 'Cloze',
    modeClozeDesc: 'Fill in the blanks within your notes',
    modeMatching: 'Matching',
    modeMatchingDesc: 'Match questions with the right answers',
    modeTrueFalse: 'True / False',
    modeTrueFalseDesc: 'Quick checks with true/false prompts',
    modeSpaced: 'Spaced Repetition',
    modeSpacedDesc: 'Schedule reviews for long-term memory',
    modeExam: 'Exam',
    modeExamDesc: 'Timed mixed-mode test',
    modeRevision: 'Revision',
    modeRevisionDesc: 'Guided review through all notes'
  },
  de: {
    tagline: 'Notizen nach Themen ordnen und auf viele Arten lernen',
    language: 'Sprache',
    contexts: 'Kontexte',
    showingFor: 'Anzeige für',
    contextName: 'Kontextname',
    contextDesc: 'Kurze Beschreibung',
    addContext: 'Kontext hinzufügen',
    noContexts: 'Noch keine Kontexte — lege einen an, um zu starten',
    notes: 'Notizen',
    inContext: 'in',
    noteTitle: 'Titel / Frage',
    noteContent: 'Inhalt / Antwort',
    tagsPlaceholder: 'tags, komma, getrennt',
    addNote: 'Notiz hinzufügen',
    noNotes: 'Keine Notizen für diesen Kontext',
    learningModes: 'Lernmodi',
    modeFlashcards: 'Karteikarten',
    modeFlashcardsDesc: 'Aktives Erinnern mit Frage-Antwort-Karten',
    modeQuiz: 'Quiz',
    modeQuizDesc: 'Multiple-Choice-Quiz aus deinen Notizen',
    modeRandom: 'Zufällig',
    modeRandomDesc: 'Mische Notizen für Abwechslung',
    modeTyping: 'Tippen',
    modeTypingDesc: 'Antwort eintippen zur Festigung',
    modeCloze: 'Lückentext',
    modeClozeDesc: 'Fülle die Lücken in deinen Notizen',
    modeMatching: 'Zuordnen',
    modeMatchingDesc: 'Fragen den richtigen Antworten zuordnen',
    modeTrueFalse: 'Richtig / Falsch',
    modeTrueFalseDesc: 'Schnelle Checks mit R/F-Fragen',
    modeSpaced: 'Spaced Repetition',
    modeSpacedDesc: 'Wiederholungen zeitlich planen',
    modeExam: 'Prüfung',
    modeExamDesc: 'Zeitbegrenzter Mix-Test',
    modeRevision: 'Wiederholung',
    modeRevisionDesc: 'Geführte Übersicht über alle Notizen'
  },
  es: {
    tagline: 'Organiza notas por tema y aprende de varias maneras',
    language: 'Idioma',
    contexts: 'Contextos',
    showingFor: 'Mostrando',
    contextName: 'Nombre del contexto',
    contextDesc: 'Descripción corta',
    addContext: 'Agregar contexto',
    noContexts: 'Sin contextos — crea uno para empezar',
    notes: 'Notas',
    inContext: 'en',
    noteTitle: 'Título / Pregunta',
    noteContent: 'Contenido / Respuesta',
    tagsPlaceholder: 'etiquetas, separadas, por comas',
    addNote: 'Agregar nota',
    noNotes: 'No hay notas para este contexto',
    learningModes: 'Modos de aprendizaje',
    modeFlashcards: 'Tarjetas',
    modeFlashcardsDesc: 'Repasa con tarjetas de preguntas y respuestas',
    modeQuiz: 'Cuestionario',
    modeQuizDesc: 'Preguntas de opción múltiple de tus notas',
    modeRandom: 'Aleatorio',
    modeRandomDesc: 'Baraja notas para variedad',
    modeTyping: 'Escritura',
    modeTypingDesc: 'Escribe la respuesta para reforzar',
    modeCloze: 'Huecos',
    modeClozeDesc: 'Rellena los huecos en tus notas',
    modeMatching: 'Emparejar',
    modeMatchingDesc: 'Empareja preguntas con respuestas',
    modeTrueFalse: 'Verdadero / Falso',
    modeTrueFalseDesc: 'Comprobaciones rápidas V/F',
    modeSpaced: 'Repetición espaciada',
    modeSpacedDesc: 'Programa repasos a tiempo',
    modeExam: 'Examen',
    modeExamDesc: 'Prueba cronometrada mixta',
    modeRevision: 'Repaso',
    modeRevisionDesc: 'Revisión guiada de todas las notas'
  },
  fr: {
    tagline: 'Organisez vos notes par sujet et apprenez de plusieurs façons',
    language: 'Langue',
    contexts: 'Contextes',
    showingFor: 'Affichage',
    contextName: 'Nom du contexte',
    contextDesc: 'Brève description',
    addContext: 'Ajouter un contexte',
    noContexts: 'Aucun contexte — créez-en un pour commencer',
    notes: 'Notes',
    inContext: 'dans',
    noteTitle: 'Titre / Question',
    noteContent: 'Contenu / Réponse',
    tagsPlaceholder: 'étiquettes, séparées, par des virgules',
    addNote: 'Ajouter une note',
    noNotes: 'Aucune note pour ce contexte',
    learningModes: 'Modes d’apprentissage',
    modeFlashcards: 'Cartes mémoire',
    modeFlashcardsDesc: 'Répétition active avec des cartes Q-R',
    modeQuiz: 'Quiz',
    modeQuizDesc: 'QCM à partir de vos notes',
    modeRandom: 'Aléatoire',
    modeRandomDesc: 'Mélangez les notes pour varier',
    modeTyping: 'Saisie',
    modeTypingDesc: 'Saisissez la réponse pour l’ancrer',
    modeCloze: 'Texte à trous',
    modeClozeDesc: 'Complétez les mots manquants',
    modeMatching: 'Association',
    modeMatchingDesc: 'Associez questions et réponses',
    modeTrueFalse: 'Vrai / Faux',
    modeTrueFalseDesc: 'Vérifications rapides V/F',
    modeSpaced: 'Répétition espacée',
    modeSpacedDesc: 'Planifiez des révisions',
    modeExam: 'Examen',
    modeExamDesc: 'Test chronométré mixte',
    modeRevision: 'Révision',
    modeRevisionDesc: 'Revue guidée de toutes les notes'
  }
}

function useI18n() {
  const [lang, setLang] = useState('en')
  const t = (key) => strings[lang]?.[key] || strings.en[key] || key
  return { lang, setLang, t }
}

function App() {
  const apiBase = import.meta.env.VITE_BACKEND_URL || ''
  const { lang, setLang, t } = useI18n()
  const [languages, setLanguages] = useState([])
  const [selectedContext, setSelectedContext] = useState(null)
  const [contexts, setContexts] = useState([])
  const [notes, setNotes] = useState([])
  const [ui, setUi] = useState({ compact: false, bgStyle: 'gradient' })

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('uiSettings') || '{}')
    setUi({ compact: !!saved.compact, bgStyle: saved.bgStyle || 'gradient' })
  }, [])

  useEffect(() => {
    const loadLangs = async () => {
      try {
        const res = await fetch(`${apiBase}/api/languages`)
        const data = await res.json()
        setLanguages(data.languages || [])
      } catch (e) {
        setLanguages([
          { code: 'en', name: 'English' },
          { code: 'de', name: 'Deutsch' },
          { code: 'es', name: 'Español' },
          { code: 'fr', name: 'Français' },
        ])
      }
    }
    loadLangs()
  }, [apiBase])

  const onChangeLang = (l) => {
    setSelectedContext(null)
    setLang(l)
  }

  const bg = ui.bgStyle === 'mesh'
    ? (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(20rem 20rem at 20% 10%, rgba(59,130,246,.35), transparent), radial-gradient(18rem 18rem at 80% 30%, rgba(16,185,129,.25), transparent), radial-gradient(14rem 14rem at 60% 80%, rgba(244,63,94,.25), transparent)'
        }} />
      </div>
    ) : (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.12),transparent_60%)]" />
      </div>
    )

  return (
    <div className="min-h-screen relative">
      {bg}
      <div className={`relative max-w-6xl mx-auto px-4 sm:px-6 ${ui.compact ? 'py-5 space-y-4' : 'py-8 space-y-6'}`}>
        <Header t={t} currentLang={lang} onChangeLang={onChangeLang} languages={languages} />

        <SettingsPanel onChange={(s) => setUi(s)} />

        <div className={`grid lg:grid-cols-2 gap-6`}>
          <ContextManager
            t={t}
            apiBase={apiBase}
            currentLang={lang}
            onSelect={setSelectedContext}
            onList={(items) => setContexts(items)}
          />
          <NotesManager
            t={t}
            apiBase={apiBase}
            currentLang={lang}
            context={selectedContext}
            onList={(items) => setNotes(items)}
          />
        </div>

        <MapOverview contexts={contexts} notes={notes} currentContext={selectedContext} />

        <LearningModes t={t} />
      </div>
    </div>
  )
}

export default App
