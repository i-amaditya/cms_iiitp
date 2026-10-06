import React from 'react';
import { Quote } from 'lucide-react';
import FadeInSection from '../shared/FadeInSection';

const testimonials = [
  {
    name: 'Kunal Sable',
    details: 'BTech - CSE - (2022-26)',
    quote: 'It was a nice experience. Many companies came and many students got placed. I would like to thank placement coordinator as well as all the members of placement cell for their contributions and effort.'
  },
  {
    name: 'Varad Prasad Naik',
    details: 'BTech - ECE - (2022-26)',
    quote: 'My placement journey has been full of ups and downs, and it has taught me a lot about patience, persistence, and self-belief. There were times when I had to wait for a long period, and the process was not always easy. Cracking OAs and facing interviews came with their own pressure and challenges, and there were moments of doubt as well. But through all of it, I kept moving forward, and today I can say that the struggle was truly worth it. This experience has made me stronger, more confident, and better prepared for the professional world. It taught me that success does not come instantly; it comes through consistent effort, learning, and perseverance. I am especially thankful to the placement cell and my college for their constant support, guidance, and encouragement throughout this journey. Their help played a very important role in keeping me motivated and focused. I will always remain grateful to them for being a part of this memorable phase of my life.'
  },
  {
    name: 'Svayam Kapadia',
    details: 'BTech - CSE - (2022-26)',
    quote: 'IIIT Pune has provided great placement opportunities and continuous support throughout and even after the placement process. The placement officer and coordinators were always available, helpful, and ready to guide students at every step and every hour of the day. Their support during unexpected situations with companies and their efforts to stand up for students in every situation truly made our placement journey smoother and better.'
  },
  {
    name: 'Deepesh Patil',
    details: 'B.Tech - CSE',
    quote: 'The placements were great, in terms of the variety of companies that visited the campus, the preparation that was given to the students.'
  },
  {
    name: 'Lovkash Garg',
    details: 'BTech - CSE - (2022-26)',
    quote: 'IIIT Pune gave me a strong learning environment with a good coding culture and competitive peer group. The Placement Cell was supportive throughout the placement season and regularly helped with interview preparation and opportunities. The overall exposure and peer learning played an important role in helping me secure placement opportunities.'
  },
  {
    name: 'Akshat Rai',
    details: 'BTech - ECE - (2022-26)',
    quote: 'My journey at Indian Institute of Information Technology Pune as a B.Tech student in Electronics and Communication Engineering has been highly rewarding and instrumental in shaping my professional growth. The institute provided a strong academic foundation along with an environment that encouraged continuous learning and skill development. From a placement perspective, the guidance offered by the placement cell, combined with the support of faculty, played a significant role in helping me secure the position of an Analyst at Datawrkz, Bangalore. I am grateful to IIIT Pune for providing the opportunities and exposure that prepared me to confidently begin my professional journey.'
  },
  {
    name: 'Prajwal Yuvraj Khadse',
    details: 'BTech - CSE - (2022-26)',
    quote: 'Deeply grateful to the faculty and the placement cell at IIIT Pune for their constant guidance, rigorous training, and unwavering support throughout this journey.'
  },
  {
    name: 'Brijdeep Goyal',
    details: 'BTech - CSE - (2022-26)',
    quote: 'The support and guidance provided by IIIT Pune helped me to initiate and shape my career. The kind of support we get from placement cell regarding any query is quite appreciable. Placement drives held on-campus were very smooth and nicely managed. The placement coordinators are very supportive.'
  },
  {
    name: 'Sudhanshu Kumar',
    details: 'BTech - CSE - (2022-26)',
    quote: 'IIIT Pune has given me a great learning experience. During placements, everything was well-managed and we received proper guidance at every step. It made the whole process less stressful and helped me get a good opportunity.'
  },
  {
    name: 'Vidyansh Yadav',
    details: 'BTech - CSE - (2022-26)',
    quote: 'I sincerely thank the placement cell for their continuous guidance and support throughout the on-campus placement process. The training sessions, interview preparation, and mentorship played an important role in helping me secure an opportunity with Amazon. I\'m grateful for the encouragement and resources provided throughout this journey.'
  },
  {
    name: 'Tanmay Khandelwal',
    details: 'BTech - CSE - (2022-26)',
    quote: 'IIIT Pune provided me with strong technical foundations, a competitive peer environment, and valuable industry exposure that significantly shaped my placement journey. The guidance from the Placement Cell, combined with continuous learning opportunities, played an important role in helping me secure meaningful career opportunities.'
  },
  {
    name: 'Harshita Srivastava',
    details: 'MTech - ECE - (2024-26)',
    quote: 'My placement experience has been a valuable learning journey. It helped me improve my technical knowledge, communication skills, and confidence during interviews. Through the process, I understood the importance of consistency, project work, and preparation. I am grateful to my college, faculty, and placement officer for their guidance and support throughout the journey.'
  },
  {
    name: 'Atharva S. Vairagade',
    details: 'BTech - CSE - (2022-26)',
    quote: 'I am extremely thankful for the continuous support provided by IIIT Pune’s placement cell. Despite a challenging start to my placement journey, their guidance and reassurance helped me stay positive and focused. When a great opportunity finally presented itself, they ensured I was fully prepared. The strong foundation I built during my time at IIIT Pune was pivotal in helping me secure this position, and I am grateful for their faith in my potential.'
  }
];

// Triple the array to ensure smooth continuous scrolling
const track = [...testimonials, ...testimonials, ...testimonials];

const TestimonialCard = ({ item }) => (
  <div className="flex-shrink-0 w-80 md:w-96 bg-[#f8f9fc] dark:bg-gray-800 rounded-xl shadow-sm border border-indigo-100 dark:border-gray-700 p-6 hover:shadow-md transition-shadow flex flex-col mx-3 h-72">
    <div className="flex items-start justify-between mb-4">
      <Quote size={28} className="text-indigo-900 dark:text-indigo-400 rotate-180 opacity-70" />
      <div className="text-right">
        <h4 className="font-bold text-gray-900 dark:text-gray-100">{item.name}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium italic mt-1">{item.details}</p>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">Indian Institute of Information Technology, Pune</p>
      </div>
    </div>
    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
        {item.quote}
      </p>
    </div>
  </div>
);

const TestimonialsCarousel = () => {
  return (
    <FadeInSection delay={0.1}>
    <section className="py-12 bg-transparent transition-colors duration-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <p className="text-accent dark:text-accent-dark text-xs font-semibold uppercase tracking-widest mb-1">
            Student Voices
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary dark:text-white">
            What Our Alumni Say
          </h2>
        </div>
      </div>

      <div className="relative w-full overflow-hidden mt-8 flex flex-col gap-6">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-bg-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-bg-dark to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex w-max animate-testimonial-scroll hover:[animation-play-state:paused]">
          {track.map((item, idx) => (
            <TestimonialCard key={`row-${idx}`} item={item} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-testimonial-scroll {
          animation: scroll 80s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #475569;
        }
      `}</style>
    </section>
    </FadeInSection>
  );
};

export default TestimonialsCarousel;
