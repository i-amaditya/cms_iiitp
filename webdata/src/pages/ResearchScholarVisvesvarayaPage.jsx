import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const ResearchScholarVisvesvarayaPage = () => {
  const yearsData = [
    {
      year: "2026",
      tables: [
        [
          { sno: 1, mis: "322615001", name: "Anurag Kumar", topic: "--", supervisor: "Dr. Mahendra Pratap Yadav", email: "322615001@phd.iiitp.ac.in", branch: "CSE", mode: "Part time" },
          { sno: 2, mis: "322615007", name: "Priyanca Primas Gonsalves", topic: "--", supervisor: "Dr. Mahesh Joshi", email: "322615007@phd.iiitp.ac.in", branch: "CSE", mode: "Full time" },
        ]
      ]
    },
    {
      year: "2025",
      tables: [
        [
          { sno: 1, mis: "312515003", name: "Saurav Nagnath Dabhade", topic: "Responsible AI", supervisor: "Dr. Shrikant Salve", email: "312515003@phd.iiitp.ac.in", branch: "CSE", mode: "Full time" },
        ]
      ]
    },
    {
      year: "2024",
      tables: [
        [
          { sno: 1, mis: "312416001", name: "Ashish Kumar", topic: "Analog Circuit Design", supervisor: "Dr. Nagendra Kushwaha", email: "ashish.kumar24@iiitp.ac.in", branch: "ECE", mode: "Full time" },
          { sno: 2, mis: "312416002", name: "Dnyaneshwari Dilip Dhadwad", topic: "Memory design for IC", supervisor: "Dr. Nagendra Kushwaha", email: "dnyaneshwari.c2s@iiitp.ac.in", branch: "ECE", mode: "Full time" },
        ]
      ]
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Visvesvaraya Scheme" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          
          <div className="p-6 md:p-8 space-y-12">
            {yearsData.map((yearGroup) => (
              <div key={yearGroup.year} className="space-y-8">
                <h3 className="text-2xl font-bold text-center text-primary dark:text-blue-400">
                  List of Ph.D Students - {yearGroup.year}
                </h3>
                
                <div className="space-y-6">
                  {yearGroup.tables.map((tableData, index) => (
                    <div key={`${yearGroup.year}-${index}`} className="overflow-x-auto">
                      <table className="w-full text-sm text-left border-collapse rounded-lg overflow-hidden shadow-sm">
                        <thead className="bg-[#6b58e6] text-white">
                          <tr>
                            <th className="p-3 font-semibold border-r border-[#8474e9] w-16 text-center">Sr. no.</th>
                            <th className="p-3 font-semibold border-r border-[#8474e9]">MIS No.</th>
                            <th className="p-3 font-semibold border-r border-[#8474e9]">Name</th>
                            <th className="p-3 font-semibold border-r border-[#8474e9]">Research Topic</th>
                            <th className="p-3 font-semibold border-r border-[#8474e9]">Supervisor</th>
                            <th className="p-3 font-semibold border-r border-[#8474e9]">Email</th>
                            <th className="p-3 font-semibold border-r border-[#8474e9] text-center w-24">Branch</th>
                            <th className="p-3 font-semibold text-center w-24">Mode</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700 dark:text-gray-300">
                          {tableData.map((row) => (
                            <tr key={row.mis} className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                              <td className="p-3 text-center border-r border-gray-200 dark:border-gray-700">{row.sno}.</td>
                              <td className="p-3 font-medium border-r border-gray-200 dark:border-gray-700">{row.mis}</td>
                              <td className="p-3 font-bold border-r border-gray-200 dark:border-gray-700">{row.name}</td>
                              <td className="p-3 border-r border-gray-200 dark:border-gray-700">{row.topic}</td>
                              <td className="p-3 text-[#0056b3] dark:text-blue-400 border-r border-gray-200 dark:border-gray-700 break-words whitespace-pre-wrap">
                                {row.supervisor.split(', ').map((sup, i) => (
                                  <div key={i}>{sup}</div>
                                ))}
                              </td>
                              <td className="p-3 text-[#0056b3] dark:text-blue-400 border-r border-gray-200 dark:border-gray-700">{row.email}</td>
                              <td className="p-3 text-center font-medium border-r border-gray-200 dark:border-gray-700">{row.branch}</td>
                              <td className="p-3 text-center">{row.mode}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800 text-right text-sm text-gray-500 dark:text-gray-400">
              Last Updated: 25-04-2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchScholarVisvesvarayaPage;
