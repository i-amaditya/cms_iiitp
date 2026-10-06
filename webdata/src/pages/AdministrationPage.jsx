import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const AdministrationPage = () => {
  const bogMembers = [
    { role: 'Chairman', name: 'Shri. Sanjay Dhotre', designation: 'Honorable Minister of State for Education, GoI' },
    { role: 'Member', name: 'Smt. Saumya Gupta (IAS)', designation: 'Joint Secretary (TE), MoE, GoI' },
    { role: 'Member', name: 'Prof. Anupam Shukla', designation: 'Director, IIIT Pune' },
    { role: 'Member', name: 'Shri. Prakash H. Patil', designation: 'Industry Partner Representative' },
    { role: 'Member', name: 'Prof. B. B. Ahuja', designation: 'Director, COEP (Mentor Institute)' },
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Administration" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-serif text-primary dark:text-white mb-6 border-b pb-2 border-gray-200 dark:border-gray-800">
            Board of Governors
          </h2>
          <div className="w-full overflow-x-auto bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary text-white dark:bg-gray-800">
                  <th className="p-4 font-semibold text-sm">Role</th>
                  <th className="p-4 font-semibold text-sm">Name</th>
                  <th className="p-4 font-semibold text-sm">Designation & Affiliation</th>
                </tr>
              </thead>
              <tbody>
                {bogMembers.map((member, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 text-sm font-medium text-gray-900 dark:text-gray-200">{member.role}</td>
                    <td className="p-4 text-sm text-gray-700 dark:text-gray-300">{member.name}</td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{member.designation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-serif text-primary dark:text-white mb-6 border-b pb-2 border-gray-200 dark:border-gray-800">
            Institute Organogram
          </h2>
          <div className="bg-white dark:bg-surface-dark p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-full max-w-4xl h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/10 opacity-50"></div>
              <div className="relative z-10 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">Organogram Chart</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Visual hierarchy placeholder</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AdministrationPage;
