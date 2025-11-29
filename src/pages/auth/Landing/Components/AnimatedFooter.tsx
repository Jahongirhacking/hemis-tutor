import { Facebook, GraduationCap, Instagram, Send } from 'lucide-react';

type AnimatedFooterProps = {
  navItems: string[];
};

const getSectionId = (navItem: string): string => {
  const mapping: Record<string, string> = {
    'Bosh sahifa': 'hero',
    Tanlovlar: 'about',
    'Tyutor minbari': 'testimonials',
    Yangiliklar: 'news',
    Maqolalar: 'cta',
    Hujjatlar: 'documents',
  };
  return mapping[navItem] || '';
};

const handleNavClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  navItem: string
) => {
  e.preventDefault();
  const sectionId = getSectionId(navItem);
  if (sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Header balandligi uchun
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }
};

export function AnimatedFooter({ navItems }: AnimatedFooterProps) {
  return (
    <footer className="bg-slate-900 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob w-96 h-96 bg-teal-500 -top-48 -right-48 opacity-5"></div>
        <div className="blob w-64 h-64 bg-cyan-500 -bottom-32 -left-32 opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                tyutor<span className="text-teal-400">.hemis.uz</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-md mb-6">
              Oliy ta'lim muassasalarida tyutorlik faoliyatini tashkil etish va
              boshqarish uchun yagona platforma
            </p>
            <div className="flex gap-4">
              {[
                {
                  icon: Facebook,
                  label: 'Facebook',
                  href: 'https://www.facebook.com/eduuzofficial',
                },
                {
                  icon: Instagram,
                  label: 'Instagram',
                  href: 'https://www.instagram.com/eduuzofficial',
                },
                { icon: Send, label: 'Telegram', href: 'https://t.me/eduuz' },
              ].map((social, i) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white hover:scale-110 hover:-translate-y-1 transition-all"
                    title={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Havolalar</h4>
            <ul className="space-y-3">
              {navItems.map((item, i) => (
                <li key={i}>
                  <a
                    href={`#${getSectionId(item)}`}
                    onClick={e => handleNavClick(e, item)}
                    className="text-slate-400 hover:text-teal-400 hover:translate-x-2 transition-all inline-block text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Aloqa</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-center gap-2 hover:text-teal-400 transition-colors cursor-pointer">
                <span>📍</span> 100174, Toshkent sh., Olmazor tumani,
                Universitet ko'chasi, 7-uy
              </li>
              <li className="flex items-center gap-2 hover:text-teal-400 transition-colors cursor-pointer">
                <span>📞</span>Ishonch telefoni: 1006
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            2025 © Raqamli ta'lim texnologiyalarini rivojlantirish markazi
          </p>
        </div>
      </div>
    </footer>
  );
}
