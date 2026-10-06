import React, { useState } from 'react';
import { KeyRound, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';
import { api } from '../../utils/api.ts';

export const ForcePasswordChange: React.FC = () => {
  const { user, refreshUser, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (newPassword.length < 12) {
      setError('Choose a password with at least 12 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('The new passwords do not match.');
      return;
    }

    setSaving(true);
    try {
      await api.post('/api/auth/change-password', { currentPassword, newPassword });
      await refreshUser();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password change failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mx-auto my-12 max-w-lg rounded-2xl border border-slate-200 bg-white p-7 shadow-xl sm:p-9">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-900">
        <ShieldCheck className="h-7 w-7" />
      </div>
      <h1 className="text-center text-2xl font-black text-slate-900">Set your password</h1>
      <p className="mt-2 text-center text-sm leading-relaxed text-slate-600">
        Your faculty account is linked to <strong>{user?.email}</strong>. For security, replace the temporary password before continuing.
      </p>

      {error && (
        <div role="alert" className="mt-5 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wide text-slate-700">
          Temporary password
          <input
            type="password"
            required
            autoComplete="current-password"
            value={currentPassword}
            onChange={event => setCurrentPassword(event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-normal normal-case focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </label>
        <label className="block text-xs font-bold uppercase tracking-wide text-slate-700">
          New password
          <input
            type="password"
            required
            minLength={12}
            autoComplete="new-password"
            value={newPassword}
            onChange={event => setNewPassword(event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-normal normal-case focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </label>
        <label className="block text-xs font-bold uppercase tracking-wide text-slate-700">
          Confirm new password
          <input
            type="password"
            required
            minLength={12}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-normal normal-case focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </label>
        <button
          type="submit"
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-900 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-800 disabled:opacity-50"
        >
          <KeyRound className="h-4 w-4" />
          {saving ? 'Saving password…' : 'Change password and continue'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => void logout()}
        className="mx-auto mt-5 flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
      >
        <LogOut className="h-3.5 w-3.5" />
        Sign out
      </button>
    </section>
  );
};
