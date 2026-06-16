import { motion, MotionValue, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface HeroBackgroundProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export function HeroBackground({ mouseX, mouseY }: HeroBackgroundProps) {
  const reduceMotion = usePrefersReducedMotion();

  // Apply parallax multipliers directly to motion values
  const x1 = useTransform(mouseX, (v) => v * 0.5);
  const y1 = useTransform(mouseY, (v) => v * 0.5);

  const x2 = useTransform(mouseX, (v) => -v * 0.3);
  const y2 = useTransform(mouseY, (v) => -v * 0.3);

  return (
    <>
      {/* Geometric background elements */}
      <motion.div
        className="absolute top-20 right-20 w-[500px] h-[500px] border border-gray-100 dark:border-gray-800 rounded-full z-10"
        style={{ x: x1, y: y1 }}
        animate={reduceMotion ? undefined : { scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-[400px] h-[400px] border border-gray-100 dark:border-gray-800 z-10"
        style={{ x: x2, y: y2, rotate: 45 }}
        animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Subtle grid lines */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] z-10 pointer-events-none text-gray-900 dark:text-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>
    </>
  );
}
