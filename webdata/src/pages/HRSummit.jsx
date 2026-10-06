import React, { useState } from 'react';
import PageHeader from '../components/shared/PageHeader';

const HRSummit = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const patrons = [
    { name: 'Prof. Anupam Shukla', role: 'DIRECTOR IIIT PUNE', img: '/assets/hrsummit/anupamsir8.jpg' },
    { name: 'Prof. Arvind Choubey', role: 'DIRECTOR IIIT BHAGALPUR', img: '/assets/hrsummit/arvind.png' },
  ];

  const speakers = [
    { name: 'Mr. Alok Sheopurkar', role: 'Vice President and HR head, HDFC AMC', img: '/assets/hrsummit/alok.png' },
    { name: 'Mr. Baliram Mutagekar', role: 'Vice President, Bank of New York Mellon', img: '/assets/hrsummit/baliram.jpg' },
    { name: 'Ms. Gurpreet Jaggi', role: 'Director HR, Betsol', img: '/assets/hrsummit/gurpreet.png' },
    { name: 'Mr. Aditya Kumar Sinha', role: 'Director C-DAC Patna.', img: '/assets/hrsummit/aditya.jfif' },
    { name: 'Mr. Alok Tripathi', role: 'AGM, Senior Faculty & Head, NTPC Regional Institute', img: '/assets/hrsummit/aloktripathi.png' },
    { name: 'Mr. Kundan Lal', role: 'President, VITTI Research Foundation', img: '/assets/hrsummit/kund.jpeg' },
    { name: 'Mr. Nimish Gupta', role: 'Vice Precident, Truckx', img: '/assets/hrsummit/nimishgupta.png' },
    { name: 'Dr. Satyajit Jena', role: 'Head Of Learning & Devolopment at IISCO STEEL PLANT SAIL', img: '/assets/hrsummit/satya.png' },
    { name: 'Mr. Vikas Sharma', role: 'CEO, Sunworks Consultant', img: '/assets/hrsummit/VIKAS.jpeg' },
    { name: 'Mr. Subnesh Sharma', role: 'SENIOR DIRECTOR VVDN TECHNOLOGY', img: '/assets/hrsummit/SUBNESH.jpeg' },
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="HR Summit 2021" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* About Section */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div>
              <img src="/assets/hrsummit/banner2.png" alt="About The HR Summit 2021" className="w-full h-auto rounded shadow-lg" />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6 text-gray-900 dark:text-white">About The HR Summit</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                <p>
                  Indian Institute of Information Technology (IIIT) Pune & Indian Institute of Information Technology (IIIT) Bhagalpur are Institutes of National Importance, under Act of Parliament IIIT-Act 2017.
                </p>
                <p>
                  Academia-Industry interaction is one of the key activities which is essential to understand the requirement of the Industry. Academia & Industries are two pillars of the country, which must reciprocate each other and work in coherence. To initiate the dialogue, IIIT Bhagalpur & IIIT Pune are jointly organizing a HR Summit which is scheduled to be held on 19th & 20th March 2021 in online mode. Hon’ble Minister, Shri Syed Shahnawaz Hussain, Minister of Industries, Govt. of Bihar has given his kind consent to address the inaugural session of the HR Summit as a Chief Guest at 10:00 AM on 19th March 2021.
                </p>
                <p>
                  The purpose of this HR Summit is to understand the requirements of the industry in the changing scenarios so that an adaptive transformation can be brought in the academia to make the students more employable. The HR Summit will witness presentations by Eminent CEOs and Senior HR Professionals, with a motive of enlightening students as well as faculties to establish a relationship with the corporate world with emerging ideas and practices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video & Schedule Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div 
            className="group bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden relative h-80 flex flex-col items-center justify-center cursor-pointer"
            onClick={() => setIsVideoOpen(true)}
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("/assets/hrsummit/about-video-bg.jpg")' }}></div>
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply transition-opacity duration-300 group-hover:bg-black/60"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <button 
                className="w-20 h-20 rounded-full border-2 border-white text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-brand-red shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
              >
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
              </button>
              <span className="mt-4 text-white font-medium tracking-wide text-lg opacity-90 group-hover:opacity-100 transition-opacity">Watch Highlights</span>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-12 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-serif font-bold mb-6 text-gray-900 dark:text-white">Schedule Detail</h2>
            <p className="mb-8 text-gray-700 dark:text-gray-300">Download the detailed schedule of the HR Summit events, sessions, and talks.</p>
            <a 
              href="/documents/HRSummit 2021 Schedule.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-brand-red text-white px-8 py-3 font-semibold hover:bg-red-800 transition-colors shadow-md rounded-lg"
            >
              View Schedule PDF
            </a>
          </div>
        </div>

        {/* Patrons Section */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-12">
          <h2 className="text-3xl font-serif font-bold mb-10 text-center text-gray-900 dark:text-white">Patrons</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {patrons.map((patron, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <img src={patron.img} alt={patron.name} className="w-48 h-48 object-cover mb-6 rounded-full border-4 border-gray-100 dark:border-gray-700 shadow-sm" />
                <h3 className="text-xl font-bold font-serif mb-2 text-gray-900 dark:text-white">{patron.name}</h3>
                <p className="text-brand-red dark:text-red-400 font-semibold text-sm uppercase tracking-wide">{patron.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Speakers Section */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-12">
          <h2 className="text-3xl font-serif font-bold mb-10 text-center text-gray-900 dark:text-white">Our Speakers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {speakers.map((speaker, idx) => (
              <div key={idx} className="flex flex-col items-center p-6 text-center h-full">
                <img src={speaker.img} alt={speaker.name} className="w-40 h-40 object-cover rounded-full mb-6 border-4 border-gray-100 dark:border-gray-700 shadow-sm" />
                <h3 className="text-lg font-bold font-serif mb-2 text-gray-900 dark:text-white">{speaker.name}</h3>
                <p className="text-brand-red dark:text-red-400 font-semibold text-sm h-20 overflow-hidden">{speaker.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Venue Section */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3433.4152206863414!2d73.6944859747565!3d18.765123482376477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b405ac494d45%3A0xc302bc70566bb0f8!2sIndian%20Institute%20of%20Information%20Technology%20Pune!5e1!3m2!1sen!2sin!4v1785660484339!5m2!1sen!2sin"
                frameBorder="0"
                style={{ border: 0, width: '100%', height: '100%' }} 
                allowFullScreen
                title="IIIT Pune Location"
              ></iframe>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12 bg-gray-50 dark:bg-gray-800">
              <h2 className="text-2xl font-serif font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                Venue
              </h2>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Indian Institute of Information Technology, Pune (Maharashtra).</h3>
              <h4 className="text-gray-600 dark:text-gray-400 leading-relaxed">Talegaon, Pune, Maharashtra - 410507</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsVideoOpen(false)}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setIsVideoOpen(false); }}
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white border-2 border-transparent hover:border-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 z-50"
          >
            ✕
          </button>
          <div 
            className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe 
              className="w-full h-full" 
              src="https://www.youtube.com/embed/n9AVEl9764s?autoplay=1" 
              allowFullScreen
              title="HR Summit Video"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRSummit;
