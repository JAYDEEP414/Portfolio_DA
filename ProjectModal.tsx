import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Github, 
  BarChart3, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Layers,
  Database
} from 'lucide-react';
import { ProjectItem } from '../types';
import { playUiSound } from '../utils/audio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative w-full max-w-3xl my-8 p-6 sm:p-8 rounded-3xl bg-[#0b0f19] border border-slate-700 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-left"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              playUiSound('click');
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge & Title */}
          <div className="mb-4 pr-10">
            <span className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/50">
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-2">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-cyan-300 mt-1 font-semibold">
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-200 leading-relaxed mb-6 font-normal">
            {project.description}
          </p>

          {/* KPI Metrics Highlight Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-lg sm:text-xl font-display font-extrabold text-cyan-400">
                  {metric.value}
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-200 uppercase mt-0.5">
                  {metric.label}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {metric.context}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Visual Dashboard Breakdown */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 mb-6">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs font-mono text-cyan-400">
              <span className="flex items-center gap-1.5 font-bold">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                {project.demoVisual.title}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">AGGREGATED DATA VISUALIZER</span>
            </div>

            {project.demoVisual.type === 'bar' ? (
              <div className="space-y-3">
                {project.demoVisual.dataPoints.map((pt, pIdx) => {
                  const maxVal = 1500;
                  const pct = (pt.value / maxVal) * 100;
                  return (
                    <div key={pIdx}>
                      <div className="flex justify-between text-xs font-mono text-slate-200 mb-1">
                        <span>{pt.label}</span>
                        <span className="text-cyan-300 font-bold">${pt.value}k Gross</span>
                      </div>
                      <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
                        <div
                          style={{ width: `${pct}%` }}
                          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {project.demoVisual.dataPoints.map((pt, pIdx) => (
                  <div key={pIdx} className="p-3 rounded-xl bg-slate-950 text-center border border-slate-800">
                    <div className="text-xl font-display font-bold text-purple-400">{pt.value}%</div>
                    <div className="text-[11px] text-slate-300 mt-1 font-medium">{pt.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Key Deliverables & Highlights */}
          <div className="space-y-2 mb-6">
            <h3 className="text-xs font-mono text-slate-300 uppercase tracking-wider font-semibold">
              KEY ARCHITECTURAL HIGHLIGHTS
            </h3>
            {project.highlights.map((hl, hIdx) => (
              <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="font-normal">{hl}</span>
              </div>
            ))}
          </div>

          {/* Tools & External Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((tool, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-200 border border-slate-800 font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repo</span>
                </a>
              )}
              <button
                onClick={() => {
                  playUiSound('click');
                  onClose();
                }}
                className="px-5 py-2 rounded-full bg-white text-black hover:bg-slate-100 text-xs font-bold shadow-lg transition-all"
              >
                Close View
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
