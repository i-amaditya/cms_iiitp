import React, { useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { Construction } from 'lucide-react';

const BtechVlsiPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader 
        title="B.Tech VLSI" 
      />
      
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          We are currently finalizing the curriculum and details for the B.Tech in VLSI. Please check back later for full program details.
        </p>
      </div>
    </div>
  );
};

export default BtechVlsiPage;
