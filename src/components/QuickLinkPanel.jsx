import { useState } from 'react'

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-4 h-4 text-text-secondary transition-transform ${open ? 'rotate-90' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

function PanelContent({ section }) {
  return (
    <div className="pt-2 pb-1 space-y-2">
      {section.items?.length > 0 && (
        <div className="space-y-1">
          {section.items.map((item, i) => (
            <div key={i} className="flex gap-2 text-[11px]">
              <span className="text-text-secondary min-w-[70px] shrink-0">{item.label}</span>
              <span className="text-text-primary">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {section.pricing?.length > 0 && (
        <div className="mt-2">
          <div className="text-[9px] font-bold text-text-secondary uppercase tracking-[0.8px] mb-1">
            Pricing
          </div>
          <div className="space-y-0.5">
            {section.pricing.map((row, i) => (
              <div key={i} className="flex justify-between text-[10px]">
                <span className="text-text-primary">{row.item}</span>
                <span className="text-text-secondary font-medium">{row.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {section.links?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {section.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-accent hover:underline"
            >
              {link.label} →
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default function QuickLinkPanel({ sections }) {
  const [openKey, setOpenKey] = useState(null)

  const sectionKeys = Object.keys(sections)

  return (
    <div className="space-y-1">
      {sectionKeys.map((key) => {
        const section = sections[key]
        const isOpen = openKey === key

        return (
          <div key={key} className="border border-header-border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenKey(isOpen ? null : key)}
              className="w-full flex items-center justify-between px-3 py-2 bg-white hover:bg-cream transition-colors text-left"
            >
              <span className="text-[11px] font-semibold text-text-primary">{section.title}</span>
              <ChevronIcon open={isOpen} />
            </button>
            {isOpen && (
              <div className="px-3 bg-white border-t border-header-border">
                <PanelContent section={section} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
