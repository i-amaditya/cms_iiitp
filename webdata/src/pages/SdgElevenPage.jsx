import {
  ArrowUpRight,
  Boxes,
  BusFront,
  ClipboardCheck,
  HeartHandshake,
  Home,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const focusAreas = [
  {
    icon: Home,
    title: "Safe & Inclusive Living",
    text: "Safe, inclusive, and comfortable hostel accommodation with grievance redressal, regular inspections, and structured resolution of infrastructure-related complaints supports sustainable campus living.",
  },
  {
    icon: BusFront,
    title: "Safe & Sustainable Transport",
    text: "The Institute Bus Service Committee plans routes, optimizes capacity, supports safe and timely transport, collects student feedback, and maintains service records.",
  },
  {
    icon: ShieldCheck,
    title: "Resilience & Emergency Preparedness",
    text: "Fire safety measures, evacuation readiness, regular inspections, and coordinated emergency response strengthen the resilience of hostels and academic blocks.",
  },
];

const higherEducationTargets = [
  "Safe, affordable and accessible housing and basic services.",
  "Safe, sustainable transport systems and road safety.",
  "Inclusive, participatory settlement management and disaster resilience.",
];

const initiatives = [
  {
    title: "Hostel Living Environment",
    office: "Chief Warden; Hostel Wardens – Brahmaputra, Krishna, Indrayani",
    text: "Safe, inclusive, and comfortable accommodation is supported through grievance redressal, structured complaints resolution for plumbing, electrical, and infrastructure issues, and regular inspections.",
  },
  {
    title: "Campus Transport",
    office: "Bus Service Committee",
    text: "The Institute Bus Service Committee plans routes, optimizes capacity, ensures safe and timely transport, collects student feedback, and maintains service records.",
  },
  {
    title: "Community & Outreach",
    office: "SAC In-charge",
    text: "SAC-coordinated NSS and social awareness campaigns, environmental drives, and community engagement activities strengthen participation and community-oriented sustainable living.",
  },
  {
    title: "Emergency Preparedness",
    office: "Chief Warden; Associate Dean (Infrastructure); CISO for digital incidents",
    text: "Fire safety measures, evacuation readiness, and coordination during emergencies in hostels and academic blocks support campus resilience and preparedness.",
  },
];

const evidenceHighlights = [
  "Hostel allotment records, night inspection logs, and safety audit checklists.",
  "Bus route plans, utilisation data, feedback summaries, and corrective actions.",
  "SAC outreach event reports and participation counts.",
];

const outcomes = [
  "Secure, well-maintained residential facilities supporting academic focus.",
  "Reliable, student-friendly transport with continuous improvement.",
  "Stronger community engagement and campus resilience.",
];

const futureRoadmap = [
  "Formalize annual hostel safety and satisfaction surveys.",
  "Introduce route-wise punctuality and occupancy dashboards for bus services.",
];

const SdgElevenPage = () => {
  return (
    <div className="min-h-screen pb-16 transition-colors duration-200">
      <PageHeader
        title="Sustainable Development Goal 11"
        subtitle="Make cities and human settlements inclusive, safe, resilient and sustainable"
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8">

        {/* HERO */}
        <section className="overflow-hidden rounded-2xl bg-[#FD9D24] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

            <div className="p-7 sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-7xl font-black leading-none tracking-tight md:text-8xl">
                  11
                </span>

                <span
                  className="h-16 w-px bg-white/40"
                  aria-hidden="true"
                />

                <span className="max-w-[12rem] text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
                  Sustainable cities and communities
                </span>
              </div>

              <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
                Safe, inclusive, resilient, and well-managed campus spaces
                support sustainable living and a stronger community.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">
                IIIT Pune develops and maintains safe, inclusive, and
                well-managed residential and academic spaces, reliable campus
                transport, and community-oriented initiatives that foster
                sustainable living.
              </p>
            </div>

            {/* SAME HERO STRUCTURE AS SDG 2–10 */}
            <div className="flex min-h-64 items-end bg-[#E58D1F] p-7 sm:p-10 md:p-14">
              <div>
                <Home
                  className="mb-6 h-14 w-14 text-white/90"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <p className="max-w-sm text-lg font-medium leading-7 text-white/90">
                  Safe residential spaces, reliable transport, community
                  engagement, and emergency preparedness strengthen campus
                  resilience.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* UN GOAL OVERVIEW */}
        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E58D1F]">
              UN goal overview
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Sustainable cities and communities
            </h2>
          </div>

          <div className="border-l-2 border-[#FD9D24]/50 pl-6 text-base leading-8 text-gray-700 dark:text-gray-300 md:pl-8">
            <p>
              Make cities and human settlements inclusive, safe, resilient and
              sustainable. Focus areas include safe housing, transport, public
              spaces, disaster preparedness, and environmental impact.
            </p>
          </div>
        </section>

        {/* IIIT PUNE COMMITMENT */}
        <section className="mt-12 rounded-2xl bg-gray-900 p-7 text-white dark:bg-black sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-300">
            IIIT Pune commitment
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-200">
            IIIT Pune develops and maintains safe, inclusive, and well-managed
            residential and academic spaces, reliable campus transport, and
            community-oriented initiatives that foster sustainable living.
          </p>
        </section>

        {/* FOCUS AREAS */}
        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="border-t-4 border-[#FD9D24] bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800"
            >
              <Icon
                className="h-8 w-8 text-[#E58D1F]"
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
              className="h-7 w-7 text-[#E58D1F]"
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
                className="border-l-4 border-[#FD9D24] bg-white p-5 text-base leading-7 text-gray-700 shadow-sm dark:bg-surface-dark dark:text-gray-300"
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
              className="h-7 w-7 text-[#E58D1F]"
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

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#E58D1F] dark:text-orange-400">
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

          <div className="border-t-4 border-[#FD9D24] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ClipboardCheck
                className="h-7 w-7 text-[#E58D1F]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Evidence highlights
              </h2>
            </div>

            <ul className="mt-8 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {evidenceHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FD9D24]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-4 border-[#FD9D24] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <HeartHandshake
                className="h-7 w-7 text-[#E58D1F]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Outcomes
              </h2>
            </div>

            <ul className="mt-8 space-y-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FD9D24]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </section>

        {/* FUTURE ROADMAP */}
        <section className="mt-14 overflow-hidden rounded-2xl bg-[#FD9D24] p-7 text-white sm:p-10">
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
              Sustainable spaces, resilient communities
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              Safe housing, reliable transport, community engagement, and
              resilience are shared responsibilities across the IIIT Pune
              community.
            </p>
          </div>

          <a
            href="https://sdgs.un.org/goals/goal11"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#E58D1F] transition-colors hover:text-[#FD9D24] dark:text-orange-400"
          >
            Learn about Goal 11
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>

      </main>
    </div>
  );
};

export default SdgElevenPage;