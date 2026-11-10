import React from 'react';
import { ArrowRight, Users, BookOpen, CheckCircle, ShieldCheck, Globe, Star, MessageCircle, Clock } from 'lucide-react';
import { ACADEMY_INFO, getWhatsAppLink } from '../data/academy';

interface HeroProps {
  onNavigate: (tab: string) => void;
  onOpenTrialModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenTrialModal }) => {
  return (
    <section className="relative overflow-hidden bg-stone-950 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-emerald-950/60">
      {/* Background radial glow & Islamic subtle pattern */}
      <div className="absolute inset-0 bg-emerald-radial pointer-events-none" />
      <div className="absolute inset-0 bg-islamic-pattern opacity-40 pointer-events-none" />

      {/* Decorative Golden Arches Glow in Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/40 text-emerald-300 text-xs font-medium backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>International Quran Academy · Lahore, Pakistan</span>
              <span className="text-emerald-500/80">·</span>
              <span className="text-stone-300">Worldwide Students</span>
            </div>

            {/* Arabic Bismillah Calligraphy */}
            <div className="font-arabic text-amber-300/90 text-xl sm:text-2xl tracking-wide select-none">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
              Learn the Holy Quran Online with{' '}
              <span className="gold-gradient-text">Expert Tutors</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Begin your beautiful journey of learning the Holy Quran from the comfort of your home. Connect with dedicated Quran tutors and learn with confidence.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={() => onNavigate('tutors')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-stone-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Users className="w-5 h-5 text-stone-900" />
                <span>Find Your Quran Tutor</span>
                <ArrowRight className="w-4 h-4 ml-1 text-stone-900" />
              </button>

              <button
                onClick={() => onNavigate('courses')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-stone-200 bg-stone-900/90 hover:bg-stone-800 border border-emerald-800/60 rounded-xl hover:text-white transition-all cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>Explore Our Courses</span>
              </button>
            </div>

            {/* Direct WhatsApp Quick Contact */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs text-stone-400">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Quick WhatsApp Inquiry: {ACADEMY_INFO.whatsappNumber}</span>
              </a>
              <span className="text-stone-700">|</span>
              <span className="text-stone-400">Founder: {ACADEMY_INFO.founder}</span>
            </div>

            {/* Proof Badges List */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-emerald-950/80">
              <div className="flex items-center gap-2 text-left">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-stone-300 font-medium">1-on-1 Live Sessions</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-stone-300 font-medium">Male & Female Tutors</span>
              </div>
              <div className="flex items-center gap-2 text-left col-span-2 sm:col-span-1">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-stone-300 font-medium">Flexible Global Hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Quran Feature Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Golden Frame */}
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-amber-500/30 via-emerald-600/30 to-amber-400/20 blur-sm" />
              
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-stone-900 shadow-2xl shadow-emerald-950/80">
                <img
                  src="/src/assets/images/hero_quran_holy_book_1793510781682.jpg"
                  alt="Holy Quran on carved wooden rehal bookstand at Abdullah Quran Academy"
                  referrerPolicy="no-referrer"
                  className="w-full h-[340px] sm:h-[400px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient Scrim for Content Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                {/* Floating Card at Bottom of Image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-950/85 backdrop-blur-md border border-amber-500/25 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-heading text-amber-300 font-semibold tracking-wide">
                      Abdullah Quran Academy
                    </span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      4.97 / 5.0 Rating
                    </span>
                  </div>
                  <p className="text-xs text-stone-300">
                    Connecting earnest students with certified Qaris & Ustadhas across Pakistan, UK, USA, Gulf & Europe.
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-stone-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      Free 3-Day Trial Available
                    </span>
                    <button
                      onClick={onOpenTrialModal}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2 cursor-pointer"
                    >
                      Request Trial Class →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Item Feature Strip Below Hero */}
        <div className="mt-14 pt-8 border-t border-emerald-950/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 rounded-xl bg-stone-900/40 border border-emerald-900/40 space-y-1">
            <span className="text-amber-400 text-lg font-bold">100%</span>
            <h4 className="text-stone-200 text-sm font-semibold">1-on-1 Focus</h4>
            <p className="text-stone-400 text-xs">Dedicated teacher attention without group distractions</p>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/40 border border-emerald-900/40 space-y-1">
            <span className="text-amber-400 text-lg font-bold">Sanad</span>
            <h4 className="text-stone-200 text-sm font-semibold">Certified Scholars</h4>
            <p className="text-stone-400 text-xs">Graduates from recognized Islamic institutions</p>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/40 border border-emerald-900/40 space-y-1">
            <span className="text-amber-400 text-lg font-bold">24 / 7</span>
            <h4 className="text-stone-200 text-sm font-semibold">Flexible Scheduling</h4>
            <p className="text-stone-400 text-xs">Choose class timings that match your lifestyle</p>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/40 border border-emerald-900/40 space-y-1">
            <span className="text-amber-400 text-lg font-bold">3 Days</span>
            <h4 className="text-stone-200 text-sm font-semibold">Free Trial Period</h4>
            <p className="text-stone-400 text-xs">Experience our classes with zero financial obligation</p>
          </div>
        </div>

      </div>
    </section>
  );
};
