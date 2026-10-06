import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const AlumniEventsPage = () => {
  const puneChapterImages = [
    '/assets/lifepage/linkedin_img_1785173090725_16.jpg',
    '/assets/lifepage/linkedin_img_1785173090757_17.jpg',
    '/assets/lifepage/Alumni/IMG_2776.JPG',
    '/assets/lifepage/Alumni/IMG_2761.JPG',
    '/assets/lifepage/Alumni/IMG_2808.JPG',
    '/assets/lifepage/linkedin_img_1785173090788_18.jpg',
    '/assets/lifepage/linkedin_img_1785173090819_19.jpg',
    '/assets/lifepage/linkedin_img_1785173090849_20.jpg',
    '/assets/lifepage/linkedin_img_1785173090881_21.jpg',
    '/assets/lifepage/linkedin_img_1785173090911_22.jpg',
    '/assets/lifepage/linkedin_img_1785173090941_23.jpg',
    '/assets/lifepage/linkedin_img_1785173090972_24.jpg',
  ];
  const bangaloreChapterImages = Array.from(
    { length: 19 },
    (_, index) => `/assets/lifepage/Alumni/Blr_${String(index + 1).padStart(2, '0')}.JPG`,
  );

  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [activeGalleryImages, setActiveGalleryImages] = React.useState([]);
  const [activeGalleryLabel, setActiveGalleryLabel] = React.useState('Alumni event');
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);

  const totalPuneImages = puneChapterImages.length;
  const shouldCollapseGallery = totalPuneImages > 6;
  const visiblePuneImages = shouldCollapseGallery ? puneChapterImages.slice(0, 6) : puneChapterImages;
  const extraImagesCount = shouldCollapseGallery ? totalPuneImages - 5 : 0;
  const visibleBangaloreImages = bangaloreChapterImages.slice(0, 6);
  const extraBangaloreImagesCount = bangaloreChapterImages.length - 5;

  const openLightbox = (images, index, label) => {
    setActiveGalleryImages(images);
    setActiveGalleryLabel(label);
    setActiveImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const showNextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % activeGalleryImages.length);
  };

  const showPreviousImage = () => {
    setActiveImageIndex(
      (prevIndex) => (prevIndex - 1 + activeGalleryImages.length) % activeGalleryImages.length,
    );
  };

  React.useEffect(() => {
    if (!isLightboxOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }

      if (event.key === 'ArrowRight') {
        showNextImage();
      }

      if (event.key === 'ArrowLeft') {
        showPreviousImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader
        title="Alumni Events"
        subtitle="Discover upcoming and recently held events that keep the IIIT Pune alumni community connected."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-8 md:p-12 alumni-page">
          <section className="space-y-8">
              <article className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-slate-900 p-6">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold">
                    Second Alumni Interaction : Bangalore Chapter (05 September 2026)
                  </h3>
                  <span className="inline-flex shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase text-white">
                    Completed
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-7">
                  IIIT Pune successfully hosted its{' '}
                  <span className="rounded-md bg-amber-100 px-2 py-0.5 font-semibold text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
                    second Alumni Meet in Bangalore on 5 September 2026, 
                  </span>
                
                <span className="text-gray-700 dark:text-gray-300 leading-7 mt-4">
                  bringing together alumni and senior faculty members to reconnect, reminisce, and strengthen their continuing association with the Institute.
                </span>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-7 mt-4">
                  The gathering came alive through stories, shared memories, and experiences, as senior faculty members and alumni reflected on the Institute’s journey and the diverse professional paths its graduates have pursued. The interaction created a warm space for reconnection, knowledge exchange, professional networking, and meaningful conversations between the Institute and its alumni community. 
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-7 mt-4">
                  Building on the success of the first Alumni Interaction held in Pune, the Bangalore meet marked another important step towards nurturing a strong and enduring alumni network centred on mentorship, collaboration, and continued engagement with the Institute. 
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleBangaloreImages.map((image, index) => {
                    const isMoreTile = index === 5;

                    return (
                      <button
                        key={image}
                        type="button"
                        onClick={() =>
                          openLightbox(
                            bangaloreChapterImages,
                            index,
                            'Second Alumni Interaction Bangalore Chapter',
                          )
                        }
                        className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white text-left dark:border-gray-700 dark:bg-slate-900"
                        aria-label={`Open Second Alumni Interaction Bangalore Chapter photo ${index + 1}`}
                      >
                        <img
                          src={image}
                          alt={`Second Alumni Interaction Bangalore Chapter photo ${index + 1}`}
                          className="h-48 w-full object-cover"
                          loading="lazy"
                        />
                        {isMoreTile && (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-3xl font-semibold text-white">
                            +{extraBangaloreImagesCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </article>
              
              <article className="mb-8 rounded-3xl border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-slate-900 p-6">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h2 className="text-2xl font-semibold">
                    First-Ever Alumni Interaction: Pune Chapter (06 June 2026)
                  </h2>
                  <span className="inline-flex shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase text-white">
                    Completed
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-7">
                  IIIT Pune successfully hosted its first-ever Alumni Interaction:{' '}
                  <span className="rounded-md bg-amber-100 px-2 py-0.5 font-semibold text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
                    Pune Chapter on 6 June 2026
                  </span>
                  , bringing together alumni from the{' '}
                  <span className="rounded-md bg-amber-100 px-2 py-0.5 font-semibold text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
                    2020-2025
                  </span>{' '}
                  graduating batches to reconnect, network, and celebrate their shared journey.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-7 mt-4">
                  The event featured inspiring conversations on career journeys, professional growth, and emerging industry trends, creating a valuable platform for meaningful engagement between alumni, students, and the Institute.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-7 mt-4">
                  By strengthening connections across academia and industry, the interaction marked the beginning of a vibrant and enduring alumni network that will continue to support mentorship, collaboration, and institutional growth.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visiblePuneImages.map((image, index) => {
                    const isMoreTile = shouldCollapseGallery && index === 5;

                    return (
                    <button
                      key={image}
                      type="button"
                      onClick={() =>
                        openLightbox(
                          puneChapterImages,
                          index,
                          'First-Ever Alumni Interaction Pune Chapter',
                        )
                      }
                      className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 text-left"
                      aria-label={`Open First-Ever Alumni Interaction Pune Chapter photo ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt={`First-Ever Alumni Interaction Pune Chapter photo ${index + 1}`}
                        className="h-48 w-full object-cover"
                        loading="lazy"
                      />
                      {isMoreTile && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-3xl font-semibold text-white">
                          +{extraImagesCount}
                        </span>
                      )}
                    </button>
                    );
                  })}
                </div>
              </article>
          </section>

          {isLightboxOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              role="dialog"
              aria-modal="true"
              onClick={closeLightbox}
            >
              <div
                className="relative w-full max-w-5xl"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  aria-label="Close image preview"
                  className="absolute right-2 top-2 z-10 rounded-full bg-black/60 px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                  onClick={closeLightbox}
                >
                  Close
                </button>

                <img
                  src={activeGalleryImages[activeImageIndex]}
                  alt={`${activeGalleryLabel} large photo ${activeImageIndex + 1}`}
                  className="mx-auto max-h-[80vh] w-auto rounded-2xl object-contain"
                />

                <div className="mt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
                  >
                    Previous
                  </button>
                  <p className="text-sm font-medium text-white">
                    {activeImageIndex + 1} / {activeGalleryImages.length}
                  </p>
                  <button
                    type="button"
                    onClick={showNextImage}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlumniEventsPage;
