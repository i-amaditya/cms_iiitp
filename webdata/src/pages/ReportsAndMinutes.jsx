import React, { useState } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { Download, FileText, BookOpen } from 'lucide-react';

const bogData = [
  { name: '1st GB', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/GB-1%20MoM%2016.02.2016.pdf' },
  { name: '2nd GB', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/GB-2%20MoM%2002.05.2017.pdf' },
  { name: '3rd GB', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/GB-3%20MoM%2026.02.2019.pdf' },
  { name: '4th GB', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/GB-4%20MoM%2018.12.2019.pdf' },
  { name: '1st BoG', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/BoG-1%20MoM%2020.01.2022_0.pdf' },
  { name: '2nd BoG', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/BoG-2%20MoM%2019.09.2022_0.pdf' },
  { name: '3rd BoG', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/BoG-3%20MoM%2027.07.2023_0.pdf' },
  { name: '4th BoG', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/BoG-4%20MoM%2009.01.2024.pdf' },
  { name: '5th BoG', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/BoG-5%20MoM%2021.08.2024.pdf' },
];

const senateData = [
  { name: '1st Senate', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/Senate-1%20MoM%2019.04.2019.pdf' },
  { name: '2nd Senate', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/Senate-2%20MoM%2011.11.2019.pdf' },
  { name: '3rd Senate', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/Senate-3%20MoM%2026.07.2020.pdf' },
  { name: '4th Senate', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/Senate-4%20MoM%2005.11.2020.pdf' },
  { name: '5th Senate', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/Senate-5%20MoM%2006.02.2021.pdf' },
  { name: '6th Senate', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/Senate-6%20MoM%2004.09.2021.pdf' },
  { name: '7th Senate', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/Senate-7%20MoM%2014.11.2021.pdf' },
  { name: '8th Senate', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/Senate-8%20MoM%2010.04.2022.pdf' },
  { name: '9th Senate', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/Senate-9%20MoM%2026.12.2022.pdf' },
  { name: '10th Senate', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/Senate-10%20MoM%2009.02.2024.pdf' },
  { name: '11th Senate', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/Senate-11%20MoM%2029.07.2024.pdf' },
];

const fcData = [
  { name: '1st FC', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/FC-1%20MoM%2020.01.2022.pdf' },
  { name: '2nd FC', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/FC-2%20MoM%2019.09.2022.pdf' },
  { name: '3rd FC', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/FC-3%20MoM%2002.08.2023.pdf' },
  { name: '4th FC', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/FC-4%20MoM%2009.01.2024.pdf' },
  { name: '5th FC', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/FC-5%20MoM%2021.08.2024.pdf' },
];

const bwcData = [
  { name: '1st BWC', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/BWC-1%20MoM%2010.08.2019.pdf' },
  { name: '2nd BWC', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/BWC-2%20MoM%2022.08.2020.pdf' },
  { name: '3rd BWC', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/BWC-3%20MoM%2009.01.2021.pdf' },
  { name: '4th BWC', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/BWC-4%20MoM%2019.06.2021.pdf' },
  { name: '5th BWC', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/BWC-5%20MoM%2005.12.2021.pdf' },
  { name: '6th BWC', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/BWC-6%20MoM%2012.12.2021.pdf' },
  { name: '7th BWC', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/BWC-7%20MoM%2015.04.2022.pdf' },
  { name: '8th BWC', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/BWC-8%20MoM%2007.02.2023.pdf' },
  { name: '9th BWC', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/BWC-9%20MoM%2026.09.2023.pdf' },
  { name: '10th BWC', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/BWC-10%20MoM%2010.11.2023.pdf' },
  { name: '11th BWC', link: '/Reports-and-minutes-docs/Minutes-of-meetings-docs/BWC-11%20MoM%2012.08.2024.pdf' },
];

const annualData = [
  { year: '2024-2025', repEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Report_2024-25%20Engg.pdf', repHin: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Report_2024-25%20Hindi.pdf', accEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Account%20Report_2024-25%20Engg.pdf', accHin: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Account%20Report_2024-25%20Hindi.pdf' },
  { year: '2023-2024', repEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Report_2023-24%20(Eng).pdf', repHin: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Report_2023-24%20(Hindi).pdf', accEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual-Account-Report-2023-24%20(Eng).pdf', accHin: '/Reports-and-minutes-docs/Annual-reports-docs/Annual-Account-Report-2023-24%20(Hindi).pdf' },
  { year: '2022-2023', repEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Report_2022-23%20(Eng)_compressed.pdf', repHin: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Report_2022-23%20(Hindi)_compressed.pdf', accEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Account_2022-23%20(Eng)_compressed.pdf', accHin: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Account_2022-23%20(Hindi)_compressed.pdf' },
  { year: '2021-2022', repEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Report_2021-22%20(Eng)_compressed.pdf', repHin: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Report_2021-22%20(Hindi)_compressed.pdf', accEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Account_2021-22%20(Eng)_compressed.pdf', accHin: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Account_2021-22%20(Hindi)_compressed.pdf' },
  { year: '2020-2021', repEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Report_2020-21%20(Eng)_compressed.pdf', repHin: '/Reports-and-minutes-docs/Annual-reports-docs/ANNUAL%20REPORT_2020-21%20(Hindi)_compressed.pdf', accEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Account_2020-21%20(Eng)_compressed.pdf', accHin: '/Reports-and-minutes-docs/Annual-reports-docs/ANNUAL%20Account_2020-21%20(Hindi)_compressed.pdf' },
  { year: '2019-2020', repEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Report_2019-20%20(Eng)_Final_compressed.pdf', repHin: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Report_2019-20%20(Hindi)%20Final_compressed.pdf', accEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Account_2019-20%20(Eng)_Final_compressed.pdf', accHin: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Account_2019-20%20(Hindi)%20Final_compressed.pdf' },
  { year: '2018-2019', repEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Report_2018-19%20(Eng)_compressed.pdf', repHin: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Report_2018-19%20(Hindi)_compressed.pdf', accEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Account_2018-19%20(Eng)_compressed.pdf', accHin: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Account_2018-19%20(Hindi)_compressed.pdf' },
  { year: '2017-2018', repEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20report%202017-18%20(Eng)%20Final_compressed.pdf', repHin: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Report%202017-18%20(Hindi)%20Final_compressed.pdf', accEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Account%202017-18%20(Eng)%20Final_compressed.pdf', accHin: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Account%202017-18%20(Hindi)%20Final_compressed.pdf' },
  { year: '2016-2017', repEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Report%202016-17%20(Eng)%20Final_compressed.pdf', repHin: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Report%202016-17%20(Hindi)%20Final_compressed.pdf', accEng: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Account%202016-17%20(Eng)%20Final_compressed.pdf', accHin: '/Reports-and-minutes-docs/Annual-reports-docs/Annual%20Account%202016-17%20(Hindi)%20Final_compressed.pdf' },
];

const SimpleTable = ({ title, data }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden h-full flex flex-col">
    <div className="bg-primary/5 dark:bg-primary/20 p-4 border-b border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-bold text-primary dark:text-white flex items-center">
        <FileText className="mr-2 text-accent dark:text-accent-dark" size={20} />
        {title}
      </h3>
    </div>
    <div className="p-0 overflow-y-auto max-h-[300px] minutes-scrollbar flex-grow">
      <table className="w-full text-left border-collapse">
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <td className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.name}
              </td>
              <td className="py-3 px-4 text-right">
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-accent hover:text-brand-red dark:text-accent-dark transition-colors bg-accent/5 hover:bg-brand-red/10 px-3 py-1.5 rounded-full"
                >
                  <Download size={14} className="mr-1.5" /> View PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ReportsAndMinutes = () => {
  const [activeTab, setActiveTab] = useState('minutes');

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Reports and Minutes" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100 dark:border-gray-700">
        
        {/* Header and Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 pb-6 border-b border-gray-200 dark:border-gray-700 gap-6">
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-primary dark:text-white flex items-center">
            <BookOpen className="mr-3 text-accent dark:text-accent-dark" size={28} />
            {activeTab === 'minutes' ? 'Minutes of Meeting' : 'Annual Accounts & Reports'}
          </h2>
          
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1.5 rounded-full w-fit shrink-0 shadow-inner">
            <button
              onClick={() => setActiveTab('minutes')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'minutes' 
                  ? 'bg-brand-red text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Minutes of Meeting
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'reports' 
                  ? 'bg-brand-red text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Annual Accounts & Reports
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="animate-fade-in-up">
          {activeTab === 'minutes' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              <SimpleTable title="BoG: Minutes of Meetings" data={bogData} />
              <SimpleTable title="Senate: Minutes of Meetings" data={senateData} />
              <SimpleTable title="Finance Committee: Minutes of Meetings" data={fcData} />
              <SimpleTable title="Building Works Committee: Minutes of Meetings" data={bwcData} />
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr>
                      <th className="bg-[#7461f0] text-white py-4 px-6 font-semibold text-center border-b border-[#6350d8] border-r border-[#6350d8]/50" colSpan="2">
                        Annual Report
                      </th>
                      <th className="bg-[#5c4ac4] text-white py-4 px-6 font-semibold text-center border-b border-[#4d3db2] border-x border-[#6350d8]/50 w-32" rowSpan="2">
                        Year
                      </th>
                      <th className="bg-[#7461f0] text-white py-4 px-6 font-semibold text-center border-b border-[#6350d8] border-l border-[#6350d8]/50" colSpan="2">
                        Annual Account
                      </th>
                    </tr>
                    <tr>
                      <th className="bg-[#6b58e6] text-white/90 py-2 px-6 font-medium text-center border-b border-[#6350d8] border-r border-[#6350d8]/50 text-sm">
                        English
                      </th>
                      <th className="bg-[#6b58e6] text-white/90 py-2 px-6 font-medium text-center border-b border-[#6350d8] border-r border-[#6350d8]/50 text-sm">
                        Hindi
                      </th>
                      <th className="bg-[#6b58e6] text-white/90 py-2 px-6 font-medium text-center border-b border-[#6350d8] border-r border-[#6350d8]/50 text-sm">
                        English
                      </th>
                      <th className="bg-[#6b58e6] text-white/90 py-2 px-6 font-medium text-center border-b border-[#6350d8] text-sm">
                        Hindi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {annualData.map((row, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="py-4 px-6 text-center border-r border-gray-100 dark:border-gray-700">
                          <a href={row.repEng} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-accent hover:text-brand-red dark:text-accent-dark transition-colors font-medium">
                            <Download size={16} className="mr-1.5" /> PDF
                          </a>
                        </td>
                        <td className="py-4 px-6 text-center border-r border-gray-100 dark:border-gray-700">
                          <a href={row.repHin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-accent hover:text-brand-red dark:text-accent-dark transition-colors font-medium">
                            <Download size={16} className="mr-1.5" /> PDF
                          </a>
                        </td>
                        <td className="py-4 px-6 text-center font-bold text-gray-800 dark:text-gray-200 border-x border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                          {row.year}
                        </td>
                        <td className="py-4 px-6 text-center border-r border-gray-100 dark:border-gray-700">
                          <a href={row.accEng} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-accent hover:text-brand-red dark:text-accent-dark transition-colors font-medium">
                            <Download size={16} className="mr-1.5" /> PDF
                          </a>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <a href={row.accHin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-accent hover:text-brand-red dark:text-accent-dark transition-colors font-medium">
                            <Download size={16} className="mr-1.5" /> PDF
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
      <style>{`
        .minutes-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05);
        }
        .dark .minutes-scrollbar {
          scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
        }
        .minutes-scrollbar::-webkit-scrollbar {
          display: block !important;
          width: 6px !important;
        }
        .minutes-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .minutes-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .dark .minutes-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .dark .minutes-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ReportsAndMinutes;
