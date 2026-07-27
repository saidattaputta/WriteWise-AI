import { useState, type ReactNode } from 'react'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
export function AppLayout({children}:{children:ReactNode}){const [open,setOpen]=useState(false);return <div className="min-h-screen lg:flex"><Sidebar open={open} onClose={()=>setOpen(false)}/><div className="min-w-0 flex-1"><Navbar onMenu={()=>setOpen(true)}/><main className="mx-auto max-w-7xl p-5 sm:p-7">{children}</main></div></div>}
