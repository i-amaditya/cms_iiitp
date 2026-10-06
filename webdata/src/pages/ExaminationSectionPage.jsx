import React, { useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';

const ExaminationSectionPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: 'UFM Rule Aug 2026',
      description: 'Unfair Means (UFM) rules and regulations for examinations. Please click here to view the PDF.',
      buttonText: 'UFM Rule Aug 2026',
      href: '/assets/ExaminationSection/UFM Rule Aug 2026.pdf',
    },
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Examination Section" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 md:p-12">
          <h2 className="text-3xl font-bold font-serif text-primary dark:text-blue-400 mb-2 text-center">
            Examination Section
          </h2>

          <hr className="border-gray-200 dark:border-gray-700 mb-10" />

          <div className="space-y-10">
            {sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-primary dark:text-blue-400 mb-3">
                  {section.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    {section.description}
                  </p>
                  <a
                    href={section.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-block px-6 py-3 text-base font-bold text-white bg-primary hover:bg-blue-900 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    {section.buttonText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExaminationSectionPage;
