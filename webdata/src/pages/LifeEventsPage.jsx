import { useEffect, useState } from 'react';
import { ExternalLink, Image } from 'lucide-react';
import LifePageLayout from '../components/life/LifePageLayout';
import lifePageData from '../data/lifePageData.json';

const { EVENTS } = lifePageData;

const LifeEventsPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LifePageLayout 
      title="Student Life" 
      breadcrumb="Life"
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
    >
      <div className="space-y-8">
        <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold font-serif text-gray-800 dark:text-white mb-2">Flagship College Events</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Discover the major annual festivals and technical conclaves that bring the campus to life.</p>
        </div>

        <div className="space-y-8">
          {EVENTS.map((evt, idx) => (
            <div key={idx} className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className={`h-1.5 ${evt.typeColor.split(' ')[0]}`} />
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${evt.typeColor}`}>
                          {evt.type}
                        </span>
                        {evt.date && (
                          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                            {evt.date}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                        <h3 className="text-2xl font-bold font-serif text-gray-800 dark:text-white">
                          {evt.name}
                        </h3>
                        {evt.links && evt.links.slice(0, 1).map((link, idx) => {
                          const colorMatch = evt.typeColor.match(/bg-(\w+)-/);
                          const color = colorMatch ? colorMatch[1] : 'teal';
                          const buttonStyles = {
                            blue: "bg-blue-200 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50",
                            indigo: "bg-indigo-200 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50",
                            teal: "bg-teal-200 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400 border-teal-100 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/50",
                            purple: "bg-purple-200 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-100 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50",
                            green: "bg-green-200 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-100 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/50",
                            amber: "bg-amber-200 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-100 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/50",
                            red: "bg-red-200 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-100 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/50",
                            cyan: "bg-cyan-200 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 border-cyan-100 dark:border-cyan-800 hover:bg-cyan-100 dark:hover:bg-cyan-900/50"
                          };
                          const buttonClass = buttonStyles[color] || buttonStyles.teal;
                          return (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-full border transition-colors ${buttonClass}`}
                            >
                              View Report
                              <ExternalLink size={14} />
                            </a>
                          );
                        })}
                      </div>
                      <div className="text-sm text-gray-650 dark:text-gray-300 leading-relaxed text-justify">
                        {evt.desc && evt.desc.includes('\n\n**') ? (
                          <>
                            <p>{evt.desc.split('\n\n**')[0]}</p>
                            <p className="font-bold mt-3">{evt.desc.split('\n\n**')[1].replace('**', '')}</p>
                          </>
                        ) : (
                          <p>{evt.desc}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wide mb-3">Highlights</h4>
                      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                        {evt.highlights.map((h, hidx) => (
                          <div key={hidx} className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${evt.typeColor.split(' ')[0]}`} />
                            <span className="text-sm dark:text-gray-400">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {evt.images && evt.images.length > 0 && (
                  <div className="mt-6">
                    <div className="grid grid-cols-3 gap-4">
                      {evt.images.map((imgUrl, iidx) => (
                        <div 
                          key={iidx} 
                          onClick={() => setSelectedImage(imgUrl)}
                          className="group relative aspect-video rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm cursor-pointer"
                        >
                          <img 
                            src={imgUrl} 
                            alt={`${evt.name} snippet`} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-[2px]">
                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              <Image size={14} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </LifePageLayout>
  );
};

export default LifeEventsPage;
