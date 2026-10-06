import { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router";
import ScrollToTop from "./components/shared/ScrollToTop";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoadingFallback from "./components/shared/LoadingFallback";

import GlobalLoader from "./components/common/GlobalLoader";

// International sub-layout components
import InternationalHeader from "./components/layout/InternationalHeader";
import InternationalFooter from "./components/layout/InternationalFooter";
import AlumniLayout from "./components/layout/AlumniLayout";

// Pages (Lazy Loaded for performance)
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const DirectorDeskPage = lazy(() => import("./pages/DirectorDeskPage"));
const DirectorPage = lazy(() => import("./pages/DirectorPage"));
const VisionMissionPage = lazy(() => import("./pages/VisionMissionPage"));
const AboutPlaceholderPage = lazy(() => import("./pages/AboutPlaceholderPage"));
const AdministrationPage = lazy(() => import("./pages/AdministrationPage"));
const ChairpersonPage = lazy(() => import("./pages/ChairpersonPage"));
const RegistrarPage = lazy(() => import("./pages/RegistrarPage"));
const BoardOfGovernorsPage = lazy(() => import("./pages/BoardOfGovernorsPage"));
const FinanceCommitteePage = lazy(() => import("./pages/FinanceCommitteePage"));
const BuildingWorksCommitteePage = lazy(
  () => import("./pages/BuildingWorksCommitteePage"),
);
const SenatePage = lazy(() => import("./pages/SenatePage"));
const SgrcPage = lazy(() => import("./pages/SgrcPage"));
const BoardOfStudiesPage = lazy(() => import("./pages/BoardOfStudiesPage"));
const ChiefVigilanceOfficerPage = lazy(() => import("./pages/ChiefVigilanceOfficerPage"));
const AssociateDeansPage = lazy(() => import("./pages/AssociateDeansPage"));
const MousPage = lazy(() => import("./pages/MousPage"));
const PatentsPage = lazy(() => import("./pages/PatentsPage"));
const PublicationsPage = lazy(() => import("./pages/PublicationsPage"));
const BtechCsePage = lazy(() => import("./pages/BtechCsePage"));
const UgPgSchemesPage = lazy(() => import("./pages/UgPgSchemesPage"));
const UgProgramsPage = lazy(() => import("./pages/UgProgramsPage"));
const PgProgramsPage = lazy(() => import("./pages/PgProgramsPage"));
const PhdProgramsPage = lazy(() => import("./pages/PhdProgramsPage"));
const ExaminationSectionPage = lazy(() => import("./pages/ExaminationSectionPage"));
const BtechEcePage = lazy(() => import("./pages/BtechEcePage"));
const BtechAiDsPage = lazy(() => import("./pages/BtechAiDsPage"));
const BtechCybersecurityPage = lazy(
  () => import("./pages/BtechCybersecurityPage"),
);
const BtechVlsiPage = lazy(() => import("./pages/BtechVlsiPage"));
const BtechHonorsPage = lazy(() => import("./pages/BtechHonorsPage"));
const MtechCsePage = lazy(() => import("./pages/MtechCsePage"));
const MtechEcePage = lazy(() => import("./pages/MtechEcePage"));
const PhdPage = lazy(() => import("./pages/PhdPage"));
const AcademicCalendarPage = lazy(() => import("./pages/AcademicCalendarPage"));
const TimetablePage = lazy(() => import("./pages/TimetablePage"));
const CentresPage = lazy(() => import("./pages/CentresPage"));
const InternshipsPage = lazy(() => import("./pages/InternshipsPage"));
const FundedProjectsCompletedPage = lazy(
  () => import("./pages/FundedProjectsCompletedPage"),
);
const FundedProjectsOngoingPage = lazy(
  () => import("./pages/FundedProjectsOngoingPage"),
);
const EventsPage = lazy(() => import("./pages/EventsPage"));
const PostDocFellowPage = lazy(() => import("./pages/PostDocFellowPage"));
const ResearchScholarInstitutePage = lazy(
  () => import("./pages/ResearchScholarInstitutePage"),
);
const ResearchScholarVisvesvarayaPage = lazy(
  () => import("./pages/ResearchScholarVisvesvarayaPage"),
);
const ResearchScholarGraduatedPage = lazy(
  () => import("./pages/ResearchScholarGraduatedPage"),
);
const ResearchPage = lazy(() => import("./pages/ResearchPage"));
const PeoplePage = lazy(() => import("./pages/PeoplePage"));
const FacultyPage = lazy(() => import("./pages/FacultyPage"));
const FacultyProfilePage = lazy(() => import("./pages/FacultyProfilePage"));
const VisitingFacultyPage = lazy(() => import("./pages/VisitingFacultyPage"));
const NonTeachingStaffPage = lazy(() => import("./pages/NonTeachingStaffPage"));
const AlumniHomePage = lazy(() => import("./pages/AlumniHomePage"));
const AlumniAboutPage = lazy(() => import("./pages/AlumniAboutPage"));
const AlumniEventsPage = lazy(() => import("./pages/AlumniEventsPage"));
const AlumniNetworkPage = lazy(() => import("./pages/AlumniNetworkPage"));
const AlumniHallOfFamePage = lazy(() => import("./pages/AlumniHallOfFamePage"));
const AlumniGetInvolvedPage = lazy(() => import("./pages/AlumniGetInvolvedPage"));
const AlumniResourcesPage = lazy(() => import("./pages/AlumniResourcesPage"));
const AlumniContactPage = lazy(() => import("./pages/AlumniContactPage"));
const LifeOverviewPage = lazy(() => import("./pages/LifeOverviewPage"));
const LifeClubsPage = lazy(() => import("./pages/LifeClubsPage"));
const LifeActivitiesPage = lazy(() => import("./pages/LifeActivitiesPage"));
const LifeGalleryPage = lazy(() => import("./pages/LifeGalleryPage"));
const LifeEventsPage = lazy(() => import("./pages/LifeEventsPage"));
const LifeMagazinePage = lazy(() => import("./pages/LifeMagazinePage"));
const LifeNewsletterPage = lazy(() => import("./pages/LifeNewsletterPage"));
const LifePressPage = lazy(() => import("./pages/LifePressPage"));
const LifeCampusPage = lazy(() => import("./pages/LifeCampusPage"));
const NoticePage = lazy(() => import("./pages/NoticePage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const AntiRaggingPage = lazy(() => import("./pages/AntiRaggingPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const ShortlistingsPage = lazy(() => import("./pages/ShortlistingsPage"));
const ETenderPage = lazy(() => import("./pages/ETenderPage"));
const PlacementPage = lazy(() => import("./pages/PlacementPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NIRFPage = lazy(() => import("./pages/NIRFPage"));
const SuoMotuPage = lazy(() => import("./pages/SuoMotuPage"));
const RTIPage = lazy(() => import("./pages/RTIPage"));
const ReservationPolicyPage = lazy(() => import("./pages/ReservationPolicyPage"));
const RajbhashaPage = lazy(() => import("./pages/RajbhashaPage"));
const RajbhashaDetailPage = lazy(() => import("./pages/RajbhashaDetailPage"));
const RajbhashaGalleryPage = lazy(() => import("./pages/RajbhashaGalleryPage"));
const RajbhashaBaithakPage = lazy(() => import("./pages/RajbhashaBaithakPage"));
const RajbhashaNitiPage = lazy(() => import("./pages/RajbhashaNitiPage"));
const RajbhashaLinksPage = lazy(() => import("./pages/RajbhashaLinksPage"));
const FeesPage = lazy(() => import("./pages/FeesPage"));
const ICCPage = lazy(() => import("./pages/ICCPage"));
const EqualOpportunityCellPage = lazy(() => import("./pages/EqualOpportunityCellPage"));
const MinutesPage = lazy(() => import("./pages/ReportsAndMinutes"));
const ScholarshipPage = lazy(() => import("./pages/ScholarshipPage"));
const IEEEPage = lazy(() => import("./pages/IEEEPage"));
const ACMPage = lazy(() => import("./pages/ACMPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));
const SdgOnePage = lazy(() => import("./pages/SdgOnePage"));
const SdgTwoPage = lazy(() => import("./pages/SdgTwoPage"));
const SdgThreePage = lazy(() => import("./pages/SdgThreePage"));
const SdgFourPage = lazy(() => import("./pages/SdgFourPage"));
const SdgFivePage = lazy(() => import("./pages/SdgFivePage"));
const SdgSixPage = lazy(() => import("./pages/SdgSixPage"));
const SdgSevenPage = lazy(() => import("./pages/SdgSevenPage"));
const SdgEightPage = lazy(() => import("./pages/SdgEightPage"));
const SdgNinePage = lazy(() => import("./pages/SdgNinePage"));
const SdgTenPage = lazy(() => import("./pages/SdgTenPage"));
const SdgElevenPage = lazy(() => import("./pages/SdgElevenPage"));
const SdgTwelvePage = lazy(() => import("./pages/SdgTwelevPage"));
const SdgThirteenPage = lazy(() => import("./pages/SdgThirteenPage"));
const SdgFourteenPage = lazy(() => import("./pages/SdgForteenPage"));
const SdgFifteenPage = lazy(() => import("./pages/SdgFifteenPage"));
const SdgSixteenPage = lazy(() => import("./pages/SdgSixteenPage"));
const SdgSeventeenPage = lazy(() => import("./pages/SdgSeventeenPage"));

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const StudentAchievementsPage = lazy(
  () => import("./pages/StudentAchievementsPage"),
);
const FacultyAchievementsPage = lazy(
  () => import("./pages/FacultyAchievementsPage"),
);
const AdmissionsPage = lazy(() => import("./pages/AdmissionsPage"));
const CseDepartmentPage = lazy(() => import("./pages/CseDepartmentPage"));
const EceDepartmentPage = lazy(() => import("./pages/EceDepartmentPage"));
const AshDepartmentPage = lazy(() => import("./pages/AshDepartmentPage"));

const InternationalHomePage = lazy(
  () => import("./pages/InternationalHomePage"),
);
const InternationalAboutPage = lazy(
  () => import("./pages/InternationalAboutPage"),
);
const InternationalAcademicsPage = lazy(
  () => import("./pages/InternationalAcademicsPage"),
);
const InternationalCollaborationsPage = lazy(
  () => import("./pages/InternationalCollaborationsPage"),
);
const InternationalContactPage = lazy(
  () => import("./pages/InternationalContactPage"),
);
const HRSummitPage = lazy(() => import("./pages/HRSummit"));

const CourseAdmissionRedirect = () => {
  useEffect(() => {
    window.location.replace(
      "/documents/Visvesvaraya_PhD_PostDoc_Brochure_Oct_2026_IIIT_Pune.pdf",
    );
  }, []);

  return <LoadingFallback />;
};

function AppContent() {
  const location = useLocation();
  const isInternational = location.pathname.startsWith("/international");
  const isAlumni = location.pathname.startsWith("/alumni");

  if (isInternational) {
    return (
      <div className="w-full min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100 bg-slate-200 dark:bg-bg-dark bg-grid-pattern transition-colors duration-200">
        <InternationalHeader />
        <main className="flex-grow w-full overflow-x-clip flex flex-col">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* International Relations Routes */}
              <Route
                path="/international"
                element={<InternationalHomePage />}
              />
              <Route
                path="/international/about"
                element={<InternationalAboutPage />}
              />
              <Route
                path="/international/academics"
                element={<InternationalAcademicsPage />}
              />
              <Route
                path="/international/collaborations"
                element={<InternationalCollaborationsPage />}
              />
              <Route
                path="/international/contact"
                element={<InternationalContactPage />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <InternationalFooter />
      </div>
    );
  }

  if (isAlumni) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<AlumniLayout />}>
            <Route path="/alumni" element={<AlumniHomePage />} />
            <Route path="/alumni/about" element={<AlumniAboutPage />} />
            <Route path="/alumni/events" element={<AlumniEventsPage />} />
            <Route path="/alumni/network" element={<AlumniNetworkPage />} />
            <Route path="/alumni/hall-of-fame" element={<AlumniHallOfFamePage />} />
            <Route path="/alumni/get-involved" element={<AlumniGetInvolvedPage />} />
            <Route path="/alumni/resources" element={<AlumniResourcesPage />} />
            <Route path="/alumni/contact" element={<AlumniContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100 bg-slate-200 dark:bg-bg-dark bg-grid-pattern transition-colors duration-200">
      <Navbar />
      <main className="flex-grow w-full overflow-x-clip flex flex-col">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Home */}
            <Route path="/" element={<HomePage />} />

            {/* Admissions */}
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route
              path="/course-admission"
              element={<CourseAdmissionRedirect />}
            />

            {/* About */}
            <Route
              path="/about"
              element={<Navigate to="/about/overview" replace />}
            />
            <Route path="/about/director-desk" element={<DirectorDeskPage />} />
            <Route
              path="/about/vision-mission"
              element={<VisionMissionPage />}
            />
            <Route
              path="/about/student-achievements"
              element={<StudentAchievementsPage />}
            />
            <Route
              path="/about/faculty-achievements"
              element={<FacultyAchievementsPage />}
            />
            <Route
              path="/about/act"
              element={<AboutPlaceholderPage title="ACT(PPP)" />}
            />
            <Route
              path="/about/statute"
              element={<AboutPlaceholderPage title="STATUTE" />}
            />
            <Route path="/about/overview" element={<AboutPage />} />
            <Route
              path="/about/ariia"
              element={<AboutPlaceholderPage title="ARIIA Ranking" />}
            />

            {/* Administration */}
            <Route path="/administration" element={<AdministrationPage />} />
            <Route
              path="/administration/chairperson"
              element={<ChairpersonPage />}
            />
            <Route path="/administration/director" element={<DirectorPage />} />
            <Route
              path="/administration/registrar"
              element={<RegistrarPage />}
            />
            <Route
              path="/administration/board-of-governors"
              element={<BoardOfGovernorsPage />}
            />
            <Route
              path="/administration/finance-committee"
              element={<FinanceCommitteePage />}
            />
            <Route
              path="/administration/building-and-works-committee"
              element={<BuildingWorksCommitteePage />}
            />
            <Route path="/administration/senate" element={<SenatePage />} />
            <Route path="/sgrc" element={<SgrcPage />} />
            <Route
              path="/administration/board-of-studies"
              element={<BoardOfStudiesPage />}
            />
            <Route
              path="/administration/chief-vigilance-officer"
              element={<ChiefVigilanceOfficerPage />}
            />
            <Route
              path="/administration/associate-deans"
              element={<AssociateDeansPage />}
            />

            {/* Academics */}
            <Route path="/academics/btech/cse" element={<BtechCsePage />} />
            <Route path="/academics/ug-pg-schemes" element={<UgPgSchemesPage />} />
            <Route path="/academics/ug-programs" element={<UgProgramsPage />} />
            <Route path="/academics/pg-programs" element={<PgProgramsPage />} />
            <Route path="/academics/phd-programs" element={<PhdProgramsPage />} />
            <Route path="/academics/examination-section" element={<ExaminationSectionPage />} />
            <Route path="/academics/btech/ece" element={<BtechEcePage />} />
            <Route path="/academics/btech/aids" element={<BtechAiDsPage />} />
            <Route
              path="/academics/btech/cybersecurity"
              element={<BtechCybersecurityPage />}
            />
            <Route path="/academics/btech/vlsi" element={<BtechVlsiPage />} />
            <Route
              path="/academics/btech/honors"
              element={<BtechHonorsPage />}
            />
            <Route path="/academics/mtech/cse" element={<MtechCsePage />} />
            <Route path="/academics/mtech/ece" element={<MtechEcePage />} />
            <Route path="/academics/phd" element={<PhdPage />} />
            <Route
              path="/academics/calendar"
              element={<AcademicCalendarPage />}
            />
            <Route path="/academics/timetable" element={<TimetablePage />} />
            <Route
              path="/academics/Calendar"
              element={<AcademicCalendarPage />}
            />

            {/* Research */}
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/research/centres" element={<CentresPage />} />
            <Route path="/research/internships" element={<InternshipsPage />} />
            <Route
              path="/research/funded-projects/completed"
              element={<FundedProjectsCompletedPage />}
            />
            <Route
              path="/research/funded-projects/ongoing"
              element={<FundedProjectsOngoingPage />}
            />
            <Route path="/research/events" element={<EventsPage />} />
            <Route path="/research/mous" element={<MousPage />} />
            <Route path="/research/patents" element={<PatentsPage />} />
            <Route path="/research/publications" element={<PublicationsPage />} />
            <Route
              path="/research/scholar/institute"
              element={<ResearchScholarInstitutePage />}
            />
            <Route
              path="/research/scholar/visvesvaraya"
              element={<ResearchScholarVisvesvarayaPage />}
            />
            <Route
              path="/research/scholar/graduated"
              element={<ResearchScholarGraduatedPage />}
            />
            <Route
              path="/research/postdoc-fellow"
              element={<PostDocFellowPage />}
            />

            {/* People */}
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/faculty" element={<FacultyPage />} />
            <Route
              path="/people/faculty/:slug"
              element={<FacultyProfilePage />}
            />
            <Route
              path="/people/visiting-faculty"
              element={<VisitingFacultyPage />}
            />
            <Route
              path="/people/non-teaching-staff"
              element={
                <Navigate to="/people/non-teaching-staff/regular" replace />
              }
            />
            <Route
              path="/people/non-teaching-staff/:type"
              element={<NonTeachingStaffPage />}
            />


            {/* Departments */}
            <Route path="/departments/cse" element={<CseDepartmentPage />} />
            <Route path="/departments/ece" element={<EceDepartmentPage />} />
            <Route path="/departments/ash" element={<AshDepartmentPage />} />

            {/* Other Pages */}
            <Route path="/HRSummit" element={<HRSummitPage />} />
            <Route path="/life" element={<LifeOverviewPage />} />
            <Route path="/life/clubs" element={<LifeClubsPage />} />
            <Route path="/life/activities" element={<LifeActivitiesPage />} />
            <Route path="/life/gallery" element={<LifeGalleryPage />} />
            <Route path="/life/events" element={<LifeEventsPage />} />
            <Route path="/life/magazine" element={<LifeMagazinePage />} />
            <Route path="/life/newsletter" element={<LifeNewsletterPage />} />
            <Route path="/life/press" element={<LifePressPage />} />
            <Route path="/life/campus" element={<LifeCampusPage />} />

            <Route path="/news" element={<NewsPage />} />
            <Route path="/notice" element={<NoticePage />} />
            <Route path="/notice/anti-ragging" element={<AntiRaggingPage />} />
            <Route
              path="/notice/late-fee"
              element={
                <AboutPlaceholderPage title="Late Fee for the even semester" />
              }
            />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/careers/shortlistings/:slug" element={<ShortlistingsPage />} />

            {/* E-Tenders */}
            <Route
              path="/e-tender"
              element={<Navigate to="/e-tender/live" replace />}
            />
            <Route path="/e-tender/:type" element={<ETenderPage />} />
            <Route path="/people/alumni" element={<Navigate to="/alumni" replace />} />
            <Route path="/placement" element={<PlacementPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/nirf" element={<NIRFPage />} />
            <Route path="/suo-motu" element={<SuoMotuPage />} />
            <Route path="/rti" element={<RTIPage />} />
            <Route path="/rti/reservation-policy" element={<ReservationPolicyPage />} />
            <Route path="/rajbhasha" element={<RajbhashaPage />} />
            <Route path="/rajbhasha/prashikshan" element={<RajbhashaDetailPage />} />
            <Route path="/rajbhasha/chitra-dirgha" element={<RajbhashaGalleryPage />} />
            <Route path="/rajbhasha/samiti-baithak" element={<RajbhashaBaithakPage />} />
            <Route path="/rajbhasha/niti" element={<RajbhashaNitiPage />} />
            <Route path="/rajbhasha/links" element={<RajbhashaLinksPage />} />
            <Route path="/fees" element={<FeesPage />} />
            <Route path="/icc" element={<ICCPage />} />
            <Route path="/equal-opportunity-cell" element={<EqualOpportunityCellPage />} />
            <Route path="/reports-and-minutes" element={<MinutesPage />} />
            <Route path="/scholarships" element={<ScholarshipPage />} />
            <Route path="/ieee" element={<IEEEPage />} />
            <Route path="/acm" element={<ACMPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/sdg/1" element={<SdgOnePage />} />
            <Route path="/sdg-1" element={<SdgOnePage />} />
            <Route path="/sdg/2" element={<SdgTwoPage />} />
            <Route path="/sdg-2" element={<SdgTwoPage />} />
            <Route path="/sdg/3" element={<SdgThreePage />} />
            <Route path="/sdg-3" element={<SdgThreePage />} />
            <Route path="/sdg/4" element={<SdgFourPage />} />
            <Route path="/sdg-4" element={<SdgFourPage />} />
            <Route path="/sdg/5" element={<SdgFivePage />} />
            <Route path="/sdg-5" element={<SdgFivePage />} />
            <Route path="/sdg/6" element={<SdgSixPage />} />
            <Route path="/sdg-6" element={<SdgSixPage />} />
            <Route path="/sdg/7" element={<SdgSevenPage />} />
            <Route path="/sdg-7" element={<SdgSevenPage />} />
            <Route path="/sdg/8" element={<SdgEightPage />} />
            <Route path="/sdg-8" element={<SdgEightPage />} />
            <Route path="/sdg/9" element={<SdgNinePage />} />
            <Route path="/sdg-9" element={<SdgNinePage />} />
            <Route path="/sdg/10" element={<SdgTenPage />} />
            <Route path="/sdg-10" element={<SdgTenPage />} />
            <Route path="/sdg/11" element={<SdgElevenPage />} />
            <Route path="/sdg-11" element={<SdgElevenPage />} />
            <Route path="/sdg/12" element={<SdgTwelvePage />} />
            <Route path="/sdg-12" element={<SdgTwelvePage />} />
            <Route path="/sdg/13" element={<SdgThirteenPage />} />
            <Route path="/sdg-13" element={<SdgThirteenPage />} />
            <Route path="/sdg/14" element={<SdgFourteenPage />} />
            <Route path="/sdg-14" element={<SdgFourteenPage />} />
            <Route path="/sdg/15" element={<SdgFifteenPage />} />
            <Route path="/sdg-15" element={<SdgFifteenPage />} />
            <Route path="/sdg/16" element={<SdgSixteenPage />} />
            <Route path="/sdg-16" element={<SdgSixteenPage />} />
            <Route path="/sdg/17" element={<SdgSeventeenPage />} />
            <Route path="/sdg-17" element={<SdgSeventeenPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <GlobalLoader />
      <AppContent />
    </Router>
  );
}
export default App;
