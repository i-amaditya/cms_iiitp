import { useState } from "react";
import { organizationData } from '../suo_motu_data/organisationData';
import { budgetData } from '../suo_motu_data/budgetData';
import { publicityData } from '../suo_motu_data/publicityData';
import { egovData } from '../suo_motu_data/egovData';
import { prescribedData } from '../suo_motu_data/prescribedData';
import { initiativeData } from '../suo_motu_data/initiativeData';
import { ExternalLink } from 'lucide-react';

const tabs = [
  { id: "organization", label: "Organisation & Functions" },
  { id: "budget", label: "Budget & Programmes" },
  { id: "publicity", label: "Publicity & Public Interface" },
  { id: "egov", label: "E-Governance" },
  { id: "prescribed", label: "Information as may be Prescribed" },
  { id: "initiative", label: "Information Disclosed on Own Initiative" },
];

export default function SuoMotuDisclosure() {
  const [activeTab, setActiveTab] = useState("organization");

  const getData = () => {
    switch (activeTab) {
      case "organization": return organizationData;
      case "budget": return budgetData;
      case "publicity": return publicityData;
      case "egov": return egovData;
      case "prescribed": return prescribedData;
      case "initiative": return initiativeData;
      default: return [];
    }
  };

  const data = getData();
  const activeTabLabel = tabs.find(t => t.id === activeTab)?.label;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Directory */}
      <div className="w-full lg:w-72 shrink-0">
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 shadow-sm lg:sticky lg:top-24 space-y-4">
          <h3 className="text-gray-800 dark:text-white font-bold font-serif px-2 pb-2 border-b border-gray-100 dark:border-gray-700 text-base">
            Categories Directory
          </h3>
          <div className="flex flex-col gap-2 lg:max-h-[70vh] overflow-y-auto lg:pr-1 pb-2 lg:pb-0">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 lg:shrink lg:w-full flex flex-col lg:flex-row items-center lg:items-center gap-3 px-4 py-3 lg:px-4 lg:py-3.5 rounded-xl text-left transition-all duration-250 border ${isSelected
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'text-gray-700 dark:text-gray-300 bg-transparent border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-200 dark:hover:border-gray-600'
                    }`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-white' : 'bg-primary'}`} />
                    <span className="font-bold text-xs lg:text-sm">{tab.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="border-b border-gray-100 dark:border-gray-700 pb-5 mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold font-serif text-primary dark:text-white">
              {activeTabLabel}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="bg-primary/5 dark:bg-primary/20 text-gray-800 dark:text-gray-200 py-4 px-6 font-semibold border-b border-gray-200 dark:border-gray-700 w-16 text-center text-sm">
                    S.No.
                  </th>
                  <th className="bg-primary/5 dark:bg-primary/20 text-gray-800 dark:text-gray-200 py-4 px-6 font-semibold border-b border-gray-200 dark:border-gray-700 text-sm">
                    Item
                  </th>
                  <th className="bg-primary/5 dark:bg-primary/20 text-gray-800 dark:text-gray-200 py-4 px-6 font-semibold border-b border-gray-200 dark:border-gray-700 text-sm">
                    Disclosure Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr
                    key={index}
                    className={row.isHeading
                      ? "bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700"
                      : "border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"}
                  >
                    <td className="py-4 px-6 text-sm text-center text-gray-500 dark:text-gray-400 font-medium align-top">
                      {row.sno}
                    </td>

                    {row.isHeading ? (
                      <td colSpan="2" className="py-4 px-6 text-[15px] font-bold text-gray-800 dark:text-gray-200">
                        {row.item}
                      </td>
                    ) : (
                      <>
                        <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300 font-medium align-top [&_a]:text-accent [&_a]:hover:text-brand-red dark:[&_a]:text-accent-dark [&_a]:transition-colors [&_a]:underline [&_p]:mt-2 [&_p:first-child]:mt-0">
                          {row.item}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400 align-top">
                          {Array.isArray(row.details) ? (
                            <div className="flex flex-col gap-2.5">
                              {row.details.map((item, i) => (
                                <a
                                  key={i}
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-accent hover:text-brand-red dark:text-accent-dark transition-colors inline-flex items-center gap-1.5 w-fit"
                                >
                                  {item.text}
                                  <ExternalLink size={14} className="shrink-0" />
                                </a>
                              ))}
                            </div>
                          ) : row.link ? (
                            <a
                              href={row.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent hover:text-brand-red dark:text-accent-dark transition-colors inline-flex items-center gap-1.5 w-fit"
                            >
                              {row.details}
                              <ExternalLink size={14} className="shrink-0" />
                            </a>
                          ) : typeof row.details === 'string' ? (
                            <span className="whitespace-pre-line leading-relaxed block">{row.details}</span>
                          ) : (
                            <div className="leading-relaxed [&_a]:text-accent [&_a]:hover:text-brand-red dark:[&_a]:text-accent-dark [&_a]:transition-colors [&_a]:underline [&_p]:mt-2 [&_p:first-child]:mt-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mt-1.5 [&_li:first-child]:mt-0 [&_strong]:text-gray-900 dark:[&_strong]:text-white">
                              {row.details}
                            </div>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 text-right mt-4">
            Last Updated: 25-04-2026
          </p>
        </div>
      </div>
    </div>
  );
}
