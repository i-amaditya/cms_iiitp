import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const PostDocFellowPage = () => {
  const data = [
    {
      sno: 1,
      name: "Dr. Prasad Purnaye",
      link: "https://sites.google.com/view/prasadpurnaye",
      topic: "Cloud Forensic",
      supervisor: "Dr. Bhupendra Singh",
      email: "prasadpurnaye@iiitp.ac.in",
      branch: "CSE",
      mode: "Full Time"
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="PostDoc Fellow" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-bold text-center text-primary dark:text-blue-400 mb-8">
              List of Postdoctoral Students - 2025
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse rounded-lg overflow-hidden">
                <thead className="bg-[#6b58e6] text-white">
                  <tr>
                    <th className="p-3 font-semibold border-r border-[#8474e9]">Sr. no.</th>
                    <th className="p-3 font-semibold border-r border-[#8474e9]">Name</th>
                    <th className="p-3 font-semibold border-r border-[#8474e9]">Research Topic</th>
                    <th className="p-3 font-semibold border-r border-[#8474e9]">Supervisor</th>
                    <th className="p-3 font-semibold border-r border-[#8474e9]">Email</th>
                    <th className="p-3 font-semibold border-r border-[#8474e9]">Branch</th>
                    <th className="p-3 font-semibold">Mode</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  {data.map((row) => (
                    <tr key={row.sno} className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="p-3 text-center">{row.sno}.</td>
                      <td className="p-3 font-medium text-[#0056b3] dark:text-blue-400"><a href={row.link}>{row.name}</a></td>
                      <td className="p-3">{row.topic}</td>
                      <td className="p-3 text-[#0056b3]">{row.supervisor}</td>
                      <td className="p-3 text-[#0056b3] dark:text-blue-400"><a href={"mailto:" + row.email}>{row.email}</a></td>
                      <td className="p-3 text-center">{row.branch}</td>
                      <td className="p-3 text-center">{row.mode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6 text-right text-sm text-gray-500 dark:text-gray-400">
                Last Updated: 25-04-2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDocFellowPage;
