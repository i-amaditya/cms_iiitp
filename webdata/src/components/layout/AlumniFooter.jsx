import React from 'react';
import { Link } from 'react-router';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

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
      <linearGradient id="ig-grad-alumni-footer" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f09433" />
        <stop offset="0.25" stopColor="#e6683c" />
        <stop offset="0.5" stopColor="#dc2743" />
        <stop offset="0.75" stopColor="#cc2366" />
        <stop offset="1" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#ig-grad-alumni-footer)" />
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

const AlumniFooter = () => {
  const footerLinks = [
    { label: 'About Us', to: '/alumni/about' },
    { label: 'Events', to: '/alumni/events' },
    { label: 'Alumni Network', to: '/alumni/network' },
    { label: 'Engage', to: '/alumni/get-involved' },
    { label: 'Placement Portal', to: 'https://placement.iiitp.ac.in', external: true },
  ];

  const firstColumnLinks = footerLinks.slice(0, 3);
  const secondColumnLinks = footerLinks.slice(3);

  return (
    <footer className="bg-footer text-gray-300 border-t border-gray-800 transition-colors duration-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div>
            <h3 className="text-brand-red font-serif text-xl font-bold mb-4 border-b border-gray-700 pb-2 inline-block">IIIT Pune Alumni</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Building a lifelong network of innovators, achievers, and change makers. Connect with alumni, share opportunities, and support the IIIT Pune community.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-3">
                {firstColumnLinks.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.to} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors flex items-center group text-sm">
                        <ExternalLink size={14} className="mr-2 text-gray-500 group-hover:text-brand-red" /> {link.label}
                      </a>
                    ) : (
                      <Link to={link.to} className="hover:text-brand-red transition-colors flex items-center group text-sm">
                        <ExternalLink size={14} className="mr-2 text-gray-500 group-hover:text-brand-red" /> {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {secondColumnLinks.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.to} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors flex items-center group text-sm">
                        <ExternalLink size={14} className="mr-2 text-gray-500 group-hover:text-brand-red" /> {link.label}
                      </a>
                    ) : (
                      <Link to={link.to} className="hover:text-brand-red transition-colors flex items-center group text-sm">
                        <ExternalLink size={14} className="mr-2 text-gray-500 group-hover:text-brand-red" /> {link.label}
                      </Link>
                    )}
                  </li>
                ))}
                <li>
                  <Link to="/" className="hover:text-brand-red transition-colors flex items-center group text-sm">
                    <ExternalLink size={14} className="mr-2 text-gray-500 group-hover:text-brand-red" /> Main Site
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-brand-red font-serif text-xl font-bold mb-6 border-b border-gray-700 pb-2 inline-block">Locate Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-brand-red mr-3 mt-1 shrink-0" />
                <p className="leading-relaxed text-sm">
                  Indian Institute of Information Technology, Pune<br />
                  Talegaon, Pune,<br />
                  Maharashtra - 410507
                </p>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="w-5 h-5 text-brand-red mr-3 shrink-0" />
                <p><a href="tel:+919326479440" className="hover:text-brand-red transition-colors">+91 93264-79440</a></p>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-5 h-5 text-brand-red mr-3 shrink-0" />
                <a href="mailto:alumniassociation@iiitp.ac.in" className="hover:text-brand-red transition-colors">alumniassociation@iiitp.ac.in</a>
              </div>
              <div className="pt-4 pb-2">
                <div className="flex items-center space-x-4">
                  <a href="https://www.facebook.com/share/14dmnHML9Tm/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="Facebook"><FacebookIcon size={24} /></a>
                  <a href="https://x.com/IIIT_Pune" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="X (Twitter)"><TwitterIcon size={24} /></a>
                  <a href="https://www.linkedin.com/school/iiitpune/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="LinkedIn"><LinkedinIcon size={24} /></a>
                  <a href="https://www.instagram.com/iiit_pune_official/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="Instagram"><InstagramIcon size={24} /></a>
                  <a href="https://youtube.com/@iiitpune25" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="YouTube"><YoutubeIcon size={24} /></a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-brand-red font-serif text-xl font-bold mb-6 border-b border-gray-700 pb-2 inline-block">Map Location</h3>
            <a
              href="https://www.google.com/maps/place/Indian+Institute+of+Information+Technology+Pune/@18.7531606,73.6877379,14z/data=!4m6!3m5!1s0x3bc2b405ac494d45:0xc302bc70566bb0f8!8m2!3d18.7651235!4d73.6970609!16s%2Fg%2F11c1qzfh2p?hl=en&entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-40 w-full rounded-lg overflow-hidden border border-gray-800 relative group shadow-sm cursor-pointer"
            >
              <iframe
                title="IIIT Pune Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.043690623351!2d73.6953457750284!3d18.763784782200388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b70007204f19%3A0x6700c253b3425039!2sIIIT%20Pune!5e0!3m2!1sen!2sin!4v1716744000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
              ></iframe>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-300 pointer-events-none"></div>
              <div className="absolute bottom-2 right-2 z-10 bg-black/70 group-hover:bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded transition-all duration-200">
                View Large Map
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-black/40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-400 text-center md:text-left">
          <div>&copy; {new Date().getFullYear()} IIIT Pune. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default AlumniFooter;
