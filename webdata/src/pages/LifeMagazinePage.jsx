import { useEffect, useState } from 'react';
import { BookOpen, X, Maximize2 } from 'lucide-react';
import LifePageLayout from '../components/life/LifePageLayout';
import lifePageData from '../data/lifePageData.json';

const { EDITIONS } = lifePageData;

const LifeMagazinePage = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeIdx]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const activeEd = EDITIONS[activeIdx];

  return (
    <LifePageLayout 
      title="Student Life" 
      subtitle="Discover the vibrant clubs, events, campus facilities, and extracurricular opportunities at IIIT Pune."
      breadcrumb="Life"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Directory */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm lg:sticky lg:top-44 self-start w-full space-y-4">
            <h3 className="text-gray-800 dark:text-white font-bold font-serif px-2 pb-2 border-b border-gray-100 dark:border-gray-800 text-base">
              Magazine Directory
            </h3>
            <div className="flex flex-row overflow-x-auto gap-2 no-scrollbar lg:flex-col lg:max-h-[60vh] lg:overflow-y-auto lg:pr-1 pb-2 lg:pb-0">
              {EDITIONS.map((ed, idx) => {
                const isSelected = activeIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`shrink-0 lg:shrink lg:w-full flex flex-col items-start gap-1 px-4 py-3 lg:px-4 lg:py-3.5 rounded-xl text-left transition-all duration-250 border ${isSelected
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 bg-transparent border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-850 hover:border-gray-200 dark:hover:border-gray-700'
                      }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-sm truncate">{ed.title}</span>
                      <span className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-white' : 'bg-transparent'}`} />
                    </div>
                    <span className={`text-[11px] font-semibold ${isSelected ? 'text-white/80' : 'text-primary dark:text-blue-400'}`}>
                      {ed.year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row h-full">
            
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-center order-2 md:order-1">
               <div className="mb-8">
                 <span className="inline-block bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-4 border border-blue-100 dark:border-blue-800/50">
                    {activeEd.year}
                 </span>
                 <h2 className="text-2xl lg:text-2xl font-bold font-serif text-gray-800 dark:text-white mb-6 leading-tight">{activeEd.title}</h2>
                 <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-justify text-sm md:text-base">
                   {activeEd.desc}
                 </p>
               </div>

               <div className="flex flex-wrap gap-4 mt-auto">
                 <button 
                   onClick={() => setShowModal(true)}
                   className="flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                 >
                   <BookOpen size={18} />
                   Read Full Edition
                 </button>
                 <a 
                   href={activeEd.embedUrl} 
                   target="_blank" rel="noopener noreferrer"
                   title="Open in new tab"
                   className="flex items-center justify-center gap-2 px-5 py-3.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl text-sm font-bold transition-all shadow-sm hover:-translate-y-0.5"
                 >
                   <Maximize2 size={18} />
                 </a>
               </div>
            </div>

            <button 
              onClick={() => setShowModal(true)}
              className="w-full md:w-2/5 lg:w-5/12 bg-gray-50 dark:bg-gray-850/50 flex shrink-0 border-b md:border-b-0 md:border-l border-gray-100 dark:border-gray-800 order-1 md:order-2 overflow-hidden relative min-h-[300px] cursor-pointer group"
              aria-label={`Read ${activeEd.title}`}
            >
              <img 
                src={activeEd.cover} 
                alt={`${activeEd.title} Cover`} 
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none transition-opacity duration-300 group-hover:opacity-40" />
            </button>
            
          </div>
        </div>

      </div>

      {/* Modal Popup for Flipbook */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl h-[95vh] sm:h-[90vh] bg-white dark:bg-surface-dark sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <h3 className="font-bold font-serif text-base sm:text-lg text-gray-800 dark:text-white flex items-center gap-2 truncate pr-4">
                <BookOpen size={18} className="text-primary shrink-0" />
                <span className="truncate">{activeEd.title}</span>
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 shrink-0 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-500 hover:text-red-500 rounded-full transition-colors border border-gray-200 dark:border-gray-700"
              >
                <X size={18} />
              </button>
            </div>
            <iframe 
              src={activeEd.embedUrl} 
              className="w-full flex-1 border-0 bg-gray-100 dark:bg-black" 
              allowFullScreen 
            />
          </div>
        </div>
      )}
    </LifePageLayout>
  );
};

export default LifeMagazinePage;
