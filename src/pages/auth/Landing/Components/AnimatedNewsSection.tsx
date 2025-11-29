import { useGetNewsQuery } from '@/services/api/public';
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

export function AnimatedNewsSection() {
  const [newsRef, newsInView] = useInView();
  const { data, isFetching, isError } = useGetNewsQuery();

  const news = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data.map(item => ({
      date: item.created_at ?? '',
      title: item.title ?? 'Yangilik',
      category: item.hashtag ? item.hashtag : 'Xabar',
      image: item.image ?? '',
    }));
  }, [data]);

  return (
    <section id="news" ref={newsRef} className="py-12 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`rounded-[32px] bg-gradient-to-r from-cyan-50 via-teal-50 to-cyan-50 p-6 shadow-lg sm:p-8 ${newsInView ? 'slide-in-up' : 'opacity-0'}`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-display text-3xl tracking-wide text-slate-900 sm:text-4xl">
                Yangiliklar
              </p>
              <p className="text-sm text-slate-700 sm:text-base">
                So'nggi e'lonlar, qarorlar va tajribalar
              </p>
            </div>
            <button className="rounded-full border border-teal-500 px-5 py-2 text-xs font-medium text-teal-500 sm:px-6 sm:py-3 sm:text-sm hover:bg-teal-500 hover:text-white transition-colors">
              Barchasi
            </button>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {!isFetching && (isError || news.length === 0) && (
              <div className="col-span-full rounded-[24px] bg-white p-6 text-center text-slate-500">
                Yangiliklar mavjud emas
              </div>
            )}
            {news.map((item, i) => (
              <article
                key={i}
                className={`group flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  newsInView ? 'slide-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="p-2">
                  <div className="relative h-56 overflow-hidden rounded-[20px] sm:h-60">
                    {item.image ? (
                      <img
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={item.image}
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-6xl transition-transform duration-500 group-hover:scale-110">
                        📰
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/20 group-hover:to-cyan-500/20 transition-all duration-500"></div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4">
                  <p className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-teal-600">
                    {item.title}
                  </p>
                </div>
                <div className="flex items-center justify-between px-5 py-3 text-sm font-medium text-slate-500 sm:px-6">
                  <span className="transition-colors duration-300 group-hover:text-slate-700">{item.date}</span>
                  <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700 sm:text-sm transition-all duration-300 group-hover:bg-teal-500 group-hover:text-white group-hover:scale-105">
                    {item.category}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
