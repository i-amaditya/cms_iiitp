import React from 'react';
import { Link } from 'react-router';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold font-serif text-gray-200 dark:text-gray-800 mb-4 select-none">404</h1>
        <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-6"></div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page not found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-primary hover:bg-blue-800 dark:bg-accent dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          <Home size={18} className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
