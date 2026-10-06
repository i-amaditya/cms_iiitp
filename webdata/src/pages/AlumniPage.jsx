import PageHeader from '../components/shared/PageHeader';

const AlumniPage = () => {
  const navTabs = [
    'Overview',
    'Alumni Directory',
    'Events',
    'Network',
    'Get Involved',
    'Resources',
    'Contact',
  ];

  const overviewLinks = [
    'About Us',
    'Alumni Highlights',
    'Latest News',
    'Engage',
    'Volunteer',
    'Share Achievements',
    'Share Opportunities',
    'Mentor',
  ];

  const quickLinks = [
    { label: 'IIIT Pune Website', url: 'https://iiitp.ac.in' },
    { label: 'Placement Cell', url: 'https://placement.iiitp.ac.in' },
    { label: 'Career Services', url: 'https://iiitp.ac.in/careers' },
    { label: 'Student Portal', url: 'https://iiitp.ac.in/student-portal' },
  ];

  const events = [
    {
      title: 'First-Ever Alumni Interaction: Pune Chapter',
      date: '06 June 2026',
      status: 'COMPLETED',
      description:
        'IIIT Pune successfully hosted its first-ever Alumni Interaction: Pune Chapter on 06 June 2026, bringing together alumni from the 2020–2025 graduating batches to reconnect, network, and celebrate their shared journey.',
      cta: 'View Highlights',
      href: '#',
    },
    {
      title: 'Upcoming Chapter: 2nd Alumni Interaction – Bangalore Chapter',
      date: '05 September 2026',
      status: 'UPCOMING',
      description:
        'Building on the success of the inaugural Pune Chapter, IIIT Pune is delighted to host the 2nd Alumni Interaction – Bangalore Chapter on 05 September 2026. Join us for networking, knowledge sharing, and meaningful connections.',
      cta: 'Know More',
      href: '#',
    },
  ];

  const highlightCards = [
    { value: '450+', label: 'Registered Alumni & Counting' },
    { value: 'Many', label: 'Pursuing higher education at IIT, IIM, IISc & more' },
    { value: 'Many', label: 'In Government Jobs (Public Banks, Police, Indian Navy, etc.)' },
    { value: 'Several', label: 'Building their own Start-ups' },
    { value: 'Many', label: 'Associated with top companies like Google, Microsoft, JP Morgan, Amazon & more' },
  ];

  const engagementCards = [
    {
      title: 'Engage',
      description:
        'Participate in alumni events, networking initiatives, and Institute activities. Strengthen lifelong relationships while contributing to the growth of the alumni community.',
    },
    {
      title: 'Volunteer',
      description:
        'Support the Institute by contributing your time, expertise, and experience to alumni programmes, student initiatives, and institutional activities.',
    },
    {
      title: 'Share Achievements',
      description:
        'Celebrate your professional and personal milestones with the IIIT Pune community. Your achievements inspire current students and fellow alumni.',
    },
    {
      title: 'Share Opportunities',
      description:
        'Help fellow alumni and students grow by sharing job openings, internships, research positions, and entrepreneurial opportunities.',
    },
    {
      title: 'Mentor',
      description:
        'Guide the next generation of IIIT Pune students by sharing your knowledge, industry insights, and career experiences.',
    },
  ];

  const contacts = [
    {
      name: 'Kedar Bhogshetti',
      title: 'Training And Placement Officer',
      phone: '+91 93264 79440',
      email: 'alumniassociation@iiitp.ac.in',
    },
    {
      name: 'Dr. Kaptan Singh',
      title: 'Faculty Incharge',
      phone: '+91 98265 24212',
      email: 'kaptansingh@iiitp.ac.in',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 px-4 py-4">
          <div className="inline-flex gap-3">
            {navTabs.map((tab) => (
              <a
                key={tab}
                href="#overview"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span className="h-4 w-4 rounded-full bg-primary"></span>
                {tab}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-8">
          <aside className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 mb-4">
                Alumni Overview
              </h3>
              <div className="space-y-2">
                {overviewLinks.map((link) => (
                  <a
                    key={link}
                    href="#overview"
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 mb-4">
                Quick Links
              </h3>
              <div className="space-y-3">
                {quickLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-primary/20 bg-primary/5 p-6 shadow-sm dark:border-primary/30 dark:bg-primary/10">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Be a Part of IIIT Pune Legacy</p>
                <p className="text-sm text-slate-700 dark:text-slate-200">
                  Reconnect. Contribute. Inspire.
                </p>
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  Join Alumni Network
                </a>
              </div>
            </section>
          </aside>

          <main className="space-y-10">
            <section id="overview" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="grid gap-8 lg:grid-cols-[1.4fr_0.85fr]">
                <div className="space-y-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-primary">About Us</p>
                  <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                    The IIIT Pune Alumni community is a lifelong network of graduates who continue to contribute to academia, industry, entrepreneurship, and society.
                  </h2>
                  <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-7">
                    <p>
                      As ambassadors of the Institute, our alumni strengthen the IIIT Pune legacy through their professional achievements, mentorship, collaborations, and continued engagement with the Institute.
                    </p>
                    <p>
                      The Alumni Association fosters meaningful connections between graduates, students, and faculty, creating opportunities for networking, knowledge sharing, and giving back to the IIIT Pune community.
                    </p>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
                  <div className="space-y-4">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Engage</p>
                    <p className="text-slate-700 dark:text-slate-200">
                      Keep in touch with alumni initiatives, upcoming events, and opportunities to collaborate with the IIIT Pune community.
                    </p>
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                    >
                      Contact Alumni Team
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-primary">Events</p>
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Recent and Upcoming Alumni Events</h3>
                </div>
                <a href="#" className="text-sm font-semibold text-primary hover:underline">View All Events →</a>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {events.map((event) => (
                  <article key={event.title} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="h-44 bg-slate-200 dark:bg-slate-800"></div>
                    <div className="p-6 space-y-4">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{event.status}</span>
                        <span>{event.date}</span>
                      </div>
                      <h4 className="text-xl font-semibold text-slate-900 dark:text-white">{event.title}</h4>
                      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{event.description}</p>
                      <a
                        href={event.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                      >
                        {event.cta}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <p className="text-sm uppercase tracking-[0.24em] text-primary">Alumni Highlights</p>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {highlightCards.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-3xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <p className="text-sm uppercase tracking-[0.24em] text-primary">Engage with IIIT Pune</p>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {engagementCards.map((card) => (
                  <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">{card.title}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{card.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="contact" className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-primary">Contact Us</p>
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">We'd love to hear from you</h3>
                </div>
                <a href="mailto:alumniassociation@iiitp.ac.in" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark">
                  Contact Us
                </a>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {contacts.map((person) => (
                  <div key={person.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{person.title}</p>
                    <h4 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{person.name}</h4>
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Phone: <a href={`tel:${person.phone.replace(/\s+/g, '')}`} className="text-primary">{person.phone}</a></p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Email: <a href={`mailto:${person.email}`} className="text-primary">{person.email}</a></p>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AlumniPage;
