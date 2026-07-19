import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Coins, 
  MapPin, 
  FileText, 
  Shield, 
  Scale, 
  Car, 
  Search, 
  ChevronDown, 
  AlertCircle, 
  ArrowRight,
  Info
} from 'lucide-react';
import { Language } from '../types';
import SectionLogo from './SectionLogo';

interface TariffeRiminiProps {
  lang: Language;
  onNavigateToContact: () => void;
}

type ServiceType = 'criminologia' | 'investigazioni' | 'calligrafia' | 'balistica';
type DocType = 'none' | 'fascicolo' | 'testamento' | 'rilievi';

export default function TariffeRimini({ lang, onNavigateToContact }: TariffeRiminiProps) {
  // Calculator States
  const [selectedService, setSelectedService] = useState<ServiceType>('criminologia');
  const [hours, setHours] = useState<number>(10);
  const [isOutsideRimini, setIsOutsideRimini] = useState<boolean>(false);
  const [distanceKm, setDistanceKm] = useState<number>(30);
  const [showCalligrafiaDetail, setShowCalligrafiaDetail] = useState<'preliminare' | 'ufficiale'>('preliminare');

  // Document Analyzer States
  const [selectedDoc, setSelectedDoc] = useState<DocType>('none');

  // Localized terms
  const isIt = lang === 'it';

  // Calculator logic
  const calculateEstimate = () => {
    let minRate = 0;
    let maxRate = 0;
    let details = '';

    const travelCost = isOutsideRimini ? distanceKm * 0.90 : 0;

    switch (selectedService) {
      case 'criminologia':
        minRate = 80 * hours;
        maxRate = 150 * hours;
        details = isIt 
          ? `Consulenza crimini, analisi fascicolo penale e profiling. Basato su una tariffa di €80 - €150/ora.`
          : `Criminal consulting, file analysis & profiling. Based on €80 - €150/hr rate.`;
        break;
      case 'investigazioni':
        // Module checks: Argo has modules of 4 hours
        const actualHours = Math.max(hours, 4);
        minRate = 50 * actualHours;
        maxRate = 90 * actualHours;
        details = isIt
          ? `Sopralluoghi, pedinamenti e catena di custodia (min. 4 ore consecutive). Basato su €50 - €90/ora.`
          : `Surveys, tailing & evidence chain (min. 4 hour modules). Based on €50 - €90/hr.`;
        break;
      case 'calligrafia':
        if (showCalligrafiaDetail === 'preliminare') {
          minRate = 600;
          maxRate = 1000;
          details = isIt
            ? `Parere scritto preliminare di fattibilità per firme o testamenti contestati.`
            : `Preliminary written feasibility opinion for contested signatures/wills.`;
        } else {
          minRate = 1100;
          maxRate = 2000;
          details = isIt
            ? `Relazione peritale ufficiale asseverata per uso legale in Tribunale.`
            : `Official court-certified handwriting report.`;
        }
        break;
      case 'balistica':
        minRate = 1000;
        maxRate = 2500;
        details = isIt
          ? `Rilievi traiettorie 3D d'arma da fuoco, analisi residui e prove balistiche di laboratorio.`
          : `Firearms 3D trajectory surveys, residues analysis & lab testing.`;
        break;
    }

    return {
      min: Math.round(minRate + travelCost),
      max: Math.round(maxRate + travelCost),
      travel: Math.round(travelCost),
      details
    };
  };

  const estimate = calculateEstimate();

  // Document Analyzer Content
  const docRecommendations: Record<DocType, {
    title: string;
    tests: string[];
    costExtra: string;
    actionPlan: string;
  }> = {
    none: {
      title: isIt ? "Consulenza Generale Preliminare" : "General Preliminary Consulting",
      tests: isIt 
        ? ["Colloquio orientativo per inquadramento del caso", "Analisi di fattibilità tecnico-giuridica"]
        : ["Introductory evaluation call", "Technical-legal feasibility analysis"],
      costExtra: isIt ? "Primo colloquio telefonico gratuito." : "Initial phone call is free of charge.",
      actionPlan: isIt
        ? "Consigliamo di raccogliere ogni elemento noto prima del colloquio telefonico."
        : "Gather all available facts prior to booking your free evaluation call."
    },
    fascicolo: {
      title: isIt ? "Analisi Fascicolo Penale & Indagini Difensive" : "Criminal File Analysis & Defense Investigations",
      tests: isIt
        ? ["Analisi scientifica dei verbali di sopralluogo", "Riesame tridimensionale della scena tramite software FORA", "Analisi medico-legale indiretta"]
        : ["Scientific review of scene reports", "3D scene reconstruction via FORA software", "Indirect forensic pathology assessment"],
      costExtra: isIt
        ? "Da concordare a pacchetto (forfait) in base alla mole di faldoni e documenti."
        : "Flat rate packages configured individually based on file/folder volume.",
      actionPlan: isIt
        ? "Richiedi un preventivo scritto depositato conforme ai massimi di Prefettura. Lo studio elaborerà un piano di indagine dettagliato."
        : "Request a formal written quote. The studio will draft a comprehensive, itemized investigative defense budget."
    },
    testamento: {
      title: isIt ? "Verifica Testamento / Firme Contestate" : "Will Verification / Contested Signatures",
      tests: isIt
        ? ["Analisi microscopica ottica del supporto cartaceo", "Spettroscopia all'infrarosso dei raccordi d'inchiostro", "Verifica comparativa con documenti coevi di confronto"]
        : ["Optical microscopy paper analysis", "Infrared spectroscopy of ink crossovers", "Comparative analysis with contemporaneous writings"],
      costExtra: isIt
        ? "Analisi strumentali di laboratorio incluse nel forfait (fino a €150 per esami spettrografici speciali)."
        : "Lab instrumentation and spectroscopy included in fixed rates (up to €150 for advanced chemical tests).",
      actionPlan: isIt
        ? "Fornire quanti più scritti comparativi originali possibili (es. firme autentiche su contratti, atti notarili o patenti)."
        : "Provide as many original comparison documents as possible (such as deeds, IDs, bank contracts with authentic signatures)."
    },
    rilievi: {
      title: isIt ? "Sopralluoghi e Ricostruzione Balistica / Scena" : "Scene Survey & Ballistic Reconstruction",
      tests: isIt
        ? ["Rilievo fotogrammetrico 3D laser-scanner sul posto", "Esami chimici dei micro-residui metallici", "Calcolo traiettorie e coni di dispersione balistica"]
        : ["Laser-scanner 3D photogrammetry on site", "Chemical micro-residues checks", "Trajectory calculation & ballistic dispersion cones"],
      costExtra: isIt
        ? "Spese di laboratorio balistico ed esami chimici extra: €300 - €800 a seconda del laboratorio certificato utilizzato."
        : "Ballistics lab & chemical testing surcharge: €300 - €800 depending on the certified facility.",
      actionPlan: isIt
        ? "Ispeziona e congela lo stato dei luoghi. I rilievi devono avvenire tempestivamente per garantire la catena di custodia delle prove fisiche."
        : "Secure and freeze the scene status. On-site technical surveys must occur immediately to ensure bulletproof chain of custody."
    }
  };

  const activeDocRec = docRecommendations[selectedDoc];

  return (
    <div className="space-y-12 py-4">
      
      {/* Intro Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden bg-cold-950/60 border border-cyan-950/40 p-6 md:p-8 rounded-2xl shadow-xl space-y-4"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <SectionLogo lang={lang} />
        
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-[10px] md:text-xs uppercase tracking-widest">
          <Coins className="h-4 w-4 text-cyan-400 shrink-0" />
          <span>FINANCIAL_PROTOCOL // TARIFFE REGOLAMENTATE RIMINI</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100 font-sans">
          {isIt ? "Tariffe e Servizi Forensi a Rimini" : "Forensic Rates and Services in Rimini"}
        </h2>
        
        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl font-sans">
          {isIt 
            ? "Le tariffe per le prestazioni criminologiche e peritali dello Studio Angelini a Rimini si mantengono rigorosamente in linea con i massimi provinciali approvati dalla Prefettura, con un prezzo orario standard di € 50 - € 140 all'ora per singolo operatore (IVA e spese escluse)."
            : "The rates for criminological and expert services of Studio Angelini in Rimini strictly comply with the provincial maximums approved by the local Prefettura, ranging from € 50 to € 140 per hour for a single operator (excl. VAT and expenses)."}
          <a href="#sources" className="text-cyan-400 hover:underline inline-flex items-center ml-1 font-mono text-xs">
            [1]
          </a>
        </p>

        <div className="p-4 bg-cyan-950/15 border border-cyan-900/30 rounded-xl flex items-start space-x-3 text-slate-300">
          <AlertCircle className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1 leading-relaxed font-sans">
            <p className="font-bold text-cyan-300 uppercase tracking-wider font-mono">
              {isIt ? "INFORMATIVA TRASPARENZA PREFETTURA" : "PREFETTURA TRANSPARENCY NOTICE"}
            </p>
            <p>
              {isIt 
                ? "Tutti i professionisti locali hanno l'obbligo di depositare le tabelle tariffarie in Prefettura. Le tariffe reali applicate variano in base alla complessità tecnica dei rilievi, alla strumentazione di laboratorio impiegata e al livello di urgenza del fascicolo."
                : "All certified local investigators must submit their pricing tables to the Prefettura. Actual rates scale based on technological laboratory tools and the urgency of the legal proceedings."}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Grid for Tariffs and Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Official Tariff Sheets */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider font-mono flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
            <span>{isIt ? "Panoramica Tariffe Rimini" : "Rimini Tariff Sheet Details"}</span>
          </h3>

          {/* Service Cards */}
          <div className="space-y-4">
            
            {/* Card 1 */}
            <div className="bg-cold-950/40 border border-cyan-950/30 p-5 rounded-xl hover:border-cyan-500/20 transition-all space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono flex items-center space-x-2">
                  <span className="text-cyan-400 font-bold">01 //</span>
                  <span>{isIt ? "Consulenza Criminologia & Indagini" : "Criminology & Investigative Advice"}</span>
                </h4>
                <span className="text-cyan-400 text-xs font-mono font-bold bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                  € 80 - € 150 / ora
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {isIt 
                  ? "Lo Studio di Criminalistica Elena Angelini a Rimini (specializzato in criminal profiling, analisi della scena del crimine e revisione di casi di presunto suicidio) applica tariffe trasparenti o concorda un budget a forfait calcolato sulla mole complessiva dei faldoni giudiziari."
                  : "Elena Angelini Criminalistics Studio in Rimini (specializing in criminal profiling, scene analysis, and suspicious death reviews) applies transparent rates or structures flat-rate packages based on judicial file volumes."}
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-cold-950/40 border border-cyan-950/30 p-5 rounded-xl hover:border-cyan-500/20 transition-all space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono flex items-center space-x-2">
                  <span className="text-cyan-400 font-bold">02 //</span>
                  <span>{isIt ? "Investigazioni & Sopralluoghi Tecnici" : "Surveys & Physical Investigations"}</span>
                </h4>
                <span className="text-cyan-400 text-xs font-mono font-bold bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                  € 50 - € 90 / ora
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {isIt 
                  ? "Lo Studio Angelini gestisce rilievi tecnici, catena di custodia delle prove e sopralluoghi scientifici con pacchetti minimi di intervento strutturati per garantire la massima conformità alle norme processuali (solitamente calcolati su moduli di almeno 4 ore consecutive)."
                  : "Studio Angelini handles technical surveys, evidence chain preservation, and scientific scene investigations with minimal booking units designed to guarantee complete procedural compliance (usually 4-hour modules)."}
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-cold-950/40 border border-cyan-950/30 p-5 rounded-xl hover:border-cyan-500/20 transition-all space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono flex items-center space-x-2">
                  <span className="text-cyan-400 font-bold">03 //</span>
                  <span>{isIt ? "Perizie Calligrafiche & Grafologiche" : "Handwriting & Will Examination"}</span>
                </h4>
                <span className="text-cyan-400 text-xs font-mono font-bold bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                  € 600 - € 2.000
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans mb-2">
                {isIt
                  ? "Per la verifica di testamenti o la contestazione di firme apocrife, le tariffe dello Studio Angelini si articolano in due fasi operative chiare:"
                  : "For will verification or challenging forged signatures, Studio Angelini structures its rates into two clear-cut phases:"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1 pl-4 border-l-2 border-cyan-950/60">
                <div className="p-2.5 bg-cold-950/20 rounded border border-cyan-950/40">
                  <span className="block text-[10px] font-mono text-cyan-400 uppercase font-bold">
                    {isIt ? "A. PARERE DI FATTIBILITÀ" : "A. FEASIBILITY OPINION"}
                  </span>
                  <span className="text-xs font-bold text-slate-200 block mt-0.5">€ 600 - € 1.000</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5 leading-tight">
                    {isIt ? "Parere scritto preliminare di fattibilità" : "Preliminary feasibility report"}
                  </span>
                </div>
                <div className="p-2.5 bg-cold-950/20 rounded border border-cyan-950/40">
                  <span className="block text-[10px] font-mono text-cyan-400 uppercase font-bold">
                    {isIt ? "B. PERIZIA UFFICIALE" : "B. COURT REPORT"}
                  </span>
                  <span className="text-xs font-bold text-slate-200 block mt-0.5">€ 1.100 - € 2.000</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5 leading-tight">
                    {isIt ? "Relazione peritale formale depositata" : "Official court-ready forensic report"}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-cold-950/40 border border-cyan-950/30 p-5 rounded-xl hover:border-cyan-500/20 transition-all space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono flex items-center space-x-2">
                  <span className="text-cyan-400 font-bold">04 //</span>
                  <span>{isIt ? "Balistica Forense & Analisi Esplosivi" : "Forensic Ballistics & Explosives"}</span>
                </h4>
                <span className="text-cyan-400 text-xs font-mono font-bold bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                  € 1.000 - € 2.500
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {isIt 
                  ? "Per la ricostruzione tridimensionale di colpi d'arma da fuoco, dinamiche balistiche o incidenti, lo Studio Angelini applica metodologie scientifiche avanzate, strutturando la tariffa in base alla complessità dei rilievi 3D della traiettoria e agli esami chimico-fisici necessari."
                  : "For the 3D reconstruction of shooting trajectories, ballistic dynamics, or hunting accidents, Studio Angelini applies advanced scientific methodologies, scaling prices based on the complexity of 3D trajectory tracking and chemical-physical testing."}
              </p>
            </div>

          </div>

          {/* Logistics Section */}
          <div className="p-5 bg-cyan-950/10 border border-cyan-900/25 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono flex items-center space-x-1.5">
              <Car className="h-4 w-4 text-cyan-400" />
              <span>{isIt ? "Voci di Spesa Logistica (Rimini e Provincia)" : "Logistics & Travel Expenses (Rimini District)"}</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {isIt
                ? "Per le attività svolte dallo Studio Angelini all'interno del comune di Rimini, la trasferta è azzerata o inclusa nella tariffa oraria. Per i comuni della provincia (es. Riccione, Santarcangelo, Cattolica) o per spostamenti verso la Repubblica di San Marino, viene applicato un rimborso chilometrico fisso pari a € 0,90/km."
                : "For activities performed by Studio Angelini within the municipality of Rimini, travel costs are waived or included in the hourly rate. For outer municipalities in the province (e.g., Riccione, Santarcangelo, Cattolica) or travel to the Republic of San Marino, a fixed mileage fee of approx € 0.90/km is calculated."}
            </p>
          </div>

        </div>

        {/* Right Column: Dynamic Price Estimator / Calculator */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          <div className="bg-cold-950/70 border-2 border-cyan-500/20 rounded-2xl p-5 md:p-6 space-y-5 shadow-2xl relative">
            <div className="absolute top-3 right-3 flex items-center space-x-1 text-[8px] font-mono text-cyan-500 uppercase bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/10">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
              <span>EST_ENGINE_v1 // LIVE</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="p-2 bg-cyan-500/10 border border-cyan-400/20 rounded-lg">
                <Calculator className="h-4.5 w-4.5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                  {isIt ? "Calcolatore Tariffe Rimini" : "Rimini Budget Estimator"}
                </h3>
                <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                  {isIt ? "Configura il tuo caso per un costo indicativo" : "Set case scope for a custom estimate"}
                </p>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4 pt-3 border-t border-cyan-950/50">
              
              {/* Service Selection */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-300">
                  {isIt ? "Seleziona Prestazione" : "Select Service"}
                </label>
                <div className="relative">
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value as ServiceType)}
                    className="w-full bg-slate-950/90 border border-cyan-950/60 p-2.5 rounded-lg text-xs text-slate-200 font-sans focus:outline-none focus:border-cyan-500/40 appearance-none cursor-pointer"
                  >
                    <option value="criminologia">{isIt ? "Criminologia & Indagini Difensive" : "Criminology & Criminal Profiling"}</option>
                    <option value="investigazioni">{isIt ? "Investigazioni & Sopralluoghi" : "Physical Investigations"}</option>
                    <option value="calligrafia">{isIt ? "Perizia Calligrafica / Grafologia" : "Handwriting / Signature check"}</option>
                    <option value="balistica">{isIt ? "Balistica & Analisi Esplosivi" : "Ballistics & 3D trajectories"}</option>
                  </select>
                  <ChevronDown className="h-4 w-4 text-cyan-500 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Sub-selector for Calligraphy */}
              {selectedService === 'calligrafia' && (
                <div className="p-2.5 bg-cyan-950/5 border border-cyan-950/30 rounded-lg space-y-2">
                  <label className="text-[9px] uppercase font-mono font-bold tracking-widest text-cyan-400 block">
                    {isIt ? "Tipologia di Perizia" : "Investigation Level"}
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowCalligrafiaDetail('preliminare')}
                      className={`flex-1 py-1.5 px-2 text-[10px] uppercase font-mono font-bold rounded border transition-all text-center cursor-pointer ${
                        showCalligrafiaDetail === 'preliminare'
                          ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                          : 'bg-transparent border-cyan-950/20 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {isIt ? "Parere Preliminare" : "Preliminary Check"}
                    </button>
                    <button
                      onClick={() => setShowCalligrafiaDetail('ufficiale')}
                      className={`flex-1 py-1.5 px-2 text-[10px] uppercase font-mono font-bold rounded border transition-all text-center cursor-pointer ${
                        showCalligrafiaDetail === 'ufficiale'
                          ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                          : 'bg-transparent border-cyan-950/20 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {isIt ? "Perizia Ufficiale" : "Formal Court Report"}
                    </button>
                  </div>
                </div>
              )}

              {/* Hours Slider (Only applicable if not Calligraphy and Ballistics since they are flat) */}
              {(selectedService === 'criminologia' || selectedService === 'investigazioni') && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] uppercase font-mono font-bold tracking-wider text-slate-300">
                    <span>{isIt ? "Ore Stimate di Intervento" : "Estimated Hours Required"}</span>
                    <span className="text-cyan-400 text-xs">{hours} {isIt ? "ore" : "hrs"}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="80"
                    value={hours}
                    onChange={(e) => setHours(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 bg-cyan-950/30 h-1.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                    <span>2H</span>
                    <span>40H</span>
                    <span>80H</span>
                  </div>
                </div>
              )}

              {/* Outside Rimini Travel option */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between bg-slate-950/40 border border-cyan-950/40 p-2.5 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Car className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase font-mono tracking-wider text-slate-200 block">
                        {isIt ? "Trasferta Fuori Rimini?" : "Outside Rimini Travel?"}
                      </span>
                      <span className="text-[9px] text-slate-400 block">
                        {isIt ? "Riccione, Cattolica, San Marino, ecc." : "Riccione, Cattolica, San Marino..."}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOutsideRimini(!isOutsideRimini)}
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isOutsideRimini ? 'bg-cyan-500' : 'bg-slate-800'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                        isOutsideRimini ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <AnimatePresence>
                  {isOutsideRimini && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden bg-cyan-950/5 border border-cyan-950/40 p-2.5 rounded-lg space-y-1.5"
                    >
                      <div className="flex justify-between items-center text-[9px] uppercase font-mono font-bold tracking-wider text-slate-300">
                        <span>{isIt ? "Chilometri di Distanza (A/R)" : "Kilometers distance (Roundtrip)"}</span>
                        <span className="text-cyan-400">{distanceKm} KM</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="200"
                        value={distanceKm}
                        onChange={(e) => setDistanceKm(parseInt(e.target.value))}
                        className="w-full accent-cyan-500 bg-cyan-950/30 h-1 rounded cursor-pointer"
                      />
                      <span className="text-[8px] text-slate-400 block leading-tight font-sans">
                        {isIt 
                          ? `Rimborso chilometrico Prefettura: + € ${(distanceKm * 0.9).toFixed(2)} (calcolato a €0,90/km).`
                          : `Prefettura regulated mileage: + € ${(distanceKm * 0.9).toFixed(2)} (at €0.90/km).`}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Results */}
            <div className="bg-slate-950 border border-cyan-950 rounded-xl p-4 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
                  {isIt ? "Budget Stimato (Escl. IVA)" : "Estimated Budget (Excl. VAT)"}
                </span>
                <span className="text-[9px] font-mono text-cyan-400 uppercase font-bold bg-cyan-950 border border-cyan-900/30 px-1.5 py-0.5 rounded">
                  {isIt ? "INDICATIVO" : "APPROXIMATE"}
                </span>
              </div>

              <div className="flex items-baseline space-x-1 text-slate-100">
                <span className="text-2xl font-mono font-bold text-cyan-400">
                  € {estimate.min}
                </span>
                <span className="text-xs text-slate-400 font-mono">-</span>
                <span className="text-2xl font-mono font-bold text-cyan-400">
                  € {estimate.max}
                </span>
              </div>

              {isOutsideRimini && (
                <p className="text-[9px] font-mono text-slate-400">
                  {isIt ? `Include indennità di trasferta di € ${estimate.travel}` : `Includes travel allowance of € ${estimate.travel}`}
                </p>
              )}

              <p className="text-[10px] text-slate-400 font-sans leading-normal pt-1.5 border-t border-cyan-950/50">
                {estimate.details}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <button
                onClick={onNavigateToContact}
                className="w-full flex items-center justify-between bg-gradient-to-r from-cyan-600 to-cold-500 hover:from-cyan-500 hover:to-cold-400 text-white font-mono text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl shadow-[0_0_15px_rgba(14,165,233,0.15)] hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] active:scale-[0.98] transition-all duration-150 cursor-pointer"
              >
                <span>{isIt ? "Richiedi Preventivo Scritto Ufficiale" : "Request Official Written Quote"}</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </button>
              <span className="block text-[8px] text-slate-500 text-center font-mono uppercase tracking-wider">
                {isIt 
                  ? "Senza impegno // Conforme ai regolamenti di Prefettura" 
                  : "No obligation // Fully compliant with local Prefettura lists"}
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Interactive Questionnaire: "Hai già un documento o un fascicolo?" */}
      <div className="bg-cold-950/40 border border-cyan-950/30 p-6 rounded-2xl space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <FileText className="h-4 w-4 text-cyan-400" />
            <span>CASE_ASSESSMENT // VERIFICA REPERTI & DOCUMENTI</span>
          </div>
          <h3 className="text-lg font-bold text-slate-100 font-sans">
            {isIt ? "Hai già un documento o un fascicolo giudiziario?" : "Do you have case files or documents?"}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-4xl">
            {isIt 
              ? "Se possiedi già atti giudiziari o reperti d'indagine, seleziona la tipologia per ricevere istruzioni sugli esami strumentali necessari, i costi extra di laboratorio e le modalità legali per formalizzare il preventivo."
              : "If you already have case documents or physical evidence, select the type below to see recommended analytical tests, lab surcharges, and legal advice."}
          </p>
        </div>

        {/* Buttons Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['none', 'fascicolo', 'testamento', 'rilievi'] as DocType[]).map((doc) => (
            <button
              key={doc}
              onClick={() => setSelectedDoc(doc)}
              className={`p-3.5 rounded-xl border transition-all text-left flex flex-col justify-between space-y-2 cursor-pointer ${
                selectedDoc === doc
                  ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(14,165,233,0.1)]'
                  : 'bg-slate-950/40 border-cyan-950/20 text-slate-300 hover:border-cyan-950/80 hover:bg-slate-950/60'
              }`}
            >
              <div className="flex justify-between items-start w-full">
                <FileText className={`h-4.5 w-4.5 ${selectedDoc === doc ? 'text-cyan-400' : 'text-slate-400'}`} />
                {selectedDoc === doc && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
              </div>
              <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider block leading-snug">
                {doc === 'none' && (isIt ? "Nessun Documento" : "No documents")}
                {doc === 'fascicolo' && (isIt ? "Fascicolo Penale" : "Criminal files")}
                {doc === 'testamento' && (isIt ? "Testamento / Firma" : "Will / Signatures")}
                {doc === 'rilievi' && (isIt ? "Rilievi / Scena" : "Scene / Ballistics")}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic recommendation card */}
        <div className="bg-slate-950/80 border border-cyan-950 p-5 rounded-xl">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-[10px] uppercase font-bold tracking-widest border-b border-cyan-950 pb-2">
              <Scale className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span>{isIt ? "ANALISI PROTOCOLLO SUGGERITO" : "RECOMMENDED FORENSIC PROTOCOL"}</span>
            </div>
            
            <h4 className="text-sm font-bold text-slate-200 uppercase font-mono tracking-wider">
              {activeDocRec.title}
            </h4>

            {/* Recommended tests list */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                {isIt ? "Esami di laboratorio raccomandati:" : "Recommended scientific laboratory tests:"}
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-4 list-disc text-xs text-slate-300 leading-relaxed font-sans">
                {activeDocRec.tests.map((test, i) => (
                  <li key={i} className="marker:text-cyan-400">{test}</li>
                ))}
              </ul>
            </div>

            {/* Extra costs & Action plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-cyan-950/40">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block flex items-center space-x-1">
                  <Coins className="h-3 w-3 text-cyan-400 shrink-0" />
                  <span>{isIt ? "Costi Extra Estimati:" : "Estimated Surcharges:"}</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {activeDocRec.costExtra}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block flex items-center space-x-1">
                  <Info className="h-3 w-3 text-cyan-400 shrink-0" />
                  <span>{isIt ? "Piano di Azione Legale:" : "Action Plan & Next Steps:"}</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {activeDocRec.actionPlan}
                </p>
              </div>
            </div>

            {/* Prefettura instruction paragraph at bottom of active check */}
            <div className="p-3 bg-cyan-950/5 border border-cyan-900/10 rounded-lg text-[11px] text-slate-400 font-sans leading-relaxed">
              {isIt 
                ? "Ai sensi della normativa vigente, lo Studio Angelini fornisce preventivi dettagliati scritti solo a seguito di un colloquio informativo preliminare e di una valutazione iniziale del materiale documentale o digitale, garantendo la totale trasparenza delle tariffe applicate."
                : "In accordance with current legal regulations, Studio Angelini supplies detailed written estimates only after a preliminary briefing and an initial assessment of the documentary or digital material, guaranteeing full transparency of the applied rates."}
            </div>

          </div>
        </div>
      </div>

      {/* Sources & Citations Section */}
      <div id="sources" className="bg-cold-950/20 border border-slate-900/40 p-5 rounded-2xl space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
          {isIt ? "Fonti Documentali e Riferimenti Normativi" : "Documentary Sources & Legal References"}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px] font-mono text-slate-500 leading-relaxed">
          <div className="space-y-1.5">
            <p>
              <span className="text-cyan-500 font-bold mr-1">[1]</span>
              <span className="text-slate-400">
                {isIt 
                  ? "Prefettura di Rimini - Tabelle tariffarie provinciali di riferimento per investigazioni private e rilievi tecnici."
                  : "Prefettura of Rimini - Provincial reference tariff tables for private investigations and technical surveys."}
              </span>
            </p>
            <p>
              <span className="text-cyan-500 font-bold mr-1">[2]</span>
              <span className="text-slate-400">
                {isIt 
                  ? "Studio Elena Angelini - Registro interno delle tariffe e dei servizi di criminalistica depositato."
                  : "Elena Angelini Studio - Internal register of deposited tariffs and criminalistics services."}
              </span>
            </p>
            <p>
              <span className="text-cyan-500 font-bold mr-1">[3]</span>
              <span className="text-slate-400">
                {isIt 
                  ? "Codice di Procedura Penale - Art. 327-bis e Art. 391-decies (Attività investigative del difensore e del consulente)."
                  : "Code of Criminal Procedure - Art. 327-bis & Art. 391-decies (Defense counsel and expert investigator activities)."}
              </span>
            </p>
          </div>
          <div className="space-y-1.5">
            <p>
              <span className="text-cyan-500 font-bold mr-1">[4]</span>
              <span className="text-slate-400">
                {isIt 
                  ? "Ministero della Giustizia - Linee guida per la determinazione degli onorari dei consulenti tecnici grafologi e calligrafi."
                  : "Ministry of Justice - Guidelines for determining the fees of expert graphologists and handwriting analysts."}
              </span>
            </p>
            <p>
              <span className="text-cyan-500 font-bold mr-1">[5]</span>
              <span className="text-slate-400">
                {isIt 
                  ? "Rilevazioni e parametri tariffari medi della Provincia di Rimini per prestazioni specialistiche di balistica forense."
                  : "Average tariff parameters of the Province of Rimini for specialized forensic ballistics services."}
              </span>
            </p>
            <p>
              <span className="text-cyan-500 font-bold mr-1">[6]</span>
              <span className="text-slate-400">
                {isIt 
                  ? "Tabelle Nazionali ACI - Parametri per il rimborso chilometrico per attività dello Studio Angelini fuori dal comune di Rimini."
                  : "National ACI Tables - Mileage reimbursement parameters for Studio Angelini activities outside the municipality of Rimini."}
              </span>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
