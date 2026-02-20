"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { ChatProvider } from "@/app/context/ChatContext";

export default function ChatLayout({ children }: { children: ReactNode }) {
    return (
        <ChatProvider>
            <div className="flex h-screen w-full bg-stone-100 overflow-hidden">
                {/* Sidebar - hidden on mobile by default for now, visible on md and up */}
                <div className="hidden md:block h-full">
                    <Sidebar />
                </div>

                <div className="flex-1 h-full bg-white shadow-xl flex flex-col relative overflow-hidden">
                    {children}
                </div>
            </div>
        </ChatProvider>
    );
}

// Minimal context or just empty hook if components still consume it
// For now, we can remove the context if no longer needed,
// OR keep a dummy one to avoid breaking `ChatHeader` before we fix it.
// Let's remove it and fix ChatHeader immediately after.
