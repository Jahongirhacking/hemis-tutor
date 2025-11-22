import { paths } from '@/router/paths';
import { heroVideoUrl } from '@/utils/landingSiteContent';
import { useNavigate } from 'react-router-dom';
import { GradientButton } from './ui/GradientButton';

export function HeroSection() {
  const navigate = useNavigate();

  const handlePlayVideo = () => {
    window.open(heroVideoUrl, '_blank');
  };
  return (
    <section
      id="asosiy"
      className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.1fr,0.9fr] lg:gap-12 lg:items-start"
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

      <div className="relative w-full">
        <div className="relative w-full rounded-[32px] sm:mx-auto sm:max-w-md lg:max-w-none">
          <div className="relative aspect-square w-full rounded-[32px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px]">
            <img
              src="/images/HeroBackImage.png"
              alt="Hero background"
              className="absolute left-[10px] top-[10px] h-full w-full object-cover sm:left-[15px] sm:top-[15px] lg:left-[20px] lg:top-[20px]"
            />
            <img
              src="/images/HeroImage.png"
              alt="Tyutor darsi"
              className="relative z-10 h-full w-full object-cover"
            />
          </div>
          <img
            alt="Play"
            className="absolute left-1/2 top-1/2 z-20 h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer sm:h-12 sm:w-12 lg:h-[70px] lg:w-[70px]"
            src="/images/Player.png"
            onClick={handlePlayVideo}
          />
        </div>
      </div>
    </section>
  );
}
