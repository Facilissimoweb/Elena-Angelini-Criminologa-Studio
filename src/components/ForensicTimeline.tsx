import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  ChevronRight, 
  ShieldCheck, 
  FileSearch, 
  Users, 
  Compass, 
  Award, 
  Database,
  Layers,
  Heart,
  Briefcase
} from 'lucide-react';
import { Language } from '../types';

interface ForensicTimelineProps {
  lang: Language;
}

interface TimelineItem {
  id: string;
  year: string;
  category: 'forensic' | 'professional' | 'social';
  title: {
    it: string;
    en: string;
  };
  shortDesc: {
    it: string;
    en: string;
  };
  longDesc: {
    it: string;
    en: string;
  };
  technicalFocus: {
    it: string;
    en: string;
  };
  deployedTeam: {
    it: string[];
    en: string[];
  };
  iconType: 'shield' | 'search' | 'award' | 'network' | 'briefcase';
}

const timelineData: TimelineItem[] = [
  {
    id: "m1",
    year: "2012",
    category: "professional",
    title: {
      it: "Laurea in Sociologia e Criminologia",
      en: "Degree in Sociology and Criminology"
    },
    shortDesc: {
      it: "Inizio del percorso accademico e professionale con focus sulla sociologia della devianza.",
      en: "Beginning of the academic and professional journey focused on the sociology of deviance."
    },
    longDesc: {
      it: "Elena Angelini completa la sua formazione accademica d'eccellenza, specializzandosi nell'analisi delle matrici sociali e psicologiche della criminalità. Questo percorso getta le fondamenta scientifiche per l'approccio integrato ed empirico applicato oggi dallo studio.",
      en: "Elena Angelini completes her elite academic training, specializing in the analysis of social and psychological matrices of crime. This path lays the scientific foundations for the integrated and empirical approach applied by the studio today."
    },
    technicalFocus: {
      it: "Analisi sociologica territoriale, criminologia clinica, vittimologia.",
      en: "Territorial sociological analysis, clinical criminology, victimology."
    },
    deployedTeam: {
      it: ["Elena Angelini (Criminologa)"],
      en: ["Elena Angelini (Criminologist)"]
    },
    iconType: "award"
  },
  {
    id: "m2",
    year: "2014",
    category: "professional",
    title: {
      it: "Fondazione dello Studio Criminalistica",
      en: "Founding of the Forensic Studio"
    },
    shortDesc: {
      it: "Apertura della sede a Rimini e avvio delle prime consulenze di parte per studi legali locali.",
      en: "Opening of the Rimini office and launch of the first party expert services for local law firms."
    },
    longDesc: {
      it: "Nasce lo Studio Criminalistica di Elena Angelini a Rimini. Lo studio si impone fin da subito come punto di riferimento neutrale e scientifico per la valutazione di fascicoli penali e civili, collaborando attivamente con avvocati e difensori d'ufficio.",
      en: "The Forensic Studio of Elena Angelini is established in Rimini. The office immediately stands out as a neutral, scientific reference point for analyzing criminal and civil court files, actively collaborating with defense lawyers."
    },
    technicalFocus: {
      it: "Studio preliminare degli atti, consulenze tecniche di parte (CTP), audit investigativo.",
      en: "Preliminary study of court documents, party expert witness reporting, investigative auditing."
    },
    deployedTeam: {
      it: ["Criminologa Senior", "Consulenti legali associati"],
      en: ["Senior Criminologist", "Associate legal consultants"]
    },
    iconType: "briefcase"
  },
  {
    id: "m3",
    year: "2015",
    category: "professional",
    title: {
      it: "Accreditamento Nazionale So.I.S. (L.4/2013)",
      en: "National So.I.S. Accreditation"
    },
    shortDesc: {
      it: "Iscrizione ufficiale come professionista con rilascio dell'attestato di qualità.",
      en: "Official professional registration with the release of the certificate of quality."
    },
    longDesc: {
      it: "Ottenimento dell'iscrizione presso la Società Italiana di Sociologia (So.I.S.) con il numero 2670. L'iscrizione è rilasciata in conformità con la Legge n. 4/2013, che disciplina le professioni non organizzate in ordini o collegi, a garanzia del rigore metodologico dello studio.",
      en: "Successfully registered with the Italian Sociological Society (So.I.S.) under number 2670. The registration conforms to Italian Law no. 4/2013, regulating non-chartered professional associations, ensuring strict methodological rigor."
    },
    technicalFocus: {
      it: "Standard etici di ricerca, sociologia forense applicata, protocollo L.4/2013.",
      en: "Ethical research standards, applied forensic sociology, L.4/2013 protocols."
    },
    deployedTeam: {
      it: ["Elena Angelini (Criminologa certificata)"],
      en: ["Elena Angelini (Certified Criminologist)"]
    },
    iconType: "award"
  },
  {
    id: "m4",
    year: "2017",
    category: "forensic",
    title: {
      it: "Introduzione del Metodo 'Task Force'",
      en: "Launch of the 'Task Force' Method"
    },
    shortDesc: {
      it: "Rivoluzionario approccio multidisciplinare per la gestione simultanea di prove complesse.",
      en: "Revolutionary multidisciplinary approach for simultaneous management of complex evidence."
    },
    longDesc: {
      it: "Lo Studio formalizza il metodo a Task Force: per ogni caso non si impiega un solo esperto generico, ma viene strutturato un pool su misura di specialisti (genetisti, medici legali, esperti della scena del crimine) che cooperano simultaneamente per scardinare le incongruenze dell'accusa.",
      en: "The Studio formalizes the Task Force method: instead of relying on a single generalist, a customized pool of specialists (geneticists, medical examiners, crime scene experts) is assembled to coordinate and challenge prosecution discrepancies."
    },
    technicalFocus: {
      it: "Integrazione multidisciplinare, coordinamento di consulenze specialistiche, cross-examination.",
      en: "Multidisciplinary integration, specialized consultation coordination, cross-examination prep."
    },
    deployedTeam: {
      it: ["Criminologa", "Medico Legale", "Esperto di Scena del Crimine", "Analista BPA"],
      en: ["Criminologist", "Medical Examiner", "Crime Scene Expert", "BPA Analyst"]
    },
    iconType: "search"
  },
  {
    id: "m5",
    year: "2019",
    category: "forensic",
    title: {
      it: "Revisione Caso di Rilevanza Nazionale",
      en: "National Relevance Case Audit"
    },
    shortDesc: {
      it: "Consulenza tecnica critica su reperti biologici e accertamenti tecnici non ripetibili.",
      en: "Critical technical consultation on biological evidence and non-repeatable forensic tests."
    },
    longDesc: {
      it: "La Task Force viene incaricata della difesa di un imputato in un complesso caso giudiziario. L'intervento si concentra sulla verifica e contestazione dei verbali di repertazione biologica e sull'analisi della catena di custodia del DNA, evidenziando criticità procedurali determinanti per la difesa.",
      en: "The Task Force is appointed by the defense of an accused in a complex judicial trial. The intervention focuses on verifying and contesting biological evidence recovery reports and DNA chain of custody, highlighting crucial procedural flaws."
    },
    technicalFocus: {
      it: "Catena di custodia del DNA, critica dei protocolli d'esame, modellazione 3D degli scenari.",
      en: "DNA chain of custody audit, critique of testing protocols, 3D scenario modeling."
    },
    deployedTeam: {
      it: ["Genetista Forense", "Esperto Balistico", "Psicologo Forense", "Criminologa"],
      en: ["Forensic Geneticist", "Ballistics Expert", "Forensic Psychologist", "Criminologist"]
    },
    iconType: "shield"
  },
  {
    id: "m6",
    year: "2021",
    category: "social",
    title: {
      it: "Iniziative di Autodifesa e Sostegno Sociale",
      en: "Self-Defense & Social Support Initiatives"
    },
    shortDesc: {
      it: "Inizio delle collaborazioni attive con associazioni transfemministe e sportelli antiviolenza.",
      en: "Beginning of active collaborations with transfeminist associations and anti-violence networks."
    },
    longDesc: {
      it: "Elena Angelini avvia collaborazioni costanti e pro-bono a sostegno delle donne e delle minoranze vulnerabili a Rimini, partecipando attivamente ai tavoli di coordinamento di Casa Madiba Network, Non Una Di Meno Rimini, Pride OFF e Smagliature Urbane APS.",
      en: "Elena Angelini initiates ongoing pro-bono partnerships supporting women and vulnerable minorities in Rimini, actively participating in coordination circles for local community support networks."
    },
    technicalFocus: {
      it: "Vittimologia di genere, prevenzione della violenza domestica, supporto psicodiagnostico di rete.",
      en: "Gender victimology, domestic violence prevention, network psychodiagnostic support."
    },
    deployedTeam: {
      it: ["Criminologa", "Psicologa e Psicodiagnosta", "Sociologa Specializzata"],
      en: ["Criminologist", "Psychologist & Diagnostician", "Specialized Sociologist"]
    },
    iconType: "network"
  },
  {
    id: "m7",
    year: "2023",
    category: "professional",
    title: {
      it: "Iscrizione e Accreditamento A.I.C.I.S.",
      en: "Official A.I.C.I.S. Certification"
    },
    shortDesc: {
      it: "Ottenimento della tessera n. 208 dell'Associazione Italiana Criminologia.",
      en: "Obtained membership n. 208 with the Italian Association of Criminology."
    },
    longDesc: {
      it: "Accreditamento formale presso l'A.I.C.I.S. (Associazione Italiana Criminologia per l'Investigazione e la Sicurezza), siglando un passo fondamentale nel riconoscimento delle competenze professionali in ambito investigativo e di sicurezza sul territorio nazionale.",
      en: "Formal accreditation by A.I.C.I.S. (Italian Association of Criminology for Investigation and Security), marking a key milestone in the validation of national-level investigative and security expertise."
    },
    technicalFocus: {
      it: "Tecniche investigative avanzate, sicurezza aziendale, criminologia investigativa.",
      en: "Advanced investigative techniques, corporate security, investigative criminology."
    },
    deployedTeam: {
      it: ["Elena Angelini (Socio Professionista A.I.C.I.S.)"],
      en: ["Elena Angelini (Professional Member A.I.C.I.S.)"]
    },
    iconType: "award"
  },
  {
    id: "m8",
    year: "2025",
    category: "forensic",
    title: {
      it: "Espansione del Network di Studi Associati",
      en: "Expansion of Associated Studio Network"
    },
    shortDesc: {
      it: "Consolidamento della rete di studi legali e tecnici a Rimini, La Spezia e Nord Italia.",
      en: "Consolidation of the network of legal and technical firms in Rimini, La Spezia, and Northern Italy."
    },
    longDesc: {
      it: "Lo Studio consolida la sua struttura federata di professionisti d'élite. Oltre alla sede principale di Rimini presso Arbor Vitae, si attivano canali diretti e collaborazioni costanti con i migliori studi legali penali, civilisti, medici legali e laboratori biologici certificati a livello interregionale.",
      en: "The Studio consolidates its federated structure of elite professionals. Alongside the main Rimini office, direct partnerships and constant support channels are activated with top-tier criminal, civil, and medical law firms across Northern Italy."
    },
    technicalFocus: {
      it: "Coordinamento di perizie complesse su base geografica differenziata, GIS forense.",
      en: "Coordination of complex forensic expert studies across multiple territories, Forensic GIS."
    },
    deployedTeam: {
      it: ["Elena Angelini", "Pool di Medici Legali", "Analisti Informatici Forensi", "Avvocati Penalisti"],
      en: ["Elena Angelini", "Medical Examiner Pool", "Forensic IT Analysts", "Criminal Defense Attorneys"]
    },
    iconType: "network"
  }
];

