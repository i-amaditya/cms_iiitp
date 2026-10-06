import {
  ArrowUpRight,
  Boxes,
  ClipboardCheck,
  HeartHandshake,
  Lightbulb,
  Scale,
  UsersRound,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const focusAreas = [
  {
    icon: UsersRound,
    title: "Equal Access & Inclusion",
    text: "IIIT Pune promotes equitable access to education, institutional facilities, opportunities, and support mechanisms irrespective of social, economic, or personal background.",
  },
  {
    icon: Scale,
    title: "Fair & Transparent Processes",
    text: "Transparent admissions, fair assessment, grievance redressal, reservation and welfare provisions, and statutory information access support equitable academic and administrative processes.",
  },
  {
    icon: HeartHandshake,
    title: "Safe & Supportive Campus",
    text: "Dedicated cells, counselling, grievance mechanisms, and inclusive practices help create a safe, respectful, and supportive environment for all members of the institute community.",
  },
];

const higherEducationTargets = [
  "Equal access to quality education and institutional facilities.",
  "Social, economic and political inclusion irrespective of background.",
  "Equal opportunity and reduction of outcome disparities.",
];

const initiatives = [
  {
    title: "OBC Special Cell",
    office: "OBC Special Cell",
    text: "Ensures equal educational opportunities, implementation of reservation and welfare provisions, awareness programmes, grievance support, and record-keeping for OBC students and employees.",
  },
  {
    title: "Admissions & Financial Access",
    office: "UG/PG Coordinators; Dean (Academic)",
    text: "Transparent UG and PG admissions, orientation, compliance with government norms, and linkage to scholarships and financial support help strengthen equitable access to education.",
  },
  {
    title: "Inclusive Teaching & Assessment",
    office: "Timetable & Classroom Management; Dept. Academic Coordinator; Exam In-charge",
    text: "Student-friendly timetables, accommodation of special needs, inclusive classroom practices, and fair assessment and moderation support equitable learning opportunities.",
  },
  {
    title: "Safe & Equitable Campus",
    office: "ICC; SGRC; Counselling",
    text: "ICC (POSH), SGRC, and counselling services help ensure safe and respectful environments together with timely grievance redressal.",
  },
  {
    title: "Digital Transparency",
    office: "Website Management; RTI–FAA; Samarth ERP Nodal Officer",
    text: "Website publishing of policies and reports, RTI/FAA mechanisms for statutory information access, and Samarth ERP provide transparent and role-based access to institutional services.",
  },
];

const evidenceHighlights = [
  "OBC awareness sessions and beneficiaries of welfare schemes (aggregate).",
  "Admission data compliance and scholarship disbursement summaries.",
  "Grievances received and resolved through SGRC/ICC, including turnaround times.",
];

const outcomes = [
  "Improved access and participation of underrepresented groups.",
  "Fair, transparent academic and administrative processes.",
  "Safer, more inclusive campus climate.",
];

const futureRoadmap = [
  "Strengthen data-driven monitoring of access and outcome gaps.",
  "Expand mentorship and bridge programmes for first-generation learners.",
];

const SdgTenPage = () => {
  return (
    <div className="min-h-screen pb-16 transition-colors duration-200">
      <PageHeader
        title="Sustainable Development Goal 10"
        subtitle="Reduce inequality within and among countries"
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8">

        {/* HERO */}
        <section className="overflow-hidden rounded-2xl bg-[#DD1367] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

            <div className="p-7 sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-7xl font-black leading-none tracking-tight md:text-8xl">
                  10
                </span>

                <span
                  className="h-16 w-px bg-white/40"
                  aria-hidden="true"
                />

                <span className="max-w-[12rem] text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
                  Reduced inequalities
                </span>
              </div>

              <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
                Equal opportunities, inclusive access, and transparent
                processes help build a fairer and more equitable campus.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">
                IIIT Pune promotes inclusive, equitable access to education,
                opportunities, and support mechanisms through dedicated cells,
                transparent processes, and targeted interventions.
              </p>
            </div>

            {/* SAME HERO STRUCTURE AS SDG 2–9 */}
            <div className="flex min-h-64 items-end bg-[#C40F59] p-7 sm:p-10 md:p-14">
              <div>
                <UsersRound
                  className="mb-6 h-14 w-14 text-white/90"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <p className="max-w-sm text-lg font-medium leading-7 text-white/90">
                  Inclusion, dignity, fair opportunity, and equitable access
                  help every member of the IIIT Pune community participate and
                  succeed.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* UN GOAL OVERVIEW */}
        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C40F59]">
              UN goal overview
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Reduced inequalities for all
            </h2>
          </div>

          <div className="border-l-2 border-[#DD1367]/50 pl-6 text-base leading-8 text-gray-700 dark:text-gray-300 md:pl-8">
            <p>
              Reduce inequality within and among countries by ensuring equal
              opportunities and outcomes, irrespective of identity, status, or
              background. Higher education institutions can contribute through
              equitable access, inclusive practices, fair processes, and
              mechanisms that reduce disparities in participation and outcomes.
            </p>
          </div>
        </section>

        {/* IIIT PUNE COMMITMENT */}
        <section className="mt-12 rounded-2xl bg-gray-900 p-7 text-white dark:bg-black sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-pink-300">
            IIIT Pune commitment
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-200">
            IIIT Pune promotes inclusive, equitable access to education,
            opportunities, and support mechanisms through dedicated cells,
            transparent processes, and targeted interventions.
          </p>
        </section>

        {/* FOCUS AREAS */}
        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="border-t-4 border-[#DD1367] bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800"
            >
              <Icon
                className="h-8 w-8 text-[#C40F59]"
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
              className="h-7 w-7 text-[#C40F59]"
              aria-hidden="true"
            />

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Relevant targets for higher education
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {higherEducationTargets.map((target) => (
              <div
                key={target}
                className="border-l-4 border-[#DD1367] bg-white p-5 text-base leading-7 text-gray-700 shadow-sm dark:bg-surface-dark dark:text-gray-300"
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
              className="h-7 w-7 text-[#C40F59]"
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

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#C40F59] dark:text-pink-400">
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

          <div className="border-t-4 border-[#DD1367] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ClipboardCheck
                className="h-7 w-7 text-[#C40F59]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Evidence highlights
              </h2>
            </div>

            <ul className="mt-8 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {evidenceHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#DD1367]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-4 border-[#DD1367] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <HeartHandshake
                className="h-7 w-7 text-[#C40F59]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Outcomes
              </h2>
            </div>

            <ul className="mt-8 space-y-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#DD1367]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </section>

        {/* FUTURE ROADMAP */}
        <section className="mt-14 overflow-hidden rounded-2xl bg-[#DD1367] p-7 text-white sm:p-10">
          <div className="flex items-center gap-3">
            <Lightbulb
              className="h-7 w-7"
              aria-hidden="true"
            />

            <h2 className="text-2xl font-bold md:text-3xl">
              Future roadmap
            </h2>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
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
              Inclusion, equality, opportunity for all
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              Equitable access, transparent processes, inclusion, and support
              are shared responsibilities across the IIIT Pune community.
            </p>
          </div>

          <a
            href="https://sdgs.un.org/goals/goal10"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#C40F59] transition-colors hover:text-[#DD1367] dark:text-pink-400"
          >
            Learn about Goal 10
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>

      </main>
    </div>
  );
};

export default SdgTenPage;
