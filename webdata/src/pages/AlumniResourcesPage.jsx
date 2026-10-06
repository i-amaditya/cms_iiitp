import React from 'react';
import { Link } from 'react-router';
import PageHeader from '../components/shared/PageHeader';

const AlumniResourcesPage = () => {
  const resources = [
    { title: 'Career Support', description: 'Find placement guidance, internship resources, and alumni job leads.' },
    { title: 'Mentorship Program', description: 'Join mentors or mentees in our alumni-driven mentorship initiatives.' },
    { title: 'Alumni Chapter Updates', description: 'Stay updated on chapter meetups, webinars, and community events.' },
    { title: 'Research Collaboration', description: 'Explore partnership opportunities for alumni researchers and faculty.' },
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader
        title="Resources"
        subtitle="Resources that support alumni engagement, career growth, and ongoing participation with IIIT Pune."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-8 md:p-12 alumni-page">
          <div className="page-layout">
            <section className="main-content-column">
              <h2 className="section-headline">Alumni Resources</h2>
              <div className="grid gap-6">
                {resources.map((resource) => (
                  <article key={resource.title} className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-slate-900 p-6">
                    <h3 className="text-xl font-semibold">{resource.title}</h3>
                    <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">{resource.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <aside className="sidebar-column">
              <div className="sidebar-widget">
                <h3 className="widget-title">Helpful Links</h3>
                <ul className="quick-links-list">
                  <li><Link to="/alumni/get-involved">Get Involved</Link></li>
                  <li><Link to="/alumni/events">Upcoming Events</Link></li>
                  <li><Link to="/alumni/contact">Contact the Office</Link></li>
                </ul>
              </div>

              <div className="sidebar-widget">
                <h3 className="widget-title">Need More Info?</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  For further support, reach out to the alumni office team or visit the IIIT Pune portal.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniResourcesPage;
