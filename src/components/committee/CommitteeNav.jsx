import { ArrowUpRight } from 'lucide-react';

export default function CommitteeNav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-brand">Holgate P&C</div>
        <a href="#/" className="nav-link">
          Parents Portal
          <ArrowUpRight size={13} strokeWidth={2.5} />
        </a>
      </div>
    </nav>
  );
}
