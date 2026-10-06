import React, { useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';

const ReservationPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    ['Scheduled Caste (SC)', 'As per applicable Government of India norms'],
    ['Scheduled Tribe (ST)', 'As per applicable Government of India norms'],
    ['Other Backward Classes (OBC-NCL)', 'As per applicable Government of India norms'],
    ['Economically Weaker Sections (EWS)', 'As per applicable Government of India norms'],
    ['Persons with Benchmark Disabilities (PwBD)', 'As per applicable Government of India norms'],
    ['Other applicable categories', 'As prescribed by the Government of India from time to time'],
  ];

  const liaisonOfficers = [
    ['OBC', 'Dr. Sonam Maurya', 'Assistant Professor'],
    ['SC & ST', 'Dr. Shrikant Salve', 'Assistant Professor'],
    ['EWS & PwBD', 'Dr. Priyank Jain', 'Assistant Professor'],
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Reservation Policy" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-8 md:p-12 space-y-8">
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-justify space-y-4 text-base md:text-lg">
              <p>
                The Indian Institute of Information Technology Pune (IIIT Pune), an Institute of National Importance under the Ministry of Education, Government of India, follows the reservation policy of the Government of India, as applicable from time to time, in matters of admissions, recruitment and other applicable areas.
              </p>
              <p>
                Reservation benefits are provided to eligible candidates belonging to the Scheduled Castes (SC), Scheduled Tribes (ST), Other Backward Classes (OBC), Economically Weaker Sections (EWS), Persons with Benchmark Disabilities (PwBD) and other categories, as applicable under prevailing Government of India rules and regulations.
              </p>
              <p>
                The implementation of reservation provisions at the Institute is subject to the relevant Government of India orders, notifications, guidelines and amendments issued from time to time.
              </p>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Reservation Categories
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-primary text-white dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-center text-sm font-semibold tracking-wider">Category</th>
                      <th scope="col" className="px-6 py-4 text-center text-sm font-semibold tracking-wider min-w-[240px]">Reservation / Provision</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-surface-dark divide-y divide-gray-200 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                    {categories.map(([category, provision]) => (
                      <tr key={category} className="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors">
                        <th scope="row" className="px-6 py-4 text-center text-sm font-medium border-r border-gray-100 dark:border-gray-800">{category}</th>
                        <td className="px-6 py-4 text-center text-sm">{provision}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Liaison Officers
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-primary text-white dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-center text-sm font-semibold tracking-wider">Category</th>
                      <th scope="col" className="px-6 py-4 text-center text-sm font-semibold tracking-wider min-w-[200px]">Liaison Officer</th>
                      <th scope="col" className="px-6 py-4 text-center text-sm font-semibold tracking-wider min-w-[200px]">Designation</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-surface-dark divide-y divide-gray-200 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                    {liaisonOfficers.map(([category, name, designation]) => (
                      <tr key={category} className="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors">
                        <th scope="row" className="px-6 py-4 text-center text-sm font-semibold border-r border-gray-100 dark:border-gray-800">{category}</th>
                        <td className="px-6 py-4 text-center text-sm border-r border-gray-100 dark:border-gray-800">{name}</td>
                        <td className="px-6 py-4 text-center text-sm">{designation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="prose dark:prose-invert max-w-none space-y-4 pt-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Government of India Guidelines
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                The reservation policy of the Institute shall be implemented in accordance with the applicable rules, orders, notifications and guidelines issued by the Government of India from time to time.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReservationPolicyPage;
