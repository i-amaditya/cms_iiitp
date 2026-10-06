import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  Trophy,
  Code,
  Cpu,
  Microscope,
  FileText,
  Award,
  ChevronLeft,
  GraduationCap,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router';
import campusFrontImg from '../../assets/campus_front.jpg';
import FadeInSection from '../shared/FadeInSection';

const studentAchievements = [
  {
    category: "Sports",
    title: "7th Inter-IIIT Sports Meet 2025",
    description: "IIIT Pune secured a historic 7th place overall at IIITM Gwalior, winning 11 medals (5 Gold, 3 Silver, 3 Bronze) with outstanding athletic & team performances.",
    detail: "Gold in Shot Put & Javelin (Parth Shukla), Weightlifting (Khush Meena), Aquatics (Atharv Patil), and Men's Tug-of-War."
  },
  {
    category: "Hackathon",
    title: "Citi Ada Lovelace Hackathon 2024",
    description: "Team CodeCoffee secured First Runner-Up out of 500+ teams and 1500+ participants across India, organized by Citi.",
    detail: "Aadish Shelke, Bhagyashri Meena, Shreerang Mungikar, Lalithya K. Koneti. Mentor: Dr. Priyank Jain."
  },
  {
    category: "Hackathon",
    title: "Smart India Hackathon Winners",
    description: "Team BugBusters won SIH 2023 for their BookLens project. Team SHARPS emerged as finalists and winners in SIH 2024.",
    detail: "Heartfelt gratitude to our mentors Dr. Priyank Jain and student mentor Ashutosh Jha."
  },
  {
    category: "Coding",
    title: "Apoorv Kumar - Red Coder",
    description: "Batch 2024 student achieved the title of Grandmaster on Codeforces and 7-star coder on Codechef (All India Rank 9 on both).",
    detail: "Apoorv's achievements highlight the strong, student-driven competitive coding culture at IIIT Pune."
  },
  {
    category: "Hackathon",
    title: "Toycathon 2021 Winners",
    description: "Team MMH won the Grand Finale of Toycathon 2021, organized by the Ministry of Education's Innovation Cell, Government of India.",
    detail: "Tanmay Modi, Piyush Gupta, Sarthak Gupta, Janardhan Edara."
  },
  {
    category: "Hackathon",
    title: "Smart India Hackathon 2019 Winners",
    description: "Team Calm Down It's Just Genjutsu secured 1st place in the Software Edition at NIT Warangal, earning a prize of ₹1 Lakh.",
    detail: "Disha Dudhal, Devasish Mahato, Yogesh Karan, Shivam Dev Singh, Aravind Unnikrishnan, Dhanashree Regavade."
  },
  {
    category: "Entrepreneurship",
    title: "Aerial Robotics Startup Incubation",
    description: "Final Year CSE student Umang Kalra and his team founded an aerial robotics startup incubated and supported by SKUAST Jammu.",
    detail: "Sponsored by the Government of India under the RAFTAAR scheme for agriculture and drone automation."
  },
  {
    category: "Research",
    title: "Student Research Publications",
    description: "Undergraduate students Nainil Nandu, Tanay Patel, V. Dinesh Reddy, and A.K. Singh co-authored research papers in peer-reviewed journals.",
    detail: "Published in the Journal of Quantum Information Processing and IEEE IEMTRONICS."
  }
];

