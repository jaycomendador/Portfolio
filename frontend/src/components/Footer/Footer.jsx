import { Code2, ArrowUp, Globe, Share2, Send } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#05050b] text-zinc-400 py-12 px-6 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
            <Code2 size={20} className="stroke-[2.5]" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Code<span className="text-purple-400">Craft</span>
          </span>
        </div>

        {/* Navigation Quick Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Social Icons & Back To Top */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-500/40 transition-all hover:scale-110"
          >
            <Globe size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-500/40 transition-all hover:scale-110"
          >
            <Share2 size={18} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-purple-500/40 transition-all hover:scale-110"
          >
            <Send size={18} />
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 transition-all hover:scale-110 ml-2 cursor-pointer"
          >
            <ArrowUp size={18} />
          </button>
        </div>

      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-zinc-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <span>&copy; {new Date().getFullYear()} Jay Comendador (CodeCraft). All rights reserved.</span>
        <span>Built with React, Pure Tailwind CSS &amp; Node.js</span>
      </div>
    </footer>
  );
}
