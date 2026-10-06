import React, { useEffect, useRef, useState } from 'react';

const slidesData = [
  {
    image: '/carousel/alumni_3.JPG',
    alt: 'IIIT Pune Alumni Event',
    caption: 'Second Alumni Interaction: Bangalore Chapter - Alumni, Director, Faculty, and Staff',
  },
  {
    image: '/carousel/alumni_2.JPG',
    alt: 'IIIT Pune Academic Session',
    caption: 'First Alumni Interaction: Pune Chapter - Alumni, Director, Faculty, and Staff',
  },
  {
    image: '/carousel/alumni_1.JPG',
    alt: 'IIIT Pune Academic Building',
    caption: 'First Alumni Interaction: Pune Chapter - Alumni Students',
  },
  {
    image: '/carousel/slide_1.jpeg',
    alt: 'IIIT Pune Campus Event',
    caption: 'IIIT Pune Academic Building',
  }
];

const AlumniSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slidesData.length;
  const autoplayTimer = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const stopAutoplay = () => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
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

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

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
    <div className="slideshow-wrapper">
      <div
        className="slideshow-container"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        <div
          className="slideshow-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slidesData.map((slide) => (
            <div className="slide" key={slide.image}>
              <img src={slide.image} alt={slide.alt} />
              <div className="slide-caption">{slide.caption}</div>
            </div>
          ))}
        </div>

        <button
          className="slide-btn slide-btn--prev"
          aria-label="Previous slide"
          onClick={prevSlide}
        >
          {'<'}
        </button>
        <button
          className="slide-btn slide-btn--next"
          aria-label="Next slide"
          onClick={nextSlide}
        >
          {'>'}
        </button>

        <div className="slide-dots">
          {slidesData.map((slide, index) => (
            <button
              key={slide.image}
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

export default AlumniSlideshow;
