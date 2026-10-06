import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Briefcase,
  FileCheck,
  UserPlus,
  ClipboardList,
  LogOut,
  Users as UsersIcon,
} from 'lucide-react';

import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import { DashboardHome } from './pages/DashboardHome';
import { NoticesManager } from './pages/NoticesManager';
import { NewsManager } from './pages/NewsManager';
import { CareersManager } from './pages/CareersManager';
import { ETendersManager } from './pages/ETendersManager';
import { UsersPage } from './pages/UsersPage';
import { InvitesPage } from './pages/InvitesPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { LoginPage } from './pages/LoginPage';
import { LoadingSpinner } from './components/LoadingSpinner';

import './App.css';

interface NavItem {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
  sectionKey?: string;
  adminOnly?: boolean;
}

interface NavGroup {
  section: string;
  items: NavItem[];
}

const rawNavigation: NavGroup[] = [
  {
    section: 'CMS',
    items: [
      { label: 'Dashboard', path: '/', icon: LayoutDashboard },
      { label: 'Notices', path: '/notices', icon: FileText, sectionKey: 'notices' },
      { label: 'News', path: '/news', icon: Newspaper, sectionKey: 'news' },
      { label: 'Careers', path: '/careers', icon: Briefcase, sectionKey: 'careers' },
      { label: 'E-Tenders', path: '/etenders', icon: FileCheck, sectionKey: 'etenders' },
    ],
  },
  {
    section: 'Administration',
    items: [
      { label: 'Users', path: '/users', icon: UsersIcon, adminOnly: true },
      { label: 'Invites', path: '/invites', icon: UserPlus, adminOnly: true },
      { label: 'Audit Logs', path: '/audit-logs', icon: ClipboardList, adminOnly: true },
    ],
  },
];

function AppLayout() {
  const { user, loading, isAdmin, canAccessSection, logout } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner message="Checking authentication session..." />
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  // Filter navigation items based on role and section permissions
  const filteredNavigation = rawNavigation
    .map((group) => {
      const items = group.items.filter((item) => {
        if (item.adminOnly && !isAdmin) {
          return false;
        }
        if (item.sectionKey && !canAccessSection(item.sectionKey)) {
          return false;
        }
        return true;
      });

      return { ...group, items };
    })
    .filter((group) => group.items.length > 0);

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'A';
  const roleName = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Admin';

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">IIIT</div>

          <div>
            <div className="brand-title">IIIT Pune</div>
            <div className="brand-subtitle">CMS Dashboard</div>
          </div>
        </div>

        <nav className="navigation">
          {filteredNavigation.map((group) => (
            <div className="nav-group" key={group.section}>
              <div className="nav-section-title">{group.section}</div>

              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    <Icon size={19} strokeWidth={1.8} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button" type="button" onClick={logout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div>
            <div className="topbar-title">Administration</div>
            <div className="topbar-subtitle">
              IIIT Pune Website Content Management System
            </div>
          </div>

          <div className="user-placeholder">
            {user?.avatar_url ? (
              <img src={user.avatar_url} alt={user.name} className="avatar-img" />
            ) : (
              <div className="avatar">{userInitial}</div>
            )}

            <div>
              <div className="user-name">{user?.name || 'Administrator'}</div>
              <div className="user-role">{roleName}</div>
            </div>
          </div>
        </header>

        <section className="content">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/notices" element={<NoticesManager />} />
            <Route path="/news" element={<NewsManager />} />
            <Route path="/careers" element={<CareersManager />} />
            <Route path="/etenders" element={<ETendersManager />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/invites" element={<InvitesPage />} />
            <Route path="/audit-logs" element={<AuditLogsPage />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}