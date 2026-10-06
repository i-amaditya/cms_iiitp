import {
  ArrowUpRight,
  Boxes,
  ClipboardCheck,
  HeartPulse,
  Lightbulb,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const focusAreas = [
  {
    icon: Trophy,
    title: "Sports & Fitness",
    text: "Sports, fitness activities, and the annual Eklavya Sports Day encourage physical activity, teamwork, discipline, and healthy lifestyles.",
  },
  {
    icon: HeartPulse,
    title: "Mental Health & Counselling",
    text: "Professional counselling services provide confidential support for academic, personal, emotional, and behavioural concerns.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Healthy Campus",
    text: "Hostel health and safety measures, hygiene, sanitation, safe drinking water, CCTV, fire safety, and emergency preparedness support student well-being.",
  },
];

const higherEducationTargets = [
  "Safe, healthy campus environment; basic health services and emergency preparedness.",
  "Mental health support and counselling.",
  "Prevention of substance abuse; promotion of fitness.",
];

const initiatives = [
  {
    title: "Sports & Fitness",
    office: "Sports Committee",
    text: "Annual Eklavya Sports Day includes team sports, indoor games, and athletics with approximately 450 participants. Medals and recognition promote fitness, participation, and teamwork.",
  },
  {
    title: "Counselling Services",
    office: "Student Counselling Faculty In-charge",
    text: "On-demand professional counselling is available for academic, personal, emotional, and behavioural concerns through confidential appointments and follow-ups.",
  },
  {
    title: "Hostel Health & Safety",
    office: "Chief Warden; Hostel Wardens",
    text: "First-aid readiness, hygiene, sanitation, safe drinking water, night inspections, CCTV, and fire safety measures help maintain a safe residential environment.",
  },
  {
    title: "NMBA (Nasha Mukt Bharat Abhiyan)",
    office: "NMBA Nodal Officer",
    text: "Awareness lectures, pledge campaigns, Nukkad Natak, slogan competitions, walkathons/marathons, and hostel checks discourage substance use and promote healthy lifestyles.",
  },
  {
    title: "Inclusive Well-being",
    office: "ICC; OBC Cell",
    text: "ICC and OBC Cell efforts contribute to safe, respectful, and inclusive environments that support the mental well-being of students.",
  },
];

const evidenceHighlights = [
  "Sports participation numbers, event photos, and winners’ lists.",
  "Counselling appointment logs (aggregate, confidential) and feedback trends.",
  "NMBA campaign records, pledge counts, and event reports.",
  "Hostel safety inspections and incident logs (aggregate).",
];

const outcomes = [
  "Higher physical activity levels and sports participation.",
  "Improved access to mental health support and reduced stigma.",
  "Safer residential environment and reduced substance use risks.",
];

const futureRoadmap = [
  "Expand fitness challenges and intramural leagues.",
  "Conduct periodic mental health awareness weeks and peer-support initiatives.",
  "Strengthen emergency response drills in hostels and academic blocks.",
];

const SdgThreePage = () => {
  return (
    <div className="min-h-screen pb-16 transition-colors duration-200">
      <PageHeader
        title="Sustainable Development Goal 3"
        subtitle="Ensure healthy lives and promote well-being for all at all ages"
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8">

        {/* HERO */}
        <section className="overflow-hidden rounded-2xl bg-[#4C9F38] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

            <div className="p-7 sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-7xl font-black leading-none tracking-tight md:text-8xl">
                  03
                </span>

                <span
                  className="h-16 w-px bg-white/40"
                  aria-hidden="true"
                />

                <span className="max-w-[12rem] text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
                  Good health and well-being
                </span>
              </div>

              <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
                Healthy lives, mental well-being, fitness, and a safe campus
                environment are essential to student success.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">
                IIIT Pune promotes physical and mental well-being through
                sports, counselling, safe hostels, anti-substance abuse
                campaigns, and access to basic health support.
              </p>
            </div>

            <div className="flex min-h-64 items-end bg-[#3B832C] p-7 sm:p-10 md:p-14">
                <div>
                    <HeartPulse
                    className="mb-6 h-14 w-14 text-white/90"
                    strokeWidth={1.5}
                    aria-hidden="true"
                    />

                    <p className="max-w-sm text-lg font-medium leading-7 text-white/90">
                    A healthy and supportive campus helps learners thrive,
                    participate, and build a stronger future.
                    </p>
                </div>
            </div>

          </div>
        </section>

        {/* UN GOAL OVERVIEW */}
        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#3B832C]">
              UN goal overview
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Good health and well-being for all
            </h2>
          </div>

          <div className="border-l-2 border-[#4C9F38]/50 pl-6 text-base leading-8 text-gray-700 dark:text-gray-300 md:pl-8">
            <p>
              Ensure healthy lives and promote well-being for all at all ages.
              Higher education institutions can contribute by providing safe
              and healthy campus environments, supporting mental health,
              encouraging physical activity, and preparing students and staff
              to respond to health and safety risks.
            </p>
          </div>
        </section>

        {/* IIIT PUNE COMMITMENT */}
        <section className="mt-12 rounded-2xl bg-gray-900 p-7 text-white dark:bg-black sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-300">
            IIIT Pune commitment
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-200">
            IIIT Pune promotes physical and mental well-being through sports,
            counselling, safe hostels, anti-substance abuse campaigns, and
            access to basic health support. These initiatives contribute to a
            safe, respectful, healthy, and inclusive campus environment.
          </p>
        </section>

        {/* FOCUS AREAS */}
        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="border-t-4 border-[#4C9F38] bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800"
            >
              <Icon
                className="h-8 w-8 text-[#3B832C]"
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
              className="h-7 w-7 text-[#3B832C]"
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
                className="border-l-4 border-[#4C9F38] bg-white p-5 text-base leading-7 text-gray-700 shadow-sm dark:bg-surface-dark dark:text-gray-300"
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
              className="h-7 w-7 text-[#3B832C]"
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

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#3B832C] dark:text-green-400">
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

          <div className="border-t-4 border-[#4C9F38] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ClipboardCheck
                className="h-7 w-7 text-[#3B832C]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Evidence highlights
              </h2>
            </div>

            <ul className="mt-8 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {evidenceHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4C9F38]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-4 border-[#4C9F38] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <HeartPulse
                className="h-7 w-7 text-[#3B832C]"
                aria-hidden="true"
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Outcomes
              </h2>
            </div>

            <ul className="mt-8 space-y-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4C9F38]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </section>

        {/* FUTURE ROADMAP */}
        <section className="mt-14 overflow-hidden rounded-2xl bg-[#4C9F38] p-7 text-white sm:p-10">
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
              A healthier campus, a stronger future
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              Physical fitness, mental health, safety, and inclusion are shared
              responsibilities across the IIIT Pune community.
            </p>
          </div>

          <a
            href="https://sdgs.un.org/goals/goal3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#3B832C] transition-colors hover:text-[#4C9F38] dark:text-green-400"
          >
            Learn about Goal 3
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>

      </main>
    </div>
  );
};

export default SdgThreePage;