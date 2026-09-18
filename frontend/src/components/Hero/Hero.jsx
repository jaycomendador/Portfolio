import { useState } from 'react';
import HeroNav from './HeroNav.jsx';
import {
  ArrowUpRight,
  Download,
  Terminal,
  User,
  Sparkles,
  Code,
  Layers,
  FileCode2,
  Globe,
  Flame,
  Zap,
} from 'lucide-react';

export default function Hero() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <div className="w-full bg-[#070711] text-zinc-100 flex flex-col justify-between selection:bg-purple-500 selection:text-white relative overflow-hidden font-sans pt-2 pb-16">
      {/* Background Ambient Lights using Tailwind */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Navigation */}
      <HeroNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero Body */}
      <main className="w-full max-w-7xl mx-auto px-6 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto">
        
        {/* Left Side Info */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            I'M A WEB DEVELOPER
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Hi, I’m{' '}
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-violet-500 bg-clip-text text-transparent">
              Alex
            </span>
            <br />
            I build things for the web.
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
            I'm a passionate web developer specializing in building exceptional digital experiences with modern technologies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="bg-gradient-to-r from-indigo-500 via-purple-600 to-violet-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-7 py-3.5 rounded-full flex items-center gap-2 text-sm sm:text-base transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5"
            >
              View My Work
              <ArrowUpRight size={18} />
            </a>

            <a
              href="#about"
              className="bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold px-7 py-3.5 rounded-full border border-zinc-700/80 hover:border-zinc-500 flex items-center gap-2 text-sm sm:text-base backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
            >
              Download CV
              <Download size={18} />
            </a>
          </div>

          {/* Tech Stack Icons */}
          <div className="pt-8 flex flex-col gap-3.5 w-full">
            <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
              TECHNOLOGIES I WORK WITH
            </span>

            <div className="flex flex-wrap items-center gap-3">
              {/* HTML5 */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-b from-orange-500/20 to-orange-600/10 border border-orange-500/30 text-orange-400 text-xs font-semibold hover:scale-105 transition-transform cursor-pointer shadow-sm">
                <FileCode2 size={16} className="text-orange-500" />
                <span>HTML5</span>
              </div>

              {/* CSS3 */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-b from-blue-500/20 to-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-semibold hover:scale-105 transition-transform cursor-pointer shadow-sm">
                <Layers size={16} className="text-blue-500" />
                <span>CSS3</span>
              </div>

              {/* JS */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-b from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold hover:scale-105 transition-transform cursor-pointer shadow-sm">
                <Zap size={16} className="text-yellow-400" />
                <span>JS</span>
              </div>

              {/* TS */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-b from-blue-600/20 to-blue-700/10 border border-blue-600/30 text-blue-300 text-xs font-semibold hover:scale-105 transition-transform cursor-pointer shadow-sm">
                <Code size={16} className="text-blue-400" />
                <span>TS</span>
              </div>

              {/* React */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-b from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:scale-105 transition-transform cursor-pointer shadow-sm">
                <Sparkles size={16} className="text-cyan-400" />
                <span>React</span>
              </div>

              {/* Node.js */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-b from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:scale-105 transition-transform cursor-pointer shadow-sm">
                <Globe size={16} className="text-emerald-500" />
                <span>Node.js</span>
              </div>

              {/* Tailwind */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-b from-sky-500/20 to-teal-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold hover:scale-105 transition-transform cursor-pointer shadow-sm">
                <Flame size={16} className="text-sky-400" />
                <span>Tailwind</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Visual Avatar & Code Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          
          {/* Main Visual Circle */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
            
            {/* Purple Glowing Backdrop */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-violet-700 opacity-90 blur-sm shadow-2xl shadow-purple-600/50" />
            
            {/* Inner Border Ring */}
            <div className="absolute inset-3 rounded-full border border-purple-300/30 bg-purple-950/40 backdrop-blur-sm flex items-center justify-center">
              
              {/* Developer Avatar Icon */}
              <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-b from-purple-500/30 to-indigo-900/60 border border-purple-400/40 flex flex-col items-center justify-center text-purple-200 shadow-inner group hover:scale-105 transition-transform duration-500">
                <div className="relative">
                  <User size={88} className="text-purple-200 stroke-[1.5] drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
                  <Sparkles size={24} className="absolute -top-1 -right-2 text-indigo-300 animate-bounce" />
                </div>
                <span className="mt-2 text-xs font-mono tracking-widest text-purple-300 uppercase">DEV AVATAR</span>
              </div>
            </div>

            {/* Decorative Grid Accent Dots */}
            <div className="absolute -top-6 -right-6 grid grid-cols-4 gap-2 opacity-30 pointer-events-none">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-300" />
              ))}
            </div>

            {/* Floating Code Card */}
            <div className="absolute -bottom-6 -right-4 sm:bottom-0 sm:right-0 w-64 sm:w-72 rounded-2xl bg-zinc-950/90 border border-zinc-800 p-4 shadow-2xl backdrop-blur-xl transition-transform hover:-translate-y-1">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <Terminal size={14} className="text-purple-400" />
                  <span>// Code</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Code Contents */}
              <pre className="text-xs font-mono leading-relaxed overflow-x-auto text-zinc-300">
                <code>
                  <span className="text-purple-400 font-semibold">const</span>{' '}
                  <span className="text-indigo-300">developer</span> = &#123;{'\n'}
                  {'  '}
                  <span className="text-cyan-300">name</span>: <span className="text-amber-300 font-sans">&quot;Alex&quot;</span>,{'\n'}
                  {'  '}
                  <span className="text-cyan-300">skills</span>: [<span className="text-amber-300 font-sans">&quot;HTML&quot;</span>, <span className="text-amber-300 font-sans">&quot;CSS&quot;</span>, <span className="text-amber-300 font-sans">&quot;JS&quot;</span>],{'\n'}
                  {'  '}
                  <span className="text-cyan-300">passionate</span>: <span className="text-amber-300 font-sans">&quot;Building things for the web&quot;</span>{'\n'}
                  &#125;;
                </code>
              </pre>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
