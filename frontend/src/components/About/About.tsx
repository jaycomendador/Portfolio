import { ArrowUpRight, Calendar, Code, Smile, Trophy } from 'lucide-react';

export default function About() {
  const stats = [
    {
      icon: <Calendar size={22} className="text-purple-400" />,
      value: '4+',
      label: 'Years Experience',
    },
    {
      icon: <Code size={22} className="text-purple-400" />,
      value: '50+',
      label: 'Projects Completed',
    },
    {
      icon: <Smile size={22} className="text-purple-400" />,
      value: '30+',
      label: 'Happy Clients',
    },
    {
      icon: <Trophy size={22} className="text-purple-400" />,
      value: '100%',
      label: 'Client Satisfaction',
    },
  ];

  return (
    <section id="about" className="w-full bg-[#070711] py-20 px-6 border-t border-zinc-900/80 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side Info */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-6">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wider uppercase">
            ABOUT ME
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            I’m passionate about <br />
            creating digital solutions
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
            With 4+ years of experience in web development, I help businesses and individuals bring their ideas to life through clean, efficient, and user-friendly code.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 font-semibold text-sm border border-zinc-700/80 hover:border-purple-500/50 transition-all shadow-md hover:-translate-y-0.5"
          >
            Learn More About Me
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Right Side Stats Grid (2x2) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-purple-500/40 backdrop-blur-md flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {item.value}
                </span>
                <span className="text-xs sm:text-sm font-medium text-zinc-400">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
