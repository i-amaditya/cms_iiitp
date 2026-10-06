
import PageHeader from '../shared/PageHeader';

const LifePageLayout = ({ title, subtitle, breadcrumb, children, selectedImage, setSelectedImage }) => {
  return (
    <div className="min-h-screen font-sans">
      <PageHeader
        title={title}
        subtitle={subtitle}
        breadcrumb={breadcrumb}
      />

      <div className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="min-h-[500px]">
            {children}
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && setSelectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <img 
            src={selectedImage} 
            alt="Fullscreen preview" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default LifePageLayout;
