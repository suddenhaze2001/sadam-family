import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Album, ArrowLeft, CalendarDays, Camera, CheckCircle2, ChevronRight,
  Gamepad2, Heart, Home, Image, Images, Link2, LoaderCircle, LogOut,
  Menu, PartyPopper, Play, Plus, Search, Sparkles, Star, Timer, Trophy,
  UploadCloud, Video, X, Zap
} from "lucide-react";
import { supabase } from "./lib/supabase";

const COLLECTION_STYLES = {
  albums: { icon: Album, color: "from-[#0A1F44] to-[#173d72]", size: "lg:col-span-2" },
  moments: { icon: Sparkles, color: "from-[#FF7A00] to-[#ff9c45]", size: "lg:col-span-2" },
  gallery: { icon: Images, color: "from-indigo-500 to-violet-400", size: "lg:col-span-2" },
  wedding: { icon: Heart, color: "from-rose-400 to-orange-300", size: "" },
  sundays: { icon: CalendarDays, color: "from-cyan-400 to-blue-500", size: "" },
  events: { icon: PartyPopper, color: "from-emerald-400 to-teal-500", size: "lg:col-span-4" },
};

function GalaxyBackdrop() {
  return <>
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
    <motion.div animate={{ x: [-40, 70, -40], y: [10, -45, 10], rotate: [0, 15, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-24 -top-20 h-96 w-96 rounded-[90px] bg-[#FF7A00]/20" />
    <motion.div animate={{ x: [35, -60, 35], y: [-15, 45, -15] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-indigo-400/15" />
  </>;
}

function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const messages = ["Finding our laughter", "Dusting off the memories", "Rewinding the little moments", "Opening the family door"];
  useEffect(() => {
    const timer = setInterval(() => setProgress(value => Math.min(100, value + (value < 70 ? 4 : 2))), 85);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => { if (progress === 100) { const timer = setTimeout(onDone, 500); return () => clearTimeout(timer); } }, [progress, onDone]);
  const message = messages[Math.min(messages.length - 1, Math.floor(progress / 25))];
  return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#071730] px-5 text-center text-white">
    <GalaxyBackdrop />
    <div className="relative z-10 w-full max-w-4xl">
      <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.06, 1] }} transition={{ duration: 3.4, repeat: Infinity }} className="mx-auto grid h-24 w-24 place-items-center rounded-[32px] border border-white/10 bg-white/[.06]"><Heart className="h-10 w-10 fill-[#FF7A00] text-[#FF7A00]" /></motion.div>
      <div className="mt-8 text-[10px] font-black uppercase tracking-[.34em] text-orange-300">Sadam Family</div>
      <h1 className="mt-3 text-[clamp(3.2rem,9vw,7.2rem)] font-black leading-[.82] tracking-[-.07em]">Building our<br /><span className="text-[#FF7A00]">memory galaxy.</span></h1>
      <div className="mx-auto mt-10 max-w-xl"><div className="flex items-center justify-between text-xs font-black uppercase tracking-[.18em] text-white/45"><span>{message}</span><span className="text-orange-300">{progress}%</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><motion.div animate={{ width: `${progress}%` }} className="h-full rounded-full bg-gradient-to-r from-[#FF7A00] via-orange-300 to-indigo-400" /></div></div>
    </div>
  </main>;
}

function AuthScreen({ onGuest }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError("");
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) setError(authError.message);
    setBusy(false);
  }
  return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#071730] px-5 py-10 text-white">
    <GalaxyBackdrop />
    <div className="relative z-10 w-full max-w-md rounded-[42px] border border-white/10 bg-white/[.065] p-8 shadow-2xl backdrop-blur-xl">
      <div className="grid h-16 w-16 place-items-center rounded-[21px] bg-[#FF7A00] text-[#071730]"><Heart className="fill-[#071730]" /></div>
      <div className="mt-8 text-[10px] font-black uppercase tracking-[.3em] text-orange-300">Sadam Family · Private Door</div>
      <h1 className="mt-3 text-5xl font-black leading-[.92] tracking-[-.06em]">Welcome back.<br /><span className="text-white/50">Your memories are waiting.</span></h1>
      <form onSubmit={submit} className="mt-8 grid gap-3">
        <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email address" className="h-14 rounded-[20px] border border-white/10 bg-black/25 px-4 outline-none focus:border-[#FF7A00]" />
        <input required value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="h-14 rounded-[20px] border border-white/10 bg-black/25 px-4 outline-none focus:border-[#FF7A00]" />
        {error && <p className="text-sm text-orange-200">{error}</p>}
        <button disabled={busy} className="mt-1 flex h-14 items-center justify-center gap-2 rounded-[20px] bg-[#FF7A00] font-black text-[#071730] disabled:opacity-60">{busy && <LoaderCircle className="h-4 w-4 animate-spin" />}{busy ? "Opening..." : "Open the family world"}</button>
      </form>
      <button onClick={onGuest} className="mt-4 flex w-full items-center justify-center gap-2 text-xs font-bold text-white/50"><UploadCloud className="h-4 w-4" />I have a guest upload link</button>
    </div>
  </main>;
}

function WelcomeScreen({ profile, onDone }) {
  useEffect(() => { const timer = setTimeout(onDone, 1100); return () => clearTimeout(timer); }, [onDone]);
  return <main className="grid min-h-screen place-items-center bg-[#071730] px-5 text-center text-white"><motion.div initial={{ scale: .55, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}><div className="mx-auto grid h-28 w-28 place-items-center rounded-[36px] bg-[#FF7A00] text-[#071730]"><Heart className="h-12 w-12 fill-[#071730]" /></div><h1 className="mt-7 text-5xl font-black">Welcome {profile.display_name}.</h1><p className="mt-4 text-white/45">Your memories are ready.</p></motion.div></main>;
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileBusy, setProfileBusy] = useState(true);
  const [welcome, setWelcome] = useState(false);
  const [guestMode, setGuestMode] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function loadProfile() {
      if (!session?.user) { setProfile(null); setProfileBusy(false); return; }
      setProfileBusy(true);
      const { data, error } = await supabase.from("family_profiles").select("id, display_name, role, avatar_path, is_active").eq("id", session.user.id).single();
      if (!error && data?.is_active) { setProfile(data); setWelcome(true); }
      else setProfile(null);
      setProfileBusy(false);
    }
    loadProfile();
  }, [session?.user?.id]);

  if (!booted) return <LoadingScreen onDone={() => setBooted(true)} />;
  if (guestMode) return <GuestPortal onBack={() => setGuestMode(false)} />;
  if (profileBusy) return <LoadingScreen onDone={() => {}} />;
  if (!session || !profile) return <AuthScreen onGuest={() => setGuestMode(true)} />;
  if (welcome) return <WelcomeScreen profile={profile} onDone={() => setWelcome(false)} />;
  return <FamilySite session={session} profile={profile} onLogout={() => supabase.auth.signOut()} />;
}

function FamilySite({ session, profile, onLogout }) {
  const [page, setPage] = useState("home");
  const [collections, setCollections] = useState([]);
  const [memories, setMemories] = useState([]);
  const [active, setActive] = useState(null);
  const [query, setQuery] = useState("");
  const [menu, setMenu] = useState(false);
  const [game, setGame] = useState(false);
  const [uploader, setUploader] = useState(false);
  const [error, setError] = useState("");

  async function loadData() {
    setError("");
    const [{ data: collectionRows, error: collectionError }, { data: memoryRows, error: memoryError }] = await Promise.all([
      supabase.from("collections").select("id, slug, name, description, display_order, cover_path").eq("is_active", true).order("display_order"),
      supabase.from("memories").select("id, collection_id, title, caption, event_name, memory_date, media_type, storage_bucket, storage_path, is_favorite, created_at").eq("is_approved", true).order("created_at", { ascending: false })
    ]);
    if (collectionError || memoryError) { setError(collectionError?.message || memoryError?.message); return; }
    const signed = await Promise.all((memoryRows || []).map(async row => {
      const { data } = await supabase.storage.from(row.storage_bucket || "family-media").createSignedUrl(row.storage_path, 3600);
      return { ...row, url: data?.signedUrl || "", collection: collectionRows?.find(c => c.id === row.collection_id)?.slug || "gallery", type: row.media_type, event: row.event_name || "Family memory", favorite: row.is_favorite };
    }));
    setCollections(collectionRows || []); setMemories(signed);
  }
  useEffect(() => { loadData(); }, []);

  const filtered = useMemo(() => memories.filter(item => {
    if (page === "photos" && item.type !== "photo") return false;
    if (page === "videos" && item.type !== "video") return false;
    if (page === "favorites" && !item.favorite) return false;
    if (page === "collection" && item.collection !== active?.slug) return false;
    return `${item.title} ${item.event}`.toLowerCase().includes(query.toLowerCase());
  }), [memories, page, active, query]);

  const go = next => { setPage(next); setActive(null); setQuery(""); setMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const open = item => { setActive(item); setPage("collection"); setQuery(""); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const links = [["home", Home, "Home"], ["photos", Image, "Photos"], ["videos", Video, "Videos"], ["favorites", Heart, "Favorites"]];

  return <main className="min-h-screen overflow-x-hidden bg-[#f4efe7] text-[#0A1F44]">
    <header className="sticky top-0 z-40 border-b border-[#0A1F44]/10 bg-[#f4efe7]/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1450px] items-center justify-between gap-3 px-5 py-3 sm:px-8 xl:px-10">
        <button onClick={() => go("home")} className="shrink-0 text-left"><div className="text-lg font-black tracking-[-.04em] sm:text-xl">SADAM <span className="text-[#FF7A00]">FAMILY</span></div><div className="text-[8px] font-black uppercase tracking-[.2em] text-black/35">Welcome, {profile.display_name}</div></button>
        <nav className="hidden items-center gap-1.5 lg:flex">{links.map(([id, Icon, label]) => <NavButton key={id} active={page === id} onClick={() => go(id)} icon={Icon} label={label} />)}<NavButton onClick={() => setGame(true)} icon={Gamepad2} label="Play" /><NavButton onClick={() => setUploader(true)} icon={Plus} label="Add Memory" /></nav>
        <div className="flex gap-2"><button onClick={() => setMenu(!menu)} className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm lg:hidden"><Menu className="h-4 w-4" /></button><button onClick={onLogout} className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm"><LogOut className="h-4 w-4" /></button></div>
      </div>
    </header>
    {error && <div className="mx-auto mt-4 max-w-7xl rounded-2xl bg-red-50 px-5 py-3 text-sm text-red-700">{error}</div>}
    <AnimatePresence mode="wait">
      {page === "home" && <HomePage collections={collections} memories={memories} onOpen={open} onPlay={() => setGame(true)} onUpload={() => setUploader(true)} />}
      {["photos", "videos", "favorites"].includes(page) && <MediaPage key={page} title={page[0].toUpperCase() + page.slice(1)} items={filtered} query={query} setQuery={setQuery} />}
      {page === "collection" && active && <CollectionPage item={active} items={filtered} query={query} setQuery={setQuery} onBack={() => go("home")} />}
    </AnimatePresence>
    <AnimatePresence>{uploader && <UploadMemory session={session} collections={collections} onClose={() => setUploader(false)} onUploaded={async () => { setUploader(false); await loadData(); }} />}{game && <ChallengeArena profile={profile} onClose={() => setGame(false)} />}</AnimatePresence>
  </main>;
}

function NavButton({ active, onClick, icon: Icon, label }) { return <button onClick={onClick} className={`rounded-full px-3 py-1.5 text-[11px] font-bold shadow-sm transition duration-300 hover:-translate-y-0.5 ${active ? "bg-[#0A1F44] text-white" : "bg-white"}`}><Icon className="mr-1.5 inline h-3.5 w-3.5" />{label}</button>; }

function HomePage({ collections, memories, onOpen, onPlay, onUpload }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <section className="relative overflow-hidden py-12"><div className="relative mx-auto grid max-w-[1450px] gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-14 xl:px-10"><div><div className="inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-4 py-2 text-[10px] font-black uppercase tracking-[.24em] text-white"><Sparkles className="h-4 w-4 text-[#FF7A00]" />A home that moves with us</div><motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="mt-8 max-w-[720px] text-[clamp(3.2rem,6.2vw,6.5rem)] font-extrabold leading-[.84] tracking-[-.052em]"><motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 5.8, repeat: Infinity }} className="inline-block">The moments that made us.</motion.span><br /><motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity }} className="inline-block text-[#FF7A00]">The memories that keep us close.</motion.span></motion.h1><p className="mt-9 max-w-xl text-lg leading-8 text-[#0A1F44]/60">Move through albums, celebrations, Sundays, wedding memories and the tiny moments that made the family.</p><div className="mt-7 flex flex-wrap gap-3"><button onClick={onUpload} className="rounded-full bg-[#0A1F44] px-6 py-3 font-black text-white">Add a real memory</button><button onClick={onPlay} className="rounded-full bg-white px-6 py-3 font-black shadow-sm">Enter Challenge Arena</button></div></div><div className="relative min-h-[420px]"><motion.div animate={{ y: [0, -14, 0], rotate: [-5, 2, -5] }} transition={{ duration: 5.2, repeat: Infinity }} className="absolute left-[5%] top-[8%] w-[57%] rounded-[32px] bg-[#0A1F44] p-7 text-white shadow-2xl"><Camera className="text-[#FF7A00]" /><div className="mt-24 text-xs text-white/40">FEATURED MEMORY</div><div className="mt-2 text-2xl font-black">{memories[0]?.title || "Your first private memory will appear here."}</div></motion.div><motion.div animate={{ y: [0, 15, 0], rotate: [5, -3, 5] }} transition={{ duration: 5.8, repeat: Infinity }} className="absolute bottom-[5%] right-[5%] w-[57%] rounded-[32px] bg-indigo-500 p-7 text-white shadow-2xl"><Video /><div className="mt-24 text-xs text-indigo-100">NOW PLAYING</div><div className="mt-2 text-2xl font-black">A family movie made of real life.</div></motion.div></div></div></section>
    <section className="mx-auto max-w-[1450px] px-5 pb-20 sm:px-8 xl:px-10"><div className="mb-8"><div className="text-[10px] font-black uppercase tracking-[.24em] text-[#FF7A00]">Choose a doorway</div><h2 className="mt-2 text-4xl font-black">Where should the story begin?</h2></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{collections.map((item, index) => <CollectionCard key={item.id} item={item} index={index} onClick={() => onOpen(item)} count={memories.filter(m => m.collection === item.slug).length} />)}</div></section>
  </motion.div>;
}

