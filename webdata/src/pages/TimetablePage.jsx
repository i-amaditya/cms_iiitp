import React, { useEffect } from "react";
import PageHeader from "../components/shared/PageHeader";

const timetables = [
  {
    title: "B.Tech. Semesters 3, 5 and 7",
    description: "View the timetable for B.Tech. students in semesters 3, 5 and 7.",
    href: "/assets/ExaminationSection/Sem3_5_7.pdf",
  },
  {
    title: "B.Tech. Semester 1",
    description: "View the timetable for B.Tech. first-semester students.",
    href: "/assets/ExaminationSection/BTech_Sem1.pdf",
  },
  {
    title: "M.Tech. Semester 1",
    description: "View the timetable for M.Tech. first-semester students.",
    href: "/assets/ExaminationSection/MTech_Sem1.pdf",
  },
];

const TimetablePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Time Table" />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 md:p-12">
          <h2 className="text-3xl font-bold font-serif text-primary dark:text-blue-400 mb-2 text-center">
            Examination Timetables
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-10">
            Select your programme and semester to view the timetable.
          </p>

          <div className="space-y-5">
            {timetables.map((timetable) => (
              <div
                key={timetable.href}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-5 last:border-b-0 last:pb-0"
              >
                <div>
                  <h3 className="text-xl font-bold text-primary dark:text-blue-400">
                    {timetable.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {timetable.description}
                  </p>
                </div>
                <a
                  href={timetable.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-primary hover:bg-blue-900 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  View Timetable
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TimetablePage;