import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const EventsPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Events" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-6 md:p-10 text-gray-700 dark:text-gray-300 space-y-10 leading-relaxed text-justify">
            
            {/* Event 1 */}
            <div>
              <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">Faculty Development Programme (FDP) on the Internet of Things (IoT)</h3>
              <p>
                A Faculty Development Programme on the Internet of Things (IoT) was conducted from 5th to 9th October, 2020. It was inaugurated along with 41 other FDPs. The chief guest of the program was Honorable Manoj Ahuja, Chairman CBSE. This programme was also graced by Prof. Anil D. Sahasrabudhe, Chairman AICTE, Prof. Anupam Shukla, Director, IIIT Pune, Prof. M.P. Poonia, Vice-chairman AICTE, and Prof. Rajive Kumar, Member Secretary AICTE, Dr. Ravindra Kumar Soni, Director Atal Academies and other heads of various institutes and universities.
              </p>
            </div>

            {/* Event 2 */}
            <div>
              <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">ATAL Sponsored FDP on Cyber-Physical Systems</h3>
              <p>
                A Five-Days AICTE Training and learning (ATAL) Academy sponsored Faculty Development Programme (FDP) on Cyber-Physical Systems was organized from 7th to 11th November, 2020 in which 127 participants, including faculties, PG students and Research Scholars from different AICTE approved institutions, and members from industry had participated. Dr. Ranjith Ravindranathan Nair, Assistant Professor, IIIT, Pune coordinated the programme.
              </p>
            </div>

            {/* Event 3 */}
            <div>
              <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">FDP on Artificial Intelligence and its Modern Applications</h3>
              <p>
                Fifteen days Faculty Development Programme (FDP) on Artificial Intelligence and its Modern Applications was organized by Chhattisgarh Swami Vivekanand Technical University, Bhilai in association with IIIT Pune under the third phase of Technical Education Quality Improvement Programme (TEQIP-III) during 20th November – 4th December, 2020 through online mode. The primary objective of this fifteen-day faculty Development Programme (FDP) was to enrich faculty members of Computer Science stream with preliminaries of artificial intelligence and its modern applications in machine learning and deep learning.
              </p>
            </div>

            {/* Event 4 */}
            <div>
              <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">National Policy on Education 2020: One Day National Workshop on Technical Education and Indian Languages</h3>
              <p className="mb-4">
                A one-day National Workshop on National Education Policy 2020: Technical Education and Indian Languages was organized jointly by Shiksha Sanskriti Utthan Nyas, New Delhi and IIIT, Pune on 20th February 2021.
              </p>
              <p>
                In this workshop, various aspects on the topic “National Education Policy 2020: Technical Education and Indian Languages” were discussed to enrich the current situation, implementation of education policy, challenges faced in it and efforts made to find the solutions.
              </p>
            </div>

            {/* Event 5 */}
            <div>
              <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">ATAL Sponsored FDP on Cyber Security</h3>
              <p>
                A Five days AICTE sponsored Workshop on Cyber Security was conducted by AICTE in collaboration with IIIT, Pune from 22nd Feb to 26th Feb 2021. 138 participants across India participated online in the programme. Workshop provided plenty of learnings and experiences to the participants. Dr. Bhupendra Singh, Assistant Professor, IIIT Pune was the coordinator of the FDP.
              </p>
            </div>

            {/* Event 6 */}
            <div>
              <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">Aatmanirbhar Bharat and National Startup policy</h3>
              <p className="mb-4">
                The institute took various initiatives for Atmanirbhar Bharat and National Startup policy. Various talks were conducted with focus on “Self-reliant India” for our nation. Under this scheme following talks were delivered:
              </p>
              <ul className="list-disc pl-5 space-y-4">
                <li>Dr. R.N.Patel, Associate Professor, NIT, Raipur delivered a talk on “National Innovation and Startup Policy 2019” on 2nd October, 2020.</li>
                <li>Dr. Pradeep Kumar Mishra, Professor, Department of Chemical Engineering, IIT, BHU delivered a talk on “Atmanirbhar Bharat and Technical Education” on 2nd October, 2020.</li>
                <li>Mr. Rishikesh S.R Co-Founder Rapido at Bangalore, delivered a talk on “Make for Bharat” on 10th October, 2020.</li>
              </ul>
            </div>

            {/* Event 7 */}
            <div>
              <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">I.C.C.I. 2020</h3>
              <p className="mb-4">
                The Conference was intended to bring together the researchers working in the field of computational intelligence and allied areas across the world and to have a dissemination of knowledge on the recent developments in the field of Artificial Intelligence, Nature-Inspired Algorithms, Machine Learning, Deep Learning, Computer Vision and many other areas through the exchange of research evidence, personal scientific views, and innovative ideas.
              </p>
              <p className="mb-4">There were four technical tracks for paper presentations:</p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>Artificial Intelligence and Machine Learning</li>
                <li>Image Processing and Computer Vision</li>
                <li>IoT, Wireless sensor network and vehicular technology</li>
                <li>Soft Computing</li>
              </ul>
              
              <p className="mb-4">World-renowned researchers delivered the keynote address:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Dr. Marc A. Zissman from MIT, USA</li>
                <li>Prof. B Yegnanarayana from IIIT, Hyderabad, India</li>
                <li>Prof. Sunil K. Agrawal from Columbia University, USA</li>
                <li>Prof. Sanguthevar Rajasekaran from the University of Connecticut, USA</li>
                <li>Prof. Prof L.M. Patnaik from IISc, Bangalore, India</li>
              </ul>
            </div>
            
            <div className="mt-12 text-right text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-4">
              Last Updated: 20-04-2022
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
