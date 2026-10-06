import React from "react";
import PatentIllustration from "./PatentIllustration";
import {
  BrainCircuit,
  Network,
  Leaf,
  FileText,
  Users,
  Building2,
  Globe,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

const PatentCard = ({ patent }) => {
  const getIcon = () => {
    switch (patent.status) {
      case "Granted":
        return <BrainCircuit size={42} className="text-blue-600" />;
      case "Published":
        return <Network size={42} className="text-blue-600" />;
      default:
        return <Leaf size={42} className="text-green-600" />;
    }
  };

  const badgeColor = () => {
    switch (patent.status) {
      case "Granted":
        return "bg-green-100 text-green-700";
      case "Published":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-surface-dark">
      <div className="relative border-b border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-surface-dark">
        <div className="absolute right-4 top-4">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor()}`}>
            {patent.status}
          </span>
        </div>
        <PatentIllustration type={patent.status} />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="min-h-[88px] text-xl font-bold font-serif leading-8 text-gray-900 dark:text-white">
          {patent.title}
        </h3>

        <div className="mt-5 space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-start gap-3">
            <FileText size={18} className="mt-0.5 text-primary" />
            <span>
              <strong>Patent No:</strong> {patent.patentNumber}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <Users size={18} className="mt-0.5 text-primary" />
            <span>
              <strong>Inventors:</strong> {patent.inventors.join(", ")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Building2 size={18} className="text-primary" />
            <span>{patent.department}</span>
          </div>

          <div className="flex items-center gap-3">
            <Globe size={18} className="text-primary" />
            <span>{patent.country}</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-sm dark:border-gray-800">
          <div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <CalendarDays size={16} />
              Published
            </div>
            <p className="mt-1 font-semibold text-gray-700 dark:text-gray-200">
              {patent.publishedDate}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <CalendarDays size={16} />
              Grant Date
            </div>
            <p className="mt-1 font-semibold text-gray-700 dark:text-gray-200">
              {patent.grantDate}
            </p>
          </div>
        </div>

        {patent.certificate ? (
          <a
            href={patent.certificate}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl border-2 border-[#0F4C81] py-3 font-semibold text-[#0F4C81] hover:bg-[#0F4C81] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
          >
            View Certificate
            <ArrowRight size={18} />
          </a>
        ) : (
          <button
            disabled
            className="w-full rounded-xl border-2 border-gray-300 py-3 text-gray-400 cursor-not-allowed"
          >
            Certificate Not Available
          </button>
        )}
      </div>
    </div>
  );
};

export default PatentCard;