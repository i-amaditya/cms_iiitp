import React, { useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { Calendar, GraduationCap, Award, BookOpen, UserCheck, ShieldAlert } from 'lucide-react';

const PgProgramsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const programs = [
    {
      sNo: 1,
      name: "M.Tech. Computer Science and Engineering (Specialization: Artificial Intelligence)",
      duration: "2 Years (4 Semesters)",
      seats: 36
    },
    {
      sNo: 2,
      name: "M.Tech. Electronics and Communication Engineering (Specialization: Microelectronics & VLSI Design)",
      duration: "2 Years (4 Semesters)",
      seats: 22
    }
  ];

  const totalSeats = programs.reduce((acc, curr) => acc + curr.seats, 0);

  return (
    <div className="min-h-screen transition-colors duration-200 pb-16 bg-slate-200 dark:bg-bg-dark">
      <PageHeader 
        title="PG Programs (M.Tech.)" 
        subtitle="Fostering deep specialization and advanced research in artificial intelligence and microelectronics"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Introduction Section */}
        <section className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 dark:text-white">
              Postgraduate Programs Overview
            </h2>
          </div>
          <p className="text-gray-650 dark:text-gray-355 leading-relaxed text-justify text-sm sm:text-base">
            Indian Institute of Information Technology, Pune (IIIT Pune) runs postgraduate courses of 02 years duration leading to the Master of Technology (M.Tech.) degree. The academic programs are designed to provide in-depth specialization, research-oriented training, and advanced engineering skills. Currently, the institute offers specialized programs in two cutting-edge disciplines, catering to the growing demands of advanced technology and research sectors.
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
                Approved seat distribution across various postgraduate engineering programs at IIIT Pune
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
                    <td className="py-4 px-4 text-center text-sm text-gray-655 dark:text-gray-400 font-medium">{prog.duration}</td>
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
                Admissions to the M.Tech. programs are offered through two primary categories:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 font-medium">
                <li>
                  <span className="text-primary dark:text-accent font-bold">GATE Candidates (CCMT)</span>: Selection is based strictly on candidate performance in the Graduate Aptitude Test in Engineering (GATE) and managed centrally through CCMT counseling rounds.
                  <div className="mt-2 pl-4">
                    <a 
                      href="/documents/PHYSICAL_REPORTING_DETAILS_OF_ADMISSION_PROCESS_FOR_MTECH_THROUGH_CCMT_FIRST_SEMESTER_2026-27.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-red dark:text-brand-red-dark hover:underline font-bold inline-flex items-center gap-1 text-xs"
                    >
                      Physical Reporting Details (AY 2026-27) [PDF]
                    </a>
                  </div>
                </li>
                <li><span className="text-primary dark:text-accent font-bold">Non-GATE Candidates</span>: Vacant seats remaining after CCMT rounds are filled directly by the institute through a written test and technical interview process.</li>
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
                Candidates seeking admission to postgraduate M.Tech. programs must satisfy the following:
              </p>
              <ul className="list-decimal list-inside space-y-1.5 pl-2">
                <li>Possess a valid B.E./B.Tech. degree in Computer Science, Information Technology, Electronics & Communication, or relevant discipline from a recognized University/Institute.</li>
                <li>Secured a minimum of 60% marks (or 6.5 CGPA on a 10-point scale) for General/OBC candidates, and 55% marks (or 6.0 CGPA) for SC/ST/PwD candidates in the qualifying degree.</li>
                <li>Possess a valid GATE scorecard in the respective stream (compulsory for CCMT entry category).</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PgProgramsPage;
