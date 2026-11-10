import React, { useState } from 'react';
import { BookOpen, Phone, MapPin, MessageCircle, Heart, Shield, Lock, FileText, Sparkles, Database } from 'lucide-react';
import { ACADEMY_INFO, getWhatsAppLink } from '../data/academy';
import { COURSES } from '../data/courses';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenTrialModal: () => void;
  onOpenAdminPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTrialModal, onOpenAdminPortal }) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const handleLinkClick = (tab: string) => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 border-t border-emerald-950 text-stone-400 text-xs">
      
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand Info & Mission (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 border border-amber-500/40 flex items-center justify-center">
                <span className="font-arabic text-amber-400 text-xl font-bold">ق</span>
              </div>
              <div>
                <span className="font-heading text-lg font-bold text-white block">
                  Abdullah Quran Academy
                </span>
                <span className="text-[10px] text-emerald-400 tracking-wider uppercase font-medium">
                  Lahore, Pakistan · Global Online Academy
                </span>
              </div>
            </div>

            <p className="text-stone-300 text-xs leading-relaxed">
              Abdullah Quran Academy is dedicated to making Quran education accessible to students around the world by connecting them with dedicated Quran tutors for a comfortable, supportive and convenient learning experience.
            </p>

            <div className="space-y-1.5 pt-2 text-stone-300">
              <div className="flex items-center gap-2">
                <span className="text-stone-500">Founder:</span>
                <span className="text-white font-medium">{ACADEMY_INFO.founder}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{ACADEMY_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  WhatsApp: {ACADEMY_INFO.whatsappNumber}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-sm font-bold text-white tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('courses')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('tutors')}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer"
                >
                  Find Tutors
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('become-tutor')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Become a Tutor
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Courses (Col 7-9) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-sm font-bold text-white tracking-wide">
              Our Courses
            </h4>
            <ul className="space-y-2">
              {COURSES.map((course) => (
                <li key={course.id}>
                  <button
                    onClick={() => handleLinkClick('courses')}
                    className="hover:text-amber-300 transition-colors text-left flex items-center justify-between w-full cursor-pointer"
                  >
                    <span>{course.title}</span>
                    <span className="text-[10px] text-stone-500 font-arabic">{course.arabicTitle}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp Direct & Trial CTA (Col 10-12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading text-sm font-bold text-white tracking-wide">
              Admissions Desk
            </h4>
            <p className="text-stone-300 text-xs">
              Connect directly with our admissions coordinator to schedule your 3-day free trial.
            </p>

            <button
              onClick={onOpenTrialModal}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl shadow transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>Book Free Trial Class</span>
            </button>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl shadow transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {ACADEMY_INFO.whatsappNumber}</span>
            </a>

            {onOpenAdminPortal && (
              <div className="pt-2">
                <button
                  onClick={onOpenAdminPortal}
                  className="inline-flex items-center gap-1.5 text-[11px] text-stone-500 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <Database className="w-3 h-3" />
                  <span>Academy Admin Data Registry</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="bg-stone-950 border-t border-stone-900 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs">
          <p className="text-stone-400">
            © 2026 Abdullah Quran Academy. All Rights Reserved.
          </p>

          <div className="flex items-center gap-5 text-stone-400">
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-stone-200 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-stone-200 transition-colors cursor-pointer"
            >
              Terms and Conditions
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy & Terms Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-stone-900 border border-emerald-800 rounded-2xl p-6 text-stone-200 text-xs space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-heading text-lg font-bold text-white">
                {modalType === 'privacy' ? 'Privacy Policy' : 'Terms and Conditions'}
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {modalType === 'privacy' ? (
              <div className="space-y-3 leading-relaxed text-stone-300">
                <p>
                  <strong>Abdullah Quran Academy</strong> respects the privacy of all students, parents, and tutor applicants.
                </p>
                <p>
                  1. <strong>Data Collection:</strong> We collect student names, contact WhatsApp numbers, and course preferences solely for scheduling classes and coordinating with tutors.
                </p>
                <p>
                  2. <strong>Student Modesty & Safety:</strong> Online 1-on-1 classes are held in a secure environment. Classes for female students are exclusively conducted by verified female tutors upon request.
                </p>
                <p>
                  3. <strong>No Third-Party Sharing:</strong> We do not sell, rent, or disclose student or tutor information to any external marketing parties.
                </p>
              </div>
            ) : (
              <div className="space-y-3 leading-relaxed text-stone-300">
                <p>
                  <strong>Terms and Conditions of Enrollment</strong>
                </p>
                <p>
                  1. <strong>Free Trial Class:</strong> Students are entitled to complimentary trial lessons without financial obligation.
                </p>
                <p>
                  2. <strong>Attendance & Scheduling:</strong> If a student needs to reschedule a session, kindly notify the tutor or academy administration via WhatsApp at least 4 hours in advance.
                </p>
                <p>
                  3. <strong>Academic Code of Conduct:</strong> Respectful, modest, and punctual behavior is maintained at all times in accordance with Islamic etiquette.
                </p>
              </div>
            )}

            <div className="pt-2 text-right">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
