import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';

// Public Views
import { PublicFacultyList } from './pages/public/PublicFacultyList.tsx';
import { PublicFacultyDetail } from './pages/public/PublicFacultyDetail.tsx';

// Admin Views
import { AdminLogin } from './pages/admin/AdminLogin.tsx';
import { AdminDashboard } from './pages/admin/AdminDashboard.tsx';
import { AdminFacultyList } from './pages/admin/AdminFacultyList.tsx';
import { AdminPendingApprovals } from './pages/admin/AdminPendingApprovals.tsx';
import { AdminDepartments } from './pages/admin/AdminDepartments.tsx';
import { AdminUsers } from './pages/admin/AdminUsers.tsx';
import { AdminAuditLogs } from './pages/admin/AdminAuditLogs.tsx';

// Faculty Views
import { FacultyLogin } from './pages/faculty/FacultyLogin.tsx';
import { FacultyDashboard } from './pages/faculty/FacultyDashboard.tsx';
import { FacultyProfileEditor } from './pages/faculty/FacultyProfileEditor.tsx';
import { FacultyVersionHistory } from './pages/faculty/FacultyVersionHistory.tsx';

// Technical Specs
import { ArchitectureDocs } from './pages/docs/ArchitectureDocs.tsx';

function MainLayout() {
  const { user, isAdmin, isFaculty } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('public-faculty');
  const [selectedSlug, setSelectedSlug] = useState<string>('prof-suresh-satapathy');
  const [selectedFacultyId, setSelectedFacultyId] = useState<number | undefined>(undefined);

  const handleNavigate = (tab: string, param?: any) => {
    if (tab === 'public-detail') {
      if (typeof param === 'string' && param.trim()) {
        setSelectedSlug(param.trim());
      }
    }
    if ((tab === 'admin-faculty-edit' || tab === 'admin-faculty-history') && typeof param === 'number') {
      setSelectedFacultyId(param);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFacultyFromDirectory = (slug: string) => {
    setSelectedSlug(slug);
    setCurrentTab('public-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Official Government & IIIT Pune Header */}
      <Header currentTab={currentTab} onNavigate={handleNavigate} />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* PUBLIC DIRECTORY */}
        {currentTab === 'public-faculty' && (
          <PublicFacultyList onSelectFaculty={handleSelectFacultyFromDirectory} />
        )}

        {/* PUBLIC DETAIL VIEW */}
        {currentTab === 'public-detail' && (
          <PublicFacultyDetail
            slug={selectedSlug}
            onBack={() => setCurrentTab('public-faculty')}
          />
        )}

        {/* ADMIN LOGIN */}
        {currentTab === 'admin-login' && (
          <AdminLogin
            onSuccess={() => setCurrentTab('admin-dashboard')}
            onSwitchToFaculty={() => setCurrentTab('faculty-login')}
          />
        )}

        {/* ADMIN DASHBOARD */}
        {currentTab === 'admin-dashboard' && (
          isAdmin ? (
            <AdminDashboard onNavigate={handleNavigate} />
          ) : (
            <AdminLogin
              onSuccess={() => setCurrentTab('admin-dashboard')}
              onSwitchToFaculty={() => setCurrentTab('faculty-login')}
            />
          )
        )}

        {/* ADMIN FACULTY MANAGEMENT */}
        {currentTab === 'admin-faculty' && (
          isAdmin ? (
            <AdminFacultyList onNavigate={handleNavigate} />
          ) : (
            <AdminLogin
              onSuccess={() => setCurrentTab('admin-faculty')}
              onSwitchToFaculty={() => setCurrentTab('faculty-login')}
            />
          )
        )}

        {/* ADMIN FACULTY CREATE */}
        {currentTab === 'admin-faculty-create' && (
          isAdmin ? (
            <FacultyProfileEditor
              isAdminMode={true}
              onBack={() => setCurrentTab('admin-faculty')}
            />
          ) : (
            <AdminLogin
              onSuccess={() => setCurrentTab('admin-faculty')}
              onSwitchToFaculty={() => setCurrentTab('faculty-login')}
            />
          )
        )}

        {/* ADMIN FACULTY EDIT */}
        {currentTab === 'admin-faculty-edit' && (
          isAdmin ? (
            <FacultyProfileEditor
              isAdminMode={true}
              facultyId={selectedFacultyId}
              onBack={() => setCurrentTab('admin-faculty')}
            />
          ) : (
            <AdminLogin
              onSuccess={() => setCurrentTab('admin-faculty')}
              onSwitchToFaculty={() => setCurrentTab('faculty-login')}
            />
          )
        )}

        {/* ADMIN PENDING APPROVALS */}
        {currentTab === 'admin-pending' && (
          isAdmin ? (
            <AdminPendingApprovals onNavigate={handleNavigate} />
          ) : (
            <AdminLogin
              onSuccess={() => setCurrentTab('admin-pending')}
              onSwitchToFaculty={() => setCurrentTab('faculty-login')}
            />
          )
        )}

        {/* ADMIN DEPARTMENTS */}
        {currentTab === 'admin-departments' && (
          isAdmin ? (
            <AdminDepartments />
          ) : (
            <AdminLogin
              onSuccess={() => setCurrentTab('admin-departments')}
              onSwitchToFaculty={() => setCurrentTab('faculty-login')}
            />
          )
        )}

        {/* ADMIN USERS */}
        {currentTab === 'admin-users' && (
          isAdmin ? (
            <AdminUsers />
          ) : (
            <AdminLogin
              onSuccess={() => setCurrentTab('admin-users')}
              onSwitchToFaculty={() => setCurrentTab('faculty-login')}
            />
          )
        )}

        {/* ADMIN AUDIT LOGS */}
        {currentTab === 'admin-audit-logs' && (
          isAdmin ? (
            <AdminAuditLogs />
          ) : (
            <AdminLogin
              onSuccess={() => setCurrentTab('admin-audit-logs')}
              onSwitchToFaculty={() => setCurrentTab('faculty-login')}
            />
          )
        )}

        {/* FACULTY LOGIN */}
        {currentTab === 'faculty-login' && (
          <FacultyLogin
            onSuccess={() => setCurrentTab('faculty-dashboard')}
            onSwitchToAdmin={() => setCurrentTab('admin-login')}
          />
        )}

        {/* FACULTY DASHBOARD */}
        {currentTab === 'faculty-dashboard' && (
          isFaculty || isAdmin ? (
            <FacultyDashboard
              onNavigateEdit={() => setCurrentTab('faculty-edit')}
              onNavigateHistory={() => setCurrentTab('faculty-history')}
              onViewPublicProfile={handleSelectFacultyFromDirectory}
            />
          ) : (
            <FacultyLogin
              onSuccess={() => setCurrentTab('faculty-dashboard')}
              onSwitchToAdmin={() => setCurrentTab('admin-login')}
            />
          )
        )}

        {/* FACULTY PROFILE EDITOR */}
        {currentTab === 'faculty-edit' && (
          isFaculty || isAdmin ? (
            <FacultyProfileEditor
              isAdminMode={false}
              onBack={() => setCurrentTab('faculty-dashboard')}
            />
          ) : (
            <FacultyLogin
              onSuccess={() => setCurrentTab('faculty-dashboard')}
              onSwitchToAdmin={() => setCurrentTab('admin-login')}
            />
          )
        )}

        {/* FACULTY VERSION HISTORY */}
        {currentTab === 'faculty-history' && (
          isFaculty || isAdmin ? (
            <FacultyVersionHistory
              onBack={() => setCurrentTab('faculty-dashboard')}
            />
          ) : (
            <FacultyLogin
              onSuccess={() => setCurrentTab('faculty-dashboard')}
              onSwitchToAdmin={() => setCurrentTab('admin-login')}
            />
          )
        )}

        {/* TECHNICAL ARCHITECTURE & DEPLOYMENT DOCS (STEPS 1-14) */}
        {currentTab === 'docs' && (
          <ArchitectureDocs />
        )}
      </main>

      {/* Official Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
