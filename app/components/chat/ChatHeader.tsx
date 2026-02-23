import { Leaf, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function ChatHeader() {
    const handleLogout = async () => {
        localStorage.removeItem("token");
        await signOut({ callbackUrl: "/login" });
    };

    return (
        <div className="glass-header px-6 py-4 flex items-center gap-4 z-20 border-b border-white/20">
            <div className="bg-gradient-to-br from-forest to-moss p-2.5 rounded-2xl shadow-lg shadow-forest/20">
                <Leaf className="text-white w-5 h-5" />
            </div>

            <div className="flex flex-col">
                <h1 className="text-xl font-bold text-stone-900 tracking-tight leading-none mb-1">
                    VEDA
                </h1>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black text-stone-400 tracking-wider">Ancient Wisdom Offline</span>
                </div>
            </div>

            <div className="ml-auto flex items-center gap-3">
                <Link
                    href="/profile"
                    className="p-2.5 text-stone-500 hover:text-forest hover:bg-white/60 rounded-xl transition-all duration-300 hover:shadow-md border border-transparent hover:border-white/40"
                    title="Your Path"
                >
                    <User className="w-5 h-5" />
                </Link>

                <button
                    onClick={handleLogout}
                    className="p-2.5 text-stone-400 hover:text-red-500 hover:bg-red-50/50 rounded-xl transition-all duration-300"
                    title="End Journey"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
