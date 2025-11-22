type AboutSectionProps = {
  responsibilities: string[];
};

export function AboutSection({}: AboutSectionProps) {
  return (
    <section id="tanlovlar" className="space-y-8 bg-white">
      <div>
        <span className="inline-block rounded-full bg-[#4ce54a] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.4em] text-white">
          Tyutor haqida
        </span>
        <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Tyutorlar – talabaning o‘qish jarayonini individual tarzda
          qo‘llab-quvvatlaydigan, yo‘naltiradigan va o‘rgatadigan mutaxassis.
        </h2>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-white/80">
        <img
          src="/images/students.png"
          alt="Talabalar"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
