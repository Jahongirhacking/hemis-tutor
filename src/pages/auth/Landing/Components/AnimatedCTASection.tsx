import { handbookCover, handbookImage, handbookTexture } from '@/utils/landingSiteContent';
import { Download } from 'lucide-react';

export function AnimatedCTASection() {
  const handleDownload = () => {
    window.open('/pdf/qo\'llanma.pdf', '_blank');
  };

  return (
    <section id="cta" className="py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/60 p-[2px] shadow-card">
          <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-[#5ce094] via-[#37b1d0] to-[#0f6ad9] p-6 text-white sm:p-10">
            <img
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-70"
              src={handbookImage}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#5ce094]/70 via-[#37b1d0]/80 to-[#0f6ad9]/90" />
            <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow-sm backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-white" />
                  O'quv qo'llanma
                </div>
                <h2 className="font-display text-3xl font-bold leading-snug sm:text-4xl">
                  Oliy ta'lim muassasalarida tyutorlik faoliyatini amalga oshirish
                </h2>
                <p className="text-sm text-white/85 sm:text-base">
                  Oliy ta'lim muassasalarida tyutorlik faoliyatini tashkil etish
                  bo'yicha takliflar, tavsiyalar va uslubiy ko'rsatmalar jamlanmasi.
                </p>
                <button
                  onClick={handleDownload}
                  className="btn-shine group mt-2 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_10px_25px_rgba(0,0,0,0.15)] transition hover:-translate-y-0.5 hover:scale-105"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Yuklab olish
                </button>
              </div>

              <div className="relative mt-6 w-full max-w-[240px] flex-shrink-0 self-center sm:mt-0 sm:self-stretch">
                <div className="pointer-events-none absolute -left-6 top-6 hidden h-12 w-12 rounded-full border border-white/30 bg-white/10 backdrop-blur sm:block" />
                <div className="relative overflow-visible rounded-[18px] shadow-[0_25px_70px_rgba(15,23,42,0.35)]">
                  <div className="absolute -left-3 top-3 h-full w-full rounded-[20px] bg-white/30 blur-xl" />
                  <div className="relative overflow-hidden rounded-[18px] border border-white/20">
                    <img
                      alt="Handbook cover"
                      className="h-full w-full object-cover"
                      src={handbookCover}
                    />
                    <img
                      alt=""
                      className="absolute inset-0 mix-blend-multiply opacity-80"
                      src={handbookTexture}
                    />
                    <div className="absolute inset-0 rounded-[18px] shadow-[inset_0_20px_40px_rgba(255,255,255,0.35)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

