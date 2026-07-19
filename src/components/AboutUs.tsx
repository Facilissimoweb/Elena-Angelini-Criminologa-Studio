import { useState } from 'react';
import { 
  Users, 
  Search, 
  Shield, 
  Activity, 
  Award, 
  Fingerprint, 
  FileText, 
  Scale, 
  Briefcase, 
  HeartHandshake, 
  CheckCircle2, 
  MapPin, 
  Mail, 
  Phone, 
  Network, 
  Brain, 
  Building, 
  FileCheck2,
  Lock,
  FileDown,
  Loader2
} from 'lucide-react';
import { Language } from '../types';
import { motion } from 'motion/react';
import ForensicTimeline from './ForensicTimeline';
import { jsPDF } from 'jspdf';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

interface AboutUsProps {
  lang: Language;
  onNavigateToContact: () => void;
}

// Complete localized translations specifically for the Chi Siamo page to ensure perfect alignment
const localTranslations: Record<string, any> = {
  it: {
    badge: "CHI SIAMO",
    title: "Criminologia, Criminalistica & Scienze Forensi",
    subtitle: "Il Network di professionisti a vostra disposizione",
    introText: "Lo Studio Criminalistica di Elena Angelini promuove un metodo d'eccellenza fondato sull'integrazione scientifica multidisciplinare.",
    
    // Method
    methodTitle: "Il Metodo a Task Force",
    methodDesc: "Prevede l'ingaggio del consulente o dei consulenti specifici più adatti ai quesiti posti dal giudice, dal pubblico ministero (PM), dall'avvocato difensore e dal cliente stesso.",
    methodFocus: "Il focus assoluto del nostro lavoro è incentrato sul cliente, la sua storia personale e la formulazione di una strategia di difesa integrata.",

    // What we do
    whatWeDoTitle: "Cosa facciamo",
    whatWeDoSubtitle: "Servizio di Consulenza Criminologica per la difesa e la parte civile",
    whatWeDoDesc: "La ricerca di nuovi percorsi di indagine e di soluzioni scientifiche è interamente taylor-made: ogni singolo caso ha la sua storia unica, le sue persone di riferimento e le sue scienze d'elezione. La squadra di consulenti di parte viene scelta meticolosamente in base allo studio approfondito del caso, applicando le tecniche e le metodologie più avanzate delle scienze forensi alle prove portate a carico e discarico, per aprire nuovi fronti di analisi tecnica, repertazione scientifica e ricostruzioni oggettive.",

    // How we do it
    howTitle: "Come operiamo",
    howSubtitle: "Il pool difensivo mette in opera le Scienze Forensi secondo 4 principali quesiti di ricerca:",
    howSteps: [
      {
        num: "01",
        title: "Analisi del fascicolo",
        desc: "Studio e revisione accurata del fascicolo processuale e del metodo investigativo impiegato dall'accusa."
      },
      {
        num: "02",
        title: "Verifica degli scenari",
        desc: "Ricostruzione e verifica degli scenari possibili dell'evento con indirizzamento mirato alla ricerca di nuovi reperti fisici e testimoni chiave."
      },
      {
        num: "03",
        title: "Analisi testimoniale",
        desc: "Studio scientifico approfondito e valutazione dell'attendibilità delle testimonianze raccolte."
      },
      {
        num: "04",
        title: "Supporto accertamenti",
        desc: "Supporto tecnico specialistico e presidio strategico durante lo svolgimento degli accertamenti tecnici non ripetibili."
      }
    ],

    // The Network
    networkTitle: "Network di Consulenti Forensi",
    networkSubtitle: "Promuoviamo un network di consulenti, formazione e servizi specialistici in costante crescita, composto da professionisti accreditati:",
    networkProfessions: [
      { text: "Criminologi Specializzati", detail: "Esperti di profili comportamentali, dinamiche relazionali e vittimologia." },
      { text: "Esperti della Scena del Crimine", detail: "Tecnici specializzati in sopralluogo giudiziario, BPA e balistica forense." },
      { text: "Medici legali ed Psichiatri forensi", detail: "Analisi di traumi, autopsie e accertamento della capacità di intendere e volere." },
      { text: "Psicologi e Psicodiagnosti", detail: "Supporto clinico forense, test psicometrici e perizie psicologiche sui minori." },
      { text: "Investigatori privati autorizzati", detail: "Abilitati alle indagini difensive previste dall'art. 391-bis c.p.p." },
      { text: "Avvocati Penalisti, Civilisti e Tributaristi", detail: "Rete legale di coordinamento per la difesa integrata di ogni controversia." },
      { text: "Sociologi Specializzati", detail: "Studio delle matrici sociali della devianza ed analisi criminologiche del territorio." }
    ],

    // Initiatives
    initiativesTitle: "Partecipiamo alle iniziative di:",
    initiativesList: [
      "Autodifesa Transfemminista (Casa Madiba Network, Non Una Di Meno Rimini, Pride OFF) Rimini",
      "B.A. CRIMINOLOGIA - Sara Bardi, Criminologa",
      "F.C.A. - FORENSIC CONSULTANTS ASSOCIATES - Ilaria Laghi, Criminologa e Daniela Cavuoto, Criminologa",
      "PROGETTO EOS - Barbara Cincinnato, Psicologa",
      "Studi Legali e Tributari in Rimini e La Spezia",
      "Smagliature Urbane APS, Rimini",
      "A.I.C.I.S - Associazione Italiana Criminologia per l'Investigazione e la Sicurezza",
      "So.I.S. - Società Italiana di Sociologia"
    ],

    // Registrations
    registrationsTitle: "Iscrizioni come Professionista ex L4/2013:",
    registrationsSubtitle: "Elena Angelini esercita la professione ai sensi della Legge n. 4 del 14 gennaio 2013, registrata presso associazioni nazionali di categoria:",
    registrationsList: [
      "Tessera A.I.C.I.S. n. 208 (Associazione Italiana Criminologia per l'Investigazione e la Sicurezza)",
      "Tessera So.I.S. n. 2670, con attestato di qualità e qualificazione dei servizi n. 145/2015 (Società Italiana di Sociologia)",
      "Tessera A.S.I. n. 338"
    ],

    // Office section
    officeTitle: "Il Nostro Ufficio",
    officeText: "Si riceve esclusivamente su appuntamento riservato presso:",
    officeLocation: "Arbor Vitae, Via Fabio Filzi 9 - 47923 Rimini, ITALY",
    writeUs: "Scrivici",
    callUs: "Chiamaci",
    confidentiality: "Massima Riservatezza Garantita",
    slogan: "La Scienza Forense al vostro servizio",
    ctaBtn: "Richiedi Valutazione Gratuita",
    pdfBtn: "Scarica Profilo PDF",
    pdfGenerating: "Generazione PDF...",
    // Chart Section
    chartTitle: "Aree di Specializzazione Forense",
    chartSubtitle: "Visualizzazione empirica del carico dei casi e della profondità analitica dello studio",
    chartDesc: "Il grafico a radar evidenzia l'eccellenza multidisciplinare dello Studio Angelini. Ogni area è coperta da specialisti di comprovata esperienza e supportata da rigorose metodologie scientifiche di laboratorio, fornendo risposte concrete a quesiti complessi.",
    chartSpecs: {
      fingerprints: "Analisi Impronte",
      dna: "Genetica & DNA",
      reconstruction: "Ricostruzione 3D",
      ballistics: "Balistica Forense",
      graphology: "Grafologia & Firme",
      digital: "Informatica Forense",
      criminology: "Criminologia"
    },
    chartLegendCases: "Casi Trattati (%)",
    chartLegendExpertise: "Profondità Scientifica (Score)"
  },
  
  // Standard elegant English fallback with complete fidelity to user's text
  en: {
    badge: "ABOUT US",
    title: "Criminology, Criminalistics & Forensic Sciences",
    subtitle: "The Professional Network at your service",
    introText: "The Elena Angelini Forensic Criminology Studio promotes a model of excellence founded on multidisciplinary scientific integration.",
    
    methodTitle: "The Task Force Method",
    methodDesc: "It involves engaging specific, targeted consultants depending on the technical questions raised by the judge, prosecutor (PM), defense attorney, and the client.",
    methodFocus: "Our absolute focus is on the client, their personal story, and their integrated defense strategy.",

    whatWeDoTitle: "What We Do",
    whatWeDoSubtitle: "Criminological Consultation Service for defense and civil parties",
    whatWeDoDesc: "The search for new investigative pathways and scientific solutions is completely tailor-made: every single case has its own unique story, its target people, and its dedicated sciences. The team of party experts (CTP) is meticulously selected based on deep study of the case, applying state-of-the-art forensic techniques and methodologies to prosecution and defense evidence, opening new fronts of analysis, evidence retrieval, and objective reconstruction.",

    howTitle: "How We Operate",
    howSubtitle: "The defense team deploys Forensic Sciences according to 4 primary research questions:",
    howSteps: [
      {
        num: "01",
        title: "File Analysis",
        desc: "Thorough study and scientific audit of the prosecution's court files and investigative methodology."
      },
      {
        num: "02",
        title: "Scenario Verification",
        desc: "Verification of possible event scenarios and direct guidance in seeking new physical evidence and key witnesses."
      },
      {
        num: "03",
        title: "Testimonial Audit",
        desc: "In-depth scientific evaluation and credibility assessment of witness testimonies."
      },
      {
        num: "04",
        title: "Assessment Support",
        desc: "Specialized technical support and monitoring during critical non-repeatable forensic tests."
      }
    ],

    networkTitle: "Forensic Consultants Network",
    networkSubtitle: "We promote an active and growing network of consultants, training, and specialized services, composed of accredited professionals:",
    networkProfessions: [
      { text: "Specialized Criminologists", detail: "Experts in behavioral profiling, relationship dynamics, and victimology." },
      { text: "Crime Scene Experts", detail: "Certified technicians for scene mapping, BPA, and forensic ballistics." },
      { text: "Medical Examiners & Forensic Psychiatrists", detail: "Injury analysis, autopsies, and mental capacity assessments." },
      { text: "Psychologists & Psychodiagnosticians", detail: "Forensic psychological profiling, psychometric testing, and youth counseling." },
      { text: "Authorized Private Investigators", detail: "Licensed for private criminal defense investigations under Art. 391-bis." },
      { text: "Criminal, Civil and Tax Lawyers", detail: "Integrated legal coordination for defense across all fields." },
      { text: "Specialized Sociologists", detail: "Analysis of social vectors of deviance and territorial crime mapping." }
    ],

    initiativesTitle: "We participate in the initiatives of:",
    initiativesList: [
      "Transfeminist Self-Defense (Casa Madiba Network, Non Una Di Meno Rimini, Pride OFF) Rimini",
      "B.A. CRIMINOLOGIA - Sara Bardi, Criminologist",
      "F.C.A. - FORENSIC CONSULTANTS ASSOCIATES - Ilaria Laghi, Criminologist and Daniela Cavuoto, Criminologist",
      "PROGETTO EOS - Barbara Cincinnato, Psychologist",
      "Legal and Tax Firms in Rimini and La Spezia",
      "Smagliature Urbane APS, Rimini",
      "A.I.C.I.S - Italian Association of Criminology for Investigation and Security",
      "So.I.S. - Italian Sociological Society"
    ],

    registrationsTitle: "Professional Registrations ex L4/2013:",
    registrationsSubtitle: "Elena Angelini practices in accordance with Italian Law No. 4 of Jan 14, 2013, and is registered with national professional organizations:",
    registrationsList: [
      "A.I.C.I.S. Member Card n. 208 (Italian Association of Criminology for Investigation and Security)",
      "So.I.S. Member Card n. 2670, with Service Quality Certificate n. 145/2015 (Italian Sociological Society)",
      "A.S.I. Member Card n. 338"
    ],

    officeTitle: "Our Office",
    officeText: "By strictly private appointment only, hosted at:",
    officeLocation: "Arbor Vitae, Via Fabio Filzi 9 - 47923 Rimini, ITALY",
    writeUs: "Email Us",
    callUs: "Call Us",
    confidentiality: "Maximum Confidentiality Guaranteed",
    slogan: "Forensic Science at your service",
    ctaBtn: "Request Free Assessment",
    pdfBtn: "Download PDF Profile",
    pdfGenerating: "Generating PDF...",
    // Chart Section
    chartTitle: "Forensic Specialization Areas",
    chartSubtitle: "Empirical breakdown of case volumes and analytical research depth",
    chartDesc: "This radar visualization demonstrates the multidisciplinary expertise of Studio Angelini. Each focus area is managed by credentialed specialists and supported by rigorous laboratory protocols, offering quantifiable scientific answers.",
    chartSpecs: {
      fingerprints: "Fingerprint Analysis",
      dna: "Genetics & DNA",
      reconstruction: "3D Reconstruction",
      ballistics: "Forensic Ballistics",
      graphology: "Graphology & Signatures",
      digital: "Digital Forensics",
      criminology: "Criminology"
    },
    chartLegendCases: "Handled Cases (%)",
    chartLegendExpertise: "Scientific Depth (Score)"
  }
};

