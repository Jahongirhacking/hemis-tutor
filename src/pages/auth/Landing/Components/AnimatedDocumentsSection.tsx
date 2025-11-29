import { useGetFilesQuery } from '@/services/api/public';
import { ExternalLink, FileText } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

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

const ensureHttps = (url: string) => {
  if (url.startsWith('http://tyutor-api.hemis.uz')) {
    return url.replace('http://', 'https://');
  }
  return url;
};

const getFileName = (url: string, title: string) => {
  const sanitizedTitle = title.replace(/[\\/:*?"<>|]/g, '').trim() || 'file';
  const cleanUrl = ensureHttps(url).split('?')[0] ?? '';
  const lastSegment = cleanUrl.split('/').filter(Boolean).pop() ?? '';
  const extension = lastSegment.includes('.')
    ? lastSegment
        .split('.')
        .pop()
        ?.replace(/[^a-zA-Z0-9]/g, '')
    : null;
  return extension ? `${sanitizedTitle}.${extension}` : `${sanitizedTitle}.pdf`;
};

export function AnimatedDocumentsSection() {
  const [docsRef, docsInView] = useInView();
  const { data, isFetching, isError } = useGetFilesQuery();

  const documents = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data
      .filter(item => Boolean(item.file))
      .sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
      .map(item => ({
        title: item.title ?? item.order_name ?? 'Hujjat',
        number: item.order_name ?? item.title ?? '',
        pdfUrl: item.file as string,
      }));
  }, [data]);

  const handleDownload = (pdfUrl: string, title: string) => {
    const safeUrl = ensureHttps(pdfUrl);
    const anchor = document.createElement('a');
    anchor.href = safeUrl;
    anchor.download = getFileName(safeUrl, title);
    anchor.rel = 'noopener noreferrer';
    anchor.target = '_blank';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleView = (pdfUrl: string) => {
    window.open(ensureHttps(pdfUrl), '_blank');
  };

  return (
    <section id="documents" ref={docsRef} className="py-12 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center max-w-3xl mx-auto mb-12 ${docsInView ? 'slide-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 text-sm font-semibold rounded-full mb-4">
            Hujjatlar
          </span>
          <h2 className="font-display text-3xl sm:text-4xl tracking-wide text-slate-800 mb-4">
            Buyruqlar, nizomlar va ko'rsatmalar
          </h2>
        </div>

        {!isFetching && (isError || documents.length === 0) && (
          <div className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm border border-slate-100">
            Hujjat mavjud emas
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {documents.map((doc, i) => (
            <div
              key={i}
              className={`card-hover bg-white rounded-2xl p-6 shadow-sm border border-slate-100 group flex flex-col ${
                docsInView ? 'slide-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 shadow-lg shadow-red-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 text-sm leading-snug mb-2 line-clamp-3 group-hover:text-slate-900 transition-colors">
                {doc.title}
              </h3>
              <p className="text-slate-500 text-xs mb-4">{doc.number}</p>
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => handleView(doc.pdfUrl)}
                  className="flex-1 py-2.5 px-3 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-200 hover:scale-105 transition-all"
                >
                  Ko'rish
                </button>
                <button
                  onClick={() => handleDownload(doc.pdfUrl, doc.title)}
                  className="flex-1 py-2.5 px-3 bg-teal-50 text-teal-600 text-xs font-medium rounded-lg hover:bg-teal-100 hover:scale-105 transition-all"
                >
                  Yuklash
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-12 p-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 group hover:shadow-2xl hover:shadow-slate-900/30 transition-all ${
            docsInView ? 'slide-in-up stagger-5' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center group-hover:bg-teal-500/30 group-hover:scale-110 transition-all">
              <FileText className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold group-hover:text-teal-300 transition-colors">
                Oliy ta'lim tashkilotlarida tyutorlik faoliyatini tashkil etish tartibi
              </h4>
              <p className="text-slate-400 text-sm">To'g'risidagi nizomni tasdiqlash haqida</p>
            </div>
          </div>
          <a
            href="https://www.lex.uz/docs/-7774756"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine flex items-center gap-2 px-6 py-3 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 hover:scale-105 transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            Lexuz
          </a>
        </div>
      </div>
    </section>
  );
}

