import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/shared/PageHeader';

const VisionMissionPage = () => {
  const scrollVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const missionPillars = [
    {
      number: "01",
      title: "Academic & Research Excellence",
      description: "To provide academic excellence in Engineering and Technology by imparting quality as well as value-based education, and foster a collaborative environment open to the free exchange of ideas, where research capabilities are leveraged to address challenges."
    },
    {
      number: "02",
      title: "Innovation & Entrepreneurship",
      description: "To develop competent and proficient youth imbued with the spirit of innovation and entrepreneurship with a social and environmental orientation, meeting knowledge requisites and providing leadership in IT."
    },
    {
      number: "03",
      title: "Ethics & Social Equity",
      description: "To promote the significance of ethics and integrity in technical education, fostering learning with respect for individual human rights and an unyielding commitment to equal opportunity and justice."
    },
    {
      number: "04",
      title: "Heritage & Integration",
      description: "To endorse application and research in Indian languages for technical education, further edifying Indian traditional knowledge in technical systems."
    }
  ];


  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader 
        title="Vision & Mission" 
      />

      {/* SECTION 1: VISION (Centered Spotlight) */}
      <section className="pt-14 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-8 md:p-12">
            <motion.div 
              className="text-center space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollVariants}
            >
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-primary dark:text-white">
                Our Vision
              </h2>
               <div className="relative max-w-3xl mx-auto px-8 sm:px-12">
                <span className="absolute -top-6 left-2 sm:left-4 text-7xl font-serif text-primary dark:text-blue-400 pointer-events-none">&ldquo;</span>
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed text-justify italic font-medium relative z-10">
                  To be a leading global Information Technology institute that imparts an innovative education to produce proficient and ethical professionals and leaders, disseminating novel knowledge in Information Technology and allied disciplines to serve as a valuable resource for society and the world.
                </p>
                <span className="absolute -bottom-12 right-2 sm:right-4 text-7xl font-serif text-primary dark:text-blue-400 pointer-events-none">&rdquo;</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MISSION (2x2 Minimal Grid) */}
      <section className="pt-8 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-8 md:p-12">
            <motion.div 
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollVariants}
            >
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-primary dark:text-white">
                  Our Mission
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {missionPillars.map((pillar, idx) => {
                  return (
                    <div key={idx} className="flex gap-4 items-start">
                      <span className="text-lg font-bold text-accent dark:text-accent-dark font-mono leading-none mt-1">
                        {pillar.number}.
                      </span>
                      <div>
                        <h3 className="font-semibold text-primary dark:text-white text-base md:text-lg leading-snug">
                          {pillar.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-450 text-sm mt-1 leading-relaxed text-justify">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisionMissionPage;