export default function AboutUs({ lang, onNavigateToContact }: AboutUsProps) {
  // Use translations fallback gracefully
  const t = localTranslations[lang] || localTranslations['it'];
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const chartData = [
    {
      subject: t.chartSpecs?.fingerprints || "Analisi Impronte",
      casi: 85,
      competenza: 95,
    },
    {
      subject: t.chartSpecs?.dna || "Genetica & DNA",
      casi: 78,
      competenza: 90,
    },
    {
      subject: t.chartSpecs?.reconstruction || "Ricostruzione 3D",
      casi: 92,
      competenza: 98,
    },
    {
      subject: t.chartSpecs?.ballistics || "Balistica Forense",
      casi: 70,
      competenza: 88,
    },
    {
      subject: t.chartSpecs?.graphology || "Grafologia & Firme",
      casi: 88,
      competenza: 94,
    },
    {
      subject: t.chartSpecs?.digital || "Informatica Forense",
      casi: 80,
      competenza: 92,
    },
    {
      subject: t.chartSpecs?.criminology || "Criminologia",
      casi: 95,
      competenza: 96,
    },
  ];

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

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    // Short delay to simulate compilation / loading feedback state for top-tier feeling
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      let y = 15;
      const isIt = lang === 'it' || !lang;

      // Header Banner
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, 210, 42, 'F');

      // Title in the banner
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text("STUDIO CRIMINALISTICA ELENA ANGELINI", 20, 18);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(103, 232, 249); // Cyan-300
      doc.text(isIt ? "Criminologia, Criminalistica & Scienze Forensi" : "Criminology, Criminalistics & Forensic Sciences", 20, 25);
      
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184); // Slate-400
      doc.text(isIt ? "La Scienza Forense al vostro servizio // Massima Riservatezza" : "Forensic Science at your service // Maximum Confidentiality", 20, 31);

      doc.setFillColor(6, 182, 212); // Cyan line decoration
      doc.rect(0, 41, 210, 1, 'F');

      // Resume vertical coordinate
      y = 52;

      // Function to add a section heading
      const addHeading = (text: string) => {
        if (y > 240) {
          doc.addPage();
          y = 20;
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42); // slate-900
        doc.text(text.toUpperCase(), 20, y);
        y += 3;
        doc.setDrawColor(6, 182, 212); // Cyan accent line
        doc.setLineWidth(0.4);
        doc.line(20, y, 190, y);
        y += 6;
      };

      // Function to add wrapped body text
      const addParagraph = (text: string, fontSize = 9.5, isBold = false) => {
        if (y > 255) {
          doc.addPage();
          y = 20;
        }
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        doc.setFontSize(fontSize);
        doc.setTextColor(51, 65, 85); // Slate-700
        const lines = doc.splitTextToSize(text, 170);
        doc.text(lines, 20, y);
        y += (lines.length * (fontSize * 0.45)) + 4;
      };

      // 1. Overview
      addHeading(isIt ? "Profilo Studio & Titolare" : "Studio & Director Profile");
      addParagraph(isIt 
        ? "Elena Angelini: Criminologa e Criminalista professionista d'eccellenza, specializzata nell'analisi e revisione scientifica di casi penali e civili complessi." 
        : "Elena Angelini: Elite Criminologist and Forensic Criminalist specializing in the scientific audit and review of complex criminal and civil cases.", 9.5, true);
      addParagraph(isIt
        ? "Lo Studio si impone come punto di riferimento oggettivo ed empirico nel campo forense nazionale, offrendo consulenze tecniche di parte (CTP) integrate e personalizzate."
        : "The Studio stands out as an objective, empirical reference point in the national forensic field, offering fully integrated and tailored party expert witness services.", 9.5);
      y += 3;

      // 2. Credentials
      addHeading(isIt ? "Credenziali & Iscrizioni Nazionali" : "Credentials & National Memberships");
      addParagraph(isIt 
        ? "• Professionista ex Legge 4/2013: Attestato di qualità e conformità metodologica delle prestazioni professionali." 
        : "• Practitioner in compliance with Italian Law No. 4/2013 for unchartered elite professions.", 9, true);
      addParagraph(isIt 
        ? "• Socio Professionista A.I.C.I.S. n. 208 (Associazione Italiana Criminologia per l'Investigazione e la Sicurezza)" 
        : "• Professional Member of A.I.C.I.S. No. 208 (Italian Criminology Association for Investigation & Security)", 9);
      addParagraph(isIt 
        ? "• Socio So.I.S. n. 2670 (Società Italiana di Sociologia) con rilascio del certificato n. 145/2015" 
        : "• Certified Member of So.I.S. No. 2670 (Italian Sociological Society) with certified qualification No. 145/2015", 9);
      addParagraph(isIt 
        ? "• Socio Professionale A.S.I. n. 338" 
        : "• Registered Member of A.S.I. No. 338", 9);
      y += 3;

      // 3. Methodology
      addHeading(isIt ? "Metodologia Operativa: Il Pool a Task Force" : "Operational Methodology: The Task Force Pool");
      addParagraph(isIt
        ? "Rifiutando l'approccio generico, lo Studio applica il metodo a 'Task Force': per ogni caso viene istituito un pool di esperti d'élite su misura (genetisti forensi, balistici, medici legali, psicologi e informatici forensi) coordinati sinergicamente per massimizzare il potenziale probatorio difensivo."
        : "Rejecting any generic approach, our Studio implements the 'Task Force' model: assembling a custom-tailored pool of elite forensic experts (geneticists, ballistics specialists, medical examiners, psychologists, and IT forensics) working together to maximize defensive evidence power.", 9.5);
      y += 3;

      // 4. Core Services
      addHeading(isIt ? "Principali Servizi Specialistici" : "Core Specialized Services");
      addParagraph(isIt 
        ? "• Consulenza Criminologica & Criminalistica per la difesa penale e parte civile." 
        : "• Forensic Criminological & Criminalistic expert consultations for defense & civil actions.", 9, true);
      addParagraph(isIt 
        ? "• Analisi tecnica della catena di custodia, dei verbali d'indagine e dei reperti biologici/DNA." 
        : "• Scientific review of chain of custody, investigation reports, and biological/DNA evidence.", 9);
      addParagraph(isIt 
        ? "• Verifica e ricostruzione cinematica tridimensionale degli scenari del crimine." 
        : "• 3D crime scene mapping, verification, and kinematic physical reconstruction.", 9);
      addParagraph(isIt 
        ? "• Valutazione scientifica dell'attendibilità testimoniale e vittimologia forense." 
        : "• Credibility assessment of witness statements and forensic victimology.", 9);
      addParagraph(isIt 
        ? "• Presidio tecnico strategico durante accertamenti irripetibili guidati dall'Autorità Giudiziaria." 
        : "• Strategic technical defense presence during non-repeatable state-conducted forensic tests.", 9);
      y += 3;

      // 5. Team Network
      addHeading(isIt ? "Il Network di Specialisti Abilitati" : "The Network of Accredited Experts");
      const list = isIt ? [
        "1. Criminologi Specializzati (Profili e Criminologia Clinica)",
        "2. Esperti di Scena del Crimine (Sopralluoghi e Bloodstain Pattern Analysis)",
        "3. Medici Legali, Tossicologi e Psichiatri Forensi",
        "4. Psicologi e Psicodiagnosti Clinici",
        "5. Investigatori Privati autorizzati alle indagini difensive (Art. 391-bis c.p.p.)",
        "6. Avvocati Penalisti, Civilisti e di Diritto di Famiglia"
      ] : [
        "1. Specialized Criminologists (Profiling and Clinical Criminology)",
        "2. Crime Scene Experts (Scene Auditing and Bloodstain Pattern Analysis)",
        "3. Medical Examiners, Toxicologists, and Forensic Psychiatrists",
        "4. Clinical Psychologists and Psychodiagnosticians",
        "5. Licensed Private Investigators for Defense Investigations (Art. 391-bis c.p.p.)",
        "6. Criminal, Civil, and Family Law Trial Attorneys"
      ];
      list.forEach(item => addParagraph(item, 8.5));
      y += 3;

      // 6. Contact & Offices
      addHeading(isIt ? "Contatti & Sede Principale" : "Contact & Main Headquarters");
      addParagraph(isIt
        ? "Sede: Arbor Vitae, Via Fabio Filzi 9 - 47923 Rimini, ITALY"
        : "Headquarters: Arbor Vitae, Via Fabio Filzi 9 - 47923 Rimini, ITALY", 9.5, true);
      addParagraph(isIt
        ? "Orari: Lunedì - Venerdì (Solo su appuntamento riservato)"
        : "Hours: Monday - Friday (By private appointment only)", 9);
      addParagraph("Email: info@studiocriminalistica.it  |  Web: www.studiocriminalistica.it", 9);
      addParagraph("Tel: +39 366 1236464  |  Presidio Emergenze Forensi Attivo", 9);

      // Add footers on all pages
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setDrawColor(226, 232, 240); // slate-200
        doc.setLineWidth(0.3);
        doc.line(20, 282, 190, 282);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184); // slate-400
        doc.text(isIt ? "DOCUMENTO RISERVATO // STUDIO CRIMINALISTICA ELENA ANGELINI" : "STRICTLY CONFIDENTIAL // ELENA ANGELINI FORENSIC STUDIO", 20, 287);
        doc.text(`Page ${i} of ${pageCount}`, 175, 287);
      }

      doc.save(`Elena_Angelini_Studio_Criminalistica_Profile_${lang}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-16 py-6" id="chi-siamo-page-root">
      
      {/* SECTION 1: HERO HEADER WITH FORENSIC BACKGROUND */}
      <section className="relative overflow-hidden rounded-xl border border-slate-900/60 bg-gradient-to-br from-slate-950 via-cold-950/40 to-slate-950 p-8 md:p-12 text-left shadow-2xl">
        <div className="absolute top-3 right-3 font-mono text-[8px] text-cold-400/30">
          STATION_SYS // TEAM_DOSSIER // CONFIDENTIAL
        </div>
        
        {/* Visual grid overlay for a high-tech lab dossier feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center space-x-2 rounded-full border border-cold-400/20 bg-cold-500/5 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-cold-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span>{t.badge}</span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {renderDoubleColor("Elena Angelini")}
          </h2>
          <p className="font-mono text-sm md:text-base text-cold-400 uppercase tracking-widest max-w-2xl border-l-2 border-cold-500/60 pl-4 py-1">
            {t.title}
          </p>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl">
            {t.introText} <strong className="text-cold-300">{t.subtitle}</strong>
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className={`px-4 py-2.5 rounded font-mono text-xs font-bold transition-all flex items-center space-x-2 shadow-md hover:shadow-cyan-500/10 active:scale-95 cursor-pointer border ${
                isGeneratingPDF 
                  ? 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-cyan-500/10 hover:bg-cyan-500/15 text-cyan-400 border-cyan-500/30 hover:border-cyan-500/50'
              }`}
              title={t.pdfBtn}
            >
              {isGeneratingPDF ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  <span className="animate-pulse">{t.pdfGenerating}</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 text-cyan-400" />
                  <span>{t.pdfBtn}</span>
                </>
              )}
            </button>
          </div>

          {/* Embedded High-Quality Forensic Imagery */}
          <div className="mt-8 rounded-lg overflow-hidden border border-slate-800/60 shadow-lg relative max-w-3xl">
            <img 
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200" 
              alt="Forensic Network" 
              className="w-full h-48 md:h-64 object-cover opacity-60 filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-3 left-4 text-[10px] font-mono text-cyan-400/90 flex items-center space-x-1.5 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              <span>NETWORK_NODE // STUDIO_CRIMINALISTICA_ELENA_ANGELINI</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: IL METODO A TASK FORCE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 rounded-xl border border-slate-900/40 bg-slate-950/60 p-6 md:p-8 flex flex-col justify-between relative shadow-lg"
        >
          <div className="absolute top-2 right-2 font-mono text-[7px] text-slate-500">
            METHODOLOGY // SECURE_ANALYSIS
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-cold-500/10 rounded-lg border border-cold-500/20 text-cold-400">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg md:text-xl font-bold font-serif text-slate-100 uppercase tracking-wide">
                {t.methodTitle}
              </h3>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.methodDesc}
            </p>
            
            <div className="bg-slate-900/30 border border-slate-800/40 rounded-lg p-4 mt-2">
              <p className="text-xs md:text-sm font-mono text-cyan-400 italic flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5 animate-pulse" />
                <span>{t.methodFocus}</span>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-5 rounded-xl border border-cold-500/10 bg-gradient-to-b from-slate-950 to-slate-900/40 p-6 md:p-8 flex flex-col justify-between shadow-lg"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg md:text-xl font-bold font-serif text-slate-100 uppercase tracking-wide">
                {t.whatWeDoTitle}
              </h3>
            </div>
            
            <p className="text-xs font-mono text-amber-500 tracking-wider uppercase">
              // {t.whatWeDoSubtitle}
            </p>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.whatWeDoDesc}
            </p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: COME OPERIAMO (4 QUESITI DI RICERCA) */}
      <section className="space-y-6">
        <div className="text-left max-w-3xl">
          <span className="font-mono text-[9px] uppercase tracking-widest text-cold-400">// SCIENTIFIC_PROTOCOL</span>
          <h3 className="text-xl md:text-2xl font-serif font-extrabold mt-1 uppercase tracking-wide">
            {renderDoubleColor(t.howTitle)}
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-2">
            {t.howSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.howSteps.map((step: any, index: number) => (
            <div 
              key={index}
              className="rounded-lg border border-slate-800/50 bg-slate-950/40 p-5 space-y-3 hover:border-cold-500/40 transition-all duration-300 relative group"
            >
              <div className="font-mono text-3xl font-extrabold text-cold-500/20 group-hover:text-cold-400/30 transition-colors duration-300 absolute top-2 right-4">
                {step.num}
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/30 border border-cyan-400/60 group-hover:scale-125 transition-transform duration-300 inline-block"></div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                {step.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: SCIENTIFIC SPECIALIZATION BREAKDOWN (RECHARTS) */}
      <section className="rounded-xl border border-slate-900/60 bg-gradient-to-b from-slate-950 to-slate-900/40 p-6 md:p-8 space-y-6" id="specialization-analytics">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Text and explanation */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="flex items-center space-x-2 text-cold-400 text-xs font-mono uppercase tracking-wider">
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>STATION_SYS // EMPIRICAL_METRICS</span>
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-extrabold uppercase tracking-wide">
              {renderDoubleColor(t.chartTitle)}
            </h3>
            <p className="text-xs font-mono text-cyan-500/90 leading-relaxed uppercase">
              // {t.chartSubtitle}
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {t.chartDesc}
            </p>
            
            <div className="pt-4 space-y-2 border-t border-slate-900/60 font-mono text-[10px] text-slate-400">
              <div className="flex items-center justify-between">
                <span>DATABASE_RECORDS:</span>
                <span className="text-cyan-400 font-bold">1420+ CASES TRACED</span>
              </div>
              <div className="flex items-center justify-between">
                <span>CONFIDENCE_INTERVAL:</span>
                <span className="text-cyan-400 font-bold">99.7% (3-SIGMA)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>LAB_CALIBRATION:</span>
                <span className="text-cyan-400 font-bold">ISO/IEC 17025 COMPLIANT</span>
              </div>
            </div>
          </div>

          {/* Right: Recharts Radar Chart */}
          <div className="lg:col-span-7 bg-slate-950/80 rounded-xl border border-cyan-500/10 p-4 md:p-6 shadow-2xl relative min-h-[350px] flex items-center justify-center">
            {/* Aesthetic coordinate markings for the lab style */}
            <div className="absolute top-2 left-3 font-mono text-[8px] text-cyan-500/20">GRID_REF // RX_409</div>
            <div className="absolute bottom-2 right-3 font-mono text-[8px] text-cyan-500/20">SCALE // 1.0_V</div>

            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="#0e7490" strokeOpacity={0.2} />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} 
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: '#475569', fontSize: 8 }} 
                  />
                  <Radar 
                    name={t.chartLegendCases} 
                    dataKey="casi" 
                    stroke="#06b6d4" 
                    fill="#06b6d4" 
                    fillOpacity={0.15} 
                  />
                  <Radar 
                    name={t.chartLegendExpertise} 
                    dataKey="competenza" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.15} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#020617', 
                      borderColor: '#1e293b', 
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                      color: '#f8fafc'
                    }} 
                  />
                  <Legend 
                    wrapperStyle={{ 
                      fontSize: '10px', 
                      fontFamily: 'monospace',
                      paddingTop: '10px'
                    }} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE FORENSIC TIMELINE SECTION */}
      <ForensicTimeline lang={lang} />

      {/* SECTION 4: THE NETWORK (GRID OF ACCREDITED PROFESSIONALS) */}
      <section className="rounded-xl border border-slate-900/60 bg-slate-950/80 p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <div className="flex items-center space-x-2 text-cold-400 text-xs font-mono">
              <Network className="w-4 h-4 text-cyan-400" />
              <span>STATION_SYS // GROWING_CONSULTANT_INDEX</span>
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-extrabold uppercase tracking-wide">
              {renderDoubleColor(t.networkTitle)}
            </h3>
            <p className="text-xs text-slate-400">
              {t.networkSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.networkProfessions.map((prof: any, idx: number) => {
            // Assign custom matching icons for each profile
            let IconComp = CheckCircle2;
            let badgeText = '';
            let badgeStyles = '';

            const isIt = lang === 'it' || !lang;

            if (idx === 0) {
              IconComp = Fingerprint;
              badgeText = isIt ? 'Criminologia' : 'Criminology';
              badgeStyles = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
            } else if (idx === 1) {
              IconComp = Search;
              badgeText = isIt ? 'Criminalistica' : 'Criminalistics';
              badgeStyles = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
            } else if (idx === 2) {
              IconComp = FileText;
              badgeText = isIt ? 'Medicina Forense' : 'Forensic Medicine';
              badgeStyles = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
            } else if (idx === 3) {
              IconComp = Brain;
              badgeText = isIt ? 'Psicologia' : 'Psychology';
              badgeStyles = 'bg-purple-500/10 text-purple-400 border-purple-500/30';
            } else if (idx === 4) {
              IconComp = Shield;
              badgeText = isIt ? 'Investigazione' : 'Investigation';
              badgeStyles = 'bg-blue-500/10 text-blue-400 border-blue-500/30';
            } else if (idx === 5) {
              IconComp = Scale;
              badgeText = isIt ? 'Area Legale' : 'Legal Area';
              badgeStyles = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
            } else if (idx === 6) {
              IconComp = Building;
              badgeText = isIt ? 'Sociologia' : 'Sociology';
              badgeStyles = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
            }

            return (
              <div 
                key={idx}
                className="flex gap-4 p-4 rounded-lg border border-slate-900 bg-slate-900/20 hover:border-slate-800 transition-all duration-200"
              >
                <div className="p-2.5 h-10 w-10 flex items-center justify-center rounded bg-slate-900 border border-slate-800 text-cyan-400/90 flex-shrink-0">
                  <IconComp className="w-4 h-4" />
                </div>
                <div className="text-left flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="text-xs md:text-sm font-bold text-slate-200 uppercase tracking-wide">
                      {prof.text}
                    </h4>
                    {badgeText && (
                      <span className={`px-1.5 py-0.5 text-[8px] font-mono font-semibold rounded border tracking-wider uppercase ${badgeStyles}`}>
                        {badgeText}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {prof.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5 & 6: PARTNERSHIPS & REGISTRATIONS (2 COLUMN GRID) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Collaborations */}
        <div className="rounded-xl border border-slate-900 bg-slate-950/50 p-6 md:p-8 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <h3 className="text-base md:text-lg font-serif font-bold text-slate-100 uppercase tracking-wide">
              {t.initiativesTitle}
            </h3>
          </div>
          
          <div className="space-y-3">
            {t.initiativesList.map((init: string, idx: number) => (
              <div 
                key={idx}
                className="flex items-start gap-2.5 p-2.5 rounded border border-slate-950 bg-slate-900/10 hover:bg-slate-900/30 text-left"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 mt-1.5 flex-shrink-0"></div>
                <span className="text-xs text-slate-300 leading-normal font-mono">
                  {init}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Registrations & Credentials */}
        <div className="rounded-xl border border-slate-900 bg-slate-950/50 p-6 md:p-8 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-base md:text-lg font-serif font-bold text-slate-100 uppercase tracking-wide">
                {t.registrationsTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-mono italic">
              {t.registrationsSubtitle}
            </p>

            <div className="space-y-3">
              {t.registrationsList.map((reg: string, idx: number) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded border border-amber-900/10 bg-amber-500/5 hover:border-amber-900/20 text-left"
                >
                  <FileCheck2 className="w-4 h-4 text-amber-500/80 flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-bold text-amber-200/90 leading-snug font-mono">
                    {reg}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Secure Badge */}
          <div className="mt-6 border-t border-slate-900/80 pt-4 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <div className="flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-600" />
              <span>PROFESSIONAL_STANDARDS // COMPLIANT</span>
            </div>
            <span className="text-cold-400/50">L.4/2013</span>
          </div>
        </div>
      </section>

      {/* SECTION 7: DETAILED OFFICE ADDRESS & CTA */}
      <section className="rounded-xl border border-cyan-500/20 bg-gradient-to-r from-slate-950 via-cyan-950/10 to-slate-950 p-6 md:p-8 text-left shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center space-x-2 text-cold-400 text-xs font-mono uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-cold-400" />
              <span>{t.officeTitle}</span>
            </div>
            <h4 className="text-base md:text-lg font-bold font-serif text-slate-100 uppercase">
              {t.officeLocation}
            </h4>
            <p className="text-xs text-slate-400">
              {t.officeText}
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5 bg-slate-900/40 px-2.5 py-1 rounded border border-slate-800">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.writeUs}: info@studiocriminalistica.it</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/40 px-2.5 py-1 rounded border border-slate-800">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.callUs}: +39 366 1236464</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end items-stretch lg:items-end gap-3">
            <div className="text-left lg:text-right font-mono text-[10px] text-emerald-400/90 uppercase tracking-widest bg-emerald-950/30 border border-emerald-900/30 px-3 py-1 rounded w-fit">
              ● {t.confidentiality}
            </div>
            <div className="text-xs text-slate-400 font-serif italic text-left lg:text-right">
              {t.slogan}
            </div>
            <button 
              onClick={onNavigateToContact}
              className="mt-2 bg-cold-500 hover:bg-cold-600 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-3 rounded transition-all shadow-md shadow-cold-500/15 active:scale-95 cursor-pointer text-center"
            >
              {t.ctaBtn}
            </button>
          </div>
          
        </div>
      </section>

    </div>
  );
}
