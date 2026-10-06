import React from "react";
import { Search } from "lucide-react";

const PatentFilters = ({
  searchTerm,
  setSearchTerm,
  selectedYear,
  setSelectedYear,
  selectedDepartment,
  setSelectedDepartment,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-surface-dark md:p-5">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filter Patents
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Search by title, inventor, year, department, or status.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        <div className="relative xl:col-span-2">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search patent..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F4C81] dark:border-gray-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="h-11 rounded-xl border border-gray-300 bg-white px-4 text-gray-700 dark:border-gray-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="">Year</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
        </select>

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="h-11 rounded-xl border border-gray-300 bg-white px-4 text-gray-700 dark:border-gray-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="">Department</option>
          <option value="Computer Science & Engineering">Computer Science</option>
          <option value="Electronics & Communication Engineering">Electronics</option>
          <option value="Applied Sciences">Applied Sciences</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="h-11 rounded-xl border border-gray-300 bg-white px-4 text-gray-700 dark:border-gray-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="">Status</option>
          <option value="Granted">Granted</option>
          <option value="Published">Published</option>
          <option value="Filed">Filed</option>
          <option value="Design Registered">Design Registered</option>
          <option value="Under Examination">Under Examination</option>
        </select>
      </div>
    </div>
  );
};

export default PatentFilters;