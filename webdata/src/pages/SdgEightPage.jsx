import {
  ArrowUpRight,
  Award,
  Boxes,
  BriefcaseBusiness,
  ClipboardCheck,
  Handshake,
  Lightbulb,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const focusAreas = [
  {
    icon: BriefcaseBusiness,
    title: "Employability & Career Readiness",
    text: "Training, internships, placement support, technical preparation, aptitude development, soft skills, mock interviews, and industry engagement strengthen graduate employability.",
  },
  {
    icon: Handshake,
    title: "Industry & Internship Partnerships",
    text: "Industry-linked internships, BTP/MTP projects, industry problem statements, assessments, and feedback provide practical exposure and strengthen workplace readiness.",
  },
  {
    icon: Lightbulb,
    title: "Entrepreneurship & Innovation",
    text: "IIC and E-Cell activities support idea generation, startup mentoring, competitions, intellectual property awareness, and industry connections for venture creation.",
  },
];

const higherEducationTargets = [
  "Skills and training for employment and entrepreneurship.",
  "Decent work opportunities and fair recruitment practices.",
  "Support for startups, innovation and MSME linkages.",
];

const initiatives = [
  {
    title: "Training & Placement (TPO)",
    office: "TPO",
    text: "Industry-relevant training in technical skills, aptitude, and soft skills; mock interviews, resume building, company engagement, job drives, internship coordination, and maintenance of placement records.",
  },
  {
    title: "Internships & Industry Projects",
    office: "Summer Internship Coordinator; BTP/MTP Coordinator; HoD CSE",
    text: "Summer internships, six-month industry-linked BTP/MTP, industry problem statements, and performance assessments with feedback provide students with practical industry exposure.",
  },
  {
    title: "Alumni-Driven Opportunities",
    office: "Alumni Coordinator",
    text: "Alumni mentoring, job referrals, guest lectures, networking sessions, and startup success stories strengthen employability pipelines and career awareness.",
  },
  {
    title: "Entrepreneurship & Startups",
    office: "IIC & E-Cell",
    text: "Workshops, idea challenges, startup mentoring, IP awareness, and industry connect initiatives support innovation and venture creation.",
  },
  {
    title: "Inclusive Access",
    office: "TPO; OBC Cell; ICC",
    text: "Equal training and placement support is provided across diverse socio-economic backgrounds, with special programs for underrepresented groups and inclusive hiring practices with recruiters.",
  },
];

const evidenceHighlights = [
  "Placement statistics including number of offers, sectors, roles, and compensation bands.",
  "Internship counts, company names (aggregate), and feedback summaries.",
  "IIC/E-Cell events, startup ideas supported, and competitions won.",
];

const outcomes = [
  "High employability and quality of jobs and internships.",
  "Stronger industry readiness and practical skills.",
  "Growing entrepreneurship mindset and startup activity.",
];

const futureRoadmap = [
  "Deepen sector-specific bootcamps and certification pathways.",
  "Expand paid internships and industry-sponsored capstone projects.",
  "Strengthen alumni mentorship circles by domain and role.",
];

const SdgEightPage = () => {
  return (
    <div className="min-h-screen pb-16 transition-colors duration-200">
      <PageHeader
        title="Sustainable Development Goal 8"
        subtitle="Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all"
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8">

        {/* HERO */}
        <section className="overflow-hidden rounded-2xl bg-[#A21942] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

            <div className="p-7 sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-7xl font-black leading-none tracking-tight md:text-8xl">
                  08
                </span>

                <span
                  className="h-16 w-px bg-white/40"
                  aria-hidden="true"
                />

                <span className="max-w-[12rem] text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
                  Decent work and economic growth
                </span>
              </div>

              <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
                Skills, employability, entrepreneurship, and industry
                collaboration help create pathways to decent work and economic
                growth.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">
                Through training, internships, placements, entrepreneurship
                support, and industry collaboration, IIIT Pune enhances
                employability, decent work opportunities, and economic growth
                for its graduates.
              </p>
            </div>

            {/* SAME HERO STRUCTURE AS SDG 2 / 3 / 4 / 5 / 6 / 7 */}
            <div className="flex min-h-64 items-end bg-[#8F1739] p-7 sm:p-10 md:p-14">
              <div>
                <BriefcaseBusiness
                  className="mb-6 h-14 w-14 text-white/90"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <p className="max-w-sm text-lg font-medium leading-7 text-white/90">
                  Strong industry connections, practical experience, and
                  entrepreneurial opportunities help learners build meaningful
                  careers and contribute to economic growth.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* UN GOAL OVERVIEW */}
        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#8F1739]">
              UN goal overview
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Decent work and economic growth
            </h2>
          </div>

          <div className="border-l-2 border-[#A21942]/50 pl-6 text-base leading-8 text-gray-700 dark:text-gray-300 md:pl-8">
            <p>
              Promote sustained, inclusive and sustainable economic growth,
              full and productive employment and decent work for all.
            </p>
          </div>
        </section>

        {/* IIIT PUNE COMMITMENT */}
        <section className="mt-12 rounded-2xl bg-gray-900 p-7 text-white dark:bg-black sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-pink-300">
            IIIT Pune commitment
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-200">
            Through training, internships, placements, entrepreneurship
            support and industry collaboration, IIIT Pune enhances
            employability, decent work opportunities and economic growth for
            its graduates.
          </p>
        </section>

        {/* FOCUS AREAS */}
        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="border-t-4 border-[#A21942] bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800"
            >
              <Icon
                className="h-8 w-8 text-[#8F1739]"
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
              className="h-7 w-7 text-[#8F1739]"
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
                className="border-l-4 border-[#A21942] bg-white p-5 text-base leading-7 text-gray-700 shadow-sm dark:bg-surface-dark dark:text-gray-300"
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
              className="h-7 w-7 text-[#8F1739]"
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

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8F1739] dark:text-pink-400">
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

          <div className="border-t-4 border-[#A21942] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ClipboardCheck
                className="h-7 w-7 text-[#8F1739]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Evidence highlights
              </h2>
            </div>

            <ul className="mt-8 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {evidenceHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A21942]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-4 border-[#A21942] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <Award
                className="h-7 w-7 text-[#8F1739]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Outcomes
              </h2>
            </div>

            <ul className="mt-8 space-y-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A21942]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </section>

        {/* FUTURE ROADMAP */}
        <section className="mt-14 overflow-hidden rounded-2xl bg-[#A21942] p-7 text-white sm:p-10">
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
              Decent work, stronger economic opportunities
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              Employability, practical skills, entrepreneurship, inclusion,
              and industry collaboration are shared responsibilities across
              the IIIT Pune community.
            </p>
          </div>

          <a
            href="https://sdgs.un.org/goals/goal8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#8F1739] transition-colors hover:text-[#A21942] dark:text-pink-400"
          >
            Learn about Goal 8
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>

      </main>
    </div>
  );
};

export default SdgEightPage;
