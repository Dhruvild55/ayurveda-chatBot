"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { useChat } from "@/app/context/ChatContext";
import { chat } from "@/lib/api";
import ChatMessage from "./ChatMessage";


interface Message {
    id?: string;
    message: string;
    isUser: boolean;
}

interface ChatContainerProps {
    chatSessionId?: string;
}

export default function ChatContainer({ chatSessionId }: ChatContainerProps) {
    const router = useRouter();
    const { refreshSessions } = useChat();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState("");
    const [activeSessionId, setActiveSessionId] = useState<string | undefined>(chatSessionId);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const skipNextFetch = useRef(false);

    // Update activeSessionId when prop changes
    useEffect(() => {
        setActiveSessionId(chatSessionId);
    }, [chatSessionId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };

    useEffect(() => {
        if (skipNextFetch.current) {
            skipNextFetch.current = false;
            return;
        }
        fetchMessages();
    }, [chatSessionId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            let data: { question: string; answer: string; createdAt: string }[] = [];

            if (chatSessionId) {
                data = await chat.getMessages(chatSessionId);
            } else {
                setMessages([]);
                setLoading(false);
                return;
            }

            const formattedMessages: Message[] = [];

            if (Array.isArray(data)) {
                data.forEach((item) => {
                    if (item.question) {
                        formattedMessages.push({ message: item.question, isUser: true });
                    }
                    if (item.answer) {
                        formattedMessages.push({ message: item.answer, isUser: false });
                    }
                });
            }

            setMessages(formattedMessages);
        } catch (err) {
            console.error("Failed to fetch messages", err);
        } finally {
            setLoading(false);
        }
    };

    // Helper — avoids repeating setMessages logic everywhere
    const updateLastBotMessage = (text: string) => {
        setMessages((prev) => {
            const newMessages = [...prev];
            const lastMsg = newMessages[newMessages.length - 1];
            if (lastMsg && !lastMsg.isUser) {
                lastMsg.message = text;
            }
            return newMessages;
        });
    };

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        // Add user message
        setMessages((prev) => [...prev, { message: text, isUser: true }]);
        setIsTyping(true);

        try {
            const currentSessionId = activeSessionId;
            const data = await chat.sendMessage(text, currentSessionId);

            const botMessage = data.message || data.answer || data.content || "";
            const newId = data.sessionId || data.chatSessionId || data.id;

            if (newId && !currentSessionId) {
                skipNextFetch.current = true;
                setActiveSessionId(newId);
                window.history.replaceState(null, "", `/chat/${newId}`);
            }

            // Add bot message
            setMessages((prev) => [...prev, { message: botMessage, isUser: false }]);

        } catch (err) {
            console.error("Failed to send message", err);
            setError("Failed to send message. Please try again.");
        } finally {
            setIsTyping(false);
            refreshSessions();
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-transparent relative overflow-hidden">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 relative z-10 custom-scrollbar flex flex-col">
                <div className="max-w-4xl mx-auto w-full space-y-4 md:space-y-6 flex-1 flex flex-col">
                    {loading && (
                        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                            <div className="w-12 h-12 border-4 border-forest/20 border-t-forest rounded-full animate-spin" />
                            <p className="text-stone-400 text-xs font-bold">
                                Retrieving Sacred Knowledge...
                            </p>
                        </div>
                    )}
                    {error && (
                        <div className="glass-card p-4 rounded-2xl border-red-100 bg-red-50/30 text-center">
                            <p className="text-red-600 text-sm font-bold">{error}</p>
                        </div>
                    )}

                    {!loading && messages.length === 0 && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/40 shadow-2xl shadow-forest/5 max-w-lg">
                                <div className="w-20 h-20 bg-forest rounded-3xl flex items-center justify-center text-3xl mb-8 mx-auto shadow-xl shadow-forest/20">
                                    🌿
                                </div>
                                <h2 className="text-3xl font-bold text-stone-900 mb-4 tracking-tight">
                                    Namaste, seeker.
                                </h2>
                                <p className="text-stone-600 text-lg leading-relaxed mb-8">
                                    I am <span className="text-forest font-bold">VEDA</span>, your guide through the ancient rivers of Ayurvedic wisdom.
                                </p>
                                <div className="grid grid-cols-1 gap-2 md:gap-3">
                                    {["Determine my Dosha", "Evening rejuvenation ritual", "Herbs for vitality"].map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            onClick={() => handleSendMessage(suggestion)}
                                            className="px-5 md:px-6 py-3.5 md:py-4 rounded-xl md:rounded-2xl bg-white border border-stone-100 text-stone-600 font-bold text-xs md:text-sm hover:border-forest/30 hover:text-forest hover:shadow-lg transition-all duration-300 text-left flex items-center gap-3 group"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-forest/20 group-hover:bg-forest transition-colors" />
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {messages.map((msg, index) => (
                        <ChatMessage
                            key={index}
                            message={msg.message}
                            isUser={msg.isUser}
                        />
                    ))}

                    {isTyping && <TypingIndicator />}
                    <div className="h-20" /> {/* Extra spacing at bottom of list */}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="pb-6 md:pb-10 pt-2 px-4 md:px-6 relative z-10">
                <div className="max-w-4xl mx-auto w-full">
                    <ChatInput onSend={handleSendMessage} disabled={isTyping} />
                </div>
            </div>
        </div>

    );
}