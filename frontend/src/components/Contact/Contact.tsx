import { useState } from 'react';
import { Mail, MapPin, CheckCircle2, Send, AlertCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text: string }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', text: 'Please fill in all fields before sending.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', text: data.message || 'Thanks! Your message has been sent successfully.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', text: data.message || 'Failed to send message. Please try again later.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', text: 'Unable to reach backend server. Please verify database/server status.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full bg-[#070711] py-20 px-6 border-t border-zinc-900/80 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wider uppercase">
            GET IN TOUCH
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight relative">
            Let’s Build Something Amazing Together
            <span className="block h-1 w-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto mt-3" />
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-wide">
              Have a project in mind?
            </h3>
            <p className="text-zinc-400 text-base leading-relaxed">
              I’m available for freelance projects, full-time engineering roles, or custom web design inquiries. Send me a message and let’s connect!
            </p>

            <div className="space-y-4 pt-4">
              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex items-center gap-4 hover:border-purple-500/40 transition-colors">
                <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
                  <Mail size={22} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400 uppercase font-mono">Email Address</span>
                  <a href="mailto:jcomendador120@gmail.com" className="text-base font-semibold text-white hover:text-purple-300 transition-colors">
                    jcomendador120@gmail.com
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex items-center gap-4 hover:border-purple-500/40 transition-colors">
                <div className="p-3 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
                  <MapPin size={22} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400 uppercase font-mono">Location</span>
                  <span className="text-base font-semibold text-white">
                    Calbayog City, Samar, Philippines
                  </span>
                </div>
              </div>

              {/* Status Card */}
              <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex items-center gap-4 hover:border-purple-500/40 transition-colors">
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 size={22} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400 uppercase font-mono">Status</span>
                  <span className="text-base font-semibold text-emerald-400">
                    Available for Work
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md shadow-2xl relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Feedback Alert Banner */}
              {status && (
                <div
                  className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium border ${
                    status.type === 'success'
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                      : 'bg-red-500/15 border-red-500/30 text-red-300'
                  }`}
                >
                  {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span>{status.text}</span>
                </div>
              )}

              {/* Name Field */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Hi! I'd like to discuss a project..."
                  className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-violet-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
