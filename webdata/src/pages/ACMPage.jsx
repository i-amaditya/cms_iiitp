import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const ACMPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="ACM SIGCHI" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">


          <div className="p-8 md:p-12">

            {/* Top Row: About & Gallery */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              
              {/* About */}
              <section className="lg:col-span-2">
                <h3 className="text-3xl font-bold text-primary dark:text-white mb-6 pb-2">
                  About ACM-SIGCHI
                </h3>

              <div className="space-y-5 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  The Special Interest Group on Computer-Human Interaction
                  (SIGCHI) is the global hub for research and practice in
                  Human-Computer Interaction (HCI), UX Design, and User
                  Experience (UX).
                </p>

                <p>
                  We are the student division of ACM SIGCHI at IIIT Pune,
                  serving as a pre-professional incubator that equips students
                  with the specific knowledge, practical skills, industry
                  connections, and professional credentials necessary to
                  transition successfully into careers in technology and design.
                </p>
              </div>
              </section>

              {/* Gallery Section */}
              <section className="lg:col-span-1">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 h-full">
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {/* Image Placeholder 1 */}
                    <a href="/images/acm-1.jpg" target="_blank" rel="noopener noreferrer" className="block group relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 aspect-video flex flex-col items-center justify-center transition-all hover:shadow-md cursor-pointer">
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                        <svg className="w-8 h-8 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">Add Photo</span>
                      </div>
                    </a>

                    {/* Image Placeholder 2 */}
                    <a href="/images/acm-2.jpg" target="_blank" rel="noopener noreferrer" className="block group relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 aspect-video flex flex-col items-center justify-center transition-all hover:shadow-md cursor-pointer">
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                        <svg className="w-8 h-8 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">Add Photo</span>
                      </div>
                    </a>

                    {/* Image Placeholder 3 */}
                    <a href="/images/acm-3.jpg" target="_blank" rel="noopener noreferrer" className="block group relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 aspect-square flex flex-col items-center justify-center transition-all hover:shadow-md cursor-pointer">
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                        <svg className="w-8 h-8 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">Add Photo</span>
                      </div>
                    </a>
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
                  <h4 className="font-semibold text-emerald-800 mb-2">
                    UX / HCI Workshops
                  </h4>
                  <p className="text-gray-600">
                    Learn practical tools and methodologies used in Human
                    Computer Interaction and User Experience design.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-200 hover:border-emerald-500 hover:shadow-xl transition-all">
                  <h4 className="font-semibold text-emerald-800 mb-2">
                    Design Sprints & Hackathons
                  </h4>
                  <p className="text-gray-600">
                    Apply your skills in fast-paced collaborative design and
                    innovation challenges.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-200 hover:border-emerald-500 hover:shadow-xl transition-all">
                  <h4 className="font-semibold text-emerald-800 mb-2">
                    Research Exposure
                  </h4>
                  <p className="text-gray-600">
                    Participate in cutting-edge HCI and design research
                    projects.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-200 hover:border-emerald-500 hover:shadow-xl transition-all">
                  <h4 className="font-semibold text-emerald-800 mb-2">
                    ACM Digital Library Access
                  </h4>
                  <p className="text-gray-600">
                    Gain access to millions of research papers and technical
                    publications.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-200 hover:border-emerald-500 hover:shadow-xl transition-all">
                  <h4 className="font-semibold text-emerald-800 mb-2">
                    Guest Lectures
                  </h4>
                  <p className="text-gray-600">
                    Interact with leading UX Designers, Researchers and
                    Industry Experts.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-200 hover:border-emerald-500 hover:shadow-xl transition-all">
                  <h4 className="font-semibold text-emerald-800 mb-2">
                    Publication Opportunities
                  </h4>
                  <p className="text-gray-600">
                    Receive guidance for publishing research work at
                    international conferences.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-200 hover:border-emerald-500 hover:shadow-xl transition-all md:col-span-2">
                  <h4 className="font-semibold text-emerald-800 mb-2">
                    Certifications
                  </h4>
                  <p className="text-gray-600">
                    Access resources and opportunities to earn professional
                    certifications relevant to the industry.
                  </p>
                </div>

              </div>
            </section>

            {/* How To Join */}
            <section className="mb-12">
              <h3 className="text-3xl font-bold text-primary dark:text-white mb-6 pb-2">
                How to Join
              </h3>

              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Joining is easy! Register through the ACM Student Membership
                portal and complete the Google Form.
              </p>

              <div className="space-y-4">

                <div>
                  <span className="font-semibold text-primary dark:text-white">
                    ACM Student Membership:
                  </span>
                  <br />
                  <a
                    href="https://services.acm.org/public/qj/prod/quickjoin/qjcontrol.cfm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    ACM Quick Join Application Form
                  </a>
                </div>

                <div>
                  <span className="font-semibold text-primary dark:text-white">
                    Registration Form:
                  </span>
                  <br />
                  <a
                    href="https://forms.gle/CyC8gqfqhFFDfAdm6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    https://forms.gle/CyC8gqfqhFFDfAdm6
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
                    Saurav Dabhade
                  </h4>
                  <p className="text-sm text-brand-red mb-2">Chair</p>
                  <a
                    href="mailto:sauravdabhade@acm.org"
                    className="text-blue-600 hover:underline break-all"
                  >
                    sauravdabhade@acm.org
                  </a>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
                  <h4 className="font-semibold text-primary dark:text-white">
                    Roshni Sahoo
                  </h4>
                  <p className="text-sm text-brand-red mb-2">Vice Chair</p>
                  <a
                    href="mailto:212515011@cse.iiitp.ac.in"
                    className="text-blue-600 hover:underline break-all"
                  >
                    212515011@cse.iiitp.ac.in
                  </a>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
                  <h4 className="font-semibold text-primary dark:text-white">
                    Piyush Kulkarni
                  </h4>
                  <p className="text-sm text-brand-red mb-2">Membership Lead</p>
                  <a
                    href="mailto:112316021@ece.iiitp.ac.in"
                    className="text-blue-600 hover:underline break-all"
                  >
                    112316021@ece.iiitp.ac.in
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
                  <strong>Website:</strong>{' '}
                  <a
                    href="https://iiitpsigchi.acm.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    https://iiitpsigchi.acm.org
                  </a>
                </p>

                <p>
                  <strong>LinkedIn:</strong>{' '}
                  <a
                    href="https://www.linkedin.com/company/iiitpsigchi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    https://www.linkedin.com/company/iiitpsigchi/
                  </a>
                </p>

                <p>
                  <strong>Instagram:</strong>{' '}
                  <a
                    href="https://www.instagram.com/iiitp.sigchi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    https://www.instagram.com/iiitp.sigchi
                  </a>
                </p>

                <p>
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:acm.chapter@iiitp.ac.in"
                    className="text-blue-600 hover:underline break-all"
                  >
                    acm.chapter@iiitp.ac.in
                  </a>
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ACMPage;
