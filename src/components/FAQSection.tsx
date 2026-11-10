import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/faqs';
import { ACADEMY_INFO, getWhatsAppLink } from '../data/academy';

interface FAQSectionProps {
  onOpenTrialModal?: () => void;
  onNavigate?: (tab: string) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenTrialModal, onNavigate }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-stone-950 py-12 lg:py-20 border-t border-emerald-950/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-medium">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Got Questions? <span className="gold-gradient-text">We Have Answers</span>
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto">
            Everything you need to know about finding tutors, trial classes, and online learning at Abdullah Quran Academy.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-xl bg-stone-900/70 border border-emerald-950/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-stone-100 hover:text-amber-300 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/80 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>

                    {/* Contextual Action Prompts */}
                    {faq.id === 'faq-1' && onNavigate && (
                      <div className="mt-3">
                        <button
                          onClick={() => onNavigate('tutors')}
                          className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
                        >
                          Go to Tutors Directory →
                        </button>
                      </div>
                    )}
                    {faq.id === 'faq-4' && onOpenTrialModal && (
                      <div className="mt-3">
                        <button
                          onClick={onOpenTrialModal}
                          className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
                        >
                          Open Trial Class Request Form →
                        </button>
                      </div>
                    )}
                    {faq.id === 'faq-5' && onNavigate && (
                      <div className="mt-3">
                        <button
                          onClick={() => onNavigate('become-tutor')}
                          className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
                        >
                          Apply as a Quran Tutor →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? WhatsApp Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-stone-900 to-emerald-950/80 border border-emerald-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Still have a question not listed here?</h4>
            <p className="text-xs text-stone-400">Founder Abdullah is readily accessible on WhatsApp for all inquiries.</p>
          </div>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp (+92 310 7565285)</span>
          </a>
        </div>

      </div>
    </section>
  );
};
