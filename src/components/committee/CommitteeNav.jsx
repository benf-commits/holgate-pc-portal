export default function CommitteeNav() {
  return (
    <header className="committee-header">
      <a href="#/" className="committee-header-portal-link" aria-label="Parents Portal">
        Parents Portal
      </a>
      <img
        src={`${import.meta.env.BASE_URL}images/pc-header.png`}
        alt="Holgate P&C — Parents & Citizens Association"
        className="committee-header-img"
      />
    </header>
  );
}
