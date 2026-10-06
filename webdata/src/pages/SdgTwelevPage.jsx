import {
  ArrowUpRight,
  Boxes,
  ClipboardCheck,
  Leaf,
  Lightbulb,
  Recycle,
  ShoppingCart,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const focusAreas = [
  {
    icon: Recycle,
    title: "Resource Efficiency & Waste Reduction",
    text: "IIIT Pune promotes efficient use of water, electricity, food, and other resources while encouraging waste segregation, food-waste reduction, and environmentally responsible practices.",
  },
  {
    icon: ShoppingCart,
    title: "Responsible Procurement",
    text: "Procurement processes use structured documentation, comparative statements, and vendor records to support transparent, compliant, and value-based purchasing.",
  },
  {
    icon: Leaf,
    title: "Sustainable Campus Practices",
    text: "Hostel resource management, classroom and laboratory optimization, energy conservation, audits, and renewable-energy initiatives support responsible consumption across campus.",
  },
];

const higherEducationTargets = [
  "Efficient use of natural resources and reduction of waste.",
  "Sustainable procurement practices.",
  "Awareness of sustainable lifestyles and responsible consumption.",
];

const initiatives = [
  {
    title: "Hostel Resource Management",
    office: "Chief Warden; Hostel Wardens",
    text: "Promotion of water and electricity conservation, food-waste reduction, waste segregation, and environmentally responsible practices in hostel facilities.",
  },
  {
    title: "Classroom & Lab Optimization",
    office: "Timetable & Classroom Management",
    text: "Optimal classroom allocation and reduction of idle spaces support efficient use of teaching infrastructure and campus resources.",
  },
  {
    title: "Procurement & Records",
    office: "Library & Information Centre; Procurement/Finance",
    text: "Library and other offices follow GFR 2017-aligned procurement documents, comparative statements, and vendor empanelment practices to support responsible purchasing.",
  },
  {
    title: "Green Campus Coordination",
    office: "Campus Greening; Associate Dean (Infrastructure)",
    text: "Energy conservation measures, audits, and renewable-energy initiatives are coordinated with Campus Greening and Infrastructure to improve resource efficiency.",
  },
];

const evidenceHighlights = [
  "Hostel circulars on conservation and mess waste-reduction initiatives.",
  "Classroom/laboratory utilization logs and maintenance tickets resolved.",
  "Procurement files, comparative statements, and vendor records.",
];

const outcomes = [
  "Reduced resource wastage in hostels and academic areas.",
  "More transparent, compliant, and value-based procurement.",
];

const futureRoadmap = [
  "Introduce resource-use benchmarks such as water and electricity consumption per occupant.",
  "Expand waste segregation and recycling pilots with measurable targets.",
];

const SdgTwelvePage = () => {
  return (
    <div className="min-h-screen pb-16 transition-colors duration-200">
      <PageHeader
        title="Sustainable Development Goal 12"
        subtitle="Ensure sustainable consumption and production patterns"
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8">

        {/* HERO */}
        <section className="overflow-hidden rounded-2xl bg-[#BF8B2E] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

            <div className="p-7 sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-7xl font-black leading-none tracking-tight md:text-8xl">
                  12
                </span>

                <span
                  className="h-16 w-px bg-white/40"
                  aria-hidden="true"
                />

                <span className="max-w-[12rem] text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
                  Responsible consumption and production
                </span>
              </div>

              <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
                Efficient resource use, waste reduction, and responsible
                procurement support a more sustainable campus.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">
                IIIT Pune promotes efficient use of resources including water,
                electricity, and food; waste segregation; responsible
                procurement; and sustainable practices across hostels,
                academics, and administration.
              </p>
            </div>

            {/* SAME HERO STRUCTURE AS THE OTHER SDG PAGES */}
            <div className="flex min-h-64 items-end bg-[#A97827] p-7 sm:p-10 md:p-14">
              <div>
                <Recycle
                  className="mb-6 h-14 w-14 text-white/90"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <p className="max-w-sm text-lg font-medium leading-7 text-white/90">
                  Responsible use of resources, sustainable purchasing, and
                  waste reduction help create a more efficient campus.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* UN GOAL OVERVIEW */}
        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#A97827]">
              UN goal overview
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Responsible consumption and production
            </h2>
          </div>

          <div className="border-l-2 border-[#BF8B2E]/50 pl-6 text-base leading-8 text-gray-700 dark:text-gray-300 md:pl-8">
            <p>
              Ensure sustainable consumption and production patterns.
              Priorities include resource efficiency, waste reduction,
              sustainable procurement, and responsible practices.
            </p>
          </div>
        </section>

        {/* IIIT PUNE COMMITMENT */}
        <section className="mt-12 rounded-2xl bg-gray-900 p-7 text-white dark:bg-black sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-300">
            IIIT Pune commitment
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-200">
            IIIT Pune promotes efficient use of resources (water, electricity,
            food), waste segregation, responsible procurement, and sustainable
            practices across hostels, academics, and administration.
          </p>
        </section>

        {/* FOCUS AREAS */}
        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="border-t-4 border-[#BF8B2E] bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800"
            >
              <Icon
                className="h-8 w-8 text-[#A97827]"
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
              className="h-7 w-7 text-[#A97827]"
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
                className="border-l-4 border-[#BF8B2E] bg-white p-5 text-base leading-7 text-gray-700 shadow-sm dark:bg-surface-dark dark:text-gray-300"
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
              className="h-7 w-7 text-[#A97827]"
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

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#A97827] dark:text-yellow-400">
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

          <div className="border-t-4 border-[#BF8B2E] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ClipboardCheck
                className="h-7 w-7 text-[#A97827]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Evidence highlights
              </h2>
            </div>

            <ul className="mt-8 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {evidenceHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#BF8B2E]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-4 border-[#BF8B2E] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <Leaf
                className="h-7 w-7 text-[#A97827]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Outcomes
              </h2>
            </div>

            <ul className="mt-8 space-y-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#BF8B2E]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </section>

        {/* FUTURE ROADMAP */}
        <section className="mt-14 overflow-hidden rounded-2xl bg-[#BF8B2E] p-7 text-white sm:p-10">
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
              Responsible resources, sustainable campus
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              Resource efficiency, waste reduction, sustainable procurement,
              and responsible practices are shared responsibilities across the
              IIIT Pune community.
            </p>
          </div>

          <a
            href="https://sdgs.un.org/goals/goal12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#A97827] transition-colors hover:text-[#BF8B2E] dark:text-yellow-400"
          >
            Learn about Goal 12
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>

      </main>
    </div>
  );
};

export default SdgTwelvePage;
