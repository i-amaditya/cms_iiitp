import React from "react";
import { Link } from "react-router";
import PageHeader from "../components/shared/PageHeader";
import sgrcData from "../data/sgrc.json";

const SgrcPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Student Grievance Redressal Committee" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          
          <div className="p-8 md:p-12">
            <div className="mb-10">
              <h3 className="text-3xl font-bold text-primary dark:text-white mb-4">
                SGRC Committee details
              </h3>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white tracking-wider whitespace-nowrap">S. No.</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white tracking-wider">Name of the member</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white tracking-wider">Designation in the Committee</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white tracking-wider">Email Id</th>
                  </tr>
                </thead>

                <tbody className="bg-white dark:bg-surface-dark divide-y divide-gray-200 dark:divide-gray-700">
                  {sgrcData.map((item) => (
                    <tr
                      key={item.sr}
                      className="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-medium">{item.sr}</td>
                      <td className="px-6 py-4 text-md text-gray-900 dark:text-white font-medium">
                        {item.slug ? (
                          <Link to={`/people/faculty/${item.slug}`} className="hover:text-brand-red hover:underline transition-colors">
                            {item.name}
                          </Link>
                        ) : (
                          item.name
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{item.designation}</td>
                      <td className="px-6 py-4 text-sm text-brand-red dark:text-blue-400 font-medium whitespace-nowrap">
                        <a href={`mailto:${item.email}`} className="hover:underline">{item.email}</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SgrcPage;
