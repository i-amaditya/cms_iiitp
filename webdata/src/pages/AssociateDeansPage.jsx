import React, { useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { Link } from 'react-router';
import { Mail, Phone } from 'lucide-react';
import facultyDetails from '../data/faculty_details.json';

const associateDeansData = [
  {
    slug: 'sanjeev-sharma',
    name: 'Sanjeev Sharma'
  },
  {
    slug: 'sushant-kumar',
    name: 'Sushant Kumar'
  },
  {
    slug: 'bhupendra-singh',
    name: 'Bhupendra Singh'
  }
];

const AssociateDeansPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deanEmailOverrides = {
  "sanjeev-sharma": "asd.academics@iiitp.ac.in ",
  "sushant-kumar": "asd.rndfw@iiitp.ac.in",
  "bhupendra-singh": "asd.iaf@iiitp.ac.in ",
};

const deansList = associateDeansData.map(dean => {
  const details = facultyDetails[dean.slug] || {};

  return {
    ...details,
    name: dean.name,
    slug: dean.slug,
    designation: details.designation,
    email: deanEmailOverrides[dean.slug] || details.email,
  };
});

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Associate Deans" subtitle="Meet the Associate Deans of IIIT Pune" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col gap-4 sm:gap-6">
            {deansList.map((person, index) => {
              return (
                <Link
                  to={`/people/faculty/${person.slug}`}
                  key={index}
                  className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-6 group"
                >
                  {/* Image Container */}
                  <div className="w-20 h-20 sm:w-28 sm:h-28 shrink-0 bg-white dark:bg-gray-800 overflow-hidden rounded-full shadow-inner mr-4 sm:mr-6 mb-4 sm:mb-0 border-2 border-white dark:border-gray-700 group-hover:scale-105 transition-transform duration-300 self-center sm:self-auto">
                    {person.image ? (
                      <img 
                        src={person.image} 
                        alt={person.name} 
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(person.name) + "&background=1B3A6B&color=fff&size=512";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-3xl font-serif">{person.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Middle Container (Name & Designation) */}
                  <div className="flex flex-col justify-center overflow-hidden flex-grow w-full sm:w-auto sm:pr-4">
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-accent transition-colors text-center sm:text-left">
                      {person.name}
                    </h3>
                    
                    <div className="text-center sm:text-left">
                      <p className="text-xs sm:text-sm text-brand-red font-medium whitespace-pre-line leading-relaxed">
                        {person.designation || "Faculty Member"}
                      </p>
                    </div>
                  </div>

                  {/* Contact Info Container (Right Side) */}
                  <div className="flex flex-col gap-2 shrink-0 sm:items-end w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-gray-700 sm:pl-6 justify-center sm:justify-start">
                    {person.email && (
                      <div className="flex items-center justify-center sm:justify-end text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 shrink-0" />
                        <span className="truncate">{person.email}</span>
                      </div>
                    )}
                    {person.phone && (
                      <div className="flex items-center justify-center sm:justify-end text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 shrink-0" />
                        <span className="truncate">{person.phone.split(',')[0]}</span>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssociateDeansPage;
