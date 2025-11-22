type Responsibility = {
  title: string;
  time: string;
};

type AboutSectionProps = {
  responsibilities: Responsibility[];
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
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#4ce54a]/20 to-[#4ce54a]/10">
              <svg
                className="h-5 w-5 text-[#4ce54a]"
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
          <div className="space-y-3">
            {responsibilities.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col gap-3 rounded-xl border-l-4 border-[#4ce54a] bg-white p-3 transition-all sm:flex-row sm:items-start sm:gap-4 sm:p-4"
              >
                <div className="flex items-center gap-3 sm:flex-shrink-0">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white border-2 border-slate-300">
                    <span className="text-sm font-bold text-slate-700">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-shrink-0 sm:hidden">
                    <div className="rounded-lg bg-white border-2 border-slate-300 px-3 py-1.5">
                      <p className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                        {item.time}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-snug text-slate-800">
                    {item.title}
                  </p>
                </div>
                <div className="hidden flex-shrink-0 pt-0.5 sm:block">
                  <div className="rounded-lg bg-white border-2 border-slate-300 px-3 py-1.5">
                    <p className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                      {item.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 rounded-[28px]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#4ce54a]/20 to-[#4ce54a]/10">
              <svg
                className="h-5 w-5 text-[#4ce54a]"
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
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-3 rounded-xl border-l-4 border-[#ffe066] bg-white p-3 transition-all sm:gap-4 sm:p-4">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#ffe066]/20 to-[#ffe066]/10">
                  <span className="text-xs font-bold text-[#ffe066]">1</span>
                </div>
              </div>
              <p className="flex-1 text-sm font-medium leading-snug text-slate-800">
                Talaba-yoshlarni vatanparvarlik va milliy qadriyatlarga sadoqat
                ruhida tarbiyalash
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-xl border-l-4 border-[#4cc5ff] bg-white p-3 transition-all sm:gap-4 sm:p-4">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#4cc5ff]/20 to-[#4cc5ff]/10">
                  <span className="text-xs font-bold text-[#4cc5ff]">2</span>
                </div>
              </div>
              <p className="flex-1 text-sm font-medium leading-snug text-slate-800">
                Ularning shaxsiy hamda kasbiy rivojlanishiga yaqindan yordam
                berish
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-xl border-l-4 border-[#64ee61] bg-white p-3 transition-all sm:gap-4 sm:p-4">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#64ee61]/20 to-[#64ee61]/10">
                  <span className="text-xs font-bold text-[#64ee61]">3</span>
                </div>
              </div>
              <p className="flex-1 text-sm font-medium leading-snug text-slate-800">
                Ta'lim tarbiya jarayonlariga moslashuvini qo'llab-quvvatlash
                hamda bo'sh vaqtlarini mazmunli tashkil etish
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
