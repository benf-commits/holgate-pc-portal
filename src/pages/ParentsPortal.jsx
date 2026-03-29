import { useEffect } from 'react';
import ParentsHeader from '../components/parents/ParentsHeader';
import ParentsWelcome from '../components/parents/ParentsWelcome';
import WhatsComingUp from '../components/parents/WhatsComingUp';
import WhatToKnow from '../components/parents/WhatToKnow';
import HowToHelp from '../components/parents/HowToHelp';
import QuickReference from '../components/parents/QuickReference';
import ParentsFooter from '../components/parents/ParentsFooter';

export default function ParentsPortal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ParentsHeader />
      <ParentsWelcome />
      <WhatsComingUp />
      <WhatToKnow />
      <HowToHelp />
      <QuickReference />
      <ParentsFooter />
    </>
  );
}
