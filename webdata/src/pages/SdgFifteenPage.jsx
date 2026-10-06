import {
  ArrowUpRight,
  Boxes,
  ClipboardCheck,
  Leaf,
  Lightbulb,
  TreePine,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const focusAreas = [
  {
    icon: TreePine,
    title: "Campus Greening & Biodiversity",
    text: "Tree plantation, landscaping, maintenance of green areas, and monitoring of plant health and survival support campus biodiversity.",
  },
  {
    icon: Leaf,
    title: "Terrestrial Ecosystem Conservation",
    text: "Green-space management and biodiversity conservation contribute to healthier terrestrial ecosystems and sustainable campus development.",
  },
  {
    icon: Lightbulb,
    title: "Technology for Ecosystem Monitoring",
    text: "Land-use analytics, vegetation monitoring, drone and satellite imagery analysis, and biodiversity informatics can strengthen environmental decision-making.",
  },
];

const higherEducationTargets = [
  "Conservation and restoration of land ecosystems and biodiversity.",
  "Sustainable management of green spaces and forests.",
  "Integration of ecosystem values into planning and education.",
];

const initiatives = [
  {
    title: "Campus Greening & Biodiversity",
    office: "Campus Greening",
    text: "Tree plantation, landscaping, maintenance of green areas, and monitoring the health and survival of trees and plants support campus biodiversity and terrestrial ecosystem health.",
  },
  {
    title: "Projects & Research",
    office: "HoD CSE; R&D; SIH SPOC",
    text: "Student and faculty projects explore land-use analytics, vegetation monitoring, drone and satellite imagery analysis, and biodiversity informatics.",
  },
];

const evidenceHighlights = [
  "Plantation records, species lists, and survival audits.",
  "Project reports and papers on land and ecosystem analytics.",
];

const outcomes = [
  "Improved green cover and campus biodiversity.",
  "Technology-enabled insights for land and ecosystem management.",
];

const futureRoadmap = [
  "Develop a campus biodiversity inventory and digital map.",
  "Encourage more interdisciplinary projects with Applied Sciences and Humanities.",
];

const SdgFifteenPage = () => {
  return (
    <div className="min-h-screen pb-16 transition-colors duration-200">
      <PageHeader
        title="Sustainable Development Goal 15"
        subtitle="Protect, restore and promote sustainable use of terrestrial ecosystems"
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8">

        <section className="overflow-hidden rounded-2xl bg-[#56C02B] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

            <div className="p-7 sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-7xl font-black leading-none tracking-tight md:text-8xl">
                  15
                </span>

                <span className="h-16 w-px bg-white/40" />

                <span className="max-w-[12rem] text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
                  Life on land
                </span>
              </div>

              <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
                Green campuses, biodiversity conservation, and technology-led
                environmental monitoring strengthen life on land.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">
                IIIT Pune supports terrestrial ecosystem health through campus
                greening, biodiversity conservation, and projects that leverage
                technology for environmental monitoring.
              </p>
            </div>

            <div className="flex min-h-64 items-end bg-[#4AA824] p-7 sm:p-10 md:p-14">
              <div>
                <TreePine
                  className="mb-6 h-14 w-14 text-white/90"
                  strokeWidth={1.5}
                />

                <p className="max-w-sm text-lg font-medium leading-7 text-white/90">
                  Healthy green spaces, biodiversity, and environmental
                  intelligence help protect the ecosystems around us.
                </p>
              </div>
            </div>

          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#4AA824]">
              UN goal overview
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Protecting life on land
            </h2>
          </div>

          <div className="border-l-2 border-[#56C02B]/50 pl-6 text-base leading-8 text-gray-700 dark:text-gray-300 md:pl-8">
            <p>
              Protect, restore, and promote sustainable use of terrestrial
              ecosystems, sustainably manage forests, combat desertification,
              halt and reverse land degradation, and halt biodiversity loss.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-2xl bg-gray-900 p-7 text-white dark:bg-black sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-300">
            IIIT Pune commitment
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-200">
            IIIT Pune supports terrestrial ecosystem health through campus
            greening, biodiversity conservation, and projects that leverage
            technology for environmental monitoring.
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="border-t-4 border-[#56C02B] bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800"
            >
              <Icon className="h-8 w-8 text-[#4AA824]" strokeWidth={1.8} />

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
            <ClipboardCheck className="h-7 w-7 text-[#4AA824]" />

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Relevant targets for higher education
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {higherEducationTargets.map((target) => (
              <div
                key={target}
                className="border-l-4 border-[#56C02B] bg-white p-5 text-base leading-7 text-gray-700 shadow-sm dark:bg-surface-dark dark:text-gray-300"
              >
                {target}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <Boxes className="h-7 w-7 text-[#4AA824]" />

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

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#4AA824] dark:text-green-400">
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
          <div className="border-t-4 border-[#56C02B] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-7 w-7 text-[#4AA824]" />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Evidence highlights
              </h2>
            </div>

            <ul className="mt-8 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {evidenceHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#56C02B]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-4 border-[#56C02B] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <Leaf className="h-7 w-7 text-[#4AA824]" />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Outcomes
              </h2>
            </div>

            <ul className="mt-8 space-y-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#56C02B]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-14 overflow-hidden rounded-2xl bg-[#56C02B] p-7 text-white sm:p-10">
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
              Protecting ecosystems, preserving biodiversity
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              Campus greening, biodiversity, and environmental monitoring
              support healthier terrestrial ecosystems.
            </p>
          </div>

          <a
            href="https://sdgs.un.org/goals/goal15"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#4AA824] transition-colors hover:text-[#56C02B] dark:text-green-400"
          >
            Learn about Goal 15
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>

      </main>
    </div>
  );
};

export default SdgFifteenPage;
