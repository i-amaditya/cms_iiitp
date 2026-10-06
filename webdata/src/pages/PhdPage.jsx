import React from "react";
import PageHeader from "../components/shared/PageHeader";
import { BookOpen, Building, Microchip, Cpu, GraduationCap, Network } from "lucide-react";
import { motion } from "framer-motion";

const PhdPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Doctor of Philosophy (Ph.D.)" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            
            {/* Overview Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-teal-800 to-emerald-900 rounded-2xl shadow-xl text-white p-8 md:p-10 border border-teal-700">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 text-white">
                  Program Overview
                </h2>
                <div className="text-teal-50 text-lg leading-relaxed mb-6 space-y-4">
                  <p>
                    The Doctor of Philosophy (Ph.D.) Programme is aimed at assisting students in acquiring proficiency in their chosen area of research. The academic Programme leading to the Ph.D. degree is broad-based and involves a course credit requirement and a research thesis submission.
                  </p>
                  <p>
                    The Institute encourages research in interdisciplinary areas through a system of joint supervision and interdepartmental group activities. With an aim to develop new knowledge in all aspects of teaching and research, IIIT Pune offers admission to the Ph.D. Programme.
                  </p>
                  <p>
                    IIIT Pune plans to develop world class research facilities in areas of Mobile Computing, Information Security, IoT, Robotics, Machine Learning, Speech & Image Processing, Medical Informatics, Cyber Physical Systems, Wireless Networks, VLSI Design and Nanotechnology.
                  </p>
                </div>
                
                <div className="mt-8 bg-black/20 p-4 rounded-xl border border-white/10 flex items-start gap-4">
                  <div className="bg-teal-500/30 p-2 rounded-full">
                    <GraduationCap className="w-6 h-6 text-teal-200" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Admissions</h4>
                    <p className="text-teal-100 text-sm">
                      Note: The admission to Ph.D. programme is conducted through institute advertisement.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Departments and Centres */}
            <section className="grid md:grid-cols-2 gap-8">
              
              <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                    <Building className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-primary dark:text-white">
                    Academic Departments
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Research activities in IIIT Pune are carried out under the ambit of the following academic departments:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                    <Cpu className="w-5 h-5 text-accent-dark" />
                    Electronics and Communication Engineering
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                    <BookOpen className="w-5 h-5 text-accent-dark" />
                    Computer Science and Engineering
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                    <Network className="w-5 h-5 text-accent-dark" />
                    Applied Science and Humanities
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-purple-600 dark:text-purple-400">
                    <Microchip className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-primary dark:text-white">
                    Research Centres
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Additionally, the Institute promotes students to collaborate with specialized research centres for extensive research:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                    <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 flex items-center justify-center text-xs font-bold">A</span>
                    Centre of Robotics and Security in IoT Space
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                    <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 flex items-center justify-center text-xs font-bold">B</span>
                    Centre of Indian Languages and Computational Intelligence
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                    <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 flex items-center justify-center text-xs font-bold">C</span>
                    Centre of VLSI and Nanotechnology
                  </li>
                </ul>
              </div>

            </section>
            


      </div>
    </div>
  );
};

export default PhdPage;
