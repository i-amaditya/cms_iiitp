import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const InternshipsPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Internship @IIIT Pune" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          
          <div className="p-6 md:p-10 text-gray-700 dark:text-gray-300 space-y-8 leading-relaxed">
            
            {/* Intro text */}
            <div className="space-y-4">
              <p>The Internship Program at IIIT Pune aims to bring together students from prominent institutions across the country. The program enables both internal and external students to participate in research and development projects under the mentorship of IIIT Pune faculty, fostering academic collaboration and professional growth.</p>
              <p>The internship offers hands-on exposure in diverse domains, including Robotics, Artificial Intelligence, Machine Learning, Data Science, Cyber Security, Digital Forensics, Internet of Things, Wireless Communication, 5G, Human–Computer Interaction, Mathematics, Applied Mathematics, Optimization, and related interdisciplinary areas.</p>
            </div>

            {/* Eligibility */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Eligibility</h3>
              <p>Students who have completed or are pursuing B.Sc., B.E./B.Tech, M.Sc., M.E./M. Tech, or Research Scholars from Computer Science and Engineering, Electronics and Communication Engineering, Mathematics, Statistics, Data Science, or related departments are eligible to apply.</p>
            </div>

            {/* Application Process */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Application Process</h3>
              <p>Interested candidates must fill out the registration form using the link provided below:</p>
              <a href="https://forms.gle/pAtj5PoVyHNfkXD18" target="_blank" rel="noopener noreferrer"  className="text-brand-red dark:text-blue-400 hover:underline break-all mt-2 inline-block">
                https://forms.gle/pAtj5PoVyHNfkXD18
              </a>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Requirements</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">➭</span>
                  <span>The internship through the online/Offline platform will be under the mentorship of a faculty member from IIIT Pune.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">➭</span>
                  <span>For external candidates, a No Objection Certificate (NOC) is required from the parent institute as per the format in APPENDIX-I.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">➭</span>
                  <span>Applicants are requested to contact the individual faculties of the respective departments. Faculty details are available <a href="/people/faculty" className="text-brand-red dark:text-blue-400 hover:underline">here</a>. After obtaining consent, students may apply for the internship.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">➭</span>
                  <span>A letter of consent from the host faculty should be submitted along with the application form.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">➭</span>
                  <span>Applicants are required to submit a report to the respective faculty/department after completion.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">➭</span>
                  <span>Upon successful completion of the internship, students will receive a certificate.</span>
                </li>
              </ul>
            </div>

            {/* In-Campus Internship & Table */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">In-Campus Internship</h3>
              <p className="mb-4">Students are required to be physically present on the institute's premises and carry out the assigned project work under the direct supervision of an expert faculty member. Hostel accommodation may be provided subject to availability.</p>
              
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Hostel Charges (Per Month)</h4>
              <div className="overflow-x-auto">
                <table className="w-full max-w-lg border-collapse border border-gray-300 dark:border-gray-700 text-sm">
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 p-3">Hostel Fee<br/><span className="text-xs text-gray-500 dark:text-gray-400">(including water and electricity)</span></td>
                      <td className="border border-gray-300 dark:border-gray-700 p-3 text-right">₹6,000</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 p-3">GST @ 18%</td>
                      <td className="border border-gray-300 dark:border-gray-700 p-3 text-right">₹1,080</td>
                    </tr>
                    <tr className="font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800">
                      <td className="border border-gray-300 dark:border-gray-700 p-3">Total Payable Amount</td>
                      <td className="border border-gray-300 dark:border-gray-700 p-3 text-right">₹7,080</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Online Internship */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Online Internship</h3>
              <p>Students are not required to be physically present on the institute's premises. All assigned tasks and project work will be carried out in online mode under the supervision of the concerned faculty member.</p>
            </div>

            {/* Selection Process */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Selection Process</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">➭</span>
                  <span>The respective faculty member will carry out the selection of students. The faculty may conduct a telephonic or web-based interview. Final selection rests solely with the faculty.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">➭</span>
                  <span>Students may apply only after obtaining prior consent from the respective supervisor.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">➭</span>
                  <span>Registration is mandatory for all students, irrespective of internship mode.</span>
                </li>
              </ul>
            </div>

            {/* Duration of Internship */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Duration of Internship</h3>
              <p>The internship duration shall be either <span className="font-bold text-gray-900 dark:text-white">2 months</span> or <span className="font-bold text-gray-900 dark:text-white">6 months</span>, depending on the student’s request and supervisor approval. The registration fee remains the same for both durations.</p>
            </div>

            {/* Internship Fees */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Internship Fees</h3>
              <p className="mb-3">The internship registration fee is ₹5,000 per student per semester. This fee does not apply to students of IIIT Pune.</p>
              <p className="mb-1">Payment Link:</p>
              <a href="https://payments.billdesk.com/bdcollect/bd/indianinstituteofinformationtechnologypuneii/16417" target="_blank" rel="noopener noreferrer"  className="text-brand-red dark:text-blue-400 hover:underline break-all mb-4 inline-block">
                https://payments.billdesk.com/bdcollect/bd/indianinstituteofinformationtechnologypuneii/16417
              </a>
              <p>Applicants are advised to email a copy of the application form and payment receipt to <a href="mailto:summerinternship@iiitp.ac.in" className="text-brand-red dark:text-blue-400 hover:underline">summerinternship@iiitp.ac.in</a>.</p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Contact</h3>
              <div className="text-primary dark:text-gray-300 font-medium space-y-1">
                <p className="text-brand-red font-semibold">Dr. K. M. Divya Chaturvedi</p>
                <p>Assistant Professor</p>
                <p>Department of Electronics and Communication Engineering</p>
                <p>Email: <a href="mailto:divya@iiitp.ac.in" className="text-brand-red dark:text-blue-400 hover:underline">divya@iiitp.ac.in</a></p>
              </div>
            </div>

            {/* Document Link */}
            <div className="pt-4 pb-2">
              <p className="font-medium text-gray-900 dark:text-white mb-4">
                For more information about the Internship Opportunity at IIIT, Pune, please click below 👇
              </p>
              <a 
                href="/documents/Internship at IIIT Pune_0.pdf" 
                target="_blank" rel="noopener noreferrer" 
                
                className="inline-block bg-[#0052cc] text-white px-6 py-2 rounded-md font-bold hover:bg-blue-800 transition-colors shadow-sm"
              >
                Document(PDF)
              </a>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 text-right text-sm text-gray-500 dark:text-gray-400">
              Last Updated: 25-04-2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipsPage;
