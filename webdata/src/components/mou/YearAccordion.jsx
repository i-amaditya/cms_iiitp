import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import MOUCard from "./MOUCard";

const YearAccordion = ({
  year,
  data,
  onOpenGallery,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-8">

      {/* Header */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 bg-transparent text-gray-900 dark:text-white"
      >
        <div>
          <h2 className="text-xl font-semibold">
            MoUs
          </h2>
        </div>

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <ChevronDown size={30} />
        </motion.div>
      </button>

      {/* Body */}

      <AnimatePresence>

        {isOpen && (

          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="overflow-hidden"
          >

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {data.map((mou) => (

                <MOUCard
                  key={mou.id}
                  mou={mou}
                  onOpenGallery={onOpenGallery}
                />

              ))}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
};

export default YearAccordion;