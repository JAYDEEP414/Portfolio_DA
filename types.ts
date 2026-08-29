export type SectionId = 
  | 'hero' 
  | 'about' 
  | 'skills' 
  | 'experience' 
  | 'projects' 
  | 'education' 
  | 'contact';

export interface CameraWaypoint {
  id: SectionId;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  particleForm: 'constellation' | 'prism' | 'barchart' | 'timeline' | 'grid' | 'orbit' | 'vortex';
  accentColor: string;
  ambientLight: number;
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  category: 'analytics' | 'programming' | 'competencies';
  description: string;
  tag?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  programType: string;
  location?: string;
  summary: string;
  achievements: string[];
  skillsUsed: string[];
  kpis?: { label: string; value: string; change?: string }[];
  sqlSnippet?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string; context: string }[];
  tools: string[];
  highlights: string[];
  demoVisual: {
    type: 'bar' | 'line' | 'scatter' | 'kpi-grid';
    title: string;
    dataPoints: { label: string; value: number; secondary?: number }[];
  };
  linkUrl?: string;
  githubUrl?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
  verificationId?: string;
  skillsGained: string[];
  icon: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  grade?: string;
  coursework: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitles: string[];
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  summary: string;
  quickStats: { label: string; value: string; suffix?: string; detail: string }[];
}

export type PerformanceMode = 'ultra' | 'balanced' | 'lite';
