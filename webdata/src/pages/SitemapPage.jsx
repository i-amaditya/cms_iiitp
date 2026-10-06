import React from 'react';
import { Link } from 'react-router';
import PageHeader from '../components/shared/PageHeader';

const SitemapPage = () => {
  const sitemapData = [
    {
      title: "Home",
      links: [
        { label: "Home", path: "/" },
      ]
    },
    {
      title: "About",
      links: [
        { label: "Overview", path: "/about/overview" },
        { label: "Director's Desk", path: "/about/director-desk" },
        { label: "Vision & Mission", path: "/about/vision-mission" },
        { label: "Student Achievements", path: "/about/student-achievements" },
        { label: "Faculty Achievements", path: "/about/faculty-achievements" },
      ]
    },
    {
      title: "Admissions",
      links: [
        { label: "Admissions Info", path: "/admissions" },
      ]
    },
    {
      title: "Administration",
      links: [
        { label: "Administration Overview", path: "/administration" },
        { label: "Chairperson", path: "/administration/chairperson" },
        { label: "Director", path: "/administration/director" },
        { label: "Registrar", path: "/administration/registrar" },
        { label: "Board of Governors", path: "/administration/board-of-governors" },
        { label: "Finance Committee", path: "/administration/finance-committee" },
        { label: "Building & Works Committee", path: "/administration/building-and-works-committee" },
        { label: "Senate", path: "/administration/senate" },
        { label: "Board of Studies", path: "/administration/board-of-studies" },
        { label: "Chief Vigilance Officer", path: "/administration/chief-vigilance-officer" },
        { label: "Associate Deans", path: "/administration/associate-deans" },
      ]
    },
    {
      title: "Academics",
      links: [
        { label: "Academic Calendar", path: "/academics/calendar" },
        { label: "Examination Section", path: "/academics/examination-section" },
        { label: "UG & PG Schemes", path: "/academics/ug-pg-schemes" },
        { label: "UG Programs", path: "/academics/ug-programs" },
        { label: "PG Programs", path: "/academics/pg-programs" },
        { label: "PhD Programs", path: "/academics/phd-programs" },
      ]
    },
    {
      title: "Departments",
      links: [
        { label: "Computer Science and Engineering", path: "/departments/cse" },
        { label: "Electronics and Communication Engineering", path: "/departments/ece" },
        { label: "Applied Sciences and Humanities", path: "/departments/ash" },
      ]
    },
    {
      title: "Research",
      links: [
        { label: "Research Overview", path: "/research" },
        { label: "Centres", path: "/research/centres" },
        { label: "Internships", path: "/research/internships" },
        { label: "Funded Projects (Completed)", path: "/research/funded-projects/completed" },
        { label: "Funded Projects (Ongoing)", path: "/research/funded-projects/ongoing" },
        { label: "Events", path: "/research/events" },
        { label: "MoUs", path: "/research/mous" },
        { label: "Patents", path: "/research/patents" },
        { label: "Publications", path: "/research/publications" },
        { label: "Post Doc Fellow", path: "/research/postdoc-fellow" },
      ]
    },
    {
      title: "People",
      links: [
        { label: "People Overview", path: "/people" },
        { label: "Faculty", path: "/people/faculty" },
        { label: "Visiting Faculty", path: "/people/visiting-faculty" },
        { label: "Non-Teaching Staff", path: "/people/non-teaching-staff/regular" },
        { label: "Alumni", path: "/alumni" },
        { label: "Alumni About", path: "/alumni/about" },
        { label: "Alumni Events", path: "/alumni/events" },
        { label: "Alumni Network", path: "/alumni/network" },
        { label: "Alumni Get Involved", path: "/alumni/get-involved" },
        { label: "Alumni Resources", path: "/alumni/resources" },
        { label: "Alumni Contact", path: "/alumni/contact" },
      ]
    },
    {
      title: "Student Life",
      links: [
        { label: "Life Overview", path: "/life" },
        { label: "Clubs", path: "/life/clubs" },
        { label: "Activities", path: "/life/activities" },
        { label: "Gallery", path: "/life/gallery" },
        { label: "Events", path: "/life/events" },
        { label: "Magazine", path: "/life/magazine" },
        { label: "Newsletter", path: "/life/newsletter" },
        { label: "Press", path: "/life/press" },
        { label: "Campus", path: "/life/campus" },
      ]
    },
    {
      title: "Notices & News",
      links: [
        { label: "News", path: "/news" },
        { label: "Notices", path: "/notice" },
        { label: "Anti-Ragging", path: "/notice/anti-ragging" },
      ]
    },
    {
      title: "Other Links",
      links: [
        { label: "Careers", path: "/careers" },
        { label: "E-Tender", path: "/e-tender/live" },
        { label: "Placement", path: "/placement" },
        { label: "Contact Us", path: "/contact" },
        { label: "NIRF", path: "/nirf" },
        { label: "Suo Motu Disclosure", path: "/suo-motu" },
        { label: "RTI", path: "/rti" },
        { label: "Rajbhasha", path: "/rajbhasha" },
        { label: "Fees", path: "/fees" },
        { label: "Internal Complaints Committee (ICC)", path: "/icc" },
        { label: "Equal Opportunity Cell (EOC)", path: "/equal-opportunity-cell" },
        { label: "Student Grievance Redressal Committee (SGRC)", path: "/sgrc" },
        { label: "Reports and Minutes", path: "/reports-and-minutes" },
        { label: "Scholarships", path: "/scholarships" },
        { label: "IEEE", path: "/ieee" },
        { label: "ACM", path: "/acm" },
      ]
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-200 bg-white dark:bg-bg-dark">
      <PageHeader title="Sitemap" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapData.map((section, index) => (
            <div key={index} className="bg-gray-50 dark:bg-surface-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <h2 className="text-xl font-bold font-serif text-[#164e63] dark:text-blue-400 mb-4 border-b-2 border-brand-red pb-2 inline-block">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.path} className="text-gray-600 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red mr-2"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
