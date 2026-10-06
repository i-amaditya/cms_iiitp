import React, { useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { Calendar, GraduationCap, Award, BookOpen, UserCheck, ShieldAlert } from 'lucide-react';

const PhdProgramsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const departments = [
    {
      sNo: 1,
      name: "Computer Science and Engineering (CSE)",
      specializations: "Machine Learning, Deep Learning, Natural Language Processing, Internet of Things (IoT), Mobile Computing, Cyber Security, Blockchain, Cloud Computing, Speech & Image Processing"
    },
    {
      sNo: 2,
      name: "Electronics and Communication Engineering (ECE)",
      specializations: "VLSI Design, Microelectronics, Embedded Systems, Cyber-Physical Systems, Wireless Communication, Networking, Signal Processing, Nanotechnology"
    },
    {
      sNo: 3,
      name: "Applied Sciences & Humanities (AS & H)",
      specializations: "Computational Mathematics, Optimization Techniques, Physics, Humanities, Social Sciences"
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-200 pb-16 bg-slate-200 dark:bg-bg-dark">
      <PageHeader 
        title="Ph.D. Programs" 
        subtitle="Nurturing advanced research, academic excellence, and scholarly innovation across engineering and applied sciences"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Introduction Section */}
        <section className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 dark:text-white">
              Doctoral Programs Overview
            </h2>
          </div>
          <p className="text-gray-650 dark:text-gray-355 leading-relaxed text-justify text-sm sm:text-base">
            Indian Institute of Information Technology, Pune (IIIT Pune) runs doctoral programs leading to the Doctor of Philosophy (Ph.D.) degree. The academic program is broad-based and designed to assist students in acquiring proficiency and conducting original research in their chosen domain. The institute encourages research in interdisciplinary areas through a system of joint supervision and collaborations with research centers, aiming to develop new knowledge in all aspects of teaching and research.
          </p>
        </section>

        {/* Seat Matrix / Department Streams Section */}
        <section className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 dark:text-white">
                Academic Departments & Research Streams
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Overview of research areas offered under each doctoral department at IIIT Pune
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-355 border-b border-gray-150 dark:border-gray-800 font-bold">
                  <th className="py-4 px-4 font-bold text-xs uppercase tracking-wider w-[10%] text-center">S.No.</th>
                  <th className="py-4 px-4 font-bold text-xs uppercase tracking-wider w-[35%]">Department</th>
                  <th className="py-4 px-4 font-bold text-xs uppercase tracking-wider w-[55%]">Key Research Specializations</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept, idx) => (
                  <tr 
                    key={dept.sNo}
                    className="border-b border-gray-100 dark:border-gray-850 hover:bg-blue-50/10 dark:hover:bg-blue-900/5 transition-colors"
                  >
                    <td className="py-4 px-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">{dept.sNo}</td>
                    <td className="py-4 px-4 text-sm font-bold text-gray-800 dark:text-gray-200">{dept.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-655 dark:text-gray-400 leading-relaxed">{dept.specializations}</td>
                  </tr>
                ))}
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
                Admission Process & Schemes
              </h3>
            </div>
            <div className="text-xs sm:text-sm text-gray-650 dark:text-gray-400 space-y-3 leading-relaxed text-justify">
              <p>
                Admissions to the Ph.D. program are highly selective and announced through advertisements twice a year (typically for Autumn and Spring semesters). Evaluation is conducted via a written test followed by a technical interview.
              </p>
              <p>
                The Institute offers Ph.D. admissions under the following main categories/schemes:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 font-medium">
                <li><span className="text-primary dark:text-accent font-bold">Institute Fellowship Scheme</span>: Full-time research scholars supported by institute fellowships.</li>
                <li><span className="text-primary dark:text-accent font-bold">Visvesvaraya Ph.D. Scheme</span>: Special scheme supported by MeitY, providing fellowship and infrastructure support.</li>
                <li><span className="text-primary dark:text-accent font-bold">Sponsored Candidates</span>: For candidates working in registered R&D organizations or industry partners.</li>
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
            <div className="text-xs sm:text-sm text-gray-650 dark:text-gray-400 space-y-3 leading-relaxed text-justify">
              <p>
                Candidates seeking admission to the doctoral programs must satisfy the following academic prerequisites:
              </p>
              <ul className="list-decimal list-inside space-y-1.5 pl-2">
                <li><strong>Engineering (CSE/ECE)</strong>: Master's degree in relevant branch of engineering with 60% marks (or 6.5 CGPA) OR Bachelor's degree in engineering with an outstanding academic record (minimum 70% marks or 7.5 CGPA) and a valid GATE score.</li>
                <li><strong>Applied Sciences & Humanities</strong>: Master's degree in relevant discipline (Mathematics, Physics, etc.) with at least 60% marks (or 6.5 CGPA) along with a valid GATE, NET, or equivalent national level examination score.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Ph.D. Ordinances & Regulations Section */}
        {/* <section className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-brand-red dark:text-brand-red-dark" />
                Ph.D. Ordinances & Regulations
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Official rules, regulations, and guidelines governing doctoral studies at IIIT Pune
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/documents/IIIT Pune_PhD Ordinances and Regulations_Revised.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 hover:border-brand-red dark:hover:border-brand-red-dark hover:bg-brand-red/5 dark:hover:bg-brand-red-dark/10 transition-all duration-200 group"
            >
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-brand-red/10 text-brand-red dark:bg-brand-red-dark/20 dark:text-brand-red-dark">
                  Latest Version
                </span>
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-brand-red dark:group-hover:text-brand-red-dark transition-colors">
                  Ph.D. Ordinances & Regulations 2026
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Revised ordinance rules & academic regulations (PDF)
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 group-hover:bg-brand-red group-hover:text-white transition-all">
                <BookOpen className="w-5 h-5" />
              </div>
            </a>

            <a
              href="/documents/IIIT_Pune_PhD_Ordinances_and_Regulations_2020.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 hover:border-brand-red dark:hover:border-brand-red-dark hover:bg-brand-red/5 dark:hover:bg-brand-red-dark/10 transition-all duration-200 group"
            >
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  Archive
                </span>
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-brand-red dark:group-hover:text-brand-red-dark transition-colors">
                  Ph.D. Ordinances & Regulations 2020
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Previous 2020 ordinance document (PDF)
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 group-hover:bg-brand-red group-hover:text-white transition-all">
                <BookOpen className="w-5 h-5" />
              </div>
            </a>
          </div>
        </section> */}

      </div>
    </div>
  );
};

export default PhdProgramsPage;
