import React from 'react';
import { Link } from 'react-router';
import PageHeader from '../components/shared/PageHeader';

const AlumniAboutPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader
        title="About Us"
        subtitle="The IIIT Pune Alumni community is a lifelong network of graduates and ambassadors of the Institute."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-8 md:p-12 alumni-page">
          <div className="page-layout">
            <section className="main-content-column">
              <div className="about-block">
                <h2 className="section-headline">About Us</h2>
                <p>
                  The IIIT Pune Alumni community is a lifelong network of graduates who continue to contribute to academia, industry, entrepreneurship, and society. As ambassadors of the Institute, our alumni strengthen the IIIT Pune legacy through their professional achievements, mentorship, collaborations, and continued engagement with the Institute. The Alumni Association fosters meaningful connections between graduates, students, and faculty, creating opportunities for networking, knowledge sharing, and giving back to the IIIT Pune community.
                </p>
              </div>
            </section>

            <aside className="sidebar-column">
              <div className="sidebar-widget">
                <h3 className="widget-title">Quick Actions</h3>
                <ul className="quick-links-list">
                  <li><Link to="/alumni/events">View Events</Link></li>
                  <li><Link to="/alumni/network">Alumni Highlights</Link></li>
                  <li><Link to="/alumni/get-involved">Engage</Link></li>
                  <li><Link to="/alumni/contact">Contact the Office</Link></li>
                </ul>
              </div>

              <div className="sidebar-widget">
                <h3 className="widget-title">Community Vision</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  We aim to build a vibrant and enduring alumni network that supports mentorship, collaboration, and institutional growth.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniAboutPage;
