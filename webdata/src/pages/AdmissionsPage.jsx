import React, { useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { ExternalLink, FileText, ChevronRight } from 'lucide-react';

const AdmissionsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const admissionLinks = [
    {
      title: "B.Tech via JoSAA/CSAB (JEE Main)",
      link: "https://josaa.nic.in/",
      external: true
    },
    {
      title: "M.Tech (CSE & ECE) via CCMT (GATE)",
      link: "https://ccmt.admissions.nic.in/",
      external: true
    },
    {
      title: "PhD Programs - Regular & Part-Time",
      link: null,
      external: false
    },
    {
      title: "International Admissions (DASA)",
      link: "https://dasanit.org/",
      external: true
    }
  ];

  const specialPrograms = [
    {
      title: "PhD and PostDoc Position",
      applicationLink: "https://forms.gle/L52Z3maiurjAEdMi9",
      brochureLink: "/documents/Visvesvaraya_PhD_PostDoc_Brochure_Oct_2026_IIIT_Pune.pdf",
      spotLink: "/documents/Visvesvaraya_PhD_PostDoc_Brochure_Oct_2026_IIIT_Pune.pdf",
      spotTitle: "Full-time PhD/Part-time PhD/PostDoc Position under Visvesvaraya PhD Scheme for Electronics & IT: Phase II (With Scholarship)",
    },
    {
      title: "MTech (Without Scholarship)",
      applicationLink: "/documents/Application form Jul 2026-M.Tech.pdf",
      brochureLink: "/documents/M.Tech. Brochure July-2026.pdf",
      spotLink: "/documents/IIIT_Pune_Spot_New.pdf",
      spotTitle: "SPOT Admission for M.Tech. (Without Scholarship) Programme 2026-27"
    },
    {
      title: "PhD (Institute Scheme)",
      applicationLink: "/documents/Application_Form_PhD_July_2026.pdf",
      brochureLink: "/documents/PhD_Brochure_July_2026.pdf"
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader 
        title="Admissions" 
        subtitle="Join IIIT Pune and embark on a journey of academic excellence and innovation."
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Main Container */}
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8">
            
            {/* Registration Instructions Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold font-serif text-primary dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                Registration Instructions
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Physical Reporting Instructions: DASA (AY 2026-27)",
                    link: "/documents/DASA physical reporting instructions.pdf"
                  },
                  {
                    title: "Physical Reporting Instructions: JoSAA/CSAB 2026",
                    link: "/documents/DETAILS%20OF%20ADMISSION%20PROCESS%20FOR%20FIRST%20SEMESTER%202026-27.pdf"
                  },
                  {
                    title: "Physical Reporting Details of Admission Process for M.Tech through CCMT First Semester (AY 2026-27)",
                    link: "/documents/PHYSICAL_REPORTING_DETAILS_OF_ADMISSION_PROCESS_FOR_MTECH_THROUGH_CCMT_FIRST_SEMESTER_2026-27.pdf"
                  },
                  {
                    title: "Odd Sem Registration Instruction for Btech and Mtech",
                    link: "/documents/Odd Sem Registration Instruction for Btech and Mtech (3).pdf"
                  },
                  {
                    title: "Odd Sem Registration Instruction for PhD 2026-27",
                    link: "/documents/Odd Sem Registration Instruction for PhD 2026-27 (1).pdf"
                  }
                ].map((item, idx) => (
                  <a 
                    key={idx}
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group"
                  >
                    <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </span>
                    <ExternalLink size={18} className="text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Special Programs Section */}
            <div className="space-y-8 mb-10">
              {specialPrograms.map((prog, idx) => (
                <div key={idx} className="flex flex-col gap-4 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-b-0 last:pb-0">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <h3 className="text-2xl font-bold font-serif text-primary dark:text-white">
                      {prog.title}
                    </h3>
                    <div className="flex flex-row flex-wrap gap-4 shrink-0">
                      <a 
                        href={prog.applicationLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-6 rounded-lg transition-colors"
                      >
                        <FileText size={18} />
                        Application
                      </a>
                      <a 
                        href={prog.brochureLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-brand-red hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors"
                      >
                        <FileText size={18} />
                        Brochure
                      </a>
                    </div>
                  </div>
                  {prog.spotLink && (
                    <a
                      href={prog.spotLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 mt-2 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group"
                    >
                      <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                        {prog.spotTitle}
                      </span>
                      <ExternalLink size={18} className="text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors" />
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Programs Offered Section */}
            <div>
              <h2 className="text-2xl font-bold font-serif text-primary dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                Programs Offered
              </h2>
              <div className="space-y-4">
                {admissionLinks.map((item, idx) => (
                  <div key={idx} className="group">
                    {item.link ? (
                      <a 
                        href={item.link} 
                        target={item.external ? "_blank" : "_self"} 
                        rel={item.external ? "noopener noreferrer" : ""}
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                      >
                        <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </span>
                        <ExternalLink size={18} className="text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors" />
                      </a>
                    ) : (
                      <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {item.title}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsPage;