export default function ForensicTimeline({ lang }: ForensicTimelineProps) {
  const [selectedId, setSelectedId] = useState<string>("m5"); // Default to 2019 National Case
  const [filter, setFilter] = useState<'all' | 'forensic' | 'professional' | 'social'>('all');

  const filteredItems = timelineData.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const selectedItem = timelineData.find(item => item.id === selectedId) || timelineData[0];

  const categories = [
    { code: 'all', label: { it: "Tutti i Traguardi", en: "All Milestones" } },
    { code: 'forensic', label: { it: "Casi & Scienza", en: "Forensic Cases" } },
    { code: 'professional', label: { it: "Formazione & Titoli", en: "Accreditation" } },
    { code: 'social', label: { it: "Impatto Sociale", en: "Social Impact" } }
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'shield': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'search': return <FileSearch className="w-5 h-5 text-cyan-400" />;
      case 'award': return <Award className="w-5 h-5 text-amber-400" />;
      case 'network': return <Users className="w-5 h-5 text-purple-400" />;
      default: return <Briefcase className="w-5 h-5 text-blue-400" />;
    }
  };

  const labels = {
    it: {
      sectionTitle: "Evoluzione dello Studio & Traguardi",
      sectionSub: "Timeline interattiva delle tappe fondamentali della criminologa Elena Angelini",
      viewDossier: "VISUALIZZA FASCICOLO TECNICO",
      techFocusLabel: "Protocolli Scientifici & Focus Criminologico",
      teamLabel: "Pool di Specialisti Ingaggiato",
      categoryLabel: "Filtra per Tipo di Milestone",
      selectPrompt: "Seleziona un anno sulla linea temporale per aprire il dossier dettagliato.",
      yearLabel: "ANNO DI RIFERIMENTO",
      categoryShort: {
        forensic: "Caso Forense",
        professional: "Traguardo Professionale",
        social: "Impatto Sociale"
      }
    },
    en: {
      sectionTitle: "Studio Evolution & Milestones",
      sectionSub: "Interactive timeline of key milestones of Criminologist Elena Angelini",
      viewDossier: "VIEW TECHNICAL FORENSIC DOSSIER",
      techFocusLabel: "Scientific Protocols & Criminological Focus",
      teamLabel: "Assigned Task Force Specialists",
      categoryLabel: "Filter by Milestone Type",
      selectPrompt: "Select a year on the timeline to unlock the detailed forensic dossier.",
      yearLabel: "REFERENCE YEAR",
      categoryShort: {
        forensic: "Forensic Case",
        professional: "Professional Milestone",
        social: "Social Impact"
      }
    }
  };

  const activeLabels = labels[lang] || labels['it'];

  return (
    <section className="space-y-8 rounded-xl border border-slate-900/60 bg-slate-950/75 p-6 md:p-8 shadow-xl relative" id="interactive-forensic-timeline">
      <div className="absolute top-2.5 right-3 font-mono text-[8px] text-cyan-500/20">
        SECURE_DB_MODULE // TIMELINE_VISUALIZER // V2.0
      </div>

      {/* Header */}
      <div className="text-left space-y-2">
        <div className="flex items-center space-x-2 text-cold-400 text-xs font-mono uppercase tracking-widest">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span>STATION_LOG // PROFESSIONAL_JOURNEY</span>
        </div>
        <h3 className="text-xl md:text-3xl font-serif font-extrabold text-slate-100 uppercase tracking-wide">
          {activeLabels.sectionTitle}
        </h3>
        <p className="text-xs md:text-sm text-slate-400 font-mono">
          {activeLabels.sectionSub}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-900 pb-4">
        {categories.map((cat) => (
          <button
            key={cat.code}
            onClick={() => {
              setFilter(cat.code as any);
              // Auto-select first item in filtered list if current selection is filtered out
              const isStillAvailable = timelineData
                .filter(item => cat.code === 'all' || item.category === cat.code)
                .some(item => item.id === selectedId);
              if (!isStillAvailable) {
                const firstOfCat = timelineData.find(item => cat.code === 'all' || item.category === cat.code);
                if (firstOfCat) setSelectedId(firstOfCat.id);
              }
            }}
            className={`px-3 py-1.5 rounded text-[11px] font-mono transition-all uppercase border cursor-pointer ${
              filter === cat.code
                ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300 font-bold'
                : 'bg-slate-900/30 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200'
            }`}
          >
            {cat.label[lang] || cat.label['it']}
          </button>
        ))}
      </div>

      {/* Interactive Horizontal Timeline Belt */}
      <div className="relative py-8 px-4 bg-slate-900/10 rounded-lg border border-slate-900/60 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800">
        {/* Connection bar */}
        <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-900 -translate-y-1/2 pointer-events-none"></div>
        <div className="flex justify-between min-w-[640px] relative z-10 px-4">
          {filteredItems.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className="flex flex-col items-center group relative cursor-pointer focus:outline-none"
                style={{ width: '80px' }}
              >
                {/* Year Label */}
                <span className={`text-xs font-mono mb-3 transition-colors ${
                  isSelected ? 'text-cyan-400 font-bold text-sm' : 'text-slate-500 group-hover:text-slate-300'
                }`}>
                  {item.year}
                </span>

                {/* Nodes with custom styling */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isSelected 
                    ? 'bg-cyan-950 border-cyan-400 shadow-md shadow-cyan-500/20 scale-110 z-20' 
                    : 'bg-slate-950 border-slate-800 group-hover:border-slate-700 hover:scale-105 z-10'
                }`}>
                  {getIcon(item.iconType)}
                </div>

                {/* Brief Title Tooltip in horizontal belt */}
                <span className="text-[9px] font-mono uppercase tracking-tight text-center text-slate-500 group-hover:text-slate-400 mt-2 truncate w-full px-1">
                  {item.title[lang] || item.title['it']}
                </span>

                {/* Selected glowing ring accent */}
                {isSelected && (
                  <span className="absolute bottom-[-10px] w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Forensic Dossier File Details View with sliding animations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 border border-slate-900 rounded-lg overflow-hidden shadow-2xl relative">
        <div className="absolute top-2.5 right-3 font-mono text-[7px] text-slate-600">
          CASE_ID // {selectedItem.id.toUpperCase()}_{selectedItem.year}
        </div>

        {/* Tab Accent indicator representing folder */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-500 to-blue-600"></div>

        {/* Left column: Dossier File Title & Summary */}
        <div className="lg:col-span-7 p-6 md:p-8 space-y-6 text-left border-r border-slate-900/60 pl-8">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[9px] uppercase rounded">
                {activeLabels.yearLabel}: {selectedItem.year}
              </span>
              <span className={`px-2 py-0.5 font-mono text-[9px] uppercase rounded border ${
                selectedItem.category === 'forensic' 
                  ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-400' 
                  : selectedItem.category === 'professional' 
                  ? 'bg-amber-950/40 border-amber-800/40 text-amber-400' 
                  : 'bg-purple-950/40 border-purple-800/40 text-purple-400'
              }`}>
                {activeLabels.categoryShort[selectedItem.category]}
              </span>
            </div>

            <h4 className="text-lg md:text-2xl font-serif font-bold text-slate-100 tracking-tight">
              {selectedItem.title[lang] || selectedItem.title['it']}
            </h4>
          </div>

          <p className="text-xs font-mono text-cyan-400/90 leading-normal uppercase border-b border-slate-900 pb-4">
            // {selectedItem.shortDesc[lang] || selectedItem.shortDesc['it']}
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            {selectedItem.longDesc[lang] || selectedItem.longDesc['it']}
          </p>
        </div>

        {/* Right column: Methodology & Assigned Experts */}
        <div className="lg:col-span-5 p-6 md:p-8 bg-slate-950/40 space-y-6 text-left">
          
          {/* Scientific focus list */}
          <div className="space-y-3">
            <h5 className="font-mono text-[10px] text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400/80" />
              <span>{activeLabels.techFocusLabel}</span>
            </h5>
            <p className="text-xs text-slate-300 bg-slate-900/20 p-3 rounded border border-slate-900 font-mono leading-relaxed">
              {selectedItem.technicalFocus[lang] || selectedItem.technicalFocus['it']}
            </p>
          </div>

          {/* Assigned Specialists list */}
          <div className="space-y-3">
            <h5 className="font-mono text-[10px] text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-cyan-400/80" />
              <span>{activeLabels.teamLabel}</span>
            </h5>
            <div className="grid grid-cols-1 gap-2">
              {(selectedItem.deployedTeam[lang] || selectedItem.deployedTeam['it']).map((teamMember: string, index: number) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2 bg-slate-900/40 p-2 rounded border border-slate-900/60"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/70"></span>
                  <span className="text-xs font-mono text-slate-200">{teamMember}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Slogan banner */}
          <div className="pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-500/80 flex items-center justify-between">
            <span>DIGITAL_STATION_RECORD</span>
            <span>VERIFIED_FILE_CONFIDENTIAL</span>
          </div>
        </div>
      </div>

      {/* Help prompt */}
      <p className="text-[10px] text-slate-500 font-mono text-center">
        {activeLabels.selectPrompt}
      </p>
    </section>
  );
}
