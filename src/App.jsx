import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Camera, CheckCircle2, Gamepad2, Heart, Home, Image, Link2, LockKeyhole, LogOut, Menu, Play, Plus, Search, ShieldCheck, Sparkles, Star, Trophy, UploadCloud, Video, X } from "lucide-react";

const FAMILY_KEYS = {
  "1122": { name: "Samuel" },
  "2233": { name: "Damilola" },
  "3344": { name: "Uriel" },
  "2468": { name: "Family" },
};

const initialMemories = [
  { id: 1, type: "photo", title: "Sunday together", event: "Family Sunday", date: "2026-10-11", favorite: true, tone: "from-orange-300 via-rose-200 to-indigo-300" },
  { id: 2, type: "video", title: "Little moments", event: "At home", date: "2026-09-22", favorite: false, tone: "from-[#284d80] via-[#0A1F44] to-[#071730]" },
  { id: 3, type: "photo", title: "Family day", event: "Family outing", date: "2026-08-18", favorite: true, tone: "from-cyan-200 via-blue-200 to-indigo-300" },
  { id: 4, type: "photo", title: "Our favorites", event: "Birthday party", date: "2026-07-04", favorite: true, tone: "from-[#FF7A00] via-orange-300 to-rose-300" },
  { id: 5, type: "video", title: "A day to remember", event: "School day", date: "2026-06-16", favorite: false, tone: "from-violet-300 via-indigo-300 to-[#0A1F44]" },
  { id: 6, type: "photo", title: "Growing together", event: "At home", date: "2026-05-05", favorite: false, tone: "from-emerald-200 via-cyan-200 to-blue-300" },
];

const loadingPhrases = ["Finding our laughter", "Dusting off the memories", "Rewinding the little moments", "Opening the family door"];
const gameStars = [{x:14,y:30},{x:31,y:70},{x:49,y:35},{x:68,y:70},{x:83,y:28},{x:90,y:77}];

function SpaceBackground() {
  return <>
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 1px,transparent 1px)", backgroundSize: "29px 29px" }} />
    <motion.div animate={{ x: [-50, 80, -50], y: [10, -55, 10], rotate: [0, 15, 0] }} transition={{ duration: 9, repeat: Infinity }} className="absolute -left-28 -top-16 h-96 w-96 rounded-[90px] bg-[#FF7A00]/20" />
    <motion.div animate={{ x: [35, -70, 35], y: [-25, 55, -25] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-indigo-400/15" />
  </>;
}

function Loading({ onDone }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setStep(current => {
        if (current >= loadingPhrases.length - 1) {
          clearInterval(timer);
          setTimeout(onDone, 700);
          return current;
        }
        return current + 1;
      });
    }, 1100);
    return () => clearInterval(timer);
  }, [onDone]);
  return <motion.main exit={{ opacity: 0 }} className="relative grid min-h-screen place-items-center overflow-hidden bg-[#071730] px-5 text-center text-white">
    <SpaceBackground />
    <div className="relative z-10">
      <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.06, 1] }} transition={{ duration: 3.4, repeat: Infinity }} className="mx-auto grid h-24 w-24 place-items-center rounded-[32px] border border-white/10 bg-white/[.06]"><Heart className="h-10 w-10 fill-[#FF7A00] text-[#FF7A00]" /></motion.div>
      <div className="mt-8 text-[10px] font-black uppercase tracking-[.34em] text-orange-300">Sadam Family</div>
      <h1 className="mt-3 text-[clamp(3.2rem,9vw,7.6rem)] font-black leading-[.82] tracking-[-.07em]">Building our<br/><span className="text-[#FF7A00]">memory galaxy.</span></h1>
      <AnimatePresence mode="wait"><motion.p key={loadingPhrases[step]} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="mt-10 text-lg font-bold text-white/60"><Sparkles className="mr-2 inline h-5 w-5 text-orange-300" />{loadingPhrases[step]}</motion.p></AnimatePresence>
      <div className="mt-6 flex justify-center gap-3">{loadingPhrases.map((_, i) => <div key={i} className={`h-2 rounded-full transition-all ${i === step ? "w-11 bg-[#FF7A00]" : "w-2 bg-white/15"}`} />)}</div>
    </div>
  </motion.main>;
}

