import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { ACADEMY_INFO, getWhatsAppLink } from '../data/academy';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Interactive Tooltip Callout */}
      {showTooltip && (
        <div className="relative p-3 rounded-2xl bg-stone-900/95 backdrop-blur-md border border-emerald-600/60 shadow-2xl max-w-xs text-xs text-stone-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 p-1 text-stone-400 hover:text-white"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-emerald-300">Abdullah Quran Academy</span>
          </div>
          <p className="text-[11px] text-stone-300 leading-tight">
            Chat with Founder Abdullah on WhatsApp for tutor inquiries & free trial classes!
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-xl shadow-emerald-950/60 transition-all transform hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp with Abdullah Quran Academy"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500" />
        </span>
      </a>
    </div>
  );
};
