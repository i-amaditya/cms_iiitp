import { useState, useMemo } from "react";
import { Link } from "react-router";
import PageHeader from "../components/shared/PageHeader";
import { Clock, Users, Award, Mail, Phone, ExternalLink, BookOpen, Building, Microchip, Cpu, GraduationCap, Network, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import facultyDetails from "../data/faculty_details.json";

const EceDepartmentPage = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [activeProgram, setActiveProgram] = useState("btech");
  const [activeBtechSemester, setActiveBtechSemester] = useState(1);
  const [activeMtechSemester, setActiveMtechSemester] = useState(1);

  const tabs = [
    { id: "about", label: "About the Department", icon: Building },
    { id: "hod", label: "Hod Message", icon: Users },
    { id: "vision", label: "Vision", icon: Award },
    { id: "mission", label: "Mission", icon: GraduationCap },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "people", label: "People", icon: Users },
    { id: "labs", label: "Labs", icon: Cpu },
    { id: "projects", label: "Projects/patent/consultant", icon: Network },
    { id: "events", label: "Event/News", icon: FileText }
  ];

  // Extract CSE Faculty
  const eceFaculty = useMemo(() => {
    return Object.entries(facultyDetails)
      .filter(([_, details]) => details.department === "ECE")
      .map(([slug, details]) => {
        // Derive name from slug if not provided, or capitalize slug nicely
        const nameParts = slug.split("-");
        const formattedName = nameParts.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        return {
          ...details,
          name: formattedName,
          slug: slug
        };
      });
  }, []);

  // HOD Profile URL & details helper
  const originalHod = eceFaculty.find(f => f.slug === "nagendra-kushwaha");