function Login({ onUnlock, onGuest }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  function submit(e) {
    e.preventDefault();
    const member = FAMILY_KEYS[code];
    if (!member) { setError("Oops. That isn't one of our family keys."); return; }
    setError(""); onUnlock(member);
  }
  return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#071730] px-5 py-10 text-white">
    <SpaceBackground />
    <motion.div animate={{ y: [0, -14, 0], rotate: [-7, 4, -7] }} transition={{ duration: 5, repeat: Infinity }} className="absolute left-[9%] top-[20%] hidden h-28 w-24 rounded-[28px] bg-[#FF7A00] p-4 text-[#071730] md:block"><Camera /><div className="mt-9 text-[9px] font-black">PHOTOS</div></motion.div>
    <motion.div animate={{ y: [0, 15, 0], rotate: [7, -3, 7] }} transition={{ duration: 5.6, repeat: Infinity }} className="absolute right-[10%] top-[18%] hidden h-24 w-24 rounded-[27px] bg-indigo-400 p-4 md:block"><Video /><div className="mt-6 text-[9px] font-black">VIDEOS</div></motion.div>
    <div className="relative z-10 w-full max-w-md rounded-[42px] border border-white/10 bg-white/[.065] p-8 shadow-2xl backdrop-blur-xl">
      <div className="grid h-16 w-16 place-items-center rounded-[21px] bg-[#FF7A00] text-[#071730]"><LockKeyhole /></div>
      <div className="mt-8 text-[10px] font-black uppercase tracking-[.3em] text-orange-300">Sadam Family · Secret Door</div>
      <h1 className="mt-3 text-5xl font-black leading-[.92] tracking-[-.06em]">Hey, family.<br/><span className="text-white/50">Ready to enter?</span></h1>
      <p className="mt-5 text-sm leading-6 text-white/50">Enter your personal family key and the memory galaxy will know who is home.</p>
      <form onSubmit={submit} className="mt-8"><input value={code} onChange={e => setCode(e.target.value)} type="password" inputMode="numeric" placeholder="••••" className="h-16 w-full rounded-[22px] border border-white/10 bg-black/30 px-5 text-center text-2xl font-black tracking-[.45em] outline-none focus:border-[#FF7A00]" />{error && <p className="mt-3 text-sm text-orange-200">{error}</p>}<button className="mt-4 h-14 w-full rounded-[20px] bg-[#FF7A00] font-black text-[#071730]">Open the family world</button></form>
      <button onClick={onGuest} className="mt-4 flex w-full items-center justify-center gap-2 text-xs font-bold text-white/45"><UploadCloud className="h-4 w-4" />Guest upload</button>
      <div className="mt-5 text-[11px] text-white/25"><ShieldCheck className="mr-2 inline h-4 w-4 text-emerald-300" />Demo keys: 1122 Samuel · 2233 Damilola · 3344 Uriel · 2468 Family</div>
    </div>
  </main>;
}

function Welcome({ member, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 1200); return () => clearTimeout(t); }, [onDone]);
  const text = member.name === "Family" ? "Welcome home, family." : `Welcome ${member.name}.`;
  return <main className="grid min-h-screen place-items-center bg-[#071730] px-5 text-center text-white"><motion.div initial={{ scale: .45 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: .5 }}><div className="mx-auto grid h-28 w-28 place-items-center rounded-[36px] bg-[#FF7A00] text-[#071730]"><Heart className="h-12 w-12 fill-[#071730]" /></div><h1 className="mt-7 text-5xl font-black">{text}</h1><p className="mt-4 text-white/45">Your memories are ready.</p></motion.div></main>;
}

