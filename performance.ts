import { PerformanceMode } from '../types';

export const detectOptimalPerformanceMode = (): PerformanceMode => {
  if (typeof window === 'undefined') return 'balanced';

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;

  const cores = navigator.hardwareConcurrency || 4;
  
  if (isMobile || cores <= 4) {
    return 'balanced';
  }

  return 'ultra';
};

export const getParticleCountForMode = (mode: PerformanceMode): number => {
  switch (mode) {
    case 'ultra':
      return 1200;
    case 'balanced':
      return 600;
    case 'lite':
      return 250;
    default:
      return 600;
  }
};
