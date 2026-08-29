import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  FolderGit2, 
  ExternalLink, 
  Sparkles, 
  BarChart3, 
  ArrowRight, 
  TrendingUp,
  Layers,
  Database
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { playUiSound } from '../utils/audio';

interface ProjectTiltCardProps {
  project: ProjectItem;
  onSelect: (p: ProjectItem) => void;
  index: number;
}

const ProjectTiltCard: React.FC<ProjectTiltCardProps> = ({ project, onSelect, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -12; // Max 12 deg tilt
    const rY = ((x - centerX) / centerX) * 12;
    setRotateX(rX);
    setRotateY(rY);
    setShadowX(((x - centerX) / centerX) * -20);
    setShadowY(((y - centerY) / centerY) * -20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShadowX(0);
    setShadowY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, z: -60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, z: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="perspective-1000 h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setIsHovered(true);
          playUiSound('hover');
        }}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${isHovered ? 25 : 0}px)`,
          boxShadow: isHovered
            ? `${shadowX}px ${shadowY}px 45px rgba(6, 182, 212, 0.25), 0 20px 40px rgba(0,0,0,0.9)`
            : '0 20px 50px rgba(0,0,0,0.7)',
          transition: 'transform 0.15s ease-out, box-shadow 0.2s ease-out'
        }}
        className="relative h-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#0b0f19]/95 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 transition-colors duration-300 preserve-3d"
      >
        {/* Dynamic Glare Specular Highlight following cursor */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${50 + rotateY * 3}% ${50 - rotateX * 3}%, rgba(6, 182, 212, 0.15), transparent 70%)`
          }}
        />

        <div>
          {/* Category Tag & Icon */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/50 uppercase tracking-widest font-bold">
              {project.category}
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2 leading-snug">
            {project.title}
          </h3>

          <p className="text-xs font-mono text-cyan-300 mb-4 font-semibold">
            {project.subtitle}
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6 font-normal">
            {project.description.substring(0, 160)}...
          </p>

          {/* KPI Mini Badges */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {project.metrics.slice(0, 2).map((m, mIdx) => (
              <div key={mIdx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-base font-display font-bold text-cyan-400">{m.value}</div>
                <div className="text-[10px] text-slate-300 uppercase font-mono mt-0.5 font-semibold">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Tech stack chips */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tools.slice(0, 4).map((tool, tIdx) => (
              <span
                key={tIdx}
                className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-200 border border-slate-800 font-medium"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 4 && (
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                +{project.tools.length - 4} more
              </span>
            )}
          </div>

          {/* View Project Button */}
          <button
            onClick={() => {
              playUiSound('modal');
              onSelect(project);
            }}
            className="w-full py-3 rounded-full bg-white text-black hover:bg-slate-100 font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)] group"
          >
            <span>Project Deep-Dive</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3 backdrop-blur-md">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>FEATURED CASE STUDIES & BI MODELS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          High-Impact{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500 bg-clip-text text-transparent">
            Analytics Solutions
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          3D particle matrix forms floating data cubes. Hover over cards for 3D parallax tilt & specular glow.
        </p>
      </div>

      {/* 3D Staggered Project Cards Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project, idx) => (
          <ProjectTiltCard
            key={project.id}
            project={project}
            onSelect={(p) => setSelectedProject(p)}
            index={idx}
          />
        ))}
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
