import { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { meta } from '../utils/data'
import { formatDate } from '../utils/dates'

const topNav = [
  { to: '/', label: 'Parents', end: true },
  { to: '/committee', label: 'Committee' },
]

const committeeSubNav = [
  { to: '/committee', label: 'Now', end: true },
  { to: '/committee/archive', label: 'Archive' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isCommittee = location.pathname.startsWith('/committee')

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-white border-b border-header-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <NavLink to="/" className="no-underline">
            <span className="text-[20px] font-bold text-text-primary tracking-[-0.3px]">
              Holgate P&amp;C
            </span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6">
            {topNav.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => {
                  const active = link.to === '/committee' ? isCommittee : isActive
                  return `text-[15px] font-medium pb-1 transition-colors ${
                    active
                      ? 'text-text-primary border-b-2 border-accent'
                      : 'text-text-secondary hover:text-text-primary'
                  }`
                }}
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

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="sm:hidden border-t border-header-border px-4 py-2 flex flex-col gap-1">
            <NavLink
              to="/"
              end
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 text-[15px] font-medium rounded transition-colors ${
                  isActive ? 'text-text-primary bg-cream' : 'text-text-secondary hover:text-text-primary'
                }`
              }
            >
              Parents
            </NavLink>
            <div className="px-3 py-1.5 text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              Committee
            </div>
            {committeeSubNav.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-6 py-2.5 text-[15px] font-medium rounded transition-colors ${
                    isActive ? 'text-text-primary bg-cream' : 'text-text-secondary hover:text-text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}

        {/* Committee sub-nav */}
        {isCommittee && (
          <div className="border-t border-header-border hidden sm:block">
            <div className="max-w-5xl mx-auto px-6">
              <nav className="flex items-center gap-6">
                {committeeSubNav.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `text-[14px] font-medium py-2.5 transition-colors ${
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
            </div>
          </div>
        )}
      </header>

      <main className="max-w-5xl mx-auto w-full flex-1">
        <Outlet />
      </main>

      <footer className="text-center py-6 text-[13px] text-text-secondary">
        Last updated: {formatDate(meta.lastUpdated)}
      </footer>
    </div>
  )
}
