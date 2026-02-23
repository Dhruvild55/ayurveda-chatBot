"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { usePathname } from "next/navigation";
import { chat, auth } from "@/lib/api";
import { useSession } from "next-auth/react";

interface ChatSession {
    id: string;
    sessionName: string;
    createdAt?: string;
}

interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

interface ChatContextType {
    sessions: ChatSession[];
    user: User | null;
    loading: boolean;
    refreshSessions: () => Promise<void>;
    deleteSession: (id: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshSessions = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!session && !token) {
            setLoading(false);
            return;
        }

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

    const deleteSession = useCallback(async (id: string) => {
        try {
            await chat.deleteChatSession(id);
            setSessions(prev => prev.filter(s => s.id !== id));
        } catch (error) {
            console.error("Failed to delete chat session:", error);
            throw error;
        }
    }, []);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("token");
            const cachedName = localStorage.getItem("userName");
            const cachedEmail = localStorage.getItem("userEmail");

            if (session) {
                setUser(session.user || null);
                setLoading(true);
                refreshSessions();
            } else if (token) {
                // Set cached user immediately if available
                if (cachedName || cachedEmail) {
                    setUser({ name: cachedName, email: cachedEmail });
                }

                try {
                    setLoading(true);
                    const profile = await auth.getProfile();

                    // Merge profile data with existing user info (name, email)
                    setUser(prev => ({
                        ...prev,
                        ...profile,
                        // Ensure we keep name and email if profile doesn't have them
                        name: profile.name || prev?.name || cachedName,
                        email: profile.email || prev?.email || cachedEmail
                    }));

                    // Update cache
                    if (profile.name) localStorage.setItem("userName", profile.name);
                    if (profile.email) localStorage.setItem("userEmail", profile.email);

                    refreshSessions();
                } catch (error) {
                    console.error("Failed to fetch profile in context:", error);
                    setUser(null);
                    setSessions([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setUser(null);
                setSessions([]);
                setLoading(false);
            }
        };

        initAuth();
    }, [session, refreshSessions, pathname]);

    return (
        <ChatContext.Provider value={{ sessions, user, loading, refreshSessions, deleteSession }}>
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
