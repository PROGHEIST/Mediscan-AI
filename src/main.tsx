import React, { FormEvent, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Activity, Ambulance, ArrowUp, Baby, Bot, Brain, CalendarCheck, CheckCircle2, ChevronRight, Heart, CloudUpload, Droplets, Share2, HeartPulse, Menu, Moon, Pill, Quote, ShieldCheck, Sparkles, Star, Stethoscope, Sun, Share, Users, Venus, X, Zap } from 'lucide-react';
import './index.css';

type Theme = 'light' | 'dark';
const disclaimer = 'This website is for educational and demonstration purposes only. It does not provide medical diagnosis or treatment. Please consult a qualified healthcare professional for medic[...]
const doctors = ['Dr. Ava Williams - Cardiologist', 'Dr. Noah Patel - General Physician', 'Dr. Mia Chen - Dermatologist', 'Dr. Sofia Rivera - Mental Health'];
const chartData = [{day:'Mon',score:72,steps:7200},{day:'Tue',score:76,steps:8100},{day:'Wed',score:70,steps:6900},{day:'Thu',score:84,steps:9600},{day:'Fri',score:82,steps:9000},{day:'Sat',score:[...]
const iconClass = 'h-7 w-7 text-cyan-500';

function Section({ id, title, eyebrow, children }: {id:string; title:string; eyebrow?:string; children:React.ReactNode}) {
  return <section id={id} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration[...]
}
function Card({ children, className='' }: {children:React.ReactNode; className?:string}) {return <motion.article whileHover={{y:-8,scale:1.01}} className={`glass rounded-3xl p-6 shadow-xl shadow-c[...]
function Nav({theme,setTheme}:{theme:Theme;setTheme:(t:Theme)=>void}){const [open,setOpen]=useState(false); const links=['home','about','ai-features','services','appointment','testimonials','conta[...]
function Hero(){return <section id="home" className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950"><div[...]
function App(){const [theme,setTheme]=useState<Theme>('light'); return <div className={`${theme} bg-white text-slate-700 dark:bg-slate-950 dark:text-slate-200`}><Nav theme={theme} setTheme={setThe[...]
function Stats(){return <Section id="stats" title="Trusted demo outcomes" eyebrow="impact"><div className="grid gap-5 md:grid-cols-4">{[['24/7','AI support'],['92%','demo satisfaction'],['18k+','m[...]
function About(){return <Section id="about" title="Built for clear, human-centered care" eyebrow="about"><div className="grid gap-6 lg:grid-cols-3"><Card><ShieldCheck className={iconClass}/><h3 cl[...]
function AIFeatures(){const features=[[Activity,'AI Symptom Checker'],[Brain,'Disease Risk Prediction'],[Heart,'Medical Report Analyzer'],[Bot,'AI Medical Chatbot'],[HeartPulse,'Health Sc[...]
function Demos(){const [sym,setSym]=useState('fever, cough, fatigue'); const [risk,setRisk]=useState(38); const report=useMemo(()=>['Hemoglobin: normal','Vitamin D: low','WBC: slightly elevated'],[...]
function Services(){const s=[[Stethoscope,'General Consultation'],[HeartPulse,'Heart Disease Prediction'],[Droplets,'Diabetes Risk'],[Activity,'Skin Disease Analysis'],[Brain,'Mental Health Suppor[...]
function Dashboard(){return <Section id="dashboard" title="Personal health dashboard" eyebrow="mock analytics"><div className="grid gap-6 lg:grid-cols-3"><Card className="lg:col-span-2"><Responsiv[...]
function Appointment(){const [done,setDone]=useState(false); const submit=(e:FormEvent)=>{e.preventDefault();setDone(true)}; return <Section id="appointment" title="Book an appointment" eyebrow="s[...]
function Testimonials(){return <Section id="testimonials" title="Patient stories" eyebrow="testimonials"><div className="grid gap-6 md:grid-cols-3">{['Priya S.','Marcus L.','Emma R.'].map((n,i)=><[...]
function FAQ(){return <Section id="faq" title="Frequently asked questions"><div className="mx-auto max-w-3xl space-y-4">{['Is this real diagnosis? No, it is an educational demonstration.','Can it [...]
function Newsletter(){return <Section id="newsletter" title="Join the health innovation list"><div className="glass mx-auto flex max-w-2xl gap-3 rounded-full p-2"><input aria-label="Newsletter ema[...]
function Contact(){return <Section id="contact" title="Contact MediScan AI" eyebrow="contact"><div className="grid gap-6 lg:grid-cols-2"><Card><form className="grid gap-4"><input aria-label="Conta[...]
function Chatbot(){const [open,setOpen]=useState(false); return <div className="fixed bottom-5 right-5 z-50"><button aria-label="Open AI chatbot" onClick={()=>setOpen(!open)} className="rounded-fu[...]
function Footer(){return <footer className="border-t border-slate-200 px-4 py-10 text-center dark:border-slate-800"><b>MediScan AI</b><p className="mt-2 text-sm">Premium AI healthcare demo for edu[...]

createRoot(document.getElementById('root')!).render(<App/>);
