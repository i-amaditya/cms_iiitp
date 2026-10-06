import React, { useState, useEffect } from "react";
import { Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router";

const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    import("../../data/news.json")
      .then((module) => {
        if (module.default && module.default.length > 0) {
          setNews(module.default.slice(0, 3));
        }
      })
      .catch(() => {
        setNews([  
          {
            id: 114,
            title: "Shortlisted Candidates for JRF Position under ISRO RESPOND Project",
            date: "15-09-2026",
            excerpt: "The shortlisted candidates for the Junior Research Fellow (JRF) position under the ISRO RESPOND Project at IIIT Pune have been announced.",
            link: "/careers-documents/shortlisted candidate for isro project.pdf"
          },
          {
            id: 113,
            title: "PhD and PostDoc Position under Visvesvaraya Scheme",
            date: "21-09-2026",
            excerpt: "Applications are invited for the PhD and PostDoc Position under Visvesvaraya Scheme at IIIT Pune.",
            link: "/documents/Visvesvaraya_PhD_PostDoc_Brochure_Oct_2026_IIIT_Pune.pdf"
          },
          {
            id: 112,
            title: "Advertisement for various research positions under (ANRF-PAIR)",
            date: "09-09-2026",
            excerpt: "Applications are invited for various research positions under the (ANRF-PAIR) at IIIT Pune.",
            link: "/careers-documents/Sept_ANRF-PAIR_Manpower_Advertisement.pdf"
          },
          {
            id: 111,
            title: "Advertisement for the Post of Junior Research Fellow (JRF) in ISRO Sponsored Project",
            date: "10-09-2026",
            excerpt: "Applications are invited for the position of Junior Research Fellow (JRF) in ISRO Sponsored Project at IIIT Pune.",
            link: "/careers-documents/Advertisement_ISRO.pdf"
          },
          {
            id: 110,
            title: "Assistant Professor (Temporary) in the Department of Computer Science & Engineering (CSE)",
            date: "08-09-2026",
            excerpt: "Applications are invited for the position of Assistant Professor (Temporary) in the Department of Computer Science & Engineering (CSE) at IIIT Pune.",
            link: "/careers-documents/AP (CSE) Temp.pdf"
          },
        ]);
      });

    import("../../data/notices.json")
      .then((module) => {
        if (module.default && module.default.length > 0) {
          setNotices(module.default.slice(0, 8));
        }
      })
      .catch(() => {
        setNotices([]);
      });
  }, []);

  return (
    <section className="py-16 bg-surface dark:bg-bg-dark transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Announcements */}
          <div className="lg:w-1/3 bg-white dark:bg-surface-dark rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col">
            <div className="bg-primary dark:bg-gray-800 text-white py-3 px-6 font-bold text-lg font-serif">
              Announcements
            </div>

            <div className="relative flex-grow h-[350px] overflow-hidden bg-white dark:bg-surface-dark p-4 group">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white dark:from-surface-dark to-transparent z-10 pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-surface-dark to-transparent z-10 pointer-events-none" />

              <div className="animate-marquee group-hover:[animation-play-state:paused] flex flex-col space-y-4 pt-4 absolute w-[calc(100%-2rem)]">
                {notices.map((notice) => {
                  const isExternal = notice.link && (notice.link.endsWith('.pdf') || notice.link.startsWith('http'));
                  return isExternal ? (
                    <a
                      key={notice.id}
                      href={notice.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-text dark:text-gray-300 hover:text-accent dark:hover:text-accent-dark border-b border-gray-100 dark:border-gray-800 pb-3 block transition-colors"
                    >
                      <span className="text-accent dark:text-accent-dark font-bold mr-2 text-xs uppercase bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                        New
                      </span>
                      {notice.title}
                    </a>
                  ) : (
                    <Link
                      key={notice.id}
                      to={notice.link || "/notice"}
                      className="text-sm font-medium text-text dark:text-gray-300 hover:text-accent dark:hover:text-accent-dark border-b border-gray-100 dark:border-gray-800 pb-3 block transition-colors"
                    >
                      <span className="text-accent dark:text-accent-dark font-bold mr-2 text-xs uppercase bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                        New
                      </span>
                      {notice.title}
                    </Link>
                  );
                })}
                {notices.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No recent announcements.</p>
                )}
              </div>
            </div>

            <Link
              to="/notice"
              className="block text-center py-3 bg-gray-50 dark:bg-gray-800/80 text-brand-red dark:text-brand-red-dark font-semibold text-sm hover:bg-brand-red/10 dark:hover:bg-brand-red-dark/10 transition-colors border-t border-gray-100 dark:border-gray-800"
            >
              View All Notices
            </Link>
          </div>

          {/* Latest News */}
          <div className="lg:w-2/3 bg-white dark:bg-surface-dark rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-800">
            {/* Blue Header */}
            <div className="bg-primary dark:bg-gray-800 text-white py-3 px-6 font-bold text-lg font-serif flex justify-between items-center">
              <h2>Latest News</h2>

              <Link
                to="/notice"
                className="text-white text-sm font-medium hover:underline flex items-center"
              >
                More News
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Cards */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-surface-dark rounded-xl shadow-md overflow-hidden hover:-translate-y-1 transition-transform duration-300 border border-gray-100 dark:border-gray-800 flex flex-col"
                  >
                    <div className="h-40 bg-gray-100 dark:bg-gray-800 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <Calendar className="w-12 h-12 text-blue-200 dark:text-gray-600" />
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                        <Calendar
                          size={12}
                          className="mr-1.5 text-accent dark:text-accent-dark"
                        />

                        {item.date}
                      </div>

                      <h3 className="font-bold text-text dark:text-gray-100 mb-2 line-clamp-2 hover:text-accent dark:hover:text-accent-dark transition-colors text-lg">
                        {item.link && (item.link.endsWith('.pdf') || item.link.startsWith('http')) ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                        ) : (
                          <Link to={item.link || "/news"}>{item.title}</Link>
                        )}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-grow text-justify">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee {
              0% { transform: translateY(350px); }
              100% { transform: translateY(-100%); }
            }

            .animate-marquee {
              animation: marquee 20s linear infinite;
            }
          `,
        }}
      />
    </section>
  );
};

export default LatestNews;
