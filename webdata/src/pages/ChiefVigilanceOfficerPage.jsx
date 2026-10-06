import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import PageHeader from '../components/shared/PageHeader';
import { 
  ShieldCheck, 
  User, 
  Info, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  GraduationCap, 
  FileText,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

const ChiefVigilanceOfficerPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview & Role'},
    { id: 'profile', label: 'CVO Profile'},
    { id: 'angle', label: 'Vigilance Angle'},
    { id: 'guidelines', label: 'CVC Guidelines'},
  ];

  return (
    <div className="min-h-screen bg-slate-200 dark:bg-bg-dark transition-colors duration-200 pb-16">
      <PageHeader 
        title="Chief Vigilance Officer (CVO)" 
        subtitle="Upholding integrity, transparency, and clean administration at IIIT Pune"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-3 mb-3">
              Navigation Menu
            </h3>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary text-white dark:bg-primary dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-primary dark:hover:text-white'
                  }`}
                >
                  
                  {tab.label}
                </button>
              );
            })}
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-6">
            
            {activeTab === 'overview' && (
              <section className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
                <div className="border-b border-gray-150 dark:border-gray-800 pb-4">
                  <h2 className="text-2xl font-bold font-serif text-primary dark:text-white flex items-center gap-3">
                    
                    Overview & Vigilance Administration
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Introduction and statutory duties of the vigilance department at IIIT Pune
                  </p>
                </div>

                <div className="space-y-4 text-gray-650 dark:text-gray-350 text-sm sm:text-base leading-relaxed text-justify">
                  <p>
                    The Chief Vigilance Officers are extended arms of the CVC. The Chief Vigilance Officers are considerably higher level officers who are appointed in each and every Department/Organisation to advice the Head of the Department/Organisation in all vigilance matters.
                  </p>
                  <p>
                    The Chief Vigilance Officer has an important role in effective vigilance administration and functions as an representative of the Commission. While the Commission's jurisdiction is confined to Group 'A' officers and other officials, of and above the level notified, and the Commission's advice is only to the Disciplinary Authority, there is no such restriction on the CVOs role.
                  </p>
                  <p>
                    The CVOs are required to be consulted by the Disciplinary Authority/Appellate Authority, irrespective of the level of officers involved. Wherever the Appellate Authority has disagreed with the Commission's advice, which was accepted by the Disciplinary Authority, the CVOs should scrutinize the matter carefully to take up the matter with the reviewing authority and also report such cases to the Commission. In respect of officials not under the jurisdiction of the Commission, where the Disciplinary Authority has disagreed with the CVO's advice, such cases should be specifically brought to the notice of the Board.
                  </p>
                  <p>
                    While CVOs may be consulted by the management in formulating a policy, to provide for necessary checks and balances as a preventive vigilance measure, they should not get involved in decisions in individual cases like works/procurement, etc, having financial implications.
                  </p>
                </div>
              </section>
            )}

            {activeTab === 'profile' && (
              <section className="space-y-6">
                
                {/* Profile Card */}
                <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    
                    {/* Photo */}
                    <div className="w-48 shrink-0 mx-auto md:mx-0">
                      <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 bg-gray-50">
                        <img 
                          src="/assets/faculty_photos/sanjeevsharma.jpg" 
                          alt="Dr. Sanjeev Sharma" 
                          className="w-full h-auto object-cover block"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/Sample_Photo.jpeg';
                          }}
                        />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="text-left flex-grow space-y-4">
                      <div>
                        <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent-dark text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
                          Chief Vigilance Officer (CVO)
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-primary dark:text-white mt-2 pb-2 border-b border-gray-100 dark:border-gray-800">
                          Dr. Sanjeev Sharma
                        </h2>
                        <p className="text-brand-red dark:text-brand-red-dark font-semibold text-sm mt-1.5">
                          Assistant Professor & Associate Dean (Academics)
                        </p>
                      </div>

                      <div className="space-y-3 pt-2 text-xs sm:text-sm text-gray-750 dark:text-gray-350">
                        <div className="flex items-center gap-3">
                          
                          <span>Department of Computer Science & Engineering</span>
                        </div>
                        <div className="flex items-center gap-3">
                          
                          <span>Office of the CVO, Main Academic Building, IIIT Pune</span>
                        </div>
                        <div className="flex items-center gap-3">
                          
                          <a href="mailto:sanjeevsharma@iiitp.ac.in" className="hover:text-brand-red hover:underline transition-colors font-medium">
                            sanjeevsharma@iiitp.ac.in
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          
                          <a href="tel:02114224504" className="hover:text-brand-red hover:underline transition-colors font-medium">
                            02114-224504
                          </a>
                        </div>
                      </div>

                      <div className="pt-4 flex flex-wrap gap-3">
                        <Link 
                          to="/people/faculty/sanjeev-sharma"
                          className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-xs gap-1.5"
                        >
                          View Faculty Profile
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brief Bio / Message */}
                <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
                  <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-850 pb-2">
                    CVO's Desk
                  </h3>
                  <p className="text-gray-650 dark:text-gray-350 text-sm leading-relaxed text-justify">
                    In addition to leading academic administration as Associate Dean, Dr. Sanjeev Sharma oversees vigilance governance at the institute. The role focuses on fostering ethical decision-making, ensuring compliance with CVC mandates, conducting prompt investigations into concerns, and adopting proactive methods to prevent institutional irregularities.
                  </p>
                </div>
              </section>
            )}

            {activeTab === 'angle' && (
              <section className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
                <div className="border-b border-gray-150 dark:border-gray-800 pb-4">
                  <h2 className="text-2xl font-bold font-serif text-primary dark:text-white flex items-center gap-3">
                    
                    Understanding the Vigilance Angle
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    CVC definition of acts and behaviors that attract vigilance intervention
                  </p>
                </div>

                <div className="space-y-4 text-gray-650 dark:text-gray-350 text-sm sm:text-base leading-relaxed text-justify">
                  <p>
                    Vigilance investigations and advisories are typically initiated when administrative actions involve a <strong>vigilance angle</strong>. As defined by the Central Vigilance Commission (CVC), a vigilance angle is obvious in acts such as:
                  </p>

                  <ul className="list-disc pl-5 space-y-3 bg-red-50/50 dark:bg-red-950/10 p-5 rounded-2xl border border-red-100/50 dark:border-red-900/20 text-gray-700 dark:text-gray-350">
                    <li>
                      Demanding and/or accepting gratification other than legal remuneration in respect of an official act or for using influence with another official.
                    </li>
                    <li>
                      Obtaining a valuable thing, without consideration or with inadequate consideration, from a person with whom the official has or is likely to have official dealings.
                    </li>
                    <li>
                      Obtaining for oneself or for another person any valuable thing or pecuniary advantage by corrupt/illegal means or by abusing position as a public servant.
                    </li>
                    <li>
                      Possession of assets disproportionate to known sources of income.
                    </li>
                    <li>
                      Cases of misappropriation, forgery, cheating, or other similar criminal offences.
                    </li>
                  </ul>

                  <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white mt-6 mb-2">
                    Assessment of Other Irregularities
                  </h3>
                  <p>
                    Beyond direct corruption, other administrative lapses are weighed carefully by the Disciplinary Authority and the CVO to check if an official's integrity is in doubt:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Gross or willful negligence in duty execution.</li>
                    <li>Recklessness in decision-making processes.</li>
                    <li>Blatant violations of established institutional systems and procedures.</li>
                    <li>Exercise of discretion in excess where no ostensible public interest is evident.</li>
                    <li>Failure to keep the controlling authority or superiors informed in time.</li>
                  </ul>
                </div>
              </section>
            )}

            {activeTab === 'guidelines' && (
              <section className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
                <div className="border-b border-gray-150 dark:border-gray-800 pb-4">
                  <h2 className="text-2xl font-bold font-serif text-primary dark:text-white flex items-center gap-3">
                    
                    CVC Guidelines & Resources
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Portals and standard reference materials for vigilance compliance
                  </p>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-650 dark:text-gray-350 text-sm sm:text-base leading-relaxed">
                    Refer to the portals below for central government rules, vigilance manuals, lodging complaints, and public disclosures:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    
                    <a 
                      href="https://www.cvc.gov.in/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-5 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/20 hover:border-accent hover:shadow-xs transition-all group"
                    >
                      <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-accent dark:text-accent-dark shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                        <ExternalLink size={20} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                          CVC India Portal
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                          Official portal of the Central Vigilance Commission of India.
                        </p>
                      </div>
                    </a>

                    <a 
                      href="https://portal.cvc.gov.in/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-5 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/20 hover:border-accent hover:shadow-xs transition-all group"
                    >
                      <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-accent dark:text-accent-dark shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                        <ExternalLink size={20} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                          CVC Online Complaint Portal
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                          Lodge vigilance complaints and track status directly with the Commission.
                        </p>
                      </div>
                    </a>

                    {/* <Link 
                      to="/suo-motu"
                      className="flex items-start gap-4 p-5 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/20 hover:border-accent hover:shadow-xs transition-all group"
                    >
                      <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-accent dark:text-accent-dark shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                        <ArrowRight size={20} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                          Suo Motu Disclosures
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                          Access institutional disclosures and details proactively.
                        </p>
                      </div>
                    </Link>

                    <Link 
                      to="/rti"
                      className="flex items-start gap-4 p-5 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/20 hover:border-accent hover:shadow-xs transition-all group"
                    >
                      <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-accent dark:text-accent-dark shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                        <ArrowRight size={20} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                          RTI Information
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                          Check officers and links regarding Right to Information (RTI) at IIIT Pune.
                        </p>
                      </div>
                    </Link> */}

                  </div>
                </div>
              </section>
            )}

          </main>

        </div>
      </div>
    </div>
  );
};

export default ChiefVigilanceOfficerPage;

