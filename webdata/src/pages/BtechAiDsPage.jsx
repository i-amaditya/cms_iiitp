import { useState } from "react";
import PageHeader from "../components/shared/PageHeader";
import { Clock, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BtechAiDsPage = () => {
  const [activeSemester, setActiveSemester] = useState(1);

  const curriculum = [
    {
      semester: 1,
      totalCredits: 20,
      courses: [
        { name: "Basic Electronics Engineering", hours: "3-0-2", credits: 4 },
        { name: "Introduction to Emerging Technologies", hours: "3-0-0", credits: 3 },
        { name: "Computer Programming Concepts and Practices", hours: "3-0-2", credits: 4 },
        { name: "Calculus and Differential Equations", hours: "3-1-0", credits: 4 },
        { name: "Language and Writing Skills", hours: "2-0-0", credits: 2 },
        { name: "Indian Knowledge System", hours: "1-0-0", credits: 1 },
        { name: "Environmental Studies", hours: "2-0-0", credits: 2 },
      ]
    },
    {
      semester: 2,
      totalCredits: 20,
      courses: [
        { name: "Data Structures", hours: "3-0-2", credits: 4 },
        { name: "Object Oriented Programming using Java", hours: "3-0-2", credits: 4 },
        { name: "Digital Logic and Design", hours: "3-0-2", credits: 4 },
        { name: "Linear Algebra and Discrete Structures", hours: "3-1-0", credits: 4 },
        { name: "Humanities and Social Ethics", hours: "2-0-0", credits: 2 },
        { name: "Innovation & Entrepreneurship studies", hours: "2-0-0", credits: 2 },
      ]
    },
    {
      semester: 3,
      totalCredits: 22,
      courses: [
        { name: "Artificial Intelligence", hours: "3-0-2", credits: 4 },
        { name: "Design and Analysis of Algorithms", hours: "3-0-2", credits: 4 },
        { name: "Database Management System", hours: "3-0-2", credits: 4 },
        { name: "Python Programming", hours: "3-0-2", credits: 4 },
        { name: "Computer Organization and Architecture", hours: "3-0-0", credits: 3 },
        { name: "Probability and Random Process", hours: "3-0-0", credits: 3 },
      ]
    },
    {
      semester: 4,
      totalCredits: 22,
      courses: [
        { name: "Computer Network", hours: "3-0-2", credits: 4 },
        { name: "Machine Learning", hours: "3-0-2", credits: 4 },
        { name: "Operating System", hours: "3-0-2", credits: 4 },
        { name: "Theory of Computation", hours: "3-0-0", credits: 3 },
        { name: "Exploratory Data Analysis", hours: "3-0-2", credits: 4 },
        { name: "Software Engineering and System Design", hours: "3-0-0", credits: 3 },
      ]
    },
    {
      semester: 5,
      totalCredits: 23,
      courses: [
        { name: "Deep Learning", hours: "3-0-2", credits: 4 },
        { name: "Artificial Intelligence for Cyber Security", hours: "3-0-2", credits: 4 },
        { name: "Advanced Data Structures", hours: "3-0-2", credits: 4 },
        { name: "Cloud Computing", hours: "3-0-0", credits: 3 },
        { name: "Elective 1", hours: "3-0-0", credits: 3 },
        { name: "Elective 2", hours: "3-0-0", credits: 3 },
        { name: "Minor Project-I", hours: "0-0-4", credits: 2 },
      ]
    },
    {
      semester: 6,
      totalCredits: 24,
      courses: [
        { name: "Generative Artificial Intelligence", hours: "3-0-2", credits: 4 },
        { name: "Artificial Intelligence and Big Data Analytics", hours: "3-0-2", credits: 4 },
        { name: "Reinforcement Learning", hours: "3-0-2", credits: 4 },
        { name: "Elective 1", hours: "3-0-0", credits: 3 },
        { name: "Elective 2", hours: "3-0-0", credits: 3 },
        { name: "Elective 3", hours: "3-0-0", credits: 3 },
        { name: "Minor Project-II", hours: "0-0-6", credits: 3 },
      ]
    },
    {
      semester: 7,
      totalCredits: 17,
      courses: [
        { name: "Elective 1 / MOOC", hours: "3-0-0", credits: 3 },
        { name: "Elective 2 / MOOC", hours: "3-0-0", credits: 3 },
        { name: "Elective 3 / MOOC", hours: "3-0-0", credits: 3 },
        { name: "Elective 4 / MOOC", hours: "3-0-0", credits: 3 },
        { name: "Major Project-I", hours: "0-0-6", credits: 3 },
        { name: "Internship-I", hours: "0-0-4", credits: 2 },
      ]
    },
    {
      semester: 8,
      totalCredits: 16,
      courses: [
        { name: "Major Project-II", hours: "0-0-32", credits: 16 },
      ]
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="B.Tech Artificial Intelligence and Data Science" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 md:p-12 space-y-16">

          {/* Overview Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl shadow-xl text-white p-8 md:p-10 h-full flex flex-col justify-center">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 text-white">
                Program Overview
              </h2>
              <p className="text-blue-100 text-md leading-relaxed mb-6">
                The Bachelor of Technology (B.Tech.) program in Artificial Intelligence and Data Science at IIIT Pune provides students with a strong foundation in computer science and specialized skills in data analytics, machine learning, and AI-driven solutions. The curriculum emphasizes problem-solving, critical thinking, and hands-on learning in a rapidly evolving technological landscape.
              </p>

              <p className="text-blue-100 text-md leading-relaxed mb-6">
                Core courses cover Deep Learning, Generative AI, Exploratory Data Analysis, and Big Data Analytics. Students are equipped with advanced technical expertise to develop intelligent systems, analyze complex data sets, and create innovative AI applications, making them highly sought-after professionals in the tech industry.
              </p>
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
                    <p className="text-xs text-blue-200 font-medium uppercase tracking-wider">Total Credits</p>
                    <p className="font-bold text-lg">164 Credits</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Curriculum & Syllabus */}
          <section className="w-full">
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
                    className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 ${activeSemester === sem
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
                            <td className="py-2.5 px-4 text-center font-bold text-gray-800 dark:text-gray-200" colSpan="2">
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

export default BtechAiDsPage;
