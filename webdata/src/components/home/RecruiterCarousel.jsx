import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { CompanyLogo } from '../shared/CompanyLogo';
import FadeInSection from '../shared/FadeInSection';

// Recruiter list
const recruiters = [
  { name: 'Google' },
  { name: 'Microsoft' },
  { name: 'Amazon' },
  { name: 'Qualcomm' },
  { name: 'NVIDIA' },
  { name: 'Flipkart' },
  { name: 'Deloitte' },
  { name: 'Accenture' },
  { name: 'Samsung R&D' },
  { name: 'Goldman Sachs' },
  { name: 'Cisco' },
  { name: 'Citi' },
  { name: 'Intel' },
  { name: 'IBM' },
  { name: 'Siemens' },
  { name: 'Infosys' },
  { name: 'Capgemini' },
];

// Duplicate for seamless infinite scroll
const track = [...recruiters, ...recruiters];

const RecruiterCarousel = () => {
  return (
    <FadeInSection delay={0.1}>
    <section className="py-12 bg-transparent transition-colors duration-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-accent dark:text-accent-dark text-xs font-semibold uppercase tracking-widest mb-1">
              Our Recruiters
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary dark:text-white">
              Our Students at Leading Companies
            </h2>
          </div>
          <a
            href="https://placements.iiitp.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-accent dark:text-accent-dark hover:underline group"
          >
            View Placements
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Scrolling track — no mouse control, purely CSS */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface dark:from-surface-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface dark:from-surface-dark to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-recruiter-scroll w-max">
          {track.map((r, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-40 h-20 bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-center p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
            >
              <CompanyLogo name={r.name} className="w-full h-full max-h-10 object-contain text-gray-800 dark:text-gray-200" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="flex justify-center mt-6 sm:hidden">
        <a
          href="https://placements.iiitp.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent dark:text-accent-dark hover:underline"
        >
          View All Placements <ArrowRight size={14} />
        </a>
      </div>

      <style>{`
        @keyframes recruiter-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-recruiter-scroll {
          animation: recruiter-scroll 30s linear infinite;
        }
        .animate-recruiter-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
    </FadeInSection>
  );
};

export default RecruiterCarousel;
