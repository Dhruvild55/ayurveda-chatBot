import { ReactNode } from "react";
import Sidebar from "@/app/components/chat/Sidebar";
import { ChatProvider } from "@/app/context/ChatContext";

export default function ChatLayout({ children }: { children: ReactNode }) {
    return (
        <ChatProvider>
            <div className="flex h-screen w-full bg-mesh overflow-hidden relative">
                {/* Lateral atmospheric glow */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-forest/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                {/* Sidebar handled by internal responsiveness logic */}
                <div className="h-full z-20">
                    <Sidebar />
                </div>

                <div className="flex-1 h-full flex flex-col relative overflow-hidden backdrop-blur-[2px]">
                    {children}
                </div>
            </div>
        </ChatProvider>
    );
}
