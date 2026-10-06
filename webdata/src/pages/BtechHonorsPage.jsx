import React, { useState } from "react";
import PageHeader from "../components/shared/PageHeader";
import { Award, Clock, Star, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BtechHonorsPage = () => {
  const disciplines = [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "VLSI Design",
    "Internet of Things",
    "Robotics"
  ];
  const [activeDiscipline, setActiveDiscipline] = useState("Artificial Intelligence");

  const curriculum = [
    {
      discipline: "Artificial Intelligence",
      totalCredits: 6,
      courses: [
        { name: "Applied Accelerated AI", hours: "-", credits: 3 },
        { name: "Reinforcement Learning", hours: "-", credits: 3 }
      ]
    },
    {
      discipline: "Machine Learning",
      totalCredits: 6,
      courses: [
        { name: "Essential Mathematics for ML", hours: "-", credits: 3 },
        { name: "Deep learning for Computer Vision", hours: "-", credits: 3 }
      ]
    },
    {
      discipline: "Data Science",
      totalCredits: 6,
      courses: [
        { name: "Data Analysis and Decision Making", hours: "-", credits: 3 },
        { name: "Social Network Analysis", hours: "-", credits: 3 }
      ]
    },
    {
      discipline: "VLSI Design",
      totalCredits: 6,
      courses: [
        { name: "System Design through Verilog", hours: "Theory: 2, Practical: 1", credits: 3 },
        { name: "Hardware Modeling using Verilog", hours: "Theory: 2, Practical: 1", credits: 3 }
      ]
    },
    {
      discipline: "Internet of Things",
      totalCredits: 6,
      courses: [
        { name: "Introduction to Industry 4.0 and Industrial IoT", hours: "-", credits: 3 },
        { name: "Computer Vision", hours: "-", credits: 3 }
      ]
    },
    {
      discipline: "Robotics",
      totalCredits: 6,
      courses: [
        { name: "Applied Instrumentation System", hours: "-", credits: 3 },
        { name: "Computer Vision", hours: "-", credits: 3 }
      ]
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="B.Tech Honours Program" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl shadow-xl text-white p-8 md:p-10 h-full flex flex-col justify-center">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 text-white">
                  Program Overview
                </h2>
                <div className="text-blue-100 text-lg leading-relaxed mb-6 space-y-4">
                  <p>
                    To motivate and attract talented students, the Institute will start awarding the ‘Honors’ degree to bright students in both the branches viz. Computer Science and Engineering and Electronics and Communication Engineering with a ‘Major’ in one of the specialized disciplines.
                  </p>
                  <div>
                    <strong>B.Tech (Hons) in CSE/ECE with Major in one of the following disciplines:</strong>
                    <ul className="list-disc list-inside mt-2 ml-4">
                      <li>Artificial Intelligence</li>
                      <li>Data Science</li>
                      <li>Machine Learning</li>
                      <li>Cyber Security</li>
                      <li>Internet of Things</li>
                      <li>Robotics</li>
                      <li>VLSI Design</li>
                    </ul>
                  </div>
                  <p>
                    The purpose is to enable the students to have more exposure and opportunities in higher studies, internships, and placements.
                  </p>
                  <div className="bg-white/10 p-4 rounded-lg border border-white/20 mt-4">
                    <h4 className="font-bold text-white mb-2">Eligibility & Requirements</h4>
                    <p className="text-sm">
                      To opt for Honors, a student must possess a CGPA of ‘8’ or more, and have no backlog by the end of the 4th semester and should continue to possess a CGPA of ‘8’ or more with no backlog at the end of each subsequent semester. A student shall earn at least 12 (twelve) more credits over and above the regular B.Tech program. This scheme is applicable to the batches admitted from 2020 onwards.
                    </p>
                  </div>
                </div>
              </div>
            </section>


        {/* Curriculum & Syllabus */}
        <section className="mt-12 w-full">
          <div className="flex justify-between items-end mb-8 border-b pb-4 border-gray-200 dark:border-gray-800">
            <div>
              <h2 className="text-3xl font-bold font-serif text-primary dark:text-white">
                Honors Curriculum
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Explore the additional honors courses across disciplines.</p>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-2 mb-6 pb-4">
            {disciplines.map((discipline) => (
              <button
                key={discipline}
                onClick={() => setActiveDiscipline(discipline)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  activeDiscipline === discipline
                    ? "bg-brand-red text-white shadow-md dark:bg-brand-red-dark"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {discipline}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden relative min-h-[300px]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <th className="py-2.5 px-4 font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-700 w-16">
                      S.No
                    </th>
                    <th className="py-2.5 px-4 font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-700 w-[50%]">
                      Course Title
                    </th>
                    <th className="py-2.5 px-4 font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-700 w-[25%] text-center">
                      Hours/Week
                    </th>
                    <th className="py-2.5 px-4 font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-700 w-[15%] text-center">
                      Credits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="wait">
                    {curriculum.find(c => c.discipline === activeDiscipline)?.courses.map((course, index) => (
                      <motion.tr
                        key={`${activeDiscipline}-${course.name}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="group border-b border-gray-100 dark:border-gray-800 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
                      >
                        <td className="py-2.5 px-4 text-gray-500 dark:text-gray-400 font-medium">
                          {index + 1}.
                        </td>
                        <td className="py-2.5 px-4 font-medium text-gray-800 dark:text-gray-200 group-hover:text-accent-dark dark:group-hover:text-blue-400 transition-colors">
                          {course.name}
                        </td>
                        <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400 text-center font-medium">
                          {course.hours}
                        </td>
                        <td className="py-2.5 px-4 text-center text-accent-dark font-bold">
                          {course.credits}
                        </td>
                      </motion.tr>
                    ))}
                    {!curriculum.find(c => c.discipline === activeDiscipline)?.courses && (
                      <tr>
                        <td colSpan="4" className="py-12 text-center text-gray-500 dark:text-gray-400 italic">
                          Curriculum details for {activeDiscipline} will be updated soon.
                        </td>
                      </tr>
                    )}
                    {curriculum.find(c => c.discipline === activeDiscipline)?.totalCredits && (
                      <motion.tr
                        key="total"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-blue-50/80 dark:bg-blue-900/20 border-t-2 border-blue-200 dark:border-blue-800"
                      >
                        <td colSpan="3" className="py-2.5 px-4 text-center font-bold text-gray-800 dark:text-gray-200">
                          Total Credits
                        </td>
                        <td className="py-2.5 px-4 text-center text-accent-dark font-black text-lg">
                          {curriculum.find(c => c.discipline === activeDiscipline).totalCredits}
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default BtechHonorsPage;
