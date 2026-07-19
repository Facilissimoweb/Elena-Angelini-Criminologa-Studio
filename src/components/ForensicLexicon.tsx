import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  Tag, 
  Sparkles, 
  X, 
  Brain, 
  Award, 
  CheckCircle2, 
  HelpCircle, 
  Scale, 
  Fingerprint, 
  Binary, 
  Dna,
  RefreshCw,
  FileText
} from 'lucide-react';
import { Language } from '../types';

interface ForensicLexiconProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

interface LexiconTerm {
  id: string;
  category: 'criminology' | 'criminalistics' | 'biology' | 'document' | 'general';
  term: {
    it: string;
    en: string;
  };
  definition: {
    it: string;
    en: string;
  };
  useCase: {
    it: string;
    en: string;
  };
  icon: any;
}

const GLOSSARY_TERMS: LexiconTerm[] = [
  {
    id: 'criminalistics',
    category: 'criminalistics',
    term: {
      it: "Criminalistica",
      en: "Criminalistics"
    },
    definition: {
      it: "L'insieme delle discipline scientifiche e delle tecniche biologiche, chimiche, fisiche e tecnologiche applicate all'analisi della scena del crimine e dei reperti per l'accertamento del reato.",
      en: "The branch of forensic science concerned with the physical evidence of a crime, including its identification, collection, and analysis using biology, chemistry, and physics."
    },
    useCase: {
      it: "Rilievo di impronte digitali, tracce ematiche sul pavimento tramite reattivi chimici ed esame micro-balistico del proiettile.",
      en: "Recovering latent fingerprints, analyzing blood splatters with chemical reagents, and microscopic comparison of bullet casings."
    },
    icon: Fingerprint
  },
  {
    id: 'criminology',
    category: 'criminology',
    term: {
      it: "Criminologia",
      en: "Criminology"
    },
    definition: {
      it: "Studio scientifico del crimine, della condotta criminale, delle vittime e delle cause del comportamento deviatore sotto l'aspetto sociologico, psicologico e antropologico.",
      en: "The scientific study of crime, criminal behavior, victims, and the root sociological and psychological causes of deviant actions."
    },
    useCase: {
      it: "Analisi statistica delle recidive o profilazione psicologica di un autore di reati seriali per prevederne le mosse.",
      en: "Statistical analysis of recidivism rates or psychological profiling of serial offenders to understand behavioral triggers."
    },
    icon: Brain
  },
  {
    id: 'chain_of_custody',
    category: 'general',
    term: {
      it: "Catena di Custodia",
      en: "Chain of Custody"
    },
    definition: {
      it: "La documentazione cronologica e dettagliata che registra ogni singolo passaggio, trasferimento, custodia e analisi di un reperto fisico o digitale dall'atto del suo prelievo fino al dibattimento in aula.",
      en: "The chronological, detailed documentation tracking the transfer, custody, and analysis of physical or digital evidence from the moment of collection until courtroom presentation."
    },
    useCase: {
      it: "Se la firma su una busta di plastica con tampone DNA non ha la registrazione dei sigilli e dell'ora di consegna, la prova viene invalidata in sede di processo.",
      en: "If a DNA sample container lacks documented seal numbers or transit times, the evidence may be ruled inadmissible in court."
    },
    icon: Scale
  },
  {
    id: 'profiling',
    category: 'criminology',
    term: {
      it: "Criminal Profiling",
      en: "Criminal Profiling"
    },
    definition: {
      it: "Tecnica investigativa volta a identificare le caratteristiche socio-demografiche, personologiche, comportamentali e le abitudini del presunto autore di un crimine sulla base delle modalità esecutive del delitto (Modus Operandi) e degli indizi psicologici lasciati sulla scena.",
      en: "An investigative tool used to identify likely behavioral, personality, and demographic characteristics of an offender based on the choices made during the crime (Modus Operandi)."
    },
    useCase: {
      it: "Analizzare la disposizione geometrica degli oggetti spostati dall'assassino per determinare se il delitto sia disorganizzato o pianificato maniacalmente.",
      en: "Analyzing the positioning of displaced items on a crime scene to determine if the offender is disorganized or highly planning-oriented."
    },
    icon: Search
  },
  {
    id: 'graphology',
    category: 'document',
    term: {
      it: "Perizia Calligrafica / Grafologia Forense",
      en: "Forensic Handwriting / Document Examination"
    },
    definition: {
      it: "Analisi scientifico-comparativa volta a stabilire l'autenticità o l'apocrifia (falsità) di un testo scritto a mano, di un testamento o di una firma, valutando la pressione del tracciato, la fluidità, la velocità e i gesti fuggitivi inconsci.",
      en: "A scientific examination to determine the authenticity or forgery of handwritten texts, wills, or signatures by measuring stroke pressure, speed, fluidity, and subconscious graphical gestures."
    },
    useCase: {
      it: "Confronto tra una firma contestata su un contratto bancario riminese e dieci lettere manoscritte autografe del presunto firmatario.",
      en: "Comparing a contested signature on a commercial contract in Rimini with ten authentic handwritten documents of the alleged signer."
    },
    icon: FileText
  },
  {
    id: 'ballistics',
    category: 'criminalistics',
    term: {
      it: "Balistica Forense",
      en: "Forensic Ballistics"
    },
    definition: {
      it: "Disciplina che studia le armi da fuoco, le traiettorie dei proiettili, i residui dello sparo e i segni di percussione impressi sul bossolo per ricostruire la dinamica di un evento violento.",
      en: "The study of firearms, bullet trajectories, gunshot residues, and micro-striations left on casings to reconstruct physical weapon-related incidents."
    },
    useCase: {
      it: "Misurazione laser d'impatto sul parabrezza per determinare l'altezza e la distanza esatta del tiratore rispetto al bersaglio.",
      en: "Laser trajectory alignment on a car window to pinpoint the shooter's exact distance and angle of firing."
    },
    icon: TargetIcon
  },
  {
    id: 'dna_analysis',
    category: 'biology',
    term: {
      it: "Analisi del DNA (Profilo Genetico)",
      en: "DNA Profiling / Genotyping"
    },
    definition: {
      it: "La tipizzazione e comparazione di loci STR specifici estratti da reperti biologici (sangue, saliva, capelli) per attribuire una traccia biologica a un soggetto con una probabilità statistica di errore pressoché nulla.",
      en: "The extraction and comparison of specific STR loci from biological samples (blood, saliva, hair) to match a suspect to crime scene traces with near-absolute certainty."
    },
    useCase: {
      it: "Estrazione di cellule epiteliali di sfregamento dal colletto di una giacca abbandonata per confrontarle con il tampone buccale di un sospetto.",
      en: "Extracting touch epithelial cells from the collar of a discarded jacket to cross-reference them with a suspect's buccal swab."
    },
    icon: Dna
  },
  {
    id: 'luminol',
    category: 'biology',
    term: {
      it: "Luminol (Chemiluminescenza)",
      en: "Luminol Test"
    },
    definition: {
      it: "Composto chimico utilizzato per rilevare tracce latenti di sangue invisibili a occhio nudo, che reagisce con il ferro dell'emoglobina producendo una temporanea luminescenza bluastra in ambiente oscurato.",
      en: "A chemical formulation that glows with a blue chemiluminescence when reacting with iron in hemoglobin, used to reveal microscopic or washed-away bloodstains."
    },
    useCase: {
      it: "Rilevare tracce ematiche lavate sul sedile posteriore di un veicolo anche a distanza di mesi dall'evento traumatico.",
      en: "Revealing scrubbed blood traces on car seats months after a physical confrontation occurred."
    },
    icon: Sparkles
  },
  {
    id: 'digital_forensics',
    category: 'criminalistics',
    term: {
      it: "Informatica Forense (Digital Forensics)",
      en: "Digital Forensics"
    },
    definition: {
      it: "Branca della criminalistica che si occupa dell'estrazione, conservazione e analisi di prove digitali memorizzate su computer, smartphone, cloud e dispositivi di rete in modo conforme alle leggi.",
      en: "The preservation, identification, extraction, and documentation of computer evidence stored on digital devices, servers, or cellular networks."
    },
    useCase: {
      it: "Ripristino di messaggi chat cifrati cancellati e geolocalizzazione GPS dei ripetitori di cella telefonica per verificare un alibi.",
      en: "Recovering deleted encrypted chat history and cell tower triangulation data to verify a suspect's alibi."
    },
    icon: Binary
  },
  {
    id: 'psychological_autopsy',
    category: 'criminology',
    term: {
      it: "Autopsia Psicologica",
      en: "Psychological Autopsy"
    },
    definition: {
      it: "Metodologia d'indagine retrospettiva clinico-forense impiegata in casi di morte equivoca per ricostruire lo stato mentale del defunto, l'intenzionalità e la personalità prima del decesso (es. omicidio vs suicidio).",
      en: "A retrospective clinical-forensic procedure used in equivocal death cases to reconstruct the deceased's state of mind, intent, and personality before death."
    },
    useCase: {
      it: "Valutare lettere d'addio, diari, chat, cartelle cliniche ed effettuare interviste a familiari per smentire o confermare l'ipotesi di istigazione al suicidio.",
      en: "Reviewing journals, medical records, and interviewing relatives to clarify if a death was an induced suicide or staged."
    },
    icon: Brain
  }
];

function TargetIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

// Mini Quiz Data
const QUIZ_QUESTIONS = [
  {
    it: {
      question: "Quale documento garantisce l'ammissibilità in Tribunale di una prova biologica o informatica?",
      options: [
        "Un certificato medico generico",
        "La Catena di Custodia registrata",
        "Un verbale di sopralluogo non firmato",
        "L'opinione della stampa locale"
      ],
      correctIndex: 1,
      explanation: "La Catena di Custodia traccia ogni singolo passaggio del reperto, garantendo che non sia stato alterato o inquinato dall'inizio alla fine."
    },
    en: {
      question: "Which document guarantees the admissibility in Court of biological or digital evidence?",
      options: [
        "A generic medical certificate",
        "The documented Chain of Custody",
        "An unsigned scene report",
        "The local newspaper reports"
      ],
      correctIndex: 1,
      explanation: "The Chain of Custody tracks every transition, proving the item was never contaminated or tampered with prior to laboratory analysis."
    }
  },
  {
    it: {
      question: "La 'Criminalistica' e la 'Criminologia' indicano la stessa identica disciplina?",
      options: [
        "Sì, studiano entrambe i moventi e le cause mentali",
        "No, la criminalistica è l'applicazione delle scienze fisiche e biologiche alle prove, la criminologia ne studia i fattori sociali e antropologici",
        "Sì, sono sinonimi intercambiabili legalmente",
        "Dipende se il caso avviene a Rimini o fuori provincia"
      ],
      correctIndex: 1,
      explanation: "La Criminalistica analizza la fisica/chimica del reato (scena del crimine), mentre la Criminologia si occupa della mente dell'autore e delle cause sociali."
    },
    en: {
      question: "Are 'Criminalistics' and 'Criminology' exact synonyms?",
      options: [
        "Yes, they both study human motives and mental behaviors",
        "No, criminalistics is the application of physical sciences to evidence, while criminology studies social and psychological causes",
        "Yes, they are legally interchangeable terms",
        "It depends on whether the crime occurs in Rimini or not"
      ],
      correctIndex: 1,
      explanation: "Criminalistics focuses on objective evidence analysis (reagents, physics, biology), whereas Criminology studies the sociological causes of crimes."
    }
  },
  {
    it: {
      question: "Quale reattivo chimico emette luce blu fluorescente reagendo con il ferro contenuto nel sangue?",
      options: [
        "Il bicarbonato di sodio",
        "Il reagente Luminol",
        "Il gel di silice per impronte",
        "L'idrossido di ammonio"
      ],
      correctIndex: 1,
      explanation: "Il Luminol reagisce tramite chemiluminescenza con l'emoglobina del sangue, emettendo luce blu visibile al buio."
    },
    en: {
      question: "Which chemical glows with a blue fluorescence when reacting with the iron present in blood?",
      options: [
        "Sodium bicarbonate",
        "The Luminol reagent",
        "Silica fingerprint gel",
        "Ammonium hydroxide"
      ],
      correctIndex: 1,
      explanation: "Luminol reacts through chemiluminescence with the hemoglobin contained in blood traces, producing a blue glow in dark environments."
    }
  }
];

