"use client";

import { MessageSquarePlus, MessageCircle, MoreVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { useChat } from "@/app/context/ChatContext";

interface ChatSession {
    id: string;
    sessionName: string;
    createdAt?: string;
}

export default function Sidebar() {
    const { data: session } = useSession();
    const { sessions: recentChats, loading } = useChat();

    // No local fetch effect needed anymore

    return (
        <div className="w-64 bg-stone-50 border-r border-stone-200 h-full flex flex-col hidden md:flex">
            <div className="p-4 border-b border-stone-200">
                <Link href="/chat" className="w-full flex items-center justify-center gap-2 bg-sage hover:bg-sage/90 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                    <MessageSquarePlus className="w-5 h-5" />
                    New Chat
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                <div className="px-3 py-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Recent
                </div>
                {loading ? (
                    <div className="px-3 py-2 text-sm text-stone-400">Loading...</div>
                ) : recentChats.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-stone-400 italic">No recent chats</div>
                ) : (
                    recentChats.map((chat) => (
                        <button
                            key={chat.id}
                            className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-stone-200/50 text-stone-700 transition-colors group"
                            onClick={() => window.location.href = `/chat/${chat.id}`} // Using window.location to force reload/navigation for now, or use Link/router
                        // keeping it simple with Link wrapper would be better, but button onClick:
                        >
                            <MessageCircle className="w-5 h-5 text-stone-400 group-hover:text-sage" />
                            <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-medium">{chat.sessionName || "New Conversation"}</p>
                                <p className="text-xs text-stone-500">
                                    {chat.createdAt ? new Date(chat.createdAt).toLocaleDateString() : ""}
                                </p>
                            </div>
                        </button>
                    ))
                )}
            </div>

            <div className="p-4 border-t border-stone-200">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center text-sage font-bold text-xs uppercase">
                        {session?.user?.name?.[0] || "U"}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-medium text-stone-700">{session?.user?.name || "User"}</p>
                        <p className="text-xs text-stone-500 truncate">{session?.user?.email || "user@example.com"}</p>
                    </div>
                    {/* Settings or profile menu trigger could go here */}
                </div>
            </div>
        </div>
    );
}
