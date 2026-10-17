import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Album, ArrowLeft, CalendarDays, Camera, CheckCircle2, ChevronRight,
  Gamepad2, Heart, Home, Image, Images, Link2, LogOut, Menu,
  PartyPopper, Play, Search, Sparkles, Star, Timer, Trophy,
  UploadCloud, Video, X, Zap
} from "lucide-react";

const FAMILY_KEYS = {
  "1122": { name: "Samuel" },
  "2233": { name: "Damilola" },
  "3344": { name: "Uriel" },
  "2468": { name: "Family" },
};

const COLLECTIONS = [
  { id: "albums", title: "Albums", subtitle: "Every chapter in one place", icon: Album, count: 12, color: "from-[#0A1F44] to-[#173d72]", size: "lg:col-span-2" },
  { id: "moments", title: "Moments", subtitle: "Small things, big memories", icon: Sparkles, count: 48, color: "from-[#FF7A00] to-[#ff9c45]", size: "lg:col-span-2" },
  { id: "gallery", title: "Gallery", subtitle: "Browse everything beautifully", icon: Images, count: 126, color: "from-indigo-500 to-violet-400", size: "lg:col-span-2" },
  { id: "wedding", title: "Wedding", subtitle: "The beginning of our forever", icon: Heart, count: 34, color: "from-rose-400 to-orange-300", size: "" },
  { id: "sundays", title: "Sundays", subtitle: "Slow days together", icon: CalendarDays, count: 19, color: "from-cyan-400 to-blue-500", size: "" },
  { id: "events", title: "Events", subtitle: "Birthdays, trips and celebrations", icon: PartyPopper, count: 27, color: "from-emerald-400 to-teal-500", size: "lg:col-span-4" },
];

const MEMORIES = [
  { id: 1, type: "photo", collection: "albums", title: "Our 2026 Story", event: "Family year", favorite: true, tone: "from-orange-300 via-rose-200 to-indigo-300" },
  { id: 2, type: "video", collection: "moments", title: "First steps", event: "Little moment", favorite: true, tone: "from-cyan-300 to-blue-500" },
  { id: 3, type: "photo", collection: "gallery", title: "Family portrait", event: "Portrait day", favorite: false, tone: "from-indigo-300 to-violet-500" },
  { id: 4, type: "photo", collection: "wedding", title: "Our special day", event: "Wedding", favorite: true, tone: "from-rose-300 to-orange-400" },
  { id: 5, type: "photo", collection: "sundays", title: "Sunday lunch", event: "Sunday", favorite: false, tone: "from-sky-300 to-indigo-500" },
  { id: 6, type: "video", collection: "events", title: "Birthday energy", event: "Birthday", favorite: false, tone: "from-emerald-300 to-cyan-500" },
  { id: 7, type: "photo", collection: "events", title: "Beach day", event: "Trip", favorite: true, tone: "from-amber-300 to-orange-500" },
  { id: 8, type: "video", collection: "gallery", title: "Growing together", event: "At home", favorite: false, tone: "from-fuchsia-300 to-indigo-500" },
];

function GalaxyBackdrop() {
  return <>
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
    <motion.div animate={{ x: [-40, 70, -40], y: [10, -45, 10], rotate: [0, 15, 0] }} transition={{ duration: 9, repeat: Infinity }} className="absolute -left-24 -top-20 h-96 w-96 rounded-[90px] bg-[#FF7A00]/20" />
    <motion.div animate={{ x: [35, -60, 35], y: [-15, 45, -15] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-indigo-400/15" />
  </>;
}

function LoadingScreen({ onDone }) {
  const messages = ["Finding our laughter", "Dusting off the memories", "Rewinding the little moments", "Opening the family door"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex(value => {
      if (value >= messages.length - 1) {
        clearInterval(timer);
        setTimeout(onDone, 650);
        return value;
      }
      return value + 1;
    }), 900);
    return () => clearInterval(timer);
  }, [onDone]);
  return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#071730] px-5 text-center text-white">
    <GalaxyBackdrop />
    <div className="relative z-10">
      <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.06, 1] }} transition={{ duration: 3.4, repeat: Infinity }} className="mx-auto grid h-24 w-24 place-items-center rounded-[32px] border border-white/10 bg-white/[.06]"><Heart className="h-10 w-10 fill-[#FF7A00] text-[#FF7A00]" /></motion.div>
      <div className="mt-8 text-[10px] font-black uppercase tracking-[.34em] text-orange-300">Sadam Family</div>
      <h1 className="mt-3 text-[clamp(3.2rem,9vw,7.2rem)] font-black leading-[.82] tracking-[-.07em]">Building our<br /><span className="text-[#FF7A00]">memory galaxy.</span></h1>
      <AnimatePresence mode="wait"><motion.p key={messages[index]} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="mt-10 text-lg font-bold text-white/60"><Sparkles className="mr-2 inline h-5 w-5 text-orange-300" />{messages[index]}</motion.p></AnimatePresence>
    </div>
  </main>;
}

