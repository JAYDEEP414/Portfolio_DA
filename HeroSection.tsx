import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowDown, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  FileDown, 
  Sparkles, 
  Database, 
  TrendingUp, 
  Layers
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { SectionId } from '../types';
import { playUiSound } from '../utils/audio';

interface HeroSectionProps {
  onNavigate: (sectionId: SectionId) => void;
  onOpenResume: () => void;
  mousePos: { x: number; y: number };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenResume,
  mousePos
}) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for roles
  useEffect(() => {
    const currentRole = personalInfo.subtitles[roleIndex];
    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % personalInfo.subtitles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentRole.substring(0, displayText.length - 1)
          : currentRole.substring(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center text-center pt-8 pb-12">
      {/* Top Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-widest backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>AVAILABLE FOR REMOTE & FULL-TIME ROLES</span>
        <span className="text-white/20">•</span>
        <span className="text-slate-400">PUNE, IN</span>
      </motion.div>

      {/* Main Big Name Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, z: -50 }}
        animate={{ opacity: 1, scale: 1, z: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative preserve-3d"
        style={{
          transform: `perspective(1000px) rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 4}deg)`
        }}
      >
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white mb-4">
          <span className="relative inline-block bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            Jaydeep Sutar
          </span>
        </h1>
      </motion.div>

      {/* Animated Cycling Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="h-10 sm:h-12 flex items-center justify-center mb-6"
      >
        <div className="text-xl sm:text-3xl font-display font-semibold text-cyan-300 flex items-center gap-2">
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500 bg-clip-text text-transparent">
            {displayText}
          </span>
          <span className="w-0.5 h-6 sm:h-8 bg-cyan-400 animate-pulse inline-block" />
        </div>
      </motion.div>

      {/* Intro Description */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="max-w-2xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed mb-8 px-4 font-normal"
      >
        Results-driven Data Analyst transforming{' '}
        <span className="font-bold text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-500/40">
          50,000+ records
        </span>{' '}
        into revenue-driving business intelligence.
      </motion.p>

      {/* Primary CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-12"
      >
        <button
          onClick={() => {
            playUiSound('whoosh');
            onNavigate('projects');
          }}
          onMouseEnter={() => playUiSound('hover')}
          className="group relative px-8 py-3.5 rounded-full bg-white text-black font-bold text-sm shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
        >
          <Layers className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
          <span>View Projects</span>
        </button>

        <button
          onClick={() => {
            playUiSound('modal');
            onOpenResume();
          }}
          onMouseEnter={() => playUiSound('hover')}
          className="px-8 py-3.5 rounded-full bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-white font-bold text-sm hover:bg-slate-800 transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 shadow-lg"
        >
          <FileDown className="w-4 h-4 text-cyan-400" />
          <span>Resume CV</span>
        </button>

        <button
          onClick={() => {
            playUiSound('whoosh');
            onNavigate('contact');
          }}
          onMouseEnter={() => playUiSound('hover')}
          className="px-8 py-3.5 rounded-full bg-slate-900/90 border border-slate-700 hover:border-purple-400 text-slate-100 hover:text-white font-bold text-sm hover:bg-slate-800 transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 shadow-lg"
        >
          <Mail className="w-4 h-4 text-purple-400" />
          <span>Get in Touch</span>
        </button>
      </motion.div>

      {/* Social Links & Hover Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="flex items-center justify-center gap-3 mb-12"
      >
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => playUiSound('hover')}
          className="p-3 rounded-full bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-110 active:scale-95 shadow-md"
          aria-label="Jaydeep Sutar GitHub Profile"
        >
          <Github className="w-4 h-4" />
        </a>

        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => playUiSound('hover')}
          className="p-3 rounded-full bg-slate-900/90 border border-slate-700 hover:border-sky-400 text-slate-200 hover:text-white hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all hover:scale-110 active:scale-95 shadow-md"
          aria-label="Jaydeep Sutar LinkedIn Profile"
        >
          <Linkedin className="w-4 h-4 text-sky-400" />
        </a>

        <a
          href={`mailto:${personalInfo.email}`}
          onMouseEnter={() => playUiSound('hover')}
          className="p-3 rounded-full bg-slate-900/90 border border-slate-700 hover:border-purple-400 text-slate-200 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:scale-110 active:scale-95 shadow-md"
          aria-label="Send Email to Jaydeep Sutar"
        >
          <Mail className="w-4 h-4 text-purple-400" />
        </a>
      </motion.div>

      {/* Floating 3D Metric Highlights Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 text-left mb-10"
      >
        {personalInfo.quickStats.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-[#0b0f19]/95 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 shadow-2xl transition-all duration-300 group"
          >
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-300">{stat.label}</span>
              {idx === 0 && <Database className="w-3.5 h-3.5 text-cyan-400" />}
              {idx === 1 && <TrendingUp className="w-3.5 h-3.5 text-purple-400" />}
              {idx === 2 && <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
              {idx === 3 && <Layers className="w-3.5 h-3.5 text-sky-400" />}
            </div>
            <div className="flex items-baseline gap-1 font-display font-extrabold text-2xl sm:text-3xl text-white group-hover:text-cyan-400 transition-colors">
              <span>{stat.value}</span>
              {stat.suffix && (
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  {stat.suffix}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">{stat.detail}</p>
          </div>
        ))}
      </motion.div>

      {/* Core Stack Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.75 }}
        className="w-full max-w-4xl pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-left"
      >
        <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
          CORE ARSENAL
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-slate-200">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-medium">Power BI (DAX / Modeling)</span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-medium">Advanced SQL</span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-medium">Python (Pandas / Seaborn)</span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-medium">Excel & ETL</span>
        </div>
      </motion.div>

      {/* Dolly-Forward Scroll Cue */}
      <motion.button
        onClick={() => {
          playUiSound('whoosh');
          onNavigate('about');
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="mt-12 inline-flex flex-col items-center gap-2 text-xs font-mono text-cyan-400/80 hover:text-cyan-300 transition-colors cursor-pointer group"
      >
        <span className="tracking-widest uppercase text-[10px]">SCROLL OR CLICK TO ENTER 3D FLIGHT</span>
        <div className="w-8 h-8 rounded-full border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_#38bdf8]">
          <ArrowDown className="w-4 h-4 text-cyan-400" />
        </div>
      </motion.button>
    </div>
  );
};
