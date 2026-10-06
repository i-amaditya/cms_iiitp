import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const ResearchScholarGraduatedPage = () => {
  const data = [
    {
      sno: 1,
      mis: "32205002",
      name: "Kratika Sharma",
      topic: "Application of machine learning alorithms",
      supervisor: "Dr. Ritu Tiwari, Dr. A.K Wadhwani, Dr. Priyank Jain",
      defenseDate: "Tuesday, 18\nFebruary 2025",
      branch: "CSE"
    },
    {
      sno: 2,
      mis: "31195003",
      name: "Prerna Rawat",
      topic: "Road Extraction and Vehicle Detection Using Deep Learning Framework",
      supervisor: "Dr. Bhpendra Singh",
      defenseDate: "Wednesday, 19\nFebruary 2025",
      branch: "CSE"
    },
    {
      sno: 3,
      mis: "31195004",
      name: "Shashi Pal Singh",
      topic: "Artificial Intelligence (AI) based framework or Text Mining and analysis for Human Language Technology (HLT)",
      supervisor: "Dr. Sanjeev Sharma, Dr. Ritu Tiwari",
      defenseDate: "Wednesday, 19\nFebruary 2025",
      branch: "CSE"
    },
    {
      sno: 4,
      mis: "32196001",
      name: "Ms. Anjali Malviya",
      topic: "ENHANCED COVID-19 PREDICTION THROUGH A STACKED AUTOENCODER-LSTM FRAMEWORK FOR ANOMALY DETECTION AND RESPIRATORY DISEASE CLASSIFICATION",
      supervisor: "Dr. Nagendra Kushwaha",
      defenseDate: "Tuesday, 16\nSeptember 2025",
      branch: "ECE"
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Graduated PhD Students" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-primary text-white dark:bg-gray-800">
                <tr>
                  <th className="p-3.5 font-semibold w-16 text-center">Sr. no.</th>
                  <th className="p-3.5 font-semibold">MIS No.</th>
                  <th className="p-3.5 font-semibold">Name</th>
                  <th className="p-3.5 font-semibold min-w-[250px]">PhD Thesis Title</th>
                  <th className="p-3.5 font-semibold min-w-[150px]">Supervisor</th>
                  <th className="p-3.5 font-semibold">PhD Defense Date</th>
                  <th className="p-3.5 font-semibold text-center w-24">Branch</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                {data.map((row) => (
                  <tr key={row.mis} className="border-b border-gray-100 dark:border-gray-800 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors last:border-b-0">
                    <td className="p-3.5 text-center border-r border-gray-100 dark:border-gray-800">{row.sno}.</td>
                    <td className="p-3.5 font-medium border-r border-gray-100 dark:border-gray-800">{row.mis}</td>
                    <td className="p-3.5 font-bold border-r border-gray-100 dark:border-gray-800">{row.name}</td>
                    <td className="p-3.5 border-r border-gray-100 dark:border-gray-800">{row.topic}</td>
                    <td className="p-3.5 text-accent hover:underline dark:text-accent-dark border-r border-gray-100 dark:border-gray-800 break-words whitespace-pre-wrap">
                      {row.supervisor.split(', ').map((sup, i) => (
                        <div key={i}>{sup}</div>
                      ))}
                    </td>
                    <td className="p-3.5 border-r border-gray-100 dark:border-gray-800 whitespace-pre-wrap">{row.defenseDate}</td>
                    <td className="p-3.5 text-center font-medium">{row.branch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-6 text-right text-sm text-gray-500 dark:text-gray-400">
          Last Updated: 25-04-2026
        </div>
      </div>
    </div>
  );
};

export default ResearchScholarGraduatedPage;
