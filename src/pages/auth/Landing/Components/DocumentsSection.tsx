import { LexLogo } from '../../../../../public/icons/LexLogo'

type DocumentsSectionProps = {
  documents: string[]
  documentImage: string
}

export function DocumentsSection({ documents, documentImage }: DocumentsSectionProps) {
  return (
    <section
      id="hujjatlar"
      className="space-y-8 rounded-[36px] border border-white/60 bg-gradient-to-b from-white to-[#f2fff2] p-6 shadow-card sm:space-y-10 sm:p-10"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-display text-4xl tracking-wide text-slate-900 sm:text-5xl">Hujjatlar</p>
          <p className="text-sm text-slate-500">Buyruqlar, nizomlar va ko‘rsatmalar to‘plami</p>
        </div>
        <button className="rounded-full border border-[#4ce54a] px-5 py-2 text-xs font-medium text-[#4ce54a] transition hover:bg-[#4ce54a] hover:text-white sm:px-6 sm:py-3 sm:text-sm">
          Barchasi
        </button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {documents.map((title, index) => (
          <article
            key={title}
            className="group relative flex flex-col rounded-[28px] border border-[#d6f4ff] bg-white/90 p-5 shadow-[0_15px_40px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 sm:p-6"
          >
            <div className="relative overflow-hidden rounded-[22px] border border-[#ecf6ff] bg-slate-50">
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/60 opacity-0 transition group-hover:opacity-100" />
              <img alt={title} className="h-44 w-full object-cover" src={documentImage} />
              <div className="absolute inset-2 rounded-[18px] border border-white/50" />
            </div>
            <p className="mt-4 text-lg font-semibold text-slate-900">{title}</p>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{index === 0 ? 'lex.uz' : 'nizom'}</p>
            <div className="mt-5 flex flex-col gap-3">
              <button className="rounded-full border border-[#4ce54a] px-4 py-2 text-xs font-medium text-[#4ce54a] transition hover:bg-[#4ce54a] hover:text-white sm:text-sm">
                Ko‘rish
              </button>
              <button className="rounded-full border border-[#4ce54a] bg-white px-4 py-2 text-xs font-medium text-[#4ce54a] transition hover:bg-[#4ce54a] hover:text-white sm:text-sm">
                Yuklash
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4 rounded-[28px] border border-[#d6f4ff] bg-white p-5 shadow-lg sm:p-6">
        <div className="flex flex-1 flex-wrap items-center gap-4">
          <LexLogo className="h-8 w-28" />
          <div>
            <p className="text-lg font-semibold text-slate-900">Tyutorlik faoliyatini tashkil etish tartibi</p>
            <p className="text-sm text-slate-500">O‘zbekiston Respublikasi VM qarori, 17.10.2025, 656-son</p>
          </div>
        </div>
        <a className="rounded-full border border-[#4ce54a] px-5 py-2 text-xs font-semibold text-[#4ce54a] transition hover:bg-[#4ce54a] hover:text-white sm:px-6 sm:py-3 sm:text-sm" href="#">
          Ko‘rish
        </a>
      </div>
    </section>
  )
}

