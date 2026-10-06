import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    batch: 'B.Tech CSE, Class of 2024',
    quote: 'The academic environment at IIIT Pune challenged me to grow beyond my limits. The faculty is extremely supportive and the coding culture is phenomenal.',
    company: 'Placed at Microsoft'
  },
  {
    id: 2,
    name: 'Sneha Patil',
    batch: 'M.Tech ECE, Class of 2023',
    quote: 'State-of-the-art labs and a curriculum aligned with industry standards gave me the perfect launchpad for my research career in VLSI design.',
    company: 'Research Scholar at IISc'
  },
  {
    id: 3,
    name: 'Aditya Kumar',
    batch: 'B.Tech CSE, Class of 2025',
    quote: 'From hackathons to cultural fests, life at IIITP is vibrant. The peer group here is incredibly talented, which naturally drives you to excel.',
    company: 'SDE Intern at Amazon'
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 bg-surface dark:bg-surface-dark transition-colors duration-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary dark:text-white mb-4">Student Voices</h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full opacity-80"></div>
        </div>

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-bg-dark rounded-3xl shadow-xl p-8 md:p-14 text-center border border-gray-100 dark:border-gray-800 relative"
            >
              <Quote className="w-16 h-16 text-blue-50 dark:text-gray-800/50 absolute top-6 left-6 transform rotate-180" />
              <Quote className="w-16 h-16 text-blue-50 dark:text-gray-800/50 absolute bottom-6 right-6" />
              
              <div className="relative z-10">
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic mb-10 font-serif leading-relaxed text-justify px-4 md:px-8">
                  "{testimonials[current].quote}"
                </p>
                <div>
                  <h4 className="font-bold text-primary dark:text-white text-lg md:text-xl">{testimonials[current].name}</h4>
                  <p className="text-accent dark:text-accent-dark text-sm font-medium mt-1 mb-1">{testimonials[current].batch}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold tracking-wide uppercase">{testimonials[current].company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center mt-10 space-x-6 items-center">
            <button onClick={prev} className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent-dark transition-all hover:scale-110">
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center space-x-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`rounded-full transition-all duration-300 ${current === idx ? 'bg-primary dark:bg-accent-dark w-8 h-2.5' : 'bg-gray-300 dark:bg-gray-700 w-2.5 h-2.5 hover:bg-gray-400'}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent-dark transition-all hover:scale-110">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
