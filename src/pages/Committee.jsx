import { useEffect } from 'react';
import CommitteeNav from '../components/committee/CommitteeNav';
import CommitteeIntro from '../components/committee/CommitteeIntro';
import LastMeeting from '../components/committee/LastMeeting';
import OpenTasks from '../components/committee/OpenTasks';
import NextMeeting from '../components/committee/NextMeeting';
import AreasSection from '../components/committee/AreasSection';
import PrincipalReport from '../components/committee/PrincipalReport';
import CommitteeFooter from '../components/committee/CommitteeFooter';

export default function Committee() {
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
      <CommitteeNav />
      <CommitteeIntro />
      <LastMeeting />
      <OpenTasks />
      <NextMeeting />
      <AreasSection />
      <PrincipalReport />
      <CommitteeFooter />
    </>
  );
}
