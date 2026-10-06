import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const IEEEPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="IEEE Student Branch" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">


          <div className="p-8 md:p-12">

            {/* Top Row: About & Gallery */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              
              {/* About IEEE */}
              <section className="lg:col-span-2">
                <h3 className="text-3xl font-bold text-primary dark:text-white mb-6 pb-2">
                  About IEEE
                </h3>

              <div className="space-y-5 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  IEEE (Institute of Electrical and Electronics Engineers) is
                  the world's largest technical professional organization
                  dedicated to advancing technology for humanity.
                </p>

                <p>
                  The IEEE Student Branch at IIIT Pune is a dynamic community
                  that fosters innovation, technical excellence, research
                  culture, and professional development among students.
                </p>

                <p>
                  Our branch serves as a platform for students to explore
                  emerging technologies, collaborate on impactful ideas, and
                  gain exposure beyond the classroom. Through expert talks,
                  technical sessions, industry collaborations, workshops,
                  hackathons, and conferences, IEEE SB IIIT Pune bridges the
                  gap between academia and real-world innovation.
                </p>

                <p>
                  We aim to cultivate a culture of curiosity, leadership, and
                  hands-on learning while empowering students to become
                  future-ready engineers, researchers, and innovators.
                </p>
              </div>
              </section>

              {/* Gallery Section */}
              <section className="lg:col-span-1">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 h-full">
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <a key={num} href={`/ieee/ieee_${num}.jpeg`} target="_blank" rel="noopener noreferrer" className="block group relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 aspect-video transition-all hover:shadow-md cursor-pointer">
                        <img 
                          src={`/ieee/ieee_${num}.jpeg`} 
                          alt={`IEEE Event ${num}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* What We Do */}
            <section className="mb-12 bg-green-900 rounded-2xl p-6 md:p-8">
              <h3 className="text-3xl font-bold text-emerald-100 mb-6 pb-2">
                What We Do
              </h3>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-200 hover:border-emerald-500 hover:shadow-xl transition-all">
                  <h4 className="font-semibold text-lg text-emerald-800 mb-2">
                    Expert Talks & Speaker Sessions
                  </h4>
                  <p className="text-gray-600">
                    Interact with distinguished professionals, researchers,
                    entrepreneurs, and industry leaders from diverse technical
                    domains.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-200 hover:border-emerald-500 hover:shadow-xl transition-all">
                  <h4 className="font-semibold text-lg text-emerald-800 mb-2">
                    Industry Collaborations
                  </h4>
                  <p className="text-gray-600">
                    Connect students with companies and professionals through
                    technical interactions, mentorship opportunities, and
                    practical insights.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-200 hover:border-emerald-500 hover:shadow-xl transition-all">
                  <h4 className="font-semibold text-lg text-emerald-800 mb-2">
                    Hackathons & Innovation Challenges
                  </h4>
                  <p className="text-gray-600">
                    Organize competitive and collaborative events that encourage
                    creativity, innovation, and problem-solving.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-200 hover:border-emerald-500 hover:shadow-xl transition-all">
                  <h4 className="font-semibold text-lg text-emerald-800 mb-2">
                    Technical Conferences & Research Initiatives
                  </h4>
                  <p className="text-gray-600">
                    Promote research culture through conferences, paper
                    presentations, technical discussions, and knowledge-sharing
                    sessions.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-200 hover:border-emerald-500 hover:shadow-xl transition-all">
                  <h4 className="font-semibold text-lg text-emerald-800 mb-2">
                    Workshops & Skill Development
                  </h4>
                  <p className="text-gray-600">
                    Conduct hands-on workshops on cutting-edge technologies,
                    development tools, and industry-relevant skills.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-200 hover:border-emerald-500 hover:shadow-xl transition-all">
                  <h4 className="font-semibold text-lg text-emerald-800 mb-2">
                    Networking Opportunities
                  </h4>
                  <p className="text-gray-600">
                    Build meaningful connections with professionals, IEEE
                    communities, and fellow innovators across domains.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-200 hover:border-emerald-500 hover:shadow-xl transition-all">
                  <h4 className="font-semibold text-lg text-emerald-800 mb-2">
                    Leadership & Team Building
                  </h4>
                  <p className="text-gray-600">
                    Develop communication, management, and organizational
                    skills through active participation in branch activities.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-200 hover:border-emerald-500 hover:shadow-xl transition-all">
                  <h4 className="font-semibold text-lg text-emerald-800 mb-2">
                    Community & Technical Outreach
                  </h4>
                  <p className="text-gray-600">
                    Encourage initiatives that inspire technological awareness,
                    learning, and innovation-driven growth.
                  </p>
                </div>

              </div>
            </section>

            {/* How to Join */}
            <section className="mb-12">
              <h3 className="text-3xl font-bold text-primary dark:text-white mb-6 pb-2">
                How to Join
              </h3>

              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Joining IEEE is simple! Become a part of a global network of
                innovators, researchers, and technology enthusiasts by
                registering through the official IEEE membership portal.
              </p>

              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-primary dark:text-white">
                    IEEE Membership:
                  </span>
                  <br />
                  <a
                    href="https://www.ieee.org/membership/join/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    https://www.ieee.org/membership/join/
                  </a>
                </div>

                <div>
                  <span className="font-semibold text-primary dark:text-white">
                    IEEE SB IIIT Pune Registration Form:
                  </span>
                  <br />
                  <a
                    href="https://forms.gle/BUy9B7BW5rzj9gm28"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    https://forms.gle/BUy9B7BW5rzj9gm28
                  </a>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h3 className="text-3xl font-bold text-primary dark:text-white mb-6 pb-2">
                Contact Us
              </h3>

              <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
                  <h4 className="font-semibold text-primary dark:text-white">
                    Avani Yadav
                  </h4>
                  <p className="text-sm text-brand-red mb-2">Chair</p>
                  <a
                    href="mailto:112315037@cse.iiitp.ac.in"
                    className="text-blue-600 hover:underline break-all"
                  >
                    112315037@cse.iiitp.ac.in
                  </a>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
                  <h4 className="font-semibold text-primary dark:text-white">
                    Manas Vyas
                  </h4>
                  <p className="text-sm text-brand-red mb-2">Vice Chair</p>
                  <a
                    href="mailto:112415121@cse.iiitp.ac.in"
                    className="text-blue-600 hover:underline break-all"
                  >
                    112415121@cse.iiitp.ac.in
                  </a>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
                  <h4 className="font-semibold text-primary dark:text-white">
                    Jaskaran Singh
                  </h4>
                  <p className="text-sm text-brand-red mb-2">
                    Membership Head
                  </p>
                  <a
                    href="mailto:112415090@cse.iiitp.ac.in"
                    className="text-blue-600 hover:underline break-all"
                  >
                    112415090@cse.iiitp.ac.in
                  </a>
                </div>

              </div>
            </section>

            {/* Follow Us */}
            <section>
              <h3 className="text-3xl font-bold text-primary dark:text-white mb-6 pb-2">
                Follow Us & Stay Updated
              </h3>

              <div className="space-y-4 text-gray-700 dark:text-gray-300">

                <p>
                  <strong>Website:</strong> Website Link will be updated soon
                </p>

                <p>
                  <strong>Instagram:</strong>{' '}
                  <a
                    href="https://www.instagram.com/ieee_iiitp?igsh=aWNneTBwYmNnbWEz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    https://www.instagram.com/ieee_iiitp
                  </a>
                </p>

                <p>
                  <strong>LinkedIn:</strong>{' '}
                  <a
                    href="https://www.linkedin.com/company/ieee-iiitp-student-branch/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    https://www.linkedin.com/company/ieee-iiitp-student-branch/
                  </a>
                </p>

                <p>
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:ieee@iiitp.ac.in"
                    className="text-blue-600 hover:underline"
                  >
                    ieee@iiitp.ac.in
                  </a>
                </p>

              </div>
            </section>

            <div className="mt-16 text-right text-sm text-gray-500 dark:text-gray-400">
              Last Updated: 20-06-2026
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default IEEEPage;
