import type { ReactNode } from 'react'

type PillProps = {
  children: ReactNode
  className?: string
}

export function Pill({ children, className = '' }: PillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/40 bg-white/70 px-4 py-2 text-sm font-medium text-slate-900 shadow-sm backdrop-blur ${className}`}
    >
      {children}
    </span>
  )
}

