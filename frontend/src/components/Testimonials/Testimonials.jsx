import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Sarah Jenkins',
      role: 'Product Manager at TechFlow',
      rating: 5,
      comment: 'Alex delivered an outstanding web application ahead of deadline. The UI layout, performance, and attention to detail surpassed our expectations!',
      avatarBg: 'from-purple-600 to-indigo-600',
    },
    {
      name: 'Marcus Vance',
      role: 'CEO at CloudScale',
      rating: 5,
      comment: 'Working with Alex was a fantastic experience. Highly skilled in React, Tailwind, and Node backend APIs. Our client satisfaction increased immensely.',
      avatarBg: 'from-indigo-600 to-blue-600',
    },
    {
      name: 'Elena Rostova',
      role: 'Creative Director at Studio X',
      rating: 5,
      comment: 'The design execution and responsiveness are world-class. Clean code structure, seamless animations, and excellent communication throughout.',
      avatarBg: 'from-violet-600 to-purple-700',
    },
  ];

  return (
    <section id="testimonials" className="w-full bg-[#070711] py-20 px-6 border-t border-zinc-900/80 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wider uppercase">
            TESTIMONIALS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight relative">
            What Clients Say About Me
            <span className="block h-1 w-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto mt-3" />
          </h2>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-purple-500/40 backdrop-blur-md flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 relative group"
            >
              <Quote size={32} className="text-purple-500/30 group-hover:text-purple-400/50 transition-colors" />

              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Comment Text */}
              <p className="text-zinc-300 text-sm leading-relaxed italic font-normal">
                &quot;{review.comment}&quot;
              </p>

              {/* Reviewer Bio */}
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/60">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${review.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                  {review.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white tracking-wide">
                    {review.name}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {review.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
