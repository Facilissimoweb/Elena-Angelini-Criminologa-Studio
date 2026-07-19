import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  Activity, 
  ShieldAlert, 
  Fingerprint, 
  Search, 
  Sparkles,
  Award,
  Zap
} from 'lucide-react';
import { Language } from '../types';

interface HumanBodyMapProps {
  lang: Language;
  onFilterChange: (query: string, tag: string | null) => void;
}

interface HotspotDetails {
  id: string;
  name: { it: string; en: string };
  focusArea: { it: string; en: string };
  protocols: string[];
  description: { it: string; en: string };
  tagFilter: string; // The tag or keyword to search for in parent
  icon: any;
  coordinates: { x: number; y: number }[]; // Coordinates on the SVG 200x500 canvas
  radius: number;
}

export default function HumanBodyMap({ lang, onFilterChange }: HumanBodyMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const isIt = lang === 'it' || !lang;

  const hotspots: HotspotDetails[] = [
    {
      id: 'head',
      name: {
        it: 'Sistema Encefalico & Cranio',
        en: 'Encephalic System & Cranium'
      },
      focusArea: {
        it: 'Autopsia Psicologica, Tossicologia Capelli, Balistica Cranica',
        en: 'Psychological Autopsy, Hair Toxicology, Cranial Ballistics'
      },
      protocols: ['NAS-Autopsy Protocol', 'Shneidman Guide', 'FORA 3D // Traiettorie d\'Impatto'],
      description: {
        it: 'Analisi critica dello stato neuro-psichico retrospettivo (Autopsia Psicologica) per morti equivoche e decodifica delle traiettorie dei fori di entrata balistici a livello cranio-facciale.',
        en: 'Critical assessment of retrospective neuro-psychic state (Psychological Autopsy) for equivocal deaths and decoding of ballistic impact trajectories on the cranium.'
      },
      tagFilter: 'Autopsia',
      icon: Target,
      coordinates: [{ x: 100, y: 60 }],
      radius: 18
    },
    {
      id: 'neck',
      name: {
        it: 'Area Cervicale & Asfissiologia',
        en: 'Cervical Area & Asphyxiology'
      },
      focusArea: {
        it: 'Strangolamento, Impiccamento, Solchi di Compressione',
        en: 'Strangulation, Hanging, Compression Furrows'
      },
      protocols: ['Linee Guida Medico-Legali BPA', 'Biomeccanica del Trauma Asfittico'],
      description: {
        it: 'Indagine sulle lesioni del collo, ecchimosi, frattura dell\'osso ioide e diagnosi differenziale tra asfissia meccanica autosomministrata vs eterodiretta (omicidio mascherato).',
        en: 'Investigation of cervical lesions, bruising, hyoid bone fractures, and differential diagnosis between self-inflicted vs third-party mechanical asphyxia.'
      },
      tagFilter: 'BPA',
      icon: ShieldAlert,
      coordinates: [{ x: 100, y: 92 }],
      radius: 12
    },
    {
      id: 'chest',
      name: {
        it: 'Cardiotoracico & Dinamiche Fluide (BPA)',
        en: 'Cardiothoracic & Fluid Dynamics (BPA)'
      },
      focusArea: {
        it: 'Bloodstain Pattern Analysis (BPA), Lesioni d\'Arma da Taglio',
        en: 'Bloodstain Pattern Analysis (BPA), Sharp Force Lesions'
      },
      protocols: ['IABPA Standard Guidelines', 'Meccanica dei Fluidi Forense', 'FORA 3D'],
      description: {
        it: 'Ricostruzione della morfologia, direzione e velocità di proiezione delle macchie ematiche emesse da arterie toraciche. Calcolo matematico del punto di origine spaziale del trauma.',
        en: 'Reconstruction of the morphology, direction, and velocity of blood projection from thoracic arteries. Mathematical calculation of the spatial origin of trauma.'
      },
      tagFilter: 'BPA',
      icon: Activity,
      coordinates: [{ x: 100, y: 145 }],
      radius: 16
    },
    {
      id: 'abdomen',
      name: {
        it: 'Tossicologia Viscerale & Gastro-intestinale',
        en: 'Visceral & Gastrointestinal Toxicology'
      },
      focusArea: {
        it: 'Analisi Tossicologica dei Fluidi, Post-Mortem Interval (PMI)',
        en: 'Toxicological Fluid Analysis, Post-Mortem Interval (PMI)'
      },
      protocols: ['ISO/IEC 17025 // Catena di Custodia', 'Cronologia Gastrica'],
      description: {
        it: 'Studio analitico delle sostanze stupefacenti, veleni e farmaci presenti nei visceri e stima dell\'intervallo post-mortem (PMI) tramite lo svuotamento gastrico e biochimica cadaverica.',
        en: 'Analytical study of illicit substances, poisons, and drugs in the viscera and estimation of post-mortem interval (PMI) through gastric emptying rates.'
      },
      tagFilter: 'DNA',
      icon: Search,
      coordinates: [{ x: 100, y: 205 }],
      radius: 14
    },
    {
      id: 'hands',
      name: {
        it: 'Estremità, Residui di Sparo (GSR) & Dattiloscopia',
        en: 'Extremities, Gunshot Residues (GSR) & Dactyloscopy'
      },
      focusArea: {
        it: 'Gunshot Residue (GSR), Lesioni Difensive, Micro-tracce sotto-ungueali',
        en: 'Gunshot Residue (GSR), Defense Wounds, Subungual Micro-traces'
      },
      protocols: ['Stub di Prelievo GSR', 'Analisi Microscopica SEM-EDX', 'Amplificazione DNA'],
      description: {
        it: 'Prelievo di particelle sferiche di bario, antimonio e piombo sulle mani del sospettato. Analisi delle unghie alla ricerca di DNA graffiante derivato da colluttazioni difensive.',
        en: 'Sampling of spherical barium, antimony, and lead particles on suspects\' hands. Investigation of under-nail scratches for DNA derived from defensive struggles.'
      },
      tagFilter: 'DNA',
      icon: Fingerprint,
      coordinates: [
        { x: 38, y: 240 },
        { x: 162, y: 240 }
      ],
      radius: 14
    },
    {
      id: 'skeletal',
      name: {
        it: 'Apparato Osteo-Articolare & Antropologia',
        en: 'Osteo-Articular System & Anthropology'
      },
      focusArea: {
        it: 'Antropologia Forense, Traumatologia Ossea, Rilevamento Calpestamento',
        en: 'Forensic Anthropology, Skeletal Trauma, Gait & Footprint Survey'
      },
      protocols: ['Modello Geospaziale Rossmo', 'Rilievo Metrico Vettoriale FORA'],
      description: {
        it: 'Studio delle lesioni scheletriche peri-mortem, determinazione del sesso, età e statura da resti ossei e mappatura geospaziale degli spostamenti dell\'aggressore.',
        en: 'Study of peri-mortem skeletal trauma, sex/age/height determination from skeletal remains, and geospatial mapping of suspect footsteps and gait.'
      },
      tagFilter: 'GIS',
      icon: Sparkles,
      coordinates: [
        { x: 82, y: 390 },
        { x: 118, y: 390 }
      ],
      radius: 14
    }
  ];

  const activeId = hoveredId || selectedId;
  const activeHotspot = hotspots.find(h => h.id === activeId);

  const handleHotspotClick = (hotspot: HotspotDetails) => {
    setSelectedId(selectedId === hotspot.id ? null : hotspot.id);
    onFilterChange('', hotspot.tagFilter);
  };

  return (
    <div className="bg-slate-950/70 border border-slate-900 rounded-2xl p-5 md:p-8 space-y-6 relative overflow-hidden shadow-2xl">
      {/* Dynamic scanline visual effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent pointer-events-none opacity-40" />
      
      {/* Decorative tech grid backdrop */}
      <div className="absolute top-4 right-4 font-mono text-[8px] text-cyan-500/20 text-right select-none leading-normal hidden sm:block">
        BIO_FORENSIC_MAPPING // ENGINE v4.1<br />
        SECURE_CONNECTION // ACTIVE_RECONSTRUCTION
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-stretch">
        
        {/* LEFT COLUMN: INTERACTIVE SVG MAP */}
        <div className="w-full lg:w-[42%] flex flex-col items-center justify-center bg-slate-950/40 border border-slate-900 rounded-xl p-4 relative min-h-[460px]">
          
          {/* Status Overlay */}
          <div className="absolute top-3 left-3 flex items-center space-x-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded border border-slate-800">
            <span className={`w-1.5 h-1.5 rounded-full ${activeHotspot ? 'bg-cyan-500 animate-ping' : 'bg-slate-500'}`} />
            <span>
              {activeHotspot 
                ? `${lang === 'it' ? 'REGIONE ATTIVA' : 'ACTIVE REGION'} // ${activeHotspot.id.toUpperCase()}` 
                : (lang === 'it' ? 'Rilevamento Biometrico' : 'Biometric Scanning')}
            </span>
          </div>

          {/* Futuristic crosshairs decoration */}
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-slate-800" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-slate-800" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-slate-800" />

          {/* SVG Frame */}
          <svg 
            viewBox="0 0 200 500" 
            className="w-full max-w-[210px] h-auto drop-shadow-[0_0_15px_rgba(6,182,212,0.03)] z-10 select-none"
          >
            {/* Background grids */}
            <line x1="100" y1="10" x2="100" y2="490" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="10" y1="250" x2="190" y2="250" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="4 4" />
            
            {/* SVG STYLIZED HUMAN BODY WIREFRAME */}
            {/* Head Outline */}
            <path 
              d="M 100,30 C 85,30 78,42 78,60 C 78,82 90,86 100,86 C 110,86 122,82 122,60 C 122,42 115,30 100,30 Z" 
              className={`stroke-cyan-500/20 fill-slate-950/40 transition-all duration-300 ${activeHotspot?.id === 'head' ? 'stroke-cyan-400/80 fill-cyan-950/15' : ''}`}
              strokeWidth="1.5"
            />
            {/* Neck */}
            <path 
              d="M 94,85 L 94,100 L 106,100 L 106,85" 
              className={`stroke-cyan-500/20 fill-slate-950/40 transition-all duration-300 ${activeHotspot?.id === 'neck' ? 'stroke-cyan-400/80 fill-cyan-950/15' : ''}`}
              strokeWidth="1.5"
            />
            {/* Torso & Hips */}
            <path 
              d="M 68,100 Q 100,95 132,100 L 138,130 L 134,180 L 128,240 L 122,265 L 78,265 L 72,240 L 66,180 L 62,130 Z" 
              className={`stroke-cyan-500/20 fill-slate-950/40 transition-all duration-300 ${
                activeHotspot?.id === 'chest' ? 'stroke-cyan-400/80 fill-cyan-950/15' : 
                activeHotspot?.id === 'abdomen' ? 'stroke-emerald-400/80 fill-emerald-950/15' : ''
              }`}
              strokeWidth="1.5"
            />
            
            {/* Left Arm */}
            <path 
              d="M 68,100 L 52,145 L 44,190 L 40,240 Q 38,245 42,245 L 46,242 L 50,195 L 58,150 L 70,115 Z" 
              className={`stroke-cyan-500/15 fill-slate-950/30 transition-all duration-300 ${activeHotspot?.id === 'hands' ? 'stroke-cyan-400/80 fill-cyan-950/15' : ''}`}
              strokeWidth="1.5"
            />
            
            {/* Right Arm */}
            <path 
              d="M 132,100 L 148,145 L 156,190 L 160,240 Q 162,245 158,245 L 154,242 L 150,195 L 142,150 L 130,115 Z" 
              className={`stroke-cyan-500/15 fill-slate-950/30 transition-all duration-300 ${activeHotspot?.id === 'hands' ? 'stroke-cyan-400/80 fill-cyan-950/15' : ''}`}
              strokeWidth="1.5"
            />

            {/* Left Leg */}
            <path 
              d="M 78,265 L 82,320 L 85,385 L 88,435 L 82,485 L 94,485 L 98,435 L 95,385 L 96,320 L 100,265 Z" 
              className={`stroke-cyan-500/15 fill-slate-950/30 transition-all duration-300 ${activeHotspot?.id === 'skeletal' ? 'stroke-emerald-400/80 fill-emerald-950/15' : ''}`}
              strokeWidth="1.5"
            />

            {/* Right Leg */}
            <path 
              d="M 122,265 L 118,320 L 115,385 L 112,435 L 118,485 L 106,485 L 102,435 L 105,385 L 104,320 L 100,265 Z" 
              className={`stroke-cyan-500/15 fill-slate-950/30 transition-all duration-300 ${activeHotspot?.id === 'skeletal' ? 'stroke-emerald-400/80 fill-emerald-950/15' : ''}`}
              strokeWidth="1.5"
            />

            {/* Subtle anatomical joints reference points */}
            <circle cx="100" cy="100" r="2.5" className="fill-cyan-500/30" />
            <circle cx="100" cy="265" r="2.5" className="fill-cyan-500/30" />
            <circle cx="58" cy="108" r="2.5" className="fill-cyan-500/30" />
            <circle cx="142" cy="108" r="2.5" className="fill-cyan-500/30" />
            <circle cx="47" cy="188" r="2.5" className="fill-cyan-500/30" />
            <circle cx="153" cy="188" r="2.5" className="fill-cyan-500/30" />

            {/* RENDER HOVERABLE INTERACTIVE HOTSPOT TARGETS */}
            {hotspots.map((spot) => {
              const isActive = activeId === spot.id;
              const isSelected = selectedId === spot.id;
              const colorClass = spot.id === 'abdomen' || spot.id === 'skeletal' ? 'stroke-emerald-500' : 'stroke-cyan-500';
              const fillClass = spot.id === 'abdomen' || spot.id === 'skeletal' ? 'fill-emerald-500' : 'fill-cyan-500';

              return spot.coordinates.map((coord, idx) => (
                <g 
                  key={`${spot.id}-${idx}`}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredId(spot.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleHotspotClick(spot)}
                >
                  {/* Outer breathing pulse ring */}
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={spot.radius + (isActive ? 6 : 2)}
                    className={`fill-none ${colorClass} opacity-15 transition-all duration-300 ${isActive ? 'animate-pulse opacity-40 scale-110' : ''}`}
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  
                  {/* Middle solid border ring */}
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={spot.radius}
                    className={`fill-slate-950/90 ${colorClass} transition-all duration-300 ${isActive ? 'stroke-2 shadow-2xl' : 'stroke-1 opacity-60'}`}
                  />

                  {/* Core glowing nucleus */}
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={isSelected ? 5 : 3.5}
                    className={`${fillClass} ${isActive ? 'scale-125' : 'opacity-80'} transition-transform duration-300`}
                  />

                  {/* Hover visual target cursor lines */}
                  {isActive && (
                    <>
                      <line x1={coord.x - spot.radius - 4} y1={coord.y} x2={coord.x - spot.radius} y2={coord.y} className={colorClass} strokeWidth="1" />
                      <line x1={coord.x + spot.radius} y1={coord.y} x2={coord.x + spot.radius + 4} y2={coord.y} className={colorClass} strokeWidth="1" />
                      <line x1={coord.x} y1={coord.y - spot.radius - 4} x2={coord.x} y2={coord.y - spot.radius} className={colorClass} strokeWidth="1" />
                      <line x1={coord.x} y1={coord.y + spot.radius} x2={coord.x} y2={coord.y + spot.radius + 4} className={colorClass} strokeWidth="1" />
                    </>
                  )}
                </g>
              ));
            })}
          </svg>
        </div>

        {/* RIGHT COLUMN: TECHNICAL TERMINAL DISPLAY */}
        <div className="flex-1 w-full flex flex-col justify-between bg-slate-950/80 border border-slate-900 rounded-xl p-5 md:p-6 space-y-5 relative min-h-[460px]">
          
          <AnimatePresence mode="wait">
            {activeHotspot ? (
              <motion.div
                key={activeHotspot.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Header Info */}
                <div className="space-y-1.5 border-b border-slate-900 pb-3 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="p-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                      <activeHotspot.icon className="w-4.5 h-4.5" />
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-extrabold">
                      {lang === 'it' ? 'PROTOCOLLO FORENSE RILEVATO' : 'FORENSIC PROTOCOL IDENTIFIED'}
                    </span>
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-slate-100 font-serif leading-tight">
                    {isIt ? activeHotspot.name.it : activeHotspot.name.en}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-400">
                    {lang === 'it' ? 'AREE DI INDAGINE:' : 'AREAS OF INQUIRY:'}{' '}
                    <span className="text-slate-300 font-medium">
                      {isIt ? activeHotspot.focusArea.it : activeHotspot.focusArea.en}
                    </span>
                  </p>
                </div>

                {/* Body Details */}
                <div className="space-y-3.5 text-left">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">
                      {lang === 'it' ? '// DETTAGLIO TECNICO DELLA PERIZIA' : '// PERITUAL TECHNICAL DETAILS'}
                    </span>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {isIt ? activeHotspot.description.it : activeHotspot.description.en}
                    </p>
                  </div>

                  {/* Standard Protocols List */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">
                      {lang === 'it' ? '// VALIDAZIONI SCIENTIFICHE APPLICATE' : '// SCIENTIFIC VALIDATIONS APPLIED'}
                    </span>
                    <div className="grid grid-cols-1 gap-1.5">
                      {activeHotspot.protocols.map((protocol, idx) => (
                        <div 
                          key={idx} 
                          className="bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded flex items-center space-x-2"
                        >
                          <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="text-[10.5px] font-mono text-emerald-300 font-semibold leading-none">{protocol}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Call to Action Helper */}
                <div className="bg-cyan-950/10 border border-cyan-500/10 rounded-lg p-3 text-[10.5px] font-mono text-cyan-400/90 text-left flex items-start space-x-2">
                  <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {lang === 'it'
                      ? `Clicca sulla zona per impostare automaticamente il filtro "${activeHotspot.tagFilter}" nell'archivio sottostante e visualizzare i nostri protocolli registrati.`
                      : `Click on the area to automatically apply the "${activeHotspot.tagFilter}" filter in the database below and view our registered protocols.`}
                  </p>
                </div>

              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8"
              >
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <Activity className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-2 max-w-sm">
                  <h4 className="text-sm font-bold font-mono text-slate-300 uppercase tracking-widest">
                    {lang === 'it' ? 'DIAGNOSTICA FORENSE ATTIVA' : 'FORENSIC DIAGNOSTICS ACTIVE'}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {lang === 'it'
                      ? 'Posiziona il cursore o tocca i punti di ancoraggio sulla mappa anatomica tridimensionale a sinistra per esaminare le metodologie e i protocolli applicabili alle diverse aree investigative.'
                      : 'Hover or tap the anchor points on the three-dimensional anatomical map on the left to examine the methodologies and protocols applicable to the different investigative areas.'}
                  </p>
                </div>
                
                {/* Visual stats indicators */}
                <div className="w-full max-w-xs grid grid-cols-3 gap-2 pt-4 border-t border-slate-900/40">
                  <div className="text-center">
                    <span className="block text-[10px] font-mono text-slate-600 uppercase">SYS_STABILITY</span>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">99.98%</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-[10px] font-mono text-slate-600 uppercase">CAL_TOLERANCE</span>
                    <span className="text-[11px] font-mono text-cyan-400 font-bold">&lt;0.5mm</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-[10px] font-mono text-slate-600 uppercase">ISO_STANDARDS</span>
                    <span className="text-[11px] font-mono text-amber-500 font-bold">17025 compliant</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Footer for Terminal */}
          <div className="border-t border-slate-900 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <span className="text-[9px] font-mono text-slate-600 uppercase">
              STUDIO_ANGELINI_ANATOMICAL_MAPPING_PROTOCOL
            </span>
            {activeHotspot && (
              <button
                onClick={() => handleHotspotClick(activeHotspot)}
                className="bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-500/20 hover:border-cyan-500/50 text-cyan-400 px-3.5 py-1.5 rounded text-[10.5px] font-mono tracking-wider uppercase font-bold transition-all cursor-pointer"
              >
                {lang === 'it' ? 'APPLICA FILTRO' : 'APPLY FILTER'}
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
