import React, { useMemo } from 'react';
import PageHeader from '../components/shared/PageHeader';
import Breadcrumb from '../components/shared/Breadcrumb';

const VisitingFacultyPage = () => {
  const validFaculty = useMemo(() => {
    return [
      {
        name: "Prof. L D Behera",
        designation: "Director, IIT Mandi",
        image: "https://home.iitk.ac.in/~lbehera/img/personal.jpg"
      },
      {
        name: "Prof. J Dhar",
        designation: "Professor, ABV-IIITM Gwalior",
        image: "https://scholar.googleusercontent.com/citations?view_op=view_photo&user=7L977F8AAAAJ&citpid=26"
      },
      {
        name: "Prof. B B Gupta",
        designation: "Professor, Asia University, Taiwan",
        image: "https://csie.asia.edu.tw/uploads/member_profile/avatar/605071c1063ca28c7a0000b9/S__6987779.jpg"
      },
      {
        name: "Dr. Raghunath Tewari",
        designation: "Associate Professor, IIT Kanpur",
        image: "https://www.cse.iitk.ac.in/users/rtewari/jabalpur.jpg"
      },
      {
        name: "Dr. Soumya Prakash Dash",
        designation: "Assistant Professor, IIT Bhubaneswar",
        image: "/assets/faculty_photos/Dr. Soumya Prakash Dash.jpg"
      },
      {
        name: "Dr. Bodhisatwa Mazumdar",
        designation: "Assistant Professor, IIT Indore",
        image: "https://people.iiti.ac.in/~bodhisatwa/img/bodhi.jpg"
      }
    ].sort((a, b) => {
      const nameA = a.name.replace(/^(Dr\.|Prof\.)\s*/i, '');
      const nameB = b.name.replace(/^(Dr\.|Prof\.)\s*/i, '');
      return nameA.localeCompare(nameB);
    });
  }, []);

  return (
    <div className=" min-h-screen">
      <PageHeader 
        title="Visiting Faculty" 
        subtitle="Eminent scholars and industry experts"
        backgroundImage="/campus-image.jpg"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {validFaculty.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 h-full">
            {validFaculty.map((person, index) => (
              <div
                key={index}
                className="bg-white dark:bg-surface-dark rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full group relative"
              >
                {/* Subtle Background Accent */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-800/50 pointer-events-none"></div>

                <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mt-6 bg-gray-100 dark:bg-gray-800 relative z-10 overflow-hidden rounded-full shadow-md border-4 border-white dark:border-gray-800">
                  {person.image ? (
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(person.name) + "&background=1B3A6B&color=fff&size=512";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50 dark:bg-gray-800 text-primary dark:text-gray-400">
                      <span className="text-5xl font-serif opacity-30">{person.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex-grow flex flex-col items-center text-center bg-white dark:bg-surface-dark z-10 w-full mt-1">
                  <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-accent transition-colors line-clamp-1 w-full">
                    {person.name}
                  </h3>
                  
                  {/* Fixed height container for designation (up to 2 lines) */}
                  <div className="h-10 flex items-start justify-center w-full mb-4">
                    <p className="text-sm text-brand-red font-medium whitespace-pre-line line-clamp-2">
                      {person.designation || "Visiting Faculty"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center py-20 bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">Content Being Updated</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
              We are currently updating our Visiting Faculty profiles. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitingFacultyPage;
