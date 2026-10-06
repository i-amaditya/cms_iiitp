import {
  ArrowUpRight,
  Award,
  BookOpen,
  Boxes,
  ClipboardCheck,
  GraduationCap,
  Lightbulb,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const focusAreas = [
  {
    icon: GraduationCap,
    title: "Quality Technical Education",
    text: "IIIT Pune delivers multidisciplinary, outcome-based technical education supported by academic administration, digital resources, and continuous improvement.",
  },
  {
    icon: BookOpen,
    title: "Inclusive Learning & Access",
    text: "Admissions, orientation, government-compliant processes, MOOCs, digital resources, and student support promote equitable access to quality higher education.",
  },
  {
    icon: Award,
    title: "Skills, Innovation & Lifelong Learning",
    text: "Project-based learning, internships, MOOCs, NPTEL, SWAYAM, skill development, and student activities strengthen employability and lifelong learning.",
  },
];

const higherEducationTargets = [
  "Equal access to affordable, quality technical and higher education.",
  "Relevant skills for employment and entrepreneurship.",
  "Eliminate disparities; ensure inclusive education.",
  "Education for sustainable development and global citizenship.",
];

const initiatives = [
  {
    title: "NEP 2020 Implementation",
    office: "Dean (Academic); HoDs; Academic Coordinator",
    text: "Multidisciplinary and flexible curricula, outcome-based education (OBE), Academic Bank of Credits, skill-based learning, and experiential learning support the implementation of NEP 2020.",
  },
  {
    title: "Admissions & Access",
    office: "UG/PG Coordinators",
    text: "UG admissions through JoSAA/CSAB and PG admissions through CCMT and Visvesvaraya PhD are supported by orientation, document verification, and compliance with government norms.",
  },
  {
    title: "Teaching–Learning Excellence",
    office: "Timetable & Classroom Management; Department Academic Coordinator",
    text: "Timetable and classroom management avoid clashes, optimize room and laboratory allocation, balance faculty workloads, and support student-friendly scheduling.",
  },
  {
    title: "Assessments & Records",
    office: "Department Exam In-charge; Examination Cell",
    text: "Coordination of mid- and end-semester examinations, grade-sheet and moderation verification, backlog/re-examination coordination, and maintenance of digital and physical academic records.",
  },
  {
    title: "Project-Based Learning",
    office: "BTP/MTP Coordinator; HoD CSE",
    text: "BTP and MTP coordination integrates industry internships, evaluations, documentation, and innovation-focused projects into the learning experience.",
  },
  {
    title: "MOOCs / NPTEL / SWAYAM",
    office: "MOOC/NPTEL Coordinator",
    text: "Promotion, enrolment, mentoring, applicable credit transfer, performance tracking, and reporting support online learning and skill development.",
  },
  {
    title: "Library & E-Resources",
    office: "Library & Information Centre",
    text: "Access to 30,000+ journals through ONOS, Koha OPAC, Turnitin and Shodhganga supports learning, research, academic integrity, and research awareness.",
  },
  {
    title: "Publications & Communication",
    office: "Publications",
    text: "The annual magazine Eminence and quarterly newsletter The Eclectic Times showcase academic, research, and institutional achievements.",
  },
  {
    title: "Student Engagement",
    office: "SAC In-charge",
    text: "SAC-coordinated technical, cultural, sports, and student clubs provide opportunities for leadership development, participation, and holistic growth.",
  },
  {
    title: "Transparency & Governance",
    office: "Website Management; RTI–FAA",
    text: "Website management provides updated academic information, notices, and results, while RTI/FAA mechanisms support statutory access to information.",
  },
];

const evidenceHighlights = [
  "Admission statistics and orientation records.",
  "Timetable templates, classroom allocation logs, and feedback summaries.",
  "Exam schedules, moderation sheets, and result timelines.",
  "MOOC enrolment/completion data, library usage statistics, and Turnitin usage.",
  "Magazine/newsletter copies and SAC event reports.",
];

const outcomes = [
  "Improved learning outcomes, attendance, and timely results.",
  "Higher MOOC completion and skill certification rates.",
  "Stronger research integrity and publication quality.",
  "Enhanced student engagement and holistic development.",
];

const futureRoadmap = [
  "Deepen OBE mapping and outcome analytics.",
  "Expand credit-based MOOC integration and micro-credentials.",
  "Strengthen industry-linked courses and co-teaching.",
];

const SdgFourPage = () => {
  return (
    <div className="min-h-screen pb-16 transition-colors duration-200">
      <PageHeader
        title="Sustainable Development Goal 4"
        subtitle="Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all"
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8">

        {/* HERO */}
        <section className="overflow-hidden rounded-2xl bg-[#C5192D] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

            <div className="p-7 sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-7xl font-black leading-none tracking-tight md:text-8xl">
                  04
                </span>

                <span
                  className="h-16 w-px bg-white/40"
                  aria-hidden="true"
                />

                <span className="max-w-[12rem] text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
                  Quality education
                </span>
              </div>

              <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
                Inclusive, equitable, high-quality education and lifelong
                learning are central to IIIT Pune's academic mission.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">
                As a core mandate, IIIT Pune delivers high-quality,
                multidisciplinary, outcome-based technical education aligned
                with NEP 2020, supported by robust academic administration,
                digital resources, and continuous improvement mechanisms.
              </p>
            </div>

            {/* SAME STRUCTURE AS SDG 2 / SDG 3 */}
            <div className="flex min-h-64 items-end bg-[#A91628] p-7 sm:p-10 md:p-14">
              <div>
                <GraduationCap
                  className="mb-6 h-14 w-14 text-white/90"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <p className="max-w-sm text-lg font-medium leading-7 text-white/90">
                  Quality education empowers learners with knowledge, skills,
                  innovation, confidence, and opportunities for lifelong growth.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* UN GOAL OVERVIEW */}
        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#A91628]">
              UN goal overview
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Quality education for all
            </h2>
          </div>

          <div className="border-l-2 border-[#C5192D]/50 pl-6 text-base leading-8 text-gray-700 dark:text-gray-300 md:pl-8">
            <p>
              Ensure inclusive and equitable quality education and promote
              lifelong learning opportunities for all. Higher education
              institutions contribute by widening access to quality education,
              developing relevant skills, supporting inclusive learning, and
              fostering education for sustainable development and global
              citizenship.
            </p>
          </div>
        </section>

        {/* IIIT PUNE COMMITMENT */}
        <section className="mt-12 rounded-2xl bg-gray-900 p-7 text-white dark:bg-black sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-300">
            IIIT Pune commitment
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-200">
            As a core mandate, IIIT Pune delivers high-quality,
            multidisciplinary, outcome-based technical education aligned with
            NEP 2020, supported by robust academic administration, digital
            resources, and continuous improvement mechanisms.
          </p>
        </section>

        {/* FOCUS AREAS */}
        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="border-t-4 border-[#C5192D] bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800"
            >
              <Icon
                className="h-8 w-8 text-[#A91628]"
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                {text}
              </p>
            </article>
          ))}
        </section>

        {/* HIGHER EDUCATION TARGETS */}
        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <ClipboardCheck
              className="h-7 w-7 text-[#A91628]"
              aria-hidden="true"
            />

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Relevant targets for higher education
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {higherEducationTargets.map((target) => (
              <div
                key={target}
                className="border-l-4 border-[#C5192D] bg-white p-5 text-base leading-7 text-gray-700 shadow-sm dark:bg-surface-dark dark:text-gray-300"
              >
                {target}
              </div>
            ))}
          </div>
        </section>

        {/* INITIATIVES */}
        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <Boxes
              className="h-7 w-7 text-[#A91628]"
              aria-hidden="true"
            />

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              IIIT Pune initiatives
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {initiatives.map(({ title, office, text }) => (
              <article
                key={title}
                className="bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {title}
                </h3>

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#A91628] dark:text-red-400">
                  Office: {office}
                </p>

                <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* EVIDENCE + OUTCOMES */}
        <section className="mt-14 grid gap-8 lg:grid-cols-2">

          <div className="border-t-4 border-[#C5192D] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ClipboardCheck
                className="h-7 w-7 text-[#A91628]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Evidence highlights
              </h2>
            </div>

            <ul className="mt-8 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {evidenceHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C5192D]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-4 border-[#C5192D] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <Award
                className="h-7 w-7 text-[#A91628]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Outcomes
              </h2>
            </div>

            <ul className="mt-8 space-y-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C5192D]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </section>

        {/* FUTURE ROADMAP */}
        <section className="mt-14 overflow-hidden rounded-2xl bg-[#C5192D] p-7 text-white sm:p-10">
          <div className="flex items-center gap-3">
            <Lightbulb
              className="h-7 w-7"
              aria-hidden="true"
            />

            <h2 className="text-2xl font-bold md:text-3xl">
              Future roadmap
            </h2>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {futureRoadmap.map((item, index) => (
              <div
                key={item}
                className="border-l border-white/50 pl-4 text-sm leading-7 text-white/95"
              >
                <span className="mb-2 block text-2xl font-black text-white/60">
                  0{index + 1}
                </span>

                {item}
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="mt-12 flex flex-col gap-5 border-y border-gray-200 py-8 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Quality education, lifelong learning
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              Learning, innovation, skills, inclusion, and student development
              are shared responsibilities across the IIIT Pune community.
            </p>
          </div>

          <a
            href="https://sdgs.un.org/goals/goal4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#A91628] transition-colors hover:text-[#C5192D] dark:text-red-400"
          >
            Learn about Goal 4
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>

      </main>
    </div>
  );
};

export default SdgFourPage;