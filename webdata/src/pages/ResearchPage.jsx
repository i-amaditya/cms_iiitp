import React from 'react';
import PageHeader from '../components/shared/PageHeader';
import { Microscope, BookOpen, Layers } from 'lucide-react';

const ResearchPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Research at IIIT Pune" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
              <BookOpen size={24} />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">150+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Publications (IEEE/ACM/Springer)</div>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mr-4">
              <Microscope size={24} />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">12</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Sponsored Projects</div>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mr-4">
              <Layers size={24} />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">4</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Research Centres</div>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold font-serif text-primary dark:text-white mb-6 border-b pb-2 border-gray-200 dark:border-gray-800">
            Research Centres
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Centre for Artificial Intelligence & Robotics', desc: 'Focuses on deep learning, computer vision, and autonomous navigation systems.' },
              { name: 'Centre for VLSI & Embedded Systems', desc: 'Advanced research in low-power VLSI design, SoC, and IoT architectures.' },
              { name: 'Centre for Cyber Security', desc: 'Research in cryptography, network security, and secure software engineering.' },
              { name: 'Centre for Data Science', desc: 'Big data analytics, natural language processing, and predictive modeling.' }
            ].map((center, idx) => (
              <div key={idx} className="bg-white dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-primary dark:text-white mb-2">{center.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{center.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ResearchPage;
