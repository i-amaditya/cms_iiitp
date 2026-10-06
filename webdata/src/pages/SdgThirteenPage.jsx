import {
  ArrowUpRight,
  Boxes,
  ClipboardCheck,
  Leaf,
  Lightbulb,
  Sprout,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const focusAreas = [
  {
    icon: Leaf,
    title: "Campus Greening & Climate Action",
    text: "Tree plantation, landscaping, biodiversity conservation, plant-health monitoring, energy audits, and renewable-energy initiatives support climate-conscious campus development.",
  },
  {
    icon: Sprout,
    title: "Awareness & Sustainable Lifestyles",
    text: "SAC and NMBA-linked walkathons, campaigns, and awareness activities encourage healthy, sustainable lifestyles and environmental responsibility.",
  },
  {
    icon: Lightbulb,
    title: "Climate Innovation",
    text: "Student projects, BTP/MTP work, and hackathon initiatives explore climate analytics, energy optimization, environmental monitoring, and sustainability-focused applications.",
  },
];

const higherEducationTargets = [
  "Integrate climate change measures into policies and planning.",
  "Improve education, awareness and human capacity on climate mitigation/adaptation.",
  "Promote renewable energy and low-carbon practices.",
];

const initiatives = [
  {
    title: "Campus Greening",
    office: "Campus Greening",
    text: "Tree plantation, landscaping, biodiversity conservation, monitoring of plant health, energy audits, and renewable-energy initiatives such as solar power and solar water heating support climate action.",
  },
  {
    title: "Awareness & Events",
    office: "SAC In-charge; NMBA Nodal Officer",
    text: "Walkathons, campaigns, and awareness activities linked with SAC and NMBA promote healthy, sustainable lifestyles and environmental responsibility.",
  },
  {
    title: "Curriculum & Projects",
    office: "HoD CSE; SIH SPOC; BTP/MTP Coordinator",
    text: "BTP/MTP and SIH projects are encouraged in climate analytics, energy optimization, environmental monitoring, and sustainability-focused applications.",
  },
];

const evidenceHighlights = [
  "Plantation drives, survival rates, and green cover maps, where available.",
  "Energy audit summaries and solar installations, if any.",
  "Student projects and topics addressing climate and environmental challenges.",
];

const outcomes = [
  "Enhanced green cover and biodiversity on campus.",
  "Greater student and faculty awareness of climate action.",
  "Innovation pipelines addressing sustainability challenges.",
];

const futureRoadmap = [
  "Formalize an annual carbon and energy footprint estimation exercise.",
  "Expand interdisciplinary sustainability projects and hackathon tracks.",
];

const SdgThirteenPage = () => {
  return (
    <div className="min-h-screen pb-16 transition-colors duration-200">
      <PageHeader
        title="Sustainable Development Goal 13"
        subtitle="Take urgent action to combat climate change and its impacts"
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8">

        <section className="overflow-hidden rounded-2xl bg-[#3F7E44] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

            <div className="p-7 sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-7xl font-black leading-none tracking-tight md:text-8xl">
                  13
                </span>

                <span className="h-16 w-px bg-white/40" />

                <span className="max-w-[12rem] text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
                  Climate action
                </span>
              </div>

              <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
                Climate-conscious infrastructure, awareness, and innovation
                support a resilient and sustainable campus.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">
                IIIT Pune advances climate action through green campus
                initiatives, energy efficiency, awareness campaigns, and
                integration of sustainability themes into projects and events.
              </p>
            </div>

            <div className="flex min-h-64 items-end bg-[#356B3A] p-7 sm:p-10 md:p-14">
              <div>
                <Leaf
                  className="mb-6 h-14 w-14 text-white/90"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <p className="max-w-sm text-lg font-medium leading-7 text-white/90">
                  Climate awareness, green infrastructure, and sustainable
                  innovation help build a resilient campus for the future.
                </p>
              </div>
            </div>

          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#356B3A]">
              UN goal overview
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Climate action for a resilient future
            </h2>
          </div>

          <div className="border-l-2 border-[#3F7E44]/50 pl-6 text-base leading-8 text-gray-700 dark:text-gray-300 md:pl-8">
            <p>
              Take urgent action to combat climate change and its impacts
              through mitigation, adaptation, and awareness.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-2xl bg-gray-900 p-7 text-white dark:bg-black sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-300">
            IIIT Pune commitment
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-200">
            IIIT Pune advances climate action through green campus initiatives,
            energy efficiency, awareness campaigns, and integration of
            sustainability themes into projects and events.
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="border-t-4 border-[#3F7E44] bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800"
            >
              <Icon
                className="h-8 w-8 text-[#356B3A]"
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

        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <ClipboardCheck className="h-7 w-7 text-[#356B3A]" />

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Relevant targets for higher education
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {higherEducationTargets.map((target) => (
              <div
                key={target}
                className="border-l-4 border-[#3F7E44] bg-white p-5 text-base leading-7 text-gray-700 shadow-sm dark:bg-surface-dark dark:text-gray-300"
              >
                {target}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <Boxes className="h-7 w-7 text-[#356B3A]" />

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

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#356B3A] dark:text-green-400">
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
          <div className="border-t-4 border-[#3F7E44] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-7 w-7 text-[#356B3A]" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Evidence highlights
              </h2>
            </div>

            <ul className="mt-8 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {evidenceHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3F7E44]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-4 border-[#3F7E44] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <Leaf className="h-7 w-7 text-[#356B3A]" />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Outcomes
              </h2>
            </div>

            <ul className="mt-8 space-y-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3F7E44]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-14 overflow-hidden rounded-2xl bg-[#3F7E44] p-7 text-white sm:p-10">
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
              Climate action, sustainable future
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              Climate awareness, green campus development, and sustainability
              innovation are shared responsibilities across the IIIT Pune
              community.
            </p>
          </div>

          <a
            href="https://sdgs.un.org/goals/goal13"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#356B3A] transition-colors hover:text-[#3F7E44] dark:text-green-400"
          >
            Learn about Goal 13
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>

      </main>
    </div>
  );
};

export default SdgThirteenPage;
