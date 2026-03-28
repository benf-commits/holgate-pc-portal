import { useEffect } from 'react';
import CommitteeHero from '../components/committee/CommitteeHero';
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
      <CommitteeHero />
      <div id="last-meeting"><LastMeeting /></div>
      <div id="open-tasks"><OpenTasks /></div>
      <div id="next-meeting"><NextMeeting /></div>
      <div id="pc-areas"><AreasSection /></div>
      <div id="principal-report"><PrincipalReport /></div>
      <CommitteeFooter />
    </>
  );
}
