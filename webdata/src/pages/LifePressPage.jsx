import { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import LifePageLayout from '../components/life/LifePageLayout';

import pressArticles from '../data/press.json';

const LifePressPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LifePageLayout
      title="Press & Media"
      subtitle="Discover the latest news, media coverage, and press releases about IIIT Pune."
      breadcrumb="Life"
    >
      <div className="space-y-8">
        {/* Intro Card */}
        <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold font-serif text-gray-800 dark:text-white mb-2">
            Media Coverage
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed text-justify">
            Explore the latest news articles and press coverage highlighting
            the achievements, events, and growth of IIIT Pune.
          </p>
        </div>

        {/* Articles */}
        <div className="space-y-6">
          {pressArticles.map((article, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                <span className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                  {article.publisher || "Media Coverage"}
                </span>

                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {article.date}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-xl md:text-2xl font-bold font-serif text-gray-800 dark:text-white mb-4">
                {article.title}
              </h4>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-justify leading-relaxed">
                {article.desc}
              </p>

              {/* Multiple Newspaper Articles */}
              {article.articles ? (
                <div className="flex flex-wrap gap-3">
                  {article.articles.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-semibold transition-all shadow-sm hover:-translate-y-0.5"
                    >
                      <ExternalLink size={15} />
                      {item.publisher}
                    </a>
                  ))}
                </div>
              ) : (
                /* Single Article (Old Data) */
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold transition-all shadow-sm hover:-translate-y-0.5"
                >
                  <ExternalLink size={16} />
                  Read Full Article
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </LifePageLayout>
  );
};

export default LifePressPage;