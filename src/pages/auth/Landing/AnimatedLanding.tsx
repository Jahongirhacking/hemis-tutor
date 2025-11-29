import { useEffect, useMemo, useState } from 'react';
import './AnimatedLanding.scss';
import { AnimatedAboutSection } from './Components/AnimatedAboutSection';
import { AnimatedCTASection } from './Components/AnimatedCTASection';
import { AnimatedDocumentsSection } from './Components/AnimatedDocumentsSection';
import { AnimatedFooter } from './Components/AnimatedFooter';
import { AnimatedHeroSection } from './Components/AnimatedHeroSection';
import { AnimatedNavigation } from './Components/AnimatedNavigation';
import { AnimatedNewsSection } from './Components/AnimatedNewsSection';
import { AnimatedTestimonialsSection } from './Components/AnimatedTestimonialsSection';

const getSectionId = (navItem: string): string => {
  const mapping: Record<string, string> = {
    'Bosh sahifa': 'hero',
    'Tanlovlar': 'about',
    'Tyutor minbari': 'testimonials',
    'Yangiliklar': 'news',
    'Maqolalar': 'cta',
    'Hujjatlar': 'documents',
  };
  return mapping[navItem] || '';
};

const getNavItemFromSectionId = (sectionId: string): string => {
  const mapping: Record<string, string> = {
    'hero': 'Bosh sahifa',
    'about': 'Tanlovlar',
    'testimonials': 'Tyutor minbari',
    'news': 'Yangiliklar',
    'cta': 'Maqolalar',
    'documents': 'Hujjatlar',
  };
  return mapping[sectionId] || '';
};

export default function AnimatedLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('Bosh sahifa');

  const navItems = ['Bosh sahifa', 'Tanlovlar', 'Tyutor minbari', 'Yangiliklar', 'Maqolalar', 'Hujjatlar'];
  
  const sectionIds = useMemo(
    () => navItems.map(item => getSectionId(item)),
    [navItems]
  );

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const navItem = getNavItemFromSectionId(visible[0].target.id);
          if (navItem) {
            setActiveSection(navItem);
            return;
          }
        }

        const scrollY = window.scrollY + window.innerHeight * 0.25;
        let fallback = navItems[0];
        sectionIds.forEach(id => {
          const section = document.getElementById(id);
          if (section && section.offsetTop <= scrollY) {
            const navItem = getNavItemFromSectionId(id);
            if (navItem) {
              fallback = navItem;
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
  }, [sectionIds, navItems]);

  const handleNavigate = (navItem: string) => {
    setActiveSection(navItem);
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden animated-landing-page" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <AnimatedNavigation 
        navItems={navItems}
        scrollY={scrollY}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
      
      <AnimatedHeroSection 
        mousePosition={mousePosition}
      />
      
      <AnimatedAboutSection />
      
      <AnimatedTestimonialsSection />
      
      <AnimatedNewsSection />
      
      <AnimatedCTASection />
      
      <AnimatedDocumentsSection />
      
      <AnimatedFooter navItems={navItems} />
    </div>
  );
}

