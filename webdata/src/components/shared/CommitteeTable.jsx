import React from 'react';

const CommitteeTable = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-primary dark:bg-primary/95">
          <tr>
            <th scope="col" className="px-6 py-4 text-center text-sm font-bold text-white tracking-wider w-24">
              Sr. No
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-white tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-4 text-center text-sm font-bold text-white tracking-wider w-48">
              Designation
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-surface-dark divide-y divide-gray-200 dark:divide-gray-800">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900 dark:text-gray-300">
                {row.srNo}.
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                <div className="font-bold">{row.name}</div>
                {row.affiliation && <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">{row.affiliation}</div>}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 dark:text-gray-300">
                {row.designation}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommitteeTable;
