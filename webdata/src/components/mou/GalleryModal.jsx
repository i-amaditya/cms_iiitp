import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const GalleryModal = ({
  isOpen,
  images = [],
  title = "",
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") onClose();

      if (e.key === "ArrowRight") {
        nextImage();
      }

      if (e.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, images.length]);

  const nextImage = () => {
    if (images.length === 0) return;

    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Close */}

        <button
          onClick={onClose}
          className="absolute top-6 right-6 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition"
        >
          <X size={24} />
        </button>

        {/* Previous */}

        {images.length > 1 && (
          <button
            onClick={prevImage}
            className="absolute left-5 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition"
          >
            <ChevronLeft size={30} />
          </button>
        )}

        {/* Image */}

        {images.length > 0 ? (
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={title}
            className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl"
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.3,
            }}
          />
        ) : (
          <div className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl bg-slate-900/80 p-10 text-center text-white">
            No gallery images available.
          </div>
        )}

        {/* Next */}

        {images.length > 1 && (
          <button
            onClick={nextImage}
            className="absolute right-5 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition"
          >
            <ChevronRight size={30} />
          </button>
        )}

        {/* Footer */}

        <div className="absolute bottom-8 text-center text-white">

          <h3 className="font-semibold text-xl">

            {title}

          </h3>

          <p className="mt-2 text-sm opacity-90">

            {currentIndex + 1} / {images.length}

          </p>

        </div>

        {/* Thumbnails */}

        {images.length > 1 && (
          <div className="absolute bottom-20 flex gap-3 overflow-x-auto max-w-[90%]">

            {images.map((img, index) => (

              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setCurrentIndex(index)}
                className={`w-16 h-16 rounded-lg cursor-pointer object-cover border-2 transition ${
                  currentIndex === index
                    ? "border-white"
                    : "border-transparent opacity-60"
                }`}
              />

            ))}

          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryModal;