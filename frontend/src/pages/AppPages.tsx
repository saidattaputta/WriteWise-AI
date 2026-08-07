import { generateLetter } from "../services/letterService";
import { useQuery } from '@tanstack/react-query'
import { Download, FilePlus2, Filter, MoreHorizontal, PenLine, Plus, Search, SlidersHorizontal, Sparkles, Star, WandSparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, EmptyState, Loader, Modal, useToast, Avatar } from '../components/ui'
import { mockApi } from "../services/api";
import type { Document } from '../types'
const Header=({eyebrow,title,children}:{eyebrow?:string;title:string;children?:React.ReactNode})=><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div>{eyebrow&&<p className="mb-1 text-sm font-semibold text-indigo-600">{eyebrow}</p>}<h1 className="page-title">{title}</h1></div>{children}</div>
function DocRow({doc}:{doc:Document}){return <div className="flex items-center gap-3 border-b py-4 last:border-0"><div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10"><PenLine size={18}/></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{doc.title}</p><p className="mt-0.5 text-xs text-slate-500">{doc.type} · {doc.updatedAt} · {doc.words.toLocaleString()} words</p></div>{doc.favorite&&<Star size={16} className="fill-amber-400 text-amber-400"/>}<button aria-label="Document menu" className="p-2 text-slate-400"><MoreHorizontal size={18}/></button></div>}
export function Dashboard(){const {data,isLoading}=useQuery({queryKey:['documents'],queryFn:mockApi.getDocuments});if(isLoading)return <Loader/>;const docs=data!;return <><Header eyebrow="Good morning, Alex" title="What will you create today?"><Link to="/generator"><Button><Plus size={17}/> New document</Button></Link></Header><div className="grid gap-4 md:grid-cols-3"><Link to="/generator" className="card group p-5 hover:border-indigo-300"><WandSparkles className="text-indigo-600"/><h2 className="mt-5 font-semibold">Generate with AI</h2><p className="mt-1 text-sm text-slate-500">Turn a thought into a first draft.</p></Link><Link to="/editor" className="card group p-5 hover:border-indigo-300"><FilePlus2 className="text-violet-600"/><h2 className="mt-5 font-semibold">Start from scratch</h2><p className="mt-1 text-sm text-slate-500">A calm space for your next idea.</p></Link><Link to="/templates" className="card p-5 hover:border-indigo-300"><Sparkles className="text-amber-500"/><h2 className="mt-5 font-semibold">Use a template</h2><p className="mt-1 text-sm text-slate-500">Jump-start your most common work.</p></Link></div><div className="mt-8 grid gap-6 xl:grid-cols-[1.6fr_1fr]"><section className="card p-6"><div className="flex items-center justify-between"><h2 className="font-bold">Recent documents</h2><Link className="text-sm font-semibold text-indigo-600" to="/history">View all</Link></div><div className="mt-3">{docs.slice(0,3).map(d=><DocRow doc={d} key={d.id}/>)}</div></section><section className="card p-6"><h2 className="font-bold">AI usage</h2><p className="mt-1 text-sm text-slate-500">Your words this billing period</p><div className="mt-6 flex items-end justify-between"><span className="text-3xl font-bold">6,842</span><span className="text-xs font-semibold text-emerald-600">+18% this week</span></div><div className="mt-4 h-2 rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full w-[68%] rounded-full bg-indigo-600"/></div><p className="mt-2 text-xs text-slate-500">6,842 of 10,000 words used</p></section></div><section className="mt-6"><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold">Favourite documents</h2><Link to="/history" className="text-sm text-indigo-600">See all</Link></div><div className="grid gap-4 md:grid-cols-2">{docs.filter(d=>d.favorite).map(d=><article key={d.id} className="card p-5"><Star className="fill-amber-400 text-amber-400" size={16}/><h3 className="mt-5 font-semibold">{d.title}</h3><p className="mt-2 text-sm text-slate-500">{d.excerpt}</p><p className="mt-4 text-xs text-slate-400">{d.updatedAt}</p></article>)}</div></section></>}
export function Generator() {
    const [prompt, setPrompt] = useState("");
    const [tone, setTone] = useState("Professional");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const generate = async () => {
        if (!prompt.trim()) {
            setOutput("Please enter some content.");
            return;
        }

        try {
            setLoading(true);

            const response = await generateLetter({
                recipient: "User",
                purpose: "General Writing",
                tone: tone,
                content: prompt,
            });

            setOutput(response.letter);

        } catch (error) {
            console.error(error);
            setOutput("Failed to connect to the backend.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header
                eyebrow="Create with AI"
                title="What do you want to write?"
            />

            <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">

                <section className="card p-6">

                    <label className="label">
                        Document type

                        <select className="input mt-1.5">
                            <option>Blog post</option>
                            <option>Email</option>
                            <option>Social media post</option>
                            <option>Product description</option>
                        </select>

                    </label>

                    <label className="label mt-5">
                        Tone
                    </label>

                    <div className="flex flex-wrap gap-2">

                        {[
                            "Professional",
                            "Friendly",
                            "Confident",
                            "Playful",
                            "Persuasive",
                        ].map((t) => (

                            <button
                                key={t}
                                onClick={() => setTone(t)}
                                className={`rounded-lg border px-3 py-2 text-sm ${
                                    tone === t
                                        ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                                        : "text-slate-600 dark:text-slate-300"
                                }`}
                            >
                                {t}
                            </button>

                        ))}

                    </div>

                    <label className="label mt-5">

                        Tell WriteWise what you need

                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="input mt-1.5 min-h-36 resize-y"
                            placeholder="Describe what you want WriteWise AI to generate..."
                        />

                    </label>

                    <Button
                        onClick={generate}
                        disabled={loading}
                        className="mt-5 w-full"
                    >

                        {loading ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        ) : (
                            <Sparkles size={17} />
                        )}

                        {" "}

                        {loading ? "Generating..." : "Generate Draft"}

                    </Button>

                </section>

                <section className="card min-h-[430px] p-6">

                    <div className="flex items-center justify-between">

                        <h2 className="font-bold">
                            Generated Draft
                        </h2>

                        {output && (

                            <Button
                                variant="secondary"
                                className="py-2"
                                onClick={() =>
                                    navigator.clipboard.writeText(output)
                                }
                            >
                                Copy
                            </Button>

                        )}

                    </div>

                    {output ? (

                        <div className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
                            {output}
                        </div>

                    ) : (

                        <div className="grid h-80 place-items-center text-center">

                            <div>

                                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10">

                                    <Sparkles />

                                </div>

                                <p className="mt-4 font-semibold">
                                    Your draft will appear here
                                </p>

                                <p className="mt-1 text-sm text-slate-500">
                                    Choose your settings and let AI do the work.
                                </p>

                            </div>

                        </div>

                    )}

                </section>

            </div>
        </>
    );
}
export function Editor(){const toast=useToast();const [text,setText]=useState('The future of remote work\n\nRemote work is more than a change of location. It is an opportunity to redesign how we collaborate, communicate, and create meaningful work.');return <><Header eyebrow="Untitled document" title="Editor"><div className="flex gap-2"><Button variant="secondary" onClick={()=>toast.show('Selection rewritten with a confident tone')}><WandSparkles size={16}/> Rewrite</Button><Button variant="secondary" onClick={()=>toast.show('Export is ready for download')}><Download size={16}/> Export</Button><Button onClick={()=>toast.show('Your document has been saved')}>Save changes</Button></div></Header><section className="card overflow-hidden"><div className="flex gap-1 border-b p-3 text-sm text-slate-500"><button className="rounded px-2 py-1 font-bold hover:bg-slate-100">B</button><button className="rounded px-2 py-1 italic hover:bg-slate-100">I</button><button className="rounded px-2 py-1 underline hover:bg-slate-100">U</button><span className="mx-2 border-l"/><button className="rounded px-2 py-1 hover:bg-slate-100">H1</button><button className="rounded px-2 py-1 hover:bg-slate-100">☷</button></div><textarea aria-label="Document editor" value={text} onChange={e=>setText(e.target.value)} className="min-h-[540px] w-full resize-none bg-transparent p-8 text-lg leading-8 outline-none sm:p-12"/></section><p className="mt-3 text-right text-xs text-slate-500">{text.trim().split(/\s+/).filter(Boolean).length} words</p></>}
export function Templates(){const {data,isLoading}=useQuery({queryKey:['templates'],queryFn:mockApi.getTemplates});const [active,setActive]=useState('All');if(isLoading)return <Loader/>;const categories=['All','Marketing','Business','Social','HR'];return <><Header eyebrow="Get a head start" title="Templates"><div className="relative"><Search size={17} className="absolute left-3 top-3 text-slate-400"/><input className="input w-64 pl-9" placeholder="Search templates"/></div></Header><div className="mb-6 flex flex-wrap gap-2">{categories.map(x=><button onClick={()=>setActive(x)} className={`rounded-lg px-3 py-2 text-sm font-medium ${x===active?'bg-indigo-600 text-white':'bg-white text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300'}`} key={x}>{x}</button>)}</div><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{data!.filter(t=>active==='All'||t.category===active).map(t=><article className="card group p-5" key={t.id}><div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${t.gradient} text-white`}><Sparkles size={19}/></div><p className="mt-5 text-xs font-semibold uppercase tracking-wide text-indigo-600">{t.category}</p><h2 className="mt-1 font-semibold">{t.title}</h2><p className="mt-2 text-sm text-slate-500">{t.description}</p><Button variant="secondary" className="mt-5 w-full group-hover:bg-indigo-600 group-hover:text-white">Use template</Button></article>)}</div></>}
export function History(){const {data,isLoading}=useQuery({queryKey:['documents'],queryFn:mockApi.getDocuments});const [search,setSearch]=useState('');const [filter,setFilter]=useState('All types');const filtered=useMemo(()=>data?.filter(d=>(filter==='All types'||d.type===filter)&&d.title.toLowerCase().includes(search.toLowerCase()))||[],[data,filter,search]);if(isLoading)return <Loader/>;return <><Header eyebrow="Your work" title="Document history"/><div className="card overflow-hidden"><div className="flex flex-col gap-3 border-b p-4 sm:flex-row"><div className="relative flex-1"><Search size={17} className="absolute left-3 top-3 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} className="input pl-9" placeholder="Search documents"/></div><select value={filter} onChange={e=>setFilter(e.target.value)} className="input w-auto"><option>All types</option><option>Blog post</option><option>Email</option><option>Strategy brief</option></select><Button variant="secondary"><Filter size={16}/> Filters</Button></div><div className="px-5">{filtered.length?filtered.map(d=><DocRow key={d.id} doc={d}/>):<EmptyState title="No documents found" description="Try a different search or filter."/>}</div><div className="flex items-center justify-between border-t p-4 text-sm text-slate-500"><span>Showing {filtered.length} of {data!.length} documents</span><div className="flex gap-2"><Button variant="secondary" className="py-2">Previous</Button><Button variant="secondary" className="py-2">Next</Button></div></div></div></>}
export function Profile(){const toast=useToast();return <><Header eyebrow="Account" title="Profile"/><div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]"><section className="card p-6"><div className="flex items-center gap-4"><Avatar large/><div><h2 className="font-bold">Alex Smith</h2><p className="text-sm text-slate-500">alex@writewise.ai</p><button className="mt-2 text-sm font-semibold text-indigo-600">Change avatar</button></div></div><div className="mt-7 border-t pt-5"><p className="text-sm font-semibold">Your plan</p><p className="mt-1 text-sm text-slate-500">Pro plan · Renews Aug 27, 2026</p><Button variant="secondary" className="mt-4">Manage plan</Button></div></section><section className="card p-6"><h2 className="font-bold">Personal information</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="label">First name<input className="input mt-1.5" defaultValue="Alex"/></label><label className="label">Last name<input className="input mt-1.5" defaultValue="Smith"/></label><label className="label sm:col-span-2">Email<input className="input mt-1.5" defaultValue="alex@writewise.ai"/></label></div><Button className="mt-5" onClick={()=>toast.show('Profile updated')}>Save changes</Button></section><section className="card p-6 lg:col-span-2"><h2 className="font-bold">Connected accounts</h2><p className="mt-1 text-sm text-slate-500">Sign in faster and connect your favourite tools.</p><div className="mt-5 flex items-center justify-between rounded-xl border p-4"><div><p className="font-semibold">Google</p><p className="text-sm text-slate-500">Not connected</p></div><Button variant="secondary">Connect</Button></div></section><section className="card p-6 lg:col-span-2"><h2 className="font-bold">Change password</h2><div className="mt-5 grid gap-4 md:grid-cols-3"><input type="password" className="input" placeholder="Current password"/><input type="password" className="input" placeholder="New password"/><Button onClick={()=>toast.show('Password updated')}>Update password</Button></div></section></div></>}
export function Settings(){const toast=useToast();const [saved,setSaved]=useState(false);return <><Header eyebrow="Workspace preferences" title="Settings"/><div className="max-w-3xl space-y-6"><section className="card p-6"><h2 className="font-bold">Writing defaults</h2><div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="label">Default tone<select className="input mt-1.5"><option>Professional</option><option>Friendly</option><option>Confident</option></select></label><label className="label">Default export format<select className="input mt-1.5"><option>PDF</option><option>DOCX</option><option>Markdown</option></select></label></div></section><section className="card p-6"><h2 className="font-bold">Appearance</h2><p className="mt-1 text-sm text-slate-500">Choose how WriteWise looks to you.</p><div className="mt-4 grid grid-cols-3 gap-3">{['Light','Dark','System'].map((x,i)=><button key={x} className={`rounded-xl border p-3 text-sm font-medium ${i===2?'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10':'hover:border-slate-400'}`}>{x}</button>)}</div></section><section className="card p-6"><h2 className="font-bold">Notifications</h2><div className="mt-4 space-y-4">{['Product updates and writing tips','Weekly writing summary','Document activity'].map((x,i)=><label key={x} className="flex items-center justify-between text-sm"><span>{x}</span><input defaultChecked={i!==2} type="checkbox" className="h-4 w-4 accent-indigo-600"/></label>)}</div></section><Button onClick={()=>{setSaved(true);toast.show('Settings saved')}}>{saved?'Saved':'Save preferences'}</Button></div></>}
export function NotFound(){return <div className="grid min-h-[70vh] place-items-center text-center"><div><p className="text-7xl font-bold text-indigo-600">404</p><h1 className="mt-4 text-2xl font-bold">This page got lost in the draft.</h1><p className="mt-2 text-slate-500">Let’s get you back to a place that exists.</p><Link to="/dashboard"><Button className="mt-6">Go to dashboard</Button></Link></div></div>}
