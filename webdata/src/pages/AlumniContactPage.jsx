import React from 'react';
import { Link } from 'react-router';
import PageHeader from '../components/shared/PageHeader';

const AlumniContactPage = () => {
  const contacts = [
    {
      name: 'Kedar Bhogshetti',
      title: 'Training And Placement Officer',
      phone: '+91 9326479440',
      email: 'placements@iiitp.ac.in',
      image: '/assets/nonteachingstaff_photos/kedarbhogshetti.jpg',
    },
    {
      name: 'Dr. Kaptan Singh',
      title: 'Faculty Incharge',
      phone: '+91 98265 24212',
      email: 'kaptansingh@iiitp.ac.in',
      image: '/assets/faculty_photos/kaptansingh.jpg',
      profileLink: '/people/faculty/kaptan-singh',
    },
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader
        title="Contact the Alumni Office"
        subtitle="Reach out to the IIIT Pune alumni office for queries, engagement, and collaboration."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-8 md:p-12 alumni-page">
          <section className="space-y-8">
            <div className="about-block">
              <h2 className="section-headline">Contact Details</h2>
              <p className="leading-7 text-gray-700 dark:text-gray-300 mb-6">
                For alumni relations, event partnerships, mentorship, and career support, please contact the alumni office.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                {contacts.map((person) => (
                  <div key={person.name} className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-slate-900 p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="h-20 w-20 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                        loading="lazy"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{person.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{person.title}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Phone: <a href={`tel:${person.phone.replace(/\s+/g, '')}`} className="text-primary">{person.phone}</a></p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Email: <a href={`mailto:${person.email}`} className="text-primary">{person.email}</a></p>
                    {person.profileLink && (
                      <Link
                        to={person.profileLink}
                        className="mt-4 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
                      >
                        View Profile
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AlumniContactPage;
