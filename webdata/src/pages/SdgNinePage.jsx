import {
  ArrowUpRight,
  Boxes,
  ClipboardCheck,
  Factory,
  Globe2,
  Lightbulb,
  Network,
  Rocket,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const focusAreas = [
  {
    icon: Rocket,
    title: "Research & Innovation",
    text: "Sponsored research projects, seed grants, intellectual property filings, technology transfer, and research performance monitoring strengthen IIIT Pune's innovation ecosystem.",
  },
  {
    icon: Network,
    title: "Digital & Physical Infrastructure",
    text: "Reliable campus Internet, secure networks, resilient IT systems, laboratories, classrooms, and research facilities support teaching, research, and administration.",
  },
  {
    icon: Lightbulb,
    title: "Industry & Innovation Linkages",
    text: "Hackathons, IIC/E-Cell activities, student projects, industry collaborations, international partnerships, and prototyping opportunities connect innovation with real-world challenges.",
  },
];

const higherEducationTargets = [
  "Quality, reliable, sustainable and resilient infrastructure.",
  "Increased access to ICT and affordable Internet.",
  "Enhanced research, innovation capacity and industry linkages.",
];

const initiatives = [
  {
    title: "Research Promotion",
    office: "Associate Dean (R&D & Faculty Welfare); Faculty In-charge (R&D)",
    text: "Sponsored projects from government, industry, and international sources; seed grants; IPR including patents and copyrights; technology transfer; and research performance monitoring promote institutional research and innovation.",
  },
  {
    title: "Innovation Ecosystem",
    office: "SIH SPOC; IIC & E-Cell; BTP/MTP Coordinator",
    text: "Smart India Hackathon coordination, IIC/E-Cell activities, student projects addressing real-world problems, and prototyping support encourage practical innovation and entrepreneurship.",
  },
  {
    title: "Digital Infrastructure",
    office: "CISO; Website Management; Infrastructure",
    text: "Reliable campus Internet, high-speed wired and wireless connectivity, network security, firewalls, redundancy, and resilient infrastructure support uninterrupted teaching, research, and administration.",
  },
  {
    title: "International Collaborations",
    office: "International Relations",
    text: "MoUs and LOIs with foreign universities, faculty and student exchanges, bilateral research programmes including Indo-French and Indo-Japan initiatives, and international industry collaboration expand global research connections.",
  },
  {
    title: "Labs & Facilities",
    office: "Timetable & Classroom Management; Associate Dean (R&D); HoDs",
    text: "Optimal classroom and laboratory allocation, equipment readiness, and I-STEM awareness improve access to facilities and national research infrastructure.",
  },
];

const evidenceHighlights = [
  "Publications, patents, copyrights, and funded projects list (aggregate).",
  "SIH participation, problem statements, and finalist/winner records.",
  "MoUs signed, exchange programmes conducted, and joint publications.",
  "Network uptime metrics and security audit summaries through CERT-In coordination.",
];

const outcomes = [
  "Strong research output and industry-relevant innovation.",
  "Robust, secure digital infrastructure enabling uninterrupted academics.",
  "Enhanced global exposure through collaborations and exchanges.",
];

const futureRoadmap = [
  "Increase multi-disciplinary, industry-sponsored research projects.",
  "Expand joint labs and Centres of Excellence with international and industry partners.",
  "Publish annual research and innovation highlights aligned to the SDGs.",
];

const SdgNinePage = () => {
  return (
    <div className="min-h-screen pb-16 transition-colors duration-200">
      <PageHeader
        title="Sustainable Development Goal 9"
        subtitle="Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation"
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8">

        {/* HERO */}
        <section className="overflow-hidden rounded-2xl bg-[#FD6925] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

            <div className="p-7 sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-7xl font-black leading-none tracking-tight md:text-8xl">
                  09
                </span>

                <span
                  className="h-16 w-px bg-white/40"
                  aria-hidden="true"
                />

                <span className="max-w-[12rem] text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
                  Industry, innovation and infrastructure
                </span>
              </div>

              <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
                Resilient infrastructure, research, innovation, and strong
                industry linkages help create a future-ready institution.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">
                IIIT Pune advances innovation, research, and robust
                digital/physical infrastructure through sponsored projects,
                hackathons, IPR filings, industry collaborations, and secure,
                scalable IT systems.
              </p>
            </div>

            {/* SAME HERO STRUCTURE AS SDG 2–8 */}
            <div className="flex min-h-64 items-end bg-[#DF5A1E] p-7 sm:p-10 md:p-14">
              <div>
                <Factory
                  className="mb-6 h-14 w-14 text-white/90"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <p className="max-w-sm text-lg font-medium leading-7 text-white/90">
                  Strong infrastructure and an active innovation ecosystem
                  enable research, collaboration, digital resilience, and
                  real-world impact.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* UN GOAL OVERVIEW */}
        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#DF5A1E]">
              UN goal overview
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Industry, innovation and infrastructure
            </h2>
          </div>

          <div className="border-l-2 border-[#FD6925]/50 pl-6 text-base leading-8 text-gray-700 dark:text-gray-300 md:pl-8">
            <p>
              Build resilient infrastructure, promote inclusive and sustainable
              industrialization and foster innovation. Higher education
              institutions contribute through resilient campus and digital
              infrastructure, wider access to ICT, research and innovation
              capacity, and stronger industry linkages.
            </p>
          </div>
        </section>

        {/* IIIT PUNE COMMITMENT */}
        <section className="mt-12 rounded-2xl bg-gray-900 p-7 text-white dark:bg-black sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-300">
            IIIT Pune commitment
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-200">
            IIIT Pune advances innovation, research, and robust digital and
            physical infrastructure through sponsored projects, hackathons, IPR
            filings, industry collaborations, and secure, scalable IT systems.
          </p>
        </section>

        {/* FOCUS AREAS */}
        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="border-t-4 border-[#FD6925] bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800"
            >
              <Icon
                className="h-8 w-8 text-[#DF5A1E]"
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
              className="h-7 w-7 text-[#DF5A1E]"
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
                className="border-l-4 border-[#FD6925] bg-white p-5 text-base leading-7 text-gray-700 shadow-sm dark:bg-surface-dark dark:text-gray-300"
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
              className="h-7 w-7 text-[#DF5A1E]"
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

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#DF5A1E] dark:text-orange-400">
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

          <div className="border-t-4 border-[#FD6925] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ClipboardCheck
                className="h-7 w-7 text-[#DF5A1E]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Evidence highlights
              </h2>
            </div>

            <ul className="mt-8 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {evidenceHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FD6925]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-4 border-[#FD6925] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <Globe2
                className="h-7 w-7 text-[#DF5A1E]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Outcomes
              </h2>
            </div>

            <ul className="mt-8 space-y-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FD6925]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </section>

        {/* FUTURE ROADMAP */}
        <section className="mt-14 overflow-hidden rounded-2xl bg-[#FD6925] p-7 text-white sm:p-10">
          <div className="flex items-center gap-3">
            <Lightbulb
              className="h-7 w-7"
              aria-hidden="true"
            />

            <h2 className="text-2xl font-bold md:text-3xl">
              Future roadmap
            </h2>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
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
              Innovation, infrastructure, stronger impact
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              Research, resilient infrastructure, digital connectivity,
              innovation, and collaboration are shared responsibilities across
              the IIIT Pune community.
            </p>
          </div>

          <a
            href="https://sdgs.un.org/goals/goal9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#DF5A1E] transition-colors hover:text-[#FD6925] dark:text-orange-400"
          >
            Learn about Goal 9
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>

      </main>
    </div>
  );
};

export default SdgNinePage;