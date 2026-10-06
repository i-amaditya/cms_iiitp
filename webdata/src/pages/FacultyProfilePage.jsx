import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import PageHeader from '../components/shared/PageHeader';
import {
  FileText, ArrowLeft, Mail, Phone, BookOpen, GraduationCap,
  Link as LinkIcon, User, Award, Presentation, Briefcase, Users,
  ChevronRight, ChevronLeft
} from 'lucide-react';

const LinkedinIcon = ({ className }) => (
  <svg
    className={className}
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 382.00 382.00"
    xmlSpace="preserve"
    fill="#000000"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(0,0), scale(1)"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="3.056"></g>
    <g id="SVGRepo_iconCarrier">
      <path style={{ fill: '#0077B7' }} d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889 C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056 H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806 c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1 s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73 c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079 c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426 c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472 L341.91,330.654L341.91,330.654z"></path>
    </g>
  </svg>
);



import { fetchCmsFaculty, resolveFacultyAssetUrl } from '../api/facultyCms';

const normalizeResearchLinks = (links = []) => {
  return (links || [])
    .map((link) => {
      if (typeof link === 'string') {
        const trimmed = link.trim();
        return trimmed ? { title: trimmed, url: trimmed } : null;
      }

      if (link && typeof link === 'object') {
        const url = link.url || link.link || '';
        const title = link.title || url || 'External link';
        return url ? { title, url } : null;
      }

      return null;
    })
    .filter(Boolean);
};

const normalizePublications = (entries = []) => {
  const items = Array.isArray(entries)
    ? entries
    : typeof entries === 'string'
      ? entries.split(/\n\n+/).filter(Boolean)
      : [];

  return items
    .map((item) => {
      if (typeof item === 'string') {
        const title = item.trim();
        return title ? { title, authors: '', journal: '', link: '' } : null;
      }

      if (item && typeof item === 'object') {
        const title = (item.title || '').trim();
        if (!title) {
          return null;
        }

        return {
          title,
          authors: item.authors || '',
          journal: item.journal || '',
          link: item.link || item.url || '',
        };
      }

      return null;
    })
    .filter(Boolean);
};

