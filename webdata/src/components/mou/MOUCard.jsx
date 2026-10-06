import React from "react";
import {
  CalendarDays,
  Building2,
  ExternalLink,
  Images
} from "lucide-react";

const MOUCard = ({ mou, onOpenGallery }) => {

  const openPDF = () => {
    window.open(mou.pdf, "_blank");
  };

  return (
    <div
      className="
      bg-white
      dark:bg-surface-dark
      rounded-2xl
      shadow-xl
      hover:shadow-2xl
      border
      border-gray-200
      dark:border-gray-800
      transition-all
      duration-300
      transform
      hover:-translate-y-2
      overflow-hidden
      "
    >

      {/* Logo */}

<div className="h-40 overflow-hidden rounded-t-2xl bg-slate-50 dark:bg-surface-dark">
  <img
    src={mou.logo}
    alt={mou.organization}
    className="
      w-full
      h-full
      object-contain
      p-6
      transition-transform
      duration-500
      ease-in-out
      hover:scale-125
      cursor-pointer
    "
  />
</div>

      {/* Content */}

      <div className="p-6">

        <h3 className="text-xl font-bold text-gray-900 dark:text-white">

          {mou.organization}

        </h3>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-6">
          {mou.description}
        </p>

        <div className="mt-5 space-y-3">

          <div className="flex items-center gap-3">

            <Building2
              className="text-blue-600"
              size={18}
            />

            <span className="text-sm text-gray-600 dark:text-gray-300">

              {mou.department}

            </span>

          </div>

          <div className="flex items-center gap-3">

            <CalendarDays
              className="text-green-600"
              size={18}
            />

            <span className="text-sm text-gray-600 dark:text-gray-300">

              Signed :
              {" "}
              {mou.signedDate}

            </span>

          </div>

          <div className="flex items-center gap-3">

            <CalendarDays
              className="text-orange-500"
              size={18}
            />

            <span className="text-sm text-gray-600 dark:text-gray-300">

              Valid Till :
              {" "}
              {mou.validTill}

            </span>

          </div>

        </div>

        {/* Tags */}

        <div className="mt-6 flex flex-wrap gap-2">

          {mou.tags.map((tag, index) => (

            <span
              key={index}
              className="
              px-3
              py-1
              rounded-full
              text-xs
              font-medium
              bg-blue-100
              text-blue-700
              dark:bg-blue-900/40
              dark:text-blue-300
              "
            >

              {tag}

            </span>

          ))}

        </div>

        {/* Buttons */}

        <div className="mt-8 space-y-3">

          <button
            onClick={() => onOpenGallery(mou)}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              bg-primary
              hover:bg-primary/90
              text-white
              py-4
              rounded-xl
              font-medium
              transition
            "
          >
            <Images size={18} />
            Signing Ceremony
          </button>

          {mou.pdf && (
            <button
              onClick={openPDF}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                border
                border-gray-200
                dark:border-gray-800
                bg-white
                dark:bg-surface-dark
                text-gray-700
                dark:text-gray-200
                py-4
                rounded-xl
                font-medium
                transition
                hover:bg-gray-50
                dark:hover:bg-slate-800
              "
            >
              <ExternalLink size={18} />
              View MoU PDF
            </button>
          )}

        </div>

      </div>

    </div>
  );
};

export default MOUCard;