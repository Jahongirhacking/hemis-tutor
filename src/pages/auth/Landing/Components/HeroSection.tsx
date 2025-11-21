import { paths } from '@/router/paths';
import { GradientButton } from './ui/GradientButton';
import { useNavigate } from 'react-router-dom';

type HeroSectionProps = {
  heroImage: string;
};

export function HeroSection({ heroImage }: HeroSectionProps) {
  const navigate = useNavigate();
  return (
    <section
      id="asosiy"
      className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.1fr,0.9fr] lg:gap-12"
    >
      <div className="space-y-6 text-slate-900">
        <h1 className="font-brand text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
          <span className="text-[#4ce54a]">Tyutorlar</span> – yuksak mas’uliyat
          egalari!
        </h1>
        <p className="max-w-xl text-base text-slate-600 sm:text-lg">
          Talabaning o‘qish jarayonini individual tarzda qo‘llab-quvvatlash,
          yo‘naltirish va o‘rgatish uchun zarur bo‘lgan malakali mutaxassislar
          hamjamiyatiga qo‘shiling.
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <GradientButton
            onClick={() => {
              navigate(paths.login);
            }}
            label="Tizimga kirish"
            className="px-6 py-3 text-sm"
          />
          <button className="rounded-full border border-[#4ce54a] px-6 py-3 text-sm font-medium text-[#4ce54a] transition hover:bg-[#4ce54a] hover:text-white">
            Batafsil
          </button>
        </div>
        <div className="flex items-center gap-6 pt-3 text-xs uppercase tracking-[0.35em] text-slate-500 sm:text-sm">
          <span>Talabalar</span>
          <span className="h-px flex-1 bg-slate-200" />
          <span>Tyutorlar</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/40 to-transparent blur-2xl" />
        <div className="relative overflow-hidden rounded-[32px] border border-white/50 bg-white/70 shadow-2xl backdrop-blur">
          <div className="absolute inset-4 flex gap-3 opacity-70">
            <div className="flex-1 rounded-[28px] bg-gradient-to-b from-[#94f78b] via-[#9bf6d5] to-[#7be1ff]" />
            <div className="flex-1 rounded-[28px] bg-gradient-to-b from-[#66d9ff] via-[#97e1ff] to-[#b6c6ff]" />
            <div className="flex-1 rounded-[28px] bg-gradient-to-b from-[#c1c2ff] via-[#c4f1ff] to-[#ffe3f5]" />
          </div>
          <img
            alt="Tyutor darsi"
            className="relative z-10 h-full w-full object-cover"
            src={heroImage}
          />
        </div>
        <button
          className="absolute left-[50%] top-[50%] flex h-[70px] w-[70px] -translate-x-[50%] -translate-y-[50%] items-center justify-center rounded-full bg-white/85 shadow-[0_20px_45px_rgba(15,23,42,0.35)]"
          aria-label="Play video"
        >
          <img
            alt="Play"
            className="h-[32px] w-[32px]"
            src="/icons/player.svg"
          />
        </button>
      </div>
    </section>
  );
}
