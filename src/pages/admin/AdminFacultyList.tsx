import React, { useState, useEffect } from 'react';
import { Faculty, Department } from '../../types/index.ts';
import { api } from '../../utils/api.ts';
import { StatusBadge } from '../../components/Badge.tsx';
import { Modal } from '../../components/Modal.tsx';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ArrowUpDown,
  CheckCircle,
  XCircle,
  Eye,
  ExternalLink,
  KeyRound,
  Filter,
  ArrowUp,
  ArrowDown,
  AlertCircle
} from 'lucide-react';

interface AdminFacultyListProps {
  onNavigate: (tab: string, param?: any) => void;
}

export const AdminFacultyList: React.FC<AdminFacultyListProps> = ({ onNavigate }) => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isReordering, setIsReordering] = useState(false);
  const [reorderList, setReorderList] = useState<Faculty[]>([]);
  const [savingReorder, setSavingReorder] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState<Faculty | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedDept) params.append('departmentId', selectedDept);
      if (selectedStatus) params.append('status', selectedStatus);

      const [facData, deptData] = await Promise.all([
        api.get<Faculty[]>(`/api/admin/faculty?${params.toString()}`),
        api.get<Department[]>('/api/admin/departments')
      ]);

      setFaculty(facData);
      setReorderList(facData);
      setDepartments(deptData);
    } catch (err) {
      console.error('Failed to load faculty list', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, [selectedDept, selectedStatus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFaculty();
  };

  const handleToggleStatus = async (fac: Faculty) => {
    const nextStatus = fac.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      await api.put(`/api/admin/faculty/${fac.id}`, {
        status: nextStatus,
        is_active: nextStatus === 'PUBLISHED' ? true : fac.is_active
      });
      setActionFeedback({
        type: 'success',
        text: `Status for "${fac.full_name}" changed to ${nextStatus}.`
      });
      setTimeout(() => setActionFeedback(null), 5000);
      fetchFaculty();
    } catch (err: any) {
      setActionFeedback({
        type: 'error',
        text: `Status update failed: ${err.message}`
      });
    }
  };

  const confirmDeleteFaculty = async () => {
    if (!facultyToDelete) return;
    try {
      setDeleting(true);
      await api.delete(`/api/admin/faculty/${facultyToDelete.id}`);
      setActionFeedback({
        type: 'success',
        text: `Faculty member "${facultyToDelete.full_name}" was permanently removed.`
      });
      setFacultyToDelete(null);
      setTimeout(() => setActionFeedback(null), 5000);
      fetchFaculty();
    } catch (err: any) {
      setActionFeedback({
        type: 'error',
        text: `Deletion failed: ${err.message}`
      });
    } finally {
      setDeleting(false);
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= reorderList.length) return;

    const updated = [...reorderList];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIdx, 0, moved);
    setReorderList(updated);
  };

  const saveReorder = async () => {
    try {
      setSavingReorder(true);
      const orderedIds = reorderList.map(f => f.id);
      await api.post('/api/admin/faculty/reorder', { orderedIds });
      setIsReordering(false);
      setActionFeedback({
        type: 'success',
        text: 'Faculty display order updated successfully.'
      });
      setTimeout(() => setActionFeedback(null), 5000);
      fetchFaculty();
    } catch (err: any) {
      setActionFeedback({
        type: 'error',
        text: `Failed to save reordering: ${err.message}`
      });
    } finally {
      setSavingReorder(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Faculty Directory Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Add, update, reorder, publish/unpublish, and govern all institute faculty profiles.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!isReordering ? (
            <button
              onClick={() => setIsReordering(true)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors shadow-xs flex items-center gap-1.5"
            >
              <ArrowUpDown className="w-4 h-4 text-slate-500" />
              Reorder Faculty Display
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsReordering(false)}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-600 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                disabled={savingReorder}
                onClick={saveReorder}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs flex items-center gap-1.5"
              >
                {savingReorder ? 'Saving...' : 'Save Display Order'}
              </button>
            </div>
          )}

          <button
            onClick={() => onNavigate('admin-faculty-create')}
            className="px-4 py-2 rounded-xl bg-blue-900 text-white font-semibold text-xs hover:bg-blue-800 transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Add Faculty Profile
          </button>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionFeedback && (
        <div className={`p-4 rounded-xl border text-xs flex items-center gap-2 shadow-xs ${
          actionFeedback.type === 'success'
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
            : 'bg-rose-50 border-rose-300 text-rose-900'
        }`}>
          {actionFeedback.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span className="font-semibold">{actionFeedback.text}</span>
        </div>
      )}

      {/* Reordering Mode Active Banner */}
      {isReordering && (
        <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950 text-xs flex items-center justify-between shadow-xs">
          <div>
            <span className="font-bold">Reordering Mode Active:</span> Use the Up / Down arrows to adjust the
            official public display order of faculty on the website, then click "Save Display Order".
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by faculty name, employee code, or email..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white text-slate-700"
            >
              <option value="">All Departments</option>
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.short_name})</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white text-slate-700"
            >
              <option value="">All Workflow Statuses</option>
              <option value="PUBLISHED">PUBLISHED</option>
              <option value="PENDING_APPROVAL">PENDING_APPROVAL</option>
              <option value="DRAFT">DRAFT</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>
        </form>
      </div>

      {/* Faculty Table / Reorder List */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-3" />
          <p className="text-slate-500 text-sm">Loading faculty records...</p>
        </div>
      ) : faculty.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <Filter className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">No faculty records match criteria</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting the department or status filters.</p>
        </div>
      ) : isReordering ? (
        /* Reorder List View */
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
          {reorderList.map((fac, idx) => (
            <div key={fac.id} className="p-3.5 flex items-center justify-between gap-4 hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-xs bg-slate-100 px-2.5 py-1 rounded text-slate-700">
                  #{idx + 1}
                </span>
                <img
                  src={fac.profile_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{fac.full_name}</h4>
                  <p className="text-xs text-slate-500">{fac.designation} • {fac.department_short_name}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={idx === 0}
                  onClick={() => moveItem(idx, 'up')}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4 text-slate-700" />
                </button>
                <button
                  disabled={idx === reorderList.length - 1}
                  onClick={() => moveItem(idx, 'down')}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4 text-slate-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Standard Management Table */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Faculty Member</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Designation</th>
                  <th className="py-3 px-4">Account Linked</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {faculty.map((fac) => (
                  <tr key={fac.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Faculty Name & Photo */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={fac.profile_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                          alt={fac.full_name}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80';
                          }}
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 truncate flex items-center gap-1.5">
                            <span>{fac.full_name}</span>
                            <span className="font-mono text-[10px] text-slate-500 font-normal">
                              ({fac.employee_id})
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">{fac.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800">
                        {fac.department_name}
                      </span>
                      <span className="block text-[11px] text-slate-400 font-mono">
                        {fac.department_short_name}
                      </span>
                    </td>

                    {/* Designation */}
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {fac.designation}
                    </td>

                    {/* Assigned Login Account */}
                    <td className="py-3.5 px-4">
                      {fac.assigned_user || fac.user_id ? (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <KeyRound className="w-3 h-3 text-emerald-600" />
                            {fac.assigned_user?.username || fac.user_username}
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => onNavigate('admin-users')}
                          className="text-[11px] text-amber-700 hover:underline font-semibold"
                        >
                          + Link User Account
                        </button>
                      )}
                    </td>

                    {/* Status Badge & Toggle */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <StatusBadge status={fac.status} />
                        <button
                          onClick={() => handleToggleStatus(fac)}
                          className="block text-[10px] text-blue-700 hover:underline font-medium"
                        >
                          {fac.status === 'PUBLISHED' ? 'Unpublish to Draft' : 'Publish to Live'}
                        </button>
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onNavigate('admin-faculty-edit', fac.id)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                          title="Edit Faculty Profile"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onNavigate('public-detail', fac.profile_slug)}
                          className="p-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 text-blue-700 transition-colors"
                          title="Preview Live Profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setFacultyToDelete(fac)}
                          className="p-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-700 transition-colors"
                          title="Delete Faculty Profile"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Faculty Confirmation Modal */}
      <Modal
        isOpen={Boolean(facultyToDelete)}
        onClose={() => setFacultyToDelete(null)}
        title="Confirm Faculty Profile Deletion"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-1">
            <p className="font-bold text-sm">Permanently delete this faculty profile?</p>
            <p>
              Are you sure you want to permanently delete <strong>{facultyToDelete?.full_name}</strong> (Employee ID: {facultyToDelete?.employee_id})?
            </p>
            <p className="text-[11px] text-rose-800">
              This action will remove their profile, educational history, publications, and patents from the database.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setFacultyToDelete(null)}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={deleting}
              onClick={confirmDeleteFaculty}
              className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? 'Deleting...' : 'Delete Permanently'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