function Vault({ member, memories, setMemories, onLogout, onGuest }) {
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [game, setGame] = useState(false);
  const [menu, setMenu] = useState(false);
  const visible = useMemo(() => memories.filter(m => (tab === "all" || tab === "favorites" && m.favorite || tab === m.type) && `${m.title} ${m.event}`.toLowerCase().includes(query.toLowerCase())), [memories, tab, query]);
  function favorite(id) { setMemories(list => list.map(m => m.id === id ? { ...m, favorite: !m.favorite } : m)); }
  return <main className="min-h-screen bg-[#f7f1e8] pb-20 text-[#0A1F44]">
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f7f1e8]/90 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><div><b>SADAM <span className="text-[#FF7A00]">FAMILY</span></b><div className="text-[9px] uppercase tracking-widest text-black/35">Welcome, {member.name}</div></div><nav className="hidden gap-2 lg:flex">{[["all",Home,"Home"],["photo",Image,"Photos"],["video",Video,"Videos"],["favorites",Heart,"Favorites"]].map(([id,Icon,label]) => <button key={id} onClick={() => setTab(id)} className="pill"><Icon />{label}</button>)}<button onClick={() => setGame(true)} className="pill"><Gamepad2 />Play</button><button onClick={onGuest} className="pill"><Link2 />Guest</button></nav><div className="flex gap-2"><button onClick={() => setMenu(!menu)} className="grid h-10 w-10 place-items-center rounded-full bg-white lg:hidden"><Menu /></button><button onClick={onLogout} className="grid h-10 w-10 place-items-center rounded-full bg-white"><LogOut /></button></div></div></header>
    <section className="mx-auto grid max-w-7xl gap-9 px-5 py-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center"><div><div className="inline-flex rounded-full bg-[#0A1F44] px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white"><Sparkles className="mr-2 h-4 w-4 text-[#FF7A00]" />The Ajiniran memory galaxy</div><h1 className="mt-6 text-[clamp(3.5rem,8vw,7rem)] font-black leading-[.8] tracking-[-.06em]">Big love.<br/><span className="text-[#FF7A00]">Tiny moments.</span><br/><span className="text-indigo-400">All ours.</span></h1></div><div className="relative min-h-[340px]"><motion.div animate={{ y: [0, -12, 0], rotate: [-4, 2, -4] }} transition={{ duration: 5, repeat: Infinity }} className="absolute left-0 top-2 w-[60%] rounded-[30px] bg-[#0A1F44] p-6 text-white shadow-2xl"><Heart className="text-[#FF7A00]" /><div className="mt-20 font-black">One photo can hold a whole day.</div></motion.div><motion.div animate={{ y: [0, 14, 0], rotate: [5, -2, 5] }} transition={{ duration: 5.5, repeat: Infinity }} className="absolute bottom-2 right-0 w-[60%] rounded-[30px] bg-indigo-400 p-6 text-white shadow-2xl"><Video /><div className="mt-20 font-black">Rewatch the chaos.</div></motion.div></div></section>
    <section className="mx-auto max-w-7xl px-5"><div className="mb-7 flex flex-col gap-3 rounded-[28px] bg-white p-4 md:flex-row md:justify-between"><div className="flex flex-wrap gap-2">{["all","photo","video","favorites"].map(id => <button key={id} onClick={() => setTab(id)} className={`rounded-full px-4 py-2 text-sm font-bold ${tab === id ? "bg-[#0A1F44] text-white" : "bg-[#f4f0eb]"}`}>{id}</button>)}</div><label className="flex items-center gap-2 rounded-full bg-[#f4f0eb] px-4"><Search className="h-4 w-4" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Find a memory..." className="h-11 bg-transparent outline-none" /></label></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visible.map(m => <motion.article key={m.id} whileHover={{ y: -10, scale: 1.015 }} onClick={() => setSelected(m)} className={`relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[32px] bg-gradient-to-br ${m.tone}`}><div className="absolute inset-0 bg-gradient-to-t from-[#071730]/85 to-transparent" /><button onClick={e => { e.stopPropagation(); favorite(m.id); }} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-2xl bg-white/85"><Heart className={m.favorite ? "fill-[#FF7A00] text-[#FF7A00]" : ""} /></button><div className="absolute bottom-0 p-6 text-white"><div className="text-xs text-orange-200">{m.event} · {m.date}</div><b className="text-2xl">{m.title}</b></div></motion.article>)}</div></section>
    {menu && <div className="fixed bottom-4 left-4 right-4 z-40 grid grid-cols-3 gap-2 rounded-2xl bg-white p-3 shadow-xl lg:hidden">{["all","photo","video","favorites"].map(id => <button key={id} onClick={() => { setTab(id); setMenu(false); }} className="rounded-xl bg-[#f4f0eb] p-3 text-xs font-bold">{id}</button>)}<button onClick={() => setGame(true)} className="rounded-xl bg-[#f4f0eb] p-3 text-xs font-bold">Play</button><button onClick={onGuest} className="rounded-xl bg-[#f4f0eb] p-3 text-xs font-bold">Guest</button></div>}
    <AnimatePresence>{selected && <MemoryModal memory={selected} onClose={() => setSelected(null)} />}{game && <Game onClose={() => setGame(false)} />}</AnimatePresence>
  </main>;
}

