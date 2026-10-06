import {
  ArrowUpRight,
  Boxes,
  ClipboardCheck,
  FileCheck2,
  Gavel,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";

const focusAreas = [
  {
    icon: FileCheck2,
    title: "Transparent Governance",
    text: "RTI/FAA mechanisms, website publication, public communication, and digital governance promote transparency and access to institutional information.",
  },
  {
    icon: Gavel,
    title: "Justice & Grievance Redressal",
    text: "SGRC, ICC, OBC Special Cell, and related mechanisms support fair grievance resolution, institutional accountability, and equitable access.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity & Institutional Trust",
    text: "CISO governance, CERT-In coordination, security audits, and role-based digital systems strengthen institutional resilience and regulatory compliance.",
  },
];

const higherEducationTargets = [
  "Access to information and protection of fundamental freedoms.",
  "Effective, accountable and transparent institutions.",
  "Equal access to justice and grievance redressal.",
];

const initiatives = [
  {
    title: "RTI – First Appellate Authority",
    office: "RTI–FAA",
    text: "Receiving and registering first appeals, examining PIO responses, reviewing records, hearing appellants, issuing reasoned orders, and ensuring statutory compliance.",
  },
  {
    title: "Student Grievance Redressal (SGRC)",
    office: "SGRC Chairperson",
    text: "Supports timely and fair resolution of student grievances across academic, administrative, and residential matters.",
  },
  {
    title: "ICC (POSH)",
    office: "ICC – Presiding Officer",
    text: "Prevention, prohibition, and redressal of sexual harassment through awareness sessions, SHe-Box promotion, monitoring, and reporting.",
  },
  {
    title: "OBC Special Cell",
    office: "OBC Special Cell",
    text: "Implementation of reservation and welfare provisions, awareness, grievance support, and record-keeping for equitable access.",
  },
  {
    title: "CISO & Cybersecurity Governance",
    office: "CISO; Deputy CISO",
    text: "Information security framework, CERT-In coordination, security audits, vulnerability assessments, and compliance with cybersecurity directions.",
  },
  {
    title: "Digital Governance (Samarth ERP)",
    office: "Samarth ERP Nodal Officer",
    text: "Institutional onboarding, module rollout, role-based access, training, grievance resolution, data integrity, adoption monitoring, and process transparency.",
  },
  {
    title: "Website & PRO",
    office: "Website Management; PRO/Social Media",
    text: "Transparent publication of policies, reports, and institutional data; accurate and timely communication; and SDG tagging of institutional activities.",
  },
  {
    title: "Vigilance",
    office: "Part-Time CVO",
    text: "Coordination of preventive vigilance and compliance with applicable rules.",
  },
];

const evidenceHighlights = [
  "RTI appeal logs (aggregate), order templates, and timelines.",
  "SGRC/ICC/OBC awareness sessions and grievances received/resolved (aggregate).",
  "CERT-In advisories acted upon, audit summaries, and ERP adoption reports.",
  "Website update logs, press notes, and SDG-tagged posts.",
];

const outcomes = [
  "Stronger trust in institutional processes and grievance mechanisms.",
  "Improved cybersecurity posture and regulatory compliance.",
  "Transparent, timely public communication and data availability.",
];

const futureRoadmap = [
  "Publish an annual governance dashboard covering RTI, SGRC, ICC, and ERP metrics.",
  "Conduct periodic cybersecurity drills and data-protection training.",
];

const SdgSixteenPage = () => {
  return (
    <div className="min-h-screen pb-16 transition-colors duration-200">
      <PageHeader
        title="Sustainable Development Goal 16"
        subtitle="Promote peaceful and inclusive societies, provide access to justice and build effective, accountable and inclusive institutions"
      />

      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14 lg:px-8">

        <section className="overflow-hidden rounded-2xl bg-[#00689D] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

            <div className="p-7 sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-7xl font-black leading-none tracking-tight md:text-8xl">
                  16
                </span>

                <span className="h-16 w-px bg-white/40" />

                <span className="max-w-[12rem] text-sm font-semibold uppercase leading-5 tracking-[0.16em] text-white/90">
                  Peace, justice and strong institutions
                </span>
              </div>

              <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
                Transparent governance, fair grievance mechanisms, and secure
                digital systems strengthen institutional trust.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">
                IIIT Pune strengthens transparent, accountable, and inclusive
                governance through statutory compliance, grievance redressal,
                cybersecurity, digital governance, and public communication.
              </p>
            </div>

            <div className="flex min-h-64 items-end bg-[#005B87] p-7 sm:p-10 md:p-14">
              <div>
                <ShieldCheck
                  className="mb-6 h-14 w-14 text-white/90"
                  strokeWidth={1.5}
                />

                <p className="max-w-sm text-lg font-medium leading-7 text-white/90">
                  Fair processes, access to information, secure systems, and
                  accountable governance create a trusted institution.
                </p>
              </div>
            </div>

          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#005B87]">
              UN goal overview
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Peace, justice and strong institutions
            </h2>
          </div>

          <div className="border-l-2 border-[#00689D]/50 pl-6 text-base leading-8 text-gray-700 dark:text-gray-300 md:pl-8">
            <p>
              Promote peaceful and inclusive societies, provide access to
              justice, and build effective, accountable, and inclusive
              institutions.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-2xl bg-gray-900 p-7 text-white dark:bg-black sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">
            IIIT Pune commitment
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-200">
            IIIT Pune strengthens transparent, accountable, and inclusive
            governance through statutory compliance (RTI/FAA), grievance
            redressal (SGRC/ICC/OBC), cybersecurity (CISO/CERT-In), digital
            governance (Samarth ERP), and public communication (Website/PRO).
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="border-t-4 border-[#00689D] bg-white p-6 shadow-sm ring-1 ring-gray-200/80 dark:bg-surface-dark dark:ring-gray-800"
            >
              <Icon className="h-8 w-8 text-[#005B87]" strokeWidth={1.8} />

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
            <ClipboardCheck className="h-7 w-7 text-[#005B87]" />

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Relevant targets for higher education
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {higherEducationTargets.map((target) => (
              <div
                key={target}
                className="border-l-4 border-[#00689D] bg-white p-5 text-base leading-7 text-gray-700 shadow-sm dark:bg-surface-dark dark:text-gray-300"
              >
                {target}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <Boxes className="h-7 w-7 text-[#005B87]" />

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

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#005B87] dark:text-sky-400">
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
          <div className="border-t-4 border-[#00689D] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-7 w-7 text-[#005B87]" />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Evidence highlights
              </h2>
            </div>

            <ul className="mt-8 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {evidenceHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00689D]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-4 border-[#00689D] bg-white p-7 shadow-sm dark:bg-surface-dark">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-7 w-7 text-[#005B87]" />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Outcomes
              </h2>
            </div>

            <ul className="mt-8 space-y-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00689D]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-14 overflow-hidden rounded-2xl bg-[#00689D] p-7 text-white sm:p-10">
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
              Trust, justice and accountable governance
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              Transparency, grievance redressal, cybersecurity, and public
              communication strengthen institutional trust.
            </p>
          </div>

          <a
            href="https://sdgs.un.org/goals/goal16"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#005B87] transition-colors hover:text-[#00689D] dark:text-sky-400"
          >
            Learn about Goal 16
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>

      </main>
    </div>
  );
};

export default SdgSixteenPage;
