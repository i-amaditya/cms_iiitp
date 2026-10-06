import React from 'react';
import { Link } from 'react-router';
import PageHeader from '../components/shared/PageHeader';

const InternationalAboutPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader 
        title="About the IR Office" 
        subtitle="Guiding the global vision of the Indian Institute of Information Technology, Pune — driving partnerships, cross-border research, and supporting international students."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-8 md:p-12 international-relations-page">
          
          <div className="page-layout">
            
            {/* Left: Governance & Vision/Mission Details */}
            <section className="main-content-column">
              
              <div className="about-block">
                <h2 className="section-headline">Establishment &amp; Governance</h2>
                <p>
                  The International Relations Office (IRO) at IIIT Pune, established in June 2026, serves as the institute's dedicated office 
                  for fostering global engagement and international academic cooperation. The IRO facilitates the development of strategic 
                  partnerships with universities, research institutions, industry organizations, and governmental bodies worldwide. Its 
                  primary objectives include promoting international collaborations in research and innovation, enabling student and faculty 
                  exchange programs, supporting joint academic initiatives, and enhancing the institute's global outreach. Through these 
                  efforts, the IRO aims to create a vibrant international ecosystem that enriches academic excellence, cross-cultural 
                  learning, and global opportunities for the IIIT Pune community.
                </p>
                <p>
                  IIIT Pune represents the modern standard in engineering education in India, aiming to merge state-of-the-art information 
                  technology skillsets with industry-facing research programs.
                </p>
              </div>

              {/* Leadership Visions */}
              <div className="about-block">
                <h3 className="section-headline">Leadership Visions</h3>
                
                <div className="leadership-grid">
                  
                  <article className="leader-card">
                    <figure className="leader-figure">
                      <img src="/resources/director.jpg" alt="Prof. Vineet B Kansal" className="leader-photo" />
                      <figcaption>Prof. Vineet B Kansal</figcaption>
                    </figure>
                    <h4 className="leader-title">Director's Vision</h4>
                    <p className="leader-desc">
                      Prof. Vineet B Kansal envisions IIIT Pune as a globally respected institution of technology and research, 
                      committed to excellence in education, innovation, and international collaboration. He aims to cultivate an 
                      academic environment where students and faculty engage in meaningful global partnerships, interdisciplinary 
                      research, and industry-oriented initiatives that contribute to sustainable societal impact.
                    </p>
                  </article>

                  <article className="leader-card">
                    <figure className="leader-figure">
                      <img src="/resources/jatin_sir.jpg" alt="Dr. Jatin Majithia" className="leader-photo" />
                      <figcaption>Dr. Jatin Majithia</figcaption>
                    </figure>
                    <h4 className="leader-title">International Relations Head's Vision</h4>
                    <p className="leader-desc">
                      Dr. Jatin Majithia aims to strengthen IIIT Pune's international engagement through strategic academic 
                      partnerships, student and faculty mobility, and comprehensive support for global learners. His vision focuses 
                      on creating enduring collaborations, enhancing cross-cultural exchange, and providing a seamless international 
                      experience that enriches the institute's global reputation.
                    </p>
                  </article>

                </div>
              </div>

            </section>

            {/* Right: Sidebars */}
            <aside className="sidebar-column">
              
              <div className="sidebar-widget">
                <h3 className="widget-title">Quick Actions</h3>
                <ul className="quick-links-list">
                  <li><Link to="/international/academics">Academic Programs</Link></li>
                  <li><Link to="/international/collaborations">Exchanges &amp; Joint Degrees</Link></li>
                  <li><Link to="/international/contact">Locate Permanent Campus</Link></li>
                  <li><a href="mailto:ir@iiitp.ac.in">Email the Advisor</a></li>
                </ul>
              </div>

              <div className="sidebar-widget">
                <h3 className="widget-title">Our Focus Areas</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  The International Relations (IR) Office coordinates the establishment of new international MoUs, foreign student 
                  integration support, and credit-transfer advisory services for our outgoing exchange cohorts.
                </p>
              </div>

            </aside>

          </div>

        </div>
      </div>
    </div>
  );
};

export default InternationalAboutPage;
