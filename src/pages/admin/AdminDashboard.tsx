import React, { useState, useEffect } from 'react';
import { DashboardStats, Faculty } from '../../types/index.ts';
import { api } from '../../utils/api.ts';
import { StatusBadge } from '../../components/Badge.tsx';
import {
  Users,
  CheckCircle2,
  Clock,
  Building2,
  Shield,
  Plus,
  ArrowRight,
  Send,
  Eye,
  Activity
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (tab: string, param?: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [pendingFaculty, setPendingFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, pendingData] = await Promise.all([
          api.get<DashboardStats>('/api/admin/stats'),
          api.get<Faculty[]>('/api/admin/faculty/pending')
        ]);
        setStats(statsData);
        setPendingFaculty(pendingData);
      } catch (err) {
        console.error('Failed to load admin dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-3" />
        <p className="text-slate-500 text-sm">Loading CMS administration overview...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            IIIT Pune CMS Administration
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Module: Faculty Management & Academic Governance
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('admin-faculty-create')}
            className="px-4 py-2 rounded-xl bg-blue-900 text-white font-semibold text-xs hover:bg-blue-800 transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Add New Faculty
          </button>
          <button
            onClick={() => onNavigate('admin-departments')}
            className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <Building2 className="w-4 h-4 text-slate-500" />
            Departments
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div 
          onClick={() => onNavigate('admin-faculty')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Faculty</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-800 group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats?.totalFaculty || 0}</div>
          <p className="text-[11px] text-slate-500 mt-1">Across all departments</p>
        </div>

        <div 
          onClick={() => onNavigate('admin-faculty')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Published Live</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-700">{stats?.publishedFaculty || 0}</div>
          <p className="text-[11px] text-slate-500 mt-1">Active on public site</p>
        </div>

        <div 
          onClick={() => onNavigate('admin-pending')}
          className={`p-5 rounded-2xl border shadow-xs hover:shadow-md transition-all cursor-pointer group ${
            (stats?.pendingApproval || 0) > 0
              ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/20'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Pending Review</span>
            <div className="p-2 rounded-lg bg-amber-100 text-amber-900 group-hover:scale-105 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-900">{stats?.pendingApproval || 0}</div>
          <p className="text-[11px] text-amber-800 font-medium mt-1">Requires admin approval</p>
        </div>

        <div 
          onClick={() => onNavigate('admin-departments')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Departments</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-800 group-hover:scale-105 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats?.totalDepartments || 0}</div>
          <p className="text-[11px] text-slate-500 mt-1">CSE, ECE, ASH</p>
        </div>

        <div 
          onClick={() => onNavigate('admin-users')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">CMS Users</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-800 group-hover:scale-105 transition-transform">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats?.totalUsers || 0}</div>
          <p className="text-[11px] text-slate-500 mt-1">RBAC Accounts</p>
        </div>
      </div>

      {/* Pending Approvals Queue */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Pending Faculty Profile Approvals ({pendingFaculty.length})
            </h3>
          </div>
          {pendingFaculty.length > 0 && (
            <button
              onClick={() => onNavigate('admin-pending')}
              className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-1"
            >
              <span>Review All in Approval Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {pendingFaculty.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">Approval queue is clear</p>
            <p className="text-slate-400 mt-0.5">No faculty profile revisions are currently awaiting administrator review.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {pendingFaculty.map((fac) => (
              <div
                key={fac.id}
                className="p-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={fac.profile_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt={fac.full_name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm truncate">{fac.full_name}</span>
                      <StatusBadge status={fac.status} />
                    </div>
                    <p className="text-xs text-slate-600 truncate">
                      {fac.designation} • {fac.department_name} ({fac.department_short_name})
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Employee ID: {fac.employee_id} • Email: {fac.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onNavigate('admin-pending')}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-900 text-white font-semibold text-xs hover:bg-blue-800 transition-colors shadow-xs"
                  >
                    Inspect & Decide
                  </button>
                  <button
                    onClick={() => onNavigate('admin-faculty-edit', fac.id)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-white"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* System Governance & Architecture Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => onNavigate('admin-faculty')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center mb-3">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Manage Faculty Records</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Add new faculty members, modify designations, reorder display hierarchy, and toggle web visibility.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('admin-users')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-purple-400 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center mb-3">
            <Shield className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">RBAC User Management</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Provision user login accounts, link faculty accounts, assign roles (Super Admin, Admin, Faculty), and reset passwords.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('admin-audit-logs')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-3">
            <Activity className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Security & Audit Trails</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Review detailed timestamps, IP addresses, payloads, and user actions recorded in the immutable audit log table.
          </p>
        </div>
      </div>
    </div>
  );
};
