import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { FileText, ArrowLeft, Download } from 'lucide-react';
import shortlistingsData from '../data/shortlistings.json';
import Navbar from '../components/layout/Navbar';

const ShortlistingsPage = () => {
  const { slug } = useParams();
  const [activeDept, setActiveDept] = useState('CSE');
  const [activeTab, setActiveTab] = useState('shortlisted'); // 'shortlisted' | 'non_shortlisted'

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const data = shortlistingsData[slug];

  if (!data) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold font-serif text-gray-800 dark:text-gray-200">
            Shortlistings Data Not Found
          </h2>
          <Link to="/careers" className="text-primary hover:underline inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  const deptData = data.departments[activeDept];
  const depts = Object.keys(data.departments);

  // Reusable Table Component
  const TableView = ({ title, list, pdfLink }) => {
    if (!list || list.length === 0) return null;
    return (
      <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 mb-4">
          <h3 className="text-lg font-bold font-serif text-gray-800 dark:text-white">
            {title}
          </h3>
          {pdfLink && (
            <a 
              href={pdfLink}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 hover:bg-orange-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-orange-600 dark:text-orange-400 rounded-full font-bold text-sm transition-colors border border-orange-100 dark:border-gray-700"
            >
              <FileText size={16} />
              View Official Document
            </a>
          )}
        </div>
        
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">S. No.</th>
                <th className="px-6 py-4 whitespace-nowrap">Form No</th>
                {list.some(item => item.remarks) && (
                  <th className="px-6 py-4">Remarks</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {list.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
                    {item.sNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.formNo}
                  </td>
                  {item.remarks !== undefined && (
                    <td className="px-6 py-4 text-xs">
                      {item.remarks || '-'}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-gray-50 dark:bg-bg-dark min-h-screen pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <Link to="/careers" className="text-sm font-bold text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-blue-400 inline-flex items-center gap-1.5 mb-4 transition-colors">
              <ArrowLeft size={16} />
              Back to Careers
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold font-serif text-gray-900 dark:text-white">
              {data.title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-3xl">
              Select a department below to view the list of provisionally shortlisted and non-shortlisted candidates.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar / Top bar selector */}
            <div className="w-full lg:w-64 shrink-0">
              <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm lg:sticky lg:top-32 w-full space-y-4">
                <h3 className="text-gray-800 dark:text-white font-bold font-serif px-2 pb-2 border-b border-gray-100 dark:border-gray-800 text-base">
                  Departments
                </h3>
                <div className="flex flex-row overflow-x-auto gap-2 no-scrollbar lg:flex-col lg:max-h-[60vh] lg:overflow-y-auto lg:pr-1 pb-2 lg:pb-0">
                  {depts.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setActiveDept(dept)}
                      className={`shrink-0 lg:shrink lg:w-full flex items-center gap-3 px-4 py-3 rounded-full lg:rounded-xl text-left transition-all duration-200 border ${
                        activeDept === dept
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'text-gray-700 dark:text-gray-300 bg-transparent border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeDept === dept ? 'bg-white' : 'bg-primary dark:bg-blue-400'}`} />
                      <span className="font-bold text-sm truncate">{dept}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0 space-y-8">
              
              {/* Sliding Button (Tabs) */}
              <div className="flex justify-center md:justify-start">
                <div className="flex bg-gray-100 dark:bg-gray-800/80 p-1 rounded-full border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setActiveTab('shortlisted')}
                    className={`px-6 md:px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                      activeTab === 'shortlisted'
                        ? 'bg-white dark:bg-surface-dark text-primary dark:text-blue-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    Shortlisted
                  </button>
                  <button
                    onClick={() => setActiveTab('non_shortlisted')}
                    className={`px-6 md:px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                      activeTab === 'non_shortlisted'
                        ? 'bg-white dark:bg-surface-dark text-red-600 dark:text-red-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    Non-Shortlisted
                  </button>
                </div>
              </div>

              {/* Data Tables */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeDept === 'ASH' ? (
                  <div className="space-y-8">
                    {/* Math */}
                    <TableView 
                      title="Mathematics" 
                      list={deptData.math[activeTab]} 
                      pdfLink={activeTab === 'shortlisted' ? deptData.math.shortlistedPdf : deptData.math.nonShortlistedPdf} 
                    />
                    {/* HSS */}
                    <TableView 
                      title="Humanities & Social Sciences (HSS)" 
                      list={deptData.hss[activeTab]} 
                      pdfLink={activeTab === 'shortlisted' ? deptData.hss.shortlistedPdf : deptData.hss.nonShortlistedPdf} 
                    />
                  </div>
                ) : (
                  <TableView 
                    title={`${activeDept} Department`} 
                    list={deptData[activeTab]} 
                    pdfLink={
                      deptData.pdf 
                        ? deptData.pdf // Mixed PDF case
                        : (activeTab === 'shortlisted' ? deptData.shortlistedPdf : deptData.nonShortlistedPdf)
                    } 
                  />
                )}
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ShortlistingsPage;
