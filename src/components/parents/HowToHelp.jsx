import { CookingPot, Users, PartyPopper, Heart } from 'lucide-react';
import helpItems from '../../data/parents-help.json';

const ICONS = {
  'cooking-pot': CookingPot,
  'users': Users,
  'party-popper': PartyPopper,
  'heart': Heart,
};

export default function HowToHelp() {
  return (
    <section className="section section--white">
      <div className="section-inner">
        <h2 className="section-heading">How can I help</h2>
        <p className="section-subheading">Our school runs on parent involvement — every bit counts</p>
        <div className="help-cards">
          {helpItems.map(item => {
            const Icon = ICONS[item.icon];
            return (
              <div key={item.id} className="help-card">
                {Icon && <Icon size={24} style={{ color: 'var(--accent)', marginBottom: 8 }} />}
                <div className="help-card-title">{item.title}</div>
                <div className="help-card-body">{item.body}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
