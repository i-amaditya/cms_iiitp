import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const FundedProjectsCompletedPage = () => {
  const data = [
    {
      sno: 1,
      faculty: "Dr. Upasna Singh",
      category: "Sponsored Research",
      agency: "NCoE-DSCI, MeitY",
      pi: "Dr. Bhupendra Singh & Dr. Nitesh K Bharadwaj",
      title: "Unified Drone Forensics Tool (UDFT)",
      startDate: "Feb-23",
      status: "Completed",
      duration: "9 months",
      // completionDate: "15-Dec-23",
      completionDate: "Dec-23",
      grant: "5.6"
    },
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Funded Projects (Completed)" />
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-primary text-white dark:bg-gray-800">
                <tr>
                  <th className="p-3.5 font-semibold text-center w-16">S.No.</th>
                  <th className="p-3.5 font-semibold min-w-[120px]">Name of the IIIT Pune Faculty / PI</th>
                  <th className="p-3.5 font-semibold min-w-[120px]">Project Category</th>
                  <th className="p-3.5 font-semibold min-w-[100px]">Funding Agency</th>
                  <th className="p-3.5 font-semibold min-w-[180px]">Co-PI</th>
                  <th className="p-3.5 font-semibold min-w-[200px]">Title of the Project</th>
                  <th className="p-3.5 font-semibold text-center whitespace-nowrap">Start Date</th>
                  {/* <th className="p-3.5 font-semibold text-center">Status</th> */}
                  <th className="p-3.5 font-semibold text-center">Duration</th>
                  <th className="p-3.5 font-semibold text-center">Completion Date</th>
                  <th className="p-3.5 font-semibold min-w-[80px]">Grant Amount (in Lakhs)</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                {data.map((row) => (
                  <tr key={row.sno} className="border-b border-gray-100 dark:border-gray-800 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors last:border-b-0">
                    <td className="p-3.5 text-center border-r border-gray-100 dark:border-gray-800">{row.sno}</td>
                    <td className="p-3.5 border-r border-gray-100 dark:border-gray-800">{row.faculty}</td>
                    <td className="p-3.5 border-r border-gray-100 dark:border-gray-800">{row.category}</td>
                    <td className="p-3.5 border-r border-gray-100 dark:border-gray-800">{row.agency}</td>
                    <td className="p-3.5 border-r border-gray-100 dark:border-gray-800">{row.pi}</td>
                    <td className="p-3.5 border-r border-gray-100 dark:border-gray-800">{row.title}</td>
                    <td className="p-3.5 border-r border-gray-100 dark:border-gray-800 text-center">{row.startDate}</td>
                    {/* <td className="p-3.5 border-r border-gray-100 dark:border-gray-800 text-center">{row.status}</td> */}
                    <td className="p-3.5 border-r border-gray-100 dark:border-gray-800 text-center">{row.duration}</td>
                    <td className="p-3.5 border-r border-gray-100 dark:border-gray-800 text-center">{row.completionDate}</td>
                    <td className="p-3.5 text-center font-semibold text-emerald-600 dark:text-emerald-400">{row.grant}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundedProjectsCompletedPage;
