import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { image } from 'framer-motion/client';

const slides = [
  { id: 1, image: '/carousel/slide_14.png', alt: 'IIIT Pune campus with students and greenery', caption: 'IIIT Pune campus showcasing students and greenery', date: '15-08-2026' },
  { id: 2, image: '/carousel/slide_1.jpeg', alt: 'IIIT Pune academic building and campus view', caption: 'IIIT Pune academic building and campus environment', date: '2026' },
  { id: 3, image: '/carousel/slide_20.jpg', alt: 'IIIT Pune students in a classroom', caption: 'Students engaged in learning at IIIT Pune', date: '2026' },
  { id: 4, image: '/carousel/slide_19.png', alt: 'IIIT Pune campus with students and greenery', caption: 'IIIT Pune campus showcasing students and greenery', date: '15-08-2026' },
  { id: 5, image: '/carousel/slide_18.png', alt: 'IIIT Pune campus with students and greenery', caption: 'IIIT Pune campus showcasing students and greenery', date: '2026' },
  { id: 6, image: '/carousel/slide_17.png', alt: 'IIIT Pune campus with students and greenery', caption: 'IIIT Pune campus showcasing students and greenery', date: '2026' },
  { id: 7, image: '/carousel/slide_13.jpeg', alt: 'Standing Together for a Safe, Inclusive & Ragging-Free Campus — Student Orientation 2026–30', caption: 'IIIT Pune campus landscape featuring modern architecture', date: '2026' },
  { id: 8, image: '/carousel/slide_12.jpeg', alt: 'Students and faculty at IIIT Pune campus', caption: 'Students and faculty engaged in academic life at IIIT Pune', date: '2026' },
  { id: 9, image: '/carousel/slide_11.jpeg', alt: 'IIIT Pune campus event and student activities', caption: 'Campus event showcasing student activities and engagement', date: '2026' },
  { id: 10, image: '/carousel/slide_2.jpeg', alt: 'IIIT Pune institute building surrounded by greenery', caption: 'IIIT Pune institute building surrounded by greenery', date: '2026' },
  { id: 11, image: '/carousel/slide_3.jpeg', alt: 'IIIT Pune campus corridors and academic spaces', caption: 'Academic corridors and learning spaces at IIIT Pune', date: '2026' },
  { id: 12, image: '/carousel/slide_4.jpeg', alt: 'IIIT Pune campus facilities and infrastructure', caption: 'Campus facilities and infrastructure at IIIT Pune', date: '2026' },
];
const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <div className="w-full">
      <div className="relative w-full h-[28vh] sm:h-[69vh] md:h-[72vh] overflow-hidden bg-gray-900"> {/* changed to h-31 for fixing carousel on mobile*/}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: current === idx ? 1 : 0, pointerEvents: current === idx ? 'auto' : 'none' }}
        >
          {/* Blurred background to fill any letterbox area */}
          <motion.img
            src={slide.image}
            alt={slide.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: current === idx ? 0.35 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 select-none pointer-events-none"
          />
          {/* Sharp foreground image shown in full */}
          <motion.img
            src={slide.image}
            alt={slide.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: current === idx ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 z-10" />

      {/* Caption bar hidden for now; kept in code for later use */}

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end text-center px-4 pb-20">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-4 shadow-sm"
        >
          {/* Indian Institute of Information Technology Pune */}
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-2xl text-gray-200 mb-8 max-w-3xl font-medium"
        >
          {/* Empowering Innovation, Shaping Tomorrow */}
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {/* <Link to="/academics" className="px-8 py-3 bg-accent text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200">
            Explore Programs
          </Link>
          <Link to="/academics" className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-primary transition-all duration-200">
            Admissions 2025-26
          </Link> */}
        </motion.div>
      </div>

      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm">
        <ChevronLeft size={32} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm">
        <ChevronRight size={32} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${current === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>

    </div>
  );
};

export default HeroCarousel;