function MemoryModal({ memory, onClose }) { return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 grid place-items-center bg-[#071730]/85 p-4"><div onClick={e => e.stopPropagation()} className="relative w-full max-w-2xl overflow-hidden rounded-[34px] bg-white"><button onClick={onClose} className="absolute right-5 top-5 z-10 rounded-full bg-white p-2"><X /></button><div className={`aspect-video bg-gradient-to-br ${memory.tone}`} /><div className="p-7"><div className="text-xs font-bold text-[#FF7A00]">{memory.event} · {memory.date}</div><h2 className="mt-2 text-4xl font-black">{memory.title}</h2></div></div></motion.div>; }

function Game({ onClose }) { const [caught,setCaught] = useState([]); const win = caught.length === gameStars.length; return <motion.div initial={{opacity:0}} animate={{opacity:1}} className="fixed inset-0 z-50 grid place-items-center bg-[#071730]/95 p-4"><div className="relative h-[min(700px,90vh)] w-full max-w-3xl overflow-hidden rounded-[38px] bg-[#10284d] text-white"><button onClick={onClose} className="absolute right-5 top-5 z-20"><X /></button><div className="p-7"><Gamepad2 className="text-[#FF7A00]" /><h2 className="mt-3 text-3xl font-black">Catch the family stars</h2><b>{caught.length} / {gameStars.length}</b></div>{gameStars.map((s,i) => <motion.button key={i} onClick={() => setCaught(v => v.includes(i) ? v : [...v,i])} style={{left:`${s.x}%`,top:`${s.y}%`}} animate={caught.includes(i) ? {scale:0} : {y:[0,-14,0],rotate:[-8,10,-8]}} transition={{duration:2+i*.2,repeat:Infinity}} className="absolute grid h-14 w-14 place-items-center rounded-[18px] bg-[#FF7A00]"><Star className="fill-white" /></motion.button>)}{win && <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-2xl bg-white p-5 text-center text-[#0A1F44]"><Trophy className="mx-auto text-[#FF7A00]" /><b>Family Star Champion!</b></div>}</div></motion.div>; }

function Guest({ onBack }) { const [name,setName]=useState(""); const [event,setEvent]=useState(""); const [files,setFiles]=useState([]); const [sent,setSent]=useState(false); if(sent) return <main className="grid min-h-screen place-items-center bg-[#071730] px-5 text-center text-white"><div><CheckCircle2 className="mx-auto h-20 w-20 text-[#FF7A00]" /><h1 className="mt-5 text-5xl font-black">Thank you, {name}!</h1><p className="mt-4 text-white/50">Your selected memories from “{event}” were sent to the private review inbox.</p><button onClick={() => {setSent(false);setFiles([]);}} className="mt-6 rounded-full bg-[#FF7A00] px-6 py-3 font-bold text-[#071730]">Upload more</button></div></main>; return <main className="min-h-screen bg-[#f7f1e8] px-5 py-8"><div className="mx-auto max-w-5xl"><header className="flex justify-between"><b>SADAM <span className="text-[#FF7A00]">FAMILY</span></b><button onClick={onBack} className="rounded-full bg-[#0A1F44] px-4 py-2 text-xs font-bold text-white"><ArrowLeft className="mr-2 inline h-4 w-4" />Family login</button></header><div className="mt-12 grid gap-9 lg:grid-cols-2"><div><h1 className="text-6xl font-black leading-[.85]">Share the<br/><span className="text-[#FF7A00]">magic</span><br/>you captured.</h1><p className="mt-6 text-black/50">Upload-only access. Guests cannot browse family albums.</p></div><form onSubmit={e => {e.preventDefault(); if(name && event && files.length) setSent(true);}} className="rounded-[36px] bg-white p-7 shadow-xl"><div className="grid gap-4 sm:grid-cols-2"><input required value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="h-13 rounded-2xl bg-[#f4f0eb] px-4" /><input required value={event} onChange={e => setEvent(e.target.value)} placeholder="Event" className="h-13 rounded-2xl bg-[#f4f0eb] px-4" /></div><label className="mt-5 grid min-h-56 cursor-pointer place-items-center rounded-3xl border-2 border-dashed border-black/10"><input type="file" accept="image/*,video/*" multiple className="hidden" onChange={e => setFiles(Array.from(e.target.files))} /><UploadCloud className="h-12 w-12 text-[#FF7A00]" /><b>Choose photos and videos</b></label><button disabled={!name || !event || !files.length} className="mt-5 h-14 w-full rounded-2xl bg-[#FF7A00] font-black text-white disabled:opacity-30">Send memories to the family</button></form></div></div></main>; }

export default function App() {
  const [screen,setScreen] = useState("loading");
  const [member,setMember] = useState(null);
  const [memories,setMemories] = useState(initialMemories);
  return <AnimatePresence mode="wait">
    {screen === "loading" && <Loading onDone={() => setScreen("login")} />}
    {screen === "login" && <Login onUnlock={m => {setMember(m);setScreen("welcome");}} onGuest={() => setScreen("guest")} />}
    {screen === "welcome" && member && <Welcome member={member} onDone={() => setScreen("vault")} />}
    {screen === "vault" && member && <Vault member={member} memories={memories} setMemories={setMemories} onLogout={() => {setMember(null);setScreen("login");}} onGuest={() => setScreen("guest")} />}
    {screen === "guest" && <Guest onBack={() => setScreen(member ? "vault" : "login")} />}
  </AnimatePresence>;
}
