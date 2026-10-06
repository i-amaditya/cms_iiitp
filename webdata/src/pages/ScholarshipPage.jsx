import React from "react";
import PageHeader from "../components/shared/PageHeader";
import scholarships from "../data/scholarshipsData.json";

const ScholarshipPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Scholarships & Financial Assistance" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          
          <div className="p-8 md:p-12">
            
            <div className="mb-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <h3 className="text-3xl font-bold text-primary dark:text-white mb-4">
                  Available Scholarships
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
                  Explore the diverse range of national and state-level scholarship opportunities available to IIIT Pune students to support their academic journey.
                </p>
              </div>
              <a 
                href="https://scholarships.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-brand-red text-white font-medium rounded-xl hover:bg-red-700 transition-all shadow-md hover:shadow-lg shrink-0 group"
              >
                View NSP Portal
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white tracking-wider">Sr.</th>
                    <th className="pl-6 pr-2 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white tracking-wider">Category</th>
                    <th className="pl-2 pr-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white tracking-wider">Scheme</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white tracking-wider">Governed By</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white tracking-wider">Website</th>
                  </tr>
                </thead>

                <tbody className="bg-white dark:bg-surface-dark divide-y divide-gray-200 dark:divide-gray-700">
                  {scholarships.map((item) => (
                    <tr
                      key={item.sr}
                      className="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-medium">{item.sr}</td>
                      <td className="pl-6 pr-2 py-4 whitespace-nowrap text-md text-gray-700 dark:text-gray-300">
                        {item.category}
                      </td>
                      <td className="pl-2 pr-6 py-4 text-sm text-gray-900 dark:text-white font-medium">{item.scheme}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.governedBy}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-red hover:text-red-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline font-medium flex items-center gap-1"
                        >
                          Visit Portal
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-5 rounded-r-xl">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    Important Note
                  </h3>
                  <div className="mt-2 text-sm text-blue-700 dark:text-blue-200">
                    <p>
                      Students should independently verify eligibility criteria, deadlines, and required documents directly from the official scholarship portals before applying. The information provided here is for reference only.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipPage;
