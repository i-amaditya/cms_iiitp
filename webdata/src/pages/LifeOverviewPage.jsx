import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight } from 'lucide-react';
import LifePageLayout from '../components/life/LifePageLayout';

const LifeOverviewPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTabChange = (tabKey) => {
    if (tabKey === 'overview') {
      navigate('/life');
    } else {
      navigate(`/life/${tabKey}`);
    }
  };

  return (
    <LifePageLayout 
      title="Student Life" 
      subtitle="Discover the vibrant clubs, events, campus facilities, and extracurricular opportunities at IIIT Pune."
      breadcrumb="Life"
    >
      <div className="space-y-12">
        {/* Quick Links Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex flex-col justify-between border-t-4 border-t-blue-600">
            <div>
              <h3 className="text-lg font-bold font-serif text-gray-800 dark:text-white mb-2">Student Clubs</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                15+ student-run clubs covering competitive programming, design, dramatics, arts, quiz, music, robotics, and astronomy.
              </p>
            </div>
            <button onClick={() => handleTabChange('clubs')} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-accent dark:text-accent-dark hover:underline text-left">
              Explore Clubs <ChevronRight size={14} />
            </button>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex flex-col justify-between border-t-4 border-t-emerald-600">
            <div>
              <h3 className="text-lg font-bold font-serif text-gray-800 dark:text-white mb-2">National Activities</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Celebration of national initiatives like EBSB, Fit India, Swachh Bharat, Yoga Day, and annual hackathons.
              </p>
            </div>
            <button onClick={() => handleTabChange('activities')} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-accent dark:text-accent-dark hover:underline text-left">
              Explore Activities <ChevronRight size={14} />
            </button>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex flex-col justify-between border-t-4 border-t-indigo-600">
            <div>
              <h3 className="text-lg font-bold font-serif text-gray-800 dark:text-white mb-2">Permanent Campus</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                100-acre modern campus located in Nanoli, Tal. Maval, Pune with advanced labs and comfortable residential blocks.
              </p>
            </div>
            <button onClick={() => handleTabChange('campus')} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-accent dark:text-accent-dark hover:underline text-left">
              Explore Campus Details <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Quick overview of hostels / facilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="h-1.5 bg-primary" />
            <div className="p-6">
              <h3 className="text-lg font-bold font-serif text-primary dark:text-white mb-3">Hostel &amp; Mess</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 text-justify leading-relaxed">Comfortable housing with high-speed Wi-Fi, common recreational halls, and a mess serving nutritious and hygienic food.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="h-1.5 bg-primary" />
            <div className="p-6">
              <h3 className="text-lg font-bold font-serif text-primary dark:text-white mb-3">Sports Facilities</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 text-justify leading-relaxed">Equipped gymnasium, courts for basketball, volleyball, badminton, table-tennis, and open grounds for cricket and football.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="h-1.5 bg-primary" />
            <div className="p-6">
              <h3 className="text-lg font-bold font-serif text-primary dark:text-white mb-3">Clubs &amp; Societies</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 text-justify leading-relaxed">Various active student clubs representing competitive coding, robotics, cultural fests, dramatics, music, and quiz leagues.</p>
            </div>
          </div>
        </div>
      </div>
    </LifePageLayout>
  );
};

export default LifeOverviewPage;
