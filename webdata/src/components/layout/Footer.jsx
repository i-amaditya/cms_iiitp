import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

// Social Icons
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
      <linearGradient id="ig-grad-new" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f09433"/>
        <stop offset="0.25" stopColor="#e6683c"/>
        <stop offset="0.5" stopColor="#dc2743"/>
        <stop offset="0.75" stopColor="#cc2366"/>
        <stop offset="1" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#ig-grad-new)" />
    <path d="M12 7.026c-2.748 0-4.974 2.226-4.974 4.974s2.226 4.974 4.974 4.974 4.974-2.226 4.974-4.974-2.226-4.974-4.974-4.974zm0 8.163c-1.758 0-3.189-1.431-3.189-3.189s1.431-3.189 3.189-3.189 3.189 1.431 3.189 3.189-1.431 3.189-3.189 3.189zM16.963 8.193c-.643 0-1.166-.523-1.166-1.166s.523-1.166 1.166-1.166 1.166.523 1.166 1.166-.523 1.166-1.166 1.166z" fill="white"/>
    <path d="M11.996 4.148c2.617 0 2.929.01 3.963.057 2.658.121 3.731 1.206 3.854 3.854.047 1.034.057 1.346.057 3.963 0 2.617-.01 2.929-.057 3.963-.123 2.648-1.196 3.733-3.854 3.854-1.034.047-1.346.057-3.963.057-2.617 0-2.929-.01-3.963-.057-2.658-.121-3.731-1.206-3.854-3.854-.047-1.034-.057-1.346-.057-3.963 0-2.617.01-2.929.057-3.963.123-2.648 1.196-3.733 3.854-3.854 1.034-.047 1.346-.057 3.963-.057m0-1.776c-2.66 0-2.997.011-4.043.059-3.324.152-4.99 1.83-5.143 5.143-.048 1.046-.059 1.383-.059 4.043 0 2.66.011 2.997.059 4.043.153 3.313 1.819 4.99 5.143 5.143 1.046.048 1.383.059 4.043.059 2.66 0 2.997-.011 4.043-.059 3.324-.152 4.99-1.83 5.143-5.143.048-1.046.059-1.383.059-4.043 0-2.66-.011-2.997-.059-4.043-.153-3.313-1.819-4.99-5.143-5.143-1.046-.048-1.383-.059-4.043-.059z" fill="white"/>
  </svg>
);

const YoutubeIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#FF0000" />
    <path d="M10 15.464l5.818-3.464L10 8.536v6.928z" fill="white" />
  </svg>
);
const Footer = () => {
  const [hits, setHits] = useState(0);
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    // Simulated base counts
    const baseHits = 9514;
    const baseVisitors = 4289;

    // Process Hits (Increments on every page load)
    let localHits = parseInt(localStorage.getItem("site_hits") || "0", 10);
    localHits += 1;
    localStorage.setItem("site_hits", localHits.toString());
    setHits(baseHits + localHits);

    // Process Visitors (Increments once per session)
    let localVisitors = parseInt(
      localStorage.getItem("site_visitors") || "0",
      10,
    );
    if (!sessionStorage.getItem("visited_this_session")) {
      localVisitors += 1;
      localStorage.setItem("site_visitors", localVisitors.toString());
      sessionStorage.setItem("visited_this_session", "true");
    }
    setVisitors(baseVisitors + localVisitors);
  }, []);

  // Format numbers into arrays of digits
  const formatCount = (count) => count.toString().padStart(4, "0").split("");

  return (
    <footer className="bg-footer text-gray-300 border-t border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Quick Links Column */}
          <div>
            <h3 className="text-brand-red font-serif text-xl font-bold mb-6 border-b border-gray-700 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-left">
              <li>
                <Link to="/nirf" className="hover:text-brand-red transition-colors flex items-start group">
                  <ExternalLink size={14} className="mr-2 mt-1 shrink-0 text-[#0d6efd]" />
                  <span className="leading-tight">NIRF</span>
                </Link>
              </li>
              <li>
                <Link to="/suo-motu" className="hover:text-brand-red transition-colors flex items-start group">
                  <ExternalLink size={14} className="mr-2 mt-1 shrink-0 text-[#0d6efd]" />
                  <span className="leading-tight">Suo Motu Disclosure</span>
                </Link>
              </li>
              <li>
                <Link to="/reports-and-minutes" className="hover:text-brand-red transition-colors flex items-start group">
                  <ExternalLink size={14} className="mr-2 mt-1 shrink-0 text-[#0d6efd]" />
                  <span className="leading-tight">Reports and Minutes</span>
                </Link>
              </li>
              <li>
                <Link to="/rti" className="hover:text-brand-red transition-colors flex items-start group">
                  <ExternalLink size={14} className="mr-2 mt-1 shrink-0 text-[#0d6efd]" />
                  <span className="leading-tight">RTI</span>
                </Link>
              </li>
              <li>
                <Link to="/rajbhasha" className="hover:text-brand-red transition-colors flex items-start group">
                  <ExternalLink size={14} className="mr-2 mt-1 shrink-0 text-[#0d6efd]" />
                  <span className="leading-tight">राजभाषा अनुभाग</span>
                </Link>
              </li>
              <li>
                <Link to="/icc" className="hover:text-brand-red transition-colors flex items-start group">
                  <ExternalLink size={14} className="mr-2 mt-1 shrink-0 text-[#0d6efd]" />
                  <span className="leading-tight">Internal Complaints Committee (ICC)</span>
                </Link>
              </li>
              <li>
                <Link to="/sgrc" className="hover:text-brand-red transition-colors flex items-start group">
                  <ExternalLink size={14} className="mr-2 mt-1 shrink-0 text-[#0d6efd]" />
                  <span className="leading-tight">Student Grievance Redressal Committee (SGRC)</span>
                </Link>
              </li>
              <li>
                <Link to="/equal-opportunity-cell" className="hover:text-brand-red transition-colors flex items-start group">
                  <ExternalLink size={14} className="mr-2 mt-1 shrink-0 text-[#0d6efd]" />
                  <span className="leading-tight">Equal Opportunity Cell (EOC)</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-red transition-colors flex items-start group">
                  <ExternalLink size={14} className="mr-2 mt-1 shrink-0 text-[#0d6efd]" />
                  <span className="leading-tight">Contact Us</span>
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:text-brand-red transition-colors flex items-start group">
                  <ExternalLink size={14} className="mr-2 mt-1 shrink-0 text-[#0d6efd]" />
                  <span className="leading-tight">Sitemap</span>
                </Link>
              </li>
              {/* <li>
                <Link to="/contact" className="hover:text-brand-red transition-colors flex items-start group">
                  <ExternalLink size={14} className="mr-2 mt-1 shrink-0 text-[#0d6efd]" />
                  <span className="leading-tight">Contact Us</span>
                </Link>
              </li> */}
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-800 flex items-center text-sm">
              <span className="text-gray-400 uppercase tracking-wider text-xs font-semibold mr-2">
                GST No:
              </span>
              <span className="text-gray-200 font-mono font-medium bg-gray-800 px-2 py-0.5 rounded shadow-sm">
                27AAAGI1149H1ZK
              </span>
            </div>
          </div>

          {/* Address Column */}
          <div>
            <h3 className="text-brand-red font-serif text-xl font-bold mb-6 border-b border-gray-700 pb-2 inline-block">
              Locate Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-brand-red mr-3 mt-1 shrink-0" />
                <p className="leading-relaxed text-sm">
                  Indian Institute of Information Technology (IIIT) Pune
                  <br />
                  {/* Gate No - 5 & 6, */}
                  Talegaon, Pune
                  <br />
                  {/* Vill - Nanoli-Tarf Chakan,
                  <br />
                  PO - Talegaon,
                  <br />
                  Tah - Maval, Dist-Pune,
                  <br /> */}
                  Maharashtra-410507
                </p>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="w-5 h-5 text-brand-red mr-3 shrink-0" />
                <p>02114-224510</p>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-5 h-5 text-brand-red mr-3 shrink-0" />
                <p>enquiry@iiitp.ac.in</p>
              </div>
              <div className="pt-4 pb-2">
                {/* <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-1 mb-4 shadow-sm">
                  <img src="/Logo/iiitp_logo.png" alt="IIIT Pune Logo" className="w-full h-full object-contain mix-blend-multiply" />
                </div> */}
                <div className="flex items-center space-x-4">
                  <a
                    href="https://www.facebook.com/share/14dmnHML9Tm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Facebook"
                  >
                    <FacebookIcon size={24} />
                  </a>
                  <a
                    href="https://x.com/IIIT_Pune"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="X (Twitter)"
                  >
                    <TwitterIcon size={24} />
                  </a>
                  <a
                    href="https://www.linkedin.com/school/iiitpune/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon size={24} />
                  </a>
                  <a
                    href="https://www.instagram.com/iiit_pune_official/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Instagram"
                  >
                    <InstagramIcon size={24} />
                  </a>
                  <a
                    href="https://www.youtube.com/@IIIT_Pune_Official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="YouTube"
                  >
                    <YoutubeIcon size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Column */}
          <div>
            <h3 className="text-brand-red font-serif text-xl font-bold mb-6 border-b border-gray-700 pb-2 inline-block">
              Map Location
            </h3>
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

      {/* Bottom Bar */}
      <div className="bg-black/40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm">
          <div className="text-gray-400 flex flex-col space-y-1 text-center md:text-left">
            <div>
              &copy; {new Date().getFullYear()} IIIT Pune. All rights reserved.
            </div>
            <div className="text-xs text-gray-500">
              Designed & Developed by{" "}
              <a
                href="https://www.linkedin.com/in/hardik-jha-a1985b160"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-red transition-colors"
              >
                Hardik Jha
              </a>
              ,{" "}
              <a
                href="https://www.linkedin.com/in/abhay-gugale-40875632b/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-red transition-colors"
              >
                Abhay Gugale
              </a>{" "}
              and{" "}
              <a
                href="https://www.linkedin.com/in/aanoush-surana-73964a335/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-red transition-colors"
              >
                Aanoush Surana
              </a>
            </div>
          </div>

          {/*
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 uppercase tracking-wider text-xs font-semibold">
                Visitors
              </span>
              <div className="flex space-x-1">
                {formatCount(visitors).map((digit, idx) => (
                  <span
                    key={`v-${idx}`}
                    className="bg-purple-600 text-white px-2 py-1 rounded shadow-inner font-mono font-bold tracking-widest text-base"
                  >
                    {digit}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-gray-400 uppercase tracking-wider text-xs font-semibold">
                Hits
              </span>
              <div className="flex space-x-1">
                {formatCount(hits).map((digit, idx) => (
                  <span
                    key={`h-${idx}`}
                    className="bg-orange-600 text-white px-2 py-1 rounded shadow-inner font-mono font-bold tracking-widest text-base"
                  >
                    {digit}
                  </span>
                ))}
              </div>
            </div>
          </div>
          */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
