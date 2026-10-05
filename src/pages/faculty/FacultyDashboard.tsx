import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { Faculty } from '../../types/index.ts';
import { api } from '../../utils/api.ts';
import { StatusBadge } from '../../components/Badge.tsx';
import {
  UserCheck,
  Edit3,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  BookOpen,
  Award,
  Briefcase,
  History,
  FileCheck,
  ExternalLink
} from 'lucide-react';

interface FacultyDashboardProps {
  onNavigateEdit: () => void;
  onNavigateHistory: () => void;
  onViewPublicProfile: (slug: string) => void;
}

export const FacultyDashboard: React.FC<FacultyDashboardProps> = ({
  onNavigateEdit,
  onNavigateHistory,
  onViewPublicProfile
}) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Faculty | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await api.get<Faculty>('/api/faculty/me');
      setProfile(data);
    } catch (err: any) {
      console.error('Error fetching faculty self-profile', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmitForApproval = async () => {
    try {
      setSubmitting(true);
      setErrorMessage(null);
      const res = await api.post<{ message: string; faculty: Faculty }>('/api/faculty/me/submit');
      setProfile(res.faculty);
      setActionMessage('Your profile has been submitted for administrator approval!');
      setTimeout(() => setActionMessage(null), 5000);
    } catch (err: any) {
      setErrorMessage(`Submission failed: ${err.message || 'Server error'}`);
      setTimeout(() => setErrorMessage(null), 6000);
    } finally {
      setSubmitting(false);
    }
  };

  // Compute profile completion percentage
  const calculateCompletion = (f: Faculty | null): number => {
    if (!f) return 0;
    let score = 0;
    if (f.first_name && f.last_name) score += 15; // Basic info
    if (f.profile_photo) score += 15; // Photo
    if (f.highest_qualification && f.specialization) score += 15; // Academic info
    if (f.education && f.education.length > 0) score += 15; // Education
    if (f.experience && f.experience.length > 0) score += 15; // Experience
    if (f.publications && f.publications.length > 0) score += 15; // Publications
    if (f.google_scholar_url || f.orcid_url || f.linkedin_url) score += 10; // Links
    return Math.min(score, 100);
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent mb-3" />
        <p className="text-slate-500 text-sm">Loading your faculty workspace...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8 bg-white rounded-xl border border-rose-200 text-center max-w-lg mx-auto my-12">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-900">Faculty Record Unlinked</h3>
        <p className="text-xs text-slate-500 mt-2">
          Your user account ({user?.username}) is not currently linked to a faculty profile.
          Please contact the website administrator at <code className="bg-slate-100 px-1 rounded">admin@iiitp.ac.in</code>.
        </p>
      </div>
    );
  }

  const completionPct = calculateCompletion(profile);

  const sections = [
    { name: 'Basic Information', complete: Boolean(profile.first_name && profile.last_name && profile.email) },
    { name: 'Profile Photo', complete: Boolean(profile.profile_photo) },
    { name: 'Academic Bio & Qualifications', complete: Boolean(profile.highest_qualification && profile.specialization) },
    { name: 'Education Records', complete: Boolean(profile.education && profile.education.length > 0), count: profile.education?.length },
    { name: 'Experience & Career', complete: Boolean(profile.experience && profile.experience.length > 0), count: profile.experience?.length },
    { name: 'Publications (SCI / Scopus / Conf)', complete: Boolean(profile.publications && profile.publications.length > 0), count: profile.publications?.length },
    { name: 'Patents & IP', complete: Boolean(profile.patents && profile.patents.length > 0), count: profile.patents?.length },
    { name: 'Professional Links (ORCID, Scholar)', complete: Boolean(profile.google_scholar_url || profile.orcid_url || profile.linkedin_url) }
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-center sm:text-left">
          <img
            src={profile.profile_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={profile.full_name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-purple-200 shadow-sm shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                {profile.department_short_name} Department
              </span>
              <StatusBadge status={profile.status} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Welcome, {profile.full_name}
            </h1>
            <p className="text-xs font-semibold text-slate-600">
              {profile.designation} • Employee ID: <code className="font-mono bg-slate-100 px-1 rounded">{profile.employee_id}</code>
            </p>
          </div>
        </div>

        {/* Quick CTA Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onNavigateEdit}
            className="px-4 py-2.5 rounded-xl bg-purple-900 text-white font-semibold text-xs hover:bg-purple-800 transition-colors shadow-xs flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>

          {profile.status !== 'PENDING_APPROVAL' && (
            <button
              onClick={handleSubmitForApproval}
              disabled={submitting}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs transition-colors shadow-xs flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Submitting...' : 'Submit for Approval'}
            </button>
          )}

          <button
            onClick={onNavigateHistory}
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <History className="w-4 h-4 text-slate-500" />
            Audit History
          </button>

          {profile.status === 'PUBLISHED' && (
            <button
              onClick={() => onViewPublicProfile(profile.profile_slug)}
              className="px-3.5 py-2.5 rounded-xl border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <span>View Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-semibold flex items-center gap-2 shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Status Workflow Notification Banner */}
      {profile.status === 'PENDING_APPROVAL' && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-3 shadow-xs">
          <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-amber-950">Changes Pending Review</h4>
            <p className="mt-0.5 text-amber-900">
              Your profile changes have been submitted to the website administration and are currently pending approval.
              Once approved, your updates will automatically reflect on the public IIIT Pune portal.
            </p>
          </div>
        </div>
      )}

      {profile.status === 'REJECTED' && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-rose-950">Revision Requested by Administrator</h4>
            <p className="mt-0.5 font-medium">
              Administrator Feedback: <span className="font-bold text-rose-950">"{profile.rejection_reason || 'Please review and update the required fields.'}"</span>
            </p>
            <p className="mt-1 text-slate-600">
              You can make corrections and click "Submit for Approval" once updated.
            </p>
          </div>
        </div>
      )}

      {/* Profile Completion Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Profile Completion</h3>
            <p className="text-xs text-slate-500">Ensure all academic and research sections are comprehensive.</p>
          </div>
          <span className="text-xl font-black text-purple-900">{completionPct}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${completionPct}%` }}
          />
        </div>
      </div>

      {/* Sections Checklist Grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 text-slate-500">
          Profile Sections & Checklist
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                sec.complete
                  ? 'border-emerald-200 bg-emerald-50/40 text-emerald-950'
                  : 'border-slate-200 bg-slate-50/50 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold leading-tight">{sec.name}</span>
                {sec.complete ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </div>
              <div className="text-[11px] text-slate-500">
                {sec.count !== undefined ? `${sec.count} record(s) added` : (sec.complete ? 'Completed' : 'Action needed')}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Need to update your publications, patents, or biographical details?
          </p>
          <button
            onClick={onNavigateEdit}
            className="px-4 py-2 rounded-lg bg-purple-900 hover:bg-purple-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Open Profile Editor
          </button>
        </div>
      </div>
    </div>
  );
};
