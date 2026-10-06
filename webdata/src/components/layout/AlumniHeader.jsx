import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router';
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FacebookIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#1877F2" />
    <path d="M15.5 12h-2v8h-3v-8h-1.5v-2.5H10.5v-1.75c0-1.2.35-1.95 2.1-1.95h1.9v2.4h-1.2c-.44 0-.55.22-.55.6v.7h1.75L15.5 12z" fill="white" />
  </svg>
);

const TwitterIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="black" />
    <path d="M15.36 6H17.2l-4.01 4.58L17.91 18h-3.7l-2.9-3.79-3.35 3.79H6.12l4.3-4.91L6 6h3.8l2.62 3.44L15.36 6zm-.64 10.9h1.02l-7.3-9.5H7.32l7.4 9.5z" fill="white" />
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#0A66C2" />
    <path d="M17.8 18H15v-4.1c0-1 0-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.3V18H9.3V9.5h2.6v1.2h.1c.4-.7 1.3-1.4 2.6-1.4 2.8 0 3.3 1.8 3.3 4.2V18zM6.6 8.3c-.9 0-1.6-.7-1.6-1.6 0-.9.7-1.6 1.6-1.6.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6zM5.3 18h2.6V9.5H5.3V18z" fill="white" />
  </svg>
);

const InstagramIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig-grad-alumni" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f09433" />
        <stop offset="0.25" stopColor="#e6683c" />
        <stop offset="0.5" stopColor="#dc2743" />
        <stop offset="0.75" stopColor="#cc2366" />
        <stop offset="1" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#ig-grad-alumni)" />
    <path d="M12 7.026c-2.748 0-4.974 2.226-4.974 4.974s2.226 4.974 4.974 4.974 4.974-2.226 4.974-4.974-2.226-4.974-4.974-4.974zm0 8.163c-1.758 0-3.189-1.431-3.189-3.189s1.431-3.189 3.189-3.189 3.189 1.431 3.189 3.189-1.431 3.189-3.189 3.189zM16.963 8.193c-.643 0-1.166-.523-1.166-1.166s.523-1.166 1.166-1.166 1.166.523 1.166 1.166-.523 1.166-1.166 1.166z" fill="white" />
    <path d="M11.996 4.148c2.617 0 2.929.01 3.963.057 2.658.121 3.731 1.206 3.854 3.854.047 1.034.057 1.346.057 3.963 0 2.617-.01 2.929-.057 3.963-.123 2.648-1.196 3.733-3.854 3.854-1.034.047-1.346.057-3.963.057-2.617 0-2.929-.01-3.963-.057-2.658-.121-3.731-1.206-3.854-3.854-.047-1.034-.057-1.346-.057-3.963 0-2.617.01-2.929.057-3.963.123-2.648 1.196-3.733 3.854-3.854 1.034-.047 1.346-.057 3.963-.057m0-1.776c-2.66 0-2.997.011-4.043.059-3.324.152-4.99 1.83-5.143 5.143-.048 1.046-.059 1.383-.059 4.043 0 2.66.011 2.997.059 4.043.153 3.313 1.819 4.99 5.143 5.143 1.046.048 1.383.059 4.043.059 2.66 0 2.997-.011 4.043-.059 3.324-.152 4.99-1.83 5.143-5.143.048-1.046.059-1.383.059-4.043 0-2.66-.011-2.997-.059-4.043-.153-3.313-1.819-4.99-5.143-5.143-1.046-.048-1.383-.059-4.043-.059z" fill="white" />
  </svg>
);

const YoutubeIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#FF0000" />
    <path d="M10 15.464l5.818-3.464L10 8.536v6.928z" fill="white" />
  </svg>
);

