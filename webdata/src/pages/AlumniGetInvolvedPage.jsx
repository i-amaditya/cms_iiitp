import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const AlumniGetInvolvedPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader
        title="Engage"
        subtitle="Engage with IIIT Pune alumni activities and help build a stronger lifelong community."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-8 md:p-12 alumni-page">
          <section className="space-y-8">
              <div id="stay-connected" className="about-block">
                <p>
                  Stay connected with IIIT Pune by participating in alumni events, networking initiatives, and Institute activities. Strengthen lifelong relationships while contributing to the growth of the alumni community.
                </p>
              </div>

              <div id="volunteer" className="about-block">
                <h2 className="section-headline">Volunteer</h2>
                <p>
                  Support the Institute by contributing your time, expertise, and experience to alumni programmes, student initiatives, and institutional activities. Your involvement helps build a stronger and more connected IIIT Pune community.
                </p>
              </div>

              <div id="share-achievements" className="about-block">
                <h2 className="section-headline">Share Achievements</h2>
                <p>
                  Celebrate your professional and personal milestones with the IIIT Pune community. Your achievements inspire current students and fellow alumni while showcasing the impact of our graduates.
                </p>
              </div>

              <div id="share-opportunities" className="about-block">
                <h2 className="section-headline">Share Opportunities</h2>
                <p>
                  Help fellow alumni and students grow by sharing job openings, internships, research positions, and entrepreneurial opportunities. Together, we can create a thriving professional network.
                </p>
              </div>

              <div id="mentor" className="about-block">
                <h2 className="section-headline">Mentor</h2>
                <p>
                  Guide the next generation of IIIT Pune students by sharing your knowledge, industry insights, and career experiences. Your mentorship can make a lasting difference in shaping future leaders.
                </p>
              </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AlumniGetInvolvedPage;
