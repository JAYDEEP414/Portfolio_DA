import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SectionId } from '../types';

interface SectionWrapperProps {
  id: SectionId;
  waypointIndex: number;
  waypointTitle: string;
  waypointCoords: string;
  mousePos: { x: number; y: number };
  children: React.ReactNode;
  className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  waypointIndex,
  waypointTitle,
  waypointCoords,
  mousePos,
  children,
  className = ''
}) => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Ensure section text remains clear and crisp without aggressive opacity/blur drops
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.85, 1, 1, 0.85]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.97, 1, 1, 0.97]);
  const rotateX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [3, 0, 0, -3]);
  const translateZ = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [-20, 0, 0, -20]);

  // Subtle mouse parallax for foreground elements
  const mouseTiltX = mousePos.y * -2;
  const mouseTiltY = mousePos.x * 2;

  return (
    <section
      ref={containerRef}
      id={id}
      data-section-id={id}
      className={`relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-12 perspective-1000 preserve-3d overflow-hidden ${className}`}
    >
      {/* 4D Section Depth HUD Indicator */}
      <div 
        className="w-full max-w-6xl mx-auto flex items-center justify-between text-xs tracking-widest uppercase font-mono text-cyan-400 mb-8 select-none pointer-events-none"
        style={{
          transform: `translate3d(${mousePos.x * -8}px, ${mousePos.y * -4}px, 20px)`
        }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
          <span className="font-semibold text-cyan-300">WAYPOINT 0{waypointIndex} // {waypointTitle}</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-slate-300 font-mono">
          <span>COORDS: <span className="text-cyan-200">{waypointCoords}</span></span>
          <span className="text-cyan-500/60">|</span>
          <span className="text-slate-300">4D CAM LINKED</span>
        </div>
      </div>

      {/* Main 4D Transforming Card Container */}
      <motion.div
        style={{
          opacity,
          scale,
          rotateX,
          z: translateZ,
          transform: `perspective(1000px) rotateX(${mouseTiltX}deg) rotateY(${mouseTiltY}deg)`
        }}
        className="w-full max-w-6xl mx-auto preserve-3d transition-transform duration-200 ease-out"
      >
        {children}
      </motion.div>
    </section>
  );
};