function CollectionCard({ item, index, onClick, count }) {
  const style = COLLECTION_STYLES[item.slug] || COLLECTION_STYLES.gallery;
  const Icon = style.icon;
  return <motion.button onClick={onClick} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -7, scale: 1.012, rotateX: 1.5, rotateY: -1.5 }} whileTap={{ scale: .985 }} transition={{ type: "spring", stiffness: 115, damping: 18, mass: .8 }} className={`relative min-h-[250px] overflow-hidden rounded-[32px] bg-gradient-to-br ${style.color} ${style.size} p-7 text-left text-white shadow-lg`}>
    <motion.div animate={{ x: [-35, 55, -35], y: [20, -28, 20], rotate: [0, 20, 0] }} transition={{ duration: 8 + index * .4, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-14 -top-14 h-52 w-52 rounded-[65px] bg-white/15" />
    <div className="relative z-10 flex min-h-[196px] flex-col justify-between"><div className="flex justify-between"><motion.div animate={{ y: [0, -6, 0], rotate: [0, 5, -4, 0] }} transition={{ duration: 4.5 + index * .2, repeat: Infinity }} className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20"><Icon /></motion.div><span className="rounded-full bg-black/10 px-3 py-1 text-xs font-black">{count}</span></div><div className="pt-8"><h3 className="text-3xl font-black">{item.name}</h3><p className="mt-2 text-sm text-white/80">{item.description}</p><span className="mt-5 inline-flex items-center text-xs font-black uppercase">Open collection <ChevronRight className="ml-1 h-4 w-4" /></span></div></div>
  </motion.button>;
}

function MediaPage({ title, items, query, setQuery }) { return <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="mx-auto min-h-[85vh] max-w-[1450px] px-5 py-10 sm:px-8 xl:px-10"><PageHero title={title} subtitle={`Your private ${title.toLowerCase()} collection.`} /><SearchBar value={query} setValue={setQuery} count={items.length} /><MediaGrid items={items} /></motion.section>; }
function CollectionPage({ item, items, query, setQuery, onBack }) { const style = COLLECTION_STYLES[item.slug] || COLLECTION_STYLES.gallery; const Icon = style.icon; return <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="mx-auto min-h-[85vh] max-w-[1450px] px-5 py-10 sm:px-8 xl:px-10"><button onClick={onBack} className="mb-6 rounded-full bg-white px-4 py-2 text-sm font-bold"><ArrowLeft className="mr-2 inline h-4 w-4" />Back home</button><div className={`rounded-[38px] bg-gradient-to-br ${style.color} p-8 text-white sm:p-12`}><Icon /><div className="mt-8 text-xs font-black uppercase tracking-widest text-white/55">Sadam Family Collection</div><h1 className="mt-2 text-6xl font-black">{item.name}</h1><p className="mt-3 text-white/70">{item.description}</p></div><SearchBar value={query} setValue={setQuery} count={items.length} /><MediaGrid items={items} /></motion.section>; }
function PageHero({ title, subtitle }) { return <div className="rounded-[36px] bg-[#0A1F44] p-9 text-white"><div className="text-xs font-black uppercase tracking-widest text-orange-300">Sadam Family</div><h1 className="mt-2 text-5xl font-black">{title}</h1><p className="mt-3 text-white/55">{subtitle}</p></div>; }
function SearchBar({ value, setValue, count }) { return <div className="my-7 flex flex-col gap-3 rounded-[26px] bg-white p-4 sm:flex-row sm:items-center sm:justify-between"><b>{count} memories</b><label className="flex items-center gap-2 rounded-full bg-[#f4efe7] px-4"><Search className="h-4 w-4" /><input value={value} onChange={event => setValue(event.target.value)} placeholder="Search memories" className="h-10 bg-transparent outline-none" /></label></div>; }
function MediaGrid({ items }) { return items.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map(item => <motion.article key={item.id} whileHover={{ y: -6, scale: 1.01 }} transition={{ type: "spring", stiffness: 120, damping: 18 }} className="relative aspect-[4/3] overflow-hidden rounded-[30px] bg-[#0A1F44]"><img src={item.url} alt={item.title} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#071730]/90 via-transparent to-transparent" /><div className="absolute left-5 top-5 rounded-2xl bg-white/85 p-3">{item.type === "video" ? <Play className="h-4 w-4 fill-[#FF7A00] text-[#FF7A00]" /> : <Image className="h-4 w-4" />}</div><div className="absolute bottom-0 p-6 text-white"><div className="text-xs text-orange-200">{item.event}</div><div className="text-2xl font-black">{item.title}</div></div></motion.article>)}</div> : <div className="rounded-[28px] bg-white p-12 text-center"><Images className="mx-auto text-[#FF7A00]" /><h3 className="mt-4 text-2xl font-black">No memories here yet</h3></div>; }

function UploadMemory({ session, collections, onClose, onUploaded }) {
  const [title, setTitle] = useState(""); const [eventName, setEventName] = useState(""); const [collectionId, setCollectionId] = useState(collections[0]?.id || ""); const [file, setFile] = useState(null); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  useEffect(() => { if (!collectionId && collections[0]) setCollectionId(collections[0].id); }, [collections, collectionId]);
  async function submit(event) {
    event.preventDefault(); if (!file || !collectionId) return;
    setBusy(true); setError("");
    const collection = collections.find(c => c.id === collectionId);
    const extension = file.name.split(".").pop()?.toLowerCase() || "bin";
    const safeName = `${crypto.randomUUID()}.${extension}`;
    const path = `${session.user.id}/${collection.slug}/${safeName}`;
    const { error: uploadError } = await supabase.storage.from("family-media").upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
    if (uploadError) { setError(uploadError.message); setBusy(false); return; }
    const mediaType = file.type.startsWith("video/") ? "video" : "photo";
    const { error: recordError } = await supabase.from("memories").insert({ collection_id: collectionId, uploaded_by: session.user.id, title, event_name: eventName, media_type: mediaType, storage_bucket: "family-media", storage_path: path, is_approved: true });
    if (recordError) { await supabase.storage.from("family-media").remove([path]); setError(recordError.message); setBusy(false); return; }
    await onUploaded();
  }
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#071730]/90 p-4"><form onSubmit={submit} className="relative w-full max-w-xl rounded-[34px] bg-white p-7 text-[#0A1F44]"><button type="button" onClick={onClose} className="absolute right-5 top-5"><X /></button><div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#FF7A00] text-white"><UploadCloud /></div><h2 className="mt-5 text-3xl font-black">Add a real memory</h2><div className="mt-6 grid gap-4"><input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Memory title" className="h-12 rounded-2xl bg-[#f4efe7] px-4" /><input value={eventName} onChange={e => setEventName(e.target.value)} placeholder="Event or occasion" className="h-12 rounded-2xl bg-[#f4efe7] px-4" /><select required value={collectionId} onChange={e => setCollectionId(e.target.value)} className="h-12 rounded-2xl bg-[#f4efe7] px-4">{collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select><label className="grid min-h-40 cursor-pointer place-items-center rounded-[24px] border-2 border-dashed border-[#0A1F44]/15 text-center"><input required type="file" accept="image/*,video/*" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} /><UploadCloud className="h-10 w-10 text-[#FF7A00]" /><div><b>{file ? file.name : "Choose a photo or video"}</b><p className="mt-1 text-sm text-black/40">The file will be stored privately.</p></div></label></div>{error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={busy || !file || !collectionId} className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#0A1F44] font-black text-white disabled:opacity-50">{busy && <LoaderCircle className="h-4 w-4 animate-spin" />}{busy ? "Uploading..." : "Save memory"}</button></form></motion.div>;
}

function GuestPortal({ onBack }) {
  return <main className="grid min-h-screen place-items-center bg-[#f4efe7] px-5 text-center text-[#0A1F44]"><div><UploadCloud className="mx-auto h-16 w-16 text-[#FF7A00]" /><h1 className="mt-5 text-5xl font-black">Guest uploads are being secured.</h1><p className="mx-auto mt-4 max-w-xl text-black/50">Guest uploads will activate after the event-token Edge Function is deployed. This prevents open anonymous access to private storage.</p><button onClick={onBack} className="mt-7 rounded-full bg-[#0A1F44] px-6 py-3 font-bold text-white">Return to family sign-in</button></div></main>;
}

function ChallengeArena({ profile, onClose }) {
  const [game, setGame] = useState("menu");
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#050d1e]/97 p-4 text-white"><div className="relative w-full max-w-5xl rounded-[38px] border border-white/10 bg-[#0c2145] p-7"><button onClick={onClose} className="absolute right-5 top-5"><X /></button>{game === "menu" ? <><div className="text-xs font-black uppercase tracking-[.25em] text-orange-300">Sadam Challenge Arena</div><h2 className="mt-2 text-5xl font-black">Choose your challenge.</h2><div className="mt-8 grid gap-4 md:grid-cols-3"><GameChoice title="Memory Protocol" text="Three escalating visual-memory stages." onClick={() => setGame("memory")} /><GameChoice title="Sequence Vault" text="Recall an expanding symbol sequence." onClick={() => setGame("sequence")} /><GameChoice title="Family Timeline" text="Arrange family moments in chronological order." onClick={() => setGame("timeline")} /></div></> : game === "memory" ? <MemoryProtocol profile={profile} onBack={() => setGame("menu")} /> : <ComingGame title={game === "sequence" ? "Sequence Vault" : "Family Timeline"} onBack={() => setGame("menu")} />}</div></motion.div>;
}
function GameChoice({ title, text, onClick }) { return <motion.button onClick={onClick} whileHover={{ y: -6, scale: 1.015 }} className="min-h-52 rounded-[28px] border border-white/10 bg-white/[.06] p-6 text-left"><Gamepad2 className="text-[#FF7A00]" /><h3 className="mt-10 text-2xl font-black">{title}</h3><p className="mt-2 text-sm text-white/45">{text}</p></motion.button>; }
function ComingGame({ title, onBack }) { return <div className="grid min-h-[520px] place-items-center text-center"><div><Trophy className="mx-auto h-16 w-16 text-[#FF7A00]" /><h3 className="mt-5 text-4xl font-black">{title}</h3><p className="mt-3 text-white/45">This challenge is connected to the new game menu and is ready for its next gameplay module.</p><button onClick={onBack} className="mt-6 rounded-full bg-[#FF7A00] px-6 py-3 font-black text-[#071730]">Back to games</button></div></div>; }

function MemoryProtocol({ profile, onBack }) {
  const pairs = ["heart", "star", "camera", "video"];
  const icons = { heart: Heart, star: Star, camera: Camera, video: Video };
  const [cards] = useState(() => [...pairs, ...pairs].map((value, id) => ({ value, id })).sort(() => Math.random() - .5));
  const [open, setOpen] = useState([]); const [matched, setMatched] = useState([]); const [score, setScore] = useState(0);
  function choose(card) { if (open.includes(card.id) || matched.includes(card.id) || open.length === 2) return; const next = [...open, card.id]; setOpen(next); if (next.length === 2) { const a = cards.find(c => c.id === next[0]); const b = cards.find(c => c.id === next[1]); setTimeout(async () => { if (a.value === b.value) { const nextMatched = [...matched, ...next]; setMatched(nextMatched); setScore(v => v + 100); if (nextMatched.length === cards.length) await supabase.from("game_scores").insert({ profile_id: profile.id, game_key: "memory-protocol", stage: 1, score: score + 100, completed: true }); } setOpen([]); }, 500); } }
  return <div><button onClick={onBack} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold"><ArrowLeft className="mr-2 inline h-4 w-4" />Games</button><h3 className="mt-6 text-4xl font-black">Memory Protocol</h3><p className="mt-2 text-white/45">Match every pair. Score: {score}</p><div className="mx-auto mt-8 grid max-w-2xl grid-cols-4 gap-4">{cards.map(card => { const Icon = icons[card.value]; const show = open.includes(card.id) || matched.includes(card.id); return <motion.button key={card.id} onClick={() => choose(card)} whileTap={{ scale: .95 }} className={`aspect-square rounded-2xl border ${show ? "border-orange-300 bg-white text-[#FF7A00]" : "border-white/10 bg-white/[.06] text-white/20"}`}>{show ? <Icon className="mx-auto" /> : <Sparkles className="mx-auto" />}</motion.button>; })}</div>{matched.length === cards.length && <div className="mt-6 rounded-2xl bg-emerald-400/15 p-4 text-center text-emerald-200"><CheckCircle2 className="mx-auto" />Challenge complete. Your score was saved.</div>}</div>;
}
