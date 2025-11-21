type SpeakerCard = {
  title: string;
  author: string;
  org: string;
  color: string;
  image: string;
};

type SpeakersSectionProps = {
  cards: SpeakerCard[];
};

export function SpeakersSection({ cards }: SpeakersSectionProps) {
  return (
    <section id="tyutorlar-minbari" className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-4xl tracking-wide text-slate-900 sm:text-5xl">
          Tyutorlar minbari
        </h2>
        <button className="rounded-full border border-[#4ce54a] px-5 py-2 text-xs font-medium text-[#4ce54a] sm:px-6 sm:py-3 sm:text-sm">
          Barchasi
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card, index) => (
          <article
            key={`${card.title}-${card.author}-${index}`}
            className={`flex flex-col justify-between rounded-[28px] bg-gradient-to-r ${card.color} p-5 shadow-card sm:p-6`}
          >
            <div className="space-y-3">
              <p className="text-lg font-semibold text-slate-900 sm:text-xl">
                {card.title}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <div className="text-left text-sm text-slate-700">
                <p className="font-semibold text-slate-900">{card.author}</p>
                <p>{card.org}</p>
              </div>
              <img
                alt={card.author}
                className="size-16 rounded-full border-4 border-white shadow-lg"
                src={card.image}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
