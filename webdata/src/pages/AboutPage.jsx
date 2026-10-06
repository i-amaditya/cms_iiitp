import React from 'react';
import PageHeader from '../components/shared/PageHeader';
import campusFrontImg from '../assets/campus_front.jpg';

const AboutPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Welcome to IIIT Pune" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          
          <div className="w-full h-64 md:h-96 relative">
            <img 
              src={campusFrontImg} 
              alt="IIIT Pune Campus" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <h1 className="absolute bottom-6 left-6 md:left-10 text-3xl md:text-4xl font-bold font-serif text-white shadow-sm">
              About the Institute
            </h1>
          </div>

          <div className="p-8 md:p-12">
            <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg text-justify">
              <p>
                Recognized as an Institute of National Importance (INI), the Indian Institute of Information Technology Pune (IIIT Pune) is one of the fastest growing IIITs among the 20 newly established IIITs by the Ministry of Education (MoE), Government of India, in partnership with industry, under the Not-for-profit Public-Private Partnership (N-PPP) model. Established in 2016 and located in Pune, Maharashtra, IIIT Pune is dedicated to excellence in education, research, innovation, and entrepreneurship in Information Technology and allied disciplines.
              </p>
              <p>
                The institute offers undergraduate, postgraduate, and doctoral programmes designed to meet the evolving demands of academia, industry, and society.
              </p>
              
              <div className="mt-8 mb-8">
                <h3 className="text-2xl font-bold font-serif text-[#164e63] dark:text-blue-400 mb-6 border-b-2 border-brand-red pb-2 inline-block">Academic Programmes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-base">
                  <div className="bg-blue-50 dark:bg-gray-800/50 border-l-4 border-[#164e63] p-4 rounded-r-lg hover:shadow-md transition-shadow">
                    <strong className="block text-[#164e63] dark:text-blue-400 mb-1">B.Tech Programmes</strong>
                    Computer Science and Engineering (CSE)
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-800/50 border-l-4 border-[#164e63] p-4 rounded-r-lg hover:shadow-md transition-shadow">
                    <strong className="block text-[#164e63] dark:text-blue-400 mb-1">B.Tech Programmes</strong>
                    Electronics and Communication Engineering (ECE)
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-800/50 border-l-4 border-[#164e63] p-4 rounded-r-lg hover:shadow-md transition-shadow">
                    <strong className="block text-[#164e63] dark:text-blue-400 mb-1">B.Tech Programmes</strong>
                    Artificial Intelligence & Data Science (AI & DS)
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-800/50 border-l-4 border-[#164e63] p-4 rounded-r-lg hover:shadow-md transition-shadow">
                    <strong className="block text-[#164e63] dark:text-blue-400 mb-1">B.Tech Programmes</strong>
                    Microelectronics and VLSI Design
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-800/50 border-l-4 border-[#164e63] p-4 rounded-r-lg hover:shadow-md transition-shadow">
                    <strong className="block text-[#164e63] dark:text-blue-400 mb-1">B.Tech Programmes</strong>
                    Cybersecurity
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-800/50 border-l-4 border-[#164e63] p-4 rounded-r-lg hover:shadow-md transition-shadow">
                    <strong className="block text-[#164e63] dark:text-blue-400 mb-1">M.Tech Programmes</strong>
                    Artificial Intelligence (AI)
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-800/50 border-l-4 border-[#164e63] p-4 rounded-r-lg hover:shadow-md transition-shadow">
                    <strong className="block text-[#164e63] dark:text-blue-400 mb-1">M.Tech Programmes</strong>
                    Internet of Things (IoT)
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-800/50 border-l-4 border-[#164e63] p-4 rounded-r-lg hover:shadow-md transition-shadow">
                    <strong className="block text-[#164e63] dark:text-blue-400 mb-1">Doctoral Programmes</strong>
                    Ph.D. in Emerging Areas of Technology and Research
                  </div>
                </div>
              </div>

              <p>
                With a strong emphasis on value-based education, interdisciplinary learning, and industry collaboration, IIIT Pune is committed to developing skilled professionals, researchers, and innovators capable of addressing real-world challenges through technology. The institute also promotes responsible innovation and sustainable development, aligning its academic and research initiatives with the United Nations Sustainable Development Goals (SDGs) to create meaningful societal and environmental impact.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
