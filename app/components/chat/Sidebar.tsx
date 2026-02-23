"use client";

import { MessageSquarePlus, MessageCircle, MoreVertical, Trash2, LayoutDashboard, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { useChat } from "@/app/context/ChatContext";

interface ChatSession {
    id: string;
    sessionName: string;
    createdAt?: string;
}

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session } = useSession();
    const { sessions: recentChats, loading, user, deleteSession, isMobileMenuOpen, setMobileMenuOpen } = useChat();

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this chat?")) {
            try {
                await deleteSession(id);
                // If we are currently on the deleted chat page, redirect to /chat
                if (pathname === `/chat/${id}`) {
                    router.push("/chat");
                }
            } catch (error) {
                alert("Failed to delete chat session");
            }
        }
    };

    // No local fetch effect needed anymore

    return (
        <>
            {/* Mobile Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <div className={`
                fixed inset-y-0 left-0 w-72 bg-white/95 backdrop-blur-2xl border-r border-white/20 h-full flex flex-col z-50 transition-transform duration-300 md:relative md:translate-x-0 md:z-10 md:bg-white/40
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="md:hidden absolute top-4 right-4">
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-100 transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <Link
                        href="/dashboard"
                        className="group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-xs border border-stone-200 bg-white/50 hover:bg-white hover:border-forest/30 hover:shadow-lg hover:shadow-forest/5 text-stone-600 hover:text-forest"
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/chat"
                        className="w-full flex items-center justify-center gap-2 bg-forest hover:bg-forest/90 text-white px-4 py-4 rounded-2xl transition-all duration-300 font-bold text-xs shadow-xl shadow-forest/20 hover:shadow-forest/30"
                    >
                        <MessageSquarePlus className="w-4 h-4" />
                        New Revelation
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 custom-scrollbar">
                    <div className="px-4 py-2 text-[10px] font-bold text-stone-400 tracking-wider flex items-center gap-2">
                        <span className="w-1 h-3 bg-forest/30 rounded-full" />
                        Recent Journeys
                    </div>
                    {loading ? (
                        <div className="px-4 py-2 text-sm text-stone-400 animate-pulse">Scanning archives...</div>
                    ) : recentChats.length === 0 ? (
                        <div className="px-4 py-8 text-center">
                            <p className="text-xs text-stone-400 italic">No previous whispers</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {recentChats.map((chat) => (
                                <div
                                    key={chat.id}
                                    className="relative group"
                                >
                                    <button
                                        className={`w-full text-left flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-300 border ${pathname === `/chat/${chat.id}`
                                            ? "bg-white border-forest/20 shadow-lg shadow-forest/5 text-forest"
                                            : "bg-transparent border-transparent text-stone-600 hover:bg-white/50 hover:border-stone-100"
                                            }`}
                                        onClick={() => router.push(`/chat/${chat.id}`)}
                                    >
                                        <MessageCircle className={`w-4 h-4 transition-colors ${pathname === `/chat/${chat.id}` ? "text-forest" : "text-stone-400 group-hover:text-forest"}`} />
                                        <div className="flex-1 overflow-hidden pr-6">
                                            <p className="truncate text-sm font-bold tracking-tight">{chat.sessionName || "New Conversation"}</p>
                                            <p className="text-[10px] text-stone-400 mt-0.5 font-medium tracking-wider">
                                                {chat.createdAt ? new Date(chat.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ""}
                                            </p>
                                        </div>
                                    </button>
                                    <button
                                        onClick={(e) => handleDelete(e, chat.id)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                                        title="Exile memory"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-white/20 bg-white/30 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-forest to-moss flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-forest/20">
                                {user?.name?.[0] || "U"}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-sm font-bold text-stone-800 tracking-tight">{user?.name || "Seeker"}</p>
                            <p className="text-[11px] text-stone-500 truncate font-medium">{user?.email || "seeker@veda.io"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
