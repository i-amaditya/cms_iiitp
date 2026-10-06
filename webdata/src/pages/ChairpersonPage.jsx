import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const ChairpersonPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Chairperson" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">

          <div className="p-8 md:p-12">

            {/* Profile Section */}
            <div className="flex flex-col md:flex-row gap-10 border-b border-gray-200 dark:border-gray-800 pb-10">

              {/* Image */}
              <div className="w-60 shrink-0 mx-auto md:mx-0">
                <div className="w-full h-72 rounded-xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg bg-gray-100 dark:bg-gray-800">

                  {/* Replace src with actual image */}
                  <img
  src="/chairman.jpg"
  alt="Shri Vishad P. Mafatlal"
  className="w-full h-full object-cover"
/>

                  {/* If image is not available yet, comment the img above and use this placeholder:
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Chairperson Image
                  </div>
                  */}

                </div>
              </div>

              {/* Details */}
              <div className="flex-1">

                <h2 className="text-3xl font-bold text-primary dark:text-white mb-3">
                  Shri Vishad P. Mafatlal
                </h2>

                <p className="text-xl font-semibold text-brand-red mb-2">
                  Chairperson, Board of Governors
                </p>

                <p className="text-gray-700 dark:text-gray-300 mb-6 font-medium">
                  Indian Institute of Information Technology (IIIT) Pune
                </p>

                <p className="text-primary dark:text-gray-300">
                  <span className="font-semibold text-gray-700 dark:text-gray-400">
                    Email:
                  </span>{" "}
                  chairman@iiitp.ac.in
                </p>

              </div>
            </div>

            {/* Biography */}
            <div className="mt-10">
              <div className="space-y-6 text-justify leading-8 text-gray-700 dark:text-gray-300">

                <p>
                  Shri Vishad P. Mafatlal is the Chairperson of the Board of
                  Governors of the Indian Institute of Information Technology
                  (IIIT) Pune. An accomplished industrialist and institution
                  builder, he brings over three decades of leadership
                  experience spanning the textile and chemical industries,
                  corporate governance, philanthropy, and higher education.
                </p>

                <p>
                  A graduate of the Wharton School at the University of
                  Pennsylvania, USA, where he earned a Bachelor of Science
                  degree in Economics, Shri Mafatlal has played a pivotal role
                  in strengthening Indian industry through his strategic
                  leadership. He currently serves as the Executive Chairman of
                  Navin Fluorine International Limited, one of India's leading
                  specialty chemical companies, and has held leadership
                  positions across several enterprises within the Mafatlal
                  Group.
                </p>

                <p>
                  Beyond the corporate sphere, Shri Vishad P. Mafatlal is deeply
                  committed to social development and nation building. Since
                  2011, he has served as the Chairman of Shri Sadguru Seva Sangh
                  Trust, a charitable organisation established in 1968 that has
                  transformed the lives of rural communities through quality
                  healthcare, education, and community development initiatives.
                  His contributions to sustainable business practices and social
                  responsibility were recognised with the Mahatma Award 2025 for
                  Leadership in Business Sustainability and Social Impact.
                </p>

              </div>

              {/* Signature */}
              <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">

                <h4 className="text-2xl font-bold text-primary dark:text-white">
                  Shri Vishad P. Mafatlal
                </h4>

                <p className="text-lg text-brand-red mt-2">
                  Chairperson, Board of Governors
                </p>

                <p className="text-gray-600 dark:text-gray-400">
                  Indian Institute of Information Technology Pune
                </p>

              </div>

            </div>

            {/* Footer */}
            <div className="mt-16 text-right text-sm text-gray-500 dark:text-gray-400">
              Last Updated: 09-07-2026
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ChairpersonPage;
