import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { UserCheck, Lock, Mail, ArrowRight, ShieldAlert } from 'lucide-react';

interface FacultyLoginProps {
  onSuccess: () => void;
  onSwitchToAdmin: () => void;
}

export const FacultyLogin: React.FC<FacultyLoginProps> = ({ onSuccess, onSwitchToAdmin }) => {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('faculty.cse@iiitp.ac.in');
  const [password, setPassword] = useState('Faculty@IIITP2026');
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

  const handlePreFill = (email: string) => {
    setIdentifier(email);
    setPassword('Faculty@IIITP2026');
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded-2xl border border-slate-200 shadow-xl">
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-purple-100 text-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
          <UserCheck className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Faculty Self-Service Portal</h2>
        <p className="text-xs text-slate-500 mt-1">
          Indian Institute of Information Technology Pune
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
            Institute Email or Username
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="faculty.cse@iiitp.ac.in"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
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
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-lg bg-purple-900 text-white font-semibold text-sm hover:bg-purple-800 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In to Faculty Portal'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Demo Credentials Quick Switcher */}
      <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-600 space-y-2">
        <p className="font-semibold text-slate-800">Quick Test Faculty Accounts:</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handlePreFill('faculty.cse@iiitp.ac.in')}
            className="p-2 rounded bg-slate-50 hover:bg-purple-50 text-left border border-slate-200 transition-colors"
          >
            <div className="font-bold text-slate-800">Prof. Satapathy</div>
            <div className="text-[10px] text-slate-500 font-mono">faculty.cse@...</div>
          </button>
          <button
            type="button"
            onClick={() => handlePreFill('faculty.ece@iiitp.ac.in')}
            className="p-2 rounded bg-slate-50 hover:bg-purple-50 text-left border border-slate-200 transition-colors"
          >
            <div className="font-bold text-slate-800">Dr. Kulkarni</div>
            <div className="text-[10px] text-slate-500 font-mono">faculty.ece@...</div>
          </button>
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onSwitchToAdmin}
            className="text-xs text-blue-700 hover:underline font-semibold"
          >
            Are you a website administrator? Switch to Admin Login →
          </button>
        </div>
      </div>
    </div>
  );
};
