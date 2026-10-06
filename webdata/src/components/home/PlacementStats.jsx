import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Building2, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';

const stats = [
  {
    icon: Award,
    value: 55,
    suffix: ' LPA',
    label: 'Highest Package',
    sub: 'Academic Year 2023–24',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
  },
  {
    icon: TrendingUp,
    value: 17.5,
    suffix: ' LPA',
    label: 'Average Package',
    sub: 'Academic Year 2023–24',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    decimal: 1,
  },
  {
    icon: Users,
    value: 95,
    suffix: '%',
    label: 'Placement Rate',
    sub: 'Students placed 2023–24',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
  },
  {
    icon: Building2,
    value: 120,
    suffix: '+',
    label: 'Recruiting Companies',
    sub: 'Top MNCs & Startups',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
  },
];

function AnimatedNumber({ target, suffix, decimal = 0, active }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const totalSteps = duration / step;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setDisplay(target);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, step);

    return () => clearInterval(timer);
  }, [target, active]);

  const formatted =
    decimal > 0
      ? display.toFixed(decimal)
      : Math.floor(display).toLocaleString();

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

const PlacementStats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="py-14 bg-gradient-to-br from-primary via-blue-900 to-primary dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden transition-colors duration-200"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-1">
              Placements 2023–24
            </p>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-white">
              Placement Highlights
            </h2>
          </div>
          <a
            href="https://placements.iiitp.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-white transition-colors group"
          >
            View Full Report
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-xl p-5 md:p-6 border ${s.bg} ${s.border} backdrop-blur-sm flex flex-col gap-3 hover:scale-105 transition-transform duration-300`}
              >
                <div className={`w-10 h-10 rounded-lg ${s.bg} ${s.border} border flex items-center justify-center`}>
                  <Icon size={20} className={s.color} />
                </div>
                <div>
                  <div className={`text-3xl md:text-4xl font-extrabold font-serif ${s.color} tabular-nums`}>
                    <AnimatedNumber
                      target={s.value}
                      suffix={s.suffix}
                      decimal={s.decimal || 0}
                      active={inView}
                    />
                  </div>
                  <div className="text-white font-semibold text-sm mt-1">{s.label}</div>
                  <div className="text-blue-300/70 text-xs mt-0.5">{s.sub}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlacementStats;