function LoginScreen({ onUnlock, onGuest }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const submit = event => {
    event.preventDefault();
    const member = FAMILY_KEYS[code];
    if (!member) return setError("That is not one of our family keys.");
    setError("");
    onUnlock(member);
  };
  return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#071730] px-5 py-10 text-white">
    <GalaxyBackdrop />
    <div className="relative z-10 w-full max-w-md rounded-[42px] border border-white/10 bg-white/[.065] p-8 shadow-2xl backdrop-blur-xl">
      <div className="grid h-16 w-16 place-items-center rounded-[21px] bg-[#FF7A00] text-[#071730]"><Heart className="fill-[#071730]" /></div>
      <div className="mt-8 text-[10px] font-black uppercase tracking-[.3em] text-orange-300">Sadam Family · Secret Door</div>
      <h1 className="mt-3 text-5xl font-black leading-[.92] tracking-[-.06em]">Hey, family.<br /><span className="text-white/50">Ready to enter?</span></h1>
      <p className="mt-5 text-sm leading-6 text-white/50">Enter your personal family key and the memory galaxy will know who is home.</p>
      <form onSubmit={submit} className="mt-8">
        <input value={code} onChange={event => setCode(event.target.value)} type="password" inputMode="numeric" placeholder="••••" className="h-16 w-full rounded-[22px] border border-white/10 bg-black/30 px-5 text-center text-2xl font-black tracking-[.45em] outline-none focus:border-[#FF7A00]" />
        {error && <p className="mt-3 text-sm text-orange-200">{error}</p>}
        <button className="mt-4 h-14 w-full rounded-[20px] bg-[#FF7A00] font-black text-[#071730]">Open the family world</button>
      </form>
      <button onClick={onGuest} className="mt-4 flex w-full items-center justify-center gap-2 text-xs font-bold text-white/45"><UploadCloud className="h-4 w-4" />Guest upload</button>
      <div className="mt-5 text-[11px] text-white/25">Demo keys: 1122 Samuel · 2233 Damilola · 3344 Uriel · 2468 Family</div>
    </div>
  </main>;
}

function WelcomeScreen({ member, onDone }) {
  useEffect(() => { const timer = setTimeout(onDone, 1200); return () => clearTimeout(timer); }, [onDone]);
  return <main className="grid min-h-screen place-items-center bg-[#071730] px-5 text-center text-white"><motion.div initial={{ scale: .5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}><div className="mx-auto grid h-28 w-28 place-items-center rounded-[36px] bg-[#FF7A00] text-[#071730]"><Heart className="h-12 w-12 fill-[#071730]" /></div><h1 className="mt-7 text-5xl font-black">Welcome {member.name}.</h1><p className="mt-4 text-white/45">Your memories are ready.</p></motion.div></main>;
}

export default function App() {
  const [stage, setStage] = useState("loading");
  const [member, setMember] = useState(null);
  return <AnimatePresence mode="wait">
    {stage === "loading" && <LoadingScreen onDone={() => setStage("login")} />}
    {stage === "login" && <LoginScreen onUnlock={value => { setMember(value); setStage("welcome"); }} onGuest={() => setStage("guest")} />}
    {stage === "welcome" && member && <WelcomeScreen member={member} onDone={() => setStage("site")} />}
    {stage === "site" && member && <FamilySite member={member} onLogout={() => { setMember(null); setStage("login"); }} />}
    {stage === "guest" && <StandaloneGuest onBack={() => setStage(member ? "site" : "login")} />}
  </AnimatePresence>;
}

function FamilySite({ member, onLogout }) {
  const [page, setPage] = useState("home");
  const [active, setActive] = useState(null);
  const [query, setQuery] = useState("");
  const [menu, setMenu] = useState(false);
  const [game, setGame] = useState(false);
  const [guest, setGuest] = useState({ name: "", event: "", files: [], sent: false });
  const filtered = useMemo(() => MEMORIES.filter(item => {
    if (page === "photos" && item.type !== "photo") return false;
    if (page === "videos" && item.type !== "video") return false;
    if (page === "favorites" && !item.favorite) return false;
    if (page === "collection" && item.collection !== active?.id) return false;
    return `${item.title} ${item.event}`.toLowerCase().includes(query.toLowerCase());
  }), [page, active, query]);
  const go = next => { setPage(next); setActive(null); setQuery(""); setMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const open = item => { setActive(item); setPage("collection"); setQuery(""); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const links = [["home", Home, "Home"], ["photos", Image, "Photos"], ["videos", Video, "Videos"], ["favorites", Heart, "Favorites"]];
  return <main className="min-h-screen overflow-x-hidden bg-[#f4efe7] text-[#0A1F44]">
    <header className="sticky top-0 z-40 border-b border-[#0A1F44]/10 bg-[#f4efe7]/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1450px] items-center justify-between gap-3 px-5 py-3 sm:px-8 xl:px-10">
        <button onClick={() => go("home")} className="shrink-0 text-left"><div className="text-lg font-black tracking-[-.04em] sm:text-xl">SADAM <span className="text-[#FF7A00]">FAMILY</span></div><div className="text-[8px] font-black uppercase tracking-[.2em] text-black/35">Welcome, {member.name}</div></button>
        <nav className="hidden items-center gap-1.5 lg:flex">{links.map(([id, Icon, label]) => <NavButton key={id} active={page === id} onClick={() => go(id)} icon={Icon} label={label} />)}<NavButton onClick={() => setGame(true)} icon={Gamepad2} label="Play" /><NavButton active={page === "guest"} onClick={() => go("guest")} icon={Link2} label="Guest" guest /></nav>
        <div className="flex gap-2"><button onClick={() => setMenu(!menu)} className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm lg:hidden"><Menu className="h-4 w-4" /></button><button onClick={onLogout} className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm"><LogOut className="h-4 w-4" /></button></div>
      </div>
      {menu && <div className="grid grid-cols-3 gap-2 border-t border-black/5 p-3 lg:hidden">{links.map(([id, Icon, label]) => <NavButton key={id} active={page === id} onClick={() => go(id)} icon={Icon} label={label} />)}<NavButton onClick={() => setGame(true)} icon={Gamepad2} label="Play" /><NavButton onClick={() => go("guest")} icon={Link2} label="Guest" guest /></div>}
    </header>
    <AnimatePresence mode="wait">
      {page === "home" && <HomePage onOpen={open} onPlay={() => setGame(true)} />}
      {["photos", "videos", "favorites"].includes(page) && <MediaPage key={page} title={page[0].toUpperCase() + page.slice(1)} items={filtered} query={query} setQuery={setQuery} />}
      {page === "collection" && active && <CollectionPage item={active} items={filtered} query={query} setQuery={setQuery} onBack={() => go("home")} />}
      {page === "guest" && <GuestPage data={guest} setData={setGuest} />}
    </AnimatePresence>
    <AnimatePresence>{game && <AdvancedGame onClose={() => setGame(false)} />}</AnimatePresence>
  </main>;
}

function NavButton({ active, onClick, icon: Icon, label, guest }) { return <button onClick={onClick} className={`rounded-full px-3 py-1.5 text-[11px] font-bold shadow-sm transition hover:-translate-y-0.5 ${active ? "bg-[#0A1F44] text-white" : "bg-white"}`}><Icon className={`mr-1.5 inline h-3.5 w-3.5 ${guest ? "text-[#FF7A00]" : ""}`} />{label}</button>; }

function HomePage({ onOpen, onPlay }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <section className="relative overflow-hidden py-12"><motion.div animate={{ rotate: [0, 12, 0], x: [0, 25, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -right-24 top-4 h-80 w-80 rounded-[90px] bg-indigo-300/25" /><motion.div animate={{ rotate: [0, -10, 0], y: [0, -18, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#FF7A00]/12" /><div className="relative mx-auto grid max-w-[1450px] gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-14 xl:px-10"><div><div className="inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-4 py-2 text-[10px] font-black uppercase tracking-[.24em] text-white"><Sparkles className="h-4 w-4 text-[#FF7A00]" />A home that moves with us</div><motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="mt-8 max-w-[720px] text-[clamp(3.2rem,6.2vw,6.5rem)] font-extrabold leading-[.84] tracking-[-.052em]"><motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 5.8, repeat: Infinity }} className="inline-block">The moments that made us.</motion.span><br /><motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity }} className="inline-block text-[#FF7A00]">The memories that keep us close.</motion.span></motion.h1><p className="mt-9 max-w-xl text-lg leading-8 text-[#0A1F44]/60">Move through albums, celebrations, Sundays, wedding memories and the tiny moments that made the family.</p><div className="mt-7 flex flex-wrap gap-3"><button onClick={() => onOpen(COLLECTIONS[0])} className="rounded-full bg-[#0A1F44] px-6 py-3 font-black text-white">Enter albums</button><button onClick={onPlay} className="rounded-full bg-white px-6 py-3 font-black shadow-sm">Enter Challenge Arena</button></div></div><div className="relative min-h-[440px]"><motion.div animate={{ y: [0, -14, 0], rotate: [-5, 2, -5] }} transition={{ duration: 5.2, repeat: Infinity }} className="absolute left-[5%] top-[8%] w-[57%] rounded-[32px] bg-[#0A1F44] p-7 text-white shadow-2xl"><Camera className="text-[#FF7A00]" /><div className="mt-24 text-xs text-white/40">FEATURED MEMORY</div><div className="mt-2 text-2xl font-black">The moments between the milestones.</div></motion.div><motion.div animate={{ y: [0, 15, 0], rotate: [5, -3, 5] }} transition={{ duration: 5.8, repeat: Infinity }} className="absolute bottom-[5%] right-[5%] w-[57%] rounded-[32px] bg-indigo-500 p-7 text-white shadow-2xl"><Video /><div className="mt-24 text-xs text-indigo-100">NOW PLAYING</div><div className="mt-2 text-2xl font-black">A family movie made of real life.</div></motion.div></div></div></section>
    <section className="mx-auto max-w-[1450px] px-5 pb-20 sm:px-8 xl:px-10"><div className="mb-8"><div className="text-[10px] font-black uppercase tracking-[.24em] text-[#FF7A00]">Choose a doorway</div><h2 className="mt-2 text-4xl font-black">Where should the story begin?</h2></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{COLLECTIONS.map((item, index) => <CollectionCard key={item.id} item={item} index={index} onClick={() => onOpen(item)} />)}</div></section>
  </motion.div>;
}

function CollectionCard({ item, index, onClick }) {
  const Icon = item.icon;
  return <motion.button onClick={onClick} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -10, scale: 1.015 }} whileTap={{ scale: .98 }} className={`relative min-h-[250px] overflow-hidden rounded-[32px] bg-gradient-to-br ${item.color} ${item.size} p-7 text-left text-white shadow-lg`}>
    <motion.div animate={{ x: [-35, 55, -35], y: [20, -28, 20], rotate: [0, 20, 0] }} transition={{ duration: 7 + index * .4, repeat: Infinity }} className="absolute -right-14 -top-14 h-52 w-52 rounded-[65px] bg-white/15" />
    <motion.div animate={{ x: ["-140%", "190%"] }} transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 1.5, delay: index * .2 }} className="absolute inset-y-0 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-white/18 to-transparent" />
    <div className="relative z-10 flex min-h-[196px] flex-col justify-between"><div className="flex justify-between"><motion.div animate={{ y: [0, -7, 0], rotate: [0, 7, -5, 0] }} transition={{ duration: 4 + index * .2, repeat: Infinity }} className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20"><Icon /></motion.div><motion.span animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.8 + index * .2, repeat: Infinity }} className="rounded-full bg-black/10 px-3 py-1 text-xs font-black">{item.count}</motion.span></div><div className="pt-8"><h3 className="text-3xl font-black">{item.title}</h3><p className="mt-2 text-sm text-white/80">{item.subtitle}</p><span className="mt-5 inline-flex items-center text-xs font-black uppercase">Open collection <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ChevronRight className="ml-1 h-4 w-4" /></motion.span></span></div></div>
  </motion.button>;
}

function MediaPage({ title, items, query, setQuery }) { return <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="mx-auto min-h-[85vh] max-w-[1450px] px-5 py-10 sm:px-8 xl:px-10"><PageHero title={title} subtitle={`Your private ${title.toLowerCase()} collection.`} /><SearchBar value={query} setValue={setQuery} count={items.length} /><MediaGrid items={items} /></motion.section>; }
function CollectionPage({ item, items, query, setQuery, onBack }) { const Icon = item.icon; return <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="mx-auto min-h-[85vh] max-w-[1450px] px-5 py-10 sm:px-8 xl:px-10"><button onClick={onBack} className="mb-6 rounded-full bg-white px-4 py-2 text-sm font-bold"><ArrowLeft className="mr-2 inline h-4 w-4" />Back home</button><div className={`rounded-[38px] bg-gradient-to-br ${item.color} p-8 text-white sm:p-12`}><Icon /><div className="mt-8 text-xs font-black uppercase tracking-widest text-white/55">Sadam Family Collection</div><h1 className="mt-2 text-6xl font-black">{item.title}</h1><p className="mt-3 text-white/70">{item.subtitle}</p></div><SearchBar value={query} setValue={setQuery} count={items.length} /><MediaGrid items={items} /></motion.section>; }
function PageHero({ title, subtitle }) { return <div className="rounded-[36px] bg-[#0A1F44] p-9 text-white"><div className="text-xs font-black uppercase tracking-widest text-orange-300">Sadam Family</div><h1 className="mt-2 text-5xl font-black">{title}</h1><p className="mt-3 text-white/55">{subtitle}</p></div>; }
function SearchBar({ value, setValue, count }) { return <div className="my-7 flex flex-col gap-3 rounded-[26px] bg-white p-4 sm:flex-row sm:items-center sm:justify-between"><b>{count} memories</b><label className="flex items-center gap-2 rounded-full bg-[#f4efe7] px-4"><Search className="h-4 w-4" /><input value={value} onChange={event => setValue(event.target.value)} placeholder="Search memories" className="h-10 bg-transparent outline-none" /></label></div>; }
function MediaGrid({ items }) { return items.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map(item => <motion.article key={item.id} whileHover={{ y: -8, scale: 1.015 }} className={`relative aspect-[4/3] overflow-hidden rounded-[30px] bg-gradient-to-br ${item.tone}`}><div className="absolute inset-0 bg-gradient-to-t from-[#071730]/85 to-transparent" /><div className="absolute left-5 top-5 rounded-2xl bg-white/85 p-3">{item.type === "video" ? <Play className="h-4 w-4 fill-[#FF7A00] text-[#FF7A00]" /> : <Image className="h-4 w-4" />}</div><div className="absolute bottom-0 p-6 text-white"><div className="text-xs text-orange-200">{item.event}</div><div className="text-2xl font-black">{item.title}</div></div></motion.article>)}</div> : <div className="rounded-[28px] bg-white p-12 text-center"><Images className="mx-auto text-[#FF7A00]" /><h3 className="mt-4 text-2xl font-black">No memories here yet</h3></div>; }

