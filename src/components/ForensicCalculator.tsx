import { useState, useEffect } from 'react';
import { 
  Calculator, 
  Clock, 
  FileText, 
  AlertOctagon, 
  Scale, 
  HelpCircle,
  FileCheck2,
  Sliders,
  Send,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';

interface ForensicCalculatorProps {
  lang: Language;
  onNavigateToContact: () => void;
}

type ExpertiseType = 'grafologia' | 'balistica' | 'scena' | 'digital' | 'criminologia';

export default function ForensicCalculator({ lang, onNavigateToContact }: ForensicCalculatorProps) {
  const isIt = lang === 'it' || !lang;

  // State parameters
  const [expertiseType, setExpertiseType] = useState<ExpertiseType>('grafologia');
  const [numItems, setNumItems] = useState<number>(3); // documents, signatures, shell casings, bullet holes, files etc.
  const [surveyHours, setSurveyHours] = useState<number>(4); // physical lab or on-scene inspection hours
  const [isUrgent, setIsUrgent] = useState<boolean>(false);
  const [roleType, setRoleType] = useState<'ctp' | 'ctu' | 'stragiudiziale'>('ctp');

  // Outputs
  const [complexityScore, setComplexityScore] = useState<number>(35); // 0-100 scale
  const [estimatedDays, setEstimatedDays] = useState<number>(15);
  const [phaseBreakdown, setPhaseBreakdown] = useState<{ name: string; percent: number }[]>([]);
  const [approxPriceMin, setApproxPriceMin] = useState<number>(500);
  const [approxPriceMax, setApproxPriceMax] = useState<number>(1200);

  // Translations
  const t = {
    it: {
      title: "Calcolatrice Forense & Stima Complessità",
      subtitle: "Strumento di analisi empirica per valutazioni preliminari",
      intro: "Inserisci i parametri generali del caso per generare una stima algoritmica sulla complessità procedurale, sui tempi presunti di lavorazione e su un orientamento di costo indicativo in conformità alle tariffe standard di settore.",
      
      labelExpertise: "Tipo di Accertamento Forense",
      labelNumItems: "Quantità di Elementi / Campioni da Analizzare",
      hintNumItems: {
        grafologia: "Numero di firme, testamenti o scritti comparativi",
        balistica: "Bossoli, proiettili, fori d'impatto o armi da esaminare",
        scena: "Reperti fisici o campioni tracciati sulla scena del crimine",
        digital: "Dispositivi (smartphone, hard-disk) o giga di dati da estrarre",
        criminologia: "Soggetti da esaminare, testimonianze o faldoni processuali"
      },
      labelSurveyHours: "Ore Stimate di Sopralluogo / Laboratorio",
      hintSurveyHours: "Accesso ai luoghi, rilievi fotografici, microscopia, estrazioni bitstream o interviste",
      labelUrgency: "Livello di Urgenza dell'Incarico",
      urgencyStandard: "Standard (Tempi Ordinari)",
      urgencyHigh: "Prioritario (Consegna entro 7-10 giorni lavorativi)",
      labelRole: "Inquadramento Giuridico del Ruolo",
      roleCtp: "Consulente Tecnico di Parte (CTP per difesa/parti)",
      roleCtu: "Consulente Tecnico d'Ufficio o Perito (Nominato dal Giudice)",
      roleExtra: "Parere Pro-Veritate / Stragiudiziale (Privati o pareri preventivi)",

      resultsTitle: "Report di Valutazione Preliminare",
      resultsComplexity: "Indice di Complessità",
      complexityStandard: "Bassa Complessità (Standard)",
      complexityMedium: "Media Complessità",
      complexityHigh: "Alta Complessità",
      complexityCritical: "Criticità Elevata (Multidisciplinare)",

      estTime: "Tempo Stimato di Lavorazione",
      daysUnit: "Giorni lavorativi",
      priceRange: "Orientamento Onorario Indicativo",
      priceDisclaimer: "Nota: La stima ha valore puramente orientativo. Il preventivo definitivo viene redatto a seguito di disamina della documentazione o del fascicolo in sede di colloquio conoscitivo.",
      
      phasesTitle: "Ripartizione dello Sforzo Scientifico",
      phasePrep: "Disamina atti e Studio Preliminare",
      phaseLab: "Esame Tecnico & Laboratorio Strumentale",
      phaseDraft: "Stesura Relazione & Analisi Statistica",
      phaseSponsor: "Asseverazione / Supporto Legale di Parte",

      ctaBtn: "Richiedi Preventivo e Studio Caso",
      calcBtn: "Ricalcola Parametri"
    },
    en: {
      title: "Forensic Calculator & Complexity Estimator",
      subtitle: "Empirical evaluation tool for initial assessments",
      intro: "Enter the general parameters of your case to generate an algorithmic estimate of the procedural complexity, expected turnaround time, and an indicative pricing guide in compliance with standard industry rates.",
      
      labelExpertise: "Type of Forensic Investigation",
      labelNumItems: "Quantity of Elements / Samples to Analyze",
      hintNumItems: {
        grafologia: "Number of signatures, testaments or comparative writings",
        balistica: "Casing, bullets, impact holes or weapons to examine",
        scena: "Physical evidence or specimens collected at the crime scene",
        digital: "Devices (smartphones, HDDs) or gigabytes of digital data",
        criminologia: "Subjects to interview, statements or case files"
      },
      labelSurveyHours: "Estimated On-Scene / Lab Hours",
      hintSurveyHours: "Access to premises, photographic mapping, microscopy, bitstream extractions, or interviews",
      labelUrgency: "Task Urgency Level",
      urgencyStandard: "Standard (Regular Turnaround)",
      urgencyHigh: "Urgent (Delivery in 7-10 business days)",
      labelRole: "Legal Framework Role",
      roleCtp: "Technical Witness for Defense (CTP)",
      roleCtu: "Court-Appointed Expert Witness (CTU/Perito)",
      roleExtra: "Out-of-court Opinion / Advisory (Private assessment)",

      resultsTitle: "Preliminary Assessment Report",
      resultsComplexity: "Complexity Index",
      complexityStandard: "Low Complexity (Standard)",
      complexityMedium: "Medium Complexity",
      complexityHigh: "High Complexity",
      complexityCritical: "Critical Complexity (Multidisciplinary)",

      estTime: "Estimated Turnaround Time",
      daysUnit: "Business days",
      priceRange: "Indicative Fee Orientation",
      priceDisclaimer: "Note: This estimate is purely indicative. The formal final quote is drawn up only after reviewing physical documents or official case records during our initial consultation.",
      
      phasesTitle: "Scientific Effort Breakdown",
      phasePrep: "Case File Review & Preliminaries",
      phaseLab: "Technical Examination & Lab Analysis",
      phaseDraft: "Drafting Report & Statistical Control",
      phaseSponsor: "Sworn Validation & Legal Support",

      ctaBtn: "Request Quote & Case Review",
      calcBtn: "Recalculate Parameters"
    }
  };

  const active = t[lang] || t['it'];

  // Recalculate logic when variables change
  useEffect(() => {
    // 1. Calculate Complexity Score (0 - 100)
    let baseComp = 15;
    
    // Type modifiers
    if (expertiseType === 'grafologia') baseComp += 10;
    if (expertiseType === 'balistica') baseComp += 25;
    if (expertiseType === 'scena') baseComp += 35;
    if (expertiseType === 'digital') baseComp += 20;
    if (expertiseType === 'criminologia') baseComp += 18;

    // Items modifier (logarithmic feel)
    baseComp += Math.min(numItems * 4, 30);

    // Hours modifier
    baseComp += Math.min(surveyHours * 2.5, 25);

    // Role modifier
    if (roleType === 'ctu') baseComp += 10; // courtroom rigor
    if (roleType === 'ctp') baseComp += 5;

    // Cap at 100
    const finalComp = Math.min(Math.max(baseComp, 10), 100);
    setComplexityScore(Math.round(finalComp));

    // 2. Turnaround Days Estimation
    let days = 10;
    days += Math.round(finalComp * 0.4);
    if (isUrgent) {
      days = Math.max(Math.round(days * 0.45), 7); // speed up considerably
    }
    setEstimatedDays(days);

    // 3. Price Estimation (Indicative)
    let minPrice = 350;
    let maxPrice = 800;

    if (expertiseType === 'grafologia') {
      minPrice = 400 + (numItems * 80);
      maxPrice = 800 + (numItems * 150) + (surveyHours * 60);
    } else if (expertiseType === 'balistica') {
      minPrice = 700 + (numItems * 120);
      maxPrice = 1600 + (numItems * 250) + (surveyHours * 80);
    } else if (expertiseType === 'scena') {
      minPrice = 900 + (surveyHours * 100);
      maxPrice = 2200 + (numItems * 150) + (surveyHours * 180);
    } else if (expertiseType === 'digital') {
      minPrice = 500 + (numItems * 150);
      maxPrice = 1400 + (numItems * 300) + (surveyHours * 70);
    } else if (expertiseType === 'criminologia') {
      minPrice = 600 + (surveyHours * 80);
      maxPrice = 1500 + (numItems * 100) + (surveyHours * 120);
    }

    // Role multiplier
    if (roleType === 'ctu') {
      minPrice *= 1.15;
      maxPrice *= 1.25;
    }

    // Urgency multiplier
    if (isUrgent) {
      minPrice *= 1.3;
      maxPrice *= 1.4;
    }

    // Round to clean hundreds
    setApproxPriceMin(Math.round(minPrice / 50) * 50);
    setApproxPriceMax(Math.round(maxPrice / 50) * 50);

    // 4. Effort breakdown calculation
    let prep = 25;
    let lab = 35;
    let draft = 25;
    let sponsor = 15;

    if (expertiseType === 'grafologia') {
      prep = 20; lab = 45; draft = 20; sponsor = 15;
    } else if (expertiseType === 'balistica') {
      prep = 15; lab = 50; draft = 20; sponsor = 15;
    } else if (expertiseType === 'scena') {
      prep = 30; lab = 35; draft = 15; sponsor = 20;
    } else if (expertiseType === 'digital') {
      prep = 15; lab = 55; draft = 20; sponsor = 10;
    } else if (expertiseType === 'criminologia') {
      prep = 35; lab = 20; draft = 25; sponsor = 20;
    }

    setPhaseBreakdown([
      { name: active.phasePrep, percent: prep },
      { name: active.phaseLab, percent: lab },
      { name: active.phaseDraft, percent: draft },
      { name: active.phaseSponsor, percent: sponsor }
    ]);

  }, [expertiseType, numItems, surveyHours, isUrgent, roleType, lang]);

  // Determine Complexity Label and Color
  const getComplexityDetails = (score: number) => {
    if (score < 30) {
      return { text: active.complexityStandard, color: 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20' };
    } else if (score < 60) {
      return { text: active.complexityMedium, color: 'text-cyan-400 border-cyan-500/20 bg-cyan-950/20' };
    } else if (score < 85) {
      return { text: active.complexityHigh, color: 'text-amber-400 border-amber-500/20 bg-amber-950/20' };
    } else {
      return { text: active.complexityCritical, color: 'text-red-400 border-red-500/20 bg-red-950/20' };
    }
  };

  const compDetails = getComplexityDetails(complexityScore);

  return (
    <div id="forensic-calculator-component" className="rounded-xl border border-slate-900/60 bg-gradient-to-b from-slate-950 to-slate-900/50 p-6 md:p-8 space-y-6 text-left relative overflow-hidden shadow-2xl">
      {/* Absolute Tech Elements */}
      <div className="absolute top-3 right-4 font-mono text-[8px] text-cyan-500/30">
        SYS // ANALYSIS_CALCULATOR_v1.0.8 // STABLE
      </div>
      
      {/* Header */}
      <div className="space-y-2 border-b border-slate-900/60 pb-5">
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
          <Calculator className="w-4.5 h-4.5" />
          <span>STATION_SYS // {isIt ? 'CALCOLATRICE_FORENSE' : 'FORENSIC_CALCULATOR'}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-serif font-extrabold text-slate-100 uppercase tracking-wide">
          {active.title}
        </h3>
        <p className="text-xs text-slate-400 max-w-4xl leading-relaxed">
          {active.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
        {/* Left Side: Parameters Slider/Selectors */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* 1. Type of Investigation Select */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center space-x-2">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span>{active.labelExpertise}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'grafologia', label: isIt ? 'Perizia Grafologica' : 'Graphology perizia' },
                { id: 'balistica', label: isIt ? 'Balistica 3D' : '3D Ballistics' },
                { id: 'scena', label: isIt ? 'Scena del Crimine' : 'Crime Scene' },
                { id: 'digital', label: isIt ? 'Digital Forensics' : 'Digital Forensics' },
                { id: 'criminologia', label: isIt ? 'Criminologia' : 'Criminology' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setExpertiseType(item.id as ExpertiseType)}
                  className={`px-3 py-2 text-left rounded font-mono text-xs border transition-all cursor-pointer ${
                    expertiseType === item.id 
                      ? 'bg-cyan-500/10 border-cyan-500/60 text-cyan-300 font-bold'
                      : 'bg-slate-950/80 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span className="block truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Slider - Number of elements */}
          <div className="space-y-2 bg-slate-950/40 p-4 rounded-lg border border-slate-900/60">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>{active.labelNumItems}</span>
              </span>
              <span className="text-cyan-400 font-bold text-sm">{numItems}</span>
            </div>
            
            <input
              type="range"
              min="1"
              max="35"
              value={numItems}
              onChange={(e) => setNumItems(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer bg-slate-900"
            />
            
            <p className="text-[10px] font-mono text-slate-500">
              {expertiseType === 'grafologia' && active.hintNumItems.grafologia}
              {expertiseType === 'balistica' && active.hintNumItems.balistica}
              {expertiseType === 'scena' && active.hintNumItems.scena}
              {expertiseType === 'digital' && active.hintNumItems.digital}
              {expertiseType === 'criminologia' && active.hintNumItems.criminologia}
            </p>
          </div>

          {/* 3. Slider - Lab Hours */}
          <div className="space-y-2 bg-slate-950/40 p-4 rounded-lg border border-slate-900/60">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{active.labelSurveyHours}</span>
              </span>
              <span className="text-cyan-400 font-bold text-sm">{surveyHours}h</span>
            </div>
            
            <input
              type="range"
              min="1"
              max="40"
              value={surveyHours}
              onChange={(e) => setSurveyHours(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer bg-slate-900"
            />
            
            <p className="text-[10px] font-mono text-slate-500">
              {active.hintSurveyHours}
            </p>
          </div>

          {/* 4. Select Role and Urgency Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="space-y-2">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                {active.labelRole}
              </label>
              <select
                value={roleType}
                onChange={(e) => setRoleType(e.target.value as 'ctp' | 'ctu' | 'stragiudiziale')}
                className="w-full bg-slate-950 border border-slate-900 rounded px-3 py-2 text-slate-300 font-mono text-xs focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                <option value="ctp">{active.roleCtp}</option>
                <option value="ctu">{active.roleCtu}</option>
                <option value="stragiudiziale">{active.roleExtra}</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                {active.labelUrgency}
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setIsUrgent(false)}
                  className={`flex-1 py-2 font-mono text-[10px] rounded border transition-all cursor-pointer ${
                    !isUrgent
                      ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 font-bold'
                      : 'bg-slate-950/80 border-slate-900 text-slate-500 hover:border-slate-800'
                  }`}
                >
                  {active.urgencyStandard}
                </button>
                <button
                  type="button"
                  onClick={() => setIsUrgent(true)}
                  className={`flex-1 py-2 font-mono text-[10px] rounded border transition-all cursor-pointer ${
                    isUrgent
                      ? 'bg-red-500/15 border-red-500/50 text-red-400 font-bold animate-pulse'
                      : 'bg-slate-950/80 border-slate-900 text-slate-500 hover:border-slate-800'
                  }`}
                >
                  {active.urgencyHigh}
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Side: Generated Report & Visual Gauges */}
        <div className="lg:col-span-5 bg-slate-950 rounded-xl border border-cyan-500/10 p-5 shadow-2xl space-y-6 relative flex flex-col justify-between">
          <div className="space-y-5">
            <div className="border-b border-slate-900 pb-3 flex items-center justify-between">
              <h4 className="font-mono text-xs text-slate-300 uppercase tracking-widest flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>{active.resultsTitle}</span>
              </h4>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/15">
                DECISION_SECURE
              </span>
            </div>

            {/* Complexity Meter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                <span>{active.resultsComplexity}</span>
                <span className="font-bold text-slate-200">{complexityScore}%</span>
              </div>
              
              {/* ProgressBar */}
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800/80">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    complexityScore < 30 ? 'bg-emerald-500' :
                    complexityScore < 60 ? 'bg-cyan-500' :
                    complexityScore < 85 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${complexityScore}%` }}
                ></div>
              </div>

              {/* Status Badge Tag */}
              <div className={`mt-2 border rounded py-1.5 px-3 text-xs font-mono text-center font-bold ${compDetails.color}`}>
                {compDetails.text}
              </div>
            </div>

            {/* Time Turnaround Indicator */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-900 space-y-1">
                <span className="text-[9px] font-mono text-slate-500 block uppercase">{active.estTime}</span>
                <span className="text-base font-mono font-bold text-cyan-400">~ {estimatedDays} {active.daysUnit}</span>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-900 space-y-1">
                <span className="text-[9px] font-mono text-slate-500 block uppercase">{isIt ? 'RILIEVO REPERTI' : 'SAMPLES COUNT'}</span>
                <span className="text-base font-mono font-bold text-cyan-400">{numItems} {isIt ? 'Reperti' : 'Samples'}</span>
              </div>
            </div>

            {/* Approximate Pricing Range */}
            <div className="bg-gradient-to-r from-slate-900/80 to-slate-950 p-4 rounded-lg border border-cyan-500/10 space-y-1.5">
              <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider">{active.priceRange}</span>
              <div className="text-xl md:text-2xl font-mono font-extrabold text-emerald-400">
                € {approxPriceMin} - € {approxPriceMax} <span className="text-[10px] text-slate-400 font-normal uppercase">{isIt ? '+ oneri legali' : '+ legal fees'}</span>
              </div>
              <p className="text-[9px] font-mono text-slate-500 leading-normal">
                {active.priceDisclaimer}
              </p>
            </div>

            {/* Scientific Effort Phase Breakdown */}
            <div className="space-y-2 pt-1">
              <span className="text-[9px] font-mono text-slate-400 block uppercase tracking-widest">{active.phasesTitle}</span>
              <div className="space-y-2">
                {phaseBreakdown.map((phase, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>{phase.name}</span>
                      <span className="text-cyan-400">{phase.percent}%</span>
                    </div>
                    <div className="w-full bg-slate-900/60 h-1 rounded overflow-hidden">
                      <div className="bg-cyan-500/60 h-full" style={{ width: `${phase.percent}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action Trigger Button */}
          <div className="pt-4 border-t border-slate-900/60">
            <button
              onClick={onNavigateToContact}
              id="calc-cta-submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-mono font-extrabold text-xs uppercase tracking-wider py-3.5 rounded transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 active:scale-95"
            >
              <Send className="w-4 h-4 text-slate-950" />
              <span>{active.ctaBtn}</span>
            </button>
          </div>

        </div>
      </div>
      
    </div>
  );
}
