import React, { useState, useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { fetchNews } from '../api/content';

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    let cancelled = false;

    import('../data/news.json')
      .then((data) => { if (!cancelled) setNews(data.default); })
      .catch(() => console.log('Error loading news'));

    // Live API overrides the bundled JSON when reachable; silently ignored otherwise.
    fetchNews()
      .then((data) => { if (!cancelled && data.length) setNews(data); })
      .catch(() => {});

    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Latest News & Announcements" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => {
            const isExternal = item.link && (item.link.startsWith('http') || item.link.endsWith('.pdf'));
            const LinkWrapper = isExternal ? 'a' : Link;
            const linkProps = isExternal 
              ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
              : { to: item.link || "/news" };

            return (
              <LinkWrapper 
                key={item.id} 
                {...linkProps}
                className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-150 dark:border-gray-800/80 overflow-hidden hover:-translate-y-1 hover:shadow-md hover:border-blue-600/30 transition-all duration-300 flex flex-col h-full group block"
              >
                {/* Sleek top accent line */}
                <div className="h-1 bg-gradient-to-r from-blue-700 to-indigo-800 w-full" />
                
                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta Row: Date */}
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium gap-1.5 mb-4 border-b border-gray-50 dark:border-gray-800/50 pb-3">
                    <Calendar size={13} className="text-gray-400 dark:text-gray-500" />
                    <span>{item.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-gray-850 dark:text-white text-base leading-snug mb-3 group-hover:text-brand-red dark:group-hover:text-red-400 transition-colors font-serif">
                    {item.title}
                  </h3>
                  
                  {/* Body Excerpt */}
                  <p className="text-gray-600 dark:text-gray-450 text-sm flex-grow leading-relaxed">
                    {item.excerpt}
                  </p>

                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800/60">
                    <span className="text-xs font-bold text-brand-red dark:text-blue-400 flex items-center group-hover:underline transition-all">
                      Read Full Details <ChevronRight size={14} className="ml-1" />
                    </span>
                  </div>
                </div>
              </LinkWrapper>
            );
          })}
        </div>

        {/* Empty State */}
        {news.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-surface-dark rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
            <Calendar size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">No news articles found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Try refining your search keyword</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
