import { Menu, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar, ThemeToggle } from './ui'
export function Brand(){return <Link to="/" className="flex items-center gap-2 font-bold tracking-tight"><span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white"><Sparkles size={17}/></span>WriteWise <span className="text-indigo-600">AI</span></Link>}
export function Navbar({onMenu}:{onMenu?:()=>void}){return <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white/85 px-4 backdrop-blur dark:bg-slate-950/85 lg:px-7"><div className="flex items-center gap-3"><button onClick={onMenu} className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" aria-label="Open navigation"><Menu size={20}/></button><div className="lg:hidden"><Brand/></div></div><div className="flex items-center gap-2"><ThemeToggle/><Link to="/profile" aria-label="Profile"><Avatar/></Link></div></header>}
