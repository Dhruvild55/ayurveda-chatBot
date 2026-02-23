"use client";

import { useSession } from "next-auth/react";
import { useChat } from "@/app/context/ChatContext";
import {
    Leaf,
    MessageCircle,
    Clock,
    ChevronRight,
    Sparkles,
    Activity,
    Wind,
    Flame,
    Mountain,
    Plus,
    UserCircle,
    Smartphone,
    TrendingUp,
    Calendar,
    ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/api";
const dailyTips = [
    "Sip warm water throughout the day to support Agni (digestive fire).",
    "Practice 10 minutes of Pranayama before starting your workday.",
    "Favor warm, cooked foods today to ground your energy.",
    "Add a pinch of ginger to your tea to boost circulation.",
    "Try to be in bed by 10 PM to align with the Pitta cycle of detoxification."
];

export default function DashboardPage() {
    const { data: session } = useSession();
    const { sessions, loading: sessionsLoading, user } = useChat();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [randomTip, setRandomTip] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await auth.getProfile();
                setProfile(data);
            } catch (err) {
                console.error("Failed to fetch profile", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
        setRandomTip(dailyTips[Math.floor(Math.random() * dailyTips.length)]);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.05
            }
        }
    } as any;

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    } as any;

    const getDoshaIcon = (name?: string) => {
        switch (name?.toLowerCase()) {
            case "vata": return <Wind className="w-8 h-8 text-blue-500" />;
            case "pitta": return <Flame className="w-8 h-8 text-orange-500" />;
            case "kapha": return <Mountain className="w-8 h-8 text-emerald-500" />;
            default: return <Leaf className="w-8 h-8 text-sage" />;
        }
    };

    const getDoshaColorClass = (name?: string) => {
        switch (name?.toLowerCase()) {
            case "vata": return "from-blue-500/10 to-blue-500/5 text-blue-600 border-blue-200/50";
            case "pitta": return "from-orange-500/10 to-orange-500/5 text-orange-600 border-orange-200/50";
            case "kapha": return "from-emerald-500/10 to-emerald-500/5 text-emerald-600 border-emerald-200/50";
            default: return "from-sage/10 to-sage/5 text-sage border-sage/20";
        }
    };

    return (
        <div className="flex-1 overflow-y-auto bg-mesh p-4 md:p-10 space-y-10">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto space-y-12"
            >
                {/* Top Bar */}
                <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-1.5 w-8 bg-forest rounded-full" />
                            <span className="text-[10px] font-black tracking-wider text-stone-400">Personal Sanctum</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-none">
                            Namaste, <span className="text-gradient italic">{(user?.name || profile?.name || session?.user?.name)?.split(' ')[0] || "Seeker"}</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex flex-col items-end mr-2">
                            <span className="text-[10px] font-bold text-stone-400 tracking-wider">Health Index</span>
                            <span className="text-sm font-black text-forest">Progressing +12%</span>
                        </div>
                        <Link href="/chat">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-3 bg-forest hover:bg-stone-900 text-celadon px-8 py-4 rounded-2xl shadow-2xl shadow-forest/20 transition-all font-bold group overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                                <Plus className="w-5 h-5 relative z-10" />
                                <span className="relative z-10">New Consultation</span>
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Hero Card - Dosha */}
                    <motion.div
                        variants={itemVariants}
                        className={`lg:col-span-8 glass-card rounded-[3rem] p-8 md:p-12 relative overflow-hidden group border-2 ${getDoshaColorClass(profile?.dosha?.name || profile?.dosha)}`}
                    >
                        <div className="relative z-10 h-full flex flex-col">
                            <div className="flex justify-between items-start mb-10">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-white text-[10px] font-black tracking-wider shadow-sm">
                                        Active Constitution
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <div
                                            className="p-5 bg-white rounded-3xl shadow-xl shadow-stone-200/50"
                                        >
                                            {getDoshaIcon(profile?.dosha?.name || profile?.dosha)}
                                        </div>
                                        <div>
                                            <h2 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 leading-none mb-2">
                                                {profile?.dosha?.name || profile?.dosha || "Analyzing"}
                                            </h2>
                                            <div className="flex items-center gap-2 text-stone-400">
                                                <Activity className="w-4 h-4" />
                                                <span className="text-xs font-bold tracking-wider">Biological Frequency</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="h-14 w-14 bg-white rounded-full flex items-center justify-center shadow-lg border border-white cursor-pointer hover:bg-stone-50 transition-colors"
                                >
                                    <ArrowUpRight className="w-6 h-6 text-stone-400" />
                                </div>
                            </div>

                            <p className="text-lg text-stone-600 max-w-xl leading-relaxed font-light mt-auto">
                                {profile?.dosha?.description || "Veda is still observing your daily rhythms. Engage in more sessions to unlock deep genetic insights."}
                            </p>

                            <div className="mt-10 flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                                {["Balanced Sleep", "Light Digestion", "Grounding Rituals"].map(tag => (
                                    <span key={tag} className="flex-shrink-0 px-5 py-2 rounded-2xl bg-white/40 border border-white text-xs font-bold text-stone-600">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Background Decor */}
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-forest/10 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
                    </motion.div>

                    {/* Side Card - Tip */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-4 bg-forest text-celadon rounded-[3rem] p-10 relative overflow-hidden flex flex-col"
                    >
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-[1.5rem] w-fit mb-8 border border-white/10">
                                <Sparkles className="w-6 h-6 text-sage" />
                            </div>
                            <h3 className="text-[10px] font-black tracking-wider mb-4 text-sage">Daily Transmission</h3>
                            <p className="text-2xl font-serif leading-tight mb-8 italic">
                                "{randomTip}"
                            </p>

                            <div className="mt-auto pt-8 border-t border-white/10 space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold tracking-wider opacity-60">Impact Level</span>
                                    <span className="text-xs font-bold text-sage">High Proficiency</span>
                                </div>
                                <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold tracking-wider hover:bg-white/10 transition-colors">
                                    Unlock Detailed Guide
                                </button>
                            </div>
                        </div>
                        {/* Mesh gradient in card */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sage/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    </motion.div>

                    {/* Bottom Grid */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Stats Widgets */}
                        <div className="grid grid-cols-2 gap-6">
                            <motion.div variants={itemVariants} className="glass-card p-8 rounded-[2.5rem]">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-celadon rounded-2xl">
                                        <TrendingUp className="w-5 h-5 text-forest" />
                                    </div>
                                    <span className="text-[10px] font-black tracking-wider text-stone-400">Vitality</span>
                                </div>
                                <p className="text-3xl font-serif font-bold text-stone-900 mb-1">94%</p>
                                <p className="text-xs text-sage font-bold">+2.4% this week</p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="glass-card p-8 rounded-[2.5rem]">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-stone-100 rounded-2xl">
                                        <Calendar className="w-5 h-5 text-stone-400" />
                                    </div>
                                    <span className="text-[10px] font-black tracking-wider text-stone-400">Sadhana</span>
                                </div>
                                <p className="text-3xl font-serif font-bold text-stone-900 mb-1">12</p>
                                <p className="text-xs text-stone-400 font-bold italic">Consecutive days</p>
                            </motion.div>
                        </div>

                        {/* Profile Completion */}
                        <motion.div variants={itemVariants} className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden group">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h4 className="text-xl font-serif font-bold text-stone-900">Health Profile</h4>
                                    <p className="text-xs text-stone-400 font-bold tracking-wider mt-1">Status: Refining</p>
                                </div>
                                <span className="text-3xl font-serif font-black text-forest group-hover:scale-110 transition-transform">85%</span>
                            </div>

                            <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200/50 relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "85%" }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-forest to-moss"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-10">
                                <div className="p-4 bg-white/50 rounded-2xl border border-white/80">
                                    <p className="text-[9px] font-black tracking-wider text-stone-400 mb-1">Diet</p>
                                    <p className="text-sm font-serif font-bold text-stone-800">{profile?.diet || "Setup Required"}</p>
                                </div>
                                <div className="p-4 bg-white/50 rounded-2xl border border-white/80">
                                    <p className="text-[9px] font-black tracking-wider text-stone-400 mb-1">Age</p>
                                    <p className="text-sm font-serif font-bold text-stone-800">{profile?.age ? `${profile.age} Yrs` : "Setup Required"}</p>
                                </div>
                            </div>

                            <button
                                className="w-full mt-6 py-4 rounded-2xl bg-stone-900 text-white text-xs font-bold tracking-wider hover:bg-forest transition-colors shadow-xl shadow-stone-900/10"
                                onClick={() => (window as any).dispatchEvent(new CustomEvent('open-profile-modal'))}
                            >
                                Update Core Metrics
                            </button>
                        </motion.div>
                    </div>

                    {/* Activity Feed */}
                    <motion.div variants={itemVariants} className="lg:col-span-7 glass-card rounded-[3.5rem] p-10 flex flex-col">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-stone-900 rounded-2xl shadow-xl shadow-stone-900/10">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-stone-900">Recent Transmissions</h3>
                                    <p className="text-xs text-stone-400 font-bold tracking-wider">Your last 3 healing sessions</p>
                                </div>
                            </div>
                            <Link href="/chat" className="text-xs font-black tracking-wider text-forest hover:underline">Full History</Link>
                        </div>

                        <div className="space-y-4 flex-1">
                            {sessionsLoading ? (
                                [1, 2, 3].map(i => <div key={i} className="h-24 bg-stone-50 rounded-[2rem] animate-pulse" />)
                            ) : sessions.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 bg-stone-50/50 rounded-[2rem] border border-dashed border-stone-200">
                                    <Smartphone className="w-12 h-12 text-stone-200 mb-4" />
                                    <p className="text-stone-400 text-sm font-medium italic">No transmissions recorded yet.</p>
                                </div>
                            ) : (
                                sessions.slice(0, 3).map((session, idx) => (
                                    <Link key={session.id} href={`/chat/${session.id}`}>
                                        <div
                                            className="flex items-center gap-6 p-5 bg-white/40 rounded-[2rem] transition-all border border-transparent hover:border-forest/10 group cursor-pointer shadow-sm hover:bg-white/80"
                                        >
                                            <div className="w-16 h-16 bg-white rounded-2xl shadow-lg shadow-stone-100 flex items-center justify-center text-stone-300 group-hover:text-forest group-hover:scale-105 transition-all">
                                                <MessageCircle className="w-8 h-8" />
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="text-lg font-serif font-bold text-stone-800 truncate mb-1">{session.sessionName || "Wisdom Portal"}</p>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-black tracking-wider text-stone-400">{session.createdAt ? new Date(session.createdAt).toLocaleDateString() : "Present"}</span>
                                                    <span className="w-1 h-1 bg-stone-200 rounded-full" />
                                                    <span className="text-[10px] font-bold text-sage">Encrypted Connection</span>
                                                </div>
                                            </div>
                                            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all">
                                                <ChevronRight className="w-5 h-5 text-forest" />
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
