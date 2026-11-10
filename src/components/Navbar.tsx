import React, { useState } from 'react';
import { BookOpen, Users, GraduationCap, Phone, UserPlus, Info, Menu, X, Sparkles, MessageCircle } from 'lucide-react';
import { ACADEMY_INFO, getWhatsAppLink } from '../data/academy';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenTrialModal: (courseId?: string, tutorName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate, onOpenTrialModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: BookOpen },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'tutors', label: 'Tutors', icon: Users, isHighlighted: true },
    { id: 'become-tutor', label: 'Become a Tutor', icon: UserPlus },
    { id: 'contact', label: 'Contact Us', icon: Phone },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-emerald-950/60 shadow-lg shadow-black/20">
      {/* Top micro-banner for trust and direct WhatsApp reach */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border-b border-emerald-800/40 px-4 py-1.5 text-xs text-stone-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-stone-300">
            <span className="text-amber-400 font-arabic text-sm">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</span>
            <span className="hidden sm:inline text-stone-500">·</span>
            <span className="hidden sm:inline text-stone-300">Online Quran Academy · Lahore, Pakistan</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {ACADEMY_INFO.whatsappNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-stone-900 border border-amber-500/30 flex items-center justify-center shadow-inner shadow-amber-500/10 group-hover:border-amber-400 transition-all">
              <span className="font-arabic text-amber-400 text-2xl font-bold">ق</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                Abdullah Quran Academy
              </span>
              <span className="text-[11px] text-emerald-400 font-medium tracking-wider uppercase">
                Online Academy · Lahore
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-amber-300 bg-emerald-950/80 border border-amber-500/30'
                      : item.isHighlighted
                      ? 'text-emerald-300 hover:text-amber-300 hover:bg-emerald-950/40'
                      : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.isHighlighted ? 'text-amber-400' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                  {item.isHighlighted && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ml-0.5" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenTrialModal()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-stone-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded-lg shadow-md shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-stone-900" />
              <span>Free Trial Class</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-900 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-emerald-950 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-950 text-amber-300 border border-amber-500/30'
                    : 'text-stone-300 hover:bg-stone-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${item.isHighlighted ? 'text-amber-400' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.isHighlighted && (
                  <span className="text-xs text-amber-400 font-semibold px-2 py-0.5 bg-emerald-900/80 rounded">
                    Featured
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrialModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-stone-950 font-bold bg-amber-400 rounded-xl shadow hover:bg-amber-300 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              <span>Book 3-Day Free Trial Class</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
