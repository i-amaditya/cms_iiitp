import {
  ArrowUpRight,
  Boxes,
  ClipboardCheck,
  Lightbulb,
  PlugZap,
  RefreshCw,
  Sun,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const focusAreas = [
  {
    icon: PlugZap,
    title: "Energy Efficiency",
    text: "IIIT Pune promotes energy-efficient equipment, responsible electricity use, and monitoring of energy consumption across academic blocks, laboratories, hostels, and campus infrastructure.",
  },
  {
    icon: Sun,
    title: "Renewable Energy",
    text: "The institute explores renewable energy options as part of campus sustainability, including the feasibility of solar PV and solar water heating solutions.",
  },
  {
    icon: RefreshCw,
    title: "Responsible Consumption",
    text: "Energy-saving practices in hostels, efficient appliances and lighting, and awareness of responsible electricity consumption support behavioural change across campus.",
  },
];

const higherEducationTargets = [
  "Energy-efficient buildings, lighting, appliances and IT infrastructure.",
  "Increased share of renewables in campus energy mix.",
  "Behavioural change towards responsible energy consumption.",
];

const initiatives = [
  {
    title: "Energy Conservation Measures",
    office: "Associate Dean (Infrastructure); Campus Greening; CISO for IT loads",
    text: "Coordination of energy audits, promotion of energy-efficient equipment, and monitoring of electricity consumption in hostels and academic areas support campus energy conservation.",
  },
  {
    title: "Hostel Energy Practices",
    office: "Chief Warden; Hostel Wardens",
    text: "Responsible electricity consumption, energy-efficient lighting and appliances, and energy-saving practices are promoted across hostel facilities.",
  },
  {
    title: "Digital Infrastructure Efficiency",
    office: "CISO; Website Management; Infrastructure",
    text: "Reliable and secure network and data centre operations focus on uptime, redundancy, and efficient cooling and power practices.",
  },
];

const evidenceHighlights = [
  "Energy audit reports, where available, and initiatives logged by Infrastructure/Green Campus.",
  "Hostel circulars on energy saving and observed reduction in wastage.",
];

const outcomes = [
  "Lower energy wastage in hostels and academic blocks.",
  "Improved reliability of digital infrastructure with efficient operations.",
];

const futureRoadmap = [
  "Formalize annual energy performance indicators (kWh per student/staff).",
  "Evaluate solar PV and solar water heating expansion in coordination with Campus Greening and Infrastructure.",
];

const SdgSevenPage = () => {
  return (
    <div className="min-h-screen pb-16 transition-colors duration-200">
      <PageHeader
        title="Sustainable Development Goal 7"
        subtitle="Ensure access to affordable, reliable, sustainable and modern energy for all"
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8">

        {/* HERO */}
        <section className="overflow-hidden rounded-2xl bg-[#FCC30B] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

            <div className="p-7 sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-7xl font-black leading-none tracking-tight md:text-8xl">
                  07
                </span>

                <span
                  className="h-16 w-px bg-white/40"
                  aria-hidden="true"
                />

                <span className="max-w-[12rem] text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
                  Affordable and clean energy
                </span>
              </div>

              <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
                Energy efficiency, responsible consumption, and renewable energy
                are key elements of a sustainable campus.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">
                IIIT Pune promotes energy efficiency across academic blocks,
                laboratories, hostels, and data infrastructure, and explores
                renewable energy options as part of campus sustainability.
              </p>
            </div>

            {/* SAME HERO STRUCTURE AS SDG 2 / 3 / 4 / 5 / 6 */}
            <div className="flex min-h-64 items-end bg-[#D9A600] p-7 sm:p-10 md:p-14">
              <div>
                <PlugZap
                  className="mb-6 h-14 w-14 text-white/90"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <p className="max-w-sm text-lg font-medium leading-7 text-white/90">
                  Efficient energy use and clean-energy pathways help build a
                  resilient, sustainable, and responsible campus.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* UN GOAL OVERVIEW */}
        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D9A600]">
              UN goal overview
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Affordable and clean energy for all
            </h2>
          </div>

          <div className="border-l-2 border-[#FCC30B]/50 pl-6 text-base leading-8 text-gray-700 dark:text-gray-300 md:pl-8">
            <p>
              Ensure access to affordable, reliable, sustainable and modern
              energy for all. Focus areas include energy efficiency, renewable
              energy adoption, and responsible consumption.
            </p>
          </div>
        </section>

        {/* IIIT PUNE COMMITMENT */}
        <section className="mt-12 rounded-2xl bg-gray-900 p-7 text-white dark:bg-black sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-300">
            IIIT Pune commitment
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-200">
            IIIT Pune promotes energy efficiency across academic blocks,
            laboratories, hostels and data infrastructure, and explores
            renewable energy options as part of campus sustainability.
          </p>
        </section>

        {/* FOCUS AREAS */}
        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="border-t-4 border-[#FCC30B] bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800"
            >
              <Icon
                className="h-8 w-8 text-[#D9A600]"
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
              className="h-7 w-7 text-[#D9A600]"
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
                className="border-l-4 border-[#FCC30B] bg-white p-5 text-base leading-7 text-gray-700 shadow-sm dark:bg-surface-dark dark:text-gray-300"
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
              className="h-7 w-7 text-[#D9A600]"
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

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#D9A600] dark:text-yellow-400">
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

          <div className="border-t-4 border-[#FCC30B] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ClipboardCheck
                className="h-7 w-7 text-[#D9A600]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Evidence highlights
              </h2>
            </div>

            <ul className="mt-8 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {evidenceHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FCC30B]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-4 border-[#FCC30B] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <Sun
                className="h-7 w-7 text-[#D9A600]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Outcomes
              </h2>
            </div>

            <ul className="mt-8 space-y-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FCC30B]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </section>

        {/* FUTURE ROADMAP */}
        <section className="mt-14 overflow-hidden rounded-2xl bg-[#FCC30B] p-7 text-white sm:p-10">
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
              Clean energy, sustainable future
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              Energy efficiency, responsible consumption, and renewable-energy
              innovation are shared responsibilities across the IIIT Pune
              community.
            </p>
          </div>

          <a
            href="https://sdgs.un.org/goals/goal7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#D9A600] transition-colors hover:text-[#FCC30B] dark:text-yellow-400"
          >
            Learn about Goal 7
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>

      </main>
    </div>
  );
};

export default SdgSevenPage;
