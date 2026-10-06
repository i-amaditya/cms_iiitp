import { useState, useMemo } from "react";
import { Link } from "react-router";
import PageHeader from "../components/shared/PageHeader";
import { Clock, Users, Award, Mail, Phone, ExternalLink, BookOpen, Building, Microchip, Cpu, GraduationCap, Network, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import facultyDetails from "../data/faculty_details.json";

const AshDepartmentPage = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [activeProgram, setActiveProgram] = useState("foundation");
  const [activeSemester, setActiveSemester] = useState(1);

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

  // Extract ASH Faculty
  const ashFaculty = useMemo(() => {
    return Object.entries(facultyDetails)
      .filter(([_, details]) => details.department === "ASH")
      .map(([slug, details]) => {
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
  const originalHod = ashFaculty.find(f => f.slug === "jatin-majithia");

const hodProfile = {
  ...originalHod,
  email: "hodash@iiitp.ac.in"
};

  const foundationCurriculum = [
  {
    semester: 1,
    totalCredits: 23,
    courses: [
      { name: "Calculus and Differential Equations", hours: "3-1-0", credits: 3 },
      { name: "Linear Algebra and Discrete Structure", hours: "3-1-0", credits: 3 },
      { name: "Probability and Random Process", hours: "3-0-0", credits: 3 },
      { name: "Applied Graph Theory", hours: "3-0-0", credits: 3 },
      { name: "Linear and Non-Linear Optimization", hours: "3-0-0", credits: 3 },
      { name: "Indian Knowledge System (IKS)", hours: "1-0-0", credits: 1 },
      { name: "Environmental Studies", hours: "2-0-0", credits: 2 },
      { name: "Language and Writing Skills", hours: "2-0-0", credits: 2 },
      { name: "Humanities and Social Ethics", hours: "2-0-0", credits: 2 },
      { name: "Innovation and Entrepreneurship Studies", hours: "2-0-0", credits: 2 },
      { name: "Research Methodology", hours: "1-0-1", credits: 2 },
    ]
  }
];

  const renderCurriculumTable = (curriculum, activeSemester, setActiveSemester, semCount) => {
    return (
      <div className="space-y-6">
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
                The Department of Applied Science and Humanities is the cornerstone of a well-rounded technical education. By offering courses in Mathematics, Humanities, Social Sciences, and Management, the department plays an integral role in equipping students with the analytical, critical thinking, communication, and ethical skills required to thrive in today’s rapidly evolving technical landscape. Our goal is to seamlessly blend mathematical rigor with human-centered insights to produce graduates who are not only technically proficient but also socially responsible and globally aware.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-slate-50 dark:bg-gray-850 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-primary dark:text-accent font-serif mb-1">2016</span>
                <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Established Year</span>
              </div>
              <div className="bg-slate-50 dark:bg-gray-850 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-primary dark:text-accent font-serif mb-1">2</span>
                <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Academic Programs</span>
              </div>
              <div className="bg-slate-50 dark:bg-gray-850 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-primary dark:text-accent font-serif mb-1">10+</span>
                <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Faculty & Researchers</span>
              </div>
            </div>
          </div>
        );

      case "hod":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
              Hod Message
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
                      J
                    </div>
                  )}
                </div>

                <h3 className="text-base font-bold font-serif text-gray-900 dark:text-white mb-0.5">
                  {hodProfile.name}
                </h3>
                <p className="text-[11px] text-brand-red font-bold uppercase tracking-wide">
                  Head of Department (ASH)
                </p>
                <p className="text-[10px] text-gray-450 dark:text-gray-500 font-medium">
                  {hodProfile.education || "Ph.D."}
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
                  The Department of Applied Sciences and Humanities occupies a foundational role in realising the Institute's vision of producing proficient, ethical, and socially responsible professionals. We believe that technology, when grounded in mathematical rigour, humanistic values, and scientific thinking, becomes a true instrument of societal progress and it is this conviction that shapes everything we do.
                </p>
                <p>
                  Mathematics forms the intellectual core of our department. From calculus and linear algebra to probability and discrete mathematics, we provide the analytical foundation upon which all engineering and technology education rests. Alongside this, our faculty are actively engaged in teaching and research across Environmental Studies, Humanities, and Social Sciences together offering students a truly multidisciplinary academic experience.
                </p>
                <p>
                  In alignment with NEP 2020, the department emphasises holistic education that moves beyond narrow specialisation. We nurture critical thinking, effective communication, ethical reasoning, and environmental awareness - qualities that are as essential to a capable engineer as technical expertise itself. We are committed to fostering an open intellectual environment where ideas are freely exchanged, diverse perspectives are valued, and students are empowered to engage meaningfully with both local and global challenges.
                </p>
                <p>
                  Our goal is not merely to complement technical education, but to be an integral part of it - shaping engineers and technologists who are as capable of thoughtful human engagement as they are of solving complex problems.
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
                To be a leading department that integrates Applied Science and Humanities to develop well-rounded professionals who excel in both technical and humanistic aspects of Engineering and Technology.
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
                { number: "01", text: "To provide high-quality education in Mathematics, Humanities, and Management, enabling students to bridge the gap between technical expertise and human-centered problem-solving." },
                { number: "02", text: "To foster critical thinking, ethical reasoning, and effective communication through a curriculum that emphasizes interdisciplinary learning." },
                { number: "03", text: "To promote research in Mathematics, Humanities, and Management, that addresses contemporary societal, technological, and industrial challenges." }
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
                { id: "foundation", label: "Foundation Courses" },
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

            {activeProgram === "foundation" && (
              <div className="space-y-6">
                <p className="text-gray-650 dark:text-gray-350 leading-relaxed text-justify text-sm sm:text-base mb-6">
                  The Department of Applied Sciences and Humanities contributes to the undergraduate and postgraduate curriculum by offering a comprehensive suite of courses that equip students with the mathematical, communication, ethical, environmental, and innovation competencies required for engineering education.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-primary dark:text-white mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary dark:text-blue-400">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      Courses Offered
                    </h3>
                    <ul className="list-none space-y-2 text-sm text-gray-750 dark:text-gray-300 ml-2">
                      {[
                          "Calculus and Differential Equations",
                          "Linear Algebra and Discrete Structure",
                          "Probability and Random Process",
                          "Applied Graph Theory",
                          "Linear and Non-Linear Optimization",
                          "Indian Knowledge System (IKS)",
                          "Environmental Studies",
                          "Language and Writing Skills",
                          "Humanities and Social Ethics",
                          "Innovation and Entrepreneurship Studies",
                          "Research Methodology"
                        ].map((course, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2 mb-4">
                    Course Curriculum
                  </h3>
                  {renderCurriculumTable(foundationCurriculum, 1, setActiveSemester, 1)}
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
                Meet our distinguished team of professors, researchers, and instructors in Applied Sciences & Humanities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {ashFaculty.map((faculty) => (
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
                        {faculty.expertise || "Specialist in Applied Science"}
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
            <p className="text-gray-650 dark:text-gray-350 leading-relaxed text-justify text-sm sm:text-base">
              The Department of Applied Science and Humanities actively promotes research and collaborative projects that address the interface between technology, society, and mathematics. Through joint research initiatives, guest lectures, and industry projects, students are exposed to the latest advancements and real-world challenges in both technical and social domains.
            </p>
            
            <div className="space-y-6 mt-6">
              <h3 className="text-lg font-bold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
                Key Research Areas
              </h3>
              
              <div className="bg-slate-50 dark:bg-gray-855 rounded-xl p-5 border border-gray-100 dark:border-gray-800 space-y-2">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Mathematics
                </h4>
                <p className="text-sm text-gray-650 dark:text-gray-350 ml-4 leading-relaxed">
                  Algebra, Discrete Mathematics, Lattice theory, Order structure, Graph theory, Commutative Algebra, Fractional Differential equations, Applied Mathematics, Computational dynamics, Optimization.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-gray-855 rounded-xl p-5 border border-gray-100 dark:border-gray-800 space-y-2">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Humanities
                </h4>
                <p className="text-sm text-gray-650 dark:text-gray-350 ml-4 leading-relaxed">
                  English Literature, Media Studies, Women’s Studies, Narrative Medicine, Semantic Analysis, Business Communication, and Management.
                </p>
              </div>
            </div>

            <p className="text-gray-650 dark:text-gray-350 leading-relaxed text-justify text-sm sm:text-base mt-6">
              Faculty members engage in interdisciplinary research that not only advances Mathematical Sciences but also examines the societal and ethical impacts of technological innovation. At present there are 8 research scholars who are doing their Ph.D. under the department of Applied Science and Humanities.
            </p>
            <div className="pt-4">
              <h2 className="text-xl font-bold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2 mb-4">
                Collaborations and Partnerships
              </h2>
              <p className="text-gray-650 dark:text-gray-350 leading-relaxed text-justify text-sm sm:text-base">
                The department fosters collaborations with other academic departments, research institutions, and industry leaders to enhance the learning experience.
              </p>
            </div>
          </div>
        );

      case "events":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
              Career Opportunities &amp; Events
            </h2>
            <p className="text-gray-650 dark:text-gray-350 leading-relaxed text-justify text-sm sm:text-base">
              Students who take courses from the Department of Applied Mathematics and Humanities develop a strong foundation not only in technical fields but also in critical thinking, ethical reasoning, and communication. These skills make them highly sought after by employers across a range of industries.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-200 pb-16">
      <PageHeader
        title="Department of Applied Science and Humanities"
        subtitle="Bridging mathematical rigor with human-centered scientific insights"
        backgroundImage="/campus-image.jpg"
        compact={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Menu (3 Columns on Large Screens) */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm lg:sticky lg:top-44 self-start w-full space-y-4">
              <h3 className="text-gray-800 dark:text-white font-extrabold font-serif px-2 pb-2 border-b border-gray-100 dark:border-gray-800 text-sm tracking-wide uppercase">
                ASH Navigation
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

export default AshDepartmentPage;
