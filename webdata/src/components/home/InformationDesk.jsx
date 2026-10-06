import React from 'react';
import { BookOpen, Users, FlaskConical, Library, Briefcase, Home, Activity, MessageSquareWarning } from 'lucide-react';
import { Link } from 'react-router';

const items = [
  { icon: BookOpen, label: 'Academics', path: '/academics', color: 'text-blue-600 dark:text-blue-400' },
  { icon: Users, label: 'Administration', path: '/administration', color: 'text-indigo-600 dark:text-indigo-400' },
  { icon: FlaskConical, label: 'Research', path: '/research', color: 'text-purple-600 dark:text-purple-400' },
  { icon: Library, label: 'Library', path: '/library', color: 'text-teal-600 dark:text-teal-400' },
  { icon: Briefcase, label: 'Placements', path: 'https://placements.iiitp.ac.in/', color: 'text-emerald-600 dark:text-emerald-400' },
  { icon: Home, label: 'Hostel', path: '/life', color: 'text-orange-600 dark:text-orange-400' },
  { icon: Activity, label: 'Sports', path: '/life', color: 'text-red-600 dark:text-red-400' },
  { icon: MessageSquareWarning, label: 'Grievance', path: '/contact', color: 'text-rose-600 dark:text-rose-400' },
];

const InformationDesk = () => {
  return (
    <section className="py-20 bg-surface dark:bg-surface-dark transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary dark:text-white mb-4">Information Desk</h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full opacity-80"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {items.map((item, index) => {
            const isExternal = item.path.startsWith('http');
            const content = (
              <>
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${item.color}`}>
                  <item.icon size={36} strokeWidth={1.5} className="md:w-10 md:h-10" />
                </div>
                <h3 className="text-gray-800 dark:text-gray-200 font-semibold font-serif text-sm md:text-lg group-hover:text-primary dark:group-hover:text-accent-dark transition-colors">
                  {item.label}
                </h3>
              </>
            );

            return isExternal ? (
              <a 
                key={index} 
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-bg-dark rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-800 group"
              >
                {content}
              </a>
            ) : (
              <Link 
                key={index} 
                to={item.path}
                className="bg-white dark:bg-bg-dark rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-800 group"
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InformationDesk;
