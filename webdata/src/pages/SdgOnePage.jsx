import {
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  HandHeart,
  Lightbulb,
  ShieldCheck,
  Users,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const focusAreas = [
  {
    icon: GraduationCap,
    title: "Education as opportunity",
    text: "Accessible, high-quality education helps learners build the knowledge and confidence to create more secure futures.",
  },
  {
    icon: Users,
    title: "Inclusive participation",
    text: "A welcoming academic environment makes it easier for students from different backgrounds to participate, belong, and thrive.",
  },
  {
    icon: ShieldCheck,
    title: "Supportive institutions",
    text: "Transparent systems, student support, and responsible administration help reduce barriers to learning and opportunity.",
  },
];

const higherEducationTargets = [
  "Equal access to affordable, quality higher education for all, especially disadvantaged groups.",
  "Skills for employment, decent work and entrepreneurship.",
  "Social protection floors and financial support mechanisms.",
];

const initiatives = [
  {
    title: "Admissions & Access",
    office: "UG/PG Admission Coordinators, Dean (Academic)",
    text: "Transparent UG/PG admissions through JoSAA/CSAB, CCMT, and Visvesvaraya PhD, along with orientation and document verification, help eligible candidates access academic programmes.",
  },
  {
    title: "Financial Support Linkages",
    office: "TPO, Accounts, Dean (Students)",
    text: "Coordination with government scholarships, institute fee policies, and Training & Placement-driven employability supports the economic mobility of graduates.",
  },
  {
    title: "Employability & Livelihoods",
    office: "TPO, IIC/E-Cell, SIH SPOC, HoD CSE",
    text: "Industry-aligned training, internships, hackathons such as SIH, projects, and placements improve income potential and career stability.",
  },
  {
    title: "Entrepreneurship",
    office: "IIC & E-Cell",
    text: "Workshops, idea challenges, startup mentoring, and industry connect foster self-employment and job creation.",
  },
  {
    title: "Inclusive Support",
    office: "OBC Cell, ICC, SGRC, Counselling",
    text: "The OBC Special Cell, ICC, SGRC, and counselling services reduce barriers and support continuity of education for vulnerable students.",
  },
];

const evidenceHighlights = [
  "Students placed or interned, including median or average compensation and sector-wise distribution.",
  "Scholarships or fee waivers availed and the number of beneficiaries.",
  "Startups or incubation ideas supported through IIC/E-Cell and competitions won.",
  "SIH participation and problem statements addressing social challenges.",
];

const outcomes = [
  "Improved economic mobility through placements and higher education outcomes.",
  "Enhanced skills and industry readiness reducing unemployment risk.",
  "Support mechanisms enabling continuation of studies for financially vulnerable students.",
];

const futureRoadmap = [
  "Strengthen need-based scholarship awareness and application support.",
  "Expand industry-sponsored projects and paid internships.",
  "Scale startup mentorship and linkages with incubators and angel investors.",
];

const SdgOnePage = () => {
  return (
    <div className="min-h-screen pb-16 transition-colors duration-200">
      <PageHeader
        title="Sustainable Development Goal 1"
        subtitle="End poverty in all its forms everywhere"
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14">
        <section className="overflow-hidden rounded-2xl bg-[#e5243b] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-7 sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-7xl font-black leading-none tracking-tight md:text-8xl">01</span>
                <span className="h-16 w-px bg-white/40" aria-hidden="true" />
                <span className="max-w-[10rem] text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
                  No poverty
                </span>
              </div>
              <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
                Knowledge, access, and dignity are essential foundations for a life free from poverty.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">
                IIIT Pune contributes to this goal by widening access to technical education, encouraging inclusive participation, and preparing students to use technology for meaningful social impact.
              </p>
            </div>
            <div className="flex min-h-64 items-end bg-[#c71f35] p-7 sm:p-10 md:p-14">
              <div>
                <HandHeart className="mb-6 h-14 w-14 text-white/90" strokeWidth={1.5} aria-hidden="true" />
                <p className="max-w-sm text-lg font-medium leading-7 text-white/90">
                  Sustainable change begins when opportunity is made more reachable for everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e5243b]">UN goal overview</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Ending poverty by 2030
            </h2>
          </div>
          <div className="border-l-2 border-[#e5243b]/30 pl-6 text-base leading-8 text-gray-700 dark:text-gray-300 md:pl-8">
            <p>
              End poverty in all its forms everywhere by 2030. Key targets include eradicating extreme poverty, ensuring equal access to economic resources, expanding social protection, and building resilience among vulnerable communities.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-2xl bg-gray-900 p-7 text-white dark:bg-black sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-300">IIIT Pune commitment</p>
          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-200">
            IIIT Pune contributes to SDG 1 by expanding equitable access to quality technical education, enabling employability through training and placements, facilitating scholarships and financial support, and promoting entrepreneurship and livelihood opportunities through innovation ecosystems.
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="border-t-4 border-[#e5243b] bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800"
            >
              <Icon className="h-8 w-8 text-[#e5243b]" strokeWidth={1.8} aria-hidden="true" />
              <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">{text}</p>
            </article>
          ))}
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <GraduationCap className="h-7 w-7 text-[#e5243b]" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">Relevant targets for higher education</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {higherEducationTargets.map((target) => (
              <div key={target} className="border-l-4 border-[#e5243b] bg-white p-5 text-base leading-7 text-gray-700 shadow-sm dark:bg-surface-dark dark:text-gray-300">
                {target}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <BriefcaseBusiness className="h-7 w-7 text-[#e5243b]" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">IIIT Pune initiatives</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {initiatives.map(({ title, office, text }) => (
              <article key={title} className="bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#c71f35] dark:text-red-400">Office: {office}</p>
                <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="border-t-4 border-[#e5243b] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-7 w-7 text-[#e5243b]" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Evidence highlights</h2>
            </div>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {evidenceHighlights.map((item) => <li key={item} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e5243b]" />{item}</li>)}
            </ul>
          </div>
          <div className="border-t-4 border-[#e5243b] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <Users className="h-7 w-7 text-[#e5243b]" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Outcomes</h2>
            </div>
            <ul className="mt-8 space-y-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {outcomes.map((item) => <li key={item} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e5243b]" />{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="mt-14 overflow-hidden rounded-2xl bg-[#e5243b] p-7 text-white sm:p-10">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-7 w-7" aria-hidden="true" />
            <h2 className="text-2xl font-bold md:text-3xl">Future roadmap</h2>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {futureRoadmap.map((item, index) => (
              <div key={item} className="border-l border-white/50 pl-4 text-sm leading-7 text-white/90">
                <span className="mb-2 block text-2xl font-black text-white/60">0{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 flex flex-col gap-5 border-y border-gray-200 py-8 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">A shared responsibility</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              Every student, educator, and institution has a part to play in building a fairer and more resilient future.
            </p>
          </div>
          <a
            href="https://sdgs.un.org/goals/goal1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#c71f35] transition-colors hover:text-[#e5243b] dark:text-red-400"
          >
            Learn about Goal 1
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>
      </main>
    </div>
  );
};

export default SdgOnePage;