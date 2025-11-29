import { responsibilities } from '@/utils/landingSiteContent';
import { useEffect, useRef, useState } from 'react';

const useInView = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView] as const;
};

const kunlikVazifalar = responsibilities.map((item, index) => ({
  time: item.time,
  task: item.title,
  icon: ['🌅', '👨‍🏫', '💬', '🏠', '📊', '🤝', '📚', '📝'][index] || '📋',
}));

const kasbiyMaqsadlar = [
  'Talaba yoshlarni vatanparvarlik va milliy qadriyatlarini sinfga rivojlantirish',
  "Ta'lim tizimi jarayonlariga ma'naviyatlarni qo'llab-quvvatlash hamda tuzli mustahkamlash",
  'Ularning shuning hamada kasbiy rangsizlarning yoqonlar yoshish',
  "Talabalarning akademik muvaffaqiyatlarini oshirish va ularga professional yondan ko'rsatish",
];

export function AnimatedAboutSection() {
  const [aboutRef, aboutInView] = useInView();

  return (
    <section
      id="about"
      ref={aboutRef}
      className="py-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 pattern-dots opacity-30"></div>

      <div className="absolute top-20 right-10 w-20 h-20 bg-teal-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-cyan-200 rounded-full opacity-20 animate-float-reverse"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`space-y-8 rounded-[36px] bg-gradient-to-r from-teal-50 via-white to-cyan-50 p-6 shadow-lg sm:p-8 ${aboutInView ? 'slide-in-up' : 'opacity-0'}`}>
          <div>
            <p className="font-display text-3xl tracking-wide text-slate-900 sm:text-4xl">
              Tyutor haqida
            </p>
          </div>

          <div className="space-y-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/20 to-teal-500/10">
                  <svg
                    className="h-5 w-5 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 sm:text-xl">
                  Tyutorning bir kunlik vazifalari
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {kunlikVazifalar.map((item, index) => (
                  <div
                    key={index}
                    className="group flex flex-col gap-3 rounded-xl border-l-4 border-teal-500 bg-white p-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-teal-600 sm:flex-row sm:items-start sm:gap-4 sm:p-4"
                  >
                    <div className="flex items-center gap-3 sm:flex-shrink-0">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white border-2 border-teal-300 transition-all duration-300 group-hover:border-teal-500 group-hover:bg-teal-50 group-hover:scale-110">
                        <span className="text-sm font-bold text-teal-700 transition-colors duration-300 group-hover:text-teal-600">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-shrink-0 sm:hidden">
                        <div className="rounded-lg bg-white border-2 border-teal-300 px-3 py-1.5 transition-all duration-300 group-hover:border-teal-500 group-hover:bg-teal-50 group-hover:scale-105">
                          <p className="text-xs font-semibold text-teal-700 whitespace-nowrap transition-colors duration-300 group-hover:text-teal-600">
                            {item.time}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug text-slate-800 transition-colors duration-300 group-hover:text-slate-900">
                        {item.task}
                      </p>
                    </div>
                    <div className="hidden flex-shrink-0 pt-0.5 sm:block">
                      <div className="rounded-lg bg-white border-2 border-teal-300 px-3 py-1.5 transition-all duration-300 group-hover:border-teal-500 group-hover:bg-teal-50 group-hover:scale-105">
                        <p className="text-xs font-semibold text-teal-700 whitespace-nowrap transition-colors duration-300 group-hover:text-teal-600">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/20 to-teal-500/10">
                  <svg
                    className="h-5 w-5 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 sm:text-xl">
                  Kasbiy maqsadlari
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {kasbiyMaqsadlar.map((item, i) => {
                  const colors = [
                    { border: 'border-teal-400', hoverBorder: 'hover:border-teal-500', bg: 'from-teal-400/20 to-teal-400/10', hoverBg: 'group-hover:from-teal-400/30 group-hover:to-teal-400/20', text: 'text-teal-500' },
                    { border: 'border-cyan-400', hoverBorder: 'hover:border-cyan-500', bg: 'from-cyan-400/20 to-cyan-400/10', hoverBg: 'group-hover:from-cyan-400/30 group-hover:to-cyan-400/20', text: 'text-cyan-500' },
                    { border: 'border-teal-500', hoverBorder: 'hover:border-teal-600', bg: 'from-teal-500/20 to-teal-500/10', hoverBg: 'group-hover:from-teal-500/30 group-hover:to-teal-500/20', text: 'text-teal-600' },
                    { border: 'border-cyan-500', hoverBorder: 'hover:border-cyan-600', bg: 'from-cyan-500/20 to-cyan-500/10', hoverBg: 'group-hover:from-cyan-500/30 group-hover:to-cyan-500/20', text: 'text-cyan-600' },
                  ];
                  const color = colors[i] || colors[0];
                  return (
                    <div
                      key={i}
                      className={`group flex items-start gap-3 rounded-xl border-l-4 ${color.border} ${color.hoverBorder} bg-white p-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 sm:gap-4 sm:p-4`}
                    >
                      <div className="flex-shrink-0">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${color.bg} ${color.hoverBg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                          <span className={`text-xs font-bold ${color.text} transition-transform duration-300`}>{i + 1}</span>
                        </div>
                      </div>
                      <p className="flex-1 text-sm font-medium leading-snug text-slate-800 transition-colors duration-300 group-hover:text-slate-900">
                        {item}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