export default function ForensicLexicon({ lang, isOpen, onClose }: ForensicLexiconProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTermId, setExpandedTermId] = useState<string | null>(null);
  
  // Quiz states
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const isIt = lang === 'it';

  // Term of the Day (seeded by the day of the year)
  const termOfTheDay = useMemo(() => {
    const today = new Date();
    const dayIndex = (today.getDate() + today.getMonth()) % GLOSSARY_TERMS.length;
    return GLOSSARY_TERMS[dayIndex];
  }, []);

  // Filter Terms
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const termText = isIt ? item.term.it : item.term.en;
      const definitionText = isIt ? item.definition.it : item.definition.en;
      const matchesSearch = 
        termText.toLowerCase().includes(searchQuery.toLowerCase()) || 
        definitionText.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, isIt]);

  const categories = useMemo(() => [
    { id: 'all', label: isIt ? "Tutti i Termini" : "All Terms" },
    { id: 'criminology', label: isIt ? "Criminologia" : "Criminology" },
    { id: 'criminalistics', label: isIt ? "Criminalistica" : "Criminalistics" },
    { id: 'biology', label: isIt ? "Biologia & Chimica" : "Biology & Chemistry" },
    { id: 'document', label: isIt ? "Documenti & Firme" : "Wills & Papers" },
    { id: 'general', label: isIt ? "Protocolli Legali" : "Legal Protocols" }
  ], [isIt]);

  // Quiz helper
  const currentQuiz = QUIZ_QUESTIONS[quizIndex][isIt ? 'it' : 'en'];

  const handleAnswerClick = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    if (index === currentQuiz.correctIndex) {
      setScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9980] cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-4 md:inset-x-12 md:inset-y-8 lg:inset-x-24 xl:inset-x-32 bg-cold-950/95 border border-cyan-500/20 rounded-3xl z-[9985] shadow-2xl flex flex-col overflow-hidden text-slate-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-cyan-950/60 bg-cold-950/90 flex items-center justify-between relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-cold-500 to-cyan-400" />
              
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                  <BookOpen className="h-6 w-6 text-cyan-400 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-bold font-mono text-cyan-400 uppercase tracking-widest">
                    {isIt ? "Forensic Lexicon // Glossario Tecnico" : "Forensic Lexicon // Technical Glossary"}
                  </h2>
                  <p className="text-[10px] text-slate-400 uppercase font-mono tracking-wider mt-0.5">
                    {isIt ? "Enciclopedia interattiva delle scienze forensi" : "Interactive forensic & criminology reference"}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-900/60 rounded-xl text-slate-400 hover:text-slate-100 transition-all border border-transparent hover:border-cyan-500/10 cursor-pointer"
                title={isIt ? "Chiudi" : "Close"}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Split Content Area */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Panel: Search & Glossary Lists (Large scroll area) */}
              <div className="lg:col-span-8 flex flex-col border-r border-cyan-950/40 p-6 space-y-6 overflow-hidden">
                
                {/* Search & Category Filter bar */}
                <div className="space-y-4 shrink-0">
                  <div className="relative">
                    <Search className="h-5 w-5 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder={isIt ? "Cerca termini forensi o definizioni..." : "Search forensic terms or definitions..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950/90 border border-cyan-950 p-3.5 pl-11 rounded-xl text-sm text-slate-200 font-sans focus:outline-none focus:border-cyan-400/50 transition-all placeholder:text-slate-600"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Horizontal Categories Pills */}
                  <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 max-w-full">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`py-1.5 px-3 rounded-lg text-[10px] font-mono uppercase tracking-wider font-bold border transition-all cursor-pointer whitespace-nowrap ${
                          selectedCategory === cat.id
                            ? 'bg-cyan-500/15 border-cyan-400 text-cyan-400'
                            : 'bg-transparent border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Terms List */}
                <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
                  {filteredTerms.length > 0 ? (
                    filteredTerms.map((item) => {
                      const TermIcon = item.icon || Fingerprint;
                      const isExpanded = expandedTermId === item.id;
                      return (
                        <div
                          key={item.id}
                          className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                            isExpanded 
                              ? 'bg-cold-950/60 border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.05)]' 
                              : 'bg-cold-950/25 border-cyan-950/30 hover:border-cyan-950/80 hover:bg-cold-950/40'
                          }`}
                        >
                          {/* Heading Banner */}
                          <div
                            onClick={() => setExpandedTermId(isExpanded ? null : item.id)}
                            className="p-4 flex items-center justify-between cursor-pointer select-none"
                          >
                            <div className="flex items-center space-x-3.5">
                              <div className={`p-2 rounded-lg border transition-all ${
                                isExpanded ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' : 'bg-slate-950 border-cyan-950/40 text-slate-400'
                              }`}>
                                <TermIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <h3 className="text-xs md:text-sm font-bold tracking-wider uppercase font-mono text-slate-200">
                                  {isIt ? item.term.it : item.term.en}
                                </h3>
                                <span className="text-[8px] font-mono uppercase tracking-widest text-slate-500">
                                  {item.category.toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-cyan-400/80 uppercase">
                              {isExpanded ? (isIt ? "[-]" : "[-]") : (isIt ? "[+ INFO]" : "[+ INFO]")}
                            </span>
                          </div>

                          {/* Expandable Definition section */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden border-t border-cyan-950/40"
                              >
                                <div className="p-4 bg-slate-950/40 space-y-3.5">
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-mono text-cyan-500 uppercase tracking-widest font-bold block">
                                      {isIt ? "DEFINIZIONE SCIENTIFICA" : "SCIENTIFIC DEFINITION"}
                                    </span>
                                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                                      {isIt ? item.definition.it : item.definition.en}
                                    </p>
                                  </div>

                                  <div className="p-3 bg-cyan-950/10 border border-cyan-900/10 rounded-lg space-y-1">
                                    <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold block flex items-center space-x-1">
                                      <Tag className="h-2.5 w-2.5" />
                                      <span>{isIt ? "APPLICAZIONE FORENSE IN RIMINI" : "FORENSIC APPLICATION"}</span>
                                    </span>
                                    <p className="text-xs text-slate-400 italic font-sans leading-relaxed">
                                      {isIt ? item.useCase.it : item.useCase.en}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-12 text-center border border-dashed border-cyan-950/40 rounded-2xl">
                      <Search className="h-8 w-8 text-slate-600 mx-auto mb-3" />
                      <p className="text-xs text-slate-400 font-mono">
                        {isIt ? "Nessun termine corrisponde ai filtri impostati." : "No terms match selected query filters."}
                      </p>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Panel: Term of the Day & Quick Interactive Quiz */}
              <div className="lg:col-span-4 bg-slate-950/30 p-6 flex flex-col space-y-6 overflow-y-auto">
                
                {/* 1. Term of the Day */}
                <div className="bg-cold-950/60 border border-cyan-500/10 p-5 rounded-2xl space-y-3 relative overflow-hidden shrink-0">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl" />
                  
                  <div className="flex items-center space-x-2 text-cyan-400 font-mono text-[9px] uppercase tracking-widest font-bold">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                    <span>{isIt ? "TERMINE DEL GIORNO" : "TERM OF THE DAY"}</span>
                  </div>

                  <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-100">
                    {isIt ? termOfTheDay.term.it : termOfTheDay.term.en}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    {isIt ? termOfTheDay.definition.it : termOfTheDay.definition.en}
                  </p>
                </div>

                {/* 2. Self-Assessment Quiz */}
                <div className="bg-slate-950/80 border border-cyan-950 p-5 rounded-2xl flex-1 flex flex-col space-y-4">
                  <div className="flex items-center space-x-2 border-b border-cyan-950 pb-2.5 shrink-0">
                    <Brain className="h-4 w-4 text-cyan-400" />
                    <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-200">
                      {isIt ? "Forensic Self-Test" : "Forensic Self-Test"}
                    </h3>
                  </div>

                  {!quizFinished ? (
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between text-[9px] text-slate-500 font-mono uppercase tracking-wider">
                          <span>{isIt ? `Domanda ${quizIndex + 1} di ${QUIZ_QUESTIONS.length}` : `Question ${quizIndex + 1} of ${QUIZ_QUESTIONS.length}`}</span>
                          <span className="text-cyan-500">{isIt ? `Punteggio: ${score}` : `Score: ${score}`}</span>
                        </div>
                        <p className="text-xs text-slate-200 font-sans font-medium leading-relaxed">
                          {currentQuiz.question}
                        </p>
                      </div>

                      {/* Answers block */}
                      <div className="space-y-2 py-2">
                        {currentQuiz.options.map((option, idx) => {
                          let buttonStyle = "bg-cold-950/30 border-cyan-950/40 text-slate-300 hover:border-cyan-500/20";
                          if (showExplanation) {
                            if (idx === currentQuiz.correctIndex) {
                              buttonStyle = "bg-green-950/20 border-green-500/40 text-green-300";
                            } else if (idx === selectedAnswer) {
                              buttonStyle = "bg-red-950/20 border-red-500/40 text-red-300";
                            } else {
                              buttonStyle = "bg-cold-950/10 border-transparent text-slate-500";
                            }
                          }
                          return (
                            <button
                              key={idx}
                              onClick={() => handleAnswerClick(idx)}
                              disabled={showExplanation}
                              className={`w-full text-left p-3 text-xs rounded-xl border transition-all flex items-start space-x-2 cursor-pointer ${buttonStyle}`}
                            >
                              <span className="font-mono text-cyan-500 font-bold shrink-0">{String.fromCharCode(65 + idx)})</span>
                              <span className="font-sans leading-tight">{option}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation and Next button */}
                      {showExplanation && (
                        <div className="space-y-3.5 pt-2 border-t border-cyan-950 shrink-0">
                          <div className="p-3 bg-cyan-950/5 border border-cyan-900/15 rounded-lg flex items-start space-x-2">
                            <HelpCircle className="h-4.5 w-4.5 text-cyan-400 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                              {currentQuiz.explanation}
                            </p>
                          </div>
                          <button
                            onClick={handleNextQuiz}
                            className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                          >
                            {quizIndex < QUIZ_QUESTIONS.length - 1 ? (isIt ? "Domanda Successiva" : "Next Question") : (isIt ? "Vedi Risultato" : "View Final Score")}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4 text-center py-6 flex-1 flex flex-col justify-center items-center">
                      <div className="p-3 bg-cyan-500/15 border border-cyan-400/30 rounded-full inline-block">
                        <Award className="h-8 w-8 text-cyan-400" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-200">
                          {isIt ? "Test Completato!" : "Assessment Complete!"}
                        </h4>
                        <p className="text-xs text-slate-400 font-sans">
                          {isIt 
                            ? `Hai risposto correttamente a ${score} domande su ${QUIZ_QUESTIONS.length}.`
                            : `You answered ${score} out of ${QUIZ_QUESTIONS.length} questions correctly.`}
                        </p>
                      </div>

                      <div className="w-full bg-cyan-950/10 border border-cyan-900/20 p-3 rounded-lg text-[10px] text-slate-400 leading-relaxed font-sans">
                        {score === QUIZ_QUESTIONS.length 
                          ? (isIt ? "Eccezionale! Dimostri una conoscenza dei protocolli forensi degna di un perito accreditato." : "Splendid! You have advanced knowledge matching certified court-appointed experts.")
                          : (isIt ? "Buona base di partenza. Continua a esplorare il Lessico Forense per approfondire." : "Great baseline. Keep exploring the Lexicon tool to dive deeper into court criteria.")}
                      </div>

                      <button
                        onClick={handleResetQuiz}
                        className="flex items-center space-x-2 py-2 px-4 border border-cyan-950 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/20 text-[10px] uppercase font-mono tracking-wider rounded-lg transition-all cursor-pointer"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>{isIt ? "Riprova Test" : "Retake Test"}</span>
                      </button>
                    </div>
                  )}

                </div>

              </div>

            </div>

            {/* Actions Footer */}
            <div className="p-4 border-t border-cyan-950/60 bg-cold-950/90 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider hidden sm:inline">
                {isIt ? "Studi Criminologici Elena Angelini // Rimini" : "Elena Angelini Criminology Studies // Rimini"}
              </span>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-cold-500 hover:from-cyan-500 hover:to-cold-400 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all active:scale-[0.98] cursor-pointer"
              >
                {isIt ? "Chiudi Lexicon" : "Close Lexicon"}
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
