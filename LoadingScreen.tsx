import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'ready' | 'exit'>('loading');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setPhase('ready');
          setTimeout(() => {
            setPhase('exit');
            setTimeout(onComplete, 600);
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050711] text-white preserve-3d"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* 3D Morphing JS Monogram Emblem */}
          <motion.div
            initial={{ scale: 0.6, rotateY: -90, opacity: 0 }}
            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-32 h-32 flex items-center justify-center preserve-3d mb-8"
          >
            {/* Outer Spinning Holographic Rings */}
            <motion.div
              animate={{ rotateZ: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="absolute inset-0 rounded-2xl border border-cyan-400/40 border-dashed"
            />
            <motion.div
              animate={{ rotateZ: -360 }}
              transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
              className="absolute -inset-3 rounded-full border border-indigo-500/30"
            />

            {/* Glowing Center 3D Plate */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-950/80 via-slate-900 to-indigo-950/90 border border-cyan-400/50 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.3)] backdrop-blur-md">
              <span className="font-display font-extrabold text-3xl tracking-tighter bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]">
                JS
              </span>
              <span className="text-[9px] font-mono tracking-widest text-cyan-400/80 uppercase">
                4D CORE
              </span>
            </div>
          </motion.div>

          {/* Title & Coordinates */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-2 mb-6"
          >
            <h2 className="text-xl font-display font-bold tracking-tight text-white flex items-center justify-center gap-2">
              <span>Jaydeep Sutar</span>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-mono">
                DATA BI
              </span>
            </h2>
            <p className="text-xs font-mono text-slate-400 tracking-wider">
              INITIALIZING 4D CAMERA CHOREOGRAPHY & THREE.JS SCENE...
            </p>
          </motion.div>

          {/* Progress Bar with Data Node Ticks */}
          <div className="w-64 max-w-[80vw] space-y-2">
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 rounded-full shadow-[0_0_10px_#38bdf8]"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span className="text-cyan-400 flex items-center gap-1">
                <Play className="w-2.5 h-2.5 fill-current animate-pulse" />
                LOADING MESHES
              </span>
              <span>{Math.min(100, progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
