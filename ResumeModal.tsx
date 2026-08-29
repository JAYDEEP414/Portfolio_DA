import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github,
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';
import { personalInfo, experienceData, skillCategories, educationData, certificationsData } from '../data/portfolioData';
import { playUiSound } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    playUiSound('click');
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[90vh] my-auto flex flex-col rounded-3xl bg-[#05060a]/95 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Header Action Bar */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyan-400 font-display font-bold text-sm sm:text-base">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Curriculum Vitae — Jaydeep Sutar</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-cyan-400" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={() => {
                  playUiSound('click');
                  onClose();
                }}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close Resume"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Document Body */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-slate-100 bg-[#05060a]">
            {/* CV Header */}
            <div className="border-b border-white/10 pb-6">
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                {personalInfo.name}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-cyan-400 mt-1">
                {personalInfo.title}
              </p>

              {/* Contact Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 mt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {personalInfo.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  {personalInfo.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  {personalInfo.email}
                </span>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {personalInfo.summary}
              </p>
            </div>

            {/* Technical Skills Matrix */}
            <div>
              <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3">
                TECHNICAL ARSENAL
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {skillCategories.map((cat, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-xs font-display font-bold text-white mb-1.5">
                      {cat.title}
                    </h3>
                    <div className="space-y-1">
                      {cat.skills.map((s, sIdx) => (
                        <div key={sIdx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span>{s.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Work & Internship Experience */}
            <div>
              <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-4">
                EXPERIENCE & INTERNSHIPS
              </h2>
              <div className="space-y-6">
                {experienceData.map((exp) => (
                  <div key={exp.id} className="space-y-2 border-l-2 border-slate-800 pl-4">
                    <div className="flex flex-wrap items-center justify-between">
                      <h3 className="text-sm font-display font-bold text-white">
                        {exp.role} — <span className="text-cyan-300">{exp.company}</span>
                      </h3>
                      <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                    </div>
                    <div className="text-[11px] font-mono text-indigo-300">
                      {exp.programType} | {exp.location}
                    </div>
                    <ul className="space-y-1 pt-1">
                      {exp.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="text-xs text-slate-300 list-disc list-inside">
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              <div>
                <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  EDUCATION
                </h2>
                <div className="text-sm font-bold text-white">{educationData.degree}</div>
                <div className="text-xs text-slate-300 mt-0.5">{educationData.institution}</div>
                <div className="text-xs font-mono text-indigo-400 mt-1">{educationData.year}</div>
              </div>

              <div>
                <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  CERTIFICATIONS
                </h2>
                <div className="space-y-2">
                  {certificationsData.map((c) => (
                    <div key={c.id} className="text-xs text-slate-300">
                      <span className="font-semibold text-white">{c.name}</span> —{' '}
                      <span className="text-slate-400">{c.issuer}</span> ({c.year})
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
