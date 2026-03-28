import { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { meta } from '../utils/data'
import { formatDate } from '../utils/dates'

const navLinks = [
  { to: '/', label: 'Now', end: true },
  { to: '/archive', label: 'Archive' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-white border-b border-header-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <NavLink to="/" className="no-underline">
            <span className="text-[15px] font-bold text-text-primary tracking-[-0.3px]">
              Holgate P&amp;C
            </span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `text-xs font-semibold pb-1 transition-colors ${
                    isActive
                      ? 'text-text-primary border-b-2 border-accent'
                      : 'text-text-secondary hover:text-text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-2 text-text-secondary hover:text-text-primary"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <nav className="sm:hidden border-t border-header-border px-4 py-2 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 text-xs font-semibold rounded transition-colors ${
                    isActive
                      ? 'text-text-primary bg-cream'
                      : 'text-text-secondary hover:text-text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main className="max-w-4xl mx-auto w-full flex-1">
        <Outlet />
      </main>

      <footer className="text-center py-4 text-[10px] text-text-secondary">
        Last updated: {formatDate(meta.lastUpdated)}
      </footer>
    </div>
  )
}
