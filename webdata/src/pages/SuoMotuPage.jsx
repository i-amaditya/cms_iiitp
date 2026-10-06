import React from 'react';
import SuoMotuDisclosure from '../components/SuoMotuDisclosure';
import PageHeader from '../components/shared/PageHeader';

const SuoMotuPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Suo Motu Disclosure" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <SuoMotuDisclosure />
      </div>
    </div>
  );
};

export default SuoMotuPage;