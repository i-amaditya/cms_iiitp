import React, { useState, useEffect } from 'react';
import { AuditLog } from '../../types/index.ts';
import { api } from '../../utils/api.ts';
import { Modal } from '../../components/Modal.tsx';
import { Activity, Search, Eye, Filter, RefreshCw } from 'lucide-react';

export const AdminAuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const actions = [
    'LOGIN',
    'LOGOUT',
    'PROFILE_CREATED',
    'PROFILE_EDITED_BY_FACULTY',
    'PROFILE_EDITED_BY_ADMIN',
    'PROFILE_SUBMITTED',
    'PROFILE_APPROVED',
    'PROFILE_REJECTED',
    'PROFILE_DELETED',
    'USER_CREATED',
    'USER_UPDATED',
    'USER_PASSWORD_RESET',
    'DEPARTMENT_CREATED',
    'DEPARTMENT_UPDATED',
    'DEPARTMENT_DELETED'
  ];

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedAction) params.append('action', selectedAction);
      params.append('limit', '50');

      const data = await api.get<{ logs: AuditLog[]; total: number }>(`/api/admin/audit-logs?${params.toString()}`);
      setLogs(data.logs);
      setTotal(data.total);
    } catch (err) {
      console.error('Failed to load audit logs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [selectedAction]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Security & System Audit Trails
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable log of all user authentications, profile changes, approvals, and administrative actions.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors shadow-xs flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Audit Trail
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedAction}
            onChange={e => setSelectedAction(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700 font-medium"
          >
            <option value="">All Action Types ({total} total)</option>
            {actions.map(act => (
              <option key={act} value={act}>{act}</option>
            ))}
          </select>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Showing latest {logs.length} of {total} events
        </div>
      </div>

      {/* Audit Logs Table */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-3" />
          <p className="text-slate-500 text-sm">Loading audit logs...</p>
        </div>
      ) : logs.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
          No audit entries matching filter.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Event ID / Time</th>
                  <th className="py-3 px-4">Actor (User)</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Entity</th>
                  <th className="py-3 px-4">IP Address</th>
                  <th className="py-3 px-4 text-right">Payload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-800">#{log.id}</span>
                      <span className="block text-[10px] text-slate-400 font-sans mt-0.5">
                        {log.created_at}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-sans">
                      <div className="font-bold text-slate-900">{log.username}</div>
                      {log.user_role && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">
                          {log.user_role}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded font-bold text-[10px] ${
                        log.action.includes('APPROVED')
                          ? 'bg-emerald-100 text-emerald-800'
                          : log.action.includes('REJECTED')
                          ? 'bg-rose-100 text-rose-800'
                          : log.action.includes('SUBMITTED')
                          ? 'bg-amber-100 text-amber-900'
                          : log.action.includes('LOGIN')
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {log.action}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-600 font-sans">
                      <span className="font-semibold">{log.entity_type}</span>
                      {log.entity_id && <span className="text-slate-400 ml-1">#{log.entity_id}</span>}
                    </td>

                    <td className="py-3 px-4 text-slate-500">
                      {log.ip_address || '127.0.0.1'}
                    </td>

                    <td className="py-3 px-4 text-right font-sans">
                      {(log.old_value || log.new_value) && (
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="px-2.5 py-1 rounded-md border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs inline-flex items-center gap-1 font-sans"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inspect Payload Modal */}
      <Modal
        isOpen={Boolean(selectedLog)}
        onClose={() => setSelectedLog(null)}
        title={`Audit Event Details: #${selectedLog?.id} (${selectedLog?.action})`}
        maxWidth="max-w-2xl"
      >
        {selectedLog && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <span className="font-bold text-slate-600 block">User:</span>
                <span>{selectedLog.username} ({selectedLog.user_role || 'System'})</span>
              </div>
              <div>
                <span className="font-bold text-slate-600 block">Timestamp:</span>
                <span>{selectedLog.created_at}</span>
              </div>
              <div>
                <span className="font-bold text-slate-600 block">Entity:</span>
                <span>{selectedLog.entity_type} #{selectedLog.entity_id || 'N/A'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-600 block">Client IP / Agent:</span>
                <span className="truncate block" title={selectedLog.user_agent || ''}>{selectedLog.ip_address}</span>
              </div>
            </div>

            {selectedLog.old_value && (
              <div>
                <span className="font-bold text-slate-700 block mb-1">Previous State (Old Value):</span>
                <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto text-[11px] font-mono">
                  {JSON.stringify(selectedLog.old_value, null, 2)}
                </pre>
              </div>
            )}

            {selectedLog.new_value && (
              <div>
                <span className="font-bold text-slate-700 block mb-1">Updated State (New Value):</span>
                <pre className="bg-slate-900 text-emerald-400 p-3 rounded-lg overflow-x-auto text-[11px] font-mono">
                  {JSON.stringify(selectedLog.new_value, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
