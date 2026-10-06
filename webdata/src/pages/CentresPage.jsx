import React, { useState } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AccordionItem = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-0 mb-4">
      <button
        className={`w-full flex justify-between items-center px-6 py-4 text-left transition-colors ${
          isOpen ? 'bg-gray-100 dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800'
        } rounded-t-lg ${!isOpen && 'rounded-b-lg'}`}
        onClick={onClick}
      >
        <span className="text-lg font-semibold text-primary dark:text-white">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-white dark:bg-surface-dark border border-t-0 border-gray-100 dark:border-gray-800 rounded-b-lg text-gray-700 dark:text-gray-300 space-y-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CentresPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Centres" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-6 md:p-8">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          Indian Institute of Information Technology Pune (IIITP) is actively involved in multidisciplinary areas of research and promotes engagement with Industries. The institute has taken initiative in providing a platform for start-ups, coordinate with higher learning Institutes in India and abroad, procuring industry standard tools and equipment for carrying out research. It also involves young minds of graduate/post-graduate/doctoral students to actively participate in all these activities.
        </p>
        
        <h3 className="text-xl font-bold text-primary dark:text-white mb-4">Centres</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          Established in the year 2016, Indian Institute of Information Technology Pune made a mission to foster the development of research in the diverse area of information and communication technology, to develop human resources with competitive advantages required for meeting the future challenges. Four different research centres are created in the institute, which are as follows:
        </p>

        <div className="space-y-4">
          <AccordionItem
            title="1. Centre for Robotics and Security in Internet of Things (IoT)"
            isOpen={openIndex === 0}
            onClick={() => toggleAccordion(0)}
          >
            <p>
              The vision of the Centre is to provide leadership in establishing a regional presence in the area of Robotics, Internet of Things (IoT) and Cyber security of IoT by fostering state-of-the-art research, and to provide training of manpower in order to improve the posture of information assurance awareness locally, regionally and nationally.
            </p>

            <div>
              <h4 className="text-lg font-bold text-primary dark:text-white mb-2">(a) Mission</h4>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>To conduct basic and applied research in the area of Robotics, Internet of Things and Cyber security of IoT</li>
                <li>To train professionals in India through public education programs</li>
                <li>To collaborate with industry, government, and academia on both the theory and practical implementation of Robotics, Internet of Things and cyber-physical security of IoT</li>
                <li>To provide community outreach programs</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-primary dark:text-white mb-2">(b) Broad Objective</h4>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>To foster cutting-edge research in the area of Robotics, Internet of Things and Cyber security of IoT</li>
                <li>To train manpower and contribute to capacity building.</li>
                <li>To provide leadership to form strategic partnerships with external organizations including the government and private sector in a long-term program of community outreach.</li>
                <li>To develop content and offer Short-Term Courses for industry, government and academia.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-primary dark:text-white mb-2">(c) Important Activities of the Research Centre</h4>
              <p className="mb-2">Research in the area of Robotics, Internet of Things and Cyber Security of IoT are carried out under two divisions:</p>
              <ul className="list-disc list-inside space-y-2 ml-2 mb-4">
                <li>Manpower Development and Capacity Building</li>
                <li>Collaboration and MOUs with other institutes</li>
              </ul>
              
              <h5 className="font-bold text-primary dark:text-gray-200 mt-4 mb-2">People</h5>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Dr. Ritu Tiwari</li>
                <li>Prof. L. D. Behera, Electrical Engineering Department, IIT Kanpur</li>
                <li>Dr. Nagendra Kushwaha</li>
                <li>Dr. Sanjeev Sharma</li>
                <li>Dr. Tanmoy Hazra</li>
                <li>Dr. Ranjith Nair (Convener)</li>
              </ol>
            </div>
          </AccordionItem>

          <AccordionItem
            title="2. Centre for VLSI and Nanotechnology"
            isOpen={openIndex === 1}
            onClick={() => toggleAccordion(1)}
          >
            <p>
              To learn and excel in various aspects of VLSI, developing low power high performance analog, digital, mixed signal and RF chips and Nanotechnology. To establish research links with academia and industry both in India and abroad, and to organize national programmes for training manpower in VLSI and Nanotechnology.
            </p>
            <p>
              The Centre is equipped with industry standard VLSI EDA tools such as Cadence and Vivado, basic hardware resources from Xilinx for testing. The Centre will further be expanded with Silicon Signoff and Verification. It will house twenty desktop PCs with a dedicated server. Foundry Design Kits from the top foundries of the world such as TSMC, UMC, and SCL shall be used for designing all the standard cells and ASICs.
            </p>

            <div>
              <h4 className="text-lg font-bold text-primary dark:text-white mb-2">(a) Mission</h4>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>To carry out research in VLSI and Nanotechnology in collaboration with research organizations and industries</li>
                <li>Establish high grade front-end back-end design, verification and implementation methods.</li>
                <li>To provide training solutions to generate skilled workforce to corporates.</li>
                <li>Develop design problems and advancing their solutions in VLSI circuits for computing, embedded and application specific systems.</li>
                <li>To initiate interdisciplinary approaches of physical, chemical, and medical sciences with engineering solutions</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-primary dark:text-white mb-2">(b) Facilities</h4>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Facility for teaching and research at both UG and PG level</li>
                <li>EDA tools: Cadence UG Bundle, Vivado Design Suite</li>
                <li>Boards: FPGA development boards, Analog interface device</li>
                <li>Networked computing environment with Linux and Windows</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-primary dark:text-white mb-2">(c) Activities</h4>
              <p className="mb-2">Research in the field of VLSI, mixed signal circuits, RFIC and Nanotechnology are classified into two categories:</p>
              <ul className="list-disc list-inside space-y-2 ml-2 mb-4">
                <li>Manpower Development through workshops, short-term courses, and academic projects</li>
                <li>Collaboration with academia and industry for establishing networked research and design development.</li>
              </ul>
              
              <h5 className="font-bold text-primary dark:text-gray-200 mt-4 mb-2">People</h5>
              <ul className="list-none space-y-1 ml-2">
                <li>• Dr. Sandeep Mishra (Chairperson)</li>
                <li>• Dr. Bhupendra Singh (Convener)</li>
              </ul>
            </div>
          </AccordionItem>

          <AccordionItem
            title="3. Centre for Indian languages and Computational Intelligence"
            isOpen={openIndex === 2}
            onClick={() => toggleAccordion(2)}
          >
            <p>
              The Centre for Indian Languages and Computational Intelligence (CILCI) has a mission to provide ‘Annotated, quality language data (both-text & speech) and tools in Indian Languages to Individuals, Institutions and Industry for Research & Development created in house, through outsourcing and acquisition’. The Centre also exists to develop various systems using Indian languages, to develop fundamental theoretical and practical solutions to real world problems using a variety of computational intelligence paradigms.
            </p>
            <p>
              This centre produces high quality, industrially relevant research into intelligent systems. This provides theoretically sound solutions to real world, decision making and prediction problems.With an established international reputation, its work focuses on the use of fuzzy logic, artificial neural networks, evolutionary computing, mobile robotics and biomedical informatics. CCI offers a number of benefits to the data management, defence, health, logistics, security and video gaming sectors.
            </p>

            <div>
              <h4 className="text-lg font-bold text-primary dark:text-white mb-2">(a) Mission</h4>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Multilingual word nets and ontologies and their linking</li>
                <li>Resolve word and attachment ambiguities.</li>
                <li>Identifying correct parts of speech, named entities and non-recursive noun phrases for Indian language.</li>
                <li>Indian language query to English and Hindi Retrieval</li>
                <li>Automatic translation involving Hindi, English</li>
                <li>Testing if a piece text is inferable from another.</li>
                <li>Detecting polarity-positive/negative/neutral-of a given document, especially reviews</li>
                <li>Study of cognitive aspects of language processing and understanding using eye-tracking</li>
                <li>To be one of the leading national and international sources of expertise on fuzzy logic, data mining and biomedical informatics</li>
                <li>To play a key role in enabling the Institute to develop an international reputation for leading edge computational intelligence research.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-primary dark:text-white mb-2">(b) Activities</h4>
              <p className="mb-2">The Centre has taken several initiatives to promote its activities to the national/international level, some of which are as follows:</p>
              <ul className="list-disc list-inside space-y-2 ml-2 mb-4">
                <li>Conducting Short-term Training Programme on the latest trends of Indian Languages and Computational Intelligence with an aim to share knowledge, research experience with UG/PG students, researchers, scientists and faculty members.</li>
                <li>Conducting Faculty Development Programme on the latest trends of Indian Languages and Computational Intelligence with an aim to share knowledge, research experience for faculty members and industry experts.</li>
                <li>To publish scientific papers of international repute journals and conferences in the area of Indian Languages and Computational Intelligence</li>
                <li>To complete industry and government sponsored project in Indian Languages and Computational Intelligence</li>
                <li>To file patents/technology transfer in Indian Languages and Computational Intelligence</li>
                <li>To develops products for the society/nation in this area</li>
              </ul>
              
              <h5 className="font-bold text-primary dark:text-gray-200 mt-4 mb-2">People</h5>
              <ul className="list-none space-y-1 ml-2">
                <li>• Dr. Ritu Tiwari (Chairperson)</li>
                <li>• Prof. Vrashabh Prasad Jain, Professor and Director, Department of Linguistics and Language Technology, MGAHV, Wardha.</li>
                <li>• Dr. Rahul Dixit</li>
                <li>• Dr. Tanmoy Hazra</li>
                <li>• Dr. Anagha Uday Khiste</li>
                <li>• Dr. Vagisha Mishra</li>
                <li>• Dr. Vaidurya Jain (Convener)</li>
              </ul>
            </div>
          </AccordionItem>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CentresPage;
