import React, { useEffect, useState } from "react";
import PageHeader from "../components/shared/PageHeader";
import MOUCard from "../components/mou/MOUCard";
import GalleryModal from "../components/mou/GalleryModal";
import mousData from "../data/mous.json";

const MousPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryTitle, setGalleryTitle] = useState("");

  const openGallery = (mou) => {
    setGalleryImages(mou.gallery || []);
    setGalleryTitle(mou.organization);
    setGalleryOpen(true);
  };

  const sortedMous = [...mousData].sort((a, b) => b.year - a.year);
  const totalMOUs = mousData.length;

  return (
    <div className="min-h-screen bg-grid-sky dark:bg-slate-900 transition-colors duration-200">

      <PageHeader title="MoUs" />

      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Intro */}

        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg p-8 mb-10 border border-gray-100 dark:border-gray-800">

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Memorandum of Understanding (MoUs)
          </h2>

          <div className="w-24 h-1 bg-primary mt-3 rounded-full"></div>

          <p className="mt-6 text-gray-600 dark:text-gray-300 leading-8">
            The Institute has established Memorandums of Understanding
            (MoUs) with leading industries, universities and research
            organizations to promote academic collaboration,
            internships, faculty exchange, research activities,
            innovation and skill development.
          </p>

          <p className="mt-4 text-sm font-semibold text-primary dark:text-accent-dark">
            Total MoUs: {totalMOUs}
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedMous.map((mou) => (
            <MOUCard key={mou.id} mou={mou} onOpenGallery={openGallery} />
          ))}
        </div>

      </div>

      {/* Gallery */}

      <GalleryModal
        isOpen={galleryOpen}
        images={galleryImages}
        title={galleryTitle}
        onClose={() => setGalleryOpen(false)}
      />

    </div>
  );
};

export default MousPage;