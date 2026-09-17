import { ArrowUpRight, Layout, CheckSquare, LineChart } from 'lucide-react';

export default function Projects() {
  const projectItems = [
    {
      id: '01',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with modern UI/UX.',
      icon: <Layout size={28} className="text-purple-400" />,
      tag: 'E-Commerce',
      gradient: 'from-purple-900/40 via-indigo-900/20 to-zinc-900/90',
    },
    {
      id: '02',
      title: 'Task Management App',
      description: 'Collaborative task management application.',
      icon: <CheckSquare size={28} className="text-indigo-400" />,
      tag: 'Productivity',
      gradient: 'from-slate-800/60 via-zinc-900/50 to-zinc-900/90',
    },
    {
      id: '03',
      title: 'Crypto Dashboard',
      description: 'Real-time cryptocurrency tracking dashboard.',
      icon: <LineChart size={28} className="text-cyan-400" />,
      tag: 'Fintech',
      gradient: 'from-blue-950/60 via-purple-950/30 to-zinc-900/90',
    },
  ];

  return (
    <section id="projects" className="w-full bg-[#070711] py-20 px-6 border-t border-zinc-900/80 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wider uppercase">
            FEATURED PROJECTS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight relative">
            Some of My Recent Work
            <span className="block h-1 w-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto mt-3" />
          </h2>
        </div>

        {/* Project Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectItems.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-purple-500/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 group"
            >
              {/* Graphic Mockup Area */}
              <div className={`w-full h-48 bg-gradient-to-br ${project.gradient} p-6 relative flex flex-col justify-between border-b border-zinc-800/60 overflow-hidden`}>
                
                {/* Number Badge Top Left */}
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-zinc-950/60 border border-zinc-700/60 text-purple-300 self-start backdrop-blur-md">
                  {project.id}
                </span>

                {/* Center Visual Mockup Box */}
                <div className="my-auto mx-auto w-4/5 h-24 rounded-xl bg-zinc-950/80 border border-zinc-700/40 p-3 shadow-xl backdrop-blur-md flex flex-col justify-between transform group-hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">{project.tag}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
                      {project.icon}
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <div className="h-2 w-3/4 bg-purple-400/40 rounded-full" />
                      <div className="h-2 w-1/2 bg-zinc-700/60 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Content Footer */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View Project
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center gap-2 mt-12">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500" />
          <span className="w-2 h-2 rounded-full bg-zinc-700 hover:bg-zinc-500 transition-colors cursor-pointer" />
          <span className="w-2 h-2 rounded-full bg-zinc-700 hover:bg-zinc-500 transition-colors cursor-pointer" />
        </div>

      </div>
    </section>
  );
}
