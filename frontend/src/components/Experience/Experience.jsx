import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      period: '2024 - Present',
      role: 'Senior Frontend Developer',
      company: 'TechCraft Solutions',
      description: 'Leading frontend architecture, developing high-performance React/Next.js web apps, and mentoring junior engineers.',
    },
    {
      period: '2022 - 2024',
      role: 'Full-Stack Developer',
      company: 'Digital Innovators Inc.',
      description: 'Built scalable MERN stack web applications, RESTful microservices, and client dashboard integrations.',
    },
    {
      period: '2021 - 2022',
      role: 'Junior Web Developer',
      company: 'Creative Code Studio',
      description: 'Developed responsive UI components, integrated backend APIs, and optimized website SEO & performance.',
    },
  ];

  const education = [
    {
      period: '2022 - 2026',
      degree: 'BS Information Technology',
      institution: 'Northwest Samar State University',
      description: 'Specializing in Web Engineering, Database Systems, Software Architecture, and Mobile Application Development.',
    },
    {
      period: '2020 - 2022',
      degree: 'Senior High School (STEM)',
      institution: 'Calbayog City National High School',
      description: 'Graduated with Honors. Focused on Computer Programming, Advanced Mathematics, and Technical Research.',
    },
  ];

  return (
    <section id="experience" className="w-full bg-[#070711] py-20 px-6 border-t border-zinc-900/80 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wider uppercase">
            MY JOURNEY
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight relative">
            Work Experience &amp; Education
            <span className="block h-1 w-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto mt-3" />
          </h2>
        </div>

        {/* Dual Column Timeline */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Column 1: Work Experience */}
          <div className="flex flex-col space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
                <Briefcase size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-wide">
                Work Experience
              </h3>
            </div>

            <div className="relative pl-6 border-l-2 border-purple-500/30 space-y-8">
              {experiences.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot Marker */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-purple-500 border-4 border-[#070711] group-hover:scale-125 transition-transform shadow-sm shadow-purple-500" />
                  
                  <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-purple-500/40 backdrop-blur-md space-y-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 flex items-center gap-1.5">
                        <Calendar size={12} />
                        {item.period}
                      </span>
                      <span className="text-xs font-medium text-zinc-400">{item.company}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {item.role}
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Education */}
          <div className="flex flex-col space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-wide">
                Education &amp; Credentials
              </h3>
            </div>

            <div className="relative pl-6 border-l-2 border-indigo-500/30 space-y-8">
              {education.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot Marker */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#070711] group-hover:scale-125 transition-transform shadow-sm shadow-indigo-500" />
                  
                  <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-indigo-500/40 backdrop-blur-md space-y-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 flex items-center gap-1.5">
                        <Calendar size={12} />
                        {item.period}
                      </span>
                      <span className="text-xs font-medium text-zinc-400">{item.institution}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {item.degree}
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
