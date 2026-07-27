import axios from 'axios'
import type { Document, Template } from '../types'
export const api = axios.create({ baseURL: '/api', timeout: 800 })
const sleep = (ms = 350) => new Promise(resolve => setTimeout(resolve, ms))
export const documents: Document[] = [
 { id:'1', title:'Q3 Product Launch Strategy', type:'Strategy brief', updatedAt:'Edited 2 hours ago', words:1248, favorite:true, excerpt:'A focused plan for introducing the next generation of our product.' },
 { id:'2', title:'Welcome email sequence', type:'Email', updatedAt:'Edited yesterday', words:642, favorite:true, excerpt:'A warm, clear onboarding experience for new customers.' },
 { id:'3', title:'The future of remote work', type:'Blog post', updatedAt:'Edited Jul 18', words:1830, excerpt:'Distributed teams are reshaping the way meaningful work gets done.' },
 { id:'4', title:'Monthly team update', type:'Internal memo', updatedAt:'Edited Jul 12', words:478, excerpt:'A concise recap of this month’s progress and priorities.' },
]
export const templates: Template[] = [
 {id:'t1',title:'Blog post',description:'Create thoughtful long-form content.',category:'Marketing',icon:'PenLine',gradient:'from-violet-500 to-indigo-600'},
 {id:'t2',title:'Product description',description:'Make every feature feel essential.',category:'Marketing',icon:'Sparkles',gradient:'from-cyan-500 to-blue-600'},
 {id:'t3',title:'Professional email',description:'Clear, confident communication.',category:'Business',icon:'Mail',gradient:'from-amber-500 to-orange-500'},
 {id:'t4',title:'Social media post',description:'Find your audience and voice.',category:'Social',icon:'MessageCircle',gradient:'from-pink-500 to-rose-500'},
 {id:'t5',title:'Meeting summary',description:'Capture decisions and next steps.',category:'Business',icon:'ClipboardList',gradient:'from-emerald-500 to-teal-500'},
 {id:'t6',title:'Job description',description:'Attract the right talent.',category:'HR',icon:'Users',gradient:'from-sky-500 to-indigo-500'},
]
export const mockApi = { getDocuments: async () => { await sleep(); return documents }, getTemplates: async () => { await sleep(); return templates }, generate: async (prompt:string) => { await sleep(900); return `Here’s a polished first draft based on your brief.\n\n${prompt || 'Your idea deserves a clear, engaging narrative.'}\n\nStart with the reader’s most urgent need, then introduce the value with direct, specific language. Keep each paragraph focused on one idea and close with a confident next step.` } }
