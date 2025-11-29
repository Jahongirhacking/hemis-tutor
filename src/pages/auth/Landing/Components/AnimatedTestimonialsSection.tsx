import { useGetTutorDeskQuery } from '@/services/api/public';
import { speakerCards as speakerColorConfigs } from '@/utils/landingSiteContent';
import { ChevronRight, Star } from 'lucide-react';
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

const gradientPalette = speakerColorConfigs.map(card => card.color);

export function AnimatedTestimonialsSection() {
  const [testimonialRef, testimonialInView] = useInView();
  const { data, isFetching, isError } = useGetTutorDeskQuery();

  const testimonials = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data.map((item, index) => ({
      quote:
        item.title ??
        "Tyutorlik — bu nafaqat o'rgatish, balki yo'l ko'rsatish, ruhlantirish va rag'batlantirish san'atidir.",
      author: item.full_name ?? "Ma'lumot topilmadi",
      role: item.workplace ?? '',
      avatar: item.avatar ?? '',
      color:
        gradientPalette[index % gradientPalette.length] ??
        gradientPalette[0] ??
        'from-white',
    }));
  }, [data]);

  return (
    <section
      id="testimonials"
      ref={testimonialRef}
      className="py-12 bg-gradient-to-b from-slate-100 to-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 ${testimonialInView ? 'slide-in-up' : 'opacity-0'}`}
        >
          <div>
            <h2 className="font-display text-3xl sm:text-4xl tracking-wide text-slate-800">
              Tyutorlar minbari
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

        {!isFetching && (isError || testimonials.length === 0) && (
          <div className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm border border-slate-100">
            Tyutorlar minbari mavjud emas
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className={`card-hover bg-white rounded-2xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group flex flex-col ${
                testimonialInView ? 'slide-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-bl-full transition-all duration-500 group-hover:w-48 group-hover:h-48"></div>
              <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-gradient-to-tr from-amber-500/10 to-orange-500/10 rounded-tr-full transition-all duration-500 group-hover:w-32 group-hover:h-32"></div>

              <div className="relative flex-1 flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-amber-400 fill-amber-400 transition-transform hover:scale-125"
                      style={{ animationDelay: `${j * 0.1}s` }}
                    />
                  ))}
                </div>

                <svg
                  className="w-10 h-10 text-teal-200 mb-4 group-hover:text-teal-300 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                </svg>

                <p className="text-slate-700 text-lg leading-relaxed mb-6 italic group-hover:text-slate-900 transition-colors flex-1">
                  "{item.quote}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="w-12 h-12 rounded-full border-2 border-teal-500/30 object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
                      {item.author
                        .split(' ')
                        .map(n => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                      {item.author}
                    </div>
                    <div className="text-sm text-slate-500">{item.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
