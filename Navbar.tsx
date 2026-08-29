import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SectionId, 
  PerformanceMode 
} from '../types';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  FileText, 
  Menu, 
  X,
  Compass
} from 'lucide-react';
import { playUiSound } from '../utils/audio';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  performanceMode: PerformanceMode;
  onCyclePerformanceMode: () => void;
  onOpenResume: () => void;
}

const navItems: { id: SectionId; label: string; num: string }[] = [
  { id: 'hero', label: 'Home', num: '01' },
  { id: 'about', label: 'About', num: '02' },
  { id: 'skills', label: 'Skills', num: '03' },
  { id: 'experience', label: 'Experience', num: '04' },
  { id: 'projects', label: 'Projects', num: '05' },
  { id: 'education', label: 'Education', num: '06' },
  { id: 'contact', label: 'Contact', num: '07' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  soundEnabled,
  onToggleSound,
  performanceMode,
  onCyclePerformanceMode,
  onOpenResume,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: SectionId) => {
    playUiSound('whoosh');
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 lg:px-12 py-4 pointer-events-none bg-gradient-to-b from-[#05060a]/90 via-[#05060a]/40 to-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Monogram */}
        <button
          onClick={() => handleNavClick('hero')}
          className="group flex items-center gap-3 text-left"
          aria-label="Navigate to Home"
        >
          <div className="w-8 h-8 bg-cyan-500 rounded-lg rotate-12 flex items-center justify-center text-black font-extrabold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:rotate-0 transition-transform duration-300">
            JS
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              JAYDEEP SUTAR
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              Data BI Specialist
            </span>
          </div>
        </button>

        {/* Desktop 4D Waypoint Navigation Dock */}
        <nav className="hidden md:flex items-center gap-6 px-5 py-2 rounded-full bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => playUiSound('hover')}
                className={`relative py-1 text-xs font-medium uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-cyan-400 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="font-mono text-[9px] opacity-60">{item.num}.</span>
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#06b6d4]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Sound, Performance Mode, Resume */}
        <div className="flex items-center gap-2.5">
          {/* Sound Synthesizer Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) {
                setTimeout(() => playUiSound('click'), 50);
              }
            }}
            title={soundEnabled ? 'Disable UI Sound Effects' : 'Enable Sci-Fi Audio Synthesis'}
            className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center ${
              soundEnabled
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Performance Mode Selector */}
          <button
            onClick={() => {
              playUiSound('click');
              onCyclePerformanceMode();
            }}
            title={`3D Quality Mode: ${performanceMode.toUpperCase()} (Click to toggle)`}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500/30 text-xs font-mono text-slate-300 transition-all backdrop-blur-md"
          >
            <Sparkles className={`w-3 h-3 ${performanceMode === 'ultra' ? 'text-cyan-400 animate-pulse' : 'text-slate-400'}`} />
            <span className="uppercase text-[10px] font-bold tracking-wider text-cyan-400">
              {performanceMode}
            </span>
          </button>

          {/* Resume Trigger */}
          <button
            onClick={() => {
              playUiSound('modal');
              onOpenResume();
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black hover:bg-slate-100 font-bold text-xs shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all transform active:scale-95"
          >
            <FileText className="w-3.5 h-3.5 text-black" />
            <span>CV / Resume</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-slate-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mt-3 p-4 rounded-2xl glass-panel-glow border border-cyan-500/30 shadow-2xl backdrop-blur-2xl pointer-events-auto max-w-sm mx-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-cyan-400">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> 4D CAMERA WAYPOINTS
              </span>
              <span className="text-[10px] text-slate-400 uppercase">MODE: {performanceMode}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-semibold'
                        : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border border-transparent'
                    }`}
                  >
                    <span className="font-mono text-[9px] text-cyan-400/80">{item.num}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
