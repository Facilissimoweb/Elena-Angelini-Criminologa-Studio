import { useState } from 'react';
import { 
  Search as SearchIcon, 
  AlertTriangle, 
  Briefcase, 
  Map, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Database,
  X,
  FileCheck2,
  BookmarkCheck,
  CheckCircle2
} from 'lucide-react';
import { Language, servicesData, translations } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesProps {
  lang: Language;
  onNavigateToContact: () => void;
}

const iconMap = {
  Search: SearchIcon,
  AlertTriangle: AlertTriangle,
  Briefcase: Briefcase,
  Map: Map,
};

const serviceImages: Record<string, string> = {
  s1: 'https://images.unsplash.com/photo-1453728219085-87f2c1f8d1b8?auto=format&fit=crop&q=80&w=600', // magnifying lens profiling
  s2: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=600', // lab microscope suspicion
  s3: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600', // mobbing/office dispute
  s4: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600', // geographic mapping gis
};

interface MethodologyItem {
  id: string;
  code: string;
  name: { it: string; en: string };
  category: { it: string; en: string };
  protocol: string;
  desc: { it: string; en: string };
  status: 'active' | 'certified' | 'standard';
  tags: string[];
}

const methodologiesData: MethodologyItem[] = [
  {
    id: "m_dna",
    code: "MET_DNA_01",
    name: {
      it: "Analisi della Catena di Custodia e DNA Forense",
      en: "DNA Forensic & Chain of Custody Audit"
    },
    category: { it: "Criminalistica Biologica", en: "Biological Criminalistics" },
    protocol: "ISO/IEC 17025 // L. 4/2013",
    desc: {
      it: "Analisi critica della repertazione, della conservazione dei campioni biologici e della tracciabilità genetica per escludere contaminazioni o violazioni procedurali della pubblica accusa.",
      en: "Critical audit of evidence recovery, preservation of biological samples, and genetic traceability to exclude contamination or prosecution procedural violations."
    },
    status: "certified",
    tags: ["DNA", "Genetica", "Biologia", "Catena di custodia", "Reperti", "Biology", "Genetics"]
  },
  {
    id: "m_bal",
    code: "MET_BAL_02",
    name: {
      it: "Ricostruzione Balistica 3D (FORA 3D)",
      en: "3D Ballistic Reconstruction (FORA 3D)"
    },
    category: { it: "Balistica Forense", en: "Forensic Ballistics" },
    protocol: "FORA OpenEngine v2.5 // Trigonometria Spaziale",
    desc: {
      it: "Ricalcolo delle traiettorie di sparo, della distanza di tiro e degli angoli di impatto mediante modellazione vettoriale tridimensionale interattiva dei fori d'entrata e d'uscita.",
      en: "Recalculation of bullet trajectories, firing range, and angles of impact using interactive 3D vector modeling of entrance and exit holes."
    },
    status: "active",
    tags: ["Balistica", "3D", "FORA", "Traiettoria", "Armi", "Sparo", "Weapons", "Trajectories"]
  },
  {
    id: "m_autops",
    code: "MET_AUT_03",
    name: {
      it: "Autopsia Psicologica (Metodo Clinico)",
      en: "Psychological Autopsy (Clinical Method)"
    },
    category: { it: "Criminologia Clinica", en: "Clinical Criminology" },
    protocol: "NAS-Autopsy Protocol // Shneidman Guide",
    desc: {
      it: "Metodologia investigativa retrospettiva volta a determinare lo stato mentale e l'intenzionalità di una persona deceduta in caso di morti equivoche, differenziando suicidio, incidente o omicidio.",
      en: "Retrospective investigative methodology designed to determine the mental state and intentionality of a deceased person in equivocal deaths, clarifying suicide vs accident vs homicide."
    },
    status: "certified",
    tags: ["Autopsia Psicologica", "Suicidio", "Morte", "Profilo", "Vittimologia", "Casi Freddi", "Cold Case"]
  },
  {
    id: "m_bpa",
    code: "MET_BPA_04",
    name: {
      it: "Analisi delle Macchie di Sangue (BPA)",
      en: "Bloodstain Pattern Analysis (BPA)"
    },
    category: { it: "Scena del Crimine", en: "Crime Scene Science" },
    protocol: "IABPA Standard Guidelines // Meccanica dei Fluidi",
    desc: {
      it: "Studio della morfologia, dimensione e distribuzione delle macchie ematiche sulla scena del crimine per determinare l'origine geografica del trauma, i movimenti e la sequenza degli eventi.",
      en: "Study of the morphology, size, and distribution of bloodstains at the crime scene to determine the physical origin of trauma, motion, and sequence of physical events."
    },
    status: "active",
    tags: ["Sangue", "BPA", "Scena del crimine", "Fluidi", "Trauma", "Bloodstain"]
  },
  {
    id: "m_mob",
    code: "MET_MOB_05",
    name: {
      it: "Valutazione Criminologica di Mobbing e Straining",
      en: "Criminological Assessment of Mobbing & Straining"
    },
    category: { it: "Diritto del Lavoro", en: "Labor & Corporate Law" },
    protocol: "Leymann Inventory (LIPT) // Metodo Ege",
    desc: {
      it: "Analisi oggettiva della causalità criminologica tra dinamiche lavorative vessatorie e danno biologico o psichico sofferto dal lavoratore, per la produzione di perizie legali inoppugnabili.",
      en: "Objective analysis of criminological causality between hostile workplace dynamics and biological/psychological damage suffered by employees, creating airtight legal reports."
    },
    status: "certified",
    tags: ["Mobbing", "Straining", "Lavoro", "Bossing", "Danno biologico", "Aziendale", "Corporate"]
  },
  {
    id: "m_gis",
    code: "MET_GIS_06",
    name: {
      it: "Geographic Profiling e GIS Forense",
      en: "Geographic Profiling & Forensic GIS"
    },
    category: { it: "Criminologia Geografica", en: "Geographic Criminology" },
    protocol: "QGIS CrimeAnalyst // Modello Rossmo",
    desc: {
      it: "Mappatura satellitare e spaziale computerizzata degli indici di criminalità e degli spostamenti per localizzare l'area di ancoraggio e di operatività di delinquenti seriali.",
      en: "Satellite and computerized spatial mapping of crime rates and movements to localize the anchor point and activity area of serial offenders."
    },
    status: "active",
    tags: ["GIS", "Geografico", "Territorio", "Mappa", "Spaziale", "Rossmo", "Predictive", "Map"]
  },
  {
    id: "m_cctv",
    code: "MET_CTV_07",
    name: {
      it: "Analisi Digitale e Autenticazione DVR/CCTV",
      en: "Digital Video & DVR/CCTV Forensic Analysis"
    },
    category: { it: "Digital Forensics", en: "Digital Forensics" },
    protocol: "ISO/IEC 27037 // Digital Chain of Custody",
    desc: {
      it: "Recupero, estrazione e miglioramento qualitativo di fotogrammi video da sistemi di sorveglianza pubblica e privata, comprensivo di certificazione hash anti-manomissione.",
      en: "Recovery, extraction, and quality enhancement of video frames from public and private surveillance systems, including anti-tampering cryptographic hash certification."
    },
    status: "certified",
    tags: ["CCTV", "DVR", "Digitale", "Video", "Hash", "ISO 27037", "Computer", "Security"]
  },
  {
    id: "m_cog",
    code: "MET_COG_08",
    name: {
      it: "Intervista Cognitiva Forense e Valutazione Testimonianze",
      en: "Forensic Cognitive Interview & Witness Assessment"
    },
    category: { it: "Criminologia e Psicologia", en: "Criminology & Psychology" },
    protocol: "Enhanced Cognitive Interview Protocol (ECI)",
    desc: {
      it: "Metodologia di ascolto e intervista strutturata per minimizzare le confabulazioni e massimizzare il recupero dei dettagli mnestici accurati senza indurre false memorie.",
      en: "Structured interviewing and listening methodology to minimize confabulation and maximize accuracy in memory retrieval without inducing false memories."
    },
    status: "active",
    tags: ["Intervista", "Testimonianza", "Memoria", "Cognitiva", "Psicologia", "Attendibilità", "Witness", "Interview"]
  }
];

export default function Services({ lang, onNavigateToContact }: ServicesProps) {
  const t = translations[lang];
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [expandedMethodologyId, setExpandedMethodologyId] = useState<string | null>(null);

  const isIt = lang === 'it' || !lang;

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleMethodologyExpand = (id: string) => {
    setExpandedMethodologyId(expandedMethodologyId === id ? null : id);
  };

  // Extra detailed text to display when a service card is clicked/expanded to enrich content
  const extraDetails: Record<string, { it: string[]; en: string[] }> = {
    s1: {
      it: [
        "Analisi della scena del crimine e dei fascicoli processuali.",
        "Ricostruzioni tridimensionali delle dinamiche omicidiarie (FORA 3D).",
        "Redazione di perizie e consulenze tecniche di parte (CTP).",
        "Supporto criminologico integrato per avvocati penalisti in sede dibattimentale."
      ],
      en: [
        "Crime scene investigation & case file analysis.",
        "High-fidelity 3D homicide dynamic modeling (FORA 3D).",
        "Technical forensic reports and expert witness advisory.",
        "Integrated criminological support for criminal defense attorneys."
      ]
    },
    s2: {
      it: [
        "Autopsia Psicologica: studio approfondito dello stato mentale della persona prima della scomparsa.",
        "Analisi vittimologica e interviste cognitive a parenti e testimoni.",
        "Incrocio dei reperti medico-legali e tossicologici con la ricostruzione d'ambiente.",
        "Valutazioni per la riapertura di casi archiviati come suicidi o incidenti."
      ],
      en: [
        "Psychological Autopsies: deep reconstruction of the decedent's state of mind.",
        "Victimology profiles and cognitive interview protocols.",
        "Toxicological and forensic pathology data correlation with scene blueprints.",
        "Cold case reviews for cases closed as suicides or accidental deaths."
      ]
    },
    s3: {
      it: [
        "Valutazione del nesso causale tra condotte mobbizzanti e danno biologico/psichico.",
        "Analisi criminologica aziendale delle dinamiche relazionali e vessatorie.",
        "Raccolta e blindatura legale delle prove digitali e comportamentali.",
        "Supporto tecnico per vertenze di lavoro e procedimenti disciplinari."
      ],
      en: [
        "Causal nexus assessment between hostile behavior and biological damage.",
        "Corporate criminology analysis of relational abuse and bossing patterns.",
        "Legal packaging and forensic validation of digital and behavioral proof.",
        "Technical support for labor disputes and disciplinary actions."
      ]
    },
    s4: {
      it: [
        "Mappatura GIS dei tassi di delittuosità di quartiere.",
        "Analisi spaziale dei pattern criminali sul territorio romagnolo.",
        "Survey vittimologiche locali per lo studio della percezione della sicurezza.",
        "Progettazione di piani di prevenzione integrata per enti locali e aziende."
      ],
      en: [
        "GIS mapping and predictive spatial modeling of crime density indices.",
        "Geographic criminal pattern profiling in regional territory segments.",
        "Victimological surveys on security index perception parameters.",
        "Designing integrated crime prevention protocols for corporations and municipalities."
      ]
    }
  };

  // Core Labels for Search Experience
  const uiLabels = {
    it: {
      searchPlaceholder: "Cerca metodologia, protocollo o parola chiave (es. DNA, 3D)...",
      resultsFound: "risultati trovati",
      resultsSingle: "risultato trovato",
      quickFilters: "Tag di Ricerca Rapida:",
      activeFilter: "Filtro Attivo",
      clearSearch: "Azzera Filtri",
      matchingServices: "Aree Principali di Intervento che corrispondono alla ricerca",
      allServices: "Tutte le Aree Principali di Intervento",
      indexTitle: "Indice Completo delle Metodologie & Protocolli Scientifici",
      indexSubtitle: "Filtro in tempo reale e convalida metodologica dello studio",
      statusCertified: "CERTIFICATO",
      statusActive: "ATTIVO",
      protocolLabel: "PROTOCOLLO",
      noResults: "Nessun protocollo o servizio corrisponde ai criteri di ricerca. Prova a inserire un termine diverso come 'DNA' o '3D'.",
      viewDetails: "Espandi Dettaglio Tecnico",
      hideDetails: "Comprimi",
      searchHint: "Filtra per trovare rapidamente il protocollo forense applicato al tuo caso."
    },
    en: {
      searchPlaceholder: "Search methodology, protocol or keyword (e.g., DNA, 3D)...",
      resultsFound: "results found",
      resultsSingle: "result found",
      quickFilters: "Quick Search Tags:",
      activeFilter: "Active Filter",
      clearSearch: "Clear Filters",
      matchingServices: "Core Services matching your query",
      allServices: "All Core Intervention Sectors",
      indexTitle: "Complete Forensic Methodologies & Scientific Protocols Index",
      indexSubtitle: "Real-time query filtering and methodological validation",
      statusCertified: "CERTIFIED",
      statusActive: "ACTIVE",
      protocolLabel: "PROTOCOL",
      noResults: "No protocols or services matched your search query. Try typing 'DNA', '3D', or 'Mobbing'.",
      viewDetails: "Expand Technical Details",
      hideDetails: "Collapse",
      searchHint: "Filter to rapidly target the precise forensic protocol applied to your legal case."
    }
  };

  const activeLabels = uiLabels[lang] || uiLabels['it'];

  // List of pre-defined quick tags
  const quickTags = [
    { label: "DNA", value: "DNA" },
    { label: "FORA 3D", value: "3D" },
    { label: "BPA (Sangue)", value: "BPA" },
    { label: "Mobbing", value: "Mobbing" },
    { label: "Autopsia", value: "Autopsia" },
    { label: "GIS", value: "GIS" },
    { label: "DVR / CCTV", value: "CCTV" }
  ];

  // Logic to filter services
  const matchesSearch = (text: string | undefined) => {
    if (!text) return false;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return text.toLowerCase().includes(query);
  };

  const filteredServices = servicesData.filter(service => {
    const title = t[service.titleKey] || '';
    const desc = t[service.descKey] || '';
    const code = service.code || '';
    const detailsList = extraDetails[service.id]?.[lang] || extraDetails[service.id]?.['it'] || [];
    const detailsCombined = detailsList.join(' ');

    // Match query
    const textMatch = matchesSearch(title) || matchesSearch(desc) || matchesSearch(code) || matchesSearch(detailsCombined);

    // Match tag
    if (selectedTag) {
      const tagQuery = selectedTag.toLowerCase();
      const tagMatch = title.toLowerCase().includes(tagQuery) || 
                       desc.toLowerCase().includes(tagQuery) || 
                       detailsCombined.toLowerCase().includes(tagQuery);
      return textMatch && tagMatch;
    }

    return textMatch;
  });

  // Logic to filter methodologies
  const filteredMethodologies = methodologiesData.filter(method => {
    const nameText = isIt ? method.name.it : method.name.en;
    const descText = isIt ? method.desc.it : method.desc.en;
    const catText = isIt ? method.category.it : method.category.en;
    const protText = method.protocol;
    const tagsCombined = method.tags.join(' ');

    const combinedText = `${nameText} ${descText} ${catText} ${protText} ${tagsCombined}`;

    const textMatch = searchQuery.trim() === '' || combinedText.toLowerCase().includes(searchQuery.toLowerCase().trim());

    if (selectedTag) {
      const tagQuery = selectedTag.toLowerCase();
      const tagMatch = combinedText.toLowerCase().includes(tagQuery);
      return textMatch && tagMatch;
    }

    return textMatch;
  });

  const totalResultsCount = filteredServices.length + filteredMethodologies.length;

  const handleClear = () => {
    setSearchQuery('');
    setSelectedTag(null);
  };

  return (
    <section className="space-y-12 py-6">
      
      {/* Title block */}
      <div className="text-left space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 bg-cold-500/10 border border-cold-500/20 text-cold-400 font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded">
          <span>// {t['badge-methods']}</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold font-serif text-slate-100">
          {t['p2-title']}
        </h3>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          {t['p2-desc']}
        </p>
      </div>

      {/* Interactive Cyberpunk Search Workstation */}
      <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-5 md:p-6 space-y-4 relative shadow-xl">
        <div className="absolute top-2.5 right-3 font-mono text-[8px] text-cyan-500/20">
          STATION // QUERY_ENGINE_V2.0 // SEARCHABLE_INDEX
        </div>

        {/* Input & Counter Bar */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeLabels.searchPlaceholder}
              className="w-full bg-slate-900/80 border border-slate-800 rounded-lg pl-10 pr-10 py-3 text-slate-200 text-xs md:text-sm font-mono focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/10 placeholder-slate-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dynamic Counter Chip */}
          <div className="bg-slate-900 border border-slate-800/80 px-4 py-3 rounded-lg flex items-center justify-between md:justify-center space-x-2 font-mono text-xs text-slate-300 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>
              {totalResultsCount} {totalResultsCount === 1 ? activeLabels.resultsSingle : activeLabels.resultsFound}
            </span>
          </div>
        </div>

        {/* Quick Filter Tags */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center shrink-0">
            <Layers className="w-3.5 h-3.5 mr-1 text-cyan-500/70" />
            {activeLabels.quickFilters}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickTags.map((tag) => {
              const isSelected = selectedTag === tag.value;
              return (
                <button
                  key={tag.value}
                  onClick={() => setSelectedTag(isSelected ? null : tag.value)}
                  className={`px-2.5 py-1 text-[10px] font-mono rounded border transition-all cursor-pointer uppercase ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-500/60 text-cyan-300 font-bold'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}

            {(searchQuery || selectedTag) && (
              <button
                onClick={handleClear}
                className="px-2.5 py-1 text-[10px] font-mono rounded border border-red-500/30 bg-red-950/10 text-red-400 hover:bg-red-950/20 hover:border-red-500/50 transition-all cursor-pointer uppercase flex items-center space-x-1"
              >
                <X className="w-3 h-3" />
                <span>{activeLabels.clearSearch}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* No Results Warning */}
      {totalResultsCount === 0 && (
        <div className="bg-slate-950/60 border border-dashed border-slate-900 rounded-xl p-8 text-center space-y-3">
          <AlertTriangle className="w-8 h-8 text-amber-500/80 mx-auto" />
          <p className="text-slate-400 font-mono text-xs max-w-lg mx-auto leading-relaxed">
            {activeLabels.noResults}
          </p>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs rounded hover:border-slate-700 hover:bg-slate-800 cursor-pointer transition-all"
          >
            {activeLabels.clearSearch}
          </button>
        </div>
      )}

      {/* 1. Services Section */}
      {filteredServices.length > 0 && (
        <div className="space-y-6">
          <div className="text-left border-l-2 border-cyan-500 pl-3">
            <h4 className="text-sm font-mono text-slate-400 uppercase tracking-widest">
              {searchQuery || selectedTag ? activeLabels.matchingServices : activeLabels.allServices}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {filteredServices.map((service, index) => {
              const IconComponent = iconMap[service.iconName];
              const isExpanded = expandedId === service.id || (searchQuery.trim() !== '' && expandedId !== service.id); // auto expand on search
              const details = extraDetails[service.id]?.[lang] || extraDetails[service.id]?.['it'] || [];

              return (
                <motion.div
                  key={service.id}
                  layout="position"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-slate-950/60 border rounded-xl p-5 md:p-6 transition-all flex flex-col justify-between cursor-pointer hover:bg-slate-950/90 ${
                    isExpanded ? 'border-cold-400/60 ring-1 ring-cold-400/10 shadow-lg shadow-cyan-500/5' : 'border-slate-900/80 hover:border-cold-500/30'
                  }`}
                  onClick={() => toggleExpand(service.id)}
                >
                  <div className="space-y-4">
                    
                    {/* Widescreen Forensic Thumbnail Banner */}
                    <div className="w-full h-32 md:h-36 rounded-lg overflow-hidden border border-slate-900 shadow-sm relative group">
                      <img 
                        src={serviceImages[service.id]} 
                        alt={t[service.titleKey]} 
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none"></div>
                    </div>

                    {/* Card Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-cold-400 font-mono text-[10px] font-bold tracking-widest uppercase">
                        CODE: {service.code}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-cold-500/10 border border-cold-500/20 flex items-center justify-center text-cold-400">
                        <IconComponent className="w-4.5 h-4.5" />
                      </div>
                    </div>

                    {/* Card Title & Brief Description */}
                    <div className="space-y-2 text-left">
                      <h4 className="text-lg md:text-xl font-bold font-serif text-slate-100 flex items-center justify-between">
                        <span>{t[service.titleKey]}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-cold-400 ml-2 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500 ml-2 flex-shrink-0" />
                        )}
                      </h4>
                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                        {t[service.descKey]}
                      </p>
                    </div>

                    {/* Interactive Accordion Expansion */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-slate-900/60 space-y-2 text-left">
                            <span className="text-[9px] font-mono text-cyan-400/80 block uppercase tracking-wider mb-2">
                              // SPECIFICHE DI PROTOCOLLO:
                            </span>
                            <ul className="space-y-2">
                              {details.map((point, idx) => (
                                <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                                  <span className="text-cold-400 mt-1 flex-shrink-0">▪</span>
                                  <span className="leading-normal">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>

                  {/* Informative tap footer helper */}
                  {!isExpanded && (
                    <div className="mt-4 pt-3 border-t border-slate-900/30 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>TAP TO EXPAND DETAILED METHODOLOGY</span>
                      <span>[ + ]</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Searchable Index of Forensic Protocols (Real-time Filtered Grid) */}
      {filteredMethodologies.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="text-left border-l-2 border-emerald-500 pl-3 space-y-1">
            <h4 className="text-lg font-serif font-extrabold text-slate-100 uppercase tracking-wide">
              {activeLabels.indexTitle}
            </h4>
            <p className="text-xs text-slate-400 font-mono">
              {activeLabels.indexSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredMethodologies.map((method) => {
              const nameText = isIt ? method.name.it : method.name.en;
              const descText = isIt ? method.desc.it : method.desc.en;
              const catText = isIt ? method.category.it : method.category.en;
              const isMethodExpanded = expandedMethodologyId === method.id;

              return (
                <div
                  key={method.id}
                  className={`bg-slate-950 border rounded-lg p-4 transition-all duration-300 text-left relative overflow-hidden ${
                    isMethodExpanded 
                      ? 'border-emerald-500/50 shadow-md shadow-emerald-500/5 bg-slate-950/90' 
                      : 'border-slate-900 hover:border-slate-800'
                  }`}
                >
                  {/* Subtle category and code headers */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                      {catText} // {method.code}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider uppercase border ${
                      method.status === 'certified'
                        ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400'
                        : 'bg-cyan-950/30 border-cyan-500/30 text-cyan-400'
                    }`}>
                      {method.status === 'certified' ? activeLabels.statusCertified : activeLabels.statusActive}
                    </span>
                  </div>

                  {/* Title of Methodology */}
                  <h5 className="font-serif font-bold text-slate-200 text-sm md:text-base leading-snug">
                    {nameText}
                  </h5>

                  {/* Short preview of description */}
                  <p className="text-xs text-slate-400 mt-2 font-sans line-clamp-2 leading-relaxed">
                    {descText}
                  </p>

                  {/* Expansion folder for granular methodologies details */}
                  <AnimatePresence initial={false}>
                    {isMethodExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-3 border-t border-slate-900 space-y-3">
                          
                          {/* Granular description */}
                          <div className="space-y-1 text-xs">
                            <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block">// SCIENTIFIC STATEMENT //</span>
                            <p className="text-slate-300 leading-relaxed font-sans">
                              {descText}
                            </p>
                          </div>

                          {/* Technical protocol validation */}
                          <div className="bg-slate-900/50 p-2.5 rounded border border-slate-900/80 space-y-1">
                            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">
                              {activeLabels.protocolLabel}
                            </span>
                            <span className="text-xs font-mono text-emerald-400 font-bold block">
                              {method.protocol}
                            </span>
                          </div>

                          {/* Matching terms and taxonomy */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {method.tags.map((tag, idx) => (
                              <span 
                                key={idx}
                                className="bg-slate-900 px-2 py-0.5 rounded text-[8px] font-mono text-slate-500 uppercase"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expand button footer */}
                  <div className="mt-3 pt-2.5 border-t border-slate-900/40 flex items-center justify-between">
                    <button
                      onClick={() => toggleMethodologyExpand(method.id)}
                      className="text-[10px] font-mono text-cyan-400/90 hover:text-cyan-300 transition-colors cursor-pointer flex items-center space-x-1"
                    >
                      <span>{isMethodExpanded ? activeLabels.hideDetails : activeLabels.viewDetails}</span>
                      {isMethodExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-[8px] font-mono text-slate-600/50">
                      DIGITAL_SECURE_VERDICT
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[10px] font-mono text-slate-500 text-center">
            {activeLabels.searchHint}
          </p>
        </div>
      )}

      {/* Strategic CTA Callout */}
      <div className="bg-slate-950/40 border border-slate-900 p-6 md:p-8 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6 text-left relative overflow-hidden scanlines">
        <div className="space-y-1.5 max-w-xl z-10">
          <h4 className="font-bold text-slate-200 text-sm md:text-base">
            {t['p2-cta-text']}
          </h4>
          <p className="text-xs text-slate-500">
            {t['cta-sub-free']}
          </p>
        </div>
        <button
          onClick={onNavigateToContact}
          id="services-strategy-cta"
          className="bg-cold-500 hover:bg-cold-600 text-white font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded transition-all whitespace-nowrap cursor-pointer active:scale-95 z-10"
        >
          {t['p2-cta-btn']}
        </button>
      </div>

    </section>
  );
}
