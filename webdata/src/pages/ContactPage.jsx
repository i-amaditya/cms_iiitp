import React, { useState } from 'react';
import PageHeader from '../components/shared/PageHeader';
import InteractiveMap from '../components/shared/InteractiveMap';

// Social Icons
const FacebookIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Train, 
  Bus, 
  Plane, 
  Navigation, 
  Search, 
  Copy, 
  Check
} from 'lucide-react';

const transportModes = [
  {
    type: "Railway",
    detail: "Talegaon Railway Station",
    distance: "6.2 km",
    icon: Train,
    description: "The nearest local railway station, providing connectivity to Pune Junction and Lonavala."
  },
  {
    type: "Bus",
    detail: "Talegaon Bus Stand",
    distance: "5.9 km",
    icon: Bus,
    description: "Connects the campus to Pune city and surrounding major areas with regular bus services."
  },
  {
    type: "Air",
    detail: "Pune International Airport (PNQ)",
    distance: "43.2 km",
    icon: Plane,
    description: "The primary domestic and international gateway, situated approximately 1.5 hours away."
  },
  {
    type: "Road",
    detail: "L&T Circle / Pune-Mumbai Highway",
    distance: "2.2 km",
    icon: Navigation,
    description: "Easy highway access via the Pune-Mumbai Expressway exit at Talegaon Dabhade."
  }
];

const importantContacts = [
  {
    name: "Mr. Sandeep Mandal",
    designation: "Director PA",
    department: "Administration",
    email: "pa.director@iiitp.ac.in",
    phone: "02114-224501"
  },
  {
    name: "Mr. Rajendra Daiya",
    designation: "Registrar PA",
    department: "Administration",
    email: "patoreg@iiitp.ac.in",
    phone: "02114-224503"
  },
  {
    name: "Dr. Sanjeev Sharma",
    designation: "Associate Dean (Academics) / Chief Vigilance Officer (CVO)",
    department: "Administration",
    email: "sanjeevsharma@iiitp.ac.in",
    phone: "02114-224504"
  },
  {
    name: "Dr. Sushant Kumar",
    designation: "Associate Dean (R&D and Faculty Welfare)",
    department: "Administration",
    email: "sushant@iiitp.ac.in",
    phone: "+91 8292305145"
  },
  {
    name: "Dr. Bhupendra Singh",
    designation: "HoD (CSE), Admission (JoSAA/CSAB), Associate Dean (Infrastructure, Admin & Finance)",
    department: "Administration",
    email: "bhupendra@iiitp.ac.in",
    phone: "02114-224505"
  },
  {
    name: "Dr. Nagendra Kushwaha",
    designation: "HoD (ECE)",
    department: "Administration",
    email: "nagendra@iiitp.ac.in",
    phone: "02114-224506"
  },
  {
    name: "Dr. Jatin Majithia",
    designation: "HoD (AS&H)",
    department: "Administration",
    email: "jatinmajithia@iiitp.ac.in",
    phone: "02114-224507"
  },
  // Hostels
  {
    name: "Dr. Shubam Shukla",
    designation: "Chief Warden",
    department: "Hostels & Wardens",
    email: "shubhamshukla@iiitp.ac.in",
    phone: "+91 9532523961"
  },
  {
    name: "Dr. Dheeraj Dubey",
    designation: "Boy's Hostel 1 Warden",
    department: "Hostels & Wardens",
    email: "dheeraj@iiitp.ac.in",
    phone: "+91 8840677530"
  },
  {
    name: "Dr. Mahesh Joshi",
    designation: "Co-ordinator (PG/ Ph.D.), Boys' Hostel 2 Warden",
    department: "Hostels & Wardens",
    email: "mahesh.joshi@iiitp.ac.in",
    phone: "+91 8886844737"
  },
  {
    name: "Dr. Habila Basumatary",
    designation: "Warden (Girls)",
    department: "Hostels & Wardens",
    email: "habila@iiitp.ac.in",
    phone: "+91 8133911040"
  },
  {
    name: "Mr. Laxman Shinde",
    designation: "Jr. Superintendent (Boys/Girls)",
    department: "Hostels & Wardens",
    email: "laxmanshinde@iiitp.ac.in",
    phone: "+91 9881729759"
  },
  {
    name: "Girl's Hostel Office",
    designation: "Girls' Hostel Desk",
    department: "Hostels & Wardens",
    email: "",
    phone: "02114-224511"
  },
  {
    name: "Boy's Hostel 1 Office",
    designation: "Boys' Hostel 1 Desk",
    department: "Hostels & Wardens",
    email: "",
    phone: "02114-224512"
  },
  {
    name: "Boy's Hostel 2 Office",
    designation: "Boys' Hostel 2 Desk",
    department: "Hostels & Wardens",
    email: "",
    phone: "02114-224513"
  },
  // Placements
  {
    name: "Mr. Kedar Bhogshetti",
    designation: "Training & Placements Officer",
    department: "Placements",
    email: "placements@iiitp.ac.in",
    phone: "02114-224508, +91 9326479440"
  },
  {
    name: "Dr. Kaptan Singh",
    designation: "Faculty I/C Training & Placement",
    department: "Placements",
    email: "kaptansingh@iiitp.ac.in",
    phone: "+91 9826524212"
  },
  // Purchase/Procurement
  {
    name: "Mr. Aman Ankur",
    designation: "Purchase Section",
    department: "Procurement & Store",
    email: "js1.procurement@iiitp.ac.in",
    phone: "02114-224509"
  },
  {
    name: "Shri Lalit Chandra Trivedi",
    designation: "Independent External Monitor - Purchase matters",
    department: "IEM",
    email: "lctrivedi61@gmail.com",
    phone: "+91 9967567679"
  },
  {
    name: "Ashok Kumar Tripathy, IAS (Retd.)",
    designation: "Independent External Monitor - Purchase matters",
    department: "IEM",
    email: "tripathyak@yahoo.com",
    phone: "+91-9437040285"
  }
];

