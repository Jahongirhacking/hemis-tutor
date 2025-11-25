import { paths } from '@/router/paths';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GradientButton } from './ui/GradientButton';

type HeaderProps = {
  navLinks: string[];
  activeLink: string;
  onNavigate: (link: string) => void;
};

export function Header({ navLinks, activeLink, onNavigate }: HeaderProps) {
  const [current, setCurrent] = useState(activeLink);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    event.preventDefault();
    setCurrent(link);
    onNavigate(link);
    setIsMenuOpen(false);
  };
  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          backgroundImage:
            'linear-gradient(82.079deg, rgba(196,255,254,1) 0%, rgba(228,254,221,1) 50%, rgba(238,247,251,1) 100%)',
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-6 pt-4 sm:px-6 lg:gap-8 lg:pt-6">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <p className="font-accent text-xl tracking-wide text-slate-900 sm:text-2xl">
            <span className="text-[#4ce54a]">tyutor</span>.hemis
          </p>
          <nav className="hidden flex-1 items-center justify-center gap-6 font-brand text-[14px] font-semibold leading-[18px] tracking-[-0.2px] text-[#172419] text-center md:flex">
            {navLinks.map(link => (
              <a
                key={link}
                className={`cursor-pointer transition hover:text-[#4ce54a] ${
                  link === current
                    ? 'text-[#4ce54a] underline underline-offset-4'
                    : ''
                }`}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={event => handleClick(event, link)}
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="ml-auto">
            <GradientButton
              onClick={() => {
                navigate(paths.login);
              }}
              className="px-5 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm"
              label="Tizimga kirish"
            />
          </div>
          <button
            aria-label="Toggle navigation"
            className="ml-2 inline-flex items-center rounded-full border border-[#4ce54a] p-2 text-[#4ce54a] md:hidden"
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col gap-2 rounded-[24px] border border-white/70 bg-white/90 px-4 py-4 font-brand text-[14px] font-semibold leading-[18px] tracking-[-0.2px] text-[#172419] shadow-lg backdrop-blur">
              {navLinks.map(link => (
                <a
                  key={link}
                  className={`rounded-full px-4 py-2 text-center transition ${
                    link === current ? 'bg-[#4ce54a]/15 text-[#4ce54a]' : ''
                  }`}
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={event => handleClick(event, link)}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}
        </div>
      </header>
      <div className="h-[120px] sm:h-[140px] lg:h-[156px]" />
    </>
  );
}
