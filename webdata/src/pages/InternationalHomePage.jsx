import React from 'react';
import { Link } from 'react-router';
import PageHeader from '../components/shared/PageHeader';
import Slideshow from '../components/shared/InternationalSlideshow';

const InternationalHomePage = () => {
  return (
    <div className="w-full flex-grow flex flex-col min-h-screen transition-colors duration-200">
      <PageHeader 
        title="Global Academic Excellence" 
        subtitle="Welcoming scholars, researchers, and students from across the globe to the Indian Institute of Information Technology, Pune. Discover international partnerships, research grants, and exchanges."
      />
      
      <div className="international-relations-page flex-grow flex flex-col">
      {/* Main Landing Section */}
      <main className="section-padding">
        <div className="container">
          
          {/* Slideshow Component */}
          <Slideshow />

          {/* Landing Two-Column Layout */}
          <div className="landing-grid">
            
            {/* Primary Feed: What's New */}
            <section className="main-content-column">
              <h2 className="section-headline">What's New &amp; Announcements</h2>
              
              <div className="news-feed">
                  <article className="news-item bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-l-4 border-blue-600 mb-6 transition-shadow hover:shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    IIIT Pune Explores Academic Collaboration with Aivancity, Paris 
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 mb-3 uppercase tracking-wider">28th August 2026</div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                    IIIT Pune hosted Prof. (Dr.) Amod Bhat from Aivancity School of AI & Data for Business & Society, Paris, for discussions aimed at strengthening India–France academic collaboration. The institutional interaction explored opportunities for joint research in AI, technology and business, student and faculty exchanges, academic partnerships, and potential dual-degree programmes.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                    Prof. Bhat also interacted with students on the future of Artificial Intelligence, discussing its impact on startups and entrepreneurship, emerging career opportunities, innovation, and the importance of responsible and ethical AI for societal benefit. 
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                    The visit strengthened IIIT Pune’s growing international academic outreach and aligns with SDG 4 – Quality Education, SDG 9 – Industry, Innovation and Infrastructure, and SDG 17 – Partnerships for the Goals.                 
                  </p>
                </article>
                <article className="news-item bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-l-4 border-blue-600 mb-6 transition-shadow hover:shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Campus France Delegate Visits IIIT Pune to Explore Academic Collaboration with France
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 mb-3 uppercase tracking-wider">19th August 2026</div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                    IIIT Pune welcomed Ms Rini Abraham, Campus France Manager, Pune, for a visit aimed at exploring avenues for academic collaboration between IIIT Pune and institutions in France. The visit formed part of the Institutes ongoing efforts to strengthen its international partnerships and expand opportunities for students and faculty.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                    Ms Abraham arrived at the campus at 3:00 PM and began her visit with an interactive session with the Director, IIIT Pune, and the Faculty In-Charge, International Relations, IIIT Pune, where the two sides discussed the scope of potential collaboration and the broader landscape of Indo-French academic partnerships.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                    This was followed by an interaction with students from 3:30 PM to 4:15 PM, during which Ms Abraham shared insights on study, research, and exchange opportunities available to Indian students in France, and responded to student queries on the application process and available programmes.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                    From 4:15 PM to 5:00 PM, Ms Abraham met with faculty members to discuss possible collaboration avenues with French institutions, including areas for joint research, student and faculty exchange, and future partnership programmes.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                    The visit concluded with a de-briefing meeting with the Director, IIIT Pune, from 5:00 PM to 5:30 PM, where the outcomes of the day's discussions were reviewed and possible next steps for collaboration with French institutions were outlined. Ms Abraham departed from the campus at 5:30 PM.
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                    The visit reflects IIIT Pune's continued commitment to fostering global academic partnerships and creating international opportunities for its students and faculty.
                  </p>
                </article>
                <article className="news-item bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-l-4 border-blue-600 mb-6 transition-shadow hover:shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Visit of South Korean Delegates — Indo-Korean Center, Pune
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 mb-3 uppercase tracking-wider">14 July 2026</div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                    A delegation from the Indo-Korean Center, Pune, comprising Dr. Lim Eunjoo and Mr. Sanjib Ghatak, visited IIIT Pune to explore avenues for academic, research, and cultural collaboration between India and South Korea. Discussions identified priorities including student and faculty exchange programs, joint research projects, and structured pathways for student employability in Korea.
                  </p>
                  <a href="/assets/lifepage/IIIT_Pune_Korean_Visit_Report_Brief.pdf" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors">
                    Read Full Report →
                  </a>
                </article>
              </div>
            </section>

            {/* Sidebar Widgets */}
            <aside className="sidebar-column">
              
              <div className="sidebar-widget">
                <h3 className="widget-title">IR Office Services</h3>
                <ul className="quick-links-list">
                  <li><Link to="/international/about">Learn About the IR Office</Link></li>
                  <li><Link to="/international/academics">Academic Curriculum &amp; Programs</Link></li>
                  <li><Link to="/international/collaborations">Joint Degrees &amp; Exchanges</Link></li>
                  <li><Link to="/international/contact">Virtual Office Hours &amp; Advisors</Link></li>
                </ul>
              </div>

              <div className="sidebar-widget">
                <h3 className="widget-title">Important Resources</h3>
                <ul className="quick-links-list">
                  <li><a href="https://iiitp.ac.in" target="_blank" rel="noopener noreferrer">Main IIIT Pune Portal ↗</a></li>
                  <li><a href="https://education.gov.in" target="_blank" rel="noopener noreferrer">Ministry of Education, GoI ↗</a></li>
                  <li><a href="https://www.maharashtra.gov.in" target="_blank" rel="noopener noreferrer">Govt. of Maharashtra ↗</a></li>
                  <li><Link to="/international/contact">Campus Direction &amp; Coordinates</Link></li>
                </ul>
              </div>

            </aside>

          </div>
        </div>
      </main>

      {/* Institutional Stats Strip */}
      <section className="stats-strip">
        <div className="container stats-grid">
          <div className="stat-box">
            <h3>12+</h3>
            <p>Global Academic Options</p>
          </div>
          <div className="stat-box">
            <h3>5</h3>
            <p>Collaboration Pathways</p>
          </div>
          <div className="stat-box">
            <h3>3</h3>
            <p>Graduate Level Credentials</p>
          </div>
        </div>
      </section>

      {/* Audience Pathways */}
      <section className="section-padding bg-light">
        <div className="container">
          <h2 className="section-headline text-center">Resources for our Community</h2>
          <div className="audience-cards">
            
            <div className="audience-card">
              <div className="audience-icon">🎓</div>
              <h3 className="audience-title">For Exchange Students</h3>
              <p className="audience-desc">Explore B.Tech, M.Tech, and Ph.D. directories, credit structures, and study pathways at IIIT Pune.</p>
              <Link to="/international/academics" className="audience-link">View Programs →</Link>
            </div>

            <div className="audience-card">
              <div className="audience-icon">🔬</div>
              <h3 className="audience-title">For Scholars &amp; Researchers</h3>
              <p className="audience-desc">Discover joint research funding, Ph.D. co-mentoring alignments, and dual-degree pathways.</p>
              <Link to="/international/collaborations" className="audience-link">Explore Opportunities →</Link>
            </div>

            <div className="audience-card">
              <div className="audience-icon">🌍</div>
              <h3 className="audience-title">For Academic Partners</h3>
              <p className="audience-desc">Establish formal exchange MoUs, joint thesis systems, or technical partnership programs with us.</p>
              <Link to="/international/contact" className="audience-link">Partner With Us →</Link>
            </div>

          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default InternationalHomePage;
