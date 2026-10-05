import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import {
  GraduationCap,
  ShieldCheck,
  UserCheck,
  LogOut,
  Building2,
  ChevronDown,
  BookOpen,
  KeyRound,
  ExternalLink,
  Users
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate }) => {
  const { user, logout, login, isAdmin, isFaculty } = useAuth();
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleQuickLogin = async (username: string, pass: string, targetTab: string) => {
    try {
      setIsLoggingIn(true);
      setLoginError(null);
      await login(username, pass);
      setShowDemoMenu(false);
      onNavigate(targetTab);
    } catch (err: any) {
      setLoginError(`Login failed: ${err.message || 'Invalid credentials'}`);
      setTimeout(() => setLoginError(null), 5000);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Government Bar */}
      <div className="bg-[#0b1b3d] text-white text-[11px] py-1 px-4 sm:px-8 flex items-center justify-between border-b border-blue-900/50">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wider text-amber-300">भारत सरकार / GOVT. OF INDIA</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">Ministry of Education • Institute of National Importance</span>
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
        <div 
          onClick={() => onNavigate('public-faculty')}
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0F2042] via-[#1E3A8A] to-[#1E40AF] text-white flex items-center justify-center font-bold shadow-md shadow-blue-900/20 ring-2 ring-blue-900/20 group-hover:scale-105 transition-transform">
            <span className="text-base tracking-wider font-serif">IIITP</span>
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-500 uppercase tracking-widest leading-none">
              भारतीय सूचना प्रौद्योगिकी संस्थान, पुणे
            </div>
            <div className="text-base sm:text-lg font-black text-[#0F2042] tracking-tight leading-tight">
              Indian Institute of Information Technology Pune
            </div>
            <div className="text-xs text-blue-700 font-semibold flex items-center gap-1.5">
              <span>Faculty Information System & CMS</span>
              <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-mono">v1.0-PROD</span>
            </div>
          </div>
        </div>

        {/* Action Controls & Navigation Switcher */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Quick Demo Accounts Helper */}
          <div className="relative">
            <button
              onClick={() => setShowDemoMenu(!showDemoMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors shadow-xs"
              title="Quick test using pre-configured seed accounts"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-700" />
              <span>Demo Accounts</span>
              <ChevronDown className="w-3 h-3 text-amber-700" />
            </button>

            {showDemoMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-100 bg-slate-50 text-slate-700 font-semibold flex items-center justify-between">
                  <span>Switch Pre-Seeded Roles</span>
                  <span className="text-[10px] text-amber-600 font-mono">Test Authorization</span>
                </div>

                {loginError && (
                  <div className="p-2 mx-2 mt-2 rounded-lg bg-rose-50 border border-rose-300 text-rose-900 text-[11px] font-medium">
                    {loginError}
                  </div>
                )}

                <div className="p-2 space-y-1">
                  <button
                    disabled={isLoggingIn}
                    onClick={() => handleQuickLogin('admin@iiitp.ac.in', 'Admin@IIITP2026', 'admin-dashboard')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-start gap-2.5 group"
                  >
                    <div className="p-1.5 rounded-md bg-blue-100 text-blue-800 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 group-hover:text-blue-700">Administrator (Super Admin)</div>
                      <div className="text-[11px] text-slate-500 font-mono">admin@iiitp.ac.in</div>
                      <div className="text-[10px] text-emerald-600 font-medium">Full CMS access, approval workflow & users</div>
                    </div>
                  </button>

                  <button
                    disabled={isLoggingIn}
                    onClick={() => handleQuickLogin('faculty.cse@iiitp.ac.in', 'Faculty@IIITP2026', 'faculty-dashboard')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors flex items-start gap-2.5 group"
                  >
                    <div className="p-1.5 rounded-md bg-purple-100 text-purple-800 mt-0.5">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 group-hover:text-purple-700">Faculty CSE (Prof. Satapathy)</div>
                      <div className="text-[11px] text-slate-500 font-mono">faculty.cse@iiitp.ac.in</div>
                      <div className="text-[10px] text-purple-700 font-medium">Can only edit Faculty #1 profile</div>
                    </div>
                  </button>

                  <button
                    disabled={isLoggingIn}
                    onClick={() => handleQuickLogin('faculty.ece@iiitp.ac.in', 'Faculty@IIITP2026', 'faculty-dashboard')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors flex items-start gap-2.5 group"
                  >
                    <div className="p-1.5 rounded-md bg-indigo-100 text-indigo-800 mt-0.5">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 group-hover:text-indigo-700">Faculty ECE (Dr. Kulkarni)</div>
                      <div className="text-[11px] text-slate-500 font-mono">faculty.ece@iiitp.ac.in</div>
                      <div className="text-[10px] text-indigo-700 font-medium">Can only edit Faculty #2 profile</div>
                    </div>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-100 px-3 py-1.5 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Passwords: <code className="bg-slate-200 px-1 rounded">Admin@IIITP2026</code></span>
                </div>
              </div>
            )}
          </div>

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
