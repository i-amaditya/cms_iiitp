import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const AboutPlaceholderPage = ({ title }) => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title={title} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-bold font-serif text-gray-900 dark:text-white mb-4">Coming Soon</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          The content for {title} is currently being updated. Please check back later.
        </p>
      </div>
    </div>
  );
};

export default AboutPlaceholderPage;
