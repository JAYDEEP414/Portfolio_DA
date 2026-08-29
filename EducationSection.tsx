import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  FileCheck, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RotateCw
} from 'lucide-react';
import { educationData, certificationsData } from '../data/portfolioData';
import { playUiSound } from '../utils/audio';

export const EducationSection: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    playUiSound('click');
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3 backdrop-blur-md">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>ACADEMIC FOUNDATION & CREDENTIALS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Education &{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500 bg-clip-text text-transparent">
            Certifications
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          3D orbital pathways in background. Click cards to inspect verified credentials.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Formal Degree & Coursework Card */}
        <motion.div
          initial={{ opacity: 0, x: -30, rotateY: 15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#0b0f19]/95 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/40 shadow-2xl relative preserve-3d"
        >
          {/* Top Badge */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs font-mono text-cyan-400">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span className="font-bold uppercase">DEGREE PROGRAM</span>
            </div>
            <span className="text-slate-300 font-semibold">{educationData.year}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-1">
            {educationData.degree}
          </h3>
          <div className="text-sm font-semibold text-purple-400 mb-2">
            {educationData.institution}
          </div>
          {educationData.grade && (
            <div className="inline-block text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/50 mb-6 font-semibold">
              {educationData.grade}
            </div>
          )}

          {/* Relevant Coursework Matrix */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-200 font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>RELEVANT COURSEWORK & FOCUS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {educationData.coursework.map((course, cIdx) => (
                <div
                  key={cIdx}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="line-clamp-1 font-medium">{course}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: 3D Interactive Certification Cards */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Award className="w-4 h-4" /> PROFESSIONAL CERTIFICATIONS
            </span>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <RotateCw className="w-3 h-3 text-cyan-400" /> Click to Flip 3D
            </span>
          </div>

          {certificationsData.map((cert, idx) => {
            const isFlipped = !!flippedCards[cert.id];

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                onClick={() => toggleFlip(cert.id)}
                className="perspective-1000 cursor-pointer min-h-[140px]"
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="relative w-full h-full preserve-3d"
                >
                  {/* Front Side */}
                  <div className="p-5 rounded-2xl bg-[#0b0f19]/95 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 shadow-xl flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0 shadow-md">
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-cyan-300 uppercase font-bold">
                          {cert.verificationId}
                        </span>
                        <span className="text-xs font-mono text-slate-300">{cert.year}</span>
                      </div>
                      <h4 className="text-base font-display font-bold text-white mt-1">
                        {cert.name}
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5">{cert.issuer}</p>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {cert.skillsGained.slice(0, 3).map((sk, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-200 border border-slate-800 font-medium"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Back Side (3D Flipped) */}
                  <div
                    style={{ transform: 'rotateY(180deg)' }}
                    className="absolute inset-0 p-5 rounded-2xl bg-gradient-to-br from-emerald-950/90 via-slate-900 to-slate-950 border border-emerald-400/60 shadow-2xl backface-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-emerald-300 pb-2 border-b border-emerald-900">
                        <span className="flex items-center gap-1.5 font-bold">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          VERIFIED CREDENTIAL
                        </span>
                        <span>{cert.verificationId}</span>
                      </div>
                      <p className="text-xs text-slate-200 mt-2">
                        Validated curriculum covering data governance, performance tuning, and executive BI architecture.
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-emerald-400/80 font-mono">
                      <span>ISSUER: {cert.issuer}</span>
                      <span className="underline">Click to flip back</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
