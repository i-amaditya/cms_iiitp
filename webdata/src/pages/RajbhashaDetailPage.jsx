import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const RajbhashaDetailPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="राजभाषा अनुभाग" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 md:p-12">
          <h2 className="text-3xl font-bold font-serif text-primary dark:text-blue-400 mb-6">
            प्रशिक्षण कार्यक्रम
          </h2>

          <hr className="border-gray-200 dark:border-gray-700 mb-8" />

          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-justify mb-8">
            <p>
              कर्मचारियों को हिंदी में कार्य करने में निपुणता प्राप्त करने के लिए, राजभाषा विभाग, गृह मंत्रालय, भारत सरकार द्वारा संचालित निम्नलिखित हिंदी प्रशिक्षण योजनाएं सार्थक रुप से लागू हैं-
            </p>
          </div>

          <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300 text-lg pl-4">
            <li>प्रबोध</li>
            <li>प्रवीण</li>
            <li>प्राज्ञ</li>
            <li>पारंगत</li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default RajbhashaDetailPage;
