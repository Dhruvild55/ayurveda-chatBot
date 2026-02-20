"use client";

import { Leaf, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function ChatHeader() {

    const handleLogout = async () => {
        localStorage.removeItem("token");
        await signOut({ callbackUrl: "/login" });
    };

    return (
        <div className="sticky top-0 bg-cream p-4 flex items-center gap-2 border-b z-10 shadow-sm">

            <div className="bg-sage/20 p-2 rounded-full">
                <Leaf className="text-sage w-5 h-5" />
            </div>

            <div className="flex flex-col">
                <h1 className="font-serif text-lg font-semibold text-stone-800 leading-tight">
                    AyurBot
                </h1>
                <span className="text-xs text-stone-500">Online</span>
            </div>

            <div className="ml-auto">
                <button
                    onClick={handleLogout}
                    className="p-2 text-stone-500 hover:text-red-500 hover:bg-stone-100 rounded-full transition-colors"
                    title="Logout"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}
