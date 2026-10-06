import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const ICCPage = () => {
  const iccData = [
    { sno: 1, name: <a href="/people/faculty/sonam-maurya" className="hover:underline text-[#0056b3] dark:text-blue-400 font-medium">Dr. Sonam Maurya</a>, designation: "Chairperson", contact: "+91-8989172018", email: "sonam.m@iiitp.ac.in" },
    { sno: 2, name: <a href="/people/faculty/anagha-uday-khiste" className="hover:underline text-[#0056b3] dark:text-blue-400 font-medium">Dr. Anagha Khiste</a>, designation: "Nodal Officer for SHe-Box Portal", contact: "+91-8698242522", email:"anaghakhiste@iiitp.ac.in"},
    { sno: 3, name: <span className="text-[#0056b3] dark:text-blue-400 font-medium">Prof. Nisha Gupta<br/>(Retired Professor, BIT Mesra)</span>, designation: "External Member", contact: "+91----", email: "" },
    { sno: 4, name: <a href="/people/faculty/sushant-kumar" className="hover:underline text-[#0056b3] dark:text-blue-400 font-medium">Dr. Sushant Kumar</a>, designation: "Member", contact: "+91-8292305145", email: "sushant@iiitp.ac.in" },
    { sno: 5, name: <a href="/people/faculty/habila-basumatary" className="text-[#0056b3] dark:text-blue-400 font-medium">Dr. Habila Basumatary</a>, designation: "Member", contact: "+91-8133911040", email: "habila@iiitp.ac.in" },
    { sno: 6, name: <span className="text-[#0056b3] dark:text-blue-400 font-medium">Ms. Rishika Dakhle</span>, designation: "Staff Representative", contact: "+91----", email: "asst2.academics@iiitp.ac.in" },
    { sno: 7, name: <span className="text-[#0056b3] dark:text-blue-400 font-medium">Ms. Rachana Jambhalikar</span>, designation: "Student Representative", contact: "+91-8956654210", email: "rachanajambhalikar36@gmail" },
    { sno: 8, name: <span className="text-[#0056b3] dark:text-blue-400 font-medium">Superintendent<br/> Representative from Establishment Section</span>, designation: "Member-Secretary", contact: "02114-224510, Extn. 115", email: "supdt.estt@iiitp.ac.in" },
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Internal Complaints Committee (ICC)" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-6 md:p-8 space-y-8">
            <h2 className="text-3xl font-bold text-center text-primary dark:text-blue-400 mb-8 uppercase tracking-wide">
              Internal Complaints Committee (ICC)
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
                  {iccData.map((row) => (
                    <tr key={row.sno} className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="p-4 text-center border-r border-gray-200 dark:border-gray-700">{row.sno}</td>
                      <td className="p-4 text-center border-r border-gray-200 dark:border-gray-700">{row.name}</td>
                      <td className="p-4 text-center border-r border-gray-200 dark:border-gray-700">{row.designation}</td>
                      <td className="p-4 text-center text-[#0056b3] dark:text-blue-400 border-r border-gray-200 dark:border-gray-700">{row.contact}</td>
                      <td className="p-4 text-center text-[#0056b3] dark:text-blue-400">{row.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="prose dark:prose-invert max-w-none mt-12">

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Terms of Reference:</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This Committee shall work broadly as per the provisions of Sexual Harassment of Women at Workplace (Prevention, Prohibition &amp; Redressal) Act, 2013, as amended from time to time.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            In recent years, sexual harassment has gained widespread condemnation as a serious human rights violation, a grave form of discrimination, and an invasion of dignity, gender equality, and fundamental human rights. As mandated by the Supreme Court Judgment, IIIT Pune has adopted guidelines &amp; procedures to prevent harassment of women at work. The IIIT Pune is committed to ensuring that its employees and students are free from sexual harassment, intimidation, and exploitation.
          </p>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">About Internal Complaints Committee</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            According to the Prevention of Sexual Harassment at Workplace Act, 2013, an Internal Complaints Committee is a mandatory committee. The purpose of this body is to receive complaints of sexual harassment at work from aggrieved women, investigate such complaints and make recommendations to the employer regarding what action is required in response thereto.
          </p>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">The Role of the Committee:</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-6">
            <li>Conducting an investigation into a sexual harassment complaint.</li>
            <li>The purpose of this is to prevent victims and witnesses from being victimized or discriminated against because of their complaints.</li>
            <li>A proactive approach would be taken in order to sensitize staff, students, and faculty members of IIIT Pune about gender issues.</li>
            <li>In accordance with the Act, to perform any other function.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">What should you do if you are sexually harassed?</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-6">
            <li>Please do not feel ashamed. Tell the harasser very clearly that you find his behavior offensive.</li>
            <li>Do not ignore the harassment in the hope that it will stop on its own. Come forward and complain to the Internal Complaints Committee.</li>
            <li>Talk to somebody you trust about the harassment. It will not only give you strength but also help others in similar situations to come forward and complain.</li>
            <li>Keep a record of all incidents of sexual harassment. If you feel the need to register a formal complaint later, this record will be helpful.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Composition:</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-6">
            <li>Dr. Sonam Maurya, Assistant Professor, Dept. of CSE - Presiding Officer (Chairperson)</li>
            <li>Dr. Anagha Uday Khiste, Assistant Professor, Dept. of CSE - Nodal Officer for SHe-Box Portal</li>
            <li>Prof. Nisha Gupta, Retired Professor, IIT Kharagpur - External Member</li>
            <li>Dr. Sushant Kumar, Associate Dean (R&amp;D &amp; FW) - Member</li>
            <li>Dr. Habila Basumatary, Assistant Professor Grade II - Member</li>
            <li>Ms. Rishika Dakhle, Junior Assistant - Member (Staff Representative)</li>
            <li>Ms. Rachana Jambhalikar, Student Representative - Member (Student Representative)</li>
            <li>Superintendent, Establishment Section - Member-Secretary</li>
          </ul>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Useful Links:</h3>
          <p className="text-blue-600 dark:text-blue-400 hover:underline mb-6">
            <a href="https://acrobat.adobe.com/link/review?uri=urn:aaid:scds:US:3ae44a55-6143-3327-b53c-54e882250644" target="_blank" rel="noopener noreferrer">
              Prevention of Sexual Harassment of Women at Workplace, Act 2013
            </a>
          </p>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013</h3>
          <div className="flex space-x-4 mt-4">
            <a 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors inline-block" 
              href="/documents/Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 in English 1.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View in English
            </a> 
            <a 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors inline-block" 
              href="/documents/Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 in Hindi_0.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View in Hindi
            </a>
          </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ICCPage;
