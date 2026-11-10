import React, { useState, useEffect } from 'react';
import { X, Database, Users, GraduationCap, Mail, RefreshCw, MessageCircle, CheckCircle, Clock } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academy';
import { academyStore } from '../services/academyStore';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'trial' | 'tutors' | 'contact'>('trial');
  const [trialRequests, setTrialRequests] = useState<any[]>([]);
  const [tutorApplications, setTutorApplications] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [trials, tutors, messages] = await Promise.all([
        academyStore.getTrialRequests(),
        academyStore.getTutorApplications(),
        academyStore.getContactMessages(),
      ]);

      setTrialRequests(trials);
      setTutorApplications(tutors);
      setContactMessages(messages);
    } catch (err) {
      console.error('Failed to fetch admin registry data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-emerald-700/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border-b border-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/90 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">
                Abdullah Quran Academy — Data Registry Portal
              </h3>
              <p className="text-xs text-emerald-400">
                Administrator Live Database Records · Lahore, Pakistan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              title="Refresh database"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center gap-2 p-3 bg-stone-950 border-b border-stone-800 text-xs">
          <button
            onClick={() => setActiveTab('trial')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'trial'
                ? 'bg-amber-400 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Trial Class Requests ({trialRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('tutors')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'tutors'
                ? 'bg-amber-400 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Tutor Applications ({tutorApplications.length})
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-amber-400 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Contact Inquiries ({contactMessages.length})
          </button>
        </div>

        {/* Body Container */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Tab 1: Trial Class Requests */}
          {activeTab === 'trial' && (
            <div className="space-y-3">
              {trialRequests.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs">
                  No trial class requests recorded yet. Fill out the "Free Trial Class" form to see live entries appear here.
                </div>
              ) : (
                trialRequests.map((req) => (
                  <div key={req.id} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{req.studentName}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[11px] border border-emerald-800">
                        {req.id}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-stone-300">
                      <div>
                        <span className="text-stone-500 block">Course</span>
                        <span className="text-amber-400 font-medium">{req.course}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">WhatsApp</span>
                        <span className="text-stone-200">{req.whatsapp}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Preferred Time</span>
                        <span className="text-stone-200">{req.preferredTime}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Country</span>
                        <span className="text-stone-200">{req.country || 'N/A'}</span>
                      </div>
                    </div>
                    {req.message && (
                      <p className="text-stone-400 text-[11px] bg-stone-900/60 p-2 rounded">
                        Note: {req.message}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-1 text-[11px] text-stone-500">
                      <span>Submitted: {new Date(req.submittedAt).toLocaleString()}</span>
                      <a
                        href={`https://wa.me/${req.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Assalam o Alaikum ${req.studentName}. This is Abdullah from Abdullah Quran Academy regarding your trial class for ${req.course}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 font-semibold"
                      >
                        Reply via WhatsApp →
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 2: Tutor Applications */}
          {activeTab === 'tutors' && (
            <div className="space-y-3">
              {tutorApplications.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs">
                  No tutor applications submitted yet. Fill out the "Become a Tutor" form to see live submissions here.
                </div>
              ) : (
                tutorApplications.map((app) => (
                  <div key={app.id} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{app.fullName} ({app.gender})</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[11px] border border-emerald-800">
                        {app.id}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-stone-300">
                      <div>
                        <span className="text-stone-500 block">WhatsApp</span>
                        <span className="text-stone-200">{app.whatsapp}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Location</span>
                        <span className="text-stone-200">{app.city}, {app.country}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Experience</span>
                        <span className="text-amber-400 font-medium">{app.experience}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Languages</span>
                        <span className="text-stone-200">{Array.isArray(app.languages) ? app.languages.join(', ') : app.languages}</span>
                      </div>
                    </div>
                    <div className="p-2 rounded bg-stone-900/60 text-[11px] text-stone-300">
                      <strong className="text-amber-300">Qualifications:</strong> {app.qualifications}
                    </div>
                    <div className="p-2 rounded bg-stone-900/60 text-[11px] text-stone-300">
                      <strong className="text-amber-300">Courses to Teach:</strong> {Array.isArray(app.courses) ? app.courses.join(' · ') : app.courses}
                    </div>
                    {app.introduction && (
                      <p className="text-stone-400 text-[11px] italic">
                        "{app.introduction}"
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-1 text-[11px] text-stone-500">
                      <span>Submitted: {new Date(app.submittedAt).toLocaleString()}</span>
                      <a
                        href={`https://wa.me/${app.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Assalam o Alaikum ${app.fullName}. This is Abdullah from Abdullah Quran Academy regarding your tutor application (Ref: ${app.id}).`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 font-semibold"
                      >
                        Contact Applicant on WhatsApp →
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 3: Contact Inquiries */}
          {activeTab === 'contact' && (
            <div className="space-y-3">
              {contactMessages.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs">
                  No contact messages received yet.
                </div>
              ) : (
                contactMessages.map((msg) => (
                  <div key={msg.id} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{msg.name}</span>
                      <span className="text-[11px] text-stone-500">{new Date(msg.submittedAt).toLocaleString()}</span>
                    </div>
                    <div className="text-stone-400 text-xs">
                      <span>WhatsApp: <strong className="text-stone-200">{msg.whatsapp}</strong></span>
                      {msg.email && <span className="ml-3">Email: {msg.email}</span>}
                    </div>
                    <p className="p-2 rounded bg-stone-900 text-stone-300 text-xs">
                      "{msg.message}"
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>Backend: Express.js Persistent Storage (/data/*.json)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 text-stone-200 hover:text-white"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};
