import { useEffect, useState } from 'react';
import { Image, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';
import LifePageLayout from '../components/life/LifePageLayout';
import lifePageData from '../data/lifePageData.json';

const { GALLERY_ITEMS } = lifePageData;

const LifeGalleryPage = () => {
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  return (
    <LifePageLayout 
      title="Student Life" 
      subtitle="Discover the vibrant clubs, events, campus facilities, and extracurricular opportunities at IIIT Pune."
      breadcrumb="Life"
    >
      <div className="space-y-8">
        <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold font-serif text-gray-800 dark:text-white mb-2">Photo Gallery</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">A visual look into campus infrastructure, academic life, and student activities at IIIT Pune.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              onClick={() => openGallery(item)}
              className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col cursor-pointer group"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.target.closest('.group').style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Image size={14} />
                  <span>{item.images?.length || 1} Photos</span>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col relative">
                <span className="text-[10px] font-bold text-accent dark:text-accent-dark uppercase tracking-wider mb-2">{item.category}</span>
                <h3 className="text-xl font-bold font-serif text-gray-800 dark:text-white mb-3">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      {selectedGallery && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setSelectedGallery(null)}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedGallery(null);
            }}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50"
          >
            <X size={24} />
          </button>

          {selectedGallery.images && selectedGallery.images.length > 1 && (
            <button 
              onClick={prevImage}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <div className="relative w-full max-w-5xl mx-4 aspect-video flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedGallery.images[currentImageIndex]} 
              alt={`${selectedGallery.title} - ${currentImageIndex + 1}`} 
              loading="lazy"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {selectedGallery.images && selectedGallery.images.length > 1 && (
            <button 
              onClick={nextImage}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Image Counter */}
          {selectedGallery.images && selectedGallery.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium tracking-widest">
              {currentImageIndex + 1} / {selectedGallery.images.length}
            </div>
          )}
        </div>,
        document.body
      )}
    </LifePageLayout>
  );
};

export default LifeGalleryPage;
