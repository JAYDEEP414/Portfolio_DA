import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Terminal, 
  LineChart, 
  Layers, 
  ArrowRight,
  Database,
  BarChart4,
  Award
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { SectionId } from '../types';
import { playUiSound } from '../utils/audio';

interface AboutSectionProps {
  onNavigate: (sectionId: SectionId) => void;
  mousePos: { x: number; y: number };
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const pillars = [
    {
      title: "Data Cleansing & Ingestion",
      desc: "Pruning outliers, handling missing values, and validating integrity across 50k+ raw records in Python/Pandas.",
      icon: Terminal,
      color: "text-cyan-400"
    },
    {
      title: "Dimensional KPI Modeling",
      desc: "Structuring DAX measures, CLV, AOV, and return rate ratios to surface non-linear profit opportunities.",
      icon: BarChart4,
      color: "text-indigo-400"
    },
    {
      title: "Executive Storytelling",
      desc: "Delivering intuitive, drill-through Power BI portals that cut weekly reporting cycles by ~35%.",
      icon: LineChart,
      color: "text-sky-400"
    },
    {
      title: "Statistical Rigour",
      desc: "Applying hypothesis validation, correlation heatmaps, and IQR distributions to substantiate findings.",
      icon: Layers,
      color: "text-emerald-400"
    }
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3 backdrop-blur-md">
          <Terminal className="w-3.5 h-3.5" />
          <span>ANALYTICAL PROFILE & IMPACT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Transforming Chaos into{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500 bg-clip-text text-transparent">
            Clarity & Capital
          </span>
        </h2>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Main 3D Elevated Summary Block */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#0b0f19]/95 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/40 shadow-2xl relative flex flex-col justify-between"
        >
          {/* Top Decorative Node Line */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs font-mono text-cyan-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
              <span className="font-semibold uppercase tracking-wider">Executive Dossier</span>
            </div>
            <span className="text-slate-300 text-[11px] font-mono">BSc CS 2025 // SPPU</span>
          </div>

          {/* Primary Prompt Summary Text Block */}
          <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
            <p className="border-l-2 border-cyan-400 pl-4 py-1 text-slate-100 font-normal">
              {personalInfo.summary}
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-800">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-display font-bold text-cyan-400">50K+</div>
              <div className="text-[10px] text-slate-300 font-mono uppercase tracking-wider mt-0.5">Records Cleaned</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-display font-bold text-purple-400">~35%</div>
              <div className="text-[10px] text-slate-300 font-mono uppercase tracking-wider mt-0.5">Decision Speed</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-display font-bold text-emerald-400">+18%</div>
              <div className="text-[10px] text-slate-300 font-mono uppercase tracking-wider mt-0.5">Projected Margin</div>
            </div>
          </div>

          {/* Bottom Action Trigger */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>Savitribai Phule Pune University</span>
            </div>

            <button
              onClick={() => {
                playUiSound('whoosh');
                onNavigate('skills');
              }}
              onMouseEnter={() => playUiSound('hover')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <span>Explore Technical Arsenal</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Right 4 Pillars Matrix */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-[#0b0f19]/95 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/40 shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${pillar.color} group-hover:scale-110 transition-transform shadow-md shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