const facultyAchievements = [
  {
    category: "Recognition",
    title: "Stanford Top 2% Scientist",
    description: "Dr. Divya Chaturvedi recognized among the Top 2% Scientists worldwide by Stanford University for three consecutive years (2023-2025).",
    detail: "Prestigious recognition based on her global impact, 38+ journal articles, 1,320+ citations, h-index of 22, and i10-index of 32."
  },
  {
    category: "Research",
    title: "MeitY Research Grant (₹1.93 Cr)",
    description: "Dr. Bhupendra Singh & Dr. Sanjeev Sharma awarded 1.93 Crore for Next Generation Data Carving & Storage Drive Forensics.",
    detail: "A prestigious 2-year government-sponsored project for advanced digital forensics."
  },
  {
    category: "Research",
    title: "MeitY IoT SoC Grant (₹81.50 L)",
    description: "Dr. Nagendra Kushwaha awarded 81.50 Lakh for Power & Space optimization in Internet of Things (IoT) System-on-Chip (SoC).",
    detail: "A 5-year project under the Dept. of Electronics & Communication Engineering."
  },
  {
    category: "Research",
    title: "DST SIW Antenna Project (₹30 L)",
    description: "Dr. KM Divya Chaturvedi awarded 30 Lakh for Design & Development of SIW-based Millimeter Wave Beam-Steerable Antenna Arrays for 5G.",
    detail: "A 3-year project for advanced 5G network sensor design."
  },
  {
    category: "Research",
    title: "DST-SERB Control Systems Project",
    description: "Dr. Ranjith Ravindranathan Nair awarded 13.77 Lakh for Anomaly Detection & Countermeasures in Cyber-Physical Systems.",
    detail: "A 2-year government-sponsored research project for system security."
  },
  {
    category: "Patent",
    title: "AI Monitoring System Patent",
    description: "Indian patent granted on March 27, 2026 for an AI-based automatic monitoring system and method.",
    detail: "Inventors: Dr. Sonam Maurya (Assistant Professor, CSE) along with other researchers."
  },
  {
    category: "Patent",
    title: "Disease Biomarker Biosensor",
    description: "Indian patent application published on July 15, 2025 for a biosensor for detection of disease biomarkers.",
    detail: "Inventors: Dr. Dheeraj Dubey (Assistant Professor, Dept of ECE) along with co-inventors."
  },
  {
    category: "Research",
    title: "Cryptocurrency Forensics Study",
    description: "Prof. Bhupendra Singh and Dr. Nitesh K. Bharadwaj co-authored a forensic study on Electrum wallet artifacts.",
    detail: "Published in the prestigious Journal of Forensic Sciences, 2026."
  },
  {
    category: "Research",
    title: "Breast Tumor Detection Research",
    description: "Dr. Divya Chaturvedi co-authored a study on breast tumor detection using Slotted Monopole Antennas.",
    detail: "Published in the IEEE Access Journal, vol. 14, 2026."
  }
];

const categoryIcons = {
  Sports: Trophy,
  Hackathon: Code,
  Coding: Cpu,
  Research: Microscope,
  Patent: FileText,
  Entrepreneurship: Award
};

const studentWhyPoints = [
  {
    title: 'Competitive Coding Culture',
    description: 'Strong presence in SIH (winners in 2023, 2024), ACM-ICPC, and high ranking coders on Codeforces driven by active student coding clubs.'
  },
  {
    title: 'Outstanding Placements',
    description: 'Impressive track record with a highest package of 53 LPA for B.Tech in recent placement drives, with recruiters like Microsoft, Amazon, and Atlassian.'
  },
  {
    title: 'State-of-the-Art Curriculum',
    description: 'Industry-relevant curriculum tailored for current developments in Artificial Intelligence, Machine Learning, IoT, and Cyber-Physical Systems.'
  },
  {
    title: 'Industry–Academia Collaboration',
    description: 'Through industry-led microcredit courses, expert lectures, internships, and collaborative initiatives, IIIT Pune provides students with hands-on exposure to emerging technologies and real-world industry practices.'
  },
  {
    title: 'Startup & Incubation Ecosystem',
    description: 'A dedicated Startup & Incubation Cell empowers students to transform innovative ideas into scalable ventures through mentorship, industry partnerships, investor networks, and structured incubation programmes.'
  }
];

const facultyWhyPoints = [
  {
    title: 'Rich Research Ecosystem',
    description: 'Over ₹3 Crores of ongoing and completed external research grants from MeitY, DST-SERB, and various research ministries.'
  },
  {
    title: 'Intellectual Property & Innovation',
    description: 'Robust support for filing patents, copyrights, and publications in top-tier international journals and research conferences with strong support from major organisations like the IEEE.'
  },
  {
    title: 'Autonomy & Collaborations',
    description: 'Academic and research freedom to lead collaborative laboratories, industry consulting projects, and global university partnerships.'
  },
  {
    title: 'Continuous Professional Development Allowance (CPDA)',
    description: 'Continuous Professional Development Allowance (CPDA) enables faculty members to participate in conferences, workshops, training programmes, and other scholarly activities.'
  },
  {
    title: 'Seed Research Grant',
    description: 'Seed Research Grants to regular faculty members, offering initial funding to support innovative research projects. This initiative empowers faculty to pursue high-impact research, generate new ideas, and secure competitive external funding.'
  },
  {
    title: 'Health Insurance',
    description: 'Medical insurance coverage is available to eligible employees in accordance with applicable Government of India rules, supporting their health and financial well-being.'
  }
];

