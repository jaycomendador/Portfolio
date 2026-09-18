import { useState } from 'react';
import { Code2, ArrowUpRight, Menu, X } from 'lucide-react';

export default function HeroNav({ activeTab = 'Home', setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Blog', 'Contact'];

  return (
    <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-50">
      {/* Brand Logo */}
      <a href="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-tight group">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
          <Code2 size={20} className="stroke-[2.5]" />
        </div>
        <span className="text-white font-semibold">
          Code<span className="text-purple-400">Craft</span>
        </span>
      </a>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 bg-zinc-900/60 border border-zinc-800/80 px-6 py-2.5 rounded-full backdrop-blur-md">
        {navItems.map((item) => {
          const isActive = activeTab === item;
          return (
            <button
              key={item}
              onClick={() => setActiveTab && setActiveTab(item)}
              className={`relative text-sm font-medium transition-colors hover:text-white ${
                isActive ? 'text-white font-semibold' : 'text-zinc-400'
              }`}
            >
              {item}
              {isActive && (
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-sm shadow-purple-500" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Action Button */}
      <div className="hidden md:flex items-center">
        <a
          href="#contact"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-all hover:scale-105"
        >
          Hire Me
          <ArrowUpRight size={16} />
        </a>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-zinc-300 p-2 hover:text-white"
        aria-label="Toggle Navigation"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-6 right-6 bg-zinc-900/95 border border-zinc-800 p-6 rounded-2xl backdrop-blur-xl flex flex-col gap-4 shadow-2xl md:hidden z-50">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveTab && setActiveTab(item);
                setMobileMenuOpen(false);
              }}
              className={`text-left text-base font-medium py-2 ${
                activeTab === item ? 'text-purple-400 font-bold' : 'text-zinc-300'
              }`}
            >
              {item}
            </button>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white w-full py-3 rounded-xl text-center text-sm font-semibold flex items-center justify-center gap-1.5 mt-2 shadow-lg shadow-purple-500/30"
          >
            Hire Me
            <ArrowUpRight size={16} />
          </a>
        </div>
      )}
    </header>
  );
}
