import React, { useState } from 'react';
import { UserCheck, Send, CheckCircle2, AlertCircle, MessageCircle, ShieldCheck, BookOpen, Sparkles, Loader2 } from 'lucide-react';
import { ACADEMY_INFO, getWhatsAppLink } from '../data/academy';
import { academyStore } from '../services/academyStore';

export const BecomeTutorPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    email: '',
    country: 'Pakistan',
    city: '',
    gender: 'Male',
    experience: '',
    qualifications: '',
    courses: ['Noorani Qaida', 'Quran Reading'],
    languages: 'Urdu, English',
    introduction: '',
  });

  const availableCourses = [
    'Noorani Qaida',
    'Quran Reading',
    'Quran with Tajweed',
    'Quran Memorization (Hifz)',
    'Quran Translation',
    'Islamic Studies',
  ];

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    fullName: string;
    whatsapp: string;
    submittedAt: string;
  } | null>(null);

  const handleCourseToggle = (courseName: string) => {
    setFormData((prev) => {
      const exists = prev.courses.includes(courseName);
      if (exists) {
        return { ...prev, courses: prev.courses.filter((c) => c !== courseName) };
      } else {
        return { ...prev, courses: [...prev.courses, courseName] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.fullName.trim() || !formData.whatsapp.trim() || !formData.qualifications.trim() || !formData.experience.trim()) {
      setErrorMsg('Please complete all mandatory fields: Full Name, WhatsApp Number, Qualifications, and Experience.');
      return;
    }

    setLoading(true);

    try {
      const saved = await academyStore.saveTutorApplication({
        fullName: formData.fullName,
        whatsapp: formData.whatsapp,
        email: formData.email,
        country: formData.country,
        city: formData.city,
        gender: formData.gender,
        experience: formData.experience,
        qualifications: formData.qualifications,
        courses: formData.courses,
        languages: formData.languages.split(',').map((s) => s.trim()).filter(Boolean),
        introduction: formData.introduction,
      });

      setSubmittedData({
        id: saved.id,
        fullName: saved.fullName,
        whatsapp: saved.whatsapp,
        submittedAt: new Date(saved.submittedAt).toLocaleDateString(),
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Error occurred while saving application.');
    } finally {
      setLoading(false);
    }
  };

  const handleForwardWhatsApp = () => {
    if (!submittedData) return;
    const msg = `Assalam o Alaikum Abdullah Quran Academy. I have submitted my Tutor Application (Ref: ${submittedData.id}).\n\nName: ${formData.fullName}\nWhatsApp: ${formData.whatsapp}\nCountry: ${formData.country}, ${formData.city}\nExperience: ${formData.experience}\nQualifications: ${formData.qualifications}\nCourses: ${formData.courses.join(', ')}\n\nLooking forward to the interview process.`;
    const url = `https://wa.me/${ACADEMY_INFO.whatsappRaw}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-stone-950 min-h-screen py-10 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Faculty Recruitment · Lahore Academy</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Join Our Team of <span className="gold-gradient-text">Quran Tutors</span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Are you a dedicated Qari, Hafiz, Alim, or Alimah with a calling to teach the Holy Quran to students globally? We invite qualified educators to apply.
          </p>
        </div>

        {/* Success State */}
        {submittedData ? (
          <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-stone-900 to-emerald-950/80 border border-amber-500/40 text-center space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-900/90 border border-amber-400 flex items-center justify-center mx-auto text-amber-300 shadow-lg">
              <CheckCircle2 className="w-9 h-9 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <h2 className="font-heading text-2xl font-bold text-white">Application Successfully Registered!</h2>
              <p className="text-stone-300 text-sm max-w-md mx-auto">
                JazakAllah Khair, <strong className="text-amber-400">{submittedData.fullName}</strong>. Your tutor application has been securely recorded in the Abdullah Quran Academy registry.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 max-w-md mx-auto text-left text-xs space-y-1.5 text-stone-300">
              <div className="flex justify-between">
                <span className="text-stone-500">Application Reference ID:</span>
                <span className="font-mono text-amber-300 font-bold">{submittedData.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Registered WhatsApp:</span>
                <span className="text-stone-200">{submittedData.whatsapp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Review Status:</span>
                <span className="text-emerald-400 font-medium">Pending Academy Review</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-xs text-stone-400">
                To expedite your application interview with Founder Abdullah, you can send your application summary directly to our WhatsApp recruitment desk:
              </p>

              <button
                onClick={handleForwardWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Message Recruitment on WhatsApp (+92 310 7565285)</span>
              </button>
            </div>

            <div className="pt-4 border-t border-stone-800">
              <button
                onClick={() => setSubmittedData(null)}
                className="text-xs text-stone-400 hover:text-stone-200 underline cursor-pointer"
              >
                Submit another application
              </button>
            </div>
          </div>
        ) : (
          /* Application Form */
          <div className="rounded-2xl bg-stone-900/80 border border-emerald-950/80 shadow-2xl p-6 sm:p-10 space-y-8">
            
            {/* Vetting Standards Banner */}
            <div className="p-4 rounded-xl bg-stone-950 border border-emerald-900/60 flex items-start gap-3 text-xs text-stone-300">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-semibold block">Academic Vetting Requirements:</strong>
                Applicants must possess verified qualifications (Shahadat-ul-Alimiyyah, Ijazah in Tajweed/Qira’at, or Sanad Hifz-ul-Quran), reliable internet connectivity, and fluency in English or Urdu.
              </div>
            </div>

            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Full Name & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Full Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Qari Muhammad Bilal / Ustadha Fatima"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    WhatsApp Number (with Country Code) <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +92 310 1234567"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Row 2: Email & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. tutor@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Gender (Optional)
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="Male">Male (Qari / Ustadh)</option>
                    <option value="Female">Female (Qaria / Ustadha)</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Country & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pakistan, United Kingdom, UAE"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lahore, Karachi, Islamabad"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Quran Teaching Experience (Years & Context) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 years teaching online to international kids; 2 years in Madrassa"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Qualifications */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Academic & Religious Qualifications <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Hafiz-ul-Quran (Sanad from Wifaq-ul-Madaris), Dars-e-Nizami (Alimiyyah), Ijazah in Tajweed"
                  value={formData.qualifications}
                  onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Courses You Can Teach (Checkboxes) */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2">
                  Courses You Can Teach (Select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {availableCourses.map((course) => {
                    const isChecked = formData.courses.includes(course);
                    return (
                      <button
                        type="button"
                        key={course}
                        onClick={() => handleCourseToggle(course)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-950/90 border-amber-500/50 text-amber-300'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        <span>{course}</span>
                        {isChecked && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Languages */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Languages Spoken for Teaching
                </label>
                <input
                  type="text"
                  placeholder="e.g. English, Urdu, Arabic, Punjabi, Pashto"
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Short Introduction */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Short Introduction & Teaching Methodology
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe your approach to teaching Quran with Tajweed, how you handle beginner students, and your daily schedule availability."
                  value={formData.introduction}
                  onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-base rounded-xl shadow-xl shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting to Academy Database...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-stone-500 text-center mt-2">
                  Applications are securely saved in our academy database and reviewed by founder Abdullah.
                </p>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
