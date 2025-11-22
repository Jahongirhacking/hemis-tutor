import { FilePdfIcon } from '@/assets/icon';
import { saveAs } from 'file-saver';
import { LexLogo } from '../../../../../public/icons/LexLogo';

type DocumentCard = {
  title: string;
  number: string;
  pdfUrl: string;
};

type DocumentsSectionProps = {
  documents: DocumentCard[];
};

const gradientColors = [
  'from-[#c6ff7c] to-[#e3ffc4]',
  'from-[#fdf170] to-[#ffeeb0]',
  'from-[#c8caff] to-[#f0ebff]',
  'from-[#f6c2f4] to-[#ffe5fb]',
];

export function DocumentsSection({ documents }: DocumentsSectionProps) {
  const handleDownload = async (pdfUrl: string, title: string) => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      saveAs(blob, `${title}.pdf`);
    } catch (error) {
      console.error('PDF yuklab olishda xatolik:', error);
    }
  };

  const handleView = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank');
  };
  return (
    <section
      id="hujjatlar"
      className="space-y-8 rounded-[36px] border border-white/60 bg-gradient-to-b from-white to-[#f2fff2] p-6 shadow-card sm:space-y-10 sm:p-10"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-display text-4xl tracking-wide text-slate-900 sm:text-5xl">
            Hujjatlar
          </p>
          <p className="text-sm text-slate-500">
            Buyruqlar, nizomlar va ko‘rsatmalar to‘plami
          </p>
        </div>
        {/* <button className="rounded-full border border-[#4ce54a] px-5 py-2 text-xs font-medium text-[#4ce54a] transition hover:bg-[#4ce54a] hover:text-white sm:px-6 sm:py-3 sm:text-sm">
          Barchasi
        </button> */}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {documents.map((doc, index) => (
          <article
            key={doc.title}
            className="group relative flex flex-col rounded-[28px] border border-[#d6f4ff] bg-white/90 p-5 shadow-[0_15px_40px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 sm:p-6"
          >
            <div
              className={`relative flex h-44 items-center justify-center overflow-hidden rounded-[22px] bg-gradient-to-br p-4 ${gradientColors[index % gradientColors.length]}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/60 opacity-0 transition group-hover:opacity-100" />
              <div className="relative z-10 flex flex-col items-center justify-center gap-2 text-center">
                <img
                  src={FilePdfIcon}
                  alt="PDF"
                  className="h-10 w-10 object-contain mb-1"
                />
                <p className="text-xs font-semibold text-slate-800 leading-tight line-clamp-4 px-2">
                  {doc.title}
                </p>
              </div>
              <div className="absolute inset-2 rounded-[18px] border border-white/50" />
            </div>
            <p className="text-[16px] font-[500] leading-[24px] text-black mt-1">
              {doc.number}
            </p>
            <div className="mt-5 flex flex-row justify-between gap-3">
              <button
                onClick={() => handleView(doc.pdfUrl)}
                className="rounded-full border border-[#4ce54a] px-4 py-2 text-xs font-medium text-[#4ce54a] transition hover:bg-[#4ce54a] hover:text-white sm:text-sm"
              >
                Ko‘rish
              </button>
              <button
                onClick={() => handleDownload(doc.pdfUrl, doc.title)}
                className="rounded-full border border-[#4ce54a] bg-white px-4 py-2 text-xs font-medium text-[#4ce54a] transition hover:bg-[#4ce54a] hover:text-white sm:text-sm"
              >
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
            <p className="text-lg font-semibold text-slate-900">
              Oliy taʼlim tashkilotlarida tyutorlik faoliyatini tashkil etish
              tartibi toʻgʻrisidagi nizomni tasdiqlash haqida
            </p>
            <a
              target="_blank"
              href="https://www.lex.uz/docs/-7774756"
              className="text-sm text-[#4ce54a] cursor-pointer hover:underline"
            >
              Oʻzbekiston Respublikasi Vazirlar Mahkamasining qarori, 17.10.2025
              yildagi 656-son
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
