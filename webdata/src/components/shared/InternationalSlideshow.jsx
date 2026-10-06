import React, { useState, useEffect, useRef } from 'react';

const slidesData = [
  {
    image: '/carousel/IR02.jpg',
    alt: 'IR02',
    caption: 'IIIT Pune International Relations Event',
    date: '28th August 2026'
  },
  {
    image: '/carousel/IR01.png',
    alt: 'IR01',
    caption: 'IIIT Pune Hosts Campus France for Interaction on Higher Education Opportunities',
    date: '19th August 2026'
  },
  {
    image: '/resources/main_block.jpg',
    alt: 'IIIT Pune Permanent Campus',
    caption: 'IIIT Pune — Main Campus Block'
  },
  {
    image: '/resources/labs.webp',
    alt: 'State of the Art Facilities',
    caption: 'State-of-the-Art Laboratory Infrastructure'
  }
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slidesData.length;
  const autoplayTimer = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const slideshowRef = useRef(null);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
  };

  const resetAutoplay = () => {
    startAutoplay();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetAutoplay();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    resetAutoplay();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    resetAutoplay();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!slideshowRef.current) return;
      
      const rect = slideshowRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Autoplay hook
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  // Swipe controls
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  return (
    <div className="slideshow-wrapper" ref={slideshowRef}>
      <div 
        className="slideshow-container"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        <div 
          className="slideshow-track" 
          id="slideshowTrack"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slidesData.map((slide, index) => (
            <div className="slide" key={index}>
              <img src={slide.image} alt={slide.alt} />
              <div className="slide-caption">
                <span>{slide.caption}</span>
                {slide.date && <span className="slide-date">{slide.date}</span>}
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="slide-btn slide-btn--prev" 
          id="slidePrev" 
          aria-label="Previous slide"
          onClick={prevSlide}
        >
          ‹
        </button>
        <button 
          className="slide-btn slide-btn--next" 
          id="slideNext" 
          aria-label="Next slide"
          onClick={nextSlide}
        >
          ›
        </button>

        <div className="slide-dots" id="slideDots">
          {slidesData.map((_, index) => (
            <button
              key={index}
              className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
