import React, { useState, useMemo } from 'react';
import { Search, Filter, MessageCircle, Star, Calendar, Globe, GraduationCap, CheckCircle, ShieldAlert, Sparkles, User, Users, BookOpen } from 'lucide-react';
import { TUTORS, Tutor } from '../data/tutors';
import { ACADEMY_INFO, getWhatsAppLink } from '../data/academy';

interface TutorsPageProps {
  onOpenTrialModal: (courseId?: string, tutorName?: string) => void;
  onNavigate: (tab: string) => void;
}

export const TutorsPage: React.FC<TutorsPageProps> = ({ onOpenTrialModal, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<'all' | 'male' | 'female'>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedShift, setSelectedShift] = useState<string>('all');
  const [activeTutorDetails, setActiveTutorDetails] = useState<Tutor | null>(null);

  // Available courses for filter
  const courseOptions = [
    'All Courses',
    'Noorani Qaida',
    'Quran Reading',
    'Quran with Tajweed',
    'Quran Memorization (Hifz)',
    'Quran Translation',
    'Islamic Studies'
  ];

  // Available languages for filter
  const languageOptions = ['All Languages', 'English', 'Urdu', 'Arabic', 'Punjabi', 'Pashto'];

  // Filtered tutors logic
  const filteredTutors = useMemo(() => {
    return TUTORS.filter((tutor) => {
      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = tutor.name.toLowerCase().includes(query);
        const matchesBio = tutor.bio.toLowerCase().includes(query);
        const matchesQual = tutor.qualifications.some((q) => q.toLowerCase().includes(query));
        const matchesCourses = tutor.coursesTaught.some((c) => c.toLowerCase().includes(query));
        const matchesLang = tutor.languages.some((l) => l.toLowerCase().includes(query));
        if (!matchesName && !matchesBio && !matchesQual && !matchesCourses && !matchesLang) {
          return false;
        }
      }

      // Gender check
      if (selectedGender !== 'all' && tutor.gender !== selectedGender) {
        return false;
      }

      // Course check
      if (selectedCourse !== 'all' && selectedCourse !== 'All Courses') {
        if (!tutor.coursesTaught.includes(selectedCourse)) {
          return false;
        }
      }

      // Language check
      if (selectedLanguage !== 'all' && selectedLanguage !== 'All Languages') {
        if (!tutor.languages.includes(selectedLanguage)) {
          return false;
        }
      }

      // Shift check
      if (selectedShift !== 'all' && selectedShift !== 'All Shifts') {
        if (tutor.availability.shift !== selectedShift && tutor.availability.shift !== 'Flexible') {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedGender, selectedCourse, selectedLanguage, selectedShift]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGender('all');
    setSelectedCourse('all');
    setSelectedLanguage('all');
    setSelectedShift('all');
  };

  const handleWhatsAppContact = (tutorName: string) => {
    // Prompt requirement: Pre-filled WhatsApp message
    // "Assalam o Alaikum Abdullah Quran Academy. I am interested in finding a Quran tutor. Please provide me with further details."
    const message = `Assalam o Alaikum Abdullah Quran Academy. I am interested in finding a Quran tutor (requesting ${tutorName}). Please provide me with further details.`;
    const url = `https://wa.me/${ACADEMY_INFO.whatsappRaw}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleGeneralWhatsApp = () => {
    const url = `https://wa.me/${ACADEMY_INFO.whatsappRaw}?text=${encodeURIComponent(ACADEMY_INFO.defaultWhatsAppMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-stone-950 min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Dedicated Quran Faculty · Lahore, Pakistan</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Find Your <span className="gold-gradient-text">Quran Tutor</span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Browse our faculty of experienced male and female Quran tutors. Each instructor is dedicated to fostering proper Tajweed, patience with young learners, and spiritual excellence.
          </p>

          {/* Mandatory Demonstration Profile Banner */}
          <div className="flex items-start sm:items-center gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs text-left max-w-2xl mx-auto">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <span className="font-semibold text-amber-300">Demonstration Faculty Notice: </span>
              In accordance with academic transparency, profiles below reflect the certified teaching standards, curriculum frameworks, and qualifications verified by Abdullah Quran Academy. Genuine teachers are continually onboarded via our strict vetting process.
            </div>
          </div>
        </div>

        {/* Global Contact Bar for the Academy */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-stone-900 to-emerald-950/80 border border-emerald-800/60 shadow-lg">
          <div className="flex items-center gap-3 text-stone-200 text-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/80 flex items-center justify-center border border-emerald-600/40 shrink-0">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="font-semibold text-white">Need personal assistance selecting the best tutor?</p>
              <p className="text-xs text-stone-400">Founder Abdullah and the academic committee will personally guide you.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleGeneralWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact Academy (+92 310 7565285)</span>
            </button>
            <button
              onClick={() => onOpenTrialModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-bold shadow transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>Free Trial Class</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-5 rounded-2xl bg-stone-900/70 border border-emerald-900/40 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search tutor by name, qualification, language, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Gender Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-950 rounded-xl border border-stone-800 shrink-0 w-full md:w-auto justify-center">
              <button
                onClick={() => setSelectedGender('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedGender === 'all'
                    ? 'bg-emerald-900 text-amber-300 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                All Tutors
              </button>
              <button
                onClick={() => setSelectedGender('male')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedGender === 'male'
                    ? 'bg-emerald-900 text-amber-300 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Male (Qari)
              </button>
              <button
                onClick={() => setSelectedGender('female')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedGender === 'female'
                    ? 'bg-emerald-900 text-amber-300 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Female (Qaria)
              </button>
            </div>
          </div>

          {/* Secondary Dropdown Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-stone-800/80">
            {/* Course Filter */}
            <div>
              <label className="block text-[11px] font-medium text-stone-400 mb-1">Filter by Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 focus:outline-none focus:border-amber-400"
              >
                {courseOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div>
              <label className="block text-[11px] font-medium text-stone-400 mb-1">Filter by Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 focus:outline-none focus:border-amber-400"
              >
                {languageOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Shift Filter */}
            <div>
              <label className="block text-[11px] font-medium text-stone-400 mb-1">Availability Shift</label>
              <select
                value={selectedShift}
                onChange={(e) => setSelectedShift(e.target.value)}
                className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs text-stone-200 focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Shifts</option>
                <option value="Morning">Morning Shift</option>
                <option value="Afternoon">Afternoon Shift</option>
                <option value="Evening">Evening Shift</option>
                <option value="Flexible">Flexible / Anytime</option>
              </select>
            </div>
          </div>

          {/* Result count and active filters reset */}
          <div className="flex items-center justify-between text-xs text-stone-400 pt-2">
            <span>
              Showing <span className="text-amber-400 font-semibold">{filteredTutors.length}</span> tutors matching your criteria
            </span>
            {(searchQuery || selectedGender !== 'all' || selectedCourse !== 'all' || selectedLanguage !== 'all' || selectedShift !== 'all') && (
              <button
                onClick={resetFilters}
                className="text-amber-400 hover:text-amber-300 underline underline-offset-2 cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Tutor Profile Cards Grid */}
        {filteredTutors.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-stone-900/40 border border-stone-800 space-y-3">
            <Users className="w-12 h-12 text-stone-600 mx-auto" />
            <h3 className="text-lg font-semibold text-white">No Tutors Match Your Selected Filters</h3>
            <p className="text-sm text-stone-400 max-w-md mx-auto">
              Try adjusting your search query, selecting "All Courses", or resetting filters to view all available tutors.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-amber-400 text-stone-950 font-semibold rounded-lg text-xs hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((tutor) => {
              return (
                <div
                  key={tutor.id}
                  className="rounded-2xl bg-stone-900/80 border border-emerald-950/80 hover:border-amber-500/40 transition-all flex flex-col justify-between overflow-hidden group shadow-lg shadow-black/30"
                >
                  {/* Top Demo Profile Disclaimer Ribbon */}
                  <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-1.5 flex items-center justify-between text-[11px] text-amber-300">
                    <span className="font-medium tracking-wide">Demo Profile · Verified Standard</span>
                    <span className="text-[10px] text-amber-400/80">Lahore Academy</span>
                  </div>

                  <div className="p-6 space-y-4 flex-1">
                    {/* Header: Photo / Stylized Portrait Avatar + Name */}
                    <div className="flex items-start gap-4">
                      {/* Respectful Stylized Avatar Badge */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 border border-amber-500/30 flex flex-col items-center justify-center shrink-0 shadow-inner group-hover:border-amber-400 transition-colors">
                        <User className="w-7 h-7 text-amber-300" />
                        <span className="text-[9px] font-bold text-emerald-200 mt-0.5">
                          {tutor.gender === 'female' ? 'SISTER' : 'QARI'}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{tutor.rating}</span>
                          <span className="text-stone-500">·</span>
                          <span className="text-stone-400">{tutor.studentCount} Students</span>
                        </div>
                        <h3 className="font-heading text-lg font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                          {tutor.name}
                        </h3>
                        <p className="text-xs text-emerald-400 font-medium line-clamp-1">
                          {tutor.title}
                        </p>
                      </div>
                    </div>

                    {/* Experience & Education */}
                    <div className="space-y-2 pt-2 border-t border-stone-800 text-xs">
                      <div className="flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-stone-200 font-medium">{tutor.experienceSummary}</p>
                          <p className="text-stone-400 text-[11px]">{tutor.education}</p>
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="flex items-center gap-2 text-stone-300 text-xs">
                        <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Languages: {tutor.languages.join(' · ')}</span>
                      </div>

                      {/* Availability */}
                      <div className="flex items-center gap-2 text-stone-300 text-xs">
                        <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{tutor.availability.days} ({tutor.availability.shift})</span>
                      </div>
                    </div>

                    {/* Courses Taught (Unboxed clean text) */}
                    <div className="pt-2">
                      <p className="text-[11px] font-medium text-stone-400 mb-1.5">Courses Specialization:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {tutor.coursesTaught.map((course) => (
                          <span
                            key={course}
                            className="text-xs px-2.5 py-1 rounded-md bg-stone-950 border border-stone-800 text-stone-300"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bio excerpt */}
                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed pt-1">
                      {tutor.bio}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 bg-stone-950/80 border-t border-stone-800 flex items-center gap-2">
                    {/* Primary: WhatsApp button with pre-filled message */}
                    <button
                      onClick={() => handleWhatsAppContact(tutor.name)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow transition-colors cursor-pointer"
                      title="Contact Academy via WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Contact via WhatsApp</span>
                    </button>

                    {/* Secondary: Book Class / Free Trial */}
                    <button
                      onClick={() => onOpenTrialModal(undefined, tutor.name)}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl shadow transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Request Class</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Callout: Want to teach with us? */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border border-amber-500/30 text-center space-y-4">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
            Are You a Qualified Quran Teacher?
          </h3>
          <p className="text-stone-300 text-sm max-w-xl mx-auto">
            Abdullah Quran Academy welcomes male and female Quran instructors with authentic sanad, passion for teaching, and good communication skills.
          </p>
          <button
            onClick={() => {
              onNavigate('become-tutor');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm rounded-xl shadow-lg transition-colors cursor-pointer"
          >
            <span>Apply to Become a Quran Tutor →</span>
          </button>
        </div>

      </div>
    </div>
  );
};
