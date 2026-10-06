import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingFallback = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="w-10 h-10 animate-spin text-primary dark:text-accent mb-4" />
      <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading content...</p>
    </div>
  );
};

export default LoadingFallback;
