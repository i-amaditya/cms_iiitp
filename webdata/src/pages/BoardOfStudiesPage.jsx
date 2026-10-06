import React from 'react';
import { useSearchParams } from 'react-router';
import PageHeader from '../components/shared/PageHeader';
import CommitteeTable from '../components/shared/CommitteeTable';
import { motion, AnimatePresence } from 'framer-motion';

const BoardOfStudiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeDept = searchParams.get('dept') || 'cse';

  const depts = [
    { id: 'cse', name: 'Computer Science & Engineering', shortName: 'CSE', tag: 'CSE Department' },
    { id: 'ece', name: 'Electronics & Communication Engineering', shortName: 'ECE', tag: 'ECE Department' },
    { id: 'ash', name: 'Applied Sciences & Humanities', shortName: 'AS&H', tag: 'AS&H Department' }
  ];

  const currentDept = depts.find(d => d.id === activeDept) ? activeDept : 'cse';

  const cseData = [
    { srNo: 1, name: "Dr. Bhupendra Singh", affiliation: "HoD CSE, IIIT Pune", designation: "Chairperson" },
    { srNo: 2, name: "Dr Kumar Rajamani", affiliation: "Associate Director, Cropin Technology", designation: "Expert Member" },
    { srNo: 4, name: "Prof. Somitra Kumar Sanadhya", affiliation: "IIT Kanpur", designation: "Expert Member" },
    { srNo: 5, name: "Dr. Sushant Kumar", affiliation: "HoD ECE, IIIT Pune", designation: "Special Invitee" },
    { srNo: 6, name: "Dr. Jatin Majithia", affiliation: "HoD AS&H, IIIT Pune", designation: "Special Invitee" },
    { srNo: 7, name: "Dr. Sanjeev Sharma", affiliation: "Assistant professor, IIIT Pune", designation: "Member" },
    { srNo: 8, name: "Dr. Mahendra Pratap Yadav", affiliation: "Assistant professor, IIIT Pune", designation: "Member" },
    { srNo: 9, name: "Dr. Shrikant Salve", affiliation: "Assistant professor, IIIT Pune", designation: "Member" },
    { srNo: 10, name: "Dr. Sonam Maurya", affiliation: "Assistant professor, IIIT Pune", designation: "Member" },
    { srNo: 11, name: "Dr. Meenakshi Choudhary", affiliation: "Assistant professor, IIIT Pune", designation: "Member" },
    { srNo: 12, name: "Dr. Priyank Jain", affiliation: "Assistant professor, IIIT Pune", designation: "Member" },
    { srNo: 13, name: "Dr. Sumit Kumar Gupta", affiliation: "Assistant Professor, IIIT Pune", designation: "Member" },
    { srNo: 14, name: "Dr. Kaptan Singh", affiliation: "Assistant Professor, IIIT Pune", designation: "Member" },
    { srNo: 15, name: "Dr. Shivangi Shukla", affiliation: "Assistant Professor, IIIT Pune", designation: "Member" },
    { srNo: 16, name: "Dr. Habila Basumatary", affiliation: "Assistant Professor, IIIT Pune", designation: "Member" },
    { srNo: 17, name: "Dr. Sanga Chaki", affiliation: "Assistant Professor, IIIT Pune", designation: "Member" },
    { srNo: 18, name: "Dr. Mahesh Joshi", affiliation: "Assistant Professor, IIIT Pune", designation: "Member" },
  ];

  const eceData = [
    { srNo: 1, name: "Dr. Nagendra Kushwaha", affiliation: "HoD ECE, IIIT Pune", designation: "Chairperson" },
    { srNo: 2, name: "Dr. Sushant Kumar", affiliation: "Assistant Professor, IIIT Pune", designation: "Member" },
    { srNo: 3, name: "Dr. Shubham Shukla", affiliation: "Assistant Professor, IIIT Pune", designation: "Member" },
    { srNo: 4, name: "Dr. Dheeraj Dubey", affiliation: "Assistant Professor, IIIT Pune", designation: "Member" },
    { srNo: 5, name: "Dr. Dipen Bepari", affiliation: "Assistant Professor, IIIT Pune", designation: "Member" },
    { srNo: 6, name: "Dr. KM Divya Chaturvedi", affiliation: "Assistant Professor, IIIT Pune", designation: "Member" },
    { srNo: 7, name: "Dr. Sanjeev Sharma", affiliation: "Assistant Professor, IIIT Pune", designation: "Special Invitee" },
    { srNo: 8, name: "Dr. Jatin Majithia", affiliation: "Assistant Professor, IIIT Pune", designation: "Special Invitee" },
    { srNo: 9, name: "Dr. Bhupendra Singh", affiliation: "HoD CSE, IIIT Pune", designation: "Special Invitee" },
    { srNo: 10, name: "Prof. Vikram M. Gadre", affiliation: "Prof IIT Bombay", designation: "Expert Member" },
    { srNo: 11, name: "Dr. Satyam Shukla", affiliation: "Tech. Leader at STMicroelectronics", designation: "Expert Member" },
    { srNo: 12, name: "Libin T T", affiliation: "Associate Director / Scientist 'F' at C-DAC", designation: "Expert Member" },
  ];

  const ashData = [
    { srNo: 1, name: "Dr. Jatin Majithia", affiliation: "Assistant Professor and HoD AS&H, IIIT Pune", designation: "Chairperson" },
    { srNo: 2, name: "Dr. Shripad Garge", affiliation: "Assistant professor, IIT Bombay", designation: "External Expert (Mathematics)" },
    { srNo: 3, name: "Dr. Chandrasheel Bhagwat", affiliation: "Associate Professor, IISER", designation: "External Expert (Mathematics)" },
    { srNo: 4, name: "Dr. Ashish Pande", affiliation: "Professor, IIT Bombay", designation: "External Expert (Humanities and Social Sciences)" },
    { srNo: 5, name: "Dr. Anindita Roy", affiliation: "Associate Professor, SIT Pune", designation: "External Expert (Humanities and Social Sciences)" },
    { srNo: 6, name: "Dr. Anagha Khiste", affiliation: "Assistant professor AS&H, IIIT Pune", designation: "Member" },
    { srNo: 7, name: "Dr Chandrakant Guled", affiliation: "Assistant Professor, AS&H, IIIT Pune", designation: "Member" },
    { srNo: 8, name: "Associate Dean", affiliation: "(Academics), IIIT Pune", designation: "Special Invitee" },
    { srNo: 9, name: "Associate Dean", affiliation: "(Research and Development)", designation: "Special Invitee" },
    { srNo: 10, name: "Head, Computer Science and Engineering Dept", affiliation: "IIIT Pune", designation: "Special Invitee" },
    { srNo: 11, name: "Head, Electronics and Communication Engineering Dept", affiliation: "IIIT Pune", designation: "Special Invitee" },
  ];

  const getDeptContent = () => {
    switch (currentDept) {
      case 'cse':
        return {
          title: "Board of Studies (Computer Science & Engineering)",
          data: cseData,
          hasDoc: true,
          docPath: null,
          lastUpdated: "25-04-2026"
        };
      case 'ece':
        return {
          title: "Board of Studies (Electronics & Communication Engineering)",
          data: eceData,
          hasDoc: true,
          docPath: "/documents/BoS_ECE_IIITP_v1.pdf",
          lastUpdated: "25-04-2026"
        };
      case 'ash':
        return {
          title: "Board of Studies (Applied Sciences & Humanities)",
          data: ashData,
          hasDoc: false,
          docPath: null,
          lastUpdated: null
        };
      default:
        return null;
    }
  };

  const activeContent = getDeptContent();

  const handleSelect = (id) => {
    setSearchParams({ dept: id });
  };

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Board of Studies" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Sidebar Selection Directory */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm lg:sticky lg:top-44 self-start w-full space-y-4">
              <h3 className="text-gray-800 dark:text-white font-bold font-serif px-2 pb-2 border-b border-gray-200 dark:border-gray-800 text-sm">
                Departments
              </h3>
              <div className="flex flex-row overflow-x-auto gap-2 no-scrollbar lg:flex-col pb-1 lg:pb-0">
                {depts.map((d) => {
                  const isSelected = currentDept === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => handleSelect(d.id)}
                      className={`shrink-0 lg:shrink lg:w-full flex flex-row lg:flex-col items-center lg:items-start gap-2 lg:gap-0 px-4 py-2 lg:px-3.5 lg:py-2.5 rounded-full lg:rounded-xl text-left transition-all duration-200 border ${
                        isSelected
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "text-gray-700 dark:text-gray-300 bg-transparent border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? "bg-white" : "bg-primary"}`} />
                        <span className="font-bold text-xs lg:text-sm">{d.shortName}</span>
                      </div>
                      <span className={`hidden lg:block text-[10px] mt-0.5 ${isSelected ? "text-white/80" : "text-gray-400 dark:text-gray-500"}`}>
                        {d.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Main Content area */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeContent && (
                <motion.div
                  key={currentDept}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-primary dark:text-white border-b border-gray-150 dark:border-gray-800 pb-3 mb-6">
                      {activeContent.title}
                    </h2>
                    <CommitteeTable data={activeContent.data} />
                  </div>

                  {activeContent.hasDoc && (
                    <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                      <p className="font-bold text-gray-900 dark:text-white mb-3">
                        View the official Memorandum
                      </p>
                      {activeContent.docPath ? (
                        <a 
                          href={activeContent.docPath}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-block bg-primary text-white px-6 py-2.5 rounded-sm shadow-sm hover:bg-primary/90 transition-colors font-medium text-sm"
                        >
                          View Document
                        </a>
                      ) : (
                        <button 
                          disabled
                          title="Document not available yet"
                          className="inline-block bg-gray-400 dark:bg-gray-700 text-white dark:text-gray-300 px-6 py-2.5 rounded-sm shadow-sm cursor-not-allowed font-medium text-sm"
                        >
                          View Document
                        </button>
                      )}
                    </div>
                  )}

                  {activeContent.lastUpdated && (
                    <div className="text-right text-gray-600 dark:text-gray-400 text-sm italic">
                      Last Updated: {activeContent.lastUpdated}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BoardOfStudiesPage;
