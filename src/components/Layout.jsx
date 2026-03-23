import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-maroon-900 text-white border-b-3 border-gold-500">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border-2 border-gold-500 rounded-full flex items-center justify-center text-lg">🏫</div>
            <div>
              <div className="font-extrabold text-base tracking-tight">HOLGATE P&C</div>
              <div className="text-[9px] uppercase tracking-[1.5px] text-gold-500">Operations Portal</div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  )
}
