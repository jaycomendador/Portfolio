import {
  FileCode2,
  Layers,
  Zap,
  Code,
  Sparkles,
  Globe,
  Flame,
  GitBranch,
  Terminal,
} from 'lucide-react';

export default function Skills() {
  const skillList = [
    {
      name: 'HTML',
      percentage: '95%',
      icon: <FileCode2 size={20} className="text-orange-500" />,
      color: 'from-orange-500 to-amber-500',
    },
    {
      name: 'React.js',
      percentage: '90%',
      icon: <Sparkles size={20} className="text-cyan-400" />,
      color: 'from-cyan-500 to-indigo-500',
    },
    {
      name: 'Node.js',
      percentage: '85%',
      icon: <Globe size={20} className="text-emerald-500" />,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      name: 'CSS',
      percentage: '90%',
      icon: <Layers size={20} className="text-blue-500" />,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      name: 'Next.js',
      percentage: '85%',
      icon: <Terminal size={20} className="text-zinc-200" />,
      color: 'from-zinc-400 to-purple-500',
    },
    {
      name: 'Tailwind CSS',
      percentage: '95%',
      icon: <Flame size={20} className="text-sky-400" />,
      color: 'from-sky-400 to-blue-600',
    },
    {
      name: 'JavaScript',
      percentage: '90%',
      icon: <Zap size={20} className="text-yellow-400" />,
      color: 'from-yellow-400 to-amber-500',
    },
    {
      name: 'TypeScript',
      percentage: '85%',
      icon: <Code size={20} className="text-blue-400" />,
      color: 'from-blue-400 to-indigo-600',
    },
    {
      name: 'Git',
      percentage: '88%',
      icon: <GitBranch size={20} className="text-orange-400" />,
      color: 'from-orange-400 to-red-500',
    },
  ];

  return (
    <section id="skills" className="w-full bg-[#070711] py-20 px-6 border-t border-zinc-900/80 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wider uppercase">
            MY SKILLS
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight relative">
            Technologies I Master
            <span className="block h-1 w-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto mt-3" />
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillList.map((skill, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-purple-500/40 backdrop-blur-md flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/5 group"
            >
              {/* Skill Top Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-zinc-800/60 border border-zinc-700/50 group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                  <span className="font-bold text-white text-base tracking-wide">
                    {skill.name}
                  </span>
                </div>
                <span className="text-xs font-semibold text-zinc-400 font-mono">
                  {skill.percentage}
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-2 rounded-full bg-zinc-800/80 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 transition-all duration-1000 shadow-sm"
                  style={{ width: skill.percentage }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
