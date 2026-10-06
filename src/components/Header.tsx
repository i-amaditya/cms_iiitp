import React from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import iiitpLogo from '../Logo/iiitp_logo.png';
import {
  ShieldCheck,
  UserCheck,
  LogOut,
  BookOpen,
  Users
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate }) => {
  const { user, logout, isAdmin, isFaculty } = useAuth();

  const isPublicPage = currentTab === 'public-faculty' || currentTab === 'public-detail';

  if (isPublicPage) {
    const officialLinks = [
      ['About Us', 'https://iiitp.ac.in/about'],
      ['Administration', 'https://iiitp.ac.in/administration'],
      ['Academics', 'https://iiitp.ac.in/academics'],
      ['Research', 'https://iiitp.ac.in/research'],
      ['People', '/people/faculty'],
      ['Life@IIITP', 'https://iiitp.ac.in/life'],
      ['Notice', 'https://iiitp.ac.in/notice'],
      ['Careers', 'https://iiitp.ac.in/careers'],
      ['Placement', 'https://placement.iiitp.ac.in/'],
      ['Alumni', 'https://iiitp.ac.in/alumni']
    ];

    return (
      <header className="sticky top-0 z-40 bg-[#1d3c68] text-white shadow-md">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <a href="/people/faculty" aria-label="IIIT Pune Faculty Members" className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-white/30">
              <img src={iiitpLogo} alt="IIIT Pune Logo" className="h-full w-full object-cover" />
            </a>
            <a href="/people/faculty" className="min-w-0 text-center sm:text-left">
              <div className="font-serif text-lg font-bold leading-tight sm:text-xl">भारतीय सूचना प्रौद्योगिकी संस्थान, पुणे</div>
              <div className="font-serif text-sm font-semibold leading-tight sm:text-base">Indian Institute of Information Technology Pune</div>
              <div className="mt-1 text-xs text-blue-100">(An Institute of National Importance by an Act of Parliament)</div>
              <div className="text-xs text-blue-100">Talegaon, Pune, Maharashtra - 410507</div>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs lg:max-w-[490px] lg:justify-end">
            <a href="https://iiitp.ac.in/international" className="rounded-md bg-[#d92732] px-3 py-2 font-bold text-white hover:bg-red-700">INTERNATIONAL RELATIONS</a>
            <a href="https://iiitp.ac.in" className="rounded-md bg-[#d92732] px-3 py-2 font-bold text-white hover:bg-red-700">STUDENT PORTAL</a>
            {user ? (
              <>
                <button
                  onClick={() => onNavigate(isAdmin ? 'admin-dashboard' : 'faculty-dashboard')}
                  className="rounded-md border border-white/30 px-3 py-2 font-semibold hover:bg-white/10"
                >
                  Dashboard
                </button>
                <button onClick={logout} className="rounded-md border border-white/30 px-3 py-2 font-semibold hover:bg-white/10">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button onClick={() => onNavigate('faculty-login')} className="rounded-md border border-white/30 px-3 py-2 font-semibold hover:bg-white/10">
                  Faculty Login
                </button>
                <button onClick={() => onNavigate('admin-login')} className="rounded-md border border-white/30 px-3 py-2 font-semibold hover:bg-white/10">
                  CMS Admin
                </button>
              </>
            )}
          </div>
        </div>

        <nav aria-label="Institute navigation" className="border-t border-white/10 bg-[#18345b]">
          <div className="mx-auto flex max-w-[1440px] items-center gap-1 overflow-x-auto px-5 text-sm font-semibold lg:justify-center lg:px-8">
            {officialLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                aria-current={label === 'People' ? 'page' : undefined}
                className={`whitespace-nowrap border-b-2 px-3 py-3 transition-colors ${
                  label === 'People'
                    ? 'border-[#d92732] text-white'
                    : 'border-transparent text-blue-50 hover:border-white/50 hover:bg-white/5'
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href="https://iiitp.ac.in/e-tender"
              className="whitespace-nowrap border-b-2 border-transparent px-3 py-3 text-blue-50 transition-colors hover:border-white/50 hover:bg-white/5"
            >
              E-TENDER
            </a>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-[0_2px_18px_rgba(15,32,66,0.08)]">
      {/* Top Government Bar */}
      <div className="bg-[#0b1b3d] text-white text-[11px] py-1 px-4 sm:px-8 flex items-center justify-between border-b border-blue-900/50">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="font-semibold tracking-wider text-amber-300 whitespace-nowrap">भारत सरकार / GOVT. OF INDIA</span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-300 whitespace-nowrap">Ministry of Education • Institute of National Importance</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-slate-300">
          <span>Official Portal: iiitp.ac.in</span>
          <span>•</span>
          <button
            onClick={() => onNavigate('docs')}
            className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <BookOpen className="w-3 h-3 text-amber-400" />
            System Architecture & DB Specs
          </button>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Institute Crest & Name */}
        <div className="flex items-center gap-3.5">
          <a
            href="https://iiitp.ac.in"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit the official IIIT Pune website"
            title="Visit the official IIIT Pune website"
            className="w-14 h-14 overflow-hidden rounded-full bg-white ring-2 ring-blue-900/15 shadow-md transition-transform hover:scale-105"
          >
            <img src={iiitpLogo} alt="IIIT Pune logo" className="h-full w-full object-cover" />
          </a>
          <button
            type="button"
            onClick={() => onNavigate('public-faculty')}
            className="cursor-pointer text-left group"
          >
            <div className="text-[11px] font-medium text-slate-500 uppercase tracking-widest leading-none">
              भारतीय सूचना प्रौद्योगिकी संस्थान, पुणे
            </div>
            <div className="text-base sm:text-lg font-black text-[#0F2042] tracking-tight leading-tight">
              Indian Institute of Information Technology Pune
            </div>
            <div className="text-xs text-blue-700 font-semibold flex items-center gap-1.5 flex-wrap">
              <span>Faculty Information System & CMS</span>
              <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-mono">v1.0-PROD</span>
            </div>
          </button>
        </div>

        {/* Action Controls & Navigation Switcher */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Active User Badge & Logout */}
          {user ? (
            <div className="flex items-center gap-2 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              <div className="text-right">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <span>{user.username}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                    isAdmin ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'
                  }`}>
                    {user.role}
                  </span>
                </div>
                {user.faculty && (
                  <div className="text-[10px] text-slate-500 truncate max-w-[120px]">
                    {user.faculty.fullName}
                  </div>
                )}
              </div>
              <button
                onClick={logout}
                className="p-1.5 text-slate-500 hover:text-rose-600 rounded-md hover:bg-white transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onNavigate('faculty-login')}
                className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Faculty Login
              </button>
              <button
                onClick={() => onNavigate('admin-login')}
                className="px-2.5 py-1.5 text-xs font-semibold text-white bg-[#0F2042] hover:bg-blue-900 rounded-lg shadow-xs transition-colors"
              >
                Admin Login
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-slate-50 border-t border-slate-200 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-1 text-xs sm:text-sm font-medium">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => onNavigate('public-faculty')}
              className={`px-3 py-2 rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
                currentTab === 'public-faculty' || currentTab === 'public-detail'
                  ? 'bg-blue-900 text-white font-semibold shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              <Users className="w-4 h-4" />
              Public Faculty Directory
            </button>

            {isAdmin && (
              <>
                <button
                  onClick={() => onNavigate('admin-dashboard')}
                  className={`px-3 py-2 rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    currentTab === 'admin-dashboard'
                      ? 'bg-blue-900 text-white font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  Admin Dashboard
                </button>
                <button
                  onClick={() => onNavigate('admin-faculty')}
                  className={`px-3 py-2 rounded-md transition-all whitespace-nowrap ${
                    currentTab === 'admin-faculty' || currentTab === 'admin-faculty-edit' || currentTab === 'admin-faculty-create'
                      ? 'bg-blue-900 text-white font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  Faculty CMS
                </button>
                <button
                  onClick={() => onNavigate('admin-pending')}
                  className={`px-3 py-2 rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    currentTab === 'admin-pending'
                      ? 'bg-blue-900 text-white font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  Pending Approvals
                </button>
                <button
                  onClick={() => onNavigate('admin-departments')}
                  className={`px-3 py-2 rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    currentTab === 'admin-departments'
                      ? 'bg-blue-900 text-white font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  Departments
                </button>
                <button
                  onClick={() => onNavigate('admin-users')}
                  className={`px-3 py-2 rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    currentTab === 'admin-users'
                      ? 'bg-blue-900 text-white font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  User Accounts & RBAC
                </button>
                <button
                  onClick={() => onNavigate('admin-audit-logs')}
                  className={`px-3 py-2 rounded-md transition-all whitespace-nowrap ${
                    currentTab === 'admin-audit-logs'
                      ? 'bg-blue-900 text-white font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  Audit Logs
                </button>
              </>
            )}

            {isFaculty && (
              <>
                <button
                  onClick={() => onNavigate('faculty-dashboard')}
                  className={`px-3 py-2 rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    currentTab === 'faculty-dashboard'
                      ? 'bg-purple-900 text-white font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-purple-300" />
                  My Faculty Dashboard
                </button>
                <button
                  onClick={() => onNavigate('faculty-edit')}
                  className={`px-3 py-2 rounded-md transition-all whitespace-nowrap ${
                    currentTab === 'faculty-edit'
                      ? 'bg-purple-900 text-white font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  Edit My Profile
                </button>
                <button
                  onClick={() => onNavigate('faculty-history')}
                  className={`px-3 py-2 rounded-md transition-all whitespace-nowrap ${
                    currentTab === 'faculty-history'
                      ? 'bg-purple-900 text-white font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  My Version History
                </button>
              </>
            )}
          </div>

          <div className="flex items-center pl-2">
            <button
              onClick={() => onNavigate('docs')}
              className={`px-2.5 py-1.5 rounded-md font-semibold text-xs flex items-center gap-1 transition-all whitespace-nowrap ${
                currentTab === 'docs'
                  ? 'bg-amber-500 text-slate-900 font-bold'
                  : 'text-amber-800 bg-amber-100/70 hover:bg-amber-200/80 border border-amber-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Architecture & Deployment Specs
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
