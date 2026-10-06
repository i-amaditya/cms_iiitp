import React from "react";
//import CountUp from "react-countup";
import {
  FileCheck2,
  FolderOpen,
  FileSearch,
  BadgeCheck,
} from "lucide-react";

const PatentStats = ({ patents }) => {
  const totalPatents = patents.length;

  const filed = patents.filter(
    (patent) =>
      patent.status === "Filed" ||
      patent.status === "Design Registered"
  ).length;

  const published = patents.filter(
    (patent) => patent.status === "Published"
  ).length;

  const granted = patents.filter(
    (patent) => patent.status === "Granted"
  ).length;

  const stats = [
    {
      title: "Total Patents",
      value: totalPatents,
      subtitle: "All time",
      icon: FileCheck2,
    },
    {
      title: "Filed",
      value: filed,
      subtitle: "Applications filed",
      icon: FolderOpen,
    },
    {
      title: "Published",
      value: published,
      subtitle: "Published patents",
      icon: FileSearch,
    },
    {
      title: "Granted",
      value: granted,
      subtitle: "Patents granted",
      icon: BadgeCheck,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-surface-dark"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Icon size={24} className="text-primary" />
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                  {item.title}
                </h4>

                <h2 className="text-3xl font-bold font-serif text-primary dark:text-white">
                  {item.value}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PatentStats;