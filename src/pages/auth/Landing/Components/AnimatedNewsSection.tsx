import { useGetNewsQuery } from '@/services/api/public';
import { ArrowRight, Calendar, ChevronRight } from 'lucide-react';
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
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 ${newsInView ? 'slide-in-up' : 'opacity-0'}`}
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 text-sm font-semibold rounded-full mb-4">
              Yangiliklar
            </span>
            <h2 className="font-display text-3xl sm:text-4xl tracking-wide text-slate-800">
              So'nggi e'lonlar va yangiliklar
            </h2>
          </div>
          <a
            href="#"
            className="group text-teal-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
          >
            Barchasini ko'rish
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {!isFetching && (isError || news.length === 0) && (
          <div className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm border border-slate-100">
            Yangiliklar mavjud emas
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item, i) => (
            <div
              key={i}
              className={`card-hover group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 ${
                newsInView ? 'slide-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden flex items-center justify-center">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                  />
                ) : (
                  <div className="text-6xl group-hover:scale-125 transition-transform duration-500">
                    📰
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/20 group-hover:to-cyan-500/20 transition-all duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-transform group-hover:scale-105 ${
                      item.category === "E'lon"
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-teal-100 text-teal-700'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  {item.date}
                </div>
                <h3 className="font-semibold text-slate-800 leading-snug group-hover:text-teal-600 transition-colors">
                  {item.title}
                </h3>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 mt-4 text-teal-600 text-sm font-medium group-hover:gap-2 transition-all"
                >
                  Batafsil{' '}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
