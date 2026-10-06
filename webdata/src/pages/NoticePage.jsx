import React, { useState, useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { Search, Filter, Download } from 'lucide-react';
import { Link } from 'react-router';
import { fetchNotices } from '../api/content';

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    let cancelled = false;

    import('../data/notices.json')
      .then((data) => { if (!cancelled) setNotices(data.default); })
      .catch(() => console.log('Error loading notices'));

    // Live API overrides the bundled JSON when reachable; silently ignored otherwise.
    fetchNotices()
      .then((data) => { if (!cancelled && data.length) setNotices(data); })
      .catch(() => {});

    return () => { cancelled = true; };
  }, []);

  const filteredNotices = filter === 'All' 
    ? notices 
    : notices.filter(n => n.category === filter);

  const categories = ['All', 'Academic', 'Administrative', 'Admissions', 'Tender', 'General'];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Notice Board" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search notices..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-accent outline-none"
            />
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            <Filter size={18} className="text-gray-400 mr-2 shrink-0" />
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === cat ? 'bg-primary text-white dark:bg-accent-dark' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/80">
                <th className="p-4 font-semibold text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-700 w-32">Date</th>
                <th className="p-4 font-semibold text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-700 w-32">Category</th>
                <th className="p-4 font-semibold text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">Subject</th>
                <th className="p-4 font-semibold text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-700 w-24 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotices.map((notice) => {
                const isExternal = notice.link && (notice.link.endsWith('.pdf') || notice.link.startsWith('http'));
                return (
                  <tr key={notice.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap">{notice.date}</td>
                    <td className="p-4 text-sm">
                      <span className="px-2.5 py-1 rounded-md text-sm font-semibold">
                        {notice.category}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-800 dark:text-gray-200 hover:text-accent dark:hover:text-accent-dark font-medium transition-colors cursor-pointer">
                      {isExternal ? (
                        <a href={notice.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                          {notice.title}
                        </a>
                      ) : (
                        <Link to={notice.link} className="hover:underline flex items-center">
                          {notice.title}
                        </Link>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {isExternal ? (
                        <a 
                          href={notice.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-gray-400 hover:text-accent dark:hover:text-accent-dark transition-colors inline-flex p-2 bg-white dark:bg-gray-800 shadow-sm rounded-full border border-gray-200 dark:border-gray-700"
                        >
                          <Download size={16} />
                        </a>
                      ) : (
                        <Link 
                          to={notice.link} 
                          className="text-gray-400 hover:text-accent dark:hover:text-accent-dark transition-colors inline-flex p-2 bg-white dark:bg-gray-800 shadow-sm rounded-full border border-gray-200 dark:border-gray-700"
                        >
                          <Download size={16} />
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredNotices.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No notices found for this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default NoticePage;
