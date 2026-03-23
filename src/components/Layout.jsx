import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { meta } from '../utils/data'
import { formatDate } from '../utils/dates'

const navLinks = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/meetings', label: 'Meetings' },
  { to: '/actions', label: 'Actions' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/decisions', label: 'Decisions' },
  { to: '/school', label: 'School' },
]

function NavItem({ to, label, end, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `px-3 py-2 text-sm font-medium rounded transition-colors ${
          isActive
            ? 'text-gold-500 border-b-2 border-gold-500'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-maroon-900 text-white border-b-[3px] border-gold-500">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Branding */}
          <NavLink to="/" className="flex items-center gap-3 no-underline text-white">
            <div className="w-9 h-9 border-2 border-gold-500 rounded-full flex items-center justify-center text-lg">
              🏫
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight">HOLGATE P&C</div>
              <div className="text-[9px] uppercase tracking-[1.5px] text-gold-500">
                Operations Portal
              </div>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavItem key={link.to} {...link} />
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white hover:text-gold-500 transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile nav drawer */}
        {menuOpen && (
          <nav className="md:hidden border-t border-white/20 px-4 py-2 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavItem key={link.to} {...link} onClick={() => setMenuOpen(false)} />
            ))}
          </nav>
        )}
      </header>

      <main className="max-w-6xl mx-auto w-full flex-1">
        <Outlet />
      </main>

      <footer className="text-center py-4 text-xs text-text-secondary">
        Last updated: {formatDate(meta.lastUpdated)}
      </footer>
    </div>
  )
}
