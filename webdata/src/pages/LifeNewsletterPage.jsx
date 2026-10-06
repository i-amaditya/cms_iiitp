import { useEffect } from 'react';
import { ExternalLink, Download } from 'lucide-react';
import LifePageLayout from '../components/life/LifePageLayout';

const newsletters = [
  {
    meta: "Volume 2 | Edition I | MAY-AUGUST 2026",
    title: "ECLECTIC TIMES",
    desc: (
      <>
        The third edition of <strong className="text-gray-800 dark:text-gray-200">ECLECTIC TIMES</strong> covers the latest developments at IIIT Pune,
        including student achievements, research highlights, cultural events, and campus activities. This edition also features interviews with
        prominent faculty members and showcases the innovative projects undertaken by students.
      </>
    ),
    link: "/newsletter-docs-images/Eclectic Times Volume 2 Edition I.pdf",
    downloadLink: "/newsletter-docs-images/Eclectic Times Volume 2 Edition I.pdf",
    img: "/newsletter-docs-images/Volume II - Edition 1.png"
  },
  {
    meta: "Volume 1 | Edition II | April 2026",
    title: "ECLECTIC TIMES",
    desc: (
      <>
         The first edition of <strong className="text-gray-800 dark:text-gray-200">ECLECTIC TIMES</strong> for Volume 2
          captures the vibrant academic, research, industry, international, and student
          activities at IIIT Pune. This edition highlights major research publications and
          funded projects, industry and academic collaborations, international engagements,
          expert talks, workshops, MoUs, hackathons, student competitions, sports activities,
          and new initiatives including NSS and TEDx IIIT Pune. It reflects the Institute’s
          continued commitment to innovation, excellence, collaboration, and the holistic
          development of its students and community.
      </>
    ),
    link: "/newsletter-docs-images/Newsletter Edition II.pdf",
    downloadLink: "/newsletter-docs-images/Newsletter Edition II.pdf",
    img: "/newsletter-docs-images/2.jpeg"
  },
  {
    meta: "Volume 1 | Edition I | November 2025",
    title: "ECLECTIC TIMES",
    desc: (
      <>
        <strong className="text-gray-800 dark:text-gray-200">ECLECTIC TIMES</strong> is the official newsletter showcasing the creativity,
        achievements, innovations, and experiences of the IIIT Pune community. It brings
        together stories, articles, campus events, student accomplishments, technical
        developments, and cultural highlights in one publication.
      </>
    ),
    link: "/newsletter-docs-images/Eclectic Times Vol.1.pdf",
    downloadLink: "/newsletter-docs-images/Eclectic Times Vol.1.pdf",
    img: "/newsletter-docs-images/1.jpeg"
  }
];

const LifeNewsletterPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LifePageLayout 
      title="Student Life" 
      subtitle="Discover the vibrant clubs, events, campus facilities, and extracurricular opportunities at IIIT Pune."
      breadcrumb="Life"
    >
      <div className="space-y-8">
        <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold font-serif text-gray-800 dark:text-white mb-2">Newsletters</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed text-justify">
            Explore the latest editions of institute newsletters, featuring student achievements,
            campus activities, technical innovations, events, creative contributions, and highlights
            from the vibrant IIIT Pune community.
          </p>
        </div>

        <div className="space-y-8">
          {newsletters.map((nl, idx) => (
            <div key={idx} className="flex flex-col md:flex-row bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
              <div className="flex-1 p-6 md:p-10 flex flex-col justify-center order-2 md:order-1">
                <span className="inline-block bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-4 border border-blue-100 dark:border-blue-800/50">
                  {nl.meta}
                </span>
                
                <h4 className="text-2xl font-bold font-serif text-gray-800 dark:text-white mb-4">
                  {nl.title}
                </h4>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 text-justify leading-relaxed">
                  {nl.desc}
                </p>
                
                <div className="flex flex-wrap gap-4 mt-auto">
                  <a 
                    href={nl.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    <ExternalLink size={16} />
                    View Newsletter
                  </a>
                  <a 
                    href={nl.downloadLink} 
                    download
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl text-sm font-bold transition-all shadow-sm hover:-translate-y-0.5"
                  >
                    <Download size={16} />
                    Download PDF
                  </a>
                </div>
              </div>
              
              <a 
                href={nl.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-2/5 lg:w-1/3 bg-[#f3f1e9] dark:bg-gray-800 flex shrink-0 border-b md:border-b-0 md:border-l border-gray-100 dark:border-gray-800 order-1 md:order-2 overflow-hidden relative cursor-pointer group"
                aria-label={`View ${nl.title} PDF`}
              >
                <img 
                  src={nl.img} 
                  alt={`${nl.title} Cover`} 
                  className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-90" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </LifePageLayout>
  );
};

export default LifeNewsletterPage;
