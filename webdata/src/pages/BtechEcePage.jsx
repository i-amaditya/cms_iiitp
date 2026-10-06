import { useState, useMemo } from "react";
import { Link } from "react-router";
import PageHeader from "../components/shared/PageHeader";
import { Clock, Users, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import facultyDetails from "../data/faculty_details.json";

const BtechEcePage = () => {
  const [activeSemester, setActiveSemester] = useState(1);

  const eceFaculty = useMemo(() => {
    return Object.entries(facultyDetails).filter(([id, f]) => {
      if (id === 'nagendra-kushwaha') return false;
      return f.department === 'ECE';
    }).map(([id, f]) => {
      const nameParts = id.split('-');
      const formattedName = nameParts.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      return {
        id,
        name: formattedName,
        image: f.image || null,
        designation: f.designation || 'Faculty Member'
      };
    });
  }, []);

  const curriculum = [
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

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="B.Tech Electronics and Communication Engineering" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 md:p-12 space-y-16">

          {/* Overview Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl shadow-xl text-white p-8 md:p-10 h-full flex flex-col justify-center">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 text-white">
                Program Overview
              </h2>
              <div className="text-blue-100 text-lg leading-relaxed mb-6 space-y-4">
                <p>
                  The primary focus of the Department of Electronics and Communication Engineering (ECE) at IIIT Pune is on collaborative research and practical education in the field of electronics and communication. The department also offers PG and doctoral courses.
                </p>
                <div>
                  <strong>The broad areas of research in the department are:</strong>
                  <ul className="list-disc list-inside mt-2 ml-4">
                    <li>Communication System</li>
                    <li>RF and Microwave Engineering</li>
                    <li>Microelectronics and VLSI</li>
                    <li>IoT and Robotics</li>
                    <li>Image Processing</li>
                  </ul>
                </div>
                <div>
                  <strong>In addition, the ECE department is equipped with the following laboratories:</strong>
                  <ul className="list-disc list-inside mt-2 ml-4">
                    <li>Communications Laboratory</li>
                    <li>VLSI Lab</li>
                    <li>IoT Lab</li>
                    <li>Semiconductor and Devices Lab</li>
                  </ul>
                </div>
                <p>
                  In addition, students are also provided with training in computing and use of Electronic Design Automation (EDA) tools.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-lg border border-white/20">
                  <Clock className="w-6 h-6 text-blue-300" />
                  <div>
                    <p className="text-xs text-blue-200 font-medium uppercase tracking-wider">Duration</p>
                    <p className="font-bold text-lg">4 Years (8 Semesters)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-lg border border-white/20">
                  <Users className="w-6 h-6 text-blue-300" />
                  <div>
                    <p className="text-xs text-blue-200 font-medium uppercase tracking-wider">Intake Capacity</p>
                    <p className="font-bold text-lg">119 Students</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Message from HOD */}
          <section className="mt-12 w-full">
            <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col md:flex-row">
              {/* Left Column: Photo & Details */}
              <div className="bg-blue-50/50 dark:bg-gray-800/50 md:w-1/3 p-8 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-md mb-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400">
                  <img
                    src="/assets/faculty_photos/nagendrakushwaha.jpg"
                    alt="Dr. Nagendra Kushwaha"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold font-serif text-gray-900 dark:text-white mb-1">
                  Dr. Nagendra Kushwaha
                </h3>
                <p className="text-brand-red dark:text-brand-red-dark font-medium text-sm mb-6">
                  Assistant Professor & Head (ECE)
                </p>

                <div className="w-full space-y-1.5 flex flex-col items-center text-center">
                  <div>
                    <Link 
                      to="/people/faculty/nagendra-kushwaha"
                      className="inline-flex items-center text-brand-red text-sm font-bold uppercase tracking-wide hover:text-red-700 transition-colors"
                    >
                      View Profile <ExternalLink className="w-4 h-4 ml-1.5" />
                    </Link>
                  </div>

                  <div className="flex items-center justify-center text-sm text-gray-700 dark:text-gray-300 w-full pt-1">
                    <a href="mailto:nagendra@iiitp.ac.in" className="hover:text-brand-red transition-colors break-all">
                      nagendra@iiitp.ac.in
                    </a>
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-700 dark:text-gray-300 w-full">
                    <span>
                      +91 9881457120
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Message */}
              <div className="md:w-2/3 p-8 md:p-10 flex flex-col justify-center relative">
                {/* Decorative Quote Mark */}
                <div className="absolute top-6 left-6 text-blue-100 dark:text-gray-800 text-8xl font-serif leading-none opacity-50 pointer-events-none">
                  "
                </div>

                <h2 className="text-2xl font-bold font-serif text-primary dark:text-white mb-6 relative z-10">
                  Message from the Head of Department
                </h2>

                <div className="space-y-4 text-gray-700 dark:text-gray-300 relative z-10 leading-relaxed text-justify">
                  <p>
                    [Placeholder Text for the HOD's Message. This section will be updated with the official message from the Head of the Electronics and Communication Engineering Department.]
                  </p>
                  <p>
                    [Additional placeholder text explaining the vision, collaborative research opportunities, and the department's commitment to nurturing skilled professionals capable of tackling modern electronics and communication challenges.]
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Faculty Box */}
          <section className="mt-12 w-full">
            <div className="flex justify-between items-end mb-8 border-b pb-4 border-gray-200 dark:border-gray-800">
              <div>
                <h2 className="text-3xl font-bold font-serif text-primary dark:text-white">
                  Faculty Members
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Meet our esteemed faculty in the Department of Electronics and Communication Engineering.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {eceFaculty.map((faculty) => (
                <Link
                  to={`/people/faculty/${faculty.id}`}
                  key={faculty.id}
                  className="group bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:border-brand-red/30 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="flex flex-col h-full p-6 items-center text-center">
                    <div className="w-32 h-32 mt-4 mb-4 rounded-full overflow-hidden border-4 border-white shadow-md relative group-hover:border-blue-100 dark:border-gray-700 dark:group-hover:border-gray-600 transition-colors">
                      {faculty.image ? (
                        <img
                          src={faculty.image}
                          alt={faculty.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&background=1B3A6B&color=fff&size=512`;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl text-primary font-serif font-bold bg-blue-50 dark:bg-gray-800">
                          {faculty.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-brand-red transition-colors mb-1">
                      {faculty.name}
                    </h3>
                    <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium flex-grow">
                      {faculty.designation.split('\n')[0]}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Curriculum & Syllabus */}
          <section className="mt-12 w-full">
            <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 md:p-10 overflow-hidden">
              <div className="flex justify-between items-end mb-8 border-b pb-4 border-gray-200 dark:border-gray-800">
                <div>
                  <h2 className="text-3xl font-bold font-serif text-primary dark:text-white">
                    Curriculum & Syllabus
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Explore the semester-wise course structure.</p>
                </div>
              </div>

              {/* Semester Tabs */}
              <div className="flex overflow-x-auto gap-2 mb-6 pb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <button
                    key={sem}
                    onClick={() => setActiveSemester(sem)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                      activeSemester === sem
                        ? "bg-brand-red text-white shadow-md dark:bg-brand-red-dark"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                    }`}
                  >
                    Semester {sem}
                  </button>
                ))}
              </div>

              {/* Course Table */}
              <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
                        <th className="w-[60%] py-2.5 px-4 font-bold text-sm tracking-wider border-b border-gray-200 dark:border-gray-700">Course Name</th>
                        <th className="w-[25%] py-2.5 px-4 font-bold text-sm tracking-wider border-b border-gray-200 dark:border-gray-700 text-center whitespace-nowrap">Hours/Week(L-T-P)</th>
                        <th className="w-[15%] py-2.5 px-4 font-bold text-sm tracking-wider border-b border-gray-200 dark:border-gray-700 text-center">Credits</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence mode="wait">
                        {curriculum.find(c => c.semester === activeSemester)?.courses.map((course, idx) => (
                          <motion.tr
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, delay: idx * 0.05 }}
                            key={course.name}
                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
                          >
                            <td className="py-2.5 px-4 text-gray-800 dark:text-gray-200 font-medium">{course.name}</td>
                            <td className="py-2.5 px-4 text-center text-gray-700 dark:text-gray-300 font-bold">{course.hours}</td>
                            <td className="py-2.5 px-4 text-center text-accent-dark font-bold">{course.credits}</td>
                          </motion.tr>
                        )) || (
                          <tr>
                            <td colSpan="3" className="py-12 text-center text-gray-500 dark:text-gray-400 italic">
                              Curriculum details for Semester {activeSemester} will be updated soon.
                            </td>
                          </tr>
                        )}
                        {curriculum.find(c => c.semester === activeSemester)?.totalCredits && (
                          <motion.tr
                            key="total"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-blue-50/80 dark:bg-blue-900/20 border-t-2 border-blue-200 dark:border-blue-800"
                          >
                            <td colSpan="2" className="py-2.5 px-4 text-center font-bold text-gray-800 dark:text-gray-200">
                              Total Credits
                            </td>
                            <td className="py-2.5 px-4 text-center text-accent-dark font-black text-lg">
                              {curriculum.find(c => c.semester === activeSemester).totalCredits}
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default BtechEcePage;
