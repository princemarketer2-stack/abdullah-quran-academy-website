import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TutorsPage } from './components/TutorsPage';
import { CoursesPage } from './components/CoursesPage';
import { AboutPage } from './components/AboutPage';
import { BecomeTutorPage } from './components/BecomeTutorPage';
import { ContactPage } from './components/ContactPage';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { TrialClassModal } from './components/TrialClassModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { COURSES } from './data/courses';
import { TUTORS } from './data/tutors';
import { ACADEMY_INFO, getWhatsAppLink } from './data/academy';
import { Users, GraduationCap, Sparkles, MessageCircle, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'about' | 'courses' | 'tutors' | 'become-tutor' | 'contact'>('home');
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [preSelectedCourse, setPreSelectedCourse] = useState<string | undefined>();
  const [preSelectedTutor, setPreSelectedTutor] = useState<string | undefined>();
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);

  // Sync hash routing if user enters specific hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'about', 'courses', 'tutors', 'become-tutor', 'contact'].includes(hash)) {
        setCurrentTab(hash as any);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab as any);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTrialModal = (courseId?: string, tutorName?: string) => {
    setPreSelectedCourse(courseId);
    setPreSelectedTutor(tutorName);
    setTrialModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenTrialModal={handleOpenTrialModal}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              onNavigate={handleNavigate}
              onOpenTrialModal={() => handleOpenTrialModal()}
            />

            {/* Courses Overview Preview on Homepage */}
            <section className="py-14 sm:py-20 bg-stone-950 border-b border-emerald-950/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                      Structured Quran Education
                    </span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                      Explore Our Popular Courses
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                      Individual 1-on-1 courses tailored for beginners, children, sisters, and advanced students.
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate('courses')}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer self-start md:self-auto"
                  >
                    <span>View All 6 Courses</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {COURSES.slice(0, 3).map((course) => (
                    <div
                      key={course.id}
                      className="rounded-2xl bg-stone-900/70 border border-emerald-950/80 hover:border-amber-500/40 p-6 flex flex-col justify-between transition-all group shadow-lg"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-emerald-400 font-medium">{course.level}</span>
                          <span className="font-arabic text-amber-400 text-sm">{course.arabicTitle}</span>
                        </div>
                        <h3 className="font-heading text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed">
                          {course.shortDescription}
                        </p>
                      </div>

                      <div className="pt-5 mt-4 border-t border-stone-800 flex items-center justify-between">
                        <span className="text-[11px] text-stone-400">{course.duration}</span>
                        <button
                          onClick={() => handleOpenTrialModal(course.id)}
                          className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                        >
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Tutors Teaser on Homepage */}
            <section className="py-14 sm:py-20 bg-gradient-to-b from-stone-950 via-emerald-950/20 to-stone-950 border-b border-emerald-950/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                      Verified Faculty · Male & Female Qaris
                    </span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                      Connect with Expert Quran Tutors
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                      Each instructor is dedicated to fostering proper Tajweed, gentle patience with young learners, and spiritual excellence.
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate('tutors')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer self-start md:self-auto"
                  >
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>Open Tutor Directory ({TUTORS.length} Tutors)</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TUTORS.slice(0, 3).map((tutor) => (
                    <div
                      key={tutor.id}
                      className="rounded-2xl bg-stone-900/80 border border-emerald-950/80 p-5 space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-stone-400">
                          <span className="text-[11px] text-amber-400/90 font-medium bg-amber-500/10 px-2 py-0.5 rounded">
                            Demo Profile · Verified Standard
                          </span>
                          <span className="flex items-center gap-1 text-amber-400 font-semibold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            {tutor.rating}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-heading text-base font-bold text-white">
                            {tutor.name}
                          </h4>
                          <p className="text-xs text-emerald-400 font-medium">
                            {tutor.title}
                          </p>
                        </div>
                        <p className="text-xs text-stone-300 leading-relaxed line-clamp-2">
                          {tutor.experienceSummary} · {tutor.education}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-stone-800 flex items-center gap-2">
                        <a
                          href={`https://wa.me/${ACADEMY_INFO.whatsappRaw}?text=${encodeURIComponent(`Assalam o Alaikum Abdullah Quran Academy. I am interested in learning with Tutor ${tutor.name}. Please provide me with details.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg text-center"
                        >
                          WhatsApp
                        </a>
                        <button
                          onClick={() => handleOpenTrialModal(undefined, tutor.name)}
                          className="py-2 px-3 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-lg cursor-pointer"
                        >
                          Request Class
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Admission / Free Trial Class Banner on Homepage */}
            <section className="py-14 sm:py-20 bg-stone-950">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-950 border border-amber-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 text-amber-300 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admission Open Worldwide · Lahore, Pakistan</span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
                    Start Your Quran Learning Journey Today
                  </h2>

                  <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                    Book a free 3-day trial class with our expert tutors. Evaluate our teaching style, Tajweed corrections, and personalized attention with zero obligation.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => handleOpenTrialModal()}
                      className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                    >
                      Request a Free Trial Class
                    </button>

                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp (+92 310 7565285)</span>
                    </a>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      100% Free Trial
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      No Credit Card Required
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Flexible Timings
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section on Homepage */}
            <FAQSection
              onOpenTrialModal={() => handleOpenTrialModal()}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {currentTab === 'tutors' && (
          <TutorsPage
            onOpenTrialModal={handleOpenTrialModal}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'courses' && (
          <CoursesPage
            onOpenTrialModal={handleOpenTrialModal}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenTrialModal={() => handleOpenTrialModal()}
          />
        )}

        {currentTab === 'become-tutor' && (
          <BecomeTutorPage />
        )}

        {currentTab === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTrialModal={() => handleOpenTrialModal()}
        onOpenAdminPortal={() => setAdminPortalOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Admission / Free Trial Class Modal */}
      <TrialClassModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
        preSelectedCourseId={preSelectedCourse}
        preSelectedTutorName={preSelectedTutor}
      />

      {/* Academy Admin Live Database Inspector */}
      <AdminPortalModal
        isOpen={adminPortalOpen}
        onClose={() => setAdminPortalOpen(false)}
      />

    </div>
  );
}