function GuestPage({ data, setData }) {
  if (data.sent) return <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid min-h-[80vh] place-items-center px-5 text-center"><div><CheckCircle2 className="mx-auto h-20 w-20 text-[#FF7A00]" /><h1 className="mt-5 text-5xl font-black">Thank you, {data.name}!</h1><p className="mt-4 text-[#0A1F44]/55">Your memories from “{data.event}” entered the review experience. Guests do not receive family-gallery access.</p><button onClick={() => setData({ ...data, sent: false, files: [] })} className="mt-6 rounded-full bg-[#0A1F44] px-6 py-3 font-bold text-white">Upload more</button></div></motion.section>;
  return <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto min-h-[85vh] max-w-5xl px-5 py-10"><PageHero title="Guest Memory Drop" subtitle="Share selected event photos without entering the private family gallery." /><form onSubmit={event => { event.preventDefault(); if (data.name && data.event && data.files.length) setData({ ...data, sent: true }); }} className="mt-7 rounded-[34px] bg-white p-7"><div className="grid gap-4 sm:grid-cols-2"><input required value={data.name} onChange={event => setData({ ...data, name: event.target.value })} placeholder="Your name" className="h-12 rounded-2xl bg-[#f4efe7] px-4" /><input required value={data.event} onChange={event => setData({ ...data, event: event.target.value })} placeholder="Event" className="h-12 rounded-2xl bg-[#f4efe7] px-4" /></div><label className="mt-5 grid min-h-56 cursor-pointer place-items-center rounded-[28px] border-2 border-dashed border-[#0A1F44]/15 text-center"><input type="file" multiple accept="image/*,video/*" className="hidden" onChange={event => setData({ ...data, files: Array.from(event.target.files) })} /><UploadCloud className="h-12 w-12 text-[#FF7A00]" /><div><b>Choose photos and videos</b><p className="mt-2 text-sm text-black/40">Only selected files are included.</p></div></label>{data.files.length > 0 && <div className="mt-4 rounded-2xl bg-[#f4efe7] p-4 text-sm font-bold">{data.files.length} file(s) selected</div>}<button disabled={!data.name || !data.event || !data.files.length} className="mt-5 h-12 w-full rounded-2xl bg-[#FF7A00] font-black text-white disabled:opacity-30">Send memories to the family</button></form></motion.section>;
}
function StandaloneGuest({ onBack }) { const [data, setData] = useState({ name: "", event: "", files: [], sent: false }); return <div><button onClick={onBack} className="fixed left-4 top-4 z-50 rounded-full bg-white px-4 py-2 text-sm font-bold shadow">Back</button><GuestPage data={data} setData={setData} /></div>; }

const GAME_STAGES = [
  { name: "Signal Memory", subtitle: "Match the six symbols", time: 45, pairs: ["heart", "star", "camera"] },
  { name: "Sequence Vault", subtitle: "Match eight symbols under pressure", time: 55, pairs: ["heart", "star", "camera", "video"] },
  { name: "Master Archive", subtitle: "Clear twelve symbols with limited mistakes", time: 70, pairs: ["heart", "star", "camera", "video", "album", "spark"] },
];

function AdvancedGame({ onClose }) {
  const icons = { heart: Heart, star: Star, camera: Camera, video: Video, album: Album, spark: Sparkles };
  const [phase, setPhase] = useState("intro");
  const [stage, setStage] = useState(0);
  const [cards, setCards] = useState([]);
  const [open, setOpen] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(GAME_STAGES[0].time);
  const current = GAME_STAGES[stage];
  const startStage = index => {
    const config = GAME_STAGES[index];
    setStage(index);
    setCards([...config.pairs, ...config.pairs].map((value, id) => ({ id, value, key: `${value}-${id}` })).sort(() => Math.random() - .5));
    setOpen([]); setMatched([]); setStreak(0); setMistakes(0); setTime(config.time); setPhase("play");
  };
  useEffect(() => {
    if (phase !== "play") return undefined;
    const timer = setInterval(() => setTime(value => { if (value <= 1) { clearInterval(timer); setPhase("failed"); return 0; } return value - 1; }), 1000);
    return () => clearInterval(timer);
  }, [phase, stage]);
  useEffect(() => {
    if (phase === "play" && cards.length && matched.length === cards.length) {
      setScore(value => value + time * 10 + Math.max(0, 500 - mistakes * 50));
      setTimeout(() => setPhase(stage === GAME_STAGES.length - 1 ? "complete" : "stageClear"), 350);
    }
  }, [matched, cards, phase, stage, time, mistakes]);
  const choose = card => {
    if (phase !== "play" || open.includes(card.id) || matched.includes(card.id) || open.length === 2) return;
    const next = [...open, card.id]; setOpen(next);
    if (next.length === 2) {
      const first = cards.find(item => item.id === next[0]);
      const second = cards.find(item => item.id === next[1]);
      if (first.value === second.value) setTimeout(() => { setMatched(value => [...value, ...next]); setScore(value => value + 100 + streak * 30); setStreak(value => value + 1); setOpen([]); }, 300);
      else setTimeout(() => { setMistakes(value => value + 1); setStreak(0); setOpen([]); }, 650);
    }
  };
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#050d1e]/97 p-4 backdrop-blur-xl"><div className="relative w-full max-w-5xl overflow-hidden rounded-[38px] border border-white/10 bg-[#0c2145] text-white shadow-2xl"><div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 1px,transparent 1px)", backgroundSize: "25px 25px" }} /><button onClick={onClose} className="absolute right-5 top-5 z-30 grid h-10 w-10 place-items-center rounded-full bg-white/10"><X /></button>
    {phase === "intro" && <div className="relative z-10 grid min-h-[650px] place-items-center p-8 text-center"><div><div className="mx-auto grid h-24 w-24 place-items-center rounded-[30px] bg-[#FF7A00]"><Trophy className="h-11 w-11 text-[#071730]" /></div><div className="mt-7 text-xs font-black uppercase tracking-[.28em] text-orange-300">Sadam Challenge Arena</div><h2 className="mt-3 text-5xl font-black">The Memory Protocol</h2><p className="mx-auto mt-4 max-w-2xl text-white/55">Three escalating stages. Build streaks, control mistakes, beat the clock and unlock the Master Archive.</p><div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">{GAME_STAGES.map((item, index) => <div key={item.name} className="rounded-2xl border border-white/10 bg-white/[.06] p-4 text-left"><div className="text-[10px] font-black text-orange-300">STAGE {index + 1}</div><b>{item.name}</b><p className="mt-1 text-xs text-white/40">{item.subtitle}</p></div>)}</div><button onClick={() => startStage(0)} className="mt-8 rounded-full bg-[#FF7A00] px-8 py-3 font-black text-[#071730]">Begin protocol</button></div></div>}
    {phase === "play" && <div className="relative z-10 min-h-[650px] p-6 sm:p-9"><div className="flex flex-wrap items-center justify-between gap-4"><div><div className="text-[10px] font-black uppercase tracking-[.25em] text-orange-300">Stage {stage + 1} of {GAME_STAGES.length}</div><h2 className="mt-1 text-3xl font-black">{current.name}</h2><p className="text-sm text-white/45">{current.subtitle}</p></div><div className="flex flex-wrap gap-2"><GameStat label="TIME" value={`${time}s`} /><GameStat label="SCORE" value={score} /><GameStat label="STREAK" value={`x${streak}`} /><GameStat label="ERRORS" value={mistakes} /></div></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><motion.div animate={{ width: `${time / current.time * 100}%` }} className="h-full bg-[#FF7A00]" /></div><div className={`mx-auto mt-9 grid max-w-3xl gap-3 sm:gap-4 ${cards.length > 8 ? "grid-cols-4" : "grid-cols-3 sm:grid-cols-4"}`}>{cards.map(card => { const Icon = icons[card.value]; const show = open.includes(card.id) || matched.includes(card.id); return <motion.button key={card.key} onClick={() => choose(card)} whileHover={{ y: -4 }} whileTap={{ scale: .95 }} animate={matched.includes(card.id) ? { scale: [1, 1.08, 1], opacity: .45 } : { scale: 1 }} className={`aspect-square rounded-[22px] border ${show ? "border-orange-300 bg-white text-[#FF7A00]" : "border-white/10 bg-white/[.06] text-white/25"}`}>{show ? <Icon className="mx-auto h-8 w-8" /> : <Sparkles className="mx-auto h-7 w-7" />}</motion.button>; })}</div></div>}
    {phase === "stageClear" && <GameResult title="Stage cleared" text={`${current.name} complete. Your score is ${score}.`} button="Enter next stage" onClick={() => startStage(stage + 1)} />}
    {phase === "failed" && <GameResult title="Protocol interrupted" text={`Time expired during ${current.name}. Score: ${score}.`} button="Retry stage" onClick={() => startStage(stage)} />}
    {phase === "complete" && <GameResult title="Master Archive unlocked" text={`All three stages complete. Final score: ${score}.`} button="Replay protocol" onClick={() => { setScore(0); startStage(0); }} trophy />}
  </div></motion.div>;
}
function GameStat({ label, value }) { return <div className="min-w-[76px] rounded-xl border border-white/10 bg-white/[.06] px-3 py-2 text-center"><div className="text-[9px] font-black tracking-widest text-white/35">{label}</div><div className="text-lg font-black text-orange-300">{value}</div></div>; }
function GameResult({ title, text, button, onClick, trophy }) { return <div className="relative z-10 grid min-h-[650px] place-items-center p-8 text-center"><div>{trophy ? <Trophy className="mx-auto h-20 w-20 text-[#FF7A00]" /> : <CheckCircle2 className="mx-auto h-20 w-20 text-emerald-300" />}<h2 className="mt-6 text-5xl font-black">{title}</h2><p className="mt-4 text-white/50">{text}</p><button onClick={onClick} className="mt-7 rounded-full bg-[#FF7A00] px-8 py-3 font-black text-[#071730]">{button}</button></div></div>; }