const ContactPage = () => {
  const [copiedId, setCopiedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredContacts = importantContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          contact.designation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All' || contact.department === activeTab;
    return matchesSearch && matchesTab;
  });

  const categories = ['All', 'Administration', 'Hostels & Wardens', 'Placements', 'IEM', 'Procurement & Store'];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Contact Us" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Section 1: Contact Info & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Column: Get In Touch */}
          <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-md border border-gray-150 dark:border-gray-800 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold font-serif text-primary dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-3">
                Get in Touch
              </h2>
              
              <div className="space-y-8 mt-4">
                {/* Address */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center shrink-0 mr-4">
                    <MapPin className="text-accent dark:text-accent-dark" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Address</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                      <strong>Indian Institute of Information Technology (IIIT) Pune</strong><br />
                      {/* Gate No - 5 & 6,<br />
                      Vill - Nanoli-Tarf Chakan,<br />
                      PO - Talegaon,<br />
                      Tah - Maval, Dist-Pune,<br /> */}
                      Talegaon, Pune,<br />
                      Maharashtra-410507
                    </p>
                  </div>
                </div>

                {/* Enquiry Details */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center shrink-0 mr-4">
                    <Clock className="text-accent dark:text-accent-dark" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">General Enquiry</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                      <strong>Hours:</strong> Monday - Saturday: 09:30 AM - 5:30 PM<br />
                      <strong>Phone:</strong> <a href="tel:02114224510" className="hover:text-accent dark:hover:text-accent-dark">02114-224510</a><br />
                      <strong>Email:</strong> <a href="mailto:enquiry@iiitp.ac.in" className="hover:text-accent dark:hover:text-accent-dark">enquiry@iiitp.ac.in</a>
                    </p>
                    <div className="pt-4 flex items-center space-x-5">
                      <a href="https://www.linkedin.com/school/indian-institute-of-information-technology-pune/" target="_blank" rel="noopener noreferrer"  className="opacity-70 hover:opacity-100 transition-opacity" aria-label="LinkedIn">
                        <LinkedinIcon size={24} />
                      </a>
                      <a href="https://twitter.com/IIITPune" target="_blank" rel="noopener noreferrer"  className="opacity-70 hover:opacity-100 transition-opacity" aria-label="X (Twitter)">
                        <TwitterIcon size={24} />
                      </a>
                      <a href="https://www.facebook.com/Indian-Institute-of-Information-Technology-Pune-101140938435131/" target="_blank" rel="noopener noreferrer"  className="opacity-70 hover:opacity-100 transition-opacity" aria-label="Facebook">
                        <FacebookIcon size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Map */}
          <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-md border border-gray-150 dark:border-gray-800 flex flex-col justify-between">
            <div className="flex-grow min-h-[400px]">
              <InteractiveMap />
            </div>
          </div>
        </div>

        {/* Section 2: How to Reach */}
        <section id="transit" className="scroll-mt-24">
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-md border border-gray-150 dark:border-gray-800 space-y-6">
            <h2 className="text-2xl font-bold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
              How to Reach the Campus
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {transportModes.map((mode, index) => {
                const Icon = mode.icon;
                return (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800/30 p-5 rounded-xl border border-gray-150 dark:border-gray-800 space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-accent dark:text-accent-dark">
                          <Icon size={18} />
                        </span>
                        <span className="bg-primary/10 text-primary dark:text-accent-dark font-bold px-2 py-0.5 rounded text-xs">
                          {mode.distance}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm leading-snug">
                        By {mode.type}
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold leading-relaxed">
                        {mode.detail}
                      </p>
                      <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                        {mode.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Important Contacts Directory */}
        <section id="directory" className="scroll-mt-24">
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-md border border-gray-150 dark:border-gray-800 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold font-serif text-primary dark:text-white">
                  Important Contacts Directory
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Key contacts for administrative, hostel, placement, and procurement matters.
                </p>
              </div>

              {/* Search Box */}
              <div className="relative shrink-0">
                <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Search directory..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-xs rounded-lg border border-gray-155 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 w-full md:w-60 focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            {/* Department tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeTab === cat 
                      ? 'bg-accent text-white' 
                      : 'bg-gray-50 dark:bg-gray-800/40 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Directory Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto pr-2">
              {filteredContacts.map((contact, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-800/30 p-5 rounded-xl border border-gray-150 dark:border-gray-800 flex flex-col justify-between space-y-4 hover:shadow-sm transition-shadow">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent dark:text-accent-dark">
                        {contact.department}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm leading-snug">
                      {contact.name || 'Office Contact'}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug font-medium">
                      {contact.designation}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-150/40 dark:border-gray-800/40 text-xs text-gray-600 dark:text-gray-400">
                    {/* Phone */}
                    {contact.phone && (
                      <div className="flex items-center justify-between">
                        <span><strong>Phone:</strong> {contact.phone}</span>
                        <div className="flex items-center space-x-2">
                          <a href={`tel:${contact.phone.split(',')[0].trim()}`} className="text-[10px] text-accent dark:text-accent-dark hover:underline font-bold">
                            Call
                          </a>
                        </div>
                      </div>
                    )}
                    {/* Email */}
                    {contact.email && (
                      <div className="flex items-center justify-between">
                        <span className="truncate mr-2"><strong>Email:</strong> {contact.email}</span>
                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            onClick={() => copyToClipboard(contact.email, idx)}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Copy email"
                          >
                            {copiedId === idx ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                          </button>
                          <a href={`mailto:${contact.email}`} className="text-[10px] text-accent dark:text-accent-dark hover:underline font-bold">
                            Mail
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {filteredContacts.length === 0 && (
                <div className="col-span-full py-12 text-center text-xs text-gray-500 dark:text-gray-400">
                  No directory contacts matched your search or tab filters.
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ContactPage;
