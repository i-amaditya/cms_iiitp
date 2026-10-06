import React, { useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { Calendar, GraduationCap, Award, BookOpen, UserCheck, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const UgProgramsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const programs = [
    {
      sNo: 1,
      name: "Computer Science and Engineering (CSE)",
      duration: "4 Years (8 Semesters)",
      seats: 326
    },
    {
      sNo: 2,
      name: "Electronics and Communication Engineering (ECE)",
      duration: "4 Years (8 Semesters)",
      seats: 119
    },
    {
      sNo: 3,
      name: "Artificial Intelligence and Data Science (AI & DS)",
      duration: "4 Years (8 Semesters)",
      seats: 99
    },
    {
      sNo: 4,
      name: "Cyber Security",
      duration: "4 Years (8 Semesters)",
      seats: 65
    },
    {
      sNo: 5,
      name: "Microelectronics and VLSI Design",
      duration: "4 Years (8 Semesters)",
      seats: 65
    }
  ];

  const totalSeats = programs.reduce((acc, curr) => acc + curr.seats, 0);

  return (
    <div className="min-h-screen transition-colors duration-200 pb-16 bg-slate-200 dark:bg-bg-dark">
      <PageHeader 
        title="UG Programs (B.Tech.)" 
        subtitle="Nurturing innovation and engineering excellence in computer science, electronics, and emerging technologies"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Introduction Section */}
        <section className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 dark:text-white">
              Undergraduate Programs Overview
            </h2>
          </div>
          <p className="text-gray-650 dark:text-gray-350 leading-relaxed text-justify text-sm sm:text-base">
            Indian Institute of Information Technology, Pune (IIIT Pune) runs undergraduate courses of 04 years duration leading to the Bachelor of Technology (B.Tech.) degree. The academic programs are designed to provide a solid foundation in modern engineering principles, practical computational skills, and advanced engineering practices. Currently, the institute offers specialized programs in five cutting-edge disciplines, catering to the growing demands of the digital era.
          </p>
        </section>

        {/* Seat Matrix Section */}
        <section className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
            
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 dark:text-white">
                Seat Matrix (Session 2025-26)
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Approved seat distribution across various undergraduate engineering programs at IIIT Pune
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-355 border-b border-gray-150 dark:border-gray-800 font-bold">
                  <th className="py-4 px-4 font-bold text-xs uppercase tracking-wider w-[10%] text-center">S.No.</th>
                  <th className="py-4 px-4 font-bold text-xs uppercase tracking-wider w-[55%]">Academic Program Name</th>
                  <th className="py-4 px-4 font-bold text-xs uppercase tracking-wider w-[20%] text-center">Duration</th>
                  <th className="py-4 px-4 font-bold text-xs uppercase tracking-wider w-[15%] text-center">Total Seats</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((prog, idx) => (
                  <tr 
                    key={prog.sNo}
                    className="border-b border-gray-100 dark:border-gray-850 hover:bg-blue-50/10 dark:hover:bg-blue-900/5 transition-colors"
                  >
                    <td className="py-4 px-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">{prog.sNo}</td>
                    <td className="py-4 px-4 text-sm font-bold text-gray-800 dark:text-gray-200">{prog.name}</td>
                    <td className="py-4 px-4 text-center text-sm text-gray-650 dark:text-gray-400 font-medium">{prog.duration}</td>
                    <td className="py-4 px-4 text-center text-sm font-extrabold text-primary dark:text-accent">{prog.seats}</td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-blue-50/20 dark:bg-blue-900/10 border-t border-gray-200 dark:border-gray-800 font-extrabold">
                  <td className="py-4 px-4 text-sm text-gray-800 dark:text-gray-200 text-right pr-6" colSpan="3">
                    Total Seat Capacity
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-primary dark:text-accent font-extrabold text-base">
                    {totalSeats}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Admission Details */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Admissions card */}
          <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white">
                Admission Process
              </h3>
            </div>
            <div className="text-xs sm:text-sm text-gray-650 dark:text-gray-400 space-y-3 leading-relaxed">
              <p>
                Admissions to the B.Tech programs are highly competitive and conducted based strictly on candidate performance in the **JEE Main** examination.
              </p>
              <p>
                Seat allocations are managed centrally through:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 font-medium">
                <li><span className="text-primary dark:text-accent font-bold">JoSAA</span> (Joint Seat Allocation Authority) for round-wise counseling.</li>
                <li><span className="text-primary dark:text-accent font-bold">CSAB</span> (Central Seat Allocation Board) for special/residual vacant seat rounds.</li>
              </ul>
            </div>
          </div>

          {/* Eligibility Card */}
          <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white">
                Eligibility Criteria
              </h3>
            </div>
            <div className="text-xs sm:text-sm text-gray-650 dark:text-gray-400 space-y-3 leading-relaxed">
              <p>
                Candidates seeking admission to IIIT Pune's undergraduate courses must fulfill the following criteria:
              </p>
              <ul className="list-decimal list-inside space-y-1.5 pl-2">
                <li>Qualified JEE Main examination with a valid score.</li>
                <li>Passed standard 10+2 level (or equivalent exam) with Physics and Mathematics as compulsory subjects along with one of Chemistry/Biotechnology/Biology/Technical Vocational subject.</li>
                <li>Secured a minimum rank meeting cutoffs declared during counseling rounds.</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default UgProgramsPage;