const studentWhyPointsLoop = [...studentWhyPoints, ...studentWhyPoints];
const facultyWhyPointsLoop = [...facultyWhyPoints, ...facultyWhyPoints];

const InfoCards = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [startIndex, setStartIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [expandedReasonSection, setExpandedReasonSection] = useState(null);

  const currentList = activeTab === 'students' ? studentAchievements : facultyAchievements;

  // Auto-play effect
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % currentList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentList.length, isHovered]);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % currentList.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + currentList.length) % currentList.length);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setStartIndex(0);
  };

  const handleReasonToggle = (section) => {
    setExpandedReasonSection((prev) => (prev === section ? null : section));
  };

  const renderCard = (item) => {
    const Icon = categoryIcons[item.category] || Trophy;
    return (
      <div className="bg-white dark:bg-surface-dark p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 flex flex-col justify-between hover:shadow-lg transition-all duration-300 h-full">
        <div className="space-y-3">
          {/* Category Chip */}
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-900/30 text-accent dark:text-accent-dark">
              <Icon size={16} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent dark:text-accent-dark">
              {item.category}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm leading-snug">
            {item.title}
          </h4>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed text-justify line-clamp-3">
            {item.description}
          </p>

          {/* Detail block */}
          {item.detail && (
            <div className="text-[11px] text-gray-500 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-800/30 p-2.5 rounded border-l-2 border-accent dark:border-accent-dark line-clamp-2">
              {item.detail}
            </div>
          )}
        </div>

        {/* Read story link */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800/60">
          <Link
            to={`/about/${activeTab === 'students' ? 'student' : 'faculty'}-achievements`}
            className="text-xs font-bold text-brand-red dark:text-brand-red-dark hover:underline flex items-center"
          >
            Read Full Story <ChevronRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section className="py-12 bg-transparent transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Row 1: 3-Card Grid */}
        <FadeInSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1: Welcome */}
          <div className="bg-white dark:bg-surface-dark rounded-xl shadow-md overflow-hidden border border-gray-150 dark:border-gray-800 flex flex-col group">
            <div className="bg-primary dark:bg-gray-800 text-white py-3 px-5 font-bold font-serif text-lg md:text-xl">
              Welcome to IIIT Pune
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="w-full h-40 rounded-md mb-4 overflow-hidden relative shadow-inner">
                <img src={campusFrontImg} alt="IIIT Pune Campus" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-justify mb-4 flex-grow">
                Indian Institute of Information Technology Pune, established in 2016, is an Institute of National Importance set up by the Ministry of Education, Government of India. We are dedicated to delivering world-class IT education and research.
              </p>
              <Link to="/about" className="text-brand-red dark:text-brand-red-dark font-semibold text-sm flex items-center hover:underline group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                View full profile <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>

          {/* Card 2: Admissions */}
          <div className="bg-white dark:bg-surface-dark rounded-xl shadow-md overflow-hidden border border-gray-150 dark:border-gray-800 flex flex-col group">
            <div className="bg-primary dark:bg-gray-800 text-white py-3 px-5 font-bold font-serif text-lg md:text-xl">
              Admissions 2026-27
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <ul className="space-y-4 mb-6 flex-grow mt-2">
                <li className="flex flex-col">
                  <div className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-accent dark:bg-accent-dark mt-1.5 mr-3 shrink-0"></span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">PhD and PostDoc under Visvesvaraya Scheme</span>
                  </div>
                  <div className="pl-5 mt-1">
                    <a href="/documents/Visvesvaraya_PhD_PostDoc_Brochure_Oct_2026_IIIT_Pune.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-red dark:text-brand-red-dark hover:underline flex items-center gap-1 font-semibold">
                      <span>• Full-time PhD/Part-time PhD/PostDoc Position under Visvesvaraya PhD Scheme for Electronics & IT</span>
                    </a>
                  </div>
                </li>

                <li className="flex flex-col">
                  <div className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-accent dark:bg-accent-dark mt-1.5 mr-3 shrink-0"></span>
                    <a href="https://ccmt.admissions.nic.in/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red-dark transition-colors">B.Tech via DASA (JEE Main)</a>
                  </div>
                  <div className="pl-5 mt-1">
                    <a href="/documents/DASA physical reporting instructions.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-red dark:text-brand-red-dark hover:underline flex items-center gap-1 font-semibold">
                      <span>• Physical Reporting Instructions: DASA (AY 2026-27)</span>
                    </a>
                  </div>
                </li>
                <li className="flex flex-col">
                  <div className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-accent dark:bg-accent-dark mt-1.5 mr-3 shrink-0"></span>
                    <a href="https://josaa.nic.in/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red-dark transition-colors">B.Tech via JoSAA/CSAB (JEE Main)</a>
                  </div>
                  <div className="pl-5 mt-1">
                    <a href="/documents/DETAILS%20OF%20ADMISSION%20PROCESS%20FOR%20FIRST%20SEMESTER%202026-27.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-red dark:text-brand-red-dark hover:underline flex items-center gap-1 font-semibold">
                      <span>• Physical Reporting Instructions: JoSAA/CSAB 2026</span>
                    </a>
                  </div>
                </li>
                <li className="flex flex-col">
                  <div className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-accent dark:bg-accent-dark mt-1.5 mr-3 shrink-0"></span>
                    <a href="https://ccmt.admissions.nic.in/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red-dark transition-colors">M.Tech (CSE & ECE) via CCMT (GATE)</a>
                  </div>
                  <div className="pl-5 mt-1">
                    <a href="/documents/PHYSICAL_REPORTING_DETAILS_OF_ADMISSION_PROCESS_FOR_MTECH_THROUGH_CCMT_FIRST_SEMESTER_2026-27.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-red dark:text-brand-red-dark hover:underline flex items-center gap-1 font-semibold">
                      <span>• Physical Reporting Details (AY 2026-27)</span>
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-accent dark:bg-accent-dark mt-1.5 mr-3 shrink-0"></span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">PhD Programs - Regular & Part-Time</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-accent dark:bg-accent-dark mt-1.5 mr-3 shrink-0"></span>
                  <a href="https://dasanit.org/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red-dark transition-colors">International Admissions (DASA)</a>
                </li>
              </ul>
              <Link to="/admissions" className="text-brand-red dark:text-brand-red-dark font-semibold text-sm flex items-center hover:underline group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors mt-auto">
                View Admissions details <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>

          {/* Card 3: Director's Desk */}
          <div className="bg-white dark:bg-surface-dark rounded-xl shadow-md overflow-hidden border border-gray-150 dark:border-gray-800 flex flex-col group">
            <div className="bg-primary dark:bg-gray-800 text-white py-3 px-5 font-bold font-serif text-lg md:text-xl">
              Director's Desk
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-accent shrink-0 shadow-sm">
                  <img src="/director.jpeg" alt="Director Prof. Vineet Kansal" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-base">Prof. Vineet Kansal</h4>
                  <p className="text-xs text-accent dark:text-accent-dark font-medium">Director</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-justify mb-4 flex-grow line-clamp-4">
                "Welcome to the Indian Institute of Information Technology Pune (IIIT Pune), an Institute of National Importance. As a part of the prestigious IIIT ecosystem established by the Government of India, IIITs have played a significant role in developing highly skilled professionals, researchers, and innovators in Information Technology. Building on this legacy, IIIT Pune is committed to excellence in education, research, innovation, and entrepreneurship while fostering a culture of academic rigor, creativity, and lifelong learning."
              </p>
              <Link to="/administration/director" className="text-brand-red dark:text-brand-red-dark font-semibold text-sm flex items-center hover:underline group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors mt-auto">
                Read Director's Message <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>

        </div>
        </FadeInSection>

        {/* Why IIIT Pune Section */}
        <FadeInSection delay={0.1}>
        <div className="mt-16 pt-12">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary dark:text-white">
              Why IIIT Pune?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For Students */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleReasonToggle('students')}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleReasonToggle('students');
                }
              }}
              className={`bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-150 dark:border-gray-800 p-6 md:p-8 hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between group cursor-pointer ${expandedReasonSection === 'students' ? 'h-auto' : 'h-[24rem]'}`}
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl" />
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <GraduationCap size={24} />
                  </span>
                  <h3 className="text-xl font-bold font-serif text-gray-800 dark:text-white">For Students</h3>
                </div>
                  
                <div className={`relative overflow-hidden transition-all duration-300 ${expandedReasonSection === 'students' ? 'h-auto' : 'h-56'}`}>
                  <div className={expandedReasonSection === 'students' ? 'space-y-3' : 'flex flex-col gap-3 animate-reason-scroll-up'}>
                    {(expandedReasonSection === 'students' ? studentWhyPoints : studentWhyPointsLoop).map((item, index) => (
                      <div key={`student-${index}`} className="flex gap-3">
                        <div className="mt-1.5 shrink-0">
                          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 block"></span>
                        </div>
                        <div>
                          <h4 className="font-bold text-base text-gray-800 dark:text-gray-200">{item.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed text-justify">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-5">
                <p className="text-left text-xs text-blue-600 dark:text-blue-400 font-medium animate-pulse">
                  {expandedReasonSection === 'students' ? 'Click again to collapse details' : '👆 Click the card to view all details'}
                </p>
              </div>
            </div>

            {/* For Faculty */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleReasonToggle('faculty')}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleReasonToggle('faculty');
                }
              }}
              className={`bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-150 dark:border-gray-800 p-6 md:p-8 hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between group cursor-pointer ${expandedReasonSection === 'faculty' ? 'h-auto' : 'h-[24rem]'}`}
              >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-brand-red rounded-t-2xl" />
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="p-2 rounded-xl bg-red-50 dark:bg-red-950/30 text-brand-red dark:text-brand-red-dark">
                    <Briefcase size={24} />
                  </span>
                  <h3 className="text-xl font-bold font-serif text-gray-800 dark:text-white">For Faculty</h3>
                </div>

                <div className={`relative overflow-hidden transition-all duration-300 ${expandedReasonSection === 'faculty' ? 'h-auto' : 'h-56'}`}>
                  <div className={expandedReasonSection === 'faculty' ? 'space-y-3' : 'flex flex-col gap-3 animate-reason-scroll-up'}>
                    {(expandedReasonSection === 'faculty' ? facultyWhyPoints : facultyWhyPointsLoop).map((item, index) => (
                      <div key={`faculty-${index}`} className="flex gap-3">
                        <div className="mt-1.5 shrink-0">
                          <span className="w-2 h-2 rounded-full bg-brand-red dark:bg-brand-red-dark block"></span>
                        </div>
                        <div>
                          <h4 className="font-bold text-base text-gray-800 dark:text-gray-200">{item.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed text-justify">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-5">
                <p className="text-right text-xs text-blue-600 dark:text-blue-400 font-medium animate-pulse">
                  {expandedReasonSection === 'faculty' ? 'Click again to collapse details' : 'Click the card to view all details 👆'}
                </p>
              </div>
            </div>
          </div>
        </div>
        </FadeInSection>

        {/* Row 2: Achievements Section */}
        <FadeInSection delay={0.1}>
        <div className="mt-16 pt-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary dark:text-white">
                Our Achievements
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Celebrating outstanding milestones achieved by our students and faculty.
              </p>
            </div>

            <div className="flex items-center space-x-4 self-start md:self-center">
              {/* Tab Selectors */}
              <div className="flex bg-gray-100 dark:bg-gray-800/40 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleTabChange('students')}
                  className={`px-4 py-2 text-xs font-bold rounded-md transition-all duration-200 ${activeTab === 'students'
                      ? 'bg-brand-red text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                >
                  Students
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange('faculty')}
                  className={`px-4 py-2 text-xs font-bold rounded-md transition-all duration-200 ${activeTab === 'faculty'
                      ? 'bg-brand-red text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                >
                  Faculty / Staff
                </button>
              </div>

              {/* Navigation Chevrons */}
              <div className="flex bg-gray-100 dark:bg-gray-800/40 p-1 rounded-lg space-x-1">
                <button
                  onClick={prevSlide}
                  className="p-1.5 rounded hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-1.5 rounded hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Sliding Grid Layout of Achievements */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-in-out">
              {/* Card 1 (Always visible) */}
              {currentList.length > 0 && renderCard(currentList[startIndex])}

              {/* Card 2 (Visible on md and up) */}
              {currentList.length > 1 && (
                <div className="hidden md:block">
                  {renderCard(currentList[(startIndex + 1) % currentList.length])}
                </div>
              )}

              {/* Card 3 (Visible on lg and up) */}
              {currentList.length > 2 && (
                <div className="hidden lg:block">
                  {renderCard(currentList[(startIndex + 2) % currentList.length])}
                </div>
              )}
            </div>
          </div>
        </div>
        </FadeInSection>

      </div>

      <style>{`
        @keyframes reasonScrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-reason-scroll-up {
          animation: reasonScrollUp 16s linear infinite;
          will-change: transform;
        }
        .animate-reason-scroll-up:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default InfoCards;
