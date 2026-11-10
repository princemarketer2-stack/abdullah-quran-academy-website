import React from 'react';
import { BookOpen, MapPin, User, Heart, Shield, Award, Globe, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { ACADEMY_INFO, getWhatsAppLink } from '../data/academy';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
  onOpenTrialModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenTrialModal }) => {
  return (
    <div className="bg-stone-950 min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Founded in Lahore, Pakistan · Serving Worldwide</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            About <span className="gold-gradient-text">Abdullah Quran Academy</span>
          </h1>

          <p className="text-amber-400 font-arabic text-xl">
            خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
          </p>
          <p className="text-stone-400 text-xs italic">
            "The best among you are those who learn the Quran and teach it." — Sahih Bukhari
          </p>
        </div>

        {/* Primary Story / Official Academy Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-900 to-emerald-950/60 border border-emerald-800/60 shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                Our Mission & Story
              </span>

              {/* Exact user-mandated text */}
              <div className="space-y-4 text-stone-200 text-base sm:text-lg leading-relaxed">
                <p>
                  <strong className="text-white font-semibold">Abdullah Quran Academy</strong> is an online Quran learning platform based in Lahore, Pakistan. Our mission is to make Quran education accessible to students around the world by connecting them with dedicated Quran tutors.
                </p>
                <p>
                  We aim to provide a comfortable, supportive and convenient online learning experience for students of all ages.
                </p>
              </div>

              <p className="text-stone-300 text-sm leading-relaxed pt-2 border-t border-stone-800">
                Whether you are a parent seeking patient, gentle Quran recitation lessons for your child, a sister searching for a qualified female Ustadha, or a working adult yearning to recite with authentic Tajweed, our personalized 1-on-1 methodology adapts to your pace and lifestyle.
              </p>
            </div>

            {/* Core Leadership & Location Markers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-emerald-950">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
                <div className="w-10 h-10 rounded-lg bg-emerald-900/80 flex items-center justify-center border border-emerald-600/40 shrink-0">
                  <User className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-[11px] text-stone-400 block">Founder & Administrator</span>
                  <span className="text-sm font-bold text-white">{ACADEMY_INFO.founder}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
                <div className="w-10 h-10 rounded-lg bg-emerald-900/80 flex items-center justify-center border border-emerald-600/40 shrink-0">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-[11px] text-stone-400 block">Headquarters Location</span>
                  <span className="text-sm font-bold text-white">{ACADEMY_INFO.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual & Trust Pillars */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 h-64 bg-stone-900">
              <img
                src="/src/assets/images/hero_quran_holy_book_1793510781682.jpg"
                alt="Holy Quran at Abdullah Quran Academy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs text-amber-300 font-semibold block">Academic Integrity</span>
                <p className="text-xs text-stone-200">
                  Supervised recitation following authentic riwayah and sanad chains.
                </p>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="p-6 rounded-2xl bg-stone-900/90 border border-emerald-900/60 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                Direct Communication with Founder
              </h4>
              <p className="text-xs text-stone-300">
                Have specific scheduling requirements or questions about tutor placement? Contact Founder Abdullah directly via WhatsApp.
              </p>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow transition-colors"
              >
                <span>WhatsApp: {ACADEMY_INFO.whatsappNumber}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="font-heading text-2xl font-bold text-white">Why Learn with Abdullah Quran Academy?</h3>
            <p className="text-stone-400 text-xs sm:text-sm mt-1">Our commitment to every student and parent</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-stone-900/60 border border-emerald-900/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/40 flex items-center justify-center">
                <Heart className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="text-sm font-bold text-white">Compassionate & Patient Teaching</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                We believe in positive encouragement. Young learners thrive when treated with gentle patience, never harshness.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900/60 border border-emerald-900/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/40 flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="text-sm font-bold text-white">Sister-to-Sister Privacy</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Dedicated qualified female Qarias and Alimahs for female students, ensuring peace of mind, modesty, and comfort.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900/60 border border-emerald-900/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/40 flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="text-sm font-bold text-white">Certified Authentic Sanad</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Tutors hold degrees and certifications from accredited Islamic seminaries (Wifaq-ul-Madaris and equivalent).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900/60 border border-emerald-900/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/40 flex items-center justify-center">
                <Globe className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="text-sm font-bold text-white">Global Timezone Flexibility</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Accommodating schedules for students in the United Kingdom, United States, Canada, Australia, UAE, Saudi Arabia, and beyond.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-heading text-xl font-bold text-white">Begin with a Complimentary Trial Session</h3>
            <p className="text-stone-300 text-xs">Experience our 1-on-1 tutoring firsthand before making any decision.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTrialModal}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow transition-colors cursor-pointer"
            >
              Request Free Trial Class
            </button>
            <button
              onClick={() => onNavigate('tutors')}
              className="px-5 py-3 bg-stone-900 hover:bg-stone-800 border border-emerald-800 text-stone-200 text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              View Tutors
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
