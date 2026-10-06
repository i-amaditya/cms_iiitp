import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Navigate } from 'react-router';
import PageHeader from '../components/shared/PageHeader';
import { Download, ExternalLink, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { fetchEtenders } from '../api/content';

const ITEMS_PER_PAGE = 15;

const ETenderPage = () => {
  const { type } = useParams();
  const [data, setData] = useState({ live: [], archive: [] });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Fetch data dynamically so it doesn't block initial chunk load
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    import('../data/etenders.json')
      .then((module) => {
        if (isMounted) {
          setData(module.default || module);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load tender data:", err);
        if (isMounted) setLoading(false);
      });

    // Live API overrides the bundled JSON when reachable; silently ignored otherwise.
    fetchEtenders()
      .then((liveData) => {
        if (isMounted && (liveData.live.length || liveData.archive.length)) {
          setData(liveData);
        }
      })
      .catch(() => {});
      
    return () => { isMounted = false; };
  }, []);

  // Reset page when switching tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [type]);
  
  if (type !== 'live' && type !== 'archive') {
    return <Navigate to="/e-tender/live" replace />;
  }
  
  const isArchive = type === 'archive';
  const allTenders = isArchive ? data.archive : data.live;
  const pageTitle = isArchive ? "Archive E-Tender" : "Live E-Tender";

  const totalPages = Math.ceil(allTenders.length / ITEMS_PER_PAGE);
  const currentTenders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return allTenders.slice(start, start + ITEMS_PER_PAGE);
  }, [allTenders, currentPage]);

  return (
    <div className="min-h-screen transition-colors duration-200 flex flex-col">
      <PageHeader title={pageTitle} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">
            {pageTitle}
          </h2>
          <div className="flex gap-2 items-center">
            {/* Fees Button */}
            <a
              href="https://payments.billdesk.com/bdcollect/bd/indianinstituteofinformationtechnologypuneii/16417"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary dark:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 dark:hover:bg-blue-900 transition-colors text-sm"
            >
              EMD / BG Payment
              <ExternalLink size={16} />
            </a>
            {/* Visit GeM Portal Button */}
            <a
              href="https://gem.gov.in/"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary dark:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 dark:hover:bg-blue-900 transition-colors text-sm"
            >
              Visit GeM Portal
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
        
        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 w-full overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-primary text-white dark:bg-gray-800">
                  <th className="p-4 font-semibold text-sm w-16 text-center">Sr. No.</th>
                  <th className="p-4 font-semibold text-sm min-w-[300px]">Title</th>
                  <th className="p-4 font-semibold text-sm w-48">Tender Number</th>
                  <th className="p-4 font-semibold text-sm w-32 text-center">File</th>
                  <th className="p-4 font-semibold text-sm w-32 text-center">Corrigendum</th>
                  <th className="p-4 font-semibold text-sm w-48 text-center">Bid Submission End Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center">
                      <div className="flex justify-center items-center gap-3 text-brand-red">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span className="font-medium">Loading tenders...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentTenders.length > 0 ? (
                  currentTenders.map((tender, index) => {
                    // Calculate absolute index for display
                    const absoluteIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                    return (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="p-4 text-sm font-medium text-gray-900 dark:text-gray-200 text-center">
                          {absoluteIndex}
                        </td>
                        <td className="p-4 text-sm text-gray-800 dark:text-gray-300">
                          {tender.title}
                        </td>
                        <td className="p-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                          {tender.tenderNumber}
                        </td>
                        <td className="p-4 text-center">
                          {tender.fileUrl ? (
                            <a 
                              href={tender.fileUrl} 
                              target="_blank" rel="noopener noreferrer"
                              className="text-accent hover:text-blue-800 dark:text-accent-dark transition-colors inline-flex p-2 bg-blue-50 dark:bg-gray-800 rounded-full border border-blue-100 dark:border-gray-700"
                              title={tender.fileText || "Download"}
                            >
                              <Download size={16} />
                            </a>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-600">-</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {tender.corrigendumUrl ? (
                            <a 
                              href={tender.corrigendumUrl} 
                              target="_blank" rel="noopener noreferrer"
                              className="text-orange-600 hover:text-orange-800 dark:text-orange-400 transition-colors inline-flex p-2 bg-orange-50 dark:bg-gray-800 rounded-full border border-orange-100 dark:border-gray-700"
                              title={tender.corrigendumText || "Corrigendum"}
                            >
                              <Download size={16} />
                            </a>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-600">-</span>
                          )}
                        </td>
                        <td className="p-4 text-sm font-medium text-red-600 dark:text-red-400 text-center">
                          {tender.submissionDate}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500 dark:text-gray-400">
                      No tenders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, allTenders.length)}</span> of <span className="font-medium">{allTenders.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${currentPage === 1 ? 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 bg-gray-50 dark:bg-gray-800 cursor-not-allowed' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-surface-dark text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'} text-sm font-medium`}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === i + 1 ? 'z-10 bg-brand-red border-brand-red text-white' : 'bg-white dark:bg-surface-dark border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${currentPage === totalPages ? 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 bg-gray-50 dark:bg-gray-800 cursor-not-allowed' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-surface-dark text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'} text-sm font-medium`}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
              
              {/* Mobile Pagination */}
              <div className="flex items-center justify-between w-full sm:hidden">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${currentPage === 1 ? 'text-gray-400 bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : 'text-gray-700 dark:text-gray-200 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${currentPage === totalPages ? 'text-gray-400 bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : 'text-gray-700 dark:text-gray-200 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ETenderPage;
