import {
  ArrowUpRight,
  Boxes,
  ClipboardCheck,
  HeartPulse,
  Lightbulb,
  Sprout,
  Utensils,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const focusAreas = [
  {
    icon: Utensils,
    title: "Safe and sufficient food",
    text: "Nutritious, affordable, and hygienic hostel mess services support student well-being and daily academic life.",
  },
  {
    icon: HeartPulse,
    title: "Healthy living",
    text: "Awareness through health, sports, and counselling activities encourages informed dietary habits and sustainable lifestyles.",
  },
  {
    icon: Sprout,
    title: "Technology for food security",
    text: "Student projects, hackathons, and innovation ecosystems can apply technology to food systems and supply-chain challenges.",
  },
];

const higherEducationTargets = [
  "Access to safe, nutritious, and sufficient food for all students.",
  "Awareness of healthy diets and sustainable food systems.",
  "Research and innovation addressing food security and supply chains.",
];

const initiatives = [
  {
    title: "Hostel Mess Management",
    office: "Chief Warden; Hostel Wardens - Brahmaputra, Krishna, Indrayani",
    text: "Regular monitoring of food quality, hygiene, and affordability, supported by student-led Mess Committees for feedback and transparency.",
  },
  {
    title: "Health & Nutrition Awareness",
    office: "NMBA Nodal Officer, Sports Committee, Counselling",
    text: "Events under NMBA, sports, and counselling promote healthy lifestyles and dietary habits across the student community.",
  },
  {
    title: "Academic/Project Linkages",
    office: "HoD CSE, SIH SPOC, BTP/MTP Coordinator",
    text: "Student projects through BTP/MTP and SIH are encouraged in agri-tech, supply-chain optimization, nutrition analytics, and AI for food security.",
  },
];

const evidenceHighlights = [
  "Mess audits, feedback summaries, and vendor performance reviews.",
  "Health and nutrition events conducted and participation counts.",
  "Student projects and startups addressing food systems.",
];

const outcomes = [
  "Improved student satisfaction with mess services and hygiene.",
  "Greater awareness of nutrition and healthy living.",
  "Innovation pipelines addressing food security challenges.",
];

const futureRoadmap = [
  "Introduce periodic nutrition awareness sessions with experts.",
  "Encourage more interdisciplinary projects on agri-tech and food technology.",
];

const SdgTwoPage = () => {
  return (
    <div className="min-h-screen pb-16 transition-colors duration-200">
      <PageHeader
        title="Sustainable Development Goal 2"
        subtitle="End hunger, achieve food security and improved nutrition, and promote sustainable agriculture"
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8">
        <section className="overflow-hidden rounded-2xl bg-[#DDA63A] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-7 sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-7xl font-black leading-none tracking-tight md:text-8xl">02</span>
                <span className="h-16 w-px bg-white/40" aria-hidden="true" />
                <span className="max-w-[10rem] text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
                  Zero hunger
                </span>
              </div>
              <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
                Food security, nutrition, and healthy communities are essential to student success.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">
                IIIT Pune supports SDG 2 through nutritious hostel mess services, food safety and hygiene monitoring, healthy-diet awareness, and technology-driven solutions for food security explored through projects and hackathons.
              </p>
            </div>
            <div className="flex min-h-64 items-end bg-[#b88925] p-7 sm:p-10 md:p-14">
              <div>
                <Utensils className="mb-6 h-14 w-14 text-white/90" strokeWidth={1.5} aria-hidden="true" />
                <p className="max-w-sm text-lg font-medium leading-7 text-white/90">
                  A healthy campus helps learners focus, participate, and build a stronger future.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b88925]">UN goal overview</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">Zero hunger for everyone</h2>
          </div>
          <div className="border-l-2 border-[#DDA63A]/50 pl-6 text-base leading-8 text-gray-700 dark:text-gray-300 md:pl-8">
            <p>
              End hunger, achieve food security and improved nutrition, and promote sustainable agriculture. Higher education institutions can contribute by ensuring student access to food, building awareness of healthy diets, and applying research and innovation to food systems.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-2xl bg-gray-900 p-7 text-white dark:bg-black sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-300">IIIT Pune commitment</p>
          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-200">
            While not an agricultural institute, IIIT Pune supports SDG 2 through nutritious hostel mess services, food safety and hygiene monitoring, awareness on healthy diets, and technology-driven solutions for food security explored via projects and hackathons.
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article key={title} className="border-t-4 border-[#DDA63A] bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800">
              <Icon className="h-8 w-8 text-[#b88925]" strokeWidth={1.8} aria-hidden="true" />
              <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">{text}</p>
            </article>
          ))}
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <ClipboardCheck className="h-7 w-7 text-[#b88925]" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">Relevant targets for higher education</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {higherEducationTargets.map((target) => (
              <div key={target} className="border-l-4 border-[#DDA63A] bg-white p-5 text-base leading-7 text-gray-700 shadow-sm dark:bg-surface-dark dark:text-gray-300">{target}</div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <Boxes className="h-7 w-7 text-[#b88925]" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">IIIT Pune initiatives</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {initiatives.map(({ title, office, text }) => (
              <article key={title} className="bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#b88925] dark:text-yellow-400">Office: {office}</p>
                <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="border-t-4 border-[#DDA63A] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-7 w-7 text-[#b88925]" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Evidence highlights</h2>
            </div>
            <ul className="mt-8 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {evidenceHighlights.map((item) => <li key={item} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDA63A]" />{item}</li>)}
            </ul>
          </div>
          <div className="border-t-4 border-[#DDA63A] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <HeartPulse className="h-7 w-7 text-[#b88925]" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Outcomes</h2>
            </div>
            <ul className="mt-8 space-y-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {outcomes.map((item) => <li key={item} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#DDA63A]" />{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="mt-14 overflow-hidden rounded-2xl bg-[#DDA63A] p-7 text-white sm:p-10">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-7 w-7" aria-hidden="true" />
            <h2 className="text-2xl font-bold md:text-3xl">Future roadmap</h2>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {futureRoadmap.map((item, index) => (
              <div key={item} className="border-l border-white/50 pl-4 text-sm leading-7 text-white/95">
                <span className="mb-2 block text-2xl font-black text-white/60">0{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 flex flex-col gap-5 border-y border-gray-200 py-8 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">A healthier campus, a stronger future</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">Food, nutrition, and innovation are shared responsibilities across the IIIT Pune community.</p>
          </div>
          <a href="https://sdgs.un.org/goals/goal2" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#b88925] transition-colors hover:text-[#DDA63A] dark:text-yellow-400">
            Learn about Goal 2
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>
      </main>
    </div>
  );
};

export default SdgTwoPage;