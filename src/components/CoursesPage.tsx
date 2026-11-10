import React, { useState } from 'react';
import { BookOpen, Check, Clock, Users, ArrowRight, Sparkles, MessageCircle, X, Award } from 'lucide-react';
import { COURSES, Course } from '../data/courses';
import { getCourseWhatsAppLink, ACADEMY_INFO } from '../data/academy';

interface CoursesPageProps {
  onOpenTrialModal: (courseId?: string) => void;
  onNavigate: (tab: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onOpenTrialModal, onNavigate }) => {
  const [selectedCourseDetails, setSelectedCourseDetails] = useState<Course | null>(null);

  const handleEnrollNow = (course: Course) => {
    onOpenTrialModal(course.id);
  };

  const handleWhatsAppInquiry = (courseTitle: string) => {
    const url = getCourseWhatsAppLink(courseTitle);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-stone-950 min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Comprehensive Curriculum · Beginners to Advanced</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Explore Our <span className="gold-gradient-text">Quran Courses</span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            From basic Arabic alphabet recognition to mastery of Tajweed and complete Quran memorization, our step-by-step syllabus is designed for learners of all ages.
          </p>
        </div>

        {/* 6 Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course, idx) => {
            return (
              <div
                key={course.id}
                className="rounded-2xl bg-stone-900/80 border border-emerald-950/80 hover:border-amber-500/40 transition-all flex flex-col justify-between overflow-hidden group shadow-xl shadow-black/40"
              >
                {/* Course Image Slot with Scrim */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-950">
                  <img
                    src={course.image}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
                  
                  {/* Arabic Course Title Tag */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-stone-950/80 backdrop-blur-md border border-amber-500/30 text-amber-300 font-arabic text-sm">
                    {course.arabicTitle}
                  </div>

                  {/* Level Tag */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-emerald-950/90 text-emerald-300 border border-emerald-700/50 text-xs font-medium">
                    {course.level}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-amber-400 font-medium mt-0.5">
                      {course.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-800 text-xs">
                    <div className="flex items-center gap-2 text-stone-300">
                      <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{course.ageGroup}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-300">
                      <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Buttons Bar */}
                <div className="p-4 bg-stone-950/80 border-t border-stone-800 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCourseDetails(course)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-emerald-800/60 text-stone-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Course Details
                  </button>

                  <button
                    onClick={() => handleEnrollNow(course)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                    <span>Enroll Now</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Course Details Modal */}
        {selectedCourseDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-stone-900 border border-emerald-700/60 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
              
              {/* Modal Header */}
              <div className="p-6 bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border-b border-emerald-800 flex items-start justify-between">
                <div>
                  <div className="font-arabic text-amber-300 text-lg">
                    {selectedCourseDetails.arabicTitle}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white">
                    {selectedCourseDetails.title}
                  </h3>
                  <p className="text-xs text-emerald-400 mt-1">
                    {selectedCourseDetails.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCourseDetails(null)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 overflow-y-auto flex-1 text-sm text-stone-300">
                <div>
                  <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                    Course Overview
                  </h4>
                  <p className="leading-relaxed text-stone-200 text-xs sm:text-sm">
                    {selectedCourseDetails.fullDescription}
                  </p>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs">
                  <div>
                    <span className="text-stone-500 block">Level</span>
                    <span className="font-semibold text-stone-200">{selectedCourseDetails.level}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Duration</span>
                    <span className="font-semibold text-stone-200">{selectedCourseDetails.duration}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Age Group</span>
                    <span className="font-semibold text-stone-200">{selectedCourseDetails.ageGroup}</span>
                  </div>
                </div>

                {/* Curriculum Syllabus */}
                <div>
                  <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
                    Curriculum & Learning Milestones
                  </h4>
                  <ul className="space-y-2">
                    {selectedCourseDetails.curriculum.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-stone-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
                    Course Features & Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedCourseDetails.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-stone-950/60 border border-stone-800/80 text-xs text-stone-300">
                        <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  onClick={() => handleWhatsAppInquiry(selectedCourseDetails.title)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Ask Details on WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    const id = selectedCourseDetails.id;
                    setSelectedCourseDetails(null);
                    onOpenTrialModal(id);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>Enroll in Free Trial Class</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Global Help Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-stone-900 to-emerald-950/70 border border-emerald-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-heading text-xl font-bold text-white">Not sure which course is right for your child or yourself?</h3>
            <p className="text-stone-300 text-xs sm:text-sm">
              Our academic supervisor offers a complimentary 15-minute diagnostic evaluation to determine exact reading level.
            </p>
          </div>
          <button
            onClick={() => onOpenTrialModal()}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-colors cursor-pointer shrink-0"
          >
            Schedule Assessment & Trial →
          </button>
        </div>

      </div>
    </div>
  );
};
