import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

interface CustomCursorProps {
  enabled: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ enabled }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  const cursorX = useSpring(0, { stiffness: 600, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 600, damping: 28 });

  const dotX = useSpring(0, { stiffness: 1200, damping: 40 });
  const dotY = useSpring(0, { stiffness: 1200, damping: 40 });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('input') ||
        target?.closest('textarea') ||
        target?.closest('.interactive-clickable')
      ) {
        setIsHoveringClickable(true);
      } else {
        setIsHoveringClickable(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, cursorX, cursorY, dotX, dotY, isVisible]);

  if (!enabled || !isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Glowing Trailing Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isHoveringClickable ? 1.8 : 1,
          borderColor: isHoveringClickable ? 'rgba(56, 189, 248, 0.9)' : 'rgba(56, 189, 248, 0.4)',
          backgroundColor: isHoveringClickable ? 'rgba(56, 189, 248, 0.12)' : 'rgba(56, 189, 248, 0.02)'
        }}
        transition={{ duration: 0.15 }}
        className="w-10 h-10 rounded-full border border-cyan-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)] backdrop-blur-[1px]"
      />

      {/* Center High-Precision Core Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isHoveringClickable ? 0.5 : 1
        }}
        className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8]"
      />
    </div>
  );
};
