import { Pill } from "./ui/Pill";

type AboutSectionProps = {
  responsibilities: string[];
};

export function AboutSection({ responsibilities }: AboutSectionProps) {
  return (
    <section
      id="tanlovlar"
      className="space-y-8 rounded-[36px] bg-gradient-to-r from-[#f1ffe1] via-white to-[#e8fafe] p-6 shadow-card sm:p-8"
    >
      <div>
        <span className="inline-block rounded-full bg-[#4ce54a] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.4em] text-white">
          Tyutor haqida
        </span>
        <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Tyutorlar – talabaning o‘qish jarayonini individual tarzda
          qo‘llab-quvvatlaydigan, yo‘naltiradigan va o‘rgatadigan mutaxassis.
        </h2>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex flex-col gap-4 lg:w-1/2">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-900">
            <span className="rounded-full bg-[#ffe066]/70 px-4 py-1">
              TALABALAR
            </span>
            <span className="rounded-full bg-[#4cc5ff]/70 px-4 py-1">
              TYUTORLAR
            </span>
          </div>
          <p className="text-base text-slate-600 sm:text-lg">
            Talaba va tyutor o‘rtasidagi doimiy aloqadorlik o‘qishdagi
            muammolarni tezda aniqlash va ularni hal etishda yordam beradi.
            Tyutorlar ota-onalar bilan ham muntazam ishlaydi.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {responsibilities.map((item) => (
              <div
                key={item}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-[28px] bg-white/80 p-6 shadow-inner">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {["A", "B", "C", "D", "E", "F"].map((letter) => (
              <div
                key={letter}
                className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-[#d1fbc1] to-[#90e0c1] text-sm font-semibold text-slate-700 shadow-md"
              >
                {letter}
              </div>
            ))}
          </div>
          <p className="text-center text-base font-medium text-slate-600">
            Har bir talabaga moslangan individual ishlash uslubi ularning
            muvaffaqiyatini oshiradi.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-700">
            <Pill className="border-[#ffe066]/50 bg-white">
              Tajriba almashish
            </Pill>
            <Pill className="border-[#4cc5ff]/40 bg-white">Monitoring</Pill>
            <Pill className="border-[#64ee61]/40 bg-white">Motivatsiya</Pill>
          </div>
        </div>
      </div>
    </section>
  );
}
