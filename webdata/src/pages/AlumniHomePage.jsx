import React from 'react';
import { Link } from 'react-router';
import PageHeader from '../components/shared/PageHeader';
import AlumniSlideshow from '../components/shared/AlumniSlideshow';

const AlumniHomePage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader
        title="Alumni"
        subtitle="A lifelong network of innovators, achievers, and change makers."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 alumni-page">
        <AlumniSlideshow />

        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-8 md:p-12">

          <section className="space-y-10">
              <div className="about-block">
                <h2 className="section-headline">Welcome to the IIIT Pune Alumni Network</h2>
                <p>
                  The IIIT Pune Alumni community is a vibrant lifelong network empowering graduates to stay connected with the institute, support current students, and grow professionally across industries.
                </p>
                <p>
                  Alumni at IIIT Pune contribute through mentorship, alumni events, career opportunities, and institutional initiatives that strengthen the institute's legacy and global impact.
                </p>
              </div>

              <div className="about-block">
                <h2 className="section-headline">Recent Alumni Events</h2>
                <article className="border border-gray-200 dark:border-gray-700 rounded-2xl bg-slate-50 dark:bg-slate-900 p-6">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold">2nd Alumni Interaction – Bangalore Chapter</h3>
                    <p className="shrink-0 text-sm text-gray-500 dark:text-gray-400">05 September 2026</p>
                  </div>
                  <p className="leading-7 text-gray-700 dark:text-gray-300">
                    IIIT Pune successfully hosted its second Alumni Meet in Bangalore on 5 September 2026,bringing together alumni and senior faculty members to reconnect, reminisce, and strengthen their continuing association with the Institute.
                  </p>
                  <Link
                    to="/alumni/events"
                    className="mt-4 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
                  >
                    View Details
                  </Link>
                </article>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">

                </p > 
                
                <article className="border border-gray-200 dark:border-gray-700 rounded-2xl bg-slate-50 dark:bg-slate-900 p-6 mb-6">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold">First-Ever Alumni Interaction: Pune Chapter</h3>
                    <p className="shrink-0 text-sm text-gray-500 dark:text-gray-400">06 June 2026</p>
                  </div>
                  <p className="leading-7 text-gray-700 dark:text-gray-300">
                    IIIT Pune successfully hosted its first-ever Alumni Interaction: Pune Chapter, bringing alumni from recent graduating batches together to reconnect, network, and celebrate their shared journey.
                  </p>
                  <Link
                    to="/alumni/events"
                    className="mt-4 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
                  >
                    View Details
                  </Link>
                </article>
              </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AlumniHomePage;
