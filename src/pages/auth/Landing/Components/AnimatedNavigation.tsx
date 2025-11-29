import TutorLogo from '@/components/TutorLogo';
import { paths } from '@/router/paths';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type AnimatedNavigationProps = {
  navItems: string[];
  scrollY: number;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeSection: string;
  onNavigate: (navItem: string) => void;
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
  navItem: string,
  onNavigate: (navItem: string) => void
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
      onNavigate(navItem);
    }
  }
};

export function AnimatedNavigation({
  navItems,
  scrollY,
  mobileMenuOpen,
  setMobileMenuOpen,
  activeSection,
  onNavigate,
}: AnimatedNavigationProps) {
  const navigate = useNavigate();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 !border-0 ${scrollY > 50 ? 'glass shadow-lg' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <TutorLogo color={scrollY > 50 ? 'text-slate-800' : 'text-white'} />

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, i) => {
              const isActive = item === activeSection;
              return (
                <a
                  key={i}
                  href={`#${getSectionId(item)}`}
                  onClick={e => handleNavClick(e, item, onNavigate)}
                  className={`nav-link text-sm font-medium transition-all hover:scale-105 ${
                    scrollY > 50
                      ? isActive
                        ? 'text-teal-600'
                        : 'text-slate-600 hover:text-slate-900'
                      : isActive
                        ? 'text-teal-300'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(paths.login)}
              className="btn-shine hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all hover:-translate-y-0.5 hover:scale-105"
            >
              Tizimga kirish
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              className={`lg:hidden p-2 transition-colors ${scrollY > 50 ? 'text-slate-600' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden glass border-t border-slate-100 py-4 slide-in-up">
          <div className="max-w-7xl mx-auto px-6 space-y-3">
            {navItems.map((item, i) => {
              const isActive = item === activeSection;
              return (
                <a
                  key={i}
                  href={`#${getSectionId(item)}`}
                  onClick={e => {
                    handleNavClick(e, item, onNavigate);
                    setMobileMenuOpen(false);
                  }}
                  className={`block py-2 font-medium transition-all hover:translate-x-2 ${
                    isActive
                      ? 'text-teal-600'
                      : 'text-slate-600 hover:text-teal-600'
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {item}
                </a>
              );
            })}
            <button
              onClick={() => navigate(paths.login)}
              className="w-full mt-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl"
            >
              Tizimga kirish
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
