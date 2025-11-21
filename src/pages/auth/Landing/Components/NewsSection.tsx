type NewsCard = {
  title: string;
  tag: string;
  date: string;
  image: string;
};

type NewsSectionProps = {
  cards: NewsCard[];
};

export function NewsSection({ cards }: NewsSectionProps) {
  return (
    <section
      id="yangiliklar"
      className="rounded-[32px] bg-gradient-to-r from-[#c4fffe] via-[#e4fedd] to-[#eef7fb] p-6 shadow-card sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-display text-3xl tracking-wide text-slate-900 sm:text-4xl">
            Yangiliklar
          </p>
          <p className="text-sm text-slate-700 sm:text-base">
            So‘nggi e’lonlar, qarorlar va tajribalar
          </p>
        </div>
        <button className="rounded-full border border-[#4ce54a] px-5 py-2 text-xs font-medium text-[#4ce54a] sm:px-6 sm:py-3 sm:text-sm">
          Barchasi
        </button>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-card"
          >
            <div className="p-2">
              <div className="relative h-56 overflow-hidden rounded-[20px] sm:h-60">
                <img
                  alt={card.title}
                  className="h-full w-full object-cover"
                  src={card.image}
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4">
              <p className="text-lg font-semibold text-slate-900">
                {card.title}
              </p>
            </div>
            <div className="flex items-center justify-between  px-5 py-3 text-sm font-medium text-slate-500 sm:px-6">
              <span>{card.date}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 sm:text-sm">
                {card.tag}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
