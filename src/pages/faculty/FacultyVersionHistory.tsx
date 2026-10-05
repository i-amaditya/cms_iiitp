import React, { useState, useEffect } from 'react';
import { ProfileVersion } from '../../types/index.ts';
import { api } from '../../utils/api.ts';
import { StatusBadge } from '../../components/Badge.tsx';
import { DiffViewer } from '../../components/DiffViewer.tsx';
import { ArrowLeft, Clock, ShieldCheck, AlertCircle, Eye, GitCommit } from 'lucide-react';

interface FacultyVersionHistoryProps {
  onBack: () => void;
  facultyId?: number; // Optional for admin viewing
}

export const FacultyVersionHistory: React.FC<FacultyVersionHistoryProps> = ({ onBack, facultyId }) => {
  const [history, setHistory] = useState<ProfileVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState<ProfileVersion | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const endpoint = facultyId
          ? `/api/admin/faculty/${facultyId}/history`
          : '/api/faculty/me/history';
        const data = await api.get<ProfileVersion[]>(endpoint);
        setHistory(data);
      } catch (err) {
        console.error('Failed to load version history', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [facultyId]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent mb-3" />
        <p className="text-slate-500 text-sm">Loading version history & change audit...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Profile Change & Audit History
          </h1>
          <p className="text-xs text-slate-500">
            Immutable log of all draft updates, submissions, administrator approvals, and revisions.
          </p>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No revisions recorded yet</h3>
          <p className="text-xs text-slate-500 mt-1">
            Whenever you submit or modify your profile, a new version snapshot is saved here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* History List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Revision Timeline ({history.length} snapshots)
            </h3>
            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {history.map((ver) => (
                <div
                  key={ver.id}
                  onClick={() => setSelectedVersion(ver)}
                  className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedVersion?.id === ver.id
                      ? 'border-purple-600 bg-purple-50/50 ring-2 ring-purple-600/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono font-bold text-slate-800 text-[11px] flex items-center gap-1.5">
                      <GitCommit className="w-3.5 h-3.5 text-purple-700" />
                      Snapshot #{ver.id}
                    </span>
                    <StatusBadge status={ver.status} />
                  </div>

                  <div className="space-y-1 text-slate-600">
                    <p className="font-semibold text-slate-800">
                      {ver.change_type.replace(/_/g, ' ')}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Changed By: <span className="font-medium text-slate-700">{ver.changed_by_name}</span>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Timestamp: {ver.created_at || ver.submitted_at}
                    </p>

                    {ver.approved_by && (
                      <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Approved by {ver.approved_by_name || 'Admin'} at {ver.approved_at}
                      </p>
                    )}

                    {ver.rejection_reason && (
                      <p className="text-[11px] text-rose-700 font-medium bg-rose-50 p-2 rounded border border-rose-200 mt-1">
                        Feedback: "{ver.rejection_reason}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diff Viewer panel */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            {selectedVersion ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Revision Comparison #{selectedVersion.id}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Recorded on {selectedVersion.created_at} by {selectedVersion.changed_by_name}
                    </p>
                  </div>
                  <StatusBadge status={selectedVersion.status} />
                </div>

                {selectedVersion.rejection_reason && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-xs">
                    <span className="font-bold">Admin Feedback:</span> {selectedVersion.rejection_reason}
                  </div>
                )}

                <DiffViewer
                  oldData={selectedVersion.old_data}
                  newData={selectedVersion.new_data}
                />
              </div>
            ) : (
              <div className="py-24 text-center text-slate-400 text-xs">
                <Eye className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                Select a revision snapshot from the timeline on the left to inspect changed fields.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
