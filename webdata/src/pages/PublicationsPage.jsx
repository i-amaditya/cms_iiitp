import React, { useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';

const publications = [
  { title: "Publishing Year 2026-2027", file: "Publishing Year 2026-2027.pdf" },
  { title: "Publishing Year 2025-2026", file: "Publishing Year 2025-2026.pdf" },
  { title: "Publishing Year 2024-2025", file: "Publishing Year 2024-2025.pdf" },
  { title: "Publishing Year 2023-2024", file: "Publishing Year 2023-2024.pdf" },
  { title: "Publishing Year 2022-2023", file: "Publishing Year 2022-2023.pdf" },
  { title: "Publication before 2022", file: "Publication before 2022.pdf" },
];

const PublicationsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader 
        title="Research Publications" 
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
            Publications
          </h2>
          <ul className="space-y-4 list-disc list-inside">
            {publications.map((pub, index) => (
              <li key={index} className="text-base sm:text-lg leading-relaxed marker:text-primary dark:marker:text-accent">
                <a
                  href={`/publications/${pub.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent font-medium hover:underline underline-offset-4 decoration-2 transition-all duration-300 ml-2 cursor-pointer"
                >
                  {pub.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PublicationsPage;
