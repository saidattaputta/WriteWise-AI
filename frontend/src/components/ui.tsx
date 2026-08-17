import { createContext, useContext, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { CheckCircle2, Info, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function Button({children,variant='primary',className='',...props}: ButtonHTMLAttributes<HTMLButtonElement>&{variant?:'primary'|'secondary'|'ghost'|'danger'}) { const styles={primary:'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20',secondary:'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100',ghost:'hover:bg-slate-100 dark:hover:bg-slate-800',danger:'bg-rose-600 text-white hover:bg-rose-700'}; return <button className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`} {...props}>{children}</button> }
export function ThemeToggle(){ const {theme,toggle}=useTheme(); return <button onClick={toggle} aria-label="Toggle color theme" className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button> }
export function Avatar({
  large = false,
  initials = 'AS',
}: {
  large?: boolean
  initials?: string
}) {
  return (
    <div
      className={`${
        large
          ? 'h-20 w-20 text-2xl'
          : 'h-9 w-9 text-sm'
      } grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 font-bold text-white ring-2 ring-white dark:ring-slate-900`}
    >
      {initials}
    </div>
  )
}
type Toast={id:number; message:string; kind:'success'|'info'}; const ToastContext=createContext<{show:(message:string,kind?:Toast['kind'])=>void}>({show:()=>{}})
export function ToastProvider({children}:{children:ReactNode}) { const [toasts,setToasts]=useState<Toast[]>([]); const show=(message:string,kind:Toast['kind']='success')=>{const id=Date.now();setToasts(t=>[...t,{id,message,kind}]);setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3000)}; return <ToastContext.Provider value={{show}}>{children}<div className="fixed bottom-5 right-5 z-50 grid gap-2">{toasts.map(t=><div key={t.id} className="flex items-center gap-3 rounded-xl border bg-white px-4 py-3 text-sm font-medium shadow-xl dark:bg-slate-900">{t.kind==='success'?<CheckCircle2 className="text-emerald-500" size={19}/>:<Info className="text-indigo-500" size={19}/>} {t.message}<button onClick={()=>setToasts(a=>a.filter(x=>x.id!==t.id))}><X size={16}/></button></div>)}</div></ToastContext.Provider> }
export const useToast=()=>useContext(ToastContext)
export function Loader(){return <div className="grid min-h-[280px] place-items-center"><span className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600"/></div>}
export function EmptyState({title='Nothing here yet',description,action}:{title?:string;description?:string;action?:ReactNode}){return <div className="card grid min-h-60 place-items-center p-8 text-center"><div><div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-xl dark:bg-indigo-500/10">✦</div><h3 className="font-semibold">{title}</h3><p className="muted mt-1 max-w-sm">{description}</p>{action&&<div className="mt-5">{action}</div>}</div></div>}
export function ErrorState(){return <EmptyState title="We couldn’t load this" description="Please check your connection and try again." action={<Button>Try again</Button>}/>}
export function Modal({open,onClose,title,children}:{open:boolean;onClose:()=>void;title:string;children:ReactNode}){if(!open)return null;return <div role="dialog" aria-modal="true" className="fixed inset-0 z-40 grid place-items-center bg-slate-950/40 p-4"><div className="card w-full max-w-md p-6"><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold">{title}</h2><button onClick={onClose} aria-label="Close"><X size={20}/></button></div>{children}</div></div>}
