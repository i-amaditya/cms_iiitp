import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PageHeader from '../components/shared/PageHeader';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const RajbhashaGalleryPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update document title for SEO purposes
  useEffect(() => {
    document.title = "चित्र दीर्घा | राजभाषा अनुभाग - IIIT Pune";
  }, []);

  const galleryImages = [
    { src: '/rajbhasha/rajbhasha_img_1.jpeg', title: 'राजभाषा कार्यान्वयन समिति की बैठक' },
    { src: '/rajbhasha/rajbhasha_img_2.jpeg', title: 'हिंदी पखवाड़ा उद्घाटन समारोह' },
    { src: '/rajbhasha/rajbhasha_img_3.jpeg', title: 'राजभाषा हिंदी कार्यशाला' },
    { src: '/rajbhasha/rajbhasha_img_4.jpeg', title: 'हिंदी निबंध एवं वाद-विवाद प्रतियोगिता' },
    { src: '/rajbhasha/rajbhasha_img_5.jpeg', title: 'विजेता प्रतिभागियों का पुरस्कार वितरण' },
    { src: '/rajbhasha/rajbhasha_img_6.jpeg', title: 'विश्व हिंदी दिवस का आयोजन' },
    { src: '/rajbhasha/rajbhasha_img_7.jpeg', title: 'हिंदी दिवस समारोह एवं सांस्कृतिक कार्यक्रम' },
    { src: '/rajbhasha/rajbhasha_img_8.jpeg', title: 'संस्थान के राजभाषा अनुभाग की गतिविधियाँ' },
    { src: '/rajbhasha/rajbhasha_img_9.jpeg', title: 'राजभाषा संगोष्ठी एवं व्याख्यान' },
  ];

  // Close lightbox on Escape, navigate on Arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="राजभाषा अनुभाग" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 md:p-12">
          <h2 className="text-3xl font-bold font-serif text-primary dark:text-blue-400 mb-6">
            चित्र दीर्घा
          </h2>

          <hr className="border-gray-200 dark:border-gray-700 mb-8" />

          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-justify space-y-6">
            <p className="text-lg">
              संस्थान में आयोजित राजभाषा पखवाड़ा, हिंदी दिवस, विश्व हिंदी दिवस आदि अवसरों पर आयोजित विभिन्न कार्यक्रमों एवं प्रतियोगिताओं की झलकियाँ “चित्र दीर्घा” अनुभाग में उपलब्ध कराई जाएंगी।
            </p>
            <p className="text-lg">
              इस अनुभाग के माध्यम से आगंतुकों को संस्थान में आयोजित राजभाषा संबंधी गतिविधियों का दृश्य अवलोकन प्राप्त होगा, जिससे हिंदी के प्रति जागरूकता एवं प्रेरणा में वृद्धि होगी।
            </p>
            <p className="text-lg">
              भारतीय सूचना प्रौद्योगिकी संस्थान, पुणे प्रशासनिक, अकादमिक और सामाजिक गतिविधियों में हिंदी के प्रयोग को बढ़ावा देने के लिए सतत् प्रयासरत है।
            </p>
            <p className="text-lg">
              संस्थान का उद्देश्य है कि हिंदी केवल एक राजभाषा न रहकर, संस्थान की कार्य संस्कृति, शिक्षण पद्धति और संवाद का अभिन्न अंग बने।
            </p>
            <p className="text-lg">
              भारत सरकार की नीति —<br />
              “राजभाषा के माध्यम से सुशासन, पारदर्शिता और सहभागिता को सशक्त बनाना”<br />
              — के अनुरूप IIIT Pune राजभाषा हिंदी को राष्ट्र की एकता, समरसता और प्रशासनिक दक्षता के माध्यम के रूप में स्थापित करने के लिए निरंतर कार्य कर रहा है।
            </p>
          </div>

          {/* Local Image Gallery Section */}
          <div className="mt-10 border-t border-gray-100 dark:border-gray-800 pt-8">
            <h3 className="text-2xl font-bold font-serif text-primary dark:text-blue-400 mb-6">
              कार्यक्रमों की झलकियाँ (Photo Gallery)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="group relative overflow-hidden bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-gray-850 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer transition-all duration-300"
                >
                  <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-[1px]">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                        <ZoomIn size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {isOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50 shadow-lg"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {/* Navigation Arrows */}
          <button 
            onClick={prevImage} 
            className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-[10000] shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
          
          <button 
            onClick={nextImage} 
            className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-[10000] shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>

          {/* Image and Caption Container */}
          <div 
            className="relative flex flex-col items-center justify-center max-w-5xl w-full max-h-[85vh] p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={galleryImages[currentIndex].src} 
              alt={galleryImages[currentIndex].title} 
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Caption */}
            <div className="mt-4 text-center">
              <p className="text-white text-lg font-medium px-6 py-2 bg-black/40 rounded-full inline-block backdrop-blur-sm">
                {galleryImages[currentIndex].title}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {currentIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default RajbhashaGalleryPage;
