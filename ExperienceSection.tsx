import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Code, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Database,
  BarChart3
} from 'lucide-react';
import { experienceData } from '../data/portfolioData';
import { playUiSound } from '../utils/audio';

export const ExperienceSection: React.FC = () => {
  const [expandedSqlId, setExpandedSqlId] = useState<string | null>('decodelabs');

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3 backdrop-blur-md">
          <Briefcase className="w-3.5 h-3.5" />
          <span>CAREER TRAJECTORY & IMPACT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Professional{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500 bg-clip-text text-transparent">
            Internship Journey
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          3D camera tracks along the temporal data helix, aligning each milestone with spatial depth.
        </p>
      </div>

      {/* Vertical 3D Timeline */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Glowing Center Temporal Spine */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-purple-500 to-indigo-500 shadow-[0_0_12px_rgba(6,182,212,0.4)]" />

        <div className="space-y-12 sm:space-y-16">
          {experienceData.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            const hasSql = !!exp.sqlSnippet;
            const isSqlOpen = expandedSqlId === exp.id;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40, rotateX: 12, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 sm:gap-12 pl-10 sm:pl-0`}
              >
                {/* 3D Center Milestone Node */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-5 z-10">
                  <div className="w-8 h-8 rounded-full bg-[#05060a] border-2 border-cyan-400 shadow-[0_0_15px_#06b6d4] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
                  </div>
                </div>

                {/* Timeline Card */}
                <div className="w-full sm:w-[calc(50%-2.5rem)] p-6 sm:p-7 rounded-3xl bg-[#0b0f19]/95 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl group">
                  {/* Company & Role Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                        {exp.programType}
                      </span>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-cyan-400 transition-colors mt-1.5">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-semibold text-purple-400">
                        {exp.company}
                      </div>
                    </div>

                    <div className="text-right text-xs font-mono text-slate-300">
                      <div className="flex items-center gap-1.5 justify-end">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1.5 justify-end text-slate-400 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4 font-normal">
                    {exp.summary}
                  </p>

                  {/* Achievements Bullet List */}
                  <div className="space-y-2.5 mb-5">
                    {exp.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* KPI Badges if available */}
                  {exp.kpis && exp.kpis.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-900 border border-slate-800 mb-4">
                      {exp.kpis.map((kpi, kIdx) => (
                        <div key={kIdx} className="text-center">
                          <div className="text-xs sm:text-sm font-display font-bold text-cyan-400">
                            {kpi.value}
                          </div>
                          <div className="text-[9px] font-mono text-slate-300 font-semibold uppercase leading-tight mt-0.5">
                            {kpi.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {exp.skillsUsed.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-200 border border-slate-800 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Optional Interactive SQL Snippet Drawer */}
                  {hasSql && (
                    <div className="mt-4 pt-3 border-t border-slate-800">
                      <button
                        onClick={() => {
                          playUiSound('click');
                          setExpandedSqlId(isSqlOpen ? null : exp.id);
                        }}
                        className="w-full flex items-center justify-between text-xs font-mono text-purple-300 hover:text-purple-200 py-1"
                      >
                        <span className="flex items-center gap-1.5">
                          <Code className="w-3.5 h-3.5" />
                          {isSqlOpen ? 'Hide Optimized SQL Query' : 'View Sample Production SQL Query'}
                        </span>
                        {isSqlOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isSqlOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 p-3 rounded-xl bg-slate-950 border border-purple-500/30 overflow-x-auto text-[11px] font-mono text-cyan-300 leading-normal"
                        >
                          <pre>{exp.sqlSnippet}</pre>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
