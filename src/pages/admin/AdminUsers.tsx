import React, { useState, useEffect } from 'react';
import { User, Faculty } from '../../types/index.ts';
import { api } from '../../utils/api.ts';
import { Modal } from '../../components/Modal.tsx';
import {
  ShieldCheck,
  Plus,
  KeyRound,
  Edit,
  CheckCircle2,
  XCircle,
  UserCheck,
  UserPlus
} from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'FACULTY' as 'SUPER_ADMIN' | 'ADMIN' | 'FACULTY',
    facultyId: ''
  });

  const [editData, setEditData] = useState({
    email: '',
    role: 'FACULTY' as 'SUPER_ADMIN' | 'ADMIN' | 'FACULTY',
    facultyId: '',
    isActive: true
  });

  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const [usersData, facultyData] = await Promise.all([
        api.get<User[]>('/api/admin/users'),
        api.get<Faculty[]>('/api/admin/faculty')
      ]);
      setUsers(usersData);
      setFacultyList(facultyData);
    } catch (err) {
      console.error('Failed to load users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openCreateModal = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'FACULTY',
      facultyId: ''
    });
    setError(null);
    setCreateModalOpen(true);
  };

  const openEditModal = (u: User) => {
    setSelectedUser(u);
    setEditData({
      email: u.email,
      role: u.role,
      facultyId: u.facultyId ? String(u.facultyId) : '',
      isActive: Boolean(u.isActive)
    });
    setError(null);
    setEditModalOpen(true);
  };

  const openResetModal = (u: User) => {
    setSelectedUser(u);
    setNewPassword('');
    setError(null);
    setResetModalOpen(true);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await api.post('/api/admin/users', {
        ...formData,
        facultyId: formData.facultyId ? parseInt(formData.facultyId, 10) : null
      });
      setCreateModalOpen(false);
      fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Creation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setError(null);
    setSaving(true);
    try {
      await api.put(`/api/admin/users/${selectedUser.id}`, {
        ...editData,
        facultyId: editData.facultyId ? parseInt(editData.facultyId, 10) : null
      });
      setEditModalOpen(false);
      fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setError(null);
    setSaving(true);
    try {
      await api.post(`/api/admin/users/${selectedUser.id}/reset-password`, {
        newPassword
      });
      setSuccessMessage(`Password for user "${selectedUser.username}" was successfully reset!`);
      setTimeout(() => setSuccessMessage(null), 5000);
      setResetModalOpen(false);
    } catch (err: any) {
      setError(err.message || 'Reset failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            User Accounts & RBAC Governance
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage administrative credentials, link faculty members to self-service accounts, and enforce roles.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2 rounded-xl bg-blue-900 text-white font-semibold text-xs hover:bg-blue-800 transition-colors shadow-xs flex items-center gap-1.5"
        >
          <UserPlus className="w-4 h-4" />
          Provision New User
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-3" />
          <p className="text-slate-500 text-sm">Loading users...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Username / Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Linked Faculty Member</th>
                <th className="py-3 px-4">Last Login</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <span>{u.username}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">{u.email}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold ${
                      u.role === 'SUPER_ADMIN'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : u.role === 'ADMIN'
                        ? 'bg-blue-100 text-blue-900 border border-blue-200'
                        : 'bg-purple-100 text-purple-900 border border-purple-200'
                    }`}>
                      {u.role}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    {u.facultyName ? (
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-800 flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5 text-purple-700" />
                          {u.facultyName}
                        </span>
                        <div className="text-[11px] text-slate-500 font-mono">
                          ID: #{u.facultyId} ({u.employeeId}) • {u.departmentShortName}
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">None (CMS Admin)</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-slate-500 text-[11px] font-mono">
                    {u.lastLogin || 'Never'}
                  </td>

                  <td className="py-3.5 px-4">
                    {u.isActive ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded">
                        <XCircle className="w-3 h-3 text-rose-600" />
                        Disabled
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openResetModal(u)}
                        className="p-1.5 rounded-lg border border-amber-200 hover:bg-amber-50 text-amber-700 transition-colors"
                        title="Reset Password"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => openEditModal(u)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                        title="Edit User"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal: Create User */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Provision New CMS User Account"
      >
        <form onSubmit={handleCreateUser} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Username *</label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={e => setFormData({ ...formData, username: e.target.value })}
              placeholder="e.g. faculty_ash or admin_dean"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="faculty@iiitp.ac.in"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Temporary Password *</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              placeholder="Minimum 6 characters"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Role *</label>
              <select
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
              >
                <option value="FACULTY">FACULTY</option>
                <option value="ADMIN">ADMIN</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Link to Faculty Member
              </label>
              <select
                value={formData.facultyId}
                onChange={e => setFormData({ ...formData, facultyId: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
              >
                <option value="">None (Administrative User)</option>
                {facultyList.map(f => (
                  <option key={f.id} value={f.id}>{f.full_name} ({f.employee_id})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold"
            >
              {saving ? 'Creating...' : 'Provision User'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Edit User */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title={`Edit User Account: ${selectedUser?.username}`}
      >
        <form onSubmit={handleEditUser} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
            <input
              type="email"
              required
              value={editData.email}
              onChange={e => setEditData({ ...editData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Role</label>
              <select
                value={editData.role}
                onChange={e => setEditData({ ...editData, role: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
              >
                <option value="FACULTY">FACULTY</option>
                <option value="ADMIN">ADMIN</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Linked Faculty</label>
              <select
                value={editData.facultyId}
                onChange={e => setEditData({ ...editData, facultyId: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
              >
                <option value="">None (Admin)</option>
                {facultyList.map(f => (
                  <option key={f.id} value={f.id}>{f.full_name} ({f.employee_id})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={editData.isActive}
                onChange={e => setEditData({ ...editData, isActive: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span>Account Is Active & Can Log In</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setEditModalOpen(false)}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold"
            >
              {saving ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Reset Password */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title={`Reset Password for: ${selectedUser?.username}`}
      >
        <form onSubmit={handleResetPassword} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {error}
            </div>
          )}

          <p className="text-xs text-slate-600">
            Enter a new password for <span className="font-bold">{selectedUser?.username}</span>.
            The password will be hashed using bcrypt (salt factor 10) and updated immediately.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              New Password *
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setResetModalOpen(false)}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !newPassword}
              className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold"
            >
              {saving ? 'Resetting...' : 'Confirm Reset Password'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
