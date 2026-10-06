import React from 'react';
import { Link } from 'react-router';
import PageHeader from '../components/shared/PageHeader';

const InternationalAcademicsPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader 
        title="Academic Offerings" 
        subtitle="IIIT Pune offers cutting-edge curriculum tracks designed to meet international standards. Explore our undergraduate, postgraduate, and research degrees."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-8 md:p-12 international-relations-page">
          
          <div className="page-layout">
            
            {/* Left: Course Directories */}
            <section className="main-content-column">
              
              <div className="academic-block">
                <h2 className="section-headline">Undergraduate Curriculum (B.Tech)</h2>
                <p>
                  Our four-year Bachelor of Technology (B.Tech) programs are designed to provide a deep theoretical foundation alongside 
                  extensive practical labs. Ideal for student exchange candidates, our credits map to top international universities.
                </p>
                
                <table className="program-table">
                  <thead>
                    <tr>
                      <th style={{ width: '20%' }}>Degree</th>
                      <th style={{ width: '35%' }}>Branch</th>
                      <th style={{ width: '45%' }}>Core Areas Covered</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-label="Degree"><span className="badge-degree badge-degree--btech">B.Tech</span></td>
                      <td data-label="Branch"><strong>Computer Science &amp; Engineering</strong></td>
                      <td data-label="Core Areas Covered">Algorithms, software design, distributed computing, database management, and operating systems.</td>
                    </tr>
                    <tr>
                      <td data-label="Degree"><span className="badge-degree badge-degree--btech">B.Tech</span></td>
                      <td data-label="Branch"><strong>Electronics &amp; Communication Engineering</strong></td>
                      <td data-label="Core Areas Covered">Signal processing, wireless communications, embedded systems, networks, and optical communication.</td>
                    </tr>
                    <tr>
                      <td data-label="Degree"><span className="badge-degree badge-degree--btech">B.Tech</span></td>
                      <td data-label="Branch"><strong>Cyber Security</strong></td>
                      <td data-label="Core Areas Covered">Cryptography, network security protocols, forensic analysis, cyber laws, and ethical hacking.</td>
                    </tr>
                    <tr>
                      <td data-label="Degree"><span className="badge-degree badge-degree--btech">B.Tech</span></td>
                      <td data-label="Branch"><strong>Microelectronics &amp; VLSI</strong></td>
                      <td data-label="Core Areas Covered">Semiconductor devices, analog integrated circuit design, CAD tools, physical design, and testing.</td>
                    </tr>
                    <tr>
                      <td data-label="Degree"><span className="badge-degree badge-degree--btech">B.Tech</span></td>
                      <td data-label="Branch"><strong>AI &amp; Data Science</strong></td>
                      <td data-label="Core Areas Covered">Machine learning, data analytics, statistics, deep learning, and natural language processing models.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="academic-block">
                <h2 className="section-headline">Postgraduate Curriculum (M.Tech)</h2>
                <p>
                  The Master of Technology (M.Tech) program offers specialization-focused tracks for candidates looking to enter 
                  advanced research or design domains. Joint degrees and research exchanges are heavily aligned with these offerings.
                </p>
                
                <table className="program-table">
                  <thead>
                    <tr>
                      <th style={{ width: '20%' }}>Degree</th>
                      <th style={{ width: '35%' }}>Specialization</th>
                      <th style={{ width: '45%' }}>Core Areas Covered</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-label="Degree"><span className="badge-degree badge-degree--mtech">M.Tech</span></td>
                      <td data-label="Specialization"><strong>Artificial Intelligence</strong></td>
                      <td data-label="Core Areas Covered">Advanced ML algorithms, robotics, computer vision, optimization models, and AI system design.</td>
                    </tr>
                    <tr>
                      <td data-label="Degree"><span className="badge-degree badge-degree--mtech">M.Tech</span></td>
                      <td data-label="Specialization"><strong>VLSI Design</strong></td>
                      <td data-label="Core Areas Covered">ASIC design flow, CAD algorithms, low-power VLSI design, mixed-signal designs, and testing methodology.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="academic-block">
                <h2 className="section-headline">Doctoral Program (Ph.D.)</h2>
                <p>
                  Our doctoral research program welcomes scholars from around the world. With opportunities for dual-guided dissertations, 
                  candidate thesis systems can be structured with international partner faculty.
                </p>
                
                <table className="program-table">
                  <thead>
                    <tr>
                      <th style={{ width: '20%' }}>Degree</th>
                      <th style={{ width: '35%' }}>Research Domain</th>
                      <th style={{ width: '45%' }}>Key Research Frontiers</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-label="Degree"><span className="badge-degree badge-degree--phd">Ph.D.</span></td>
                      <td data-label="Research Domain"><strong>Computer Science</strong></td>
                      <td data-label="Key Research Frontiers">Cloud systems, distributed algorithms, data structures, and compiler optimization methods.</td>
                    </tr>
                    <tr>
                      <td data-label="Degree"><span className="badge-degree badge-degree--phd">Ph.D.</span></td>
                      <td data-label="Research Domain"><strong>Artificial Intelligence</strong></td>
                      <td data-label="Key Research Frontiers">Deep learning theories, reinforcement learning, computer vision, NLP, and Explainable AI.</td>
                    </tr>
                    <tr>
                      <td data-label="Degree"><span className="badge-degree badge-degree--phd">Ph.D.</span></td>
                      <td data-label="Research Domain"><strong>Data Science</strong></td>
                      <td data-label="Key Research Frontiers">Large-scale big data engines, statistical inferences, pattern mining, and visual analytics.</td>
                    </tr>
                    <tr>
                      <td data-label="Degree"><span className="badge-degree badge-degree--phd">Ph.D.</span></td>
                      <td data-label="Research Domain"><strong>Mathematics</strong></td>
                      <td data-label="Key Research Frontiers">Computational linear algebra, modeling, operations research, optimization theory, and pure algebra.</td>
                    </tr>
                    <tr>
                      <td data-label="Degree"><span className="badge-degree badge-degree--phd">Ph.D.</span></td>
                      <td data-label="Research Domain"><strong>English Literature</strong></td>
                      <td data-label="Key Research Frontiers">Interdisciplinary literature studies, modern digital communications, linguistic structures, and cultural reviews.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </section>

            {/* Right: Sidebar */}
            <aside className="sidebar-column">
              
              <div className="sidebar-widget">
                <h3 className="widget-title">Admissions &amp; Exchange</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  International candidates seeking student exchanges (6mo - 1yr), dual-degree registrations, or Ph.D. affiliations must 
                  coordinate through their home university's international division.
                </p>
                <Link to="/international/collaborations" style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-accent)' }}>
                  Exchange Pathways →
                </Link>
              </div>

              <div className="sidebar-widget">
                <h3 className="widget-title">Need Guidance?</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '15px' }}>
                  The Academic Liaison at the IR office answers questions regarding credit mappings, semester structures, and transcript issues.
                </p>
                <Link to="/international/contact" style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                  Contact Liaison →
                </Link>
              </div>

            </aside>

          </div>

        </div>
      </div>
    </div>
  );
};

export default InternationalAcademicsPage;
