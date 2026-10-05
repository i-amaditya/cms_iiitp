import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { ShieldCheck, Lock, Mail, ArrowRight, ShieldAlert } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onSwitchToFaculty: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onSwitchToFaculty }) => {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('admin@iiitp.ac.in');
  const [password, setPassword] = useState('Admin@IIITP2026');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(identifier, password);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded-2xl border border-slate-200 shadow-xl">
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">IIIT Pune CMS Administration</h2>
        <p className="text-xs text-slate-500 mt-1">
          Website Administrator & Governance Portal
        </p>
      </div>

      {error && (
        <div className="p-3 mb-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Administrator Username or Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="admin@iiitp.ac.in"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-lg bg-blue-900 text-white font-semibold text-sm hover:bg-blue-800 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In as Administrator'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Pre-fill helper */}
      <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-600 space-y-3">
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="font-bold text-blue-900 mb-1">Seed Admin Account:</p>
          <p className="text-[11px] text-blue-800">Email: <code className="font-mono font-bold">admin@iiitp.ac.in</code></p>
          <p className="text-[11px] text-blue-800">Password: <code className="font-mono font-bold">Admin@IIITP2026</code></p>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToFaculty}
            className="text-xs text-purple-700 hover:underline font-semibold"
          >
            Are you a faculty member? Switch to Faculty Login →
          </button>
        </div>
      </div>
    </div>
  );
};
