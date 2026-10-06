import {
  ArrowUpRight,
  Boxes,
  ClipboardCheck,
  Globe2,
  Handshake,
  Lightbulb,
  Network,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const focusAreas = [
  {
    icon: Handshake,
    title: "International Partnerships",
    text: "MoUs and LOIs, faculty and student exchanges, bilateral research programmes, and international industry collaboration strengthen global partnerships.",
  },
  {
    icon: Network,
    title: "Industry–Academia Linkages",
    text: "Company engagements, internships, projects, expert lectures, startup industry connects, and industry problem statements support knowledge and opportunity sharing.",
  },
  {
    icon: Globe2,
    title: "Shared Knowledge & Reporting",
    text: "NIRF, AISHE, MOOCs, academic collaborations, cross-department coordination, and institutional communication support data sharing and coordinated implementation.",
  },
];

const higherEducationTargets = [
  "Multi-stakeholder partnerships for knowledge, technology and resource sharing.",
  "Capacity-building and data/reporting for SDG monitoring.",
  "International collaboration for sustainable development.",
];

const initiatives = [
  {
    title: "International Relations",
    office: "International Relations",
    text: "MoUs and LOIs with foreign universities including TU Delft, DSTU, Tohoku University, and West University of Timișoara, along with faculty/student exchanges, bilateral research programmes, and international industry collaboration.",
  },
  {
    title: "Industry–Academia Linkages",
    office: "TPO; IIC & E-Cell; SIH SPOC",
    text: "Company engagements, internships, projects, expert lectures, startup industry connects, and Smart India Hackathon problem statements from industry strengthen partnerships.",
  },
  {
    title: "National Reporting & Surveys",
    office: "NIRF & AISHE Cell",
    text: "Coordination and submission of institutional data to NIRF and AISHE aligns institutional metrics with national frameworks.",
  },
  {
    title: "Cross-Department Coordination",
    office: "Multiple Offices",
    text: "Timetable and classroom management, academic coordination, SAC events, and website/PRO communication rely on inter-office collaboration.",
  },
  {
    title: "MOOCs/NPTEL & Academic Collaborations",
    office: "MOOC/NPTEL Coordinator; Dean (Academic)",
    text: "Enrolment, mentoring, credit-transfer coordination, academic collaborations, student exchange and internships, and MOOCs strengthen knowledge-sharing partnerships.",
  },
];

const evidenceHighlights = [
  "MoUs signed, exchange programmes conducted, and joint publications/projects.",
  "Company engagement logs, internship, and partnership counts.",
  "NIRF/AISHE submission records and data dictionaries.",
];

const outcomes = [
  "Enhanced global exposure and research collaboration.",
  "Stronger industry pipeline for internships, projects, and placements.",
  "Aligned reporting supporting national rankings and policy goals.",
];

const futureRoadmap = [
  "Expand joint labs and Centres of Excellence with international and industry partners.",
  "Institutionalize an annual SDG partnership forum at IIIT Pune.",
];

const SdgSeventeenPage = () => {
  return (
    <div className="min-h-screen pb-16 transition-colors duration-200">
      <PageHeader
        title="Sustainable Development Goal 17"
        subtitle="Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development"
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8">

        <section className="overflow-hidden rounded-2xl bg-[#19486A] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

            <div className="p-7 sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-7xl font-black leading-none tracking-tight md:text-8xl">
                  17
                </span>

                <span className="h-16 w-px bg-white/40" />

                <span className="max-w-[12rem] text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
                  Partnerships for the goals
                </span>
              </div>

              <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
                Strong partnerships across academia, industry, government, and
                international institutions accelerate sustainable development.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">
                IIIT Pune builds multi-stakeholder partnerships with industry,
                academia, government, and international institutions to advance
                education, research, innovation, and sustainable development.
              </p>
            </div>

            <div className="flex min-h-64 items-end bg-[#163E5B] p-7 sm:p-10 md:p-14">
              <div>
                <Handshake
                  className="mb-6 h-14 w-14 text-white/90"
                  strokeWidth={1.5}
                />

                <p className="max-w-sm text-lg font-medium leading-7 text-white/90">
                  Collaboration, knowledge sharing, and coordinated action
                  create stronger pathways to achieve the SDGs.
                </p>
              </div>
            </div>

          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#163E5B]">
              UN goal overview
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Partnerships for sustainable development
            </h2>
          </div>

          <div className="border-l-2 border-[#19486A]/50 pl-6 text-base leading-8 text-gray-700 dark:text-gray-300 md:pl-8">
            <p>
              Strengthen the means of implementation and revitalize the Global
              Partnership for Sustainable Development.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-2xl bg-gray-900 p-7 text-white dark:bg-black sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">
            IIIT Pune commitment
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-200">
            IIIT Pune builds multi-stakeholder partnerships—with industry,
            academia, government, and international institutions—to advance
            education, research, innovation, and sustainable development.
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="border-t-4 border-[#19486A] bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800"
            >
              <Icon className="h-8 w-8 text-[#163E5B]" strokeWidth={1.8} />

              <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                {text}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <ClipboardCheck className="h-7 w-7 text-[#163E5B]" />

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Relevant targets for higher education
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {higherEducationTargets.map((target) => (
              <div
                key={target}
                className="border-l-4 border-[#19486A] bg-white p-5 text-base leading-7 text-gray-700 shadow-sm dark:bg-surface-dark dark:text-gray-300"
              >
                {target}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <Boxes className="h-7 w-7 text-[#163E5B]" />

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

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#163E5B] dark:text-sky-400">
                  Office: {office}
                </p>

                <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="border-t-4 border-[#19486A] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-7 w-7 text-[#163E5B]" />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Evidence highlights
              </h2>
            </div>

            <ul className="mt-8 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {evidenceHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#19486A]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-4 border-[#19486A] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <Globe2 className="h-7 w-7 text-[#163E5B]" />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Outcomes
              </h2>
            </div>

            <ul className="mt-8 space-y-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#19486A]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-14 overflow-hidden rounded-2xl bg-[#19486A] p-7 text-white sm:p-10">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-7 w-7" />

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

        <section className="mt-12 flex flex-col gap-5 border-y border-gray-200 py-8 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Partnerships that advance the SDGs
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              International collaboration, industry partnerships, academic
              networks, and coordinated reporting strengthen collective action.
            </p>
          </div>

          <a
            href="https://sdgs.un.org/goals/goal17"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#163E5B] transition-colors hover:text-[#19486A] dark:text-sky-400"
          >
            Learn about Goal 17
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>

      </main>
    </div>
  );
};

export default SdgSeventeenPage;