const FacultyProfilePage = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('biography');
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadedSlug, setLoadedSlug] = useState('');
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetchCmsFaculty(`/api/public/faculty/${encodeURIComponent(slug || '')}`, {
      signal: controller.signal,
    })
      .then((details) => {
        const source = details.source_data || {};
        const departmentSlug = details.department_slug || source.department?.toLowerCase() || '';
        const departmentNames = {
          cse: 'Computer Science & Engineering',
          ece: 'Electronics & Communication Engineering',
          ash: 'Applied Sciences & Humanities',
        };
        const publications = details.publications?.length
          ? details.publications.map((item) => ({
              title: item.title,
              authors: item.authors || '',
              journal: item.journal_or_conference || item.journal || '',
              link: item.url || item.doi || '',
            }))
          : source.publications;
        const patents = details.patents?.length
          ? details.patents.map((item) => ({
              title: item.title,
              authors: item.inventors || '',
              journal: item.status || '',
              link: item.url || '',
            }))
          : source.patents;

        const normalizedResearchLinks = normalizeResearchLinks(source.researchLinks);
        const otherLinks = normalizedResearchLinks.filter(({ title, url }) => {
          const lower = `${title} ${url}`.toLowerCase();
          return !lower.includes('scholar.google') && !lower.includes('orcid') && !lower.includes('scopus');
        });

        setProfile({
          ...source,
          name: details.full_name,
          designation: details.designation || source.designation || 'Faculty Member',
          department: details.department_name || departmentNames[departmentSlug] || 'Faculty Member',
          departmentSlug,
          image: resolveFacultyAssetUrl(details.profile_photo || source.image),
          email: details.email || source.email || '',
          phone: details.phone || source.phone || '',
          linkedin: details.linkedin_url || source.linkedin || '',
          education: source.education || details.highest_qualification || '',
          bio: details.biography || source.bio || '',
          publications: normalizePublications(publications),
          patents: patents || '',
          google_scholar: details.google_scholar_url || source.google_scholar || '',
          orcid: details.orcid_url || source.orcid || '',
          scopus: details.scopus_url || source.scopus || '',
          researchLinks: otherLinks,
          books_chapters: source.books_chapters || '',
          seminars: source.seminars || '',
          projects: source.projects || '',
          supervisions: source.supervisions || '',
          resume: resolveFacultyAssetUrl(source.resume),
        });
        setLoadError('');
        setLoadedSlug(slug || '');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setLoadError(error.message || 'Unable to load this faculty profile.');
          setProfile(null);
          setLoadedSlug(slug || '');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [slug]);

  // Tab Scrolling Logic
  const tabsRef = useRef(null);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const [showLeftScroll, setShowLeftScroll] = useState(false);

  const handleScroll = () => {
    if (!tabsRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
    setShowLeftScroll(scrollLeft > 0);
    // 5px threshold to account for rounding errors
    setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    // Initial check
    setTimeout(handleScroll, 100);
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const scrollTabs = (dir) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' });
    }
  };

  if (loading || loadedSlug !== (slug || '')) {
    return <div role="status" className="mx-auto max-w-6xl px-4 py-20 text-center text-gray-600 dark:text-gray-300">Loading faculty profile…</div>;
  }

  if (loadError || !profile) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p role="alert" className="mb-5 text-gray-700 dark:text-gray-300">
          {loadError || 'Faculty profile not found.'}
        </p>
        <Link to="/people/faculty" className="font-semibold text-primary hover:underline">Back to all faculty</Link>
      </div>
    );
  }

  const tabs = [
    { id: 'biography', label: 'Biography', icon: <User className="w-4 h-4 mr-2" /> },
    { id: 'books', label: 'Book/Chapter', icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { id: 'publications', label: 'Publications', icon: <FileText className="w-4 h-4 mr-2" /> },
    { id: 'patents', label: 'Patent', icon: <Award className="w-4 h-4 mr-2" /> },
    { id: 'seminars', label: 'Seminars/Workshops', icon: <Presentation className="w-4 h-4 mr-2" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-4 h-4 mr-2" /> },
    { id: 'supervisions', label: 'Supervisions', icon: <Users className="w-4 h-4 mr-2" /> },
    { id: 'research', label: 'Research & Links', icon: <LinkIcon className="w-4 h-4 mr-2" /> },
  ];

  const renderListContent = (content) => {
    if (!content) return null;

    let items = [];
    if (Array.isArray(content)) {
      items = content;
    } else if (typeof content === 'string') {
      items = content.split(/\n\n+/).filter(Boolean).map(text => ({ title: text.trim() }));
    }

    return (
      <ul className="space-y-6">
        {items.map((item, idx) => (
          <li key={idx} className="flex flex-col relative pl-6">
            <span className="absolute left-0 top-2 w-2 h-2 rounded-full bg-brand-red"></span>
            {item.link ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-gray-900 dark:text-white hover:text-brand-red dark:hover:text-brand-red-dark transition-colors">
                {item.title}
              </a>
            ) : (
              <h3 className="text-base font-bold text-gray-900 dark:text-white leading-relaxed">{item.title}</h3>
            )}
            {item.authors && <span className="text-sm text-gray-700 dark:text-gray-300 mt-1">{item.authors}</span>}
            {item.journal && <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{item.journal}</span>}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen pb-20">

      <PageHeader
        title="Faculty Profile"
        backgroundImage="/campus-image.jpg"
        compact={true}
      >
        <Link
          to={`/people/faculty?dept=${profile.departmentSlug || 'cse'}`}
          className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wide font-medium group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to all faculty
        </Link>
      </PageHeader>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* TOP SECTION: Photo and Info side-by-side on desktop */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 items-center md:items-stretch relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-800/50 pointer-events-none"></div>

          {/* Profile Image */}
          <div className="rounded-xl border-4 border-white dark:border-gray-800 shadow-md bg-white dark:bg-gray-800 shrink-0 relative z-10 overflow-hidden flex items-center justify-center">
            {profile.image ? (
              <img
                src={profile.image}
                alt={profile.name}
                className="w-auto h-auto max-h-40 md:max-h-64 max-w-[14rem] md:max-w-[18rem] object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(profile.name) + "&background=1B3A6B&color=fff&size=512";
                }}
              />
            ) : (
              <div className="w-40 h-40 md:w-56 md:h-56 flex items-center justify-center text-5xl text-primary font-serif">
                {profile.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="flex-grow flex flex-col items-center md:items-start text-center md:text-left z-10 w-full md:h-full">
            <div className="flex w-full justify-between items-start">
              <div className="flex flex-col items-center md:items-start text-center md:text-left flex-grow">
                <h1 className="text-xl md:text-2xl font-bold font-serif text-gray-900 dark:text-white mb-2">
                  {profile.name}
                </h1>
                <div className="text-xs text-brand-red font-semibold mb-2 flex flex-col space-y-0.5">
                  {profile.designation.split('\n').map((desig, idx) => (
                    <span key={idx}>{desig.trim()}</span>
                  ))}
                </div>
                {profile.department !== 'Faculty Member' && (
                  <p className="text-gray-600 dark:text-gray-400 font-medium mb-6 uppercase tracking-wider text-xs">
                    {profile.department}
                  </p>
                )}
              </div>

              {/* Social Icons */}
              <div className="flex flex-col gap-3 ml-4 shrink-0 mt-1">
                {(profile.linkedin && profile.linkedin !== "#") ? (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    className="hover:opacity-80"
                  >
                    <LinkedinIcon className="w-8 h-8" />
                  </a>
                ) : (
                  <div title="LinkedIn" className="opacity-40 cursor-not-allowed grayscale">
                    <LinkedinIcon className="w-8 h-8" />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-gray-700 dark:text-gray-300 mt-auto pt-4">

              {/* Education */}
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center mr-3 shrink-0">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Educational Qualification</h4>
                  {profile.education ? (
                    <ul className="space-y-1">
                      {profile.education.split('\n').filter(line => line.trim() !== '').map((line, idx) => (
                        <li key={idx} className="text-sm">{line.trim()}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-sm italic text-gray-500">Not provided</span>
                  )}
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center mr-3 shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Email Address</h4>
                  {profile.email ? (
                    <a href={`mailto:${profile.email}`} className="text-sm text-primary hover:underline">{profile.email}</a>
                  ) : (
                    <span className="text-sm italic text-gray-500">Not provided</span>
                  )}
                </div>
              </div>

              {/* Research Profiles */}
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center mr-3 shrink-0">
                  <LinkIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Research Profiles</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Google Scholar', 'ORCID', 'Scopus'].map((type, idx) => {
                      let href = '#';
                      if (type === 'Google Scholar' && profile.google_scholar) href = profile.google_scholar;
                      if (type === 'ORCID' && profile.orcid) href = profile.orcid;
                      if (type === 'Scopus' && profile.scopus) href = profile.scopus;

                      return (
                        <a
                          key={idx}
                          href={href}
                          target={href !== '#' ? "_blank" : undefined}
                          rel={href !== '#' ? "noopener noreferrer" : undefined}
                          className="px-3 py-1.5 bg-gray-50 hover:bg-red-50 dark:bg-gray-800/50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:border-brand-red rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red-dark transition-colors inline-flex items-center"
                        >
                          {type}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center mr-3 shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Phone Number</h4>
                  {profile.phone ? (
                    <div className="flex items-center">
                      <span
                        onClick={() => {
                          navigator.clipboard.writeText(profile.phone);
                          setCopiedPhone(true);
                          setTimeout(() => setCopiedPhone(false), 2000);
                        }}
                        className="text-sm cursor-pointer hover:text-brand-red transition-colors group relative"
                        title="Click to copy"
                      >
                        {profile.phone}
                      </span>
                      {copiedPhone && <span className="ml-2 text-xs text-green-600 dark:text-green-400 font-medium">Copied!</span>}
                    </div>
                  ) : (
                    <span className="text-sm italic text-gray-500">Not provided</span>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Sticky Tabs & Content */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 min-h-[400px] relative">

          {/* Sticky Tab Bar */}
          <div className="sticky top-20 z-30 bg-white dark:bg-surface-dark rounded-t-2xl border-b border-gray-200 dark:border-gray-800 shadow-sm relative group overflow-hidden">

            {showLeftScroll && (
              <button
                onClick={() => scrollTabs('left')}
                className="absolute left-0 top-0 bottom-0 z-10 w-12 flex items-center justify-start pl-2 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-surface-dark dark:via-surface-dark/90 text-gray-500 hover:text-brand-red transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <div
              ref={tabsRef}
              onScroll={handleScroll}
              className="hide-scrollbar overflow-x-auto flex relative scroll-smooth"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center whitespace-nowrap px-6 py-4 font-medium text-xs transition-colors relative ${activeTab === tab.id
                    ? 'text-brand-red dark:text-brand-red-dark bg-red-50/50 dark:bg-gray-800/50'
                    : 'text-gray-600 hover:text-brand-red dark:text-gray-400 dark:hover:text-brand-red-dark hover:bg-red-50/30 dark:hover:bg-gray-800/30'
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-red dark:bg-brand-red-dark"></span>
                  )}
                </button>
              ))}
            </div>

            {showRightScroll && (
              <button
                onClick={() => scrollTabs('right')}
                className="absolute right-0 top-0 bottom-0 z-10 w-16 flex items-center justify-end pr-3 bg-gradient-to-l from-white via-white/90 to-transparent dark:from-surface-dark dark:via-surface-dark/90 text-gray-500 hover:text-brand-red transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6 animate-pulse group-hover:animate-none" />
              </button>
            )}
          </div>

          {/* Tab Content Area */}
          <div className="p-8">

            {activeTab === 'biography' && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-6">Biography</h2>
                <p className="whitespace-pre-line text-base text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  {profile.bio || "No biography provided."}
                </p>
                {profile.resume && (
                  <div className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-6">
                    <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-brand-red" />
                      Detailed Resume
                    </h3>
                    <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="text-base text-primary hover:underline break-all inline-flex items-center">
                      {profile.resume}
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'books' && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-6">Books & Book Chapters</h2>
                {profile.books_chapters && profile.books_chapters.length > 0 ? renderListContent(profile.books_chapters) : (
                  <p className="text-base text-gray-500 italic">No book or chapter details provided yet.</p>
                )}
              </div>
            )}

            {activeTab === 'publications' && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-6">Publications</h2>
                {profile.publications && profile.publications.length > 0 ? renderListContent(profile.publications) : (
                  <p className="text-base text-gray-500 italic">No publication details provided yet.</p>
                )}
              </div>
            )}

            {activeTab === 'patents' && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-6">Patents</h2>
                {profile.patents && profile.patents.length > 0 ? renderListContent(profile.patents) : (
                  <p className="text-base text-gray-500 italic">No patent details provided yet.</p>
                )}
              </div>
            )}

            {activeTab === 'seminars' && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-6">Seminars & Workshops</h2>
                {profile.seminars && profile.seminars.length > 0 ? renderListContent(profile.seminars) : (
                  <p className="text-base text-gray-500 italic">No seminar or workshop details provided yet.</p>
                )}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-6">Projects</h2>
                {profile.projects && profile.projects.length > 0 ? renderListContent(profile.projects) : (
                  <p className="text-base text-gray-500 italic">No project details provided yet.</p>
                )}
              </div>
            )}

            {activeTab === 'supervisions' && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-6">Supervisions</h2>
                {profile.supervisions && profile.supervisions.length > 0 ? renderListContent(profile.supervisions) : (
                  <p className="text-base text-gray-500 italic">No supervision details provided yet.</p>
                )}
              </div>
            )}

            {activeTab === 'research' && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-6">Research Profiles & Links</h2>
                {profile.researchLinks && profile.researchLinks.length > 0 ? (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.researchLinks.map((link, idx) => (
                      <li key={`${link.url}-${idx}`}>
                        <a
                          href={link.url}
                          target="_blank" rel="noopener noreferrer"
                          className="group block p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-blue-50 dark:hover:bg-gray-800 transition-all"
                        >
                          <div className="overflow-hidden">
                            <p className="text-base text-gray-900 dark:text-white font-medium truncate w-full group-hover:text-primary transition-colors">{link.title}</p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic text-base">No external research links available.</p>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfilePage;
