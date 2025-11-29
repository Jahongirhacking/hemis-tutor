import { responsibilities } from '@/utils/landingSiteContent';
import { CheckCircle2, Target } from 'lucide-react';
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
        <div
          className={`text-center max-w-3xl mx-auto mb-16 ${aboutInView ? 'slide-in-up' : 'opacity-0'}`}
        >
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 text-sm font-semibold rounded-full mb-4 hover:scale-105 transition-transform cursor-pointer">
            Tyutor haqida
          </span>
          <h2 className="font-display text-3xl sm:text-4xl tracking-wide text-slate-800 mb-4">
            Tyutorning kunlik vazifalari
          </h2>
          <p className="text-slate-600">
            Tyutor har kuni talabalar bilan ishlash va ularni qo'llab-quvvatlash
            uchun belgilangan vazifalarni bajaradi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kunlikVazifalar.map((item, i) => (
            <div
              key={i}
              className={`card-hover bg-white rounded-2xl p-6 shadow-sm border border-slate-100 group flex flex-col ${
                aboutInView ? 'slide-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white text-xl shadow-lg shadow-teal-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all">
                  {item.icon}
                </div>
                <div className="px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 text-sm font-medium group-hover:bg-teal-100 group-hover:text-teal-700 transition-colors">
                  {item.time}
                </div>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed group-hover:text-slate-900 transition-colors flex-1">
                {item.task}
              </p>
              <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full transition-all duration-500 group-hover:w-full"
                  style={{ width: '0%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-20 ${aboutInView ? 'scale-in stagger-4' : 'opacity-0'}`}
        >
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="blob w-64 h-64 bg-teal-500 -top-20 -right-20 opacity-10 group-hover:opacity-20 transition-opacity"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-teal-500/20 group-hover:bg-teal-500/30 transition-colors">
                  <Target className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Kasbiy maqsadlari
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {kasbiyMaqsadlar.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-teal-500/30 transition-all cursor-pointer group/item hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 group-hover/item:rotate-12 transition-all shadow-lg shadow-teal-500/30">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed group-hover/item:text-white transition-colors">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
