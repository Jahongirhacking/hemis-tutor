import {
    documentCards,
    documentImage,
    handbookCover,
    handbookImage,
    handbookTexture,
    heroImage,
    navLinks,
    newsCards,
    responsibilities,
    speakerCards,
} from '@/utils/landingSiteContent';
import { useEffect, useMemo, useState } from 'react';
import { AboutSection } from './Components/AboutSection';
import { DocumentsSection } from './Components/DocumentsSection';
import { Footer } from './Components/Footer';
import { HandbookSection } from './Components/HandbookSection';
import { Header } from './Components/Header';
import { HeroSection } from './Components/HeroSection';
import { NewsSection } from './Components/NewsSection';
import { SpeakersSection } from './Components/SpeakersSection';
import './style.scss';

export default function App() {
  const [activeSection, setActiveSection] = useState(navLinks[0]);
  const sectionIds = useMemo(
    () => navLinks.map(link => link.toLowerCase().replace(/\s+/g, '-')),
    []
  );
  const idToLink = useMemo(
    () =>
      navLinks.reduce<Record<string, string>>((acc, link) => {
        acc[link.toLowerCase().replace(/\s+/g, '-')] = link;
        return acc;
      }, {}),
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const link = idToLink[visible[0].target.id];
          if (link) {
            setActiveSection(link);
            return;
          }
        }

        const scrollY = window.scrollY + window.innerHeight * 0.25;
        let fallback = navLinks[0];
        sectionIds.forEach(id => {
          const section = document.getElementById(id);
          if (section && section.offsetTop <= scrollY) {
            const link = idToLink[id];
            if (link) {
              fallback = link;
            }
          }
        });
        setActiveSection(fallback);
      },
      {
        root: null,
        threshold: [0.15, 0.4, 0.6],
        rootMargin: '-40% 0px -40% 0px',
      }
    );

    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [idToLink, sectionIds]);

  const handleNavigate = (link: string) => {
    const targetId = link.toLowerCase().replace(/\s+/g, '-');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(link);
  };

  return (
    <div className="landing-page-wrapper min-h-screen bg-white text-slate-900">
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(82.079deg, rgba(196,255,254,1) 0%, rgba(228,254,221,1) 50%, rgba(238,247,251,1) 100%)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/40" />
        <div className="relative">
          <Header
            activeLink={activeSection}
            navLinks={navLinks}
            onNavigate={handleNavigate}
          />
          <HeroSection heroImage={heroImage} />
        </div>
      </section>
      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12">
        <AboutSection responsibilities={responsibilities} />
        <SpeakersSection cards={speakerCards} />
        <NewsSection cards={newsCards} />
        <HandbookSection
          handbookCover={handbookCover}
          handbookImage={handbookImage}
          handbookTexture={handbookTexture}
        />
        <DocumentsSection
          documents={documentCards}
          documentImage={documentImage}
        />
      </main>
      <Footer />
    </div>
  );
}
