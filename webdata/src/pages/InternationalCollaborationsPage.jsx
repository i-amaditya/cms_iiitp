import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const InternationalCollaborationsPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader 
        title="Partnership &amp; Exchange" 
        subtitle="Building global bridges through strategic student exchange programs, joint research publications, and dual-degree frameworks with leading international universities."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-8 md:p-12 international-relations-page">
          
          <div className="page-layout">
            
            {/* Left: Collaboration Tracks */}
            <section className="main-content-column">
              
              <div className="collab-block">
                <h2 className="section-headline">Student Exchange Programs (6 Months – 1 Year)</h2>
                <p>
                  Our premier exchange programs allow undergraduate and graduate scholars to spend one or two academic semesters studying 
                  at partner institutions. Credit transfer systems ensure that courses completed abroad count directly toward their degree 
                  completion at their home university.
                </p>
                <p><strong>Eligibility &amp; Guidelines:</strong></p>
                <ul className="list-disc pl-6 space-y-2 mb-4" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                  <li>Candidates must complete at least four semesters of their B.Tech curriculum before exchange commencement.</li>
                  <li>A cumulative CGPA of 8.0 or above with no standing academic backlogs is required.</li>
                  <li>Approval of mapped courses is mandatory by the respective department heads prior to travel.</li>
                </ul>
              </div>

              <div className="collab-block">
                <h2 className="section-headline">Joint &amp; Dual Degree Systems</h2>
                <p>
                  Designed for graduate and doctoral candidates, our joint and dual degree programs are structured alongside recognized 
                  international engineering schools. Scholars benefit from global co-mentorship on their dissertations and access to lab 
                  infrastructure across two campuses.
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                  <li><strong>Dual Degree:</strong> Upon completion, candidates receive separate certificates from IIIT Pune and the corresponding partner university.</li>
                  <li><strong>Joint Degree:</strong> A single, jointly-endorsed degree highlighting the collaborative thesis guide systems.</li>
                </ul>
              </div>

              <div className="collab-block">
                <h2 className="section-headline">Joint Research Collaborations</h2>
                <p>
                  Faculty members and doctoral candidates at IIIT Pune engage in funded international research projects. Key focus domains 
                  include low-power microelectronics, chip fabrication technologies, smart cities AI engines, and wireless communication protocols.
                </p>
                <p>
                  We actively call for summer and winter research fellowships, providing international students a pathway to work in our 
                  specialized computing laboratories alongside senior faculty mentors.
                </p>
              </div>

              <div className="collab-block">
                <h2 className="section-headline">Short-Term Delegations &amp; Faculty Exchange</h2>
                <p>
                  Short-term initiatives promote direct academic exposure. This includes guest lecture slots, joint workshop series, and 
                  summer schools hosted at IIIT Pune. Foreign delegations can coordinate visits through the IR Office.
                </p>
              </div>

            </section>

            {/* Right: Sidebar */}
            <aside className="sidebar-column">
              
              <div className="sidebar-widget">
                <h3 className="widget-title">Active MoUs</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '15px' }}>
                  IIIT Pune is expanding its global network of partner universities. For a list of active institutional agreements or 
                  to initiate a new MoU alignment, contact the IR Director.
                </p>
                <a href="mailto:ir@iiitp.ac.in" style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-accent)' }}>
                  Propose Partnership →
                </a>
              </div>

              <div className="sidebar-widget">
                <h3 className="widget-title">Visas &amp; Support</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  The IR Office provides official invitation letters and visa advisory documentation to foreign scholars and exchange 
                  students once their cohort selection is approved.
                </p>
              </div>

            </aside>

          </div>

        </div>
      </div>
    </div>
  );
};

export default InternationalCollaborationsPage;
