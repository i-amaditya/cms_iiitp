import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Image } from 'lucide-react';
import LifePageLayout from '../components/life/LifePageLayout';
import lifePageData from '../data/lifePageData.json';

const { ACTIVITIES } = lifePageData;

const LifeActivitiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const activeActKey = searchParams.get('act') || 'azadi';
  const act = ACTIVITIES.find(a => a.id === activeActKey) || ACTIVITIES[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LifePageLayout 
      title="Student Life" 
      subtitle="Discover the vibrant clubs, events, campus facilities, and extracurricular opportunities at IIIT Pune."
      breadcrumb="Life"
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm lg:sticky lg:top-44 self-start w-full space-y-4">
            <h3 className="text-gray-800 dark:text-white font-bold font-serif px-2 pb-2 border-b border-gray-100 dark:border-gray-800 text-base">
              National Initiatives
            </h3>
            <div className="flex flex-row overflow-x-auto gap-2 no-scrollbar lg:flex-col lg:max-h-[60vh] lg:overflow-y-auto lg:pr-1 pb-2 lg:pb-0">
              {ACTIVITIES.map((item) => {
                const isSelected = activeActKey === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSearchParams({ act: item.id })}
                    className={`shrink-0 lg:shrink lg:w-full flex items-center gap-2 px-4 py-2 lg:px-3.5 lg:py-3 rounded-full lg:rounded-xl text-left transition-all border ${
                      isSelected
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 bg-transparent border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-855 hover:border-gray-200 dark:hover:border-gray-700'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? 'bg-white' : 'bg-primary'}`} />
                    <span className="font-bold text-xs lg:text-sm truncate">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
            <div>
              <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-extrabold font-serif text-primary dark:text-white">
                  {act.name}
                </h2>
              </div>
              <div className="space-y-4">
                {act.paragraphs.map((para, idx) => (
                  <p key={idx} className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {act.images && act.images.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-4">Event Gallery</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {act.images.map((imgItem, idx) => {
                    const isObj = typeof imgItem === 'object';
                    const src = isObj ? imgItem.src : imgItem;
                    const caption = isObj ? imgItem.caption : `${act.name} Photo ${idx + 1}`;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedImage(src)}
                        className="group relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800/80 shadow-sm cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <img
                          src={src}
                          alt={caption}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => { e.target.closest('.group').style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 backdrop-blur-[1px]">
                          <span className="text-white text-[11px] font-bold tracking-wide line-clamp-2">{caption}</span>
                          <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                            <Image size={14} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </LifePageLayout>
  );
};

export default LifeActivitiesPage;
