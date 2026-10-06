import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const FeesPage = () => {
  const sections = [
    {
      title: "Fee Structure",
      description: "Academic Fee Structure for BTech 2026-30 (Batch) Please click here ",
      buttonText: "Fee Structure",
      href: "/docs/Fee_Structure_2026-27.pdf",
    },
    {
      title: "Students Payments",
      description: "Related Academic/Hostel/Mess Fees. Please click here ",
      buttonText: "Fees Payment",
      href: "https://www.onlinesbi.sbi/sbicollect/icollecthome.htm",
    },
    {
      title: "Other Payment",
      description: "Related Tender/Guest House/Event/ Application/Sponsorship/Other Please click here ",
      buttonText: "Fees Payment",
      href: "https://payments.billdesk.com/bdcollect/bd/indianinstituteofinformationtechnologypuneii/16417",
    },
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Institute Payments" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 md:p-12">
          <h2 className="text-3xl font-bold font-serif text-primary dark:text-blue-400 mb-2 text-center">
            Institute Payments
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

          <p className="text-sm text-gray-500 dark:text-gray-400 text-right mt-10">
            Last Updated: 14-05-2024
          </p>
        </section>
      </div>
    </div>
  );
};

export default FeesPage;
