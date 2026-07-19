import { useState, useRef, MouseEvent } from 'react';
import { Cpu, RotateCcw, Compass, ZoomIn, Info, Sparkles, Clock, Target, TrendingDown } from 'lucide-react';
import { Language, translations } from '../types';
import { motion } from 'motion/react';
import SectionLogo from './SectionLogo';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend
} from 'recharts';

interface Fora3DProps {
  lang: Language;
}

type ViewportType = 'impact' | 'trajectory' | 'room';

export default function Fora3D({ lang }: Fora3DProps) {
  const t = translations[lang];
  const [viewport, setViewport] = useState<ViewportType>('impact');
  const [wireframe, setWireframe] = useState<boolean>(true);
  const [showRays, setShowRays] = useState<boolean>(true);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 75, y: 30 });
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Data for Precision Chart (Error Margin in mm - lower is better)
  const precisionData = [
    {
      task: lang === 'it' ? 'Traiettorie Balistiche' : 'Ballistic Trajs',
      traditional: 35.0,
      fora3d: 0.3,
    },
    {
      task: lang === 'it' ? 'Dinamica Collisioni' : 'Collision Dynamics',
      traditional: 50.0,
      fora3d: 0.5,
    },
    {
      task: lang === 'it' ? 'Fotogrammetria Reperti' : 'Evidence Photogram',
      traditional: 15.0,
      fora3d: 0.2,
    },
    {
      task: lang === 'it' ? 'Mappatura Spaziale' : 'Spatial Mapping',
      traditional: 40.0,
      fora3d: 0.4,
    }
  ];

  // Data for Processing Time Chart (Time spent in hours - lower is better)
  const timeData = [
    {
      phase: lang === 'it' ? 'Rilievo Metrico' : 'Metric Surveying',
      traditional: 12.0,
      fora3d: 1.5,
    },
    {
      phase: lang === 'it' ? 'Calcolo Vettori' : 'Vector Comp',
      traditional: 18.0,
      fora3d: 2.0,
    },
    {
      phase: lang === 'it' ? 'Ricostruzione Scena' : 'Scene Reconst',
      traditional: 48.0,
      fora3d: 4.0,
    },
    {
      phase: lang === 'it' ? 'Generazione Report' : 'Report Gen',
      traditional: 8.0,
      fora3d: 1.0,
    }
  ];

  const chartLabels: Record<string, any> = {
    it: {
      precisionTitle: "PRECISIONE MILLIMETRICA (SCARTO IN mm)",
      precisionDesc: "Margine medio di scarto d'errore (meno è meglio). La ricostruzione 3D virtuale abbatte la tolleranza manuale.",
      timeTitle: "TEMPI DI ELABORAZIONE (ORE DI LAVORO)",
      timeDesc: "Ore di lavoro stimate per il rilievo e l'analisi dettagliata (meno è meglio). Ottimizzazione e automazione digitale.",
      traditional: "Rilievo Tradizionale",
      fora3d: "Protocollo FORA 3D",
    },
    en: {
      precisionTitle: "MILLIMETER PRECISION (ERROR MARGIN)",
      precisionDesc: "Average error margin in mm (lower is better). Virtual 3D reconstruction minimizes manual tolerances.",
      timeTitle: "PROCESSING TIME (WORK HOURS)",
      timeDesc: "Estimated hours for survey and detailed analysis (lower is better). Digital automation optimization.",
      traditional: "Traditional Methods",
      fora3d: "FORA 3D Protocol",
    }
  };

  const currentLabels = chartLabels[lang] || chartLabels['it'];

  const CustomTooltip = ({ active, payload, label, unit }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/95 border border-cyan-500/35 p-2.5 rounded font-mono text-[9px] shadow-2xl text-slate-100 space-y-1">
          <p className="font-bold border-b border-slate-900 pb-1 text-cyan-400">{label}</p>
          {payload.map((pld: any) => (
            <div key={pld.name} className="flex justify-between space-x-4">
              <span style={{ color: pld.color }} className="font-medium">{pld.name}:</span>
              <span className="font-bold">{pld.value} {unit}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    // Limit coordinates inside boundaries
    setCoords({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const getViewportTitle = () => {
    switch (viewport) {
      case 'impact':
        return lang === 'it' ? 'A_01 // IMPATTO BALISTICO REPERTO' : 'A_01 // BALLISTIC WEAPON IMPACT';
      case 'trajectory':
        return lang === 'it' ? 'B_02 // RILIEVO TRAIETTORIE FLUIDI' : 'B_02 // FLUID DYNAMICS VECTORS';
      case 'room':
        return lang === 'it' ? 'C_03 // MODELLO ISO_SPAZIALE STANZA' : 'C_03 // ISOMETRIC ROOM WIREFRAME';
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-950 to-slate-900/40 border border-cyan-900/20 rounded-xl p-5 md:p-8 relative overflow-hidden scanlines">
      
      {/* Background Geometric Rings */}
      <div className="absolute -top-16 -right-16 w-80 h-80 border border-cold-500/10 rounded-full pointer-events-none flex items-center justify-center">
        <div className="w-60 h-60 border border-cold-500/5 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Texts & Explanations */}
        <div className="lg:col-span-6 space-y-4">
          <SectionLogo lang={lang} />
          
          <span className="text-cold-400 font-mono text-[10px] tracking-widest uppercase font-bold bg-cold-500/10 px-2.5 py-1 rounded border border-cold-500/20">
            // {t['fora-badge']}
          </span>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif text-slate-100">
            {t['fora-title']}
          </h3>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
            {t['fora-desc']}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs font-mono text-slate-400">
            <div className="flex items-start space-x-2 bg-slate-950/40 p-2.5 rounded border border-slate-900/50">
              <span className="text-cyan-400">⚡</span>
              <span>{t['fora-point-1']}</span>
            </div>
            <div className="flex items-start space-x-2 bg-slate-950/40 p-2.5 rounded border border-slate-900/50">
              <span className="text-cyan-400">⚡</span>
              <span>{t['fora-point-2']}</span>
            </div>
          </div>

          <div className="pt-2 text-xs flex items-center space-x-2 bg-cyan-950/10 border border-cyan-900/20 p-3 rounded text-cyan-400">
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <p className="leading-snug">
              {lang === 'it' 
                ? "Muovi il cursore sopra il visore nero per tracciare le coordinate cartesiane forensi."
                : "Move your mouse over the viewport to track forensic Cartesian coordinates in real time."}
            </p>
          </div>
        </div>

        {/* Dynamic Viewport Panel */}
        <div className="lg:col-span-6 bg-cold-950/90 border border-slate-800 p-4 md:p-5 rounded-lg space-y-4 font-mono text-[10px]">
          
          {/* Header of Viewport */}
          <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
            <span className="text-slate-400 font-bold">{getViewportTitle()}</span>
            <span className="text-emerald-500 animate-pulse font-bold flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1"></span>
              {t['fora-live']}
            </span>
          </div>

          {/* Interactive Visor Canvas */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="h-48 sm:h-56 bg-slate-950 rounded border border-slate-900 flex items-center justify-center relative cursor-crosshair overflow-hidden group"
          >
            {/* Grid pattern background */}
            <div className={`absolute inset-0 forensic-grid transition-opacity duration-300 ${wireframe ? 'opacity-40' : 'opacity-10'}`}></div>

            {/* Simulated 3D Vector SVG rendering based on viewport state */}
            <svg className="absolute inset-0 w-full h-full text-cyan-500/30" viewBox="0 0 100 100" preserveAspectRatio="none">
              
              {/* Reference Grid lines */}
              <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 3"></line>
              <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 3"></line>

              {viewport === 'impact' && (
                <>
                  {/* Bullet path line */}
                  <motion.line
                    initial={{ x2: 20, y2: 80 }}
                    animate={{ x2: coords.x, y2: coords.y }}
                    transition={{ type: 'spring', stiffness: 60 }}
                    x1="15"
                    y1="85"
                    stroke="#0ea5e9"
                    strokeWidth="1.2"
                    strokeDasharray={wireframe ? "2 2" : "none"}
                  />
                  {/* Biological depth layers */}
                  <rect x="70" y="10" width="25" height="80" fill="rgba(14, 165, 233, 0.05)" stroke="#38bdf8" strokeWidth="0.4" strokeDasharray="4 2" />
                  {/* Dynamic angle labels */}
                  <text x="18" y="78" fill="#64748b" fontSize="4.5">ANGLE: {Math.round(Math.abs(coords.y - 85) * 0.7)}°</text>
                  
                  {/* Active target marker */}
                  <motion.circle
                    animate={{ cx: coords.x, cy: coords.y }}
                    transition={{ type: 'spring', stiffness: 120 }}
                    r="4.5"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="1"
                  />
                  <motion.circle
                    animate={{ cx: coords.x, cy: coords.y }}
                    transition={{ type: 'spring', stiffness: 120 }}
                    r="9"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="0.4"
                    strokeDasharray="2 1"
                  />
                </>
              )}

              {viewport === 'trajectory' && (
                <>
                  {/* Origin Point and splatters */}
                  <circle cx="20" cy="40" r="2.5" fill="#ef4444" opacity="0.6" />
                  {/* Dynamic trajectories radiating */}
                  {showRays && (
                    <>
                      <line x1="20" y1="40" x2="80" y2="25" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="1 1" />
                      <line x1="20" y1="40" x2="85" y2="65" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="1 1" />
                      <line x1="20" y1="40" x2={coords.x} y2={coords.y} stroke="#0ea5e9" strokeWidth="1.5" />
                    </>
                  )}
                  {/* Fluid distribution arc */}
                  <path d="M 70 20 Q 80 50 70 80" fill="none" stroke="#475569" strokeWidth="0.5" strokeDasharray="3 3" />
                  
                  <motion.circle
                    animate={{ cx: coords.x, cy: coords.y }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    r="4"
                    fill="#38bdf8"
                    className="animate-pulse"
                  />
                  <text x="25" y="35" fill="#ef4444" fontSize="4" opacity="0.8">ORIGIN_POI</text>
                </>
              )}

              {viewport === 'room' && (
                <>
                  {/* Isometric room skeleton */}
                  <polygon points="15,20 50,5 85,20 85,75 50,95 15,75" fill="none" stroke="#334155" strokeWidth="0.5" />
                  <line x1="50" y1="5" x2="50" y2="95" stroke="#334155" strokeWidth="0.5" />
                  <line x1="15" y1="20" x2="50" y2="50" stroke="#334155" strokeWidth="0.5" />
                  <line x1="85" y1="20" x2="50" y2="50" stroke="#334155" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="50" y2="95" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray={wireframe ? "2 2" : "none"} />

                  {/* Dynamic placement vector within bounds */}
                  <motion.line
                    animate={{ x2: coords.x, y2: coords.y }}
                    transition={{ type: 'spring', stiffness: 90 }}
                    x1="50"
                    y1="50"
                    stroke="#22d3ee"
                    strokeWidth="1"
                  />
                  
                  <motion.circle
                    animate={{ cx: coords.x, cy: coords.y }}
                    transition={{ type: 'spring', stiffness: 90 }}
                    r="3.5"
                    fill="#22d3ee"
                  />
                </>
              )}
            </svg>

            {/* Floating Coordinate HUD overlay */}
            <div className="absolute bottom-2 left-2 bg-slate-950/90 border border-slate-900 p-2 rounded text-[8px] space-y-0.5 text-slate-400">
              <div>POI_COORDS: [X: {coords.x}, Y: {coords.y}]</div>
              <div>POI_ALPHA_RAD: {(coords.x * 0.017).toFixed(4)}</div>
            </div>

            {/* Static overlay target indicators */}
            <div className="absolute top-2 left-2 flex items-center space-x-1 bg-cold-950/80 px-2 py-0.5 rounded border border-slate-900 text-slate-500 text-[7px]">
              <span>MAG: 4.0X</span>
              <span>•</span>
              <span>GRID: 10cm</span>
            </div>
          </div>

          {/* Interactive controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-slate-300">
            {/* Presets */}
            <div className="flex space-x-2">
              <button
                onClick={() => setViewport('impact')}
                id="viewport-impact-btn"
                className={`px-2.5 py-1.5 rounded text-[9px] uppercase tracking-wider font-bold transition-all focus:outline-none ${
                  viewport === 'impact' ? 'bg-cold-500 text-white' : 'bg-slate-900 hover:bg-slate-800'
                }`}
              >
                {lang === 'it' ? 'Reperto' : 'Evidence'}
              </button>
              <button
                onClick={() => setViewport('trajectory')}
                id="viewport-trajectory-btn"
                className={`px-2.5 py-1.5 rounded text-[9px] uppercase tracking-wider font-bold transition-all focus:outline-none ${
                  viewport === 'trajectory' ? 'bg-cold-500 text-white' : 'bg-slate-900 hover:bg-slate-800'
                }`}
              >
                {lang === 'it' ? 'Traiettoria' : 'Trajectory'}
              </button>
              <button
                onClick={() => setViewport('room')}
                id="viewport-room-btn"
                className={`px-2.5 py-1.5 rounded text-[9px] uppercase tracking-wider font-bold transition-all focus:outline-none ${
                  viewport === 'room' ? 'bg-cold-500 text-white' : 'bg-slate-900 hover:bg-slate-800'
                }`}
              >
                {lang === 'it' ? 'Stanza' : 'Room Layout'}
              </button>
            </div>

            {/* Wireframe Toggles */}
            <div className="flex items-center space-x-3 text-[9px]">
              <label className="flex items-center space-x-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={wireframe}
                  onChange={() => setWireframe(!wireframe)}
                  id="chk-wireframe-mode"
                  className="rounded bg-cold-950 border-slate-800 text-cold-500 focus:ring-0"
                />
                <span className="text-slate-400 uppercase tracking-widest font-bold">Mesh</span>
              </label>

              {viewport === 'trajectory' && (
                <label className="flex items-center space-x-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showRays}
                    onChange={() => setShowRays(!showRays)}
                    id="chk-fluid-rays"
                    className="rounded bg-cold-950 border-slate-800 text-cold-500 focus:ring-0"
                  />
                  <span className="text-slate-400 uppercase tracking-widest font-bold">Raggi</span>
                </label>
              )}
            </div>
          </div>

          {/* Footer of Visor */}
          <div className="flex justify-between items-center text-slate-500 text-[8px] border-t border-slate-900 pt-2 font-mono">
            <span>{t['fora-wireframe']}</span>
            <a
              href="https://fora-forensic-open-reconstruction.vercel.app/#vision"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline flex items-center space-x-1 font-bold"
            >
              <span>{t['fora-inspect']}</span>
              <span>↗</span>
            </a>
          </div>

        </div>

      </div>

      {/* Horizontal Divider */}
      <div className="my-8 md:my-10 border-t border-cyan-950/40"></div>

      {/* NEW SECTION: DATA VISUALIZATION WIDGET (RECHARTS) */}
      <div className="space-y-6 text-left relative z-10">
        <div className="space-y-2">
          <span className="text-cold-400 font-mono text-[9px] uppercase tracking-widest font-bold bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-900/20">
            // METRIC_ANALYSIS // DASHBOARD PRESTAZIONALE
          </span>
          <h4 className="text-lg md:text-xl font-bold font-serif text-slate-100 uppercase tracking-wide">
            {lang === 'it' 
              ? 'Confronto Prestazioni Scientifiche: Precisione e Tempi' 
              : 'Scientific Performance Comparison: Precision & Timeframes'}
          </h4>
          <p className="text-slate-400 text-xs max-w-3xl leading-relaxed">
            {lang === 'it'
              ? "Un'analisi comparativa quantitativa tra i metodi tradizionali di rilevazione forense e la ricostruzione tridimensionale ad alta definizione del protocollo FORA 3D dello Studio Angelini."
              : "A quantitative comparative analysis between traditional forensic survey methods and the high-definition 3D reconstruction of the FORA 3D protocol by Studio Angelini."}
          </p>
        </div>

        {/* Bento Grid layout for charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Chart 1: Precisione Millimetrica */}
          <div className="bg-slate-950/80 border border-slate-900 p-4 md:p-5 rounded-lg space-y-4">
            <div className="flex items-start justify-between border-b border-slate-900 pb-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-cyan-400 text-[10px] font-mono uppercase tracking-widest font-bold">
                  <Target className="w-3.5 h-3.5" />
                  <span>{currentLabels.precisionTitle}</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  {currentLabels.precisionDesc}
                </p>
              </div>
              <span className="text-[8.5px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded shrink-0 uppercase tracking-wider font-bold">
                {lang === 'it' ? 'SUB-MILLIMETRICO' : 'SUB-MILLIMETER'}
              </span>
            </div>

            <div className="h-56 w-full flex items-center justify-center font-mono text-[10px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={precisionData} margin={{ top: 15, right: 10, left: -25, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorTrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorFora" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" opacity={0.6} />
                  <XAxis 
                    dataKey="task" 
                    tick={{ fill: '#94a3b8', fontSize: 8, fontFamily: 'monospace' }} 
                    stroke="#1e293b" 
                  />
                  <YAxis 
                    tick={{ fill: '#94a3b8', fontSize: 8, fontFamily: 'monospace' }} 
                    stroke="#1e293b" 
                  />
                  <RechartsTooltip content={<CustomTooltip unit="mm" />} />
                  <RechartsLegend 
                    wrapperStyle={{ fontSize: '9px', fontFamily: 'monospace', paddingTop: '10px' }} 
                    iconSize={8}
                    iconType="circle"
                  />
                  <Area 
                    type="monotone" 
                    name={currentLabels.traditional} 
                    dataKey="traditional" 
                    stroke="#ef4444" 
                    strokeWidth={1.5} 
                    fillOpacity={1} 
                    fill="url(#colorTrad)" 
                  />
                  <Area 
                    type="monotone" 
                    name={currentLabels.fora3d} 
                    dataKey="fora3d" 
                    stroke="#06b6d4" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorFora)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Tempi di Elaborazione */}
          <div className="bg-slate-950/80 border border-slate-900 p-4 md:p-5 rounded-lg space-y-4">
            <div className="flex items-start justify-between border-b border-slate-900 pb-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-emerald-400 text-[10px] font-mono uppercase tracking-widest font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentLabels.timeTitle}</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  {currentLabels.timeDesc}
                </p>
              </div>
              <span className="text-[8.5px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded shrink-0 uppercase tracking-wider font-bold">
                {lang === 'it' ? 'ELABORAZIONE HD' : 'HD PROCESSING'}
              </span>
            </div>

            <div className="h-56 w-full flex items-center justify-center font-mono text-[10px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeData} margin={{ top: 15, right: 10, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" opacity={0.6} />
                  <XAxis 
                    dataKey="phase" 
                    tick={{ fill: '#94a3b8', fontSize: 8, fontFamily: 'monospace' }} 
                    stroke="#1e293b" 
                  />
                  <YAxis 
                    tick={{ fill: '#94a3b8', fontSize: 8, fontFamily: 'monospace' }} 
                    stroke="#1e293b" 
                  />
                  <RechartsTooltip content={<CustomTooltip unit="h" />} />
                  <RechartsLegend 
                    wrapperStyle={{ fontSize: '9px', fontFamily: 'monospace', paddingTop: '10px' }} 
                    iconSize={8}
                    iconType="rect"
                  />
                  <Bar 
                    name={currentLabels.traditional} 
                    dataKey="traditional" 
                    fill="#334155" 
                    radius={[2, 2, 0, 0]} 
                  />
                  <Bar 
                    name={currentLabels.fora3d} 
                    dataKey="fora3d" 
                    fill="#10b981" 
                    radius={[2, 2, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Dynamic callout note */}
        <div className="bg-cyan-950/10 border border-cyan-900/20 rounded-lg p-3 text-[10px] font-mono text-cyan-400/90 flex items-start space-x-3">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider">
              {lang === 'it' ? 'NOTA DI PROTOCOLLO:' : 'PROTOCOL NOTE:'}
            </span>
            <p className="leading-relaxed">
              {lang === 'it'
                ? "Il software FORA abbatte l'errore metrico del 98.5% rispetto alle rilevazioni manuali classiche (rotella metrica, distanziometri laser non integrati) e riduce i tempi di elaborazione grafica dei vettori grazie all'automazione geometrica cloud-based dello studio."
                : "FORA software cuts metric error margin by 98.5% compared to classic manual surveys (measuring tape, unintegrated laser rangefinders) and dramatically shrinks graphical vector processing time through the studio's cloud-based geometric automation."}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
