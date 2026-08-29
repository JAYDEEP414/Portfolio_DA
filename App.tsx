import React, { useState, useEffect, useRef } from 'react';
import { SectionId, PerformanceMode } from './types';
import { Scene3D } from './components/3d/Scene3D';
import { SectionWrapper } from './components/SectionWrapper';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { ResumeModal } from './components/ResumeModal';

import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';

import { isSoundEnabled, setSoundEnabled } from './utils/audio';
import { detectOptimalPerformanceMode } from './utils/performance';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [soundActive, setSoundActive] = useState(false);
  const [performanceMode, setPerformanceMode] = useState<PerformanceMode>('balanced');
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Initialize performance mode
  useEffect(() => {
    setPerformanceMode(detectOptimalPerformanceMode());
  }, []);

  // Track global mouse position with normalized -1 to 1 coords
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track scroll progress and active section with IntersectionObserver
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, currentScroll / totalScroll)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Observe sections for active waypoint synchronization
    const sectionIds: SectionId[] = [
      'hero',
      'about',
      'skills',
      'experience',
      'projects',
      'education',
      'contact'
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section-id') as SectionId;
            if (id && sectionIds.includes(id)) {
              setActiveSection(id);
            }
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isLoading]);

  // Navigate to section
  const handleNavigate = (sectionId: SectionId) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sound Toggle Handler
  const handleToggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundEnabled(next);
  };

  // Cycle Performance Mode (Ultra -> Balanced -> Lite -> Ultra)
  const handleCyclePerformanceMode = () => {
    setPerformanceMode((prev) => {
      if (prev === 'ultra') return 'balanced';
      if (prev === 'balanced') return 'lite';
      return 'ultra';
    });
  };

  return (
    <div className="relative min-h-screen bg-[#05060a] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* 3D JS Monogram Loading Intro */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Trailing Particle Glow Cursor */}
      <CustomCursor enabled={performanceMode !== 'lite'} />

      {/* Atmospheric Sophisticated Dark Ambient Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Subtle Dot Matrix Pattern */}
      <div className="fixed inset-0 pointer-events-none bg-sophisticated-dots opacity-25 z-[1]" />

      {/* Persistent Root 3D WebGL Canvas (Camera Choreography & Morphing Particles) */}
      <Scene3D
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        mousePos={mousePos}
        performanceMode={performanceMode}
      />

      {/* Floating 4D Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        soundEnabled={soundActive}
        onToggleSound={handleToggleSound}
        performanceMode={performanceMode}
        onCyclePerformanceMode={handleCyclePerformanceMode}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Right Edge Minimalist Scroll Telemetry Track */}
      <div className="fixed top-1/2 right-4 -translate-y-1/2 hidden xl:flex flex-col gap-2 z-30 pointer-events-none">
        {(['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'] as SectionId[]).map((sec) => (
          <div
            key={sec}
            className={`transition-all duration-300 rounded-full ${
              activeSection === sec
                ? 'w-1.5 h-8 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                : 'w-1.5 h-2 bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Main 4D Sequential Sections */}
      <main className="relative z-10 w-full flex flex-col items-center">
        {/* Section 1: Hero */}
        <SectionWrapper
          id="hero"
          waypointIndex={1}
          waypointTitle="HERO // NEURAL FIELD"
          waypointCoords="[0.0, 0.0, 7.5]"
          mousePos={mousePos}
        >
          <HeroSection
            onNavigate={handleNavigate}
            onOpenResume={() => setIsResumeOpen(true)}
            mousePos={mousePos}
          />
        </SectionWrapper>

        {/* Section 2: About */}
        <SectionWrapper
          id="about"
          waypointIndex={2}
          waypointTitle="ABOUT // DATA PRISM"
          waypointCoords="[2.8, 0.6, 6.2]"
          mousePos={mousePos}
        >
          <AboutSection
            onNavigate={handleNavigate}
            mousePos={mousePos}
          />
        </SectionWrapper>

        {/* Section 3: Skills */}
        <SectionWrapper
          id="skills"
          waypointIndex={3}
          waypointTitle="SKILLS // 3D BAR MATRIX"
          waypointCoords="[-3.2, 1.4, 5.8]"
          mousePos={mousePos}
        >
          <SkillsSection />
        </SectionWrapper>

        {/* Section 4: Experience */}
        <SectionWrapper
          id="experience"
          waypointIndex={4}
          waypointTitle="EXPERIENCE // TEMPORAL HELIX"
          waypointCoords="[3.4, -0.8, 6.4]"
          mousePos={mousePos}
        >
          <ExperienceSection />
        </SectionWrapper>

        {/* Section 5: Projects */}
        <SectionWrapper
          id="projects"
          waypointIndex={5}
          waypointTitle="PROJECTS // HYPERCUBE GRID"
          waypointCoords="[0.0, 1.8, 6.8]"
          mousePos={mousePos}
        >
          <ProjectsSection />
        </SectionWrapper>

        {/* Section 6: Education & Certifications */}
        <SectionWrapper
          id="education"
          waypointIndex={6}
          waypointTitle="EDUCATION // ORBITAL MATRIX"
          waypointCoords="[-2.4, -1.2, 5.9]"
          mousePos={mousePos}
        >
          <EducationSection />
        </SectionWrapper>

        {/* Section 7: Contact */}
        <SectionWrapper
          id="contact"
          waypointIndex={7}
          waypointTitle="CONTACT // VORTEX CALLBACK"
          waypointCoords="[0.0, 0.0, 5.4]"
          mousePos={mousePos}
        >
          <ContactSection />
        </SectionWrapper>
      </main>

      {/* Structured Resume & CV Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
