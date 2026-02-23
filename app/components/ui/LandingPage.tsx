"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Leaf, Wind, Flame, Mountain, ArrowRight, MessageCircle, Sparkles, BookOpen, ShieldCheck, Zap, Heart, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Button from "@/app/components/ui/Button";

export default function LandingPage() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        } as any
    };

    return (
        <div className="min-h-screen bg-mesh font-sans selection:bg-sage/30 overflow-x-hidden">
            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 glass-header px-4 md:px-8 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        <div className="bg-forest p-2 rounded-2xl shadow-lg shadow-forest/20">
                            <Leaf className="text-white w-6 h-6" />
                        </div>
                        <span className="font-serif text-2xl font-bold text-gradient">AyurBot</span>
                    </motion.div>

                    <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-stone-600">
                        <a href="#features" className="hover:text-forest transition-colors relative group">
                            Features
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage transition-all group-hover:w-full" />
                        </a>
                        <a href="#how-it-works" className="hover:text-forest transition-colors relative group">
                            Methodology
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage transition-all group-hover:w-full" />
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
                        {isLoggedIn ? (
                            <Link href="/dashboard">
                                <Button variant="forest" className="text-sm px-6 rounded-full py-2.5">My Dashboard</Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="hidden sm:block text-sm font-bold text-stone-600 hover:text-forest transition-colors">Login</Link>
                                <Link href="/register">
                                    <Button variant="forest" className="text-sm px-6 rounded-full py-2.5 shadow-forest/20">Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 px-4 overflow-visible">
                <motion.div
                    style={{ opacity, scale }}
                    className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center"
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-7 z-10"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest text-celadon text-xs font-bold tracking-wider mb-8 shadow-xl shadow-forest/10">
                            <Sparkles className="w-4 h-4 text-sage" />
                            The New Era of Wellness
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-serif text-stone-900 leading-[0.9] mb-8 tracking-tight">
                            Your Nature, <br />
                            <span className="text-gradient italic">Perfected</span> by AI.
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-xl text-stone-500 leading-relaxed mb-10 max-w-xl font-light">
                            Experience a deeply personalized Ayurvedic journey. Veda uses sophisticated neural intelligence to map your biological constitution and guide you back to balance.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5">
                            <Link href={isLoggedIn ? "/chat" : "/register"}>
                                <Button className="h-16 px-10 text-lg rounded-3xl bg-forest hover:bg-stone-900 text-white shadow-2xl shadow-forest/30 group">
                                    {isLoggedIn ? "Resume Consultation" : "Start Your Free Analysis"}
                                    <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-16 flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-celadon flex items-center justify-center text-[10px] font-bold text-forest overflow-hidden">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 text-sage fill-sage" />)}
                                </div>
                                <p className="text-xs text-stone-400 font-medium">Trusted by <span className="text-forest font-bold">1,200+</span> seekers</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50, rotate: 5 }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative aspect-[4/5] md:aspect-square">
                            <div className="absolute inset-0 bg-gradient-to-tr from-forest/20 via-transparent to-sage/20 rounded-[4rem] -rotate-3 blur-3xl opacity-50" />
                            <div className="relative h-full w-full rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(44,74,62,0.3)] border-[12px] border-white group">
                                <img
                                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000"
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="Ayurveda Wellness"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent" />

                                <motion.div
                                    className="absolute bottom-8 left-8 right-8 glass-card rounded-3xl p-6 shadow-2xl"
                                >
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="bg-sage/20 p-2.5 rounded-2xl">
                                            <Flame className="text-orange-500 w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-serif font-bold text-stone-900">Pitta Dominant</p>
                                            <p className="text-[10px] tracking-wider text-stone-400 font-bold">Your Analysis</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-stone-600 leading-relaxed italic">
                                        "You're currently in a period of high intensity. Favor coconut water and cooling mint ritual to restore harmony."
                                    </p>
                                </motion.div>
                            </div>

                            {/* Floating decorative elements */}
                            <motion.div
                                className="absolute -top-10 -right-10 w-32 h-32 bg-celadon/50 backdrop-blur-xl rounded-full flex items-center justify-center shadow-inner border border-white/50"
                            >
                                <Wind className="text-forest/30 w-12 h-12" />
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-5 -right-5 w-24 h-24 bg-sage/20 backdrop-blur-3xl rounded-[2rem] border border-white/30 p-4"
                            >
                                <div className="h-full w-full border-2 border-white/50 border-dashed rounded-xl flex items-center justify-center">
                                    <Heart className="text-white w-8 h-8 fill-sage/20" />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Ambient background particles */}
                <div className="absolute top-1/4 left-10 w-2 h-2 bg-sage rounded-full opacity-20 blur-sm" />
                <div className="absolute top-1/2 right-20 w-3 h-3 bg-forest rounded-full opacity-10 blur-sm" />
            </section>

            {/* Transition Divider */}
            <div className="h-40 bg-gradient-to-b from-transparent to-white/80" />

            {/* Features Grid */}
            <section id="features" className="py-32 bg-white/80 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-24">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-sage font-bold tracking-wider text-xs block mb-4"
                        >
                            Excellence in Intelligence
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl font-serif text-stone-900 mb-6"
                        >
                            The Science of <br /> Holistic Connection
                        </motion.h2>
                        <p className="text-stone-400 max-w-2xl mx-auto text-lg font-light">
                            Beyond simple data, Veda understands the rhythmic cycles of nature and how they intersect with your unique genetics.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: MessageCircle,
                                title: "Adaptive Stream AI",
                                desc: "Engage in fluid, real-time wisdom transfers. Our UI is optimized for thought-speed interaction.",
                                color: "bg-blue-50 text-blue-500"
                            },
                            {
                                icon: ShieldCheck,
                                title: "Biological Mapping",
                                desc: "Proprietary algorithms that decode your Prakriti (nature) based on thousands of data points.",
                                color: "bg-forest/10 text-forest"
                            },
                            {
                                icon: Zap,
                                title: "Real-time Rituals",
                                desc: "Dynamic lifestyle adjustments that shift based on your local weather, time, and current stress levels.",
                                color: "bg-orange-50 text-orange-500"
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card p-10 rounded-[3rem] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
                            >
                                <div className={`${feature.color} w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">{feature.title}</h3>
                                <p className="text-stone-500 text-sm leading-relaxed font-light">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Visual background element */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-celadon/50 to-transparent pointer-events-none" />
            </section>

            {/* Methodology / Steps */}
            <section id="how-it-works" className="py-32 px-4 relative">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
                    <div className="relative">
                        <div className="absolute -left-12 top-0 text-9xl font-serif font-black text-forest/5 opacity-50 pointer-events-none">
                            VEDA
                        </div>
                        <h2 className="text-5xl md:text-7xl font-serif text-stone-900 leading-tight mb-12">
                            A Masterpiece <br /> of <span className="italic text-sage">Balance.</span>
                        </h2>

                        <div className="space-y-12">
                            {[
                                { step: "I.", title: "Neural Onboarding", desc: "A sophisticated exploration of your baseline, tracking diet, sleep, and metabolic fire." },
                                { step: "II.", title: "Dosha Extraction", desc: "Identify your dominant biological element: Vata (Air), Pitta (Fire), or Kapha (Earth)." },
                                { step: "III.", title: "Sustained Harmony", desc: "Evolve your wellness rituals as Veda learns your patterns through daily interaction." }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="flex gap-8 group"
                                >
                                    <span className="text-2xl font-serif font-bold text-sage group-hover:text-forest transition-colors">{item.step}</span>
                                    <div>
                                        <h4 className="text-xl font-bold text-stone-800 mb-3">{item.title}</h4>
                                        <p className="text-stone-500 text-base leading-relaxed font-light max-w-md">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card rounded-[4rem] p-12 overflow-hidden relative shadow-inner">
                        <div className="absolute inset-0 bg-forest/5 pointer-events-none" />
                        <div className="relative z-10 space-y-8">
                            <div className="p-8 bg-white/40 rounded-[2.5rem] border border-white/60 shadow-lg">
                                <div className="flex gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-forest flex items-center justify-center">
                                        <Leaf className="text-celadon w-6 h-6" />
                                    </div>
                                    <div className="h-3 w-32 bg-forest/20 rounded-full mt-4" />
                                </div>
                                <div className="space-y-3">
                                    <div className="h-2.5 w-full bg-stone-200/50 rounded-full" />
                                    <div className="h-2.5 w-5/6 bg-stone-200/50 rounded-full" />
                                    <div className="h-2.5 w-4/6 bg-stone-200/50 rounded-full" />
                                </div>
                            </div>
                            <div className="p-8 bg-forest text-celadon rounded-[2.5rem] shadow-2xl relative translate-x-12">
                                <p className="text-sm font-light leading-relaxed">
                                    "Your Agni is currently low. Add cumin and coriander seeds to your warm water to stimulate digestion."
                                </p>
                                <div className="absolute top-4 right-4 text-celadon/20 font-serif italic">Wise Guidance</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-40 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="max-w-6xl mx-auto rounded-[5rem] overflow-hidden relative group"
                >
                    <div className="absolute inset-0 bg-forest transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/leaf.png')" }} />

                    <div className="relative z-10 p-16 md:p-32 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-8xl font-serif text-white mb-10 leading-[0.9]"
                        >
                            The Journey to <br /> <span className="text-sage italic">Whole Health</span> Begins.
                        </motion.h2>

                        <p className="text-celadon/60 text-xl font-light mb-16 max-w-2xl mx-auto">
                            Stop guessing. Start knowing. Join the thousands who have found their true state through Vedic Artificial Intelligence.
                        </p>

                        <Link href="/register">
                            <Button className="h-20 px-16 text-xl rounded-full bg-white text-forest hover:bg-celadon border-none shadow-2xl transition-all hover:scale-105 active:scale-95 font-bold">
                                Open Your Account
                            </Button>
                        </Link>
                    </div>

                    {/* Abstract radial lights in CTA */}
                    <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-sage/20 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] bg-white/10 rounded-full blur-[120px] pointer-events-none" />
                </motion.div>
            </section>

            {/* Minimal Footer */}
            <footer className="pb-20 pt-10 px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 border-t border-stone-200/50 pt-20">
                    <div className="flex items-center gap-4">
                        <div className="bg-forest/10 p-2.5 rounded-2xl">
                            <Leaf className="text-forest w-5 h-5" />
                        </div>
                        <span className="font-serif text-2xl font-bold text-stone-900">AyurBot</span>
                    </div>

                    <div className="flex gap-12 text-sm font-bold text-stone-400">
                        <a href="#" className="hover:text-forest transition-colors">Privacy</a>
                        <a href="#" className="hover:text-forest transition-colors">Aesthetics</a>
                        <a href="#" className="hover:text-forest transition-colors">Legal</a>
                        <a href="#" className="hover:text-forest transition-colors">Social</a>
                    </div>

                    <p className="text-[10px] tracking-wider font-black text-stone-300">
                        Designed for the 22nd Century Seeker
                    </p>
                </div>
            </footer>
        </div>
    );
}
