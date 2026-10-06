import {
  ArrowUpRight,
  Award,
  Boxes,
  ClipboardCheck,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Users,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const focusAreas = [
  {
    icon: ShieldCheck,
    title: "Safe & Respectful Campus",
    text: "IIIT Pune promotes a safe, respectful, and gender-equitable campus through POSH compliance, safe hostel infrastructure, grievance redressal, and awareness initiatives.",
  },
  {
    icon: Users,
    title: "Equal Participation",
    text: "Women are encouraged to participate equally in academics, sports, student activities, projects, leadership opportunities, and placements.",
  },
  {
    icon: HeartHandshake,
    title: "Empowerment & Career Support",
    text: "Women-centric career programs, mentorship, training, and placement support help strengthen participation and opportunities for women students.",
  },
];

const higherEducationTargets = [
  "Safe, non-discriminatory learning and work environment.",
  "Equal access to education, leadership, and employment opportunities.",
  "Prevention and redressal of sexual harassment.",
];

const initiatives = [
  {
    title: "ICC (POSH)",
    office: "ICC – Presiding Officer",
    text: "Prevention, prohibition, and redressal of sexual harassment are supported through awareness sessions, SHe-Box portal promotion, reasoned inquiries, and reporting mechanisms.",
  },
  {
    title: "Safe Hostels",
    office: "Chief Warden; Hostel Wardens",
    text: "The dedicated girls’ hostel (Indrayani) has safety protocols including CCTV, secure access, night inspections, and grievance redressal mechanisms.",
  },
  {
    title: "Sports & Leadership",
    office: "Sports Committee",
    text: "Women’s teams participate in cricket, football, volleyball, kabaddi, tug of war, badminton, table tennis, and athletics. Recognition of winners encourages continued participation and leadership.",
  },
  {
    title: "Inclusive Education & Placements",
    office: "TPO",
    text: "Training and placement initiatives provide equal support, alongside women-centric career programs and mentorship opportunities.",
  },
  {
    title: "Awareness & Capacity Building",
    office: "ICC; OBC Cell; SAC",
    text: "Workshops and awareness activities address gender equality, workplace dignity, and relevant legal provisions.",
  },
];

const evidenceHighlights = [
  "ICC awareness sessions conducted, attendance records, and SHe-Box awareness metrics.",
  "Women’s participation rates in sports and placements.",
  "Hostel safety audits and incident prevention records.",
];

const outcomes = [
  "Stronger sense of safety and belonging among women students and staff.",
  "Increased women’s participation in sports, projects, and placements.",
  "Institutional culture of respect and zero tolerance for harassment.",
];

const futureRoadmap = [
  "Expand women-in-tech talks, mentorship circles, and leadership workshops.",
  "Track and publish gender-disaggregated placement and participation data.",
];

const SdgFivePage = () => {
  return (
    <div className="min-h-screen pb-16 transition-colors duration-200">
      <PageHeader
        title="Sustainable Development Goal 5"
        subtitle="Achieve gender equality and empower all women and girls"
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8">

        {/* HERO */}
        <section className="overflow-hidden rounded-2xl bg-[#FF3A21] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

            <div className="p-7 sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-7xl font-black leading-none tracking-tight md:text-8xl">
                  05
                </span>

                <span
                  className="h-16 w-px bg-white/40"
                  aria-hidden="true"
                />

                <span className="max-w-[12rem] text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
                  Gender equality
                </span>
              </div>

              <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
                A safe, respectful, and gender-equitable campus empowers every
                learner to participate, lead, and succeed.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">
                IIIT Pune fosters a safe, respectful, and gender-equitable
                campus through POSH compliance, safe hostel infrastructure,
                women’s participation in sports and academics, and targeted
                career support.
              </p>
            </div>

            {/* SAME HERO STRUCTURE AS SDG 2 / 3 / 4 */}
            <div className="flex min-h-64 items-end bg-[#D92F1B] p-7 sm:p-10 md:p-14">
              <div>
                <HeartHandshake
                  className="mb-6 h-14 w-14 text-white/90"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <p className="max-w-sm text-lg font-medium leading-7 text-white/90">
                  Equality, safety, dignity, and opportunity create a stronger
                  and more inclusive campus community.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* UN GOAL OVERVIEW */}
        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D92F1B]">
              UN goal overview
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Gender equality and empowerment
            </h2>
          </div>

          <div className="border-l-2 border-[#FF3A21]/50 pl-6 text-base leading-8 text-gray-700 dark:text-gray-300 md:pl-8">
            <p>
              Achieve gender equality and empower all women and girls. Higher
              education institutions can contribute by ensuring safe and
              non-discriminatory learning and work environments, equal access
              to education and leadership, and effective prevention and
              redressal of sexual harassment.
            </p>
          </div>
        </section>

        {/* IIIT PUNE COMMITMENT */}
        <section className="mt-12 rounded-2xl bg-gray-900 p-7 text-white dark:bg-black sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-300">
            IIIT Pune commitment
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-200">
            IIIT Pune fosters a safe, respectful, and gender-equitable campus
            through POSH compliance (ICC), safe hostel infrastructure, women’s
            participation in sports and academics, and targeted career support.
          </p>
        </section>

        {/* FOCUS AREAS */}
        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="border-t-4 border-[#FF3A21] bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800"
            >
              <Icon
                className="h-8 w-8 text-[#D92F1B]"
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
              className="h-7 w-7 text-[#D92F1B]"
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
                className="border-l-4 border-[#FF3A21] bg-white p-5 text-base leading-7 text-gray-700 shadow-sm dark:bg-surface-dark dark:text-gray-300"
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
              className="h-7 w-7 text-[#D92F1B]"
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

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#D92F1B] dark:text-orange-400">
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

          <div className="border-t-4 border-[#FF3A21] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ClipboardCheck
                className="h-7 w-7 text-[#D92F1B]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Evidence highlights
              </h2>
            </div>

            <ul className="mt-8 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {evidenceHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF3A21]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-4 border-[#FF3A21] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <Award
                className="h-7 w-7 text-[#D92F1B]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Outcomes
              </h2>
            </div>

            <ul className="mt-8 space-y-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF3A21]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </section>

        {/* FUTURE ROADMAP */}
        <section className="mt-14 overflow-hidden rounded-2xl bg-[#FF3A21] p-7 text-white sm:p-10">
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
              Equality, dignity, and opportunity for all
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              Safety, inclusion, equal participation, and empowerment are
              shared responsibilities across the IIIT Pune community.
            </p>
          </div>

          <a
            href="https://sdgs.un.org/goals/goal5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#D92F1B] transition-colors hover:text-[#FF3A21] dark:text-orange-400"
          >
            Learn about Goal 5
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>

      </main>
    </div>
  );
};

export default SdgFivePage;