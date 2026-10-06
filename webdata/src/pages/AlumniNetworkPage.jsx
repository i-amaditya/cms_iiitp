import React from 'react';
import { Link } from 'react-router';
import PageHeader from '../components/shared/PageHeader';

const AlumniNetworkPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader
        title="Alumni Network"
        subtitle="Explore the global IIIT Pune alumni network and the ways we stay connected."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-8 md:p-12 alumni-page">
          <div className="page-layout">
            <section className="main-content-column">
              <div id="alumni-highlights" className="about-block">
                <h2 className="section-headline">Alumni Highlights</h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>450+ registered alumni and counting.</li>
                  <li>Many alumni are pursuing higher education at institutes like IIT, IIM, and IISc.</li>
                  <li>A good number of alumni are in government jobs such as public banks, police (cyber-crime branch), and the Indian Navy.</li>
                  <li>Some alumni are building their own start-ups.</li>
                  <li>Many are associated with well-known companies like Google, Microsoft, JP Morgan, Amazon.....a list continues</li>
                </ul>
              </div>

              <div id="stay-connected" className="about-block">
                <h2 className="section-headline">Stay Connected with IIIT Pune</h2>
                <p>
                  Join our growing alumni network to reconnect with your alma mater, expand your professional network, and contribute to the success of future generations.
                </p>
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/30">
                  <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                    Registration for alumni database
                  </p>
                  <a
                    href="https://forms.gle/J2qHZKW8qhn2YEAF7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex text-sm font-medium text-primary hover:underline"
                  >
                    Fill Alumni Database Registration Form
                  </a>
                </div>
              </div>
            </section>

            <aside className="sidebar-column">
              <div className="sidebar-widget">
                <h3 className="widget-title">Community Actions</h3>
                <ul className="quick-links-list">
                  <li><Link to="/alumni/get-involved">Engage</Link></li>
                  <li><Link to="/alumni/get-involved">Volunteer</Link></li>
                  <li><Link to="/alumni/get-involved">Mentor</Link></li>
                  <li><Link to="/alumni/contact">Connect with Alumni Office</Link></li>
                </ul>
              </div>

              <div className="sidebar-widget">
                <h3 className="widget-title">Build Together</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Through sustained engagement, the alumni network supports mentorship, collaboration, and long-term institutional growth.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniNetworkPage;
