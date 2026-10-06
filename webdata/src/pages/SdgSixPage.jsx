import {
  ArrowUpRight,
  Boxes,
  ClipboardCheck,
  Droplets,
  Lightbulb,
  ShieldCheck,
  Waves,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const focusAreas = [
  {
    icon: Droplets,
    title: "Safe Drinking Water",
    text: "IIIT Pune provides access to safe drinking water through RO systems and water coolers, with regular attention to water infrastructure and hostel facilities.",
  },
  {
    icon: ShieldCheck,
    title: "Sanitation & Hygiene",
    text: "Regular monitoring of washrooms, corridors, common areas, and hostel cleanliness supports consistently clean and hygienic residential environments.",
  },
  {
    icon: Waves,
    title: "Responsible Water Use",
    text: "Infrastructure management, awareness activities, waste segregation, and student-led hostel governance encourage responsible water consumption and hygiene practices.",
  },
];

const higherEducationTargets = [
  "Safe and affordable drinking water on campus.",
  "Adequate, equitable sanitation and hygiene facilities.",
  "Improved water-use efficiency and wastewater management.",
];

const initiatives = [
  {
    title: "Hostel Sanitation & Water",
    office: "Chief Warden; Hostel Wardens – Brahmaputra, Krishna, Indrayani",
    text: "Regular monitoring of washrooms, corridors, and common areas; RO systems and water coolers provide safe drinking water; cleanliness drives are conducted in hostels.",
  },
  {
    title: "Infrastructure & Maintenance",
    office: "Associate Dean (Infrastructure); Hostel Wardens",
    text: "Timely resolution of plumbing issues is supported through a structured complaints register covering water supply, drainage, and sanitation, with coordination with works and maintenance teams.",
  },
  {
    title: "Awareness & Practices",
    office: "Hostel Administration; SAC",
    text: "Student-led Mess Committees and hostel governance promote hygiene, waste segregation, and responsible water-use practices across residential facilities.",
  },
];

const evidenceHighlights = [
  "Hostel inspection checklists and sanitation audit summaries.",
  "Records of RO maintenance and water quality tests, where available.",
  "Complaints resolved related to plumbing and sanitation (aggregate data).",
];

const outcomes = [
  "Consistently clean and hygienic residential environments.",
  "Reliable access to safe drinking water for hostel residents.",
  "Improved student awareness and responsible water-use behaviour.",
];

const futureRoadmap = [
  "Introduce periodic water-quality reporting and display on notice boards and the website.",
  "Expand rainwater harvesting and grey-water reuse feasibility studies in coordination with Infrastructure and Green Campus.",
];

const SdgSixPage = () => {
  return (
    <div className="min-h-screen pb-16 transition-colors duration-200">
      <PageHeader
        title="Sustainable Development Goal 6"
        subtitle="Ensure availability and sustainable management of water and sanitation for all"
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8">

        {/* HERO */}
        <section className="overflow-hidden rounded-2xl bg-[#26BDE2] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

            <div className="p-7 sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-7xl font-black leading-none tracking-tight md:text-8xl">
                  06
                </span>

                <span
                  className="h-16 w-px bg-white/40"
                  aria-hidden="true"
                />

                <span className="max-w-[12rem] text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
                  Clean water and sanitation
                </span>
              </div>

              <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
                Safe water, sanitation, hygiene, and responsible water use are
                essential to a healthy and sustainable campus.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">
                IIIT Pune ensures safe drinking water, high standards of
                sanitation and hygiene in hostels and campus facilities, and
                promotes responsible water consumption through infrastructure
                management and awareness.
              </p>
            </div>

            {/* SAME HERO STRUCTURE AS SDG 2 / 3 / 4 / 5 */}
            <div className="flex min-h-64 items-end bg-[#1EA7CB] p-7 sm:p-10 md:p-14">
              <div>
                <Droplets
                  className="mb-6 h-14 w-14 text-white/90"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <p className="max-w-sm text-lg font-medium leading-7 text-white/90">
                  Clean water, effective sanitation, and responsible water
                  practices strengthen campus health and sustainability.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* UN GOAL OVERVIEW */}
        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1EA7CB]">
              UN goal overview
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Clean water and sanitation for all
            </h2>
          </div>

          <div className="border-l-2 border-[#26BDE2]/50 pl-6 text-base leading-8 text-gray-700 dark:text-gray-300 md:pl-8">
            <p>
              Ensure availability and sustainable management of water and
              sanitation for all. Key targets include universal access to safe
              drinking water, improved sanitation and hygiene, and sustainable
              water-use practices.
            </p>
          </div>
        </section>

        {/* IIIT PUNE COMMITMENT */}
        <section className="mt-12 rounded-2xl bg-gray-900 p-7 text-white dark:bg-black sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
            IIIT Pune commitment
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-200">
            IIIT Pune ensures safe drinking water, high standards of sanitation
            and hygiene in hostels and campus facilities, and promotes
            responsible water consumption through infrastructure management and
            awareness.
          </p>
        </section>

        {/* FOCUS AREAS */}
        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="border-t-4 border-[#26BDE2] bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800"
            >
              <Icon
                className="h-8 w-8 text-[#1EA7CB]"
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
              className="h-7 w-7 text-[#1EA7CB]"
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
                className="border-l-4 border-[#26BDE2] bg-white p-5 text-base leading-7 text-gray-700 shadow-sm dark:bg-surface-dark dark:text-gray-300"
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
              className="h-7 w-7 text-[#1EA7CB]"
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

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#1EA7CB] dark:text-cyan-400">
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

          <div className="border-t-4 border-[#26BDE2] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ClipboardCheck
                className="h-7 w-7 text-[#1EA7CB]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Evidence highlights
              </h2>
            </div>

            <ul className="mt-8 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {evidenceHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#26BDE2]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-4 border-[#26BDE2] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <Waves
                className="h-7 w-7 text-[#1EA7CB]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Outcomes
              </h2>
            </div>

            <ul className="mt-8 space-y-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#26BDE2]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </section>

        {/* FUTURE ROADMAP */}
        <section className="mt-14 overflow-hidden rounded-2xl bg-[#26BDE2] p-7 text-white sm:p-10">
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
              Clean water, healthier campus
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              Water, sanitation, hygiene, and responsible resource use are
              shared responsibilities across the IIIT Pune community.
            </p>
          </div>

          <a
            href="https://sdgs.un.org/goals/goal6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#1EA7CB] transition-colors hover:text-[#26BDE2] dark:text-cyan-400"
          >
            Learn about Goal 6
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>

      </main>
    </div>
  );
};

export default SdgSixPage;