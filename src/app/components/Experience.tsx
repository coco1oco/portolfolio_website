import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Zap, Trophy, LineChart } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const experiences = [
  {
    id: 1,
    title: 'PawPal — Lead Developer',
    company: 'Youth For Animals (PAWS Philippines)',
    period: 'Dec 2025 – Jan 2026',
    description: 'Led end-to-end delivery of an installable PWA for a pet community, covering the community feed, pet profiles, medical records, and real-time group chat.',
    icon: Zap,
    achievements: [
      'Optimized messaging architecture: 40s → 200ms load time',
      'Built real-time chat and media uploads with Supabase, Firebase & Cloudinary',
      'Shipped an installable, offline-capable PWA',
    ],
  },
  {
    id: 2,
    title: 'Hype — Hackathon Build',
    company: 'C(Old) (ST)art Hackathon',
    period: 'Nov 2025',
    description: 'Built an event manager and second-hand ticketing marketplace with live auction mechanics under strict hackathon time constraints.',
    icon: Trophy,
    achievements: [
      'Designed and built the marketplace UI in React 18 + Vite',
      'Led the final product pitch and Q&A session',
      'Delivered a working prototype within the time limit',
    ],
  },
  {
    id: 3,
    title: 'Real Estate Price Prediction',
    company: 'Academic ML Research Project',
    period: 'May 2026',
    description: 'Trained a multiple linear regression model to predict real estate sale amounts from assessed property values and categorical property types.',
    icon: LineChart,
    achievements: [
      'Feature engineering with one-hot encoding in Python & Pandas',
      'Evaluated with MSE and R² metrics using scikit-learn',
      'Visualized findings with Matplotlib & Seaborn',
    ],
  },
];

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const reduceMotion = usePrefersReducedMotion();

  const offscreenX = index % 2 === 0 ? -50 : 50;

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, x: offscreenX }}
      animate={isInView || reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: offscreenX }}
      transition={{ duration: 0.6, delay: reduceMotion ? 0 : index * 0.2 }}
      className={`relative flex flex-col md:flex-row gap-8 ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Timeline dot with icon */}
      <div className="absolute left-4 md:left-1/2 w-12 h-12 -ml-[24px] bg-white dark:bg-gray-950 border-2 border-gray-900 dark:border-gray-600 z-10 flex items-center justify-center">
        <exp.icon className="w-5 h-5 text-gray-900 dark:text-gray-300" strokeWidth={1.5} />
      </div>

      {/* Content card */}
      <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
        <div className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-gray-600 transition-all duration-500 p-8 space-y-4 overflow-hidden hover:shadow-2xl">
          {/* Hover accent line */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-900 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

          {/* Period badge */}
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2">
            <span className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-400 rounded-full" />
            <span>{exp.period}</span>
          </div>

          <div className="space-y-1 relative z-10">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {exp.title}
            </h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide">
              {exp.company}
            </p>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">
            {exp.description}
          </p>

          <ul className="space-y-3 pt-2 relative z-10">
            {exp.achievements.map((achievement) => (
              <li
                key={achievement}
                className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
              >
                <span className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-500 rounded-full mt-1.5 flex-shrink-0" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const ref = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const lineScale = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section id="experience" ref={ref} className="relative py-32 px-6 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="mb-20 space-y-4"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-gray-900" />
            <span className="text-sm font-medium tracking-widest text-gray-400 dark:text-gray-500 uppercase">
              Career Journey
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical track */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />

          {/* Animated progress line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 w-px bg-gray-900 origin-top"
            style={{
              scaleY: reduceMotion ? 1 : lineScale,
              height: '100%',
            }}
          />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
