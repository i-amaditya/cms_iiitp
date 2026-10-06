import React, { useState } from 'react';
import { Link } from 'react-router';
import { ExternalLink, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInSection from '../shared/FadeInSection';

const ImportantLinks = () => {
  const [activeTab, setActiveTab] = useState('links');
  const [docFilter, setDocFilter] = useState('all');

  return (
    <section className="py-8 bg-transparent transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection delay={0.1}>
        {/* Full Width Container */}
        <div className="w-full bg-white dark:bg-surface-dark rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col lg:flex-row min-h-[300px]">

          {/* Sidebar Tabs */}
          <div className="lg:w-[25%] bg-primary dark:bg-gray-900 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar border-b lg:border-b-0 lg:border-r border-blue-900/30">
            <button
              onClick={() => setActiveTab('links')}
              className={`flex-shrink-0 text-left px-5 py-3 font-bold font-serif border-b-4 lg:border-b-0 lg:border-l-4 transition-colors whitespace-nowrap text-base ${
                activeTab === 'links'
                  ? 'text-white border-accent bg-blue-800/40 dark:bg-gray-800'
                  : 'text-blue-300 border-transparent hover:text-white hover:bg-blue-800/20 dark:hover:bg-gray-800/50'
              }`}
            >
              <span className="flex items-center gap-3">
                <ExternalLink size={20} className="shrink-0" />
                Important Links
              </span>
            </button>
            <button
              onClick={() => setActiveTab('downloads')}
              className={`flex-shrink-0 text-left px-5 py-3 font-bold font-serif border-b-4 lg:border-b-0 lg:border-l-4 transition-colors whitespace-nowrap text-base ${
                activeTab === 'downloads'
                  ? 'text-white border-accent bg-blue-800/40 dark:bg-gray-800'
                  : 'text-blue-300 border-transparent hover:text-white hover:bg-blue-800/20 dark:hover:bg-gray-800/50'
              }`}
            >
              <span className="flex items-center gap-3">
                <Download size={20} className="shrink-0" />
                Downloads
              </span>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-5 md:p-6 overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'links' && (
                <motion.div
                  key="links"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl md:text-2xl font-bold font-serif text-primary dark:text-white mb-6 pb-4 border-b border-gray-400 dark:border-gray-700 flex items-center">
                    <ExternalLink className="mr-3 text-accent dark:text-accent-dark" size={24} />
                    Important Links
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                    {[
                      { name: 'Ministry of Education', url: 'https://www.education.gov.in/' },
                      { name: 'National Informatics Centre (NIC)', url: 'https://www.nic.gov.in/' },
                      { name: 'National Testing Agency (NTA)', url: 'https://nta.ac.in/' },
                      { name: 'JoSAA', url: 'https://josaa.nic.in/' },
                      { name: 'CSAB', url: 'https://csab.nic.in/' },
                      { name: 'AICTE', url: 'https://www.aicte.gov.in/' },
                      { name: 'Scholarships', url: '/scholarships' },
                      { name: 'Swayam Portal', url: 'https://swayam.gov.in/' },
                      { name: 'National Digital Library', url: 'https://www.ndl.gov.in/' },
                    ].map((link, idx) => {
                      const isInternal = link.url.startsWith('/');
                      return isInternal ? (
                        <Link
                          key={idx}
                          to={link.url}
                          className="flex items-center text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent-dark group font-medium border-b border-gray-100 dark:border-gray-800/50 pb-2 transition-colors text-sm"
                        >
                          <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                            <ExternalLink size={16} />
                          </div>
                          {link.name}
                          <ExternalLink size={14} className="ml-auto opacity-0 group-hover:opacity-70 transition-opacity shrink-0" />
                        </Link>
                      ) : (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent-dark group font-medium border-b border-gray-100 dark:border-gray-800/50 pb-2 transition-colors text-sm"
                        >
                          <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                            <ExternalLink size={16} />
                          </div>
                          {link.name}
                          <ExternalLink size={14} className="ml-auto opacity-0 group-hover:opacity-70 transition-opacity shrink-0" />
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === 'downloads' && (
                <motion.div
                  key="downloads"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-gray-400 dark:border-gray-700 gap-4">
                    <h3 className="text-xl md:text-2xl font-bold font-serif text-primary dark:text-white flex items-center mb-0 pb-0 border-0">
                      <Download className="mr-3 text-accent dark:text-accent-dark" size={24} />
                      Forms &amp; Documents
                    </h3>
                    
                    {/* Pill Toggle */}
                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-full w-fit shrink-0">
                      <button
                        onClick={() => setDocFilter('all')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                          docFilter === 'all' 
                            ? 'bg-brand-red text-white shadow-sm' 
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setDocFilter('student')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                          docFilter === 'student' 
                            ? 'bg-brand-red text-white shadow-sm' 
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        Students
                      </button>
                      <button
                        onClick={() => setDocFilter('faculty')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                          docFilter === 'faculty' 
                            ? 'bg-brand-red text-white shadow-sm' 
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        Faculty
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                    {[
                      { name: 'Hostel Application Form 2026', path: '/downloads/Hostel-application-form-2026.pdf', category: 'student' },
                      { name: 'Official Vehicle Requisition Form', path: 'https://forms.gle/wFvWWn17hoH9Eyaw7', category: 'faculty' },
                      { name: 'Medical Reimbursement Claim Form', path: '/downloads/Medical reimbursement CLAIM FORM.pdf', category: 'faculty' },
                      { name: 'M.Tech. CCMT Physical Reporting Details (AY 2026-27)', path: '/documents/PHYSICAL_REPORTING_DETAILS_OF_ADMISSION_PROCESS_FOR_MTECH_THROUGH_CCMT_FIRST_SEMESTER_2026-27.pdf', category: 'student' },
                      { name: 'Children Education Allowance Form', path: '/downloads/cea-form-iiitp.pdf', category: 'faculty' },
                      { name: 'No Dues Form and Caution Money Return Form', path: '/downloads/NO DUES FORM and Caution Money Return Form.pdf', category: 'student' },
                      { name: 'Admission Cancellation / Withdrawal Form', path: '/downloads/ADMISSION CANCEL FORM.pdf', category: 'student' },
                      { name: 'Library Membership Form (Employees)', path: '/downloads/IIITP_Library-Membership_Form_for-All Employees.pdf', category: 'faculty' },
                      { name: 'Library Membership Form (Students & RS)', path: '/downloads/IIITP_Library-Membership_Form_for-Students&RS.pdf', category: 'student' },
                      { name: 'Travelling Allowance / Adjustment for Tour', path: '/downloads/TRAVELLING ALLOWANCEADJUSTMENT FOR TOUR.pdf', category: 'faculty' },
                      { name: 'Form for Dispatch of Official Letters', path: '/downloads/FORM FOR DISPATCH OF OFFICIAL LETTER ETC BY SPEED POST.pdf', category: 'faculty' },
                      { name: 'Official Memento Approval Form', path: '/downloads/OFFICIAL MEMENTO ISSUANCE FORM.pdf', category: 'faculty' },
                      { name: 'Vehicle Requisition Form', path: '/downloads/IIITP_Vehicle_form (1)_0.pdf', category: 'faculty' },
                      { name: 'Petty Contingency Form', path: '/downloads/PETTY CONTINGENT VOUCHER.pdf', category: 'faculty' },
                      { name: 'Honorarium Form', path: '/downloads/PRE-RECEIPT HONORARIUM FORM.pdf', category: 'faculty' },
                      { name: 'NOC Office Memorandum', path: '/downloads/NOC_office_Memorandum.pdf', category: 'faculty' },
                      { name: 'Odd Semester Ph.D. Registration (AY 2025-26)', path: '/downloads/Odd Sem Registration Instruction for PhD.pdf', category: 'student' },
                      { name: 'Policy for Attending Conferences / Workshops', path: '/downloads/Policy for attending at conferences, workshops, seminars, training programs, etc. - regarding_compressed (1).pdf', category: 'both' },
                      { name: 'Imprest Money OM (IIITP)', path: '/downloads/imprest money OM (IIITP)_compressed.pdf', category: 'faculty' },
                      { name: 'Proposal for Sanction of Tour Form', path: '/downloads/Proposal for Sanction of Tour Form Regarding.pdf', category: 'faculty' },
                      { name: 'Travelling Allowance (Students)', path: '/downloads/Travelling Allowance for the student of the Institute.pdf', category: 'student' },
                      { name: 'Academic Progress PHD Format', path: '/downloads/ACADEMIC PROGRESS PHD Format.pdf', category: 'student' },
                      { name: 'Leave Application for Outsourced Staff', path: '/downloads/Leave Application for Outsource Employees.pdf', category: 'faculty' },
                      { name: 'Joining Report', path: '/downloads/Joining Report.pdf', category: 'faculty' },
                      { name: 'Leave Application (ALL)', path: '/downloads/Leave Applications All.pdf', category: 'both' },
                      { name: 'Registration / Re-registration Form (BTech/MTech/PhD)', path: '/downloads/Registration & Re-registration Form for BTech MTech & PhD.pdf', category: 'student' },
                      { name: 'Vehicle Requisition Form (VEHICLE)', path: '/downloads/VEHICLE REQUISITION FORM.pdf', category: 'faculty' },
                      { name: 'No Dues Certificate (B.Tech & M.Tech)', path: '/downloads/No dues BTech and MTech.pdf', category: 'student' },
                      { name: 'Certificate for Dispatch by Speed Post', path: '/downloads/CERITIFICATE FOR DISPATCH BY SPEED POST.pdf', category: 'both' },
                      { name: 'Certificate Course Brochure', path: '/downloads/Brochure_Batch-II.pdf', category: 'student' },
                      { name: 'Sexual Harassment of Women at Workplace Act 2013', path: '/downloads/A2013-14.pdf', category: 'both' },
                      { name: 'SBI Education Loan Contact Details', path: '/downloads/SBI Education Loan Check List and Contact Details_0.pdf', category: 'student' },
                      { name: 'Indent Form for Consumable Items', path: '/downloads/Indent for stationery consumable items.pdf', category: 'faculty' },
                      { name: 'Internet Credentials Form', path: '/downloads/Internet Login Form.pdf', category: 'faculty' },
                      { name : 'Leave Form for Project Staff', path: '/downloads/Leave Form for Project Staff.pdf', category: 'project staff' },
                      { name: 'No Dues Certificate (For Faculty/Staff)', path: '/downloads/No_Dues_Certificate_Bilingual.pdf', category: 'faculty' },
                    ]
                    .filter(doc => docFilter === 'all' || doc.category === docFilter || doc.category === 'both')
                    .map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all group"
                      >
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center pr-3">
                          <span className="w-8 h-8 rounded bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mr-3 font-bold text-[10px] uppercase shrink-0">
                            PDF
                          </span>
                          <span className="line-clamp-1">{doc.name}</span>
                        </span>
                        <a
                          href={doc.path}
                          target="_blank" rel="noopener noreferrer"
                          
                          className="text-gray-400 hover:text-accent dark:text-gray-500 dark:hover:text-accent-dark p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm group-hover:bg-blue-50 dark:group-hover:bg-gray-700 transition-colors shrink-0"
                        >
                          <Download size={18} />
                        </a>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default ImportantLinks;
