import React, { useEffect } from "react";
import { Link } from "react-router";
import PageHeader from "../components/shared/PageHeader";

const EqualOpportunityCellPage = () => {
  useEffect(() => {
    document.title = "Equal Opportunity Cell | IIIT Pune";
    window.scrollTo(0, 0);
  }, []);

  const eocData = [
    {
      sno: 1,
      name: "Dr. Mahesh Joshi",
      slug: "mahesh-joshi",
      position: "FiC/Coordinator",
      email: "mahesh.joshi@iiitp.ac.in",
      contact: "8886844737"
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Equal Opportunity Cell (EOC)" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          
          <div className="p-8 md:p-12 space-y-8">
            {/* <h2 className="text-3xl font-bold text-primary dark:text-blue-400 mb-6 uppercase tracking-wide">
              Equal Opportunity Cell
            </h2> */}

            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-justify space-y-4 text-base md:text-lg">
              <p>
                As per the guideline issued by the Ministry of Education, Govt. of India to provide Equal Opportunities to disadvantaged and marginalized section of the society, i.e., SCs, STs, OBCs, (Non-creamy Layer), Women, Minorities and Physical Handicapped persons, the Competent Authority has appointed the following Faculty-in-Charge (FiC) for Equal Opportunity Cell at IIIT Pune.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mt-6">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-primary text-white dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-center text-sm font-semibold tracking-wider w-20">Sr. No.</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold tracking-wider min-w-[200px]">Name</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold tracking-wider min-w-[200px]">Position</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold tracking-wider min-w-[200px]">Email ID</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold tracking-wider min-w-[150px]">Contact No.</th>
                  </tr>
                </thead>

                <tbody className="bg-white dark:bg-surface-dark divide-y divide-gray-200 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
                  {eocData.map((item) => (
                    <tr
                      key={item.sno}
                      className="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400 font-medium border-r border-gray-100 dark:border-gray-800">{item.sno}</td>
                      <td className="px-6 py-4 text-center text-md font-medium border-r border-gray-100 dark:border-gray-800">
                        {item.slug ? (
                          <Link to={`/people/faculty/${item.slug}`} className="text-primary dark:text-blue-400 hover:text-brand-red dark:hover:text-brand-red-dark hover:underline font-semibold transition-colors">
                            {item.name}
                          </Link>
                        ) : (
                          item.name
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm border-r border-gray-100 dark:border-gray-800">{item.position}</td>
                      <td className="px-6 py-4 text-center text-sm text-brand-red dark:text-blue-400 font-medium whitespace-nowrap border-r border-gray-100 dark:border-gray-800">
                        <a href={`mailto:${item.email}`} className="hover:underline">{item.email}</a>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">{item.contact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="prose dark:prose-invert max-w-none space-y-6 pt-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Aims and Objectives of the Cell
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify text-base md:text-lg">
                  To oversee the effective implementation of policies and programmes for disadvantaged groups, to provide guidance and counseling with respect to academic, financial, social and other matters and to enhance the diversity within the campus.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Functions of the Cell
                </h3>
                <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-3 text-base md:text-lg">
                  <li>
                    To review the implementation of various schemes and programs for the welfare of the disadvantaged and marginalized groups of the society and other related activities undertaken by the Institute.
                  </li>
                  <li>
                    Implementation of reservation policy in admission and recruitment for SC, ST, PwD, OBC (non-creamy layer), and others, if any.
                  </li>
                  <li>
                    Oversee/Monitor various welfare schemes/programs sponsored by the Government of India or any agency/organization as well as those devised by the Institute for the disadvantaged groups for their effective implementation.
                  </li>
                  <li>
                    Responsible for the effective functioning of SC/ST Cell and other such Cells/Centres dealing with the problems of different socially disadvantaged groups.
                  </li>
                  <li>
                    Convene the meetings of In-charges of Other Committees/Programs dealing with social issues such as Gender Sensitization Committee against sexual harassment (GSCASH), etc. and to review their activities.
                  </li>
                </ol>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EqualOpportunityCellPage;
