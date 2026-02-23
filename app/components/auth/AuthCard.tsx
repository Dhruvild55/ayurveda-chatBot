"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function AuthCard({
    title,
    children
}: {
    title: string;
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-mesh">
            {/* Decorative background elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute -top-24 -left-24 w-96 h-96 bg-forest/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 50, 0]
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute -bottom-24 -right-24 w-96 h-96 bg-sage/10 rounded-full blur-3xl"
            />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card p-10 md:p-12 rounded-[3.5rem] w-full max-w-lg relative z-10"
            >
                <div className="flex flex-col items-center mb-10">
                    <div className="bg-forest p-3 rounded-2xl shadow-xl shadow-forest/20 mb-6 transition-transform hover:rotate-12">
                        <Leaf className="text-white w-8 h-8" />
                    </div>
                    <h1 className="font-serif text-4xl font-bold text-stone-900 tracking-tight text-center">
                        {title}
                    </h1>
                </div>

                {children}
            </motion.div>
        </div>
    );
}

