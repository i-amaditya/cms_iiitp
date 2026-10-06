import React from "react";
import { Mail } from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const NIRFPage = () => {
  const nirfData = [
    {
      year: "2026",
      docs: [
        {
          label: "Institute Data for NIRF '2026' Engineering Document",
          btnLabel: "ENGINEERING",
          path: "/NIRF/1.pdf",
        },
        {
          label: "Institute Data for NIRF '2026' Overall Document",
          btnLabel: "OVERALL",
          path: "/NIRF/2.pdf",
        },
      ],
    },
    {
      year: "2025",
      docs: [
        {
          label: "Institute Data for NIRF '2025' Engineering Document",
          btnLabel: "ENGINEERING",
          path: "/NIRF/3.pdf",
        },
        {
          label: "Institute Data for NIRF '2025' Overall Document",
          btnLabel: "OVERALL",
          path: "/NIRF/4.pdf",
        },
      ],
    },
    {
      year: "2024",
      docs: [
        {
          label: "Institute Data for NIRF '2024' Document",
          btnLabel: "2024 Doc",
          path: "/NIRF/5.pdf",
        },
      ],
    },
    {
      year: "2023",
      docs: [
        {
          label: "Institute Data for NIRF '2023' Engineering Document",
          btnLabel: "ENGINEERING",
          path: "/NIRF/6.pdf",
        },
        {
          label: "Institute Data for NIRF '2023' Overall Document",
          btnLabel: "OVERALL",
          path: "/NIRF/7.pdf",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen transition-colors duration-200 pb-20">
      <PageHeader title="National Institutional Ranking Framework (NIRF)" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-6 md:p-8">
          {/* Data Sections */}
          <div className="space-y-12">
            {nirfData.map((section, idx) => (
              <div key={idx} className="bg-transparent">
                <h3 className="text-xl font-bold text-black dark:text-white mb-6">
                  Institute Data for NIRF {section.year}
                </h3>

                <div className="space-y-6">
                  {section.docs.map((doc, docIdx) => (
                    <div
                      key={docIdx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-4xl"
                    >
                      <div className="flex items-center text-gray-800 dark:text-gray-200 text-base md:text-lg font-medium">
                        <span>{doc.label}</span>
                      </div>
                      <div className="sm:ml-auto">
                        <a
                          href={doc.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex justify-center items-center px-6 py-2.5 bg-[#0d6efd] hover:bg-blue-700 text-white font-bold rounded shadow-sm transition-colors min-w-[140px] uppercase text-sm tracking-wide"
                        >
                          {doc.btnLabel}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Feedback Section */}
          <div className="mt-12 p-6 border-2 border-red-500 rounded-xl text-left bg-red-50/10 dark:bg-red-900/10">
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-1">
              We Value Your Feedback
            </h2>
            <p className="mb-2 text-md">
              For any queries, corrections, or feedback regarding the published
              information, please contact us at:
            </p>
            <a
              href="mailto:nirffeedback@iiitp.ac.in"
              className="inline-flex items-center text-[#0d6efd] dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline text-sm font-bold"
            >
              <Mail className="w-4 h-4 mr-1.5" />
              nirffeedback@iiitp.ac.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NIRFPage;
