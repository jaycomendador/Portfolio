import { useState } from 'react'

const links = [['Home', '/'], ['About', '/#about'], ['Projects', '/#projects'], ['Services', '/#services'], ['Contact', '/contact']]
const Sun = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
const Moon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" /></svg>

export default function Navbar({ darkMode, onToggleTheme, active = 'Home' }) {
  const [open, setOpen] = useState(false)
  const theme = darkMode ? 'border-zinc-700 bg-zinc-900 text-zinc-100' : 'border-zinc-200 bg-white text-zinc-900'
  return <nav className="relative flex h-16 shrink-0 items-center justify-center px-5"><div className={`${theme} ${open ? 'flex' : 'hidden'} absolute right-5 top-14 z-20 flex-col gap-1 rounded-xl border p-1 shadow-lg md:static md:flex md:flex-row md:rounded-2xl md:shadow-sm`}>{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)} className={`rounded-xl px-3 py-2 text-xs font-medium ${label === active ? 'bg-black text-white' : 'hover:bg-zinc-100 hover:text-black'}`}>{label}</a>)}</div><button onClick={() => setOpen(!open)} className={`absolute right-16 rounded-lg border px-3 py-2 text-xs md:hidden ${theme}`}>{open ? 'Close' : 'Menu'}</button><button onClick={onToggleTheme} className={`absolute right-5 grid h-9 w-9 place-items-center rounded-full border ${theme}`} aria-label="Toggle dark mode">{darkMode ? <Sun /> : <Moon />}</button></nav>
}
