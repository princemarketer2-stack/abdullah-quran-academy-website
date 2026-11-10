import React, { useState } from 'react';
import { MapPin, Phone, User, MessageCircle, Send, CheckCircle2, AlertCircle, Mail, Clock, ExternalLink } from 'lucide-react';
import { ACADEMY_INFO, getWhatsAppLink } from '../data/academy';
import { academyStore } from '../services/academyStore';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    subject: 'Inquiry regarding Quran Classes',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim() || !formData.whatsapp.trim() || !formData.message.trim()) {
      setErrorMsg('Please provide your name, WhatsApp number, and inquiry message.');
      return;
    }

    setLoading(true);

    try {
      await academyStore.saveContactMessage({
        name: formData.name,
        whatsapp: formData.whatsapp,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error occurred while sending message.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = formData.message.trim()
      ? `Assalam o Alaikum Abdullah Quran Academy.\nName: ${formData.name}\nWhatsApp: ${formData.whatsapp}\nInquiry: ${formData.message}`
      : ACADEMY_INFO.defaultWhatsAppMessage;
    const url = `https://wa.me/${ACADEMY_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-stone-950 min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Direct Communication · Lahore, Pakistan</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Contact <span className="gold-gradient-text">Abdullah Quran Academy</span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Have questions about courses, tutor availability, or class schedules? Get in touch with Founder Abdullah and our academic admissions team.
          </p>
        </div>

        {/* Official Academy Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Founder & Academy */}
          <div className="p-6 rounded-2xl bg-stone-900/80 border border-emerald-950/80 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-amber-400">
              <User className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-stone-400 block">Founder & Administrator</span>
              <h3 className="font-heading text-lg font-bold text-white">{ACADEMY_INFO.founder}</h3>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Personal supervision over teacher selection, curriculum quality, and student trial assessments.
            </p>
          </div>

          {/* Card 2: WhatsApp Number */}
          <div className="p-6 rounded-2xl bg-stone-900/80 border border-emerald-950/80 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-amber-400">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-stone-400 block">Official WhatsApp / Call</span>
              <h3 className="font-mono text-lg font-bold text-emerald-400">{ACADEMY_INFO.whatsappNumber}</h3>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Quick response for admissions, fee queries, and immediate tutor coordination.
            </p>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 underline"
            >
              <span>Chat on WhatsApp →</span>
            </a>
          </div>

          {/* Card 3: Location */}
          <div className="p-6 rounded-2xl bg-stone-900/80 border border-emerald-950/80 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-amber-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-stone-400 block">Academy Location</span>
              <h3 className="font-heading text-lg font-bold text-white">{ACADEMY_INFO.location}</h3>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Proudly established in the historic city of Lahore, Punjab, Pakistan, connecting with students globally.
            </p>
          </div>
        </div>

        {/* 2-Column Split: Working Contact Form & Lahore Map Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 rounded-2xl bg-stone-900/80 border border-emerald-950/80 p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-heading text-xl font-bold text-white">Send Us a Direct Message</h3>
              <p className="text-xs text-stone-400 mt-1">
                Your message is stored securely and dispatched to academy leadership.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-heading text-lg font-bold text-white">Message Dispatched!</h4>
                <p className="text-xs text-stone-300 max-w-sm mx-auto">
                  Thank you, <strong className="text-amber-400">{formData.name}</strong>. Founder Abdullah and our team will contact you on WhatsApp at <strong className="text-white">{formData.whatsapp}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', whatsapp: '', email: '', subject: 'Inquiry', message: '' });
                  }}
                  className="px-4 py-2 bg-stone-900 text-stone-300 hover:text-white rounded-lg text-xs border border-stone-800"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Your Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abdullah / Tariq"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      WhatsApp Number <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +92 310 7565285"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. student@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Noorani Qaida for Kids"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Your Message / Question <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the courses you're interested in, preferred time slot, or any specific questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Google Maps Location Card for Lahore, Pakistan */}
          <div className="lg:col-span-5 rounded-2xl bg-stone-900/80 border border-emerald-950/80 p-6 sm:p-8 space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                  Location & Map
                </span>
                <span className="text-[11px] text-stone-400 font-mono">
                  31.5204° N, 74.3587° E
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-white mt-1">
                Lahore, Punjab, Pakistan
              </h3>
              <p className="text-xs text-stone-300">
                The cultural capital of Pakistan and historical seat of classical Islamic institutions and calligraphy.
              </p>
            </div>

            {/* Embedded Interactive Map Card for Lahore */}
            <div className="relative rounded-xl overflow-hidden border border-emerald-800/60 bg-stone-950 aspect-[4/3] group shadow-inner">
              {/* Google Maps iFrame */}
              <iframe
                title="Lahore Pakistan Map Location for Abdullah Quran Academy"
                src="https://maps.google.com/maps?q=Lahore,%20Pakistan&t=&z=12&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter contrast-125 opacity-90 group-hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Pin Overlay Badge */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-stone-950/90 backdrop-blur-md border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white">Abdullah Quran Academy</span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Lahore+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-medium"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Academy Fast Facts */}
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-xs text-stone-300">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Academy Name:</span>
                <span className="font-semibold text-white">Abdullah Quran Academy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Founder:</span>
                <span className="font-semibold text-white">Abdullah</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">City / Country:</span>
                <span className="font-semibold text-white">Lahore, Pakistan</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Global Reach:</span>
                <span className="font-semibold text-amber-400">Pakistan & Worldwide</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
