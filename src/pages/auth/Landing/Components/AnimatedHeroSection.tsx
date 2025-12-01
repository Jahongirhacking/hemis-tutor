import { paths } from '@/router/paths';
import { heroVideoUrl } from '@/utils/landingSiteContent';
import { ArrowRight, CheckCircle2, Play, Sparkles, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AnimatedHeroSectionProps = {
  mousePosition: { x: number; y: number };
};

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

const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = '',
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView();

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentValue = progress * end;

      // Agar end o'nlik son bo'lsa, bir xonali o'nlik ko'rinishda ko'rsat
      if (end % 1 !== 0) {
        setCount(Number(currentValue.toFixed(1)));
      } else {
        setCount(Math.floor(currentValue));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export function AnimatedHeroSection({
  mousePosition,
}: AnimatedHeroSectionProps) {
  const [heroRef, heroInView] = useInView();
  const navigate = useNavigate();

  const handlePlayVideo = () => {
    window.open(heroVideoUrl, '_blank');
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative hero-gradient pt-24 pb-16 overflow-hidden min-h-screen flex items-center"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="blob w-96 h-96 bg-teal-500 animate-morph"
          style={{
            top: '10%',
            right: '10%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div
          className="blob w-72 h-72 bg-cyan-400 animate-morph"
          style={{
            bottom: '20%',
            left: '15%',
            animationDelay: '2s',
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
          }}
        />
        <div
          className="blob w-48 h-48 bg-emerald-400 animate-morph"
          style={{
            top: '50%',
            right: '30%',
            animationDelay: '4s',
          }}
        />

        <div className="absolute top-1/4 left-10 animate-float text-4xl opacity-20">
          📚
        </div>
        <div
          className="absolute top-1/3 right-20 animate-float-reverse text-3xl opacity-20"
          style={{ animationDelay: '1s' }}
        >
          🎓
        </div>
        <div
          className="absolute bottom-1/3 left-1/4 animate-float text-3xl opacity-20"
          style={{ animationDelay: '2s' }}
        >
          ✨
        </div>
        <div className="absolute bottom-1/4 right-1/3 animate-float-slow text-4xl opacity-20">
          🌟
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
              opacity: 0.3 + Math.random() * 0.3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={heroInView ? 'slide-in-left' : 'opacity-0'}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-teal-300 text-sm font-medium mb-6 animate-bounce-soft">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              Hemis tizimi orqali boshqaring
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              <span className="inline-block hover:scale-105 transition-transform">
                Tyutorlar
              </span>{' '}
              <span className="inline-block hover:scale-105 transition-transform">
                —
              </span>{' '}
              <span className="text-gradient inline-block hover:scale-105 transition-transform leading-normal">
                yuksak mas'uliyat
              </span>{' '}
              <span className="inline-block hover:scale-105 transition-transform">
                egalari!
              </span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              Talabalarning o‘quv jarayonini individual tarzda
              qo‘llab-quvvatlash, ularning bo‘sh vaqtini mazmunli tashkil etish,
              yo‘naltirish va zarur ko‘nikmalarni o‘rgatish maqsadida malakali
              mutaxassislar hamjamiyatiga qo‘shiling.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate(paths.login)}
                className="btn-shine group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-400 to-teal-500 text-slate-900 font-bold rounded-2xl shadow-xl shadow-teal-500/30 hover:shadow-teal-500/50 transition-all hover:-translate-y-1 hover:scale-105 animate-gradient"
              >
                Tizimga kirish
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <button
                onClick={handlePlayVideo}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all hover:scale-105 ripple-effect"
              >
                <Play className="w-5 h-5 group-hover:scale-125 transition-transform" />
                Video ko'rish
              </button>
            </div>

            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10">
              <div className="group cursor-pointer">
                <div className="text-3xl font-bold text-white group-hover:text-teal-300 transition-colors">
                  <AnimatedCounter end={300} suffix="K+" />
                </div>
                <div className="text-sm text-slate-400">Faol tyutorlar</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="group cursor-pointer">
                <div className="text-3xl font-bold text-white group-hover:text-teal-300 transition-colors">
                  <AnimatedCounter end={204} suffix="+" />
                </div>
                <div className="text-sm text-slate-400">OTMlar</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="group cursor-pointer">
                <div className="text-3xl font-bold text-white group-hover:text-teal-300 transition-colors">
                  <AnimatedCounter end={1.7} suffix="M+" />
                </div>
                <div className="text-sm text-slate-400">Talabalar</div>
              </div>
            </div>
          </div>

          <div
            className={`hidden lg:block relative ${heroInView ? 'slide-in-right stagger-2' : 'opacity-0'}`}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 rounded-3xl animate-spin-slow opacity-20 blur-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl transform rotate-6 opacity-20 hover:rotate-12 transition-transform duration-500"></div>
              <div className="relative glass-dark rounded-3xl p-8 border border-white/10 hover:border-teal-500/50 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center animate-pulse-glow">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      Tyutor Dashboard
                    </div>
                    <div className="text-slate-400 text-sm">
                      Bugungi vazifalar
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Online
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      label: 'Talabalar bilan uchrashuv',
                      done: true,
                      time: '09:00',
                    },
                    { label: "Guruh yig'ilishi", done: true, time: '11:00' },
                    {
                      label: 'Individual konsultatsiya',
                      done: false,
                      time: '14:00',
                    },
                    { label: 'Hisobot tayyorlash', done: false, time: '16:00' },
                  ].map((task, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer hover:scale-102 ${
                        task.done
                          ? 'bg-teal-500/20 hover:bg-teal-500/30'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          task.done
                            ? 'bg-teal-500'
                            : 'border-2 border-slate-500 hover:border-teal-500'
                        }`}
                      >
                        {task.done && (
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span
                        className={`flex-1 text-sm ${task.done ? 'text-slate-400 line-through' : 'text-white'}`}
                      >
                        {task.label}
                      </span>
                      <span className="text-xs text-slate-500">
                        {task.time}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 text-sm">
                      Haftalik progress
                    </span>
                    <span className="text-teal-400 font-semibold">78%</span>
                  </div>
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full transition-all duration-1000 relative overflow-hidden"
                      style={{ width: heroInView ? '78%' : '0%' }}
                    >
                      <div className="absolute inset-0 shimmer"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  {[
                    { label: 'Talabalar', value: 24, icon: '👨‍🎓' },
                    { label: 'Uchrashuvlar', value: 8, icon: '📅' },
                    { label: 'Vazifalar', value: 12, icon: '✅' },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="text-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                    >
                      <div className="text-lg mb-1 group-hover:scale-125 transition-transform">
                        {stat.icon}
                      </div>
                      <div className="text-white font-bold">{stat.value}</div>
                      <div className="text-slate-500 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
