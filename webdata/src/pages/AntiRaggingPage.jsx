import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const AntiRaggingPage = () => {
  const committeeData = [
    { sno: 1, name: "Dr. Nagendra Kushwaha", designation: "Chairperson", contact: "+91-9881457120", email: "nagendra@iiitp.ac.in" },
    { sno: 2, name: "Warden BH1", designation: "Member", contact: "+91-8840677530", email: "dheeraj@iiitp.ac.in" },
    { sno: 3, name: "Warden BH2", designation: "Member", contact: "+91-8292305145", email: "sushant@iiitp.ac.in" },
    { sno: 4, name: "Warden GH", designation: "Member", contact: "+91-8133911040", email: "habila@iiitp.ac.in" },
    { sno: 5, name: "Dr. Shivangi Shukla", designation: "Member", contact: "+91-9451180932", email: "shivangi@iiitp.ac.in" }
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Anti-Ragging Committee" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-6 md:p-8 space-y-8">
            <h2 className="text-3xl font-bold text-center text-primary dark:text-blue-400 mb-8 uppercase tracking-wide">
              Anti-Ragging Committee (ARC)
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-[#003399] text-white">
                  <tr>
                    <th className="p-4 font-semibold border-r border-[#1a4ca8] w-20 text-center">S.No.</th>
                    <th className="p-4 font-semibold border-r border-[#1a4ca8] min-w-[200px] text-center">Name</th>
                    <th className="p-4 font-semibold border-r border-[#1a4ca8] min-w-[200px] text-center">Designation in the Committee</th>
                    <th className="p-4 font-semibold border-r border-[#1a4ca8] min-w-[150px] text-center">Contact Number</th>
                    <th className="p-4 font-semibold min-w-[200px] text-center">Email ID</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  {committeeData.map((row) => (
                    <tr key={row.sno} className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="p-4 text-center border-r border-gray-200 dark:border-gray-700">{row.sno}</td>
                      <td className="p-4 text-center text-[#0056b3] dark:text-blue-400 font-medium border-r border-gray-200 dark:border-gray-700">{row.name}</td>
                      <td className="p-4 text-center border-r border-gray-200 dark:border-gray-700">{row.designation}</td>
                      <td className="p-4 text-center text-[#0056b3] dark:text-blue-400 border-r border-gray-200 dark:border-gray-700">{row.contact}</td>
                      <td className="p-4 text-center text-[#0056b3] dark:text-blue-400">{row.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 text-center text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 leading-relaxed uppercase">
              RAGGING IS A CRIMINAL OFFENCE AND THE CULPRITS WILL ATTRACT PUNITIVE ACTION AS MENTIONED IN THE UGC REGULATIONS
              <br />
              <a href="https://www.antiragging.in/assets/pdf/annexure/Annexure-I.pdf" target="_blank" rel="noopener noreferrer"  className="text-[#0056b3] dark:text-blue-400 lowercase font-normal hover:underline mt-2 inline-block">
                (www.antiragging.in/assets/pdf/annexure/Annexure-I.pdf)
              </a>
            </div>

            <div className="mt-12 text-right text-sm text-gray-500 dark:text-gray-400">
              Last Updated: 25-04-2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntiRaggingPage;
