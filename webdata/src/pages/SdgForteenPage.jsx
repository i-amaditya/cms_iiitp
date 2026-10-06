import {
  ArrowUpRight,
  Boxes,
  ClipboardCheck,
  Fish,
  Lightbulb,
  Waves,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const focusAreas = [
  {
    icon: Waves,
    title: "Water Conservation Awareness",
    text: "Seminars, talks, and sustainability themes can build awareness of water quality, pollution, conservation, and responsible use of water resources.",
  },
  {
    icon: Fish,
    title: "Water-Body Research",
    text: "Student and faculty projects can explore water-quality monitoring, pollution analytics, conservation, and environmental data.",
  },
  {
    icon: Lightbulb,
    title: "Data-Driven Solutions",
    text: "BTP/MTP and hackathon projects can apply sensor networks, data analytics, and pollution prediction to rivers, lakes, and other water bodies.",
  },
];

const higherEducationTargets = [
  "Education and awareness on sustainable use of marine resources.",
  "Research and innovation addressing water quality, pollution and conservation.",
];

const initiatives = [
  {
    title: "Awareness & Curriculum Integration",
    office: "HoD CSE; Applied Sciences & Humanities",
    text: "Sustainability themes can be incorporated into projects, seminars, and talks addressing water quality, pollution analytics, and conservation.",
  },
  {
    title: "Project Opportunities",
    office: "SIH SPOC; BTP/MTP Coordinator",
    text: "Student projects through BTP/MTP and Smart India Hackathon can explore water-quality monitoring, sensor networks, data analytics for rivers and lakes, and pollution prediction.",
  },
];

const evidenceHighlights = [
  "Event records on environment and water themes.",
  "Student project titles and abstracts related to water bodies.",
];

const outcomes = [
  "Increased awareness of water-body conservation among students.",
  "Prototype solutions for monitoring and managing water quality.",
];

const futureRoadmap = [
  "Collaborate with local bodies and NGOs for pilot water-monitoring projects.",
  "Host themed hackathons and seminars on water and marine sustainability.",
];

const SdgFourteenPage = () => {
  return (
    <div className="min-h-screen pb-16 transition-colors duration-200">
      <PageHeader
        title="Sustainable Development Goal 14"
        subtitle="Conserve and sustainably use the oceans, seas and marine resources for sustainable development"
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8">

        <section className="overflow-hidden rounded-2xl bg-[#0A97D9] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

            <div className="p-7 sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-7xl font-black leading-none tracking-tight md:text-8xl">
                  14
                </span>

                <span className="h-16 w-px bg-white/40" />

                <span className="max-w-[12rem] text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
                  Life below water
                </span>
              </div>

              <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
                Awareness, research, and data-driven solutions can support the
                conservation of water bodies and aquatic ecosystems.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">
                While not a marine-focused institute, IIIT Pune contributes
                through awareness, interdisciplinary projects, and data-driven
                solutions that can support water-body conservation and
                pollution monitoring.
              </p>
            </div>

            <div className="flex min-h-64 items-end bg-[#0888C3] p-7 sm:p-10 md:p-14">
              <div>
                <Waves
                  className="mb-6 h-14 w-14 text-white/90"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <p className="max-w-sm text-lg font-medium leading-7 text-white/90">
                  Research, awareness, and technology can contribute to better
                  water-quality monitoring and conservation.
                </p>
              </div>
            </div>

          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0888C3]">
              UN goal overview
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Life below water
            </h2>
          </div>

          <div className="border-l-2 border-[#0A97D9]/50 pl-6 text-base leading-8 text-gray-700 dark:text-gray-300 md:pl-8">
            <p>
              Conserve and sustainably use the oceans, seas, and marine
              resources for sustainable development.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-2xl bg-gray-900 p-7 text-white dark:bg-black sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
            IIIT Pune commitment
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-200">
            While not a marine-focused institute, IIIT Pune contributes through
            awareness, interdisciplinary projects, and data-driven solutions
            that can support water-body conservation and pollution monitoring.
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="border-t-4 border-[#0A97D9] bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800"
            >
              <Icon
                className="h-8 w-8 text-[#0888C3]"
                strokeWidth={1.8}
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

        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <ClipboardCheck className="h-7 w-7 text-[#0888C3]" />

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Relevant targets for higher education
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {higherEducationTargets.map((target) => (
              <div
                key={target}
                className="border-l-4 border-[#0A97D9] bg-white p-5 text-base leading-7 text-gray-700 shadow-sm dark:bg-surface-dark dark:text-gray-300"
              >
                {target}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <Boxes className="h-7 w-7 text-[#0888C3]" />

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

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0888C3] dark:text-cyan-400">
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
          <div className="border-t-4 border-[#0A97D9] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-7 w-7 text-[#0888C3]" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Evidence highlights
              </h2>
            </div>

            <ul className="mt-8 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {evidenceHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0A97D9]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-4 border-[#0A97D9] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <Waves className="h-7 w-7 text-[#0888C3]" />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Outcomes
              </h2>
            </div>

            <ul className="mt-8 space-y-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0A97D9]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-14 overflow-hidden rounded-2xl bg-[#0A97D9] p-7 text-white sm:p-10">
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
              Water awareness, smarter conservation
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              Awareness, research, and technology can support healthier water
              bodies and more sustainable resource management.
            </p>
          </div>

          <a
            href="https://sdgs.un.org/goals/goal14"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#0888C3] transition-colors hover:text-[#0A97D9] dark:text-cyan-400"
          >
            Learn about Goal 14
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>

      </main>
    </div>
  );
};

export default SdgFourteenPage;
