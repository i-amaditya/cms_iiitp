import React from 'react';
import { Building2, ShieldCheck, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC<{ onNavigate?: (tab: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0b1b3d] text-slate-300 border-t border-blue-950 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Institute Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white tracking-wider">
                IIITP
              </div>
              <div>
                <h4 className="text-white font-bold text-base leading-snug">
                  Indian Institute of Information Technology Pune
                </h4>
                <p className="text-xs text-slate-400">
                  An Institute of National Importance under Ministry of Education, Govt. of India
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              IIIT Pune is committed to providing state-of-the-art education and research in Information Technology,
              Electronics & Communication Engineering, and cutting-edge computational sciences.
            </p>
            <div className="pt-2 text-xs space-y-1.5 text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Survey No. 25 & 27, Near Bopodi, Pune, Maharashtra - 411067</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+91 (020) 2699 3000 / 3001</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>registrar@iiitp.ac.in | faculty.recruitment@iiitp.ac.in</span>
              </div>
            </div>
          </div>

          {/* Quick Academic Links */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-3 border-b border-blue-900 pb-1.5">
              Academic Departments
            </h5>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>Computer Science & Engineering (CSE)</li>
              <li>Electronics & Communication Engineering (ECE)</li>
              <li>Applied Sciences & Humanities (ASH)</li>
              <li>Center for Artificial Intelligence & Robotics</li>
              <li>Doctoral & Research Studies</li>
            </ul>
          </div>

          {/* CMS Governance & Specs */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-3 border-b border-blue-900 pb-1.5">
              CMS Governance
            </h5>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>Role-Based Access Control (RBAC)</li>
              <li>Strict Server-Side ID Verification</li>
              <li>Immutable Audit Trails & Version Snapshots</li>
              <li>Two-Stage Approval Workflow</li>
              {onNavigate && (
                <li>
                  <button
                    onClick={() => onNavigate('docs')}
                    className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    View System Architecture & DB Spec <ExternalLink className="w-3 h-3" />
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-blue-950 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Indian Institute of Information Technology Pune. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Secured with JWT & bcrypt</span>
            <span>•</span>
            <span>MySQL / PostgreSQL Schema v1.0</span>
            <span>•</span>
            <span className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded">Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
