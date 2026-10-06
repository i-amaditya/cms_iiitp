import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const RegistrarPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Registrar" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-48 shrink-0 mx-auto md:mx-0">
                <div className="rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700">
                  <img src="/registrar.jpeg" alt="Dr. Nagendra Kushwaha" className="w-full h-auto object-cover block" />
                </div>
              </div>
              <div className="text-left flex-1">
                <h2 className="text-3xl font-bold font-serif text-primary dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Dr. Nagendra Kushwaha
                </h2>

                <div className="space-y-2 mb-6 text-sm border-l-2 border-primary/30 dark:border-primary-dark/30 pl-4 py-1">
                  <p className="text-brand-red font-semibold text-base">Registrar (I/C)</p>
                  <p className="text-primary dark:text-blue-400 font-semibold text-sm">Assistant Professor & Head (ECE)</p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">Indian Institute of Information Technology (IIIT) Pune</p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    <a href="mailto:registrar@iiitp.ac.in" className="text-primary dark:text-blue-400 font-medium hover:underline">
                      registrar@iiitp.ac.in
                    </a>
                  </p>
                </div>

                <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-justify mt-6">
                  <p>
                    <span className="font-semibold text-gray-900 dark:text-white">Dr. Nagendra Kushwaha</span> is an accomplished academician and researcher in the field of Electronics and Communication Engineering, with strong expertise in VLSI Design, Digital Systems, and System-on-Chip (SoC) technologies. He is currently serving as <span className="font-semibold text-gray-900 dark:text-white">Registrar (I/C)</span>, Indian Institute of Information Technology, Pune, with effect from <span className="font-semibold text-gray-900 dark:text-white">16 January 2026</span>, in addition to his role as <span className="font-semibold text-gray-900 dark:text-white">Assistant Professor</span> in the Department of Electronics and Communication Engineering at IIIT Pune.
                  </p>
                  <p>
                    Dr. Kushwaha received his M.Tech. and Ph.D. degrees in the broad areas of VLSI Design and Digital Systems. His academic and research work lies at the intersection of low-power SoC architecture, processor-peripheral integration, mixed-signal circuit design, and design automation for emerging applications, particularly in the domain of Internet of Things (IoT) systems.
                  </p>
                  <p>
                    He has been actively involved in teaching, research, and academic administration, contributing significantly to the institute's academic growth and research ecosystem. His ability to integrate academic rigor with institutional responsibilities enables him to effectively support governance, policy implementation, and strategic planning at the institute level.
                  </p>
                  <p>
                    As one of the Principal Officers of the Institute, the Registrar is entrusted with statutory functions outlined in the Indian Institutes of Information Technology (Public-Private Partnership) Act, 2017. These include acting as the ex-officio Secretary to statutory bodies such as the Board of Governors, Senate, and Finance Committee, and serving as the custodian of the Institute's records and seal. Additionally, the Registrar assists the Director with administrative matters and performs duties assigned by the Statutes or the Director.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarPage;
