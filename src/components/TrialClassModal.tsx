import React, { useState, useEffect } from 'react';
import { X, Sparkles, Send, CheckCircle2, MessageCircle, AlertCircle, Calendar, User, Clock, Globe } from 'lucide-react';
import { COURSES } from '../data/courses';
import { ACADEMY_INFO, getWhatsAppLink } from '../data/academy';
import { academyStore } from '../services/academyStore';

interface TrialClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedCourseId?: string;
  preSelectedTutorName?: string;
}

export const TrialClassModal: React.FC<TrialClassModalProps> = ({
  isOpen,
  onClose,
  preSelectedCourseId,
  preSelectedTutorName,
}) => {
  const [studentName, setStudentName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [country, setCountry] = useState('Pakistan');
  const [course, setCourse] = useState('Noorani Qaida');
  const [preferredTime, setPreferredTime] = useState('Evening (5:00 PM - 9:00 PM)');
  const [message, setMessage] = useState('');
  const [assignedTutor, setAssignedTutor] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    studentName: string;
    course: string;
    whatsapp: string;
  } | null>(null);

  useEffect(() => {
    if (preSelectedCourseId) {
      const match = COURSES.find((c) => c.id === preSelectedCourseId);
      if (match) {
        setCourse(match.title);
      }
    }
    if (preSelectedTutorName) {
      setAssignedTutor(preSelectedTutorName);
    }
  }, [preSelectedCourseId, preSelectedTutorName, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!studentName.trim() || !whatsapp.trim() || !course) {
      setErrorMsg('Please enter student name, WhatsApp number, and select a course.');
      return;
    }

    setLoading(true);

    try {
      const saved = await academyStore.saveTrialRequest({
        studentName,
        whatsapp,
        country,
        course,
        preferredTime,
        message,
        assignedTutor: assignedTutor || null,
      });

      setSubmittedData({
        id: saved.id,
        studentName: saved.studentName,
        course: saved.course,
        whatsapp: saved.whatsapp,
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while saving trial request.');
    } finally {
      setLoading(false);
    }
  };

  const handleForwardWhatsApp = () => {
    if (!submittedData) return;
    const msg = `Assalam o Alaikum Abdullah Quran Academy. I have requested a Free Trial Class (Ref: ${submittedData.id}).\n\nStudent Name: ${studentName}\nWhatsApp: ${whatsapp}\nCountry: ${country}\nCourse: ${course}\nPreferred Time: ${preferredTime}${assignedTutor ? `\nPreferred Tutor: ${assignedTutor}` : ''}${message ? `\nNotes: ${message}` : ''}\n\nPlease confirm our trial session time.`;
    const url = `https://wa.me/${ACADEMY_INFO.whatsappRaw}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleResetAndClose = () => {
    setSubmittedData(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-stone-900 border border-emerald-700/60 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border-b border-emerald-800 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/80 text-emerald-300 text-[11px] font-semibold mb-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>3-Day Complimentary Trial · No Credit Card Required</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Request a Free Trial Class
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              {assignedTutor ? `Tutor Preference: ${assignedTutor}` : 'Experience our 1-on-1 Quran tutoring with dedicated faculty'}
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {submittedData ? (
            <div className="text-center space-y-5 py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-900/90 border border-amber-400 flex items-center justify-center mx-auto text-amber-300">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="space-y-1">
                <h4 className="font-heading text-xl font-bold text-white">Trial Request Received!</h4>
                <p className="text-xs text-stone-300">
                  JazakAllah Khair! We have registered the trial session for <strong className="text-amber-400">{submittedData.studentName}</strong> in <strong className="text-white">{submittedData.course}</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-left space-y-1 max-w-sm mx-auto text-stone-300">
                <div className="flex justify-between">
                  <span className="text-stone-500">Request Number:</span>
                  <span className="font-mono text-amber-400 font-bold">{submittedData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Contact Number:</span>
                  <span className="text-stone-200">{submittedData.whatsapp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Status:</span>
                  <span className="text-emerald-400 font-medium">Recorded in Academy Database</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-xs text-stone-400">
                  Connect immediately with Founder Abdullah on WhatsApp to finalize your class time:
                </p>
                <button
                  onClick={handleForwardWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation via WhatsApp (+92 310 7565285)</span>
                </button>
              </div>

              <button
                onClick={handleResetAndClose}
                className="text-xs text-stone-400 hover:text-white underline pt-2 cursor-pointer"
              >
                Done / Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Student Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Student Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zaid / Ayesha"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* WhatsApp Number & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    WhatsApp Number <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +92 310 7565285"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pakistan, UK, USA, UAE"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Preferred Course */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Preferred Course <span className="text-amber-400">*</span>
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-sm focus:outline-none focus:border-amber-400"
                >
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title} — {c.subtitle}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Class Time */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Preferred Class Time & Timezone
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="Morning (7:00 AM - 12:00 PM)">Morning Shift (7:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon Shift (1:00 PM - 5:00 PM)</option>
                  <option value="Evening (5:00 PM - 9:00 PM)">Evening Shift (5:00 PM - 9:00 PM)</option>
                  <option value="Night (9:00 PM - 1:00 AM)">Night Shift (9:00 PM - 1:00 AM)</option>
                  <option value="Weekends Only">Weekends (Saturday & Sunday)</option>
                  <option value="Flexible Schedule">Flexible / Mutual Agreement</option>
                </select>
              </div>

              {/* Message / Age / Special Requirements */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Message / Student Age / Requirements
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Student is 8 years old, absolute beginner. Prefer a female tutor for evening hours."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Registering in Academy Database...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-stone-950" />
                      <span>Request a Free Trial Class</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-stone-500 text-center mt-1.5">
                  No credit card required · Free 3-day trial · Cancel anytime
                </p>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
