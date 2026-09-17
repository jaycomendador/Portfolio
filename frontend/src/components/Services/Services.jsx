import { Code2, Server, Layout, Cpu, ArrowUpRight } from 'lucide-react';

export default function Services() {
  const serviceItems = [
    {
      icon: <Code2 size={28} className="text-purple-400" />,
      title: 'Frontend Development',
      description: 'Building ultra-fast, responsive, and accessible web interfaces using React, Next.js, and modern Tailwind CSS.',
      skills: ['React', 'Next.js', 'Tailwind', 'TypeScript'],
      gradient: 'from-purple-500/10 via-purple-500/5 to-transparent',
      borderColor: 'hover:border-purple-500/50',
    },
    {
      icon: <Server size={28} className="text-indigo-400" />,
      title: 'Full-Stack Web Apps',
      description: 'Architecting scalable end-to-end web applications with Node.js, Express, MongoDB, and RESTful APIs.',
      skills: ['Node.js', 'Express', 'MongoDB', 'REST API'],
      gradient: 'from-indigo-500/10 via-indigo-500/5 to-transparent',
      borderColor: 'hover:border-indigo-500/50',
    },
    {
      icon: <Layout size={28} className="text-cyan-400" />,
      title: 'UI/UX Design & Craft',
      description: 'Designing intuitive, user-centered digital interfaces with focus on sleek aesthetics, glassmorphism, and micro-interactions.',
      skills: ['Figma', 'Prototyping', 'Design Systems', 'Micro-animations'],
      gradient: 'from-cyan-500/10 via-cyan-500/5 to-transparent',
      borderColor: 'hover:border-cyan-500/50',
    },
    {
      icon: <Cpu size={28} className="text-violet-400" />,
      title: 'API & Performance Optimization',
      description: 'Optimizing web performance, SEO structure, lighthouse scores, lazy-loading, and third-party integrations.',
      skills: ['SEO', 'Performance', 'Vite', 'State Mgmt'],
      gradient: 'from-violet-500/10 via-violet-500/5 to-transparent',
      borderColor: 'hover:border-violet-500/50',
    },
  ];

  return (
    <section id="services" className="w-full bg-[#070711] py-20 px-6 border-t border-zinc-900/80 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wider uppercase">
            SERVICES
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight relative">
            Specialized Services I Offer
            <span className="block h-1 w-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto mt-3" />
          </h2>
        </div>

        {/* Services Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceItems.map((service, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 ${service.borderColor} backdrop-blur-md flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 group relative overflow-hidden`}
            >
              {/* Background Gradient Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="flex items-start justify-between relative z-10">
                <div className="p-3.5 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>

              <div className="space-y-3 relative z-10">
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                  {service.description}
                </p>
              </div>

              {/* Skills Pill Tags */}
              <div className="flex flex-wrap gap-2 pt-2 relative z-10">
                {service.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 rounded-full bg-zinc-800/60 border border-zinc-700/40 text-xs font-mono text-purple-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
