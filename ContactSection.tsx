import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Send, 
  Check, 
  Copy, 
  Sparkles,
  ArrowUpRight,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { playUiSound } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    playUiSound('click');
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    playUiSound('click');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playUiSound('success');

      // Trigger celebratory particle burst
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#818cf8', '#34d399']
      });

      setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3 backdrop-blur-md">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>INITIATE COLLABORATION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Let's Build Data-Driven{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500 bg-clip-text text-transparent">
            Success Together
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Waypoint 07: Camera completes full-circle orbit. Reach out for full-time roles, BI consulting, or analytics inquiries.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Direct Contact Cards & Socials */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-4"
        >
          {/* Email Card */}
          <div className="p-5 rounded-2xl bg-[#0b0f19]/95 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/40 transition-all group flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Direct Email</div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors break-all"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy(personalInfo.email, 'email')}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Copy email"
            >
              {copiedKey === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone Card */}
          <div className="p-5 rounded-2xl bg-[#0b0f19]/95 backdrop-blur-xl border border-slate-800 hover:border-purple-500/40 transition-all group flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-purple-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Direct Line</div>
                <a
                  href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                  className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors"
                >
                  {personalInfo.phone}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy(personalInfo.phone, 'phone')}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Copy phone"
            >
              {copiedKey === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Location Card */}
          <div className="p-5 rounded-2xl bg-[#0b0f19]/95 backdrop-blur-xl border border-slate-800 flex items-center gap-3.5 shadow-xl">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Base Location</div>
              <div className="text-sm font-semibold text-slate-200">
                {personalInfo.location}
              </div>
            </div>
          </div>

          {/* Social Profiles Pill Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-[#0b0f19]/95 hover:bg-slate-900 border border-slate-800 hover:border-sky-500/40 text-slate-200 flex items-center justify-between text-xs font-semibold transition-all group shadow-lg"
            >
              <span className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-sky-400" />
                LinkedIn
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-[#0b0f19]/95 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-200 flex items-center justify-between text-xs font-semibold transition-all group shadow-lg"
            >
              <span className="flex items-center gap-2">
                <Github className="w-4 h-4 text-cyan-400" />
                GitHub
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            </a>
          </div>
        </motion.div>

        {/* Right Floating Label Interactive Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#0b0f19]/95 backdrop-blur-xl border border-slate-800 shadow-2xl relative"
        >
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-800 text-xs font-mono text-cyan-400">
            <span className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              TRANSMIT MESSAGE
            </span>
            <span className="text-slate-300 font-mono">RESPONSE TIME &lt; 24H</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Floating Label: Name */}
            <div className="relative">
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=" "
                className="peer w-full px-4 pt-6 pb-2 rounded-2xl bg-slate-950 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-transparent outline-none transition-all font-medium"
              />
              <label
                htmlFor="contact-name"
                className="absolute left-4 top-2 text-[11px] font-mono text-cyan-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-cyan-400 transition-all pointer-events-none"
              >
                Your Full Name / Organisation *
              </label>
            </div>

            {/* Floating Label: Email */}
            <div className="relative">
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="peer w-full px-4 pt-6 pb-2 rounded-2xl bg-slate-950 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-transparent outline-none transition-all font-medium"
              />
              <label
                htmlFor="contact-email"
                className="absolute left-4 top-2 text-[11px] font-mono text-cyan-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-cyan-400 transition-all pointer-events-none"
              >
                Email Address *
              </label>
            </div>

            {/* Floating Label: Message */}
            <div className="relative">
              <textarea
                id="contact-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder=" "
                className="peer w-full px-4 pt-6 pb-2 rounded-2xl bg-slate-950 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-transparent outline-none transition-all resize-none font-medium"
              />
              <label
                htmlFor="contact-message"
                className="absolute left-4 top-2 text-[11px] font-mono text-cyan-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-cyan-400 transition-all pointer-events-none"
              >
                Brief Project / Opportunity Scope *
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`w-full py-4 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-xl ${
                isSubmitted
                  ? 'bg-emerald-500 text-white shadow-[0_0_25px_rgba(52,211,153,0.5)]'
                  : isSubmitting
                  ? 'bg-slate-800 text-slate-400 cursor-wait'
                  : 'bg-white text-black hover:bg-slate-100 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isSubmitted ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200" />
                  <span>Message Transmitted Successfully!</span>
                </>
              ) : isSubmitting ? (
                <span>Dispatching Packet...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message to Jaydeep</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Footer Signature */}
      <div className="w-full max-w-5xl mx-auto mt-20 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-4">
        <div>
          © {new Date().getFullYear()} Jaydeep Sutar. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>4D WebGL Camera System</span>
          <span>•</span>
          <span>Three.js + Framer Motion</span>
        </div>
      </div>
    </div>
  );
};
