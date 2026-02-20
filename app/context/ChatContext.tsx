"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { chat } from "@/lib/api";
import { useSession } from "next-auth/react";

interface ChatSession {
    id: string;
    sessionName: string;
    createdAt?: string;
}

interface ChatContextType {
    sessions: ChatSession[];
    loading: boolean;
    refreshSessions: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [loading, setLoading] = useState(true);

    const refreshSessions = useCallback(async () => {
        if (!session) return;

        try {
            // Don't set loading to true here to avoid flickering on refresh
            const data = await chat.getChatSessions();
            console.log("ChatContext: fetched sessions", data);
            if (Array.isArray(data)) {
                setSessions(data);
            }
        } catch (error) {
            console.error("Failed to fetch chat sessions:", error);
        } finally {
            setLoading(false);
        }
    }, [session]);

    useEffect(() => {
        if (session) {
            setLoading(true);
            refreshSessions();
        } else {
            setSessions([]);
            setLoading(false);
        }
    }, [session, refreshSessions]);

    return (
        <ChatContext.Provider value={{ sessions, loading, refreshSessions }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
}
