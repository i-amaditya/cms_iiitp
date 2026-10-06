import React, { useEffect } from 'react';
import { Link } from 'react-router';
import PageHeader from '../components/shared/PageHeader';
import { Mail, Phone, ExternalLink } from 'lucide-react';

const RTIPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const officers = [
    {
      role: "Public Information Officer (PIO)",
      name: "Dr. Nagendra Kushwaha",
      designation: "Registrar, IIIT Pune",
      email: "registrar@iiitp.ac.in",
      phone: "02114-224502",
      profileSlug: "nagendra-kushwaha"
    },
    {
      role: "First Appellate Authority (FAA)",
      name: "Dr. Jatin Majithia",
      designation: "Assistant Professor (Gr.I), IIIT Pune",
      email: "jatinmajithia@iiitp.ac.in",
      phone: "02114-224510",
      profileSlug: "jatin-majithia"
    }
  ];

  const importantLinks = [
    {
      name: "RTI Act, 2005 (Official Document)",
      url: "/documents/rti_act_2005.pdf",
      isExternal: true
    },
    {
      name: "Suo Moto Disclosure",
      url: "/suo-motu",
      isExternal: false
    },
    {
      name: "Reservation Policy",
      url: "/rti/reservation-policy",
      isExternal: false
    },
    {
      name: "RTI Online Portal",
      url: "https://rtionline.gov.in/",
      isExternal: true
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-200 pb-16 bg-slate-200 dark:bg-bg-dark">
      <PageHeader
        title="Right to Information (RTI)"
        subtitle="Promoting transparency, accountability, and citizen empowerment under the RTI Act, 2005"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs">
          <p className="text-gray-650 dark:text-gray-350 leading-relaxed text-justify text-sm sm:text-base">
            The Right to Information Act, 2005 (RTI) is an Act of the Parliament of India that sets out the practical regime of right to information for citizens to secure access to information under the control of public authorities. This proactive dissemination helps promote transparency and accountability in the working of every public authority, including the Indian Institute of Information Technology, Pune.
          </p>
        </section>

        <section className="space-y-6">
          <div className="border-b border-gray-150 dark:border-gray-800 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 dark:text-white">
              Designated RTI Officers
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Contact officials appointed for processing RTI requests and handling appeals at IIIT Pune
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {officers.map((officer, index) => (
              <div
                key={index}
                className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent-dark text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
                    {officer.role}
                  </span>

                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white font-serif">
                      {officer.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-red font-medium leading-relaxed">
                      {officer.designation}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-850 space-y-2.5 text-xs text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <a href={`mailto:${officer.email}`} className="hover:text-brand-red transition-colors font-medium">
                      {officer.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-medium">{officer.phone}</span>
                  </div>
                  <div className="pt-2">
                    <Link
                      to={`/people/faculty/${officer.profileSlug}`}
                      className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-[11px] font-bold transition-all shadow-xs"
                    >
                      View Profile <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <h3 className="text-xl md:text-2xl font-bold font-serif text-primary dark:text-white mb-6 pb-4 border-b border-gray-400 dark:border-gray-700 flex items-center">
            <ExternalLink className="mr-3 text-accent dark:text-accent-dark" size={24} />
            Important Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {importantLinks.map((link, idx) => {
              const linkContent = (
                <>
                  <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <ExternalLink size={16} />
                  </div>
                  {link.name}
                  <ExternalLink size={14} className="ml-auto opacity-0 group-hover:opacity-70 transition-opacity shrink-0" />
                </>
              );

              const className = "flex items-center text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent-dark group font-medium border-b border-gray-100 dark:border-gray-800/50 pb-2 transition-colors text-sm";

              return link.isExternal ? (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {linkContent}
                </a>
              ) : (
                <Link key={idx} to={link.url} className={className}>
                  {linkContent}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RTIPage;