const hodProfile = {
  ...originalHod,
  email: "hodece@iiitp.ac.in"
};

  const btechCurriculum = [
    {
      semester: 1,
      totalCredits: 19,
      courses: [
        { name: "Basic Electronics Engineering", hours: "3-0-2", credits: 4 },
        { name: "Foundation of Computer Science", hours: "3-0-0", credits: 3 },
        { name: "Engineering Calculus", hours: "3-0-0", credits: 3 },
        { name: "Computer Programming Concept & Practice", hours: "3-0-2", credits: 4 },
        { name: "Language & Writing Skills", hours: "2-0-0", credits: 2 },
        { name: "Innovation", hours: "1-0-0", credits: 1 },
        { name: "Environmental Studies", hours: "2-0-0", credits: 2 }
      ]
    },
    {
      semester: 2,
      totalCredits: 20,
      courses: [
        { name: "Digital Logic & Design", hours: "3-0-2", credits: 4 },
        { name: "Data Structure & Algorithms", hours: "3-0-2", credits: 4 },
        { name: "Object Oriented Programming Language", hours: "3-0-2", credits: 4 },
        { name: "Engineering Mathematics-II", hours: "3-0-0", credits: 3 },
        { name: "Humanities", hours: "2-0-0", credits: 2 },
        { name: "Entrepreneurship Studies", hours: "1-0-0", credits: 1 },
        { name: "Consciousness and Values", hours: "2-0-0", credits: 2 }
      ]
    },
    {
      semester: 3,
      totalCredits: 20,
      courses: [
        { name: "Design and Analysis of Algorithms", hours: "3-0-2", credits: 4 },
        { name: "Computer Organization and Architecture", hours: "3-0-0", credits: 3 },
        { name: "Signals and Systems", hours: "3-0-0", credits: 3 },
        { name: "Probability and Random Process", hours: "3-0-0", credits: 3 },
        { name: "Network Theory and Analysis", hours: "3-0-0", credits: 3 },
        { name: "Python Programming", hours: "3-0-2", credits: 4 }
      ]
    },
    {
      semester: 4,
      totalCredits: 22,
      courses: [
        { name: "Analog Electronics Circuit", hours: "3-0-2", credits: 4 },
        { name: "Artificial Intelligence", hours: "3-0-0", credits: 3 },
        { name: "Operating System", hours: "3-0-2", credits: 4 },
        { name: "Java Programming", hours: "2-0-2", credits: 3 },
        { name: "Signals and Systems", hours: "3-0-0", credits: 3 },
        { name: "Analog Communication", hours: "3-0-2", credits: 4 },
        { name: "Minor Project-I", hours: "0-0-2", credits: 1 }
      ]
    },
    {
      semester: 5,
      totalCredits: 22,
      courses: [
        { name: "Electromagnetic Theory and Applications", hours: "3-0-0", credits: 3 },
        { name: "Digital Communication", hours: "3-0-2", credits: 4 },
        { name: "VLSI Design", hours: "3-0-2", credits: 4 },
        { name: "Machine learning, (Elective 1)", hours: "3-0-0", credits: 3 },
        { name: "Image Processing, (Elective 2)", hours: "3-0-0", credits: 3 },
        { name: "Modelling and Synthesis with Verilog HDL, (Elective 3)", hours: "3-0-0", credits: 3 },
        { name: "Minor Project-II", hours: "0-0-4", credits: 2 }
      ]
    },
    {
      semester: 6,
      totalCredits: 22,
      courses: [
        { name: "Information Theory and Coding", hours: "3-0-0", credits: 3 },
        { name: "Wireless communication", hours: "3-0-2", credits: 4 },
        { name: "Embedded System", hours: "3-0-0", credits: 3 },
        { name: "Elective 1 (DE)", hours: "3-0-0", credits: 3 },
        { name: "Elective 2 (OE)", hours: "3-0-0", credits: 3 },
        { name: "Elective 3 (OE)", hours: "3-0-0", credits: 3 },
        { name: "Minor Project-III", hours: "0-0-6", credits: 3 }
      ]
    },
    {
      semester: 7,
      totalCredits: 17,
      courses: [
        { name: "Advanced Wireless Communication", hours: "3-0-0", credits: 3 },
        { name: "Cyber Physical System", hours: "3-0-0", credits: 3 },
        { name: "Wireless Sensor Network, (Elective 1)", hours: "3-0-0", credits: 3 },
        { name: "Deep Learning, (Elective 2)", hours: "3-0-0", credits: 3 },
        { name: "Internship-I", hours: "0-0-4", credits: 2 },
        { name: "Major Project-I", hours: "0-0-6", credits: 3 }
      ]
    },
    {
      semester: 8,
      totalCredits: 16,
      courses: [
        { name: "Major Project-II", hours: "0-0-32", credits: 16 }
      ]
    }
  ];

  const mtechCurriculum = [
    {
      semester: 1,
      totalCredits: 17,
      courses: [
        { name: "Fundamentals of IC Design", hours: "3-0-0", credits: 3 },
        { name: "Fabrication Technology of IC", hours: "3-0-0", credits: 3 },
        { name: "Modeling and Synthesis with Verilog HDL", hours: "3-0-0", credits: 3 },
        { name: "Research Methodology", hours: "1-0-2", credits: 2 },
        { name: "EDA Laboratory", hours: "0-0-6", credits: 3 },
        { name: "Elective: Semiconductor Device Modelling", hours: "3-0-0", credits: 3 }
      ]
    },
    {
      semester: 2,
      totalCredits: 20,
      courses: [
        { name: "RF Integrated Circuit (RFIC) Technology", hours: "3-0-2", credits: 4 },
        { name: "Semiconductor Memory Design", hours: "3-0-0", credits: 3 },
        { name: "Advanced IC Design", hours: "3-0-0", credits: 3 },
        { name: "Elective 1: Digital System Design", hours: "3-0-0", credits: 3 },
        { name: "Elective 2:", hours: "3-0-0", credits: 3 },
        { name: "Minor Project", hours: "0-0-8", credits: 4 }
      ]
    },
    {
      semester: 3,
      totalCredits: 15,
      courses: [
        { name: "Major Project-I / Internship-I", hours: "0-0-20", credits: 15 }
      ]
    },
    {
      semester: 4,
      totalCredits: 15,
      courses: [
        { name: "Major Project-II / Internship-II", hours: "0-0-20", credits: 15 }
      ]
    }
  ];

  const renderCurriculumTable = (curriculum, activeSemester, setActiveSemester, semCount) => {
    return (
      <div className="space-y-6">
        <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar border-b border-gray-150 dark:border-gray-800">
          {Array.from({ length: semCount }, (_, i) => i + 1).map((sem) => (
            <button
              key={sem}
              onClick={() => setActiveSemester(sem)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${activeSemester === sem
                  ? "bg-primary text-white shadow-sm"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-650 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              Semester {sem}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800">
                  <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider w-[65%]">Course Name</th>
                  <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider text-center w-[20%] whitespace-nowrap">Hours/Week (L-T-P)</th>
                  <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider text-center w-[15%]">Credits</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="wait">
                  {curriculum.find(c => c.semester === activeSemester)?.courses.map((course, idx) => (
                    <motion.tr
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15, delay: idx * 0.03 }}
                      key={course.name}
                      className="border-b border-gray-100 dark:border-gray-850 hover:bg-blue-50/20 dark:hover:bg-blue-900/5 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 font-medium">{course.name}</td>
                      <td className="py-3 px-4 text-center text-sm text-gray-700 dark:text-gray-300 font-bold">{course.hours}</td>
                      <td className="py-3 px-4 text-center text-sm text-accent-dark dark:text-accent font-bold">{course.credits}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {curriculum.find(c => c.semester === activeSemester)?.totalCredits && (
                  <tr className="bg-blue-50/20 dark:bg-blue-900/5 border-t border-gray-150 dark:border-gray-855 font-bold">
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 text-right pr-6" colSpan="2">
                      Total Semester Credits
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-accent-dark dark:text-accent font-extrabold text-base">
                      {curriculum.find(c => c.semester === activeSemester).totalCredits}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
                About the Department
              </h2>
              <p className="text-gray-650 dark:text-gray-350 leading-relaxed text-justify text-sm sm:text-base">
                The mission of the Department of Electronics and Communication Engineering is to train and empower young minds at undergraduate and postgraduate levels. The department nurtures students with outstanding abilities to become innovators and leaders. It also promotes advanced and interdisciplinary research in Electronics, Communication Engineering, and Information Technology. The department offers three programmes: B.Tech., M.Tech., and Ph.D., respectively.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-slate-50 dark:bg-gray-850 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-primary dark:text-accent font-serif mb-1">2016</span>
                <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Established Year</span>
              </div>
              <div className="bg-slate-50 dark:bg-gray-850 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-primary dark:text-accent font-serif mb-1">3</span>
                <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Academic Programs</span>
              </div>
              <div className="bg-slate-50 dark:bg-gray-850 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-primary dark:text-accent font-serif mb-1">15+</span>
                <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Faculty & Researchers</span>
              </div>
            </div>
          </div>
        );

      case "hod":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
              HOD Message
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-56 shrink-0 bg-slate-50 dark:bg-gray-850 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-750 shadow-md mx-auto mb-4 bg-gray-50 dark:bg-gray-800 relative">
                  {hodProfile.image ? (
                    <img
                      src={hodProfile.image}
                      alt={hodProfile.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(hodProfile.name)}&background=1B3A6B&color=fff&size=512`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-primary font-serif font-bold bg-blue-50 dark:bg-gray-800">
                      B
                    </div>
                  )}
                </div>

                <h3 className="text-base font-bold font-serif text-gray-900 dark:text-white mb-0.5">
                  {hodProfile.name}
                </h3>
                <p className="text-[11px] text-brand-red font-bold uppercase tracking-wide">
                  Head of Department (ECE)
                </p>
                <p className="text-[10px] text-gray-450 dark:text-gray-500 font-medium">
                  {hodProfile.education || "Ph.D., M.Tech., B.Tech."}
                </p>
                
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-left space-y-2 text-xs text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                    <a href={`mailto:${hodProfile.email}`} className="hover:text-brand-red transition-colors truncate">
                      {hodProfile.email}
                    </a>
                  </div>
                  {hodProfile.phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span className="leading-tight">{hodProfile.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 text-gray-650 dark:text-gray-350 leading-relaxed text-justify text-sm sm:text-base">
                <p>
                  At the forefront of emerging electronic and communication technologies, the department nurtures skilled engineers and innovators for the digital age. The department strives to provide a strong foundation in electronics, communication systems, semiconductor technologies, embedded systems, and emerging areas of engineering through a balanced approach to teaching, research, and innovation.
                </p>
                <p>
                  We emphasize experiential learning, project-based education, and hands-on laboratory training to help students develop both theoretical understanding and practical expertise. Our mission is to prepare skilled engineers, researchers, and innovators who can contribute to technological advancement in an increasingly connected world.
                </p>
                <div className="pt-2">
                  <Link
                    to={`/people/faculty/${hodProfile.slug}`}
                    className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                  >
                    View HOD Profile <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );

      case "vision":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
              Vision
            </h2>
            <div className="bg-gradient-to-br from-blue-50/40 to-indigo-50/20 dark:from-gray-850 dark:to-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 md:p-12 relative overflow-hidden">
              <span className="absolute -top-6 left-4 text-8xl font-serif text-primary/10 dark:text-blue-400/10 pointer-events-none">&ldquo;</span>
              <p className="text-gray-750 dark:text-gray-250 text-base md:text-lg leading-relaxed text-justify italic font-medium relative z-10">
                To be a premier center of excellence in Electronics and Communication Engineering education and research, fostering innovation and developing ethical, globally competent professionals to address societal challenges.
              </p>
            </div>
          </div>
        );

      case "mission":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
              Mission
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {[
                { number: "01", text: "To impart high-quality education through a modern curriculum and hands-on learning in Electronics and Communication Engineering." },
                { number: "02", text: "To encourage research and innovation in cutting-edge communication technologies (VLSI, IoT, RF systems, and wireless communications)." },
                { number: "03", text: "To promote industry collaboration, internships, and entrepreneurship among students." },
                { number: "04", text: "To instill ethical values, leadership qualities, and social responsibility in future electronics engineers." }
              ].map((m) => (
                <div key={m.number} className="flex gap-4 items-start bg-slate-50 dark:bg-gray-855 p-5 rounded-xl border border-gray-100 dark:border-gray-800">
                  <span className="text-lg font-bold text-accent dark:text-accent-dark font-mono leading-none mt-0.5">
                    {m.number}.
                  </span>
                  <p className="text-gray-650 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                    {m.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "courses":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
              Degree Programs &amp; Courses
            </h2>

            {/* Sub-tabs for Course selection */}
            <div className="flex gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              {[
                { id: "btech", label: "B.Tech. Program" },
                { id: "mtech", label: "M.Tech. Program" },
                { id: "phd", label: "Ph.D. Program" }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProgram(p.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    activeProgram === p.id
                      ? "bg-primary text-white shadow-xs"
                      : "bg-gray-50 dark:bg-gray-850 text-gray-650 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {activeProgram === "btech" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-gray-800/50 dark:to-gray-800/30 p-4 rounded-xl border border-blue-50/50 dark:border-gray-800">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-[10px] text-gray-450 dark:text-gray-550 font-bold uppercase tracking-wider">Duration</p>
                      <p className="font-bold text-sm text-gray-850 dark:text-gray-250">4 Years (8 Semesters)</p>
                    </div>
                  </div>
                  {/* 
                  <div className="flex items-center gap-3 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-gray-800/50 dark:to-gray-800/30 p-4 rounded-xl border border-blue-50/50 dark:border-gray-800">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-[10px] text-gray-450 dark:text-gray-550 font-bold uppercase tracking-wider">Intake</p>
                      <p className="font-bold text-sm text-gray-855 dark:text-gray-250">180 Students (B.Tech CSE)</p>
                    </div>
                  </div>
                  */}
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
                    Degree Programs
                  </h3>
                  <ul className="list-decimal list-inside text-sm space-y-2 font-medium text-gray-750 dark:text-gray-300">
                    <li>
                      <Link to="/academics/ug-pg-schemes#btech-ece" className="hover:text-primary dark:hover:text-accent transition-colors">
                        B.Tech Electronics and Communication Engineering
                      </Link>
                    </li>
                    
                  </ul>
                </div>
              </div>
            )}

            {activeProgram === "mtech" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-gray-800/50 dark:to-gray-800/30 p-4 rounded-xl border border-blue-50/50 dark:border-gray-800">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-[10px] text-gray-450 dark:text-gray-550 font-bold uppercase tracking-wider">Duration</p>
                      <p className="font-bold text-sm text-gray-855 dark:text-gray-250">2 Years (4 Semesters)</p>
                    </div>
                  </div>
                  {/*
                  <div className="flex items-center gap-3 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-gray-800/50 dark:to-gray-800/30 p-4 rounded-xl border border-blue-50/50 dark:border-gray-800">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-[10px] text-gray-450 dark:text-gray-550 font-bold uppercase tracking-wider">Intake</p>
                      <p className="font-bold text-sm text-gray-855 dark:text-gray-250">36 Students</p>
                    </div>
                  </div>
                  */}
                  <div className="flex items-center gap-3 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-gray-800/50 dark:to-gray-800/30 p-4 rounded-xl border border-blue-50/50 dark:border-gray-800">
                    <Award className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-[10px] text-gray-450 dark:text-gray-550 font-bold uppercase tracking-wider">Specialization</p>
                      <p className="font-bold text-sm text-gray-855 dark:text-gray-250">Artificial Intelligence</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/35 border border-gray-150 dark:border-gray-800 rounded-xl space-y-2">
                  <strong className="text-xs text-primary dark:text-accent font-bold uppercase tracking-wider">Admissions Path</strong>
                  <ul className="list-disc list-inside text-xs text-gray-650 dark:text-gray-450 space-y-1 pl-1">
                    <li>GATE Mode: Through Centralized Counseling for M.Tech./M.Arch./M.Plan. (CCMT)</li>
                    <li>Non-GATE Mode: Written test followed by research assessment interview at IIIT Pune</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
                    Degree Programs
                  </h3>
                  <ul className="list-decimal list-inside text-sm space-y-2 font-medium text-gray-750 dark:text-gray-300">
                    <li>
                      <Link to="/academics/ug-pg-schemes#mtech-ece" className="hover:text-primary dark:hover:text-accent transition-colors">
                        M.Tech Electronics and Communication Engineering
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeProgram === "phd" && (
              <div className="space-y-6">
                <p className="text-sm text-gray-650 dark:text-gray-300 leading-relaxed text-justify">
                  The Doctor of Philosophy (Ph.D.) Programme is aimed at assisting students in acquiring proficiency in their chosen area of research. The academic Programme leading to the Ph.D. degree is broad-based and involves a course credit requirement and a research thesis submission.
                </p>
                <div className="bg-teal-50/20 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/30 p-4 rounded-xl flex items-start gap-3">
                  <div className="bg-teal-500/10 dark:bg-teal-400/10 p-1.5 rounded-full text-teal-600 dark:text-teal-400">
                    <GraduationCap className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <strong className="text-xs text-teal-800 dark:text-teal-450 font-bold uppercase tracking-wider block mb-0.5">Admissions</strong>
                    <p className="text-xs text-gray-650 dark:text-teal-200/70">
                      The admission to Ph.D. programme is conducted periodically through institutional announcements and advertisements.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-base font-bold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
                    Collaborative Research Centres
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-855 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                      <span className="w-6 h-6 shrink-0 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold text-xs">1</span>
                      <span className="font-semibold text-xs text-gray-750 dark:text-gray-300">Centre of Robotics and Security in IoT Space</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-855 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                      <span className="w-6 h-6 shrink-0 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold text-xs">2</span>
                      <span className="font-semibold text-xs text-gray-750 dark:text-gray-300">Centre of Indian Languages and Computational Intelligence</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "people":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 mb-2">
                Department Faculty &amp; Staff
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Meet our distinguished team of professors, researchers, and instructors in Computer Science and Engineering.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {eceFaculty.map((faculty) => (
                <Link
                  to={`/people/faculty/${faculty.slug}`}
                  key={faculty.slug}
                  className="group bg-white dark:bg-surface-dark rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full relative"
                >
                  <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-gray-855/50 pointer-events-none"></div>

                  <div className="w-24 h-24 mx-auto mt-6 bg-gray-100 dark:bg-gray-800 relative z-10 overflow-hidden rounded-full shadow-xs border-4 border-white dark:border-gray-800 shrink-0">
                    {faculty.image ? (
                      <img
                        src={faculty.image}
                        alt={faculty.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&background=1B3A6B&color=fff&size=512`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl text-primary font-serif font-bold bg-blue-50 dark:bg-gray-800">
                        {faculty.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex-grow flex flex-col items-center text-center z-10 w-full mt-1">
                    <h3 className="text-base font-bold font-serif text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-accent transition-colors line-clamp-1 w-full">
                      {faculty.name}
                    </h3>
                    <div className="h-8 flex items-start justify-center w-full mb-1">
                      <p className="text-xs text-brand-red font-semibold leading-normal line-clamp-2">
                        {faculty.designation.split('\n')[0]}
                      </p>
                    </div>
                    <div className="w-8 h-px bg-gray-200 dark:bg-gray-800 mb-2 mt-1 shrink-0" />
                    <div className="h-10 w-full flex items-center justify-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-normal line-clamp-2 w-full">
                        {faculty.expertise || "Specialist in Electronics & Communication"}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );

      case "labs":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
              Department Laboratories
            </h2>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
              Projects, Patents &amp; Consultancy
            </h2>
          </div>
        );

      case "events":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
              Department Events &amp; News
            </h2>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-200 pb-16">
      <PageHeader
        title="Department of Electronics & Communication Engineering"
        subtitle="Empowering innovators at the forefront of semiconductor, communication, and electronic technologies"
        backgroundImage="/campus-image.jpg"
        compact={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Menu (3 Columns on Large Screens) */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm lg:sticky lg:top-44 self-start w-full space-y-4">
              <h3 className="text-gray-800 dark:text-white font-extrabold font-serif px-2 pb-2 border-b border-gray-100 dark:border-gray-800 text-sm tracking-wide uppercase">
                ECE Navigation
              </h3>
              
              {/* Desktop vertical sidebar */}
              <div className="hidden lg:flex flex-col space-y-1">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
                        isActive
                          ? "bg-primary text-white shadow-xs font-bold"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-855 hover:text-primary dark:hover:text-accent"
                      }`}
                    >
                      <span className="text-sm font-semibold tracking-wide flex-grow">{tab.label}</span>
                      
                      {/* Active indicator dot */}
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Mobile horizontal scroll bar */}
              <div className="lg:hidden flex overflow-x-auto gap-2 pb-2 no-scrollbar">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-transparent text-gray-755 dark:text-gray-300 border-gray-150 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-850"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Main Content Area (9 Columns on Large Screens) */}
          <div className="lg:col-span-9">
            <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EceDepartmentPage;
