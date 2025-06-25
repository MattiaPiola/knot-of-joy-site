
import { useState, useEffect } from 'react';

export const useScrollAnimation = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    // Wait for DOM to be ready and observe sections
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        if (section.id && section.id !== 'hero') {
          observer.observe(section);
        }
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return visibleSections;
};
