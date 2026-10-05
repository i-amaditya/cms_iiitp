import React, { useState, useEffect } from 'react';
import { Faculty, ProfileVersion } from '../../types/index.ts';
import { api } from '../../utils/api.ts';
import { Modal } from '../../components/Modal.tsx';
import { DiffViewer } from '../../components/DiffViewer.tsx';
import { StatusBadge } from '../../components/Badge.tsx';
import {
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface AdminPendingApprovalsProps {
  onNavigate: (tab: string, param?: any) => void;
}

export const AdminPendingApprovals: React.FC<AdminPendingApprovalsProps> = ({ onNavigate }) => {
  const [pendingList, setPendingList] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [recentVersion, setRecentVersion] = useState<ProfileVersion | null>(null);
  const [loadingVersion, setLoadingVersion] = useState(false);

  // Reject & Approve Modals
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [processing, setProcessing] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string; slug?: string } | null>(null);

  const fetchPending = async () => {
    try {
      setLoading(true);
      const data = await api.get<Faculty[]>('/api/admin/faculty/pending');
      setPendingList(data);
      if (data.length > 0 && !selectedFaculty) {
        loadFacultyDiff(data[0]);
      }
    } catch (err) {
      console.error('Failed to load pending approvals', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const loadFacultyDiff = async (fac: Faculty) => {
    try {
      setSelectedFaculty(fac);
      setLoadingVersion(true);
      const history = await api.get<ProfileVersion[]>(`/api/admin/faculty/${fac.id}/history`);
      if (history.length > 0) {
        setRecentVersion(history[0]);
      } else {
        setRecentVersion(null);
      }
    } catch (err) {
      console.error('Failed to load version diff', err);
    } finally {
      setLoadingVersion(false);
    }
  };

  const executeApprove = async () => {
    if (!selectedFaculty) return;

    try {
      setProcessing(true);
      setFeedbackMessage(null);
      const targetName = selectedFaculty.full_name;
      const targetSlug = selectedFaculty.profile_slug;

      await api.post(`/api/admin/faculty/${selectedFaculty.id}/approve`);
      
      setFeedbackMessage({
        type: 'success',
        text: `Profile for "${targetName}" has been successfully approved and published live!`,
        slug: targetSlug
      });

      setApproveModalOpen(false);
      setSelectedFaculty(null);
      setRecentVersion(null);
      await fetchPending();
    } catch (err: any) {
      setFeedbackMessage({
        type: 'error',
        text: `Approval failed: ${err.message || 'Unknown error'}`
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFaculty || !rejectionReason.trim()) return;

    try {
      setProcessing(true);
      setFeedbackMessage(null);
      const targetName = selectedFaculty.full_name;

      await api.post(`/api/admin/faculty/${selectedFaculty.id}/reject`, {
        rejectionReason: rejectionReason.trim()
      });

      setFeedbackMessage({
        type: 'success',
        text: `Revision feedback sent to "${targetName}". Profile marked as Revision Requested.`
      });

      setRejectModalOpen(false);
      setRejectionReason('');
      setSelectedFaculty(null);
      setRecentVersion(null);
      await fetchPending();
    } catch (err: any) {
      setFeedbackMessage({
        type: 'error',
        text: `Rejection failed: ${err.message || 'Unknown error'}`
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-3" />
        <p className="text-slate-500 text-sm">Loading approval queue...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Faculty Profile Approval Workflow
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review self-service edits submitted by faculty members, inspect change diffs, and approve or request revisions.
        </p>
      </div>

      {/* Action Notification Banner */}
      {feedbackMessage && (
        <div className={`p-4 rounded-xl border text-xs flex items-center justify-between shadow-xs ${
          feedbackMessage.type === 'success'
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
            : 'bg-rose-50 border-rose-300 text-rose-900'
        }`}>
          <div className="flex items-center gap-2.5">
            {feedbackMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span className="font-semibold">{feedbackMessage.text}</span>
          </div>
          {feedbackMessage.slug && (
            <button
              onClick={() => onNavigate('public-detail', feedbackMessage.slug)}
              className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors flex items-center gap-1 shadow-xs"
            >
              <span>View Live Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {pendingList.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-2xl border border-slate-200 shadow-xs">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">All Profile Changes Reviewed</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            There are currently no faculty profile submissions pending administrator review.
            Any updates submitted by faculty members will automatically appear in this review queue.
          </p>
          <button
            onClick={() => onNavigate('admin-faculty')}
            className="mt-6 px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-semibold hover:bg-blue-800 transition-colors"
          >
            Go to Faculty Directory
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Pending List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Pending Submissions ({pendingList.length})
            </h3>
            <div className="space-y-2.5">
              {pendingList.map((fac) => (
                <div
                  key={fac.id}
                  onClick={() => loadFacultyDiff(fac)}
                  className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFaculty?.id === fac.id
                      ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={fac.profile_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 truncate text-sm">{fac.full_name}</span>
                        <StatusBadge status={fac.status} />
                      </div>
                      <p className="text-xs text-slate-600 truncate">{fac.designation}</p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {fac.department_name} ({fac.department_short_name})
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Diff Review and Decision Bar */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            {selectedFaculty ? (
              <>
                {/* Decision Action Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                      Reviewing Submission
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 mt-1">
                      {selectedFaculty.full_name}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Employee Code: <code className="font-mono">{selectedFaculty.employee_id}</code> • {selectedFaculty.department_name}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={processing}
                      onClick={() => setRejectModalOpen(true)}
                      className="px-3.5 py-2 rounded-xl border border-rose-300 text-rose-700 bg-rose-50 hover:bg-rose-100 font-semibold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      Request Revision
                    </button>

                    <button
                      type="button"
                      disabled={processing}
                      onClick={() => setApproveModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {processing ? 'Publishing...' : 'Approve & Publish'}
                    </button>
                  </div>
                </div>

                {/* Diff Viewer */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-700" />
                    Comparison vs Previous Approved Version
                  </h3>

                  {loadingVersion ? (
                    <div className="py-12 text-center text-slate-400 text-xs">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent mx-auto mb-2" />
                      Loading version diff comparison...
                    </div>
                  ) : recentVersion ? (
                    <DiffViewer
                      oldData={recentVersion.old_data}
                      newData={recentVersion.new_data || selectedFaculty}
                    />
                  ) : (
                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                      No previous version snapshot available. Reviewing new faculty profile submission.
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="py-24 text-center text-slate-400 text-xs">
                Select a pending faculty submission from the list to review changes.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reject & Request Revision Modal */}
      <Modal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        title="Request Faculty Profile Revisions"
      >
        <form onSubmit={handleReject} className="space-y-4">
          <p className="text-xs text-slate-600">
            Please specify why this profile submission cannot be approved yet.
            Your feedback will be logged in the version history and displayed directly on the faculty member's dashboard.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Feedback & Rejection Reason *
            </label>
            <textarea
              required
              rows={4}
              value={rejectionReason}
              onChange={e => setRejectionReason(e.target.value)}
              placeholder="e.g. Please add your DOI numbers for Journal publications and ensure official institute email is verified."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setRejectModalOpen(false)}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing || !rejectionReason.trim()}
              className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold disabled:opacity-50"
            >
              {processing ? 'Saving...' : 'Send Feedback to Faculty'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Approve & Publish Confirmation Modal */}
      <Modal
        isOpen={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        title="Confirm Profile Approval & Publication"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950 space-y-1">
              <p className="font-bold text-sm">Publish updates to live website?</p>
              <p>
                You are about to approve and publish submitted profile changes for <strong>{selectedFaculty?.full_name}</strong> ({selectedFaculty?.designation}, {selectedFaculty?.department_name}).
              </p>
              <p className="text-[11px] text-emerald-800">
                This will update the live public faculty profile and record an entry in the system audit log.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setApproveModalOpen(false)}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={processing}
              onClick={executeApprove}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              {processing ? 'Publishing...' : 'Confirm & Publish Live'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
