import React from 'react';
import { Outlet } from 'react-router';
import AlumniHeader from './AlumniHeader';
import AlumniFooter from './AlumniFooter';

const AlumniLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100 bg-slate-200 dark:bg-bg-dark bg-grid-pattern transition-colors duration-200">
      <AlumniHeader />
      <main className="flex-grow w-full overflow-x-clip flex flex-col">
        {children || <Outlet />}
      </main>
      <AlumniFooter />
    </div>
  );
};

export default AlumniLayout;