const AlumniHeader = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDark]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileDropdowns({});
  }, [location.pathname]);

  const toggleDarkMode = () => setIsDark(!isDark);

  const handleTextSize = (action) => {
    const root = document.documentElement;
    const current = parseFloat(getComputedStyle(root).fontSize);
    if (action === 'increase') root.style.fontSize = Math.min(current + 1, 20) + 'px';
    else if (action === 'decrease') root.style.fontSize = Math.max(current - 1, 14) + 'px';
    else root.style.fontSize = '16px';
  };

  const navLinks = [
    { name: 'About Us', path: '/alumni/about' },
    { name: 'Events', path: '/alumni/events' },
    {
      name: 'Alumni Network',
      path: '/alumni/network',
     // subLinks: [
       // { name: 'Alumni Highlights', path: '/alumni/network#alumni-highlights' },
       // { name: 'Stay Connected with IIIT Pune', path: '/alumni/network#stay-connected' },
     // ],
    },
     { name: 'Hall of Fame', path: '/alumni/hall-of-fame' },
    {
      name: 'Engage',
      path: '/alumni/get-involved',
     /* subLinks: [
        { name: 'Volunteer', path: '/alumni/get-involved#volunteer' },
        { name: 'Share Achievements', path: '/alumni/get-involved#share-achievements' },
        { name: 'Share Opportunities', path: '/alumni/get-involved#share-opportunities' },
        { name: 'Mentor', path: '/alumni/get-involved#mentor' },
      ],*/
    },
    { name: 'Contact Us', path: '/alumni/contact' },
    { name: 'Main Website', path: 'https://iiitp.ac.in', external: true },
  ];

  const toggleMobileDropdown = (name) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const navLinkClass = () =>
    'relative py-1.5 px-3 text-xs md:text-sm font-semibold transition-colors duration-200 group flex items-center text-white hover:text-brand-red dark:text-gray-200 dark:hover:text-brand-red-dark';

  const navLinkUnderline = ({ isActive }) => (
    <span
      className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-red dark:bg-brand-red-dark transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
    />
  );

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-primary dark:bg-surface-dark transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-blue-800/50 dark:border-gray-800">
        <div className="flex justify-between items-center py-1 md:py-2">
          <Link
            to="/alumni"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-2 md:space-x-3"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-white">
              <img src="/Logo/iiitp_logo.png" alt="IIIT Pune Logo" className="w-full h-full object-contain mix-blend-multiply scale-[1.6]" />
            </div>
            <div className="text-white dark:text-text-dark leading-tight">
              <h1 className="text-center text-xl md:text-xl lg:text-2xl font-bold font-serif">
                भारतीय सूचना प्रौद्योगिकी संस्थान, पुणे
              </h1>
              <h2 className="text-center text-xs md:text-sm lg:text-base font-medium opacity-90 font-serif mt-0.5">
                Indian Institute of Information Technology Pune
              </h2>
              <p className="text-center text-[9px] md:text-[13px] opacity-80 mt-0.5">(An Institute of National Importance by an Act of Parliament)</p>
              <p className="text-center text-[10px] md:text-[14px] opacity-70 mt-0.5">
                Talegaon, Pune, Maharashtra - 410507
              </p>
            </div>
          </Link>

          <div className="flex flex-col items-end gap-1 md:gap-1.5">
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center p-1.5 rounded-lg text-white hover:bg-blue-700 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
                aria-label="Toggle dark mode"
                title={isDark ? 'Light Mode' : 'Dark Mode'}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <div className="hidden md:block h-5 w-px bg-blue-700 dark:bg-gray-600" />

              <div className="hidden md:flex items-center gap-2">
                <a href="https://www.facebook.com/share/14dmnHML9Tm/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="opacity-80 hover:opacity-100 transition-opacity p-1.5 text-white"><FacebookIcon size={18} /></a>
                <a href="https://x.com/IIIT_Pune" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="opacity-80 hover:opacity-100 transition-opacity p-1.5 text-white"><TwitterIcon size={18} /></a>
                <a href="https://www.linkedin.com/school/iiitpune/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="opacity-80 hover:opacity-100 transition-opacity p-1.5 text-white"><LinkedinIcon size={18} /></a>
                <a href="https://www.instagram.com/iiit_pune_official/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="opacity-80 hover:opacity-100 transition-opacity p-1.5 text-white"><InstagramIcon size={18} /></a>
                <a href="https://youtube.com/@iiitpune25" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="opacity-80 hover:opacity-100 transition-opacity p-1.5 text-white"><YoutubeIcon size={18} /></a>
              </div>

              <div className="hidden md:block h-5 w-px bg-blue-700 dark:bg-gray-600" />

              <div className="hidden md:flex items-center bg-blue-900/40 dark:bg-gray-800/40 rounded-lg px-1.5 py-1 gap-0.5">
                <button
                  onClick={() => handleTextSize('decrease')}
                  className="px-1.5 py-0.5 rounded text-xs font-light text-white hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors leading-none"
                  title="Decrease Text Size"
                >
                  A-
                </button>
                <button
                  onClick={() => handleTextSize('reset')}
                  className="px-1.5 py-0.5 rounded text-xs font-medium text-white hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors leading-none"
                  title="Default Text Size"
                >
                  A
                </button>
                <button
                  onClick={() => handleTextSize('increase')}
                  className="px-1.5 py-0.5 rounded text-sm font-bold text-white hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors leading-none"
                  title="Increase Text Size"
                >
                  A+
                </button>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center p-1.5 rounded-lg text-white hover:bg-blue-700 dark:hover:bg-gray-700 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-2 gap-x-6">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.external ? (
                <a
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={navLinkClass()}
                >
                  <span className="flex items-center gap-1">{link.name}</span>
                </a>
              ) : (
                <NavLink
                  to={link.path}
                  end={link.path === '/alumni'}
                  className={navLinkClass}
                >
                  {({ isActive }) => (
                    <span className="flex items-center gap-1">
                      {link.name}
                      {link.subLinks && <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />}
                      {navLinkUnderline({ isActive })}
                    </span>
                  )}
                </NavLink>
              )}

              {link.subLinks && (
                <div className="invisible absolute left-0 top-full z-50 mt-1 min-w-[260px] rounded-lg border border-gray-200 bg-white p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100 dark:border-gray-700 dark:bg-slate-900">
                  {link.subLinks.map((subLink) => (
                    <Link
                      key={subLink.name}
                      to={subLink.path}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      {subLink.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-primary dark:bg-surface-dark border-t border-blue-800/50 dark:border-gray-800 shadow-xl"
          >
            <div className="px-4 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-center gap-6 px-3 py-3 border-b border-white/10">
                <a href="https://www.facebook.com/share/14dmnHML9Tm/" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity text-white"><FacebookIcon size={20} /></a>
                <a href="https://x.com/IIIT_Pune" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity text-white"><TwitterIcon size={20} /></a>
                <a href="https://www.linkedin.com/school/iiitpune/" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity text-white"><LinkedinIcon size={20} /></a>
                <a href="https://www.instagram.com/iiit_pune_official/" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity text-white"><InstagramIcon size={20} /></a>
                <a href="https://youtube.com/@iiitpune25" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity text-white"><YoutubeIcon size={20} /></a>
              </div>

              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <div className="flex items-center gap-2">
                      {link.external ? (
                        <a
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block w-full px-3 py-2 rounded-md text-base font-semibold text-white hover:bg-blue-800/50"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <NavLink
                          to={link.path}
                          end={link.path === '/alumni'}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={({ isActive }) => `block w-full px-3 py-2 rounded-md text-base font-semibold text-white ${isActive ? 'bg-brand-red' : 'hover:bg-blue-800/50'}`}
                        >
                          {link.name}
                        </NavLink>
                      )}
                      {link.subLinks && (
                        <button
                          onClick={() => toggleMobileDropdown(link.name)}
                          className="rounded-md p-2 text-white hover:bg-blue-800/50"
                          aria-label={`Toggle ${link.name} sub menu`}
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${mobileDropdowns[link.name] ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    {link.subLinks && mobileDropdowns[link.name] && (
                      <div className="mt-1 ml-4 space-y-1 border-l border-white/20 pl-3">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            to={subLink.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-md text-sm text-white/90 hover:bg-blue-800/50"
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default AlumniHeader;
