import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router';
import { ExternalLink, Image, Mail, X } from 'lucide-react';
import LifePageLayout from '../components/life/LifePageLayout';
import lifePageData from '../data/lifePageData.json';

const { CLUBS } = lifePageData;

const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LifeClubsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const activeClubKey = searchParams.get('club') || 'blueprint';
  const [flyerPopover, setFlyerPopover] = useState(null);
  const [imageError, setImageError] = useState(false);

  const openTimeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    setImageError(false);
  }, [flyerPopover?.key]);

  useEffect(() => {
    const handleClose = () => {
      setFlyerPopover(null);
    };

    if (flyerPopover) {
      window.addEventListener('scroll', handleClose, { passive: true });
      window.addEventListener('click', handleClose);
    }

    return () => {
      window.removeEventListener('scroll', handleClose);
      window.removeEventListener('click', handleClose);
    };
  }, [flyerPopover]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setFlyerPopover(null);
      }
    };
    if (flyerPopover) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [flyerPopover]);

  const showFlyerPopover = (target, key, c, toggleOnMatch = false) => {
    if (toggleOnMatch && flyerPopover?.key === key) {
      setFlyerPopover(null);
      return;
    }

    const rect = target.getBoundingClientRect();
    const isMobile = window.innerWidth < 1024;

    const navbarHeight = isMobile ? 80 : 130;
    const maxTargetHeight = isMobile ? 540 : 760;

    let topPos;
    if (isMobile) {
      topPos = Math.max(navbarHeight + 12, (window.innerHeight - maxTargetHeight) / 2);
    } else {
      const buttonCenter = rect.top + rect.height / 2;
      topPos = buttonCenter - maxTargetHeight / 2;
      topPos = Math.max(navbarHeight + 12, Math.min(window.innerHeight - maxTargetHeight - 12, topPos));
    }

    const height = Math.min(maxTargetHeight, window.innerHeight - topPos - 24);
    const popoverWidth = isMobile ? Math.min(window.innerWidth - 32, 420) : Math.round((height - 70) * 0.7);

    let leftPos = rect.right + 12;
    if (!isMobile && leftPos + popoverWidth > window.innerWidth) {
      leftPos = Math.max(16, rect.left - popoverWidth - 12);
    } else if (isMobile) {
      leftPos = (window.innerWidth - popoverWidth) / 2;
    }

    setFlyerPopover({
      key,
      name: c.name,
      flyer: c.flyer,
      top: topPos,
      left: leftPos,
      width: popoverWidth,
      height: height,
      isMobile,
      isFullScreen: false,
    });
  };

  const openFullScreenFlyer = (key, c) => {
    setFlyerPopover({
      key,
      name: c.name,
      flyer: c.flyer,
      isFullScreen: true,
    });
  };

  const handleMouseEnterButton = (e, key, c) => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    const currentTarget = e.currentTarget;
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
    }
    openTimeoutRef.current = setTimeout(() => {
      showFlyerPopover(currentTarget, key, c);
    }, 150);
  };

  const handleMouseLeaveButton = () => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setFlyerPopover(null);
    }, 250);
  };

  const handleMouseEnterPopover = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseLeavePopover = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setFlyerPopover(null);
    }, 200);
  };

  const handleButtonClick = (e, key, c) => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    setSearchParams({ club: key });
    setFlyerPopover(null);
  };

  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeClubKey]);

  const clubKeys = Object.keys(CLUBS);
  const club = CLUBS[activeClubKey] || CLUBS[clubKeys[0]];

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
              Club Directory
            </h3>
            <div className="flex flex-row overflow-x-auto gap-2 no-scrollbar lg:flex-col lg:max-h-[60vh] lg:overflow-y-auto lg:pr-1 pb-2 lg:pb-0">
              {clubKeys.map((key) => {
                const c = CLUBS[key];
                const isSelected = activeClubKey === key;
                return (
                  <button
                    key={key}
                    onClick={(e) => handleButtonClick(e, key, c)}
                    onMouseEnter={(e) => handleMouseEnterButton(e, key, c)}
                    onMouseLeave={handleMouseLeaveButton}
                    className={`shrink-0 lg:shrink lg:w-full flex flex-row lg:flex-col items-center lg:items-start gap-2 lg:gap-0 px-4 py-2 lg:px-3.5 lg:py-3 rounded-full lg:rounded-xl text-left transition-all duration-250 border ${isSelected
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 bg-transparent border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-850 hover:border-gray-200 dark:hover:border-gray-700'
                      }`}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? 'bg-white' : 'bg-primary'}`} />
                      <span className="font-bold text-xs lg:text-sm truncate">{c.name}</span>
                    </div>
                    {c.tags && c.tags.length > 0 && (
                      <span className={`hidden lg:block text-[10px] mt-1.5 truncate w-full ${isSelected ? 'text-white/80' : 'text-gray-400 dark:text-gray-500'}`}>
                        {c.tags.slice(0, 2).join(' • ')}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-5 mb-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl md:text-3xl font-extrabold font-serif text-primary dark:text-white">
                  {club.name}
                </h2>
                {club.flyer && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openFullScreenFlyer(activeClubKey, club);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-sm text-xs shrink-0"
                  >
                    <Image size={14} />
                    <span>View Flyer</span>
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-4 mb-2">
                {club.tags && club.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-300 tracking-wide uppercase border border-gray-200 dark:border-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-650 dark:text-gray-300 leading-relaxed text-justify whitespace-pre-line">
                {club.desc}
              </div>
              {club.vision && (
                <div className="mt-6 mb-2">
                  <h3 className="text-lg font-bold font-serif text-primary dark:text-white border-b pb-2 border-gray-100 dark:border-gray-800 flex items-center gap-2 mb-4">
                    Our Vision
                  </h3>
                  <div className="text-sm text-gray-650 dark:text-gray-300 leading-relaxed text-justify whitespace-pre-line">
                    {club.vision}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-8">
                {club.flagship && club.flagship.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold font-serif text-primary dark:text-white border-b pb-2 border-gray-100 dark:border-gray-800 flex items-center gap-2">
                      Flagship Events
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {club.flagship.map((item, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                          <h4 className="font-bold text-sm text-gray-800 dark:text-white mb-2 pr-20">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-650 dark:text-gray-400 text-justify leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {club.workshops && club.workshops.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold font-serif text-primary dark:text-white border-b pb-2 border-gray-100 dark:border-gray-800">
                      Workshops &amp; Technical Training
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {club.workshops.map((item, idx) => (
                        <div key={idx} className="pl-4 border-l-2 border-primary/20 py-1">
                          <h4 className="text-sm font-bold text-gray-850 dark:text-white mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-650 dark:text-gray-400 text-justify leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50/50 dark:bg-gray-850/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-primary dark:text-white pb-2 border-b border-gray-200/60 dark:border-gray-800">
                    Club Leadership
                  </h3>
                  {club.leadership && club.leadership.heads && club.leadership.heads.length > 0 ? (
                    <div className="space-y-3">
                      {club.leadership.heads.map((head, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800/80 shadow-xs">
                          <div className={`w-8 h-8 rounded-full bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary dark:text-primary-dark text-[10px] font-bold shrink-0 shadow-xs`}>
                            {head.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex flex-col gap-0.5 min-w-0">
                            {head.link ? (
                              <a href={head.link} className="text-xs font-bold text-gray-850 dark:text-gray-300 truncate hover:text-primary dark:hover:text-blue-400 hover:underline">
                                {head.name}
                              </a>
                            ) : (
                              <span className="text-xs font-bold text-gray-850 dark:text-gray-300 truncate">{head.name}</span>
                            )}
                            <span className="text-[9px] text-gray-500 dark:text-gray-455 truncate">{head.role}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 dark:text-gray-455 italic">
                      Leadership contacts are managed via the student welfare registry.
                    </p>
                  )}
                </div>

                <div className="bg-gray-50/50 dark:bg-gray-850/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-primary dark:text-white pb-2 border-b border-gray-200/60 dark:border-gray-800">
                    Reach Out &amp; Connect
                  </h3>
                  <div className="flex flex-col gap-2">
                    {club.leadership && club.leadership.email && (
                      <a
                        href={`mailto:${club.leadership.email}`}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white dark:bg-surface-dark text-xs text-gray-650 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 hover:shadow-xs transition-all border border-gray-100 dark:border-gray-800/80"
                      >
                        <Mail size={14} className="text-gray-400 shrink-0" />
                        <span className="truncate">{club.leadership.email}</span>
                      </a>
                    )}
                    {club.leadership && club.leadership.instagram && (
                      <a
                        href={`https://instagram.com/${club.leadership.instagram.replace('@', '')}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white dark:bg-surface-dark text-xs text-gray-650 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 hover:shadow-xs transition-all border border-gray-100 dark:border-gray-800/80"
                      >
                        <InstagramIcon size={14} className="text-gray-400 shrink-0" />
                        <span className="truncate">{club.leadership.instagram}</span>
                      </a>
                    )}
                    {club.leadership && club.leadership.website && (
                      <a
                        href={club.leadership.website}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white dark:bg-surface-dark text-xs text-gray-655 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 hover:shadow-xs transition-all border border-gray-100 dark:border-gray-800/80 font-bold"
                      >
                        <ExternalLink size={14} className="text-gray-400 shrink-0" />
                        <span>Visit Website</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-8">
              <h3 className="text-lg font-bold font-serif text-primary dark:text-white mb-4">
                Activities Gallery
              </h3>
              {club.images && club.images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {club.images.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage(imgUrl)}
                      className="group relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800/80 shadow-sm cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <img
                        src={imgUrl}
                        alt={`${club.name} Activity ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.closest('.group').style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-[2px]">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <Image size={18} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-gray-50/50 dark:bg-gray-900/10">
                  <div className={`w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3 shadow-xs`}>
                    <Image size={22} />
                  </div>
                  <h4 className="text-xs font-bold text-gray-750 dark:text-gray-300 mb-1">Gallery Updates in Progress</h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
                    We are currently updating visual highlights for {club.name}. Check back soon to see snapshots of our fests, workshops, and competitions!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Flyer Popover (Hovor) */}
      {flyerPopover && createPortal(
        flyerPopover.isFullScreen ? (
          <div
            onClick={() => setFlyerPopover(null)}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-200"
          >
            {/* Close Button */}
            <button
              onClick={() => setFlyerPopover(null)}
              className="absolute top-6 right-6 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50 bg-black/40 border border-white/10 shadow-lg"
              aria-label="Close flyer"
            >
              <X size={24} />
            </button>

            {flyerPopover.flyer && !imageError ? (
              <div className="w-[95vw] h-[95vh] flex items-center justify-center">
                <img
                  src={flyerPopover.flyer}
                  alt={`${flyerPopover.name} Flyer`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="w-full max-w-md p-8 rounded-2xl bg-gray-900 border border-gray-800 text-center">
                <Image size={48} className="text-blue-500 mb-4 mx-auto opacity-70" />
                <h4 className="text-lg font-bold text-white mb-1">{flyerPopover.name}</h4>
                <p className="text-sm text-gray-400">Flyer details loading or unavailable</p>
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={handleMouseEnterPopover}
            onMouseLeave={handleMouseLeavePopover}
            style={{
              position: 'fixed',
              top: `${flyerPopover.top}px`,
              left: `${flyerPopover.left}px`,
              width: `${flyerPopover.width}px`,
              height: `${flyerPopover.height}px`,
            }}
            className="z-[9999] bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl p-2.5 shadow-xl flex flex-col animate-in fade-in zoom-in-95 duration-150 overflow-hidden relative"
          >
            {/* Floating Close Button */}
            <button
              onClick={() => setFlyerPopover(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-655 dark:hover:text-gray-255 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors z-50 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-xs border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
              aria-label="Close flyer"
            >
              <X size={16} />
            </button>

            {flyerPopover.flyer && !imageError ? (
              <div className="w-full flex-1 min-h-0 overflow-hidden rounded-xl flex items-center justify-center bg-gray-50 dark:bg-gray-900/50">
                <img
                  src={flyerPopover.flyer}
                  alt={`${flyerPopover.name} Flyer`}
                  className="w-full h-full object-contain rounded-xl"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="w-full flex-1 min-h-0 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex flex-col items-center justify-center border border-blue-100 dark:border-blue-900/20 text-center p-4">
                <Image size={32} className="text-primary dark:text-blue-400 mb-2 opacity-70" />
                <span className="text-xs font-bold text-gray-750 dark:text-gray-300 mb-0.5">{flyerPopover.name}</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-455">Flyer details loading or unavailable</span>
              </div>
            )}

            <button
              onClick={() => {
                setSearchParams({ club: flyerPopover.key });
                setFlyerPopover(null);
              }}
              className="mt-2.5 w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md text-xs animate-none shrink-0"
            >
              <span>Know More</span>
            </button>
          </div>
        ),
        document.body
      )}
    </LifePageLayout>
  );
};

export default LifeClubsPage;
