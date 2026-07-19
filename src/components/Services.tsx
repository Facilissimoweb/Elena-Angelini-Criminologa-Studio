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
  CheckCircle2,
  Send,
  FileDown,
  Trash2,
  User,
  FolderOpen
} from 'lucide-react';
import { Language, servicesData, translations } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import ForensicCalculator from './ForensicCalculator';
import SectionLogo from './SectionLogo';
import HumanBodyMap from './HumanBodyMap';
import { jsPDF } from 'jspdf';

interface ServicesProps {
  lang: Language;
  onNavigateToContact: (prefill?: { subject?: string; message?: string }) => void;
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

  const renderDoubleColor = (text: string) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= 1) return text;
    const mid = words.length <= 2 ? 1 : Math.ceil(words.length * 0.5);
    return (
      <>
        <span className="text-slate-100">{words.slice(0, mid).join(' ')}</span>{' '}
        <span className="text-cold-400 font-extrabold">{words.slice(mid).join(' ')}</span>
      </>
    );
  };

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [expandedMethodologyId, setExpandedMethodologyId] = useState<string | null>(null);
  
  // PDF Summary Selection States
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedMethodologies, setSelectedMethodologies] = useState<string[]>([]);
  const [clientName, setClientName] = useState('');
  const [caseId, setCaseId] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const isIt = lang === 'it' || !lang;

  const generatePDF = () => {
    setIsGeneratingPDF(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const sanitize = (text: string) => {
        if (!text) return '';
        return text
          .replace(/à/g, "a'")
          .replace(/á/g, "a'")
          .replace(/è/g, "e'")
          .replace(/é/g, "e'")
          .replace(/ì/g, "i'")
          .replace(/í/g, "i'")
          .replace(/ò/g, "o'")
          .replace(/ó/g, "o'")
          .replace(/ù/g, "u'")
          .replace(/ú/g, "u'")
          .replace(/È/g, "E'")
          .replace(/–/g, "-")
          .replace(/—/g, "-")
          .replace(/’/g, "'")
          .replace(/“/g, '"')
          .replace(/”/g, '"');
      };

      // Page dimensions
      const margin = 15;
      const contentWidth = 180; // 210 - 30
      let y = 20;

      const drawHeader = (isSubsequentPage = false) => {
        // Draw top aesthetic colored bar
        doc.setFillColor(6, 182, 212); // cyan-500
        doc.rect(0, 0, 210, 4, 'F');

        if (!isSubsequentPage) {
          // Main brand header
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(16);
          doc.setTextColor(15, 23, 42); // slate-900
          doc.text('STUDIO CRIMINALISTICA ELENA ANGELINI', margin, 15);

          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(71, 85, 105); // slate-600
          doc.text(sanitize('Consulenze e Perizie Tecnico-Scientifiche // Criminalistica Applicata'), margin, 20);

          doc.setDrawColor(226, 232, 240); // slate-200
          doc.line(margin, 23, margin + contentWidth, 23);
        } else {
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(148, 163, 184); // slate-400
          doc.text(sanitize('STUDIO CRIMINALISTICA ELENA ANGELINI - Report Consulenza (Continua)'), margin, 10);
          
          doc.setDrawColor(226, 232, 240);
          doc.line(margin, 12, margin + contentWidth, 12);
        }
      };

      const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > 275) {
          doc.addPage();
          drawHeader(true);
          y = 25;
        }
      };

      // Draw initial page header
      drawHeader(false);
      y = 30;

      // Title Card and Metadata Box
      doc.setFillColor(248, 250, 252); // slate-50
      doc.rect(margin, y, contentWidth, 32, 'F');
      doc.setDrawColor(203, 213, 225); // slate-300
      doc.rect(margin, y, contentWidth, 32, 'D');

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(6, 182, 212); // cyan
      doc.text(sanitize(lang === 'it' ? 'PIANIFICAZIONE PERIZIALE E TECNICO-SCIENTIFICA' : 'TECHNICAL & FORENSIC ADVISORY PLAN'), margin + 5, y + 6);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      
      const docCode = `REF-ANGELINI-${Math.floor(100000 + Math.random() * 900000)}`;
      doc.text(sanitize(`${lang === 'it' ? 'Codice Report' : 'Report ID'}: ${docCode}`), margin + 5, y + 13);
      doc.text(sanitize(`${lang === 'it' ? 'Data' : 'Date'}: ${new Date().toLocaleDateString()}`), margin + 5, y + 18);
      doc.text(sanitize(`${lang === 'it' ? 'Richiedente' : 'Applicant'}: ${clientName.trim() || (lang === 'it' ? 'Non specificato' : 'Not specified')}`), margin + 5, y + 23);
      doc.text(sanitize(`${lang === 'it' ? 'Riferimento Caso' : 'Case Reference'}: ${caseId.trim() || 'N/A'}`), margin + 5, y + 28);

      y += 38;

      // Render Selected Services
      const selectedSvcs = servicesData.filter(s => selectedServices.includes(s.id));
      if (selectedSvcs.length > 0) {
        checkPageBreak(12);
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42);
        doc.text(sanitize(lang === 'it' ? '1. SERVIZI DI CONSULENZA SPECIALISTICA' : '1. CORE SPECIALIZED SERVICES'), margin, y);
        y += 6;

        selectedSvcs.forEach((svc) => {
          const title = t[svc.titleKey] || '';
          const desc = t[svc.descKey] || '';
          const detailsList = extraDetails[svc.id]?.[lang] || extraDetails[svc.id]?.['it'] || [];

          checkPageBreak(25);
          
          // Draw subtle vertical line for service indicator
          doc.setDrawColor(6, 182, 212); // cyan
          doc.setLineWidth(0.8);
          doc.line(margin, y, margin, y + 12);
          doc.setLineWidth(0.2); // reset line width

          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(15, 23, 42);
          doc.text(sanitize(`${title} (${svc.code})`), margin + 4, y + 4);

          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(71, 85, 105);
          const descLines = doc.splitTextToSize(desc, contentWidth - 6);
          doc.text(sanitize(descLines.join('\n')), margin + 4, y + 9);
          y += 9 + (descLines.length * 3.5);

          // Render service bullet points
          if (detailsList.length > 0) {
            checkPageBreak(15);
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(8);
            doc.setTextColor(15, 23, 42);
            doc.text(sanitize(lang === 'it' ? '// DETTAGLI OPERATIVI E PROTOCOLLI:' : '// OPERATIONAL DETAILS & PROTOCOLS:'), margin + 4, y);
            y += 4;

            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(71, 85, 105);

            detailsList.forEach((point) => {
              checkPageBreak(6);
              const pointLines = doc.splitTextToSize(point, contentWidth - 10);
              doc.text('-', margin + 6, y);
              doc.text(sanitize(pointLines.join('\n')), margin + 10, y);
              y += (pointLines.length * 3.5);
            });
            y += 2;
          }
          y += 4;
        });
        y += 2;
      }

      // Render Selected Methodologies
      const selectedMets = methodologiesData.filter(m => selectedMethodologies.includes(m.id));
      if (selectedMets.length > 0) {
        checkPageBreak(12);
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42);
        doc.text(sanitize(lang === 'it' ? '2. PROTOCOLLI SCIENTIFICI & METODOLOGIE' : '2. SCIENTIFIC PROTOCOLS & METHODOLOGIES'), margin, y);
        y += 6;

        selectedMets.forEach((met) => {
          const nameText = isIt ? met.name.it : met.name.en;
          const descText = isIt ? met.desc.it : met.desc.en;
          const catText = isIt ? met.category.it : met.category.en;
          
          checkPageBreak(30);

          doc.setDrawColor(16, 185, 129); // emerald
          doc.setLineWidth(0.8);
          doc.line(margin, y, margin, y + 12);
          doc.setLineWidth(0.2); // reset

          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(15, 23, 42);
          doc.text(sanitize(`${nameText} (${met.code})`), margin + 4, y + 4);

          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(16, 185, 129); // emerald
          doc.text(sanitize(`${lang === 'it' ? 'Categoria' : 'Category'}: ${catText} | Protocollo: ${met.protocol}`), margin + 4, y + 8);

          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(71, 85, 105);
          const descLines = doc.splitTextToSize(descText, contentWidth - 6);
          doc.text(sanitize(descLines.join('\n')), margin + 4, y + 13);
          y += 13 + (descLines.length * 3.5) + 3;
        });
      }

      // Legal & Confidentiality Statement
      checkPageBreak(40);
      y += 4;
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, y, margin + contentWidth, y);
      y += 6;

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(sanitize(lang === 'it' ? 'AVVISO DI RISERVATEZZA & SEGRETO PROFESSIONALE' : 'CONFIDENTIALITY & PROFESSIONAL SECRECY NOTICE'), margin, y);
      y += 4.5;

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139); // slate-500
      const legalText = lang === 'it'
        ? 'Il presente riepilogo periziale e redatto ad uso esclusivo del richiedente ed e protetto dal segreto professionale ex art. 200 c.p.p. Tutte le metodologie di indagine elencate e i relativi marchi associati (es. FORA 3D, BPA, ISO 17025) sono di proprieta esclusiva dello Studio Criminalistica Elena Angelini o dei rispettivi detentori scientifici e sono protetti dalle vigenti norme sul diritto d\'autore.'
        : 'This technical advisory report is prepared for the exclusive use of the applicant and is fully protected under professional secrecy regulations. All forensic methodologies, research data, and related trademarks (e.g., FORA 3D, BPA, ISO 17025) remain the sole scientific property of Elena Angelini Criminalistics Studio and are strictly protected under international copyright law.';
      const legalLines = doc.splitTextToSize(legalText, contentWidth);
      doc.text(sanitize(legalLines.join('\n')), margin, y);
      y += (legalLines.length * 3.2) + 8;

      // Signatures Area
      checkPageBreak(25);
      
      const sigY = y + 10;
      doc.setDrawColor(203, 213, 225);
      
      // Client line
      doc.line(margin, sigY, margin + 70, sigY);
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.text(sanitize(lang === 'it' ? 'Firma del Richiedente' : 'Applicant Signature'), margin, sigY + 4.5);

      // Studio signature line
      doc.line(margin + 110, sigY, margin + contentWidth, sigY);
      doc.setFont('Helvetica', 'bold');
      doc.text(sanitize('Dr.ssa Elena Angelini'), margin + 110, sigY + 4.5);
      doc.setFont('Helvetica', 'normal');
      doc.text(sanitize(lang === 'it' ? 'Direttore Tecnico dello Studio' : 'Technical Director / Lead Criminologist'), margin + 110, sigY + 8);

      // Save the PDF
      const fileName = `${clientName.trim().replace(/\s+/g, '_') || 'Studio_Angelini'}_Forensic_Report.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleMethodologyExpand = (id: string) => {
    setExpandedMethodologyId(expandedMethodologyId === id ? null : id);
  };

  const handleMapFilter = (query: string, tag: string | null) => {
    setSearchQuery(query);
    setSelectedTag(tag);
    
    // Smooth scroll to searchable workstation for better usability
    setTimeout(() => {
      const element = document.getElementById('forensic-workstation-trigger');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
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
        <SectionLogo lang={lang} />
        
        <div className="inline-flex items-center space-x-2 bg-cold-500/10 border border-cold-500/20 text-cold-400 font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded">
          <span>// {t['badge-methods']}</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold font-serif">
          {renderDoubleColor(t['p2-title'])}
        </h3>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          {t['p2-desc']}
        </p>
      </div>

      {/* Interactive Anatomical Body Map Section */}
      <div className="space-y-4">
        <div className="text-left border-l-2 border-cyan-500 pl-3 space-y-1">
          <h4 className="text-sm font-mono text-slate-400 uppercase tracking-widest">
            {lang === 'it' ? 'MAPPING BIOMETRICO // ANALISI ANATOMICA FORENSE' : 'BIOMETRIC MAPPING // FORENSIC ANATOMICAL ANALYSIS'}
          </h4>
          <p className="text-xs text-slate-500 font-sans leading-relaxed">
            {lang === 'it'
              ? 'Interagisci con i distretti biologici sulla mappa corporea 3D per caricare istantaneamente le metodologie di indagine associate alle perizie dello studio.'
              : 'Interact with biological segments on the 3D body map to instantly query investigative methodologies linked to our technical legal reports.'}
          </p>
        </div>
        <HumanBodyMap lang={lang} onFilterChange={handleMapFilter} />
      </div>

      {/* Interactive Cyberpunk Search Workstation */}
      <div id="forensic-workstation-trigger" className="bg-slate-950/80 border border-slate-900 rounded-xl p-5 md:p-6 space-y-4 relative shadow-xl scroll-mt-24">
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
                      <div className="flex items-center space-x-2">
                        <span className="text-cold-400 font-mono text-[10px] font-bold tracking-widest uppercase">
                          CODE: {service.code}
                        </span>
                        
                        {/* Add to Report Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation(); // prevent expanding the accordion
                            setSelectedServices(prev =>
                              prev.includes(service.id)
                                ? prev.filter(id => id !== service.id)
                                : [...prev, service.id]
                            );
                          }}
                          className={`px-2 py-0.5 text-[9px] font-mono rounded border transition-all flex items-center space-x-1 cursor-pointer ${
                            selectedServices.includes(service.id)
                              ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 font-bold'
                              : 'bg-slate-900/80 border-slate-800 text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          <BookmarkCheck className={`w-3 h-3 ${selectedServices.includes(service.id) ? 'text-cyan-400 fill-cyan-400/25' : ''}`} />
                          <span>{selectedServices.includes(service.id) ? (lang === 'it' ? 'IN RIEPILOGO' : 'IN REPORT') : (lang === 'it' ? '+ REPORT' : '+ REPORT')}</span>
                        </button>
                      </div>
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
                          <div className="pt-4 mt-4 border-t border-slate-900/60 space-y-4 text-left">
                            <div>
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

                            {/* Linear path quick contact link */}
                            <div className="pt-3 border-t border-slate-900/40 flex justify-end">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation(); // prevent collapsing the accordion on click
                                  const serviceTitle = t[service.titleKey];
                                  const serviceCode = service.code;
                                  const promptMessage = lang === 'it' 
                                    ? `Salve Studio Criminalistica Angelini,\n\nDesidero richiedere una consulenza preliminare e l'analisi di fattibilità per il vostro servizio:\n👉 "${serviceTitle}" (Codice: ${serviceCode}).\n\nVi prego di ricontattarmi per approfondire i dettagli operativi del mio caso.\n\nCordiali saluti.`
                                    : `Dear Elena Angelini Criminalistics Studio,\n\nI would like to request a preliminary assessment and feasibility study for your core service segment:\n👉 "${serviceTitle}" (Code: ${serviceCode}).\n\nPlease contact me to discuss the operational details of my case.\n\nBest regards.`;
                                  
                                  onNavigateToContact({
                                    subject: serviceTitle,
                                    message: promptMessage
                                  });
                                }}
                                className="w-full sm:w-auto bg-cold-500/10 hover:bg-cold-500/20 text-cold-400 border border-cold-500/30 hover:border-cold-500/60 rounded px-4 py-2.5 text-xs font-mono font-extrabold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95 shadow-md"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>{lang === 'it' ? 'Contatta lo Studio per questo Servizio' : 'Contact Studio for this Service'}</span>
                              </button>
                            </div>
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
            <SectionLogo lang={lang} />
            
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
                    <div className="flex items-center space-x-1.5">
                      {/* Selection Toggle */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMethodologies(prev =>
                            prev.includes(method.id)
                              ? prev.filter(id => id !== method.id)
                              : [...prev, method.id]
                          );
                        }}
                        className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider uppercase border flex items-center space-x-0.5 cursor-pointer transition-all ${
                          selectedMethodologies.includes(method.id)
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                            : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        <BookmarkCheck className={`w-2.5 h-2.5 ${selectedMethodologies.includes(method.id) ? 'text-emerald-400 fill-emerald-400/20' : ''}`} />
                        <span>{selectedMethodologies.includes(method.id) ? (lang === 'it' ? 'IN REPORT' : 'IN REPORT') : (lang === 'it' ? '+ REPORT' : '+ REPORT')}</span>
                      </button>

                      <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider uppercase border ${
                        method.status === 'certified'
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400'
                          : 'bg-cyan-950/30 border-cyan-500/30 text-cyan-400'
                      }`}>
                        {method.status === 'certified' ? activeLabels.statusCertified : activeLabels.statusActive}
                      </span>
                    </div>
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

                          {/* Linear path quick contact link for methodology */}
                          <div className="pt-3 border-t border-slate-900/40 flex justify-end">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const promptMessage = lang === 'it'
                                  ? `Salve Studio Criminalistica Angelini,\n\nDesidero concordare l'applicazione specifica della metodologia forense:\n👉 "${nameText}" (Protocollo: ${method.protocol}).\n\nVi prego di contattarmi per pianificare lo studio preliminare del mio caso con il vostro team di specialisti.\n\nCordiali saluti.`
                                  : `Dear Elena Angelini Criminalistics Studio,\n\nI would like to request the specific application of your scientific forensic protocol:\n👉 "${nameText}" (Protocol: ${method.protocol}).\n\nPlease contact me to discuss integrating this methodology into my case review.\n\nBest regards.`;
                                onNavigateToContact({
                                  subject: nameText,
                                  message: promptMessage
                                });
                              }}
                              className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 rounded px-3.5 py-2.5 text-xs font-mono font-extrabold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95 shadow-md"
                            >
                              <Send className="w-3 h-3 text-emerald-400" />
                              <span>{lang === 'it' ? 'Richiedi questo Protocollo Scientifico' : 'Request this Scientific Protocol'}</span>
                            </button>
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

      {/* 3. FORENSIC REPORT GENERATOR WORKSTATION */}
      <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-5 md:p-6 space-y-6 relative shadow-xl mt-6">
        <div className="absolute top-2.5 right-3 font-mono text-[8px] text-cyan-500/20">
          STATION // REPORT_BUILDER_V1.1 // PDF_GENERATOR
        </div>

        {/* Section Header */}
        <div className="text-left border-l-2 border-cyan-500 pl-3">
          <h4 className="text-lg font-serif font-extrabold text-slate-100 uppercase tracking-wide">
            {lang === 'it' ? 'Workstation Generazione Report Forense' : 'Forensic Report Generation Workstation'}
          </h4>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            {lang === 'it' 
              ? 'Configura e scarica un riepilogo periziale in formato PDF conforme alle linee guida dello studio' 
              : 'Configure and download a technical forensic advisory summary in PDF format'}
          </p>
        </div>

        {/* Selection summary display */}
        {(selectedServices.length > 0 || selectedMethodologies.length > 0) ? (
          <div className="space-y-4">
            
            {/* Selected Badges Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Selected Services Column */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-lg p-3.5 space-y-2 text-left">
                <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase tracking-wider">
                  // {lang === 'it' ? 'Servizi Selezionati' : 'Selected Services'} ({selectedServices.length}):
                </span>
                {selectedServices.length === 0 ? (
                  <p className="text-[11px] font-mono text-slate-600 italic">
                    {lang === 'it' ? 'Nessun servizio selezionato' : 'No services selected'}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {servicesData.filter(s => selectedServices.includes(s.id)).map(s => (
                      <div 
                        key={s.id}
                        className="bg-cyan-950/20 border border-cyan-500/30 rounded px-2 py-1 text-[10px] font-mono text-cyan-300 flex items-center space-x-1"
                      >
                        <span>{s.code}</span>
                        <button 
                          onClick={() => setSelectedServices(prev => prev.filter(id => id !== s.id))}
                          className="hover:text-red-400 text-slate-400 cursor-pointer pl-1 ml-1 border-l border-cyan-500/20"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Methodologies Column */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-lg p-3.5 space-y-2 text-left">
                <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase tracking-wider">
                  // {lang === 'it' ? 'Protocolli Selezionati' : 'Selected Protocols'} ({selectedMethodologies.length}):
                </span>
                {selectedMethodologies.length === 0 ? (
                  <p className="text-[11px] font-mono text-slate-600 italic">
                    {lang === 'it' ? 'Nessun protocollo selezionato' : 'No protocols selected'}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {methodologiesData.filter(m => selectedMethodologies.includes(m.id)).map(m => (
                      <div 
                        key={m.id}
                        className="bg-emerald-950/20 border border-emerald-500/30 rounded px-2 py-1 text-[10px] font-mono text-emerald-300 flex items-center space-x-1"
                      >
                        <span>{m.code}</span>
                        <button 
                          onClick={() => setSelectedMethodologies(prev => prev.filter(id => id !== m.id))}
                          className="hover:text-red-400 text-slate-400 cursor-pointer pl-1 ml-1 border-l border-emerald-500/20"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields: Applicant & Case ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  {lang === 'it' ? 'Richiedente / Studio Legale' : 'Applicant / Law Firm'}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={lang === 'it' ? 'es. Avv. Marco Rossi' : 'e.g., Atty. John Doe'}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-500/60 transition-all placeholder-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  {lang === 'it' ? 'Riferimento Caso / Procedimento' : 'Case Reference / Proceeding No.'}
                </label>
                <div className="relative">
                  <FolderOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={caseId}
                    onChange={(e) => setCaseId(e.target.value)}
                    placeholder={lang === 'it' ? 'es. Proc. Penale N. 1024/B' : 'e.g., Proc. No. 1024/B'}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-500/60 transition-all placeholder-slate-600"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-900/60 flex flex-col sm:flex-row gap-3 justify-end items-stretch sm:items-center">
              <button
                type="button"
                onClick={() => {
                  setSelectedServices([]);
                  setSelectedMethodologies([]);
                  setClientName('');
                  setCaseId('');
                }}
                className="px-4 py-2.5 bg-slate-900 hover:bg-red-950/20 border border-slate-800 hover:border-red-900/50 text-slate-400 hover:text-red-400 font-mono text-xs rounded transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{lang === 'it' ? 'Svuota Selezione' : 'Clear Selection'}</span>
              </button>

              <button
                type="button"
                disabled={isGeneratingPDF}
                onClick={generatePDF}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-900 text-white font-mono font-bold text-xs rounded transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-md hover:shadow-cyan-500/15"
              >
                <FileDown className="w-4 h-4" />
                <span>
                  {isGeneratingPDF 
                    ? (lang === 'it' ? 'Generazione...' : 'Generating...') 
                    : (lang === 'it' ? 'Scarica Riepilogo PDF' : 'Download PDF Summary')}
                </span>
              </button>
            </div>
            
            <p className="text-[10px] font-mono text-slate-500 text-left pt-1">
              {lang === 'it'
                ? '* Il report compilato include protocolli di catena di custodia, specifiche di indagine ed e pronto per l\'archiviazione documentale.'
                : '* The generated PDF contains chain-of-custody protocols, specific investigation plans, and is ready for legal filing.'}
            </p>

          </div>
        ) : (
          <div className="bg-slate-900/20 border border-dashed border-slate-800 rounded-xl p-6 text-center space-y-3.5">
            <FileCheck2 className="w-8 h-8 text-cyan-500/50 mx-auto animate-pulse" />
            <p className="text-slate-400 font-mono text-xs max-w-lg mx-auto leading-relaxed text-center">
              {lang === 'it'
                ? 'Nessun servizio o protocollo scientifico selezionato. Scorri le schede sopra e premi "+ REPORT" per aggiungere elementi al tuo riepilogo in PDF.'
                : 'No services or scientific protocols selected. Scroll through the cards above and click "+ REPORT" to build your custom PDF advisory report.'}
            </p>
          </div>
        )}
      </div>

      {/* FORENSIC CALCULATOR ESTIMATOR */}
      <div className="pt-6">
        <ForensicCalculator lang={lang} onNavigateToContact={onNavigateToContact} />
      </div>

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
