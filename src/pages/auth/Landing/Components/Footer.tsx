const icons = [
  {
    name: 'facebook',
    path: (
      <path
        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
        fill="currentColor"
      />
    ),
  },
  {
    name: 'telegram',
    path: (
      <path
        d="M21.5 4.5 3.8 11.4c-.7.3-.7 1.3 0 1.6l4.2 1.7 1.6 4.5c.3.8 1.3.9 1.8.1l2.3-3.4 4.3 3.2c.8.6 1.9.2 2.1-.8l2.7-12c.3-1-.6-1.9-1.7-1.3z"
        fill="currentColor"
      />
    ),
  },
  {
    name: 'youtube',
    path: (
      <path
        d="M21.8 8s-.2-1.7-.9-2.5c-.9-.9-1.9-.9-2.4-.9-3.4-.2-8.5-.2-8.5-.2h-.1s-5.1 0-8.5.2c-.5 0-1.5 0-2.4.9C.2 6.3 0 8 0 8S0 9.8 0 11.7v1.7c0 1.8.2 3.7.2 3.7s.2 1.7.9 2.5c.9.9 2.1.8 2.7.9 2 .2 8.3.2 8.3.2s5.1 0 8.5-.2c.5 0 1.5 0 2.4-.9.7-.8.9-2.5.9-2.5s.2-1.8.2-3.7v-1.7c0-1.9-.2-3.7-.2-3.7zM9 14.6V7.8l6 3.4-6 3.4z"
        fill="currentColor"
      />
    ),
  },
]

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-xs text-slate-600 sm:px-6 sm:text-sm">
        <p className="font-accent text-lg tracking-wide text-slate-900 sm:text-xl">
          <span className="text-[#4ce54a]">tyutor</span>.hemis
        </p>
        <div className="flex items-center gap-4 text-slate-500">
          {icons.map(icon => (
            <a
              key={icon.name}
              className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-[#4ce54a] hover:text-[#4ce54a]"
              href="#"
              aria-label={icon.name}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                {icon.path}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

