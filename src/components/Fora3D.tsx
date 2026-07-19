import { useState, useRef, MouseEvent } from 'react';
import { Cpu, RotateCcw, Compass, ZoomIn, Info } from 'lucide-react';
import { Language, translations } from '../types';
import { motion } from 'motion/react';
import SectionLogo from './SectionLogo';

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

    </div>
  );
}
