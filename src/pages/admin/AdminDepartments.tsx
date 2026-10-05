import React, { useState, useEffect } from 'react';
import { Department } from '../../types/index.ts';
import { api } from '../../utils/api.ts';
import { Modal } from '../../components/Modal.tsx';
import { Building2, Plus, Edit, Trash2, CheckCircle2, XCircle } from 'lucide-react';

export const AdminDepartments: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    short_name: '',
    slug: '',
    description: '',
    display_order: 1,
    is_active: true
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deptToDelete, setDeptToDelete] = useState<Department | null>(null);
  const [deletingDept, setDeletingDept] = useState(false);
  const [bannerFeedback, setBannerFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const data = await api.get<Department[]>('/api/admin/departments');
      setDepartments(data);
    } catch (err) {
      console.error('Failed to load departments', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const openCreateModal = () => {
    setEditingDept(null);
    setFormData({
      name: '',
      short_name: '',
      slug: '',
      description: '',
      display_order: departments.length + 1,
      is_active: true
    });
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (d: Department) => {
    setEditingDept(d);
    setFormData({
      name: d.name,
      short_name: d.short_name,
      slug: d.slug,
      description: d.description || '',
      display_order: d.display_order,
      is_active: Boolean(d.is_active)
    });
    setError(null);
    setModalOpen(true);
  };

  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    setFormData(prev => ({
      ...prev,
      name,
      slug: editingDept ? prev.slug : slug
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      if (editingDept) {
        await api.put(`/api/admin/departments/${editingDept.id}`, formData);
        setBannerFeedback({
          type: 'success',
          text: `Department "${formData.name}" updated successfully.`
        });
      } else {
        await api.post('/api/admin/departments', formData);
        setBannerFeedback({
          type: 'success',
          text: `Department "${formData.name}" created successfully.`
        });
      }
      setTimeout(() => setBannerFeedback(null), 5000);
      setModalOpen(false);
      fetchDepartments();
    } catch (err: any) {
      setError(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (d: Department) => {
    if (d.faculty_count && d.faculty_count > 0) {
      setBannerFeedback({
        type: 'error',
        text: `Cannot delete "${d.name}": It currently has ${d.faculty_count} faculty assigned.`
      });
      setTimeout(() => setBannerFeedback(null), 5000);
      return;
    }
    setDeptToDelete(d);
  };

  const confirmDeleteDept = async () => {
    if (!deptToDelete) return;
    try {
      setDeletingDept(true);
      await api.delete(`/api/admin/departments/${deptToDelete.id}`);
      setBannerFeedback({
        type: 'success',
        text: `Department "${deptToDelete.name}" was successfully deleted.`
      });
      setDeptToDelete(null);
      setTimeout(() => setBannerFeedback(null), 5000);
      fetchDepartments();
    } catch (err: any) {
      setBannerFeedback({
        type: 'error',
        text: `Delete failed: ${err.message}`
      });
    } finally {
      setDeletingDept(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Academic Departments Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Normalized departments table reusable by Faculty, Students, Notices, and Programs.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2 rounded-xl bg-blue-900 text-white font-semibold text-xs hover:bg-blue-800 transition-colors shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Add Department
        </button>
      </div>

      {bannerFeedback && (
        <div className={`p-4 rounded-xl border text-xs flex items-center gap-2 shadow-xs ${
          bannerFeedback.type === 'success'
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
            : 'bg-rose-50 border-rose-300 text-rose-900'
        }`}>
          {bannerFeedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span className="font-semibold">{bannerFeedback.text}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-3" />
          <p className="text-slate-500 text-sm">Loading departments...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Department Name</th>
                <th className="py-3 px-4">Code / Slug</th>
                <th className="py-3 px-4">Active Faculty</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {departments.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-500">
                    #{d.display_order}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 text-sm">{d.name}</div>
                    {d.description && (
                      <p className="text-[11px] text-slate-500 line-clamp-1 max-w-md">{d.description}</p>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {d.short_name}
                    </span>
                    <span className="block text-[11px] text-slate-400 font-mono mt-0.5">
                      /faculty?department={d.slug}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    {d.faculty_count || 0} members
                  </td>
                  <td className="py-3.5 px-4">
                    {d.is_active ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        <XCircle className="w-3 h-3 text-slate-400" />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(d)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700"
                        title="Edit Department"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(d)}
                        className="p-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-700"
                        title="Delete Department"
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
      )}

      {/* Modal for Create/Edit */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingDept ? 'Edit Academic Department' : 'Create New Academic Department'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Full Department Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => handleNameChange(e.target.value)}
              placeholder="e.g. Computer Science & Engineering"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Short Name / Acronym *
              </label>
              <input
                type="text"
                required
                value={formData.short_name}
                onChange={e => setFormData({ ...formData, short_name: e.target.value })}
                placeholder="e.g. CSE"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                placeholder="cse"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Description & Mission
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Overview of research disciplines and degrees offered..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Display Order Priority
              </label>
              <input
                type="number"
                value={formData.display_order}
                onChange={e => setFormData({ ...formData, display_order: parseInt(e.target.value, 10) || 1 })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>Active on Public Website</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold"
            >
              {saving ? 'Saving...' : (editingDept ? 'Update Department' : 'Create Department')}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Department Confirmation Modal */}
      <Modal
        isOpen={Boolean(deptToDelete)}
        onClose={() => setDeptToDelete(null)}
        title="Confirm Department Deletion"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-1">
            <p className="font-bold text-sm">Delete academic department?</p>
            <p>
              Are you sure you want to permanently delete department <strong>{deptToDelete?.name}</strong> ({deptToDelete?.short_name})?
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setDeptToDelete(null)}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={deletingDept}
              onClick={confirmDeleteDept}
              className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              {deletingDept ? 'Deleting...' : 'Delete Department'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
