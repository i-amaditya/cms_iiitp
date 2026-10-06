import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Megaphone } from 'lucide-react';

const NewsTicker = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    import('../../data/news.json')
      .then((module) => {
        if (module.default) {
          setNews(module.default);
        }
      })
      .catch(() => {
        // Fallback mock news
        setNews([
          {id: 114, title: "Shortlisted Candidates for JRF Position under ISRO RESPOND Project", link: "/careers-documents/shortlisted candidate for isro project.pdf" },
          {id: 113, title: "PhD and PostDoc Position under Visvesvaraya Scheme", link: "/documents/Visvesvaraya_PhD_PostDoc_Brochure_Oct_2026_IIIT_Pune.pdf" },
          {id: 112, title: "Advertisement for various research positions under (ANRF-PAIR)", link: "/careers-documents/Sept_ANRF-PAIR_Manpower_Advertisement.pdf" },
          {id: 111, title: "Advertisement for the Post of Junior Research Fellow (JRF) in ISRO Sponsored Project", link: "/careers-documents/Advertisement_ISRO.pdf" },
          {id: 110, title: "Assistant Professor (Temporary) in the Department of Computer Science & Engineering (CSE)", link: "/careers-documents/AP (CSE) Temp.pdf" },
        ]);
      });
  }, []);

  return (
    <div className="relative w-full bg-blue-950 dark:bg-gray-905 border-b border-blue-900 dark:border-gray-800 text-white h-10 flex items-center overflow-hidden z-40 select-none">
      {/* Title Tag */}
      <Link to="/news" className="absolute left-0 top-0 bottom-0 bg-brand-red text-white font-bold text-xs uppercase px-4 flex items-center gap-1.5 z-50 shadow-md hover:bg-red-700 transition-colors">
        <Megaphone size={14} className="animate-bounce" />
        <span className="whitespace-nowrap">Latest News</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      </Link>

      {/* Marquee Container */}
      <div className="w-full pl-36 overflow-hidden flex items-center">
        <div className="animate-marquee-horizontal hover:[animation-play-state:paused] whitespace-nowrap flex items-center py-1">
          {news.map((item) => {
            const isExternal = item.link && (item.link.startsWith('http') || item.link.endsWith('.pdf'));
            return isExternal ? (
              <a
                key={item.id}
                href={item.link}
                target="_blank" rel="noopener noreferrer"
                className="text-xs md:text-sm font-semibold text-white hover:text-brand-red transition-colors mx-12 inline-flex items-center gap-2"
              >
                <span className="hover:underline">{item.title}</span>
              </a>
            ) : (
              <Link
                key={item.id}
                to={item.link || "/news"}
                className="text-xs md:text-sm font-semibold text-white hover:text-brand-red transition-colors mx-12 inline-flex items-center gap-2"
              >
                <span className="hover:underline">{item.title}</span>
              </Link>
            )
          })}
          {/* Duplicate news list for seamless looping */}
          {news.map((item) => {
            const isExternal = item.link && (item.link.startsWith('http') || item.link.endsWith('.pdf'));
            return isExternal ? (
              <a
                key={`dup-${item.id}`}
                href={item.link}
                target="_blank" rel="noopener noreferrer"
                className="text-xs md:text-sm font-semibold text-white hover:text-brand-red transition-colors mx-12 inline-flex items-center gap-2"
              >
                <span className="hover:underline">{item.title}</span>
              </a>
            ) : (
              <Link
                key={`dup-${item.id}`}
                to={item.link || "/news"}
                className="text-xs md:text-sm font-semibold text-white hover:text-brand-red transition-colors mx-12 inline-flex items-center gap-2"
              >
                <span className="hover:underline">{item.title}</span>
              </Link>
            )
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-horizontal {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-horizontal {
          display: inline-block;
          animation: marquee-horizontal 90s linear infinite;
        }
      `}} />
    </div>
  );
};

export default NewsTicker;
