import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, BookOpen, Radio, Code, Trophy, Library, Building } from 'lucide-react';
import LifePageLayout from '../components/life/LifePageLayout';
import lifePageData from '../data/lifePageData.json';

const { CAMPUS_TOUR_BOXES } = lifePageData;


const LifeCampusPage = () => {
  const [selectedImage, setSelectedImage] = useState(null); // Kept for backwards compatibility with LifePageLayout if needed, though we won't pass it.
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (box) => {
    if (box.images && box.images.length > 0) {
      setSelectedGallery(box);
      setCurrentImageIndex(0);
    } else {
      setSelectedGallery({ ...box, images: [box.image] });
      setCurrentImageIndex(0);
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedGallery && selectedGallery.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedGallery.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedGallery && selectedGallery.images) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedGallery.images.length) % selectedGallery.images.length);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LifePageLayout 
      title="Student Life" 
      subtitle="Discover the vibrant clubs, events, campus facilities, and extracurricular opportunities at IIIT Pune."
      breadcrumb="Life"
      selectedImage={null} // Disable default layout modal
      setSelectedImage={() => {}} 
    >
      <div className="space-y-8">
        {/* Top Row: Hero Intro and Connectivity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hero Intro */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden h-full">
              <div className="relative z-10 max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-extrabold font-serif text-gray-800 dark:text-white mb-4">
                  Campus Tour
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-justify mb-6">
                  Indian Institute of Information Technology (IIIT) Pune has been allotted 100 acres of land 
                  by the Government of Maharashtra. Situated in Nanoli village, Taluka Maval, the campus is surrounded 
                  by the serene Sahyadri ranges. The modern infrastructure is designed to foster research, 
                  innovation, and holistic student development while providing comfortable residential facilities.
                </p>
                <div className="inline-flex flex-wrap items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 rounded-xl border border-blue-100 dark:border-blue-900/40 text-xs font-bold">
                  <MapPin size={14} className="shrink-0" />
                  <span>
                    {/* Gat No. 5 & 6, Vill - Nanoli-Tarf Chakan, PO - Talegaon, Tah - Maval, Dist - Pune, Maharashtra - 410507 */}
                    Talegaon, Pune, Maharashtra - 410507
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Connectivity */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-6 text-white shadow-md relative overflow-hidden h-full">
              <div className="absolute -right-4 -top-4 text-white/10 rotate-12">
                <MapPin size={120} />
              </div>
              <h3 className="text-lg font-bold font-serif mb-4 relative z-10">Connectivity</h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold">🛣️</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/90">Nearest Highway</p>
                    <p className="text-[11px] text-white/70">Pune–Mumbai Expressway (NH-48)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold">🚉</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/90">Nearest Railway</p>
                    <p className="text-[11px] text-white/70">Talegaon Railway Station (~5 km)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold">✈️</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/90">Nearest Airport</p>
                    <p className="text-[11px] text-white/70">Pune International Airport (~40 km)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold">🏙️</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/90">Major Hubs</p>
                    <p className="text-[11px] text-white/70">Pune City (~35 km) | Pimpri Chinchwad (~20 km)</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Campus Tour Facilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CAMPUS_TOUR_BOXES.map((box, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col cursor-pointer group" 
              onClick={() => openGallery(box)}
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={box.image} 
                  alt={box.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 flex-grow flex flex-col relative">
                <h3 className="text-xl font-bold font-serif text-gray-800 dark:text-white mb-3">
                  {box.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-justify leading-relaxed flex-grow">
                  {box.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      {selectedGallery && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button 
            onClick={() => setSelectedGallery(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          {/* Navigation Buttons (Outside the box on larger screens, absolute to viewport) */}
          {selectedGallery.images.length > 1 && (
            <>
              <button onClick={prevImage} className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-[10000]">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button onClick={nextImage} className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-[10000]">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </>
          )}

          <div className="relative flex flex-col items-center justify-center max-w-5xl w-full max-h-[90vh]">
            <img 
              src={selectedGallery.images[currentImageIndex]} 
              alt={`${selectedGallery.title} - ${currentImageIndex + 1}`} 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            
            {selectedGallery.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm shadow-lg z-10">
                {currentImageIndex + 1} / {selectedGallery.images.length}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </LifePageLayout>
  );
};

export default LifeCampusPage;
