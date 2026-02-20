"use client";

import { useEffect, useState, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { useChat } from "@/app/context/ChatContext";
import { chat } from "@/lib/api";

interface Message {
    id?: string;
    message: string;
    isUser: boolean;
}

interface ChatContainerProps {
    sessionId?: string;
}

export default function ChatContainer({ sessionId }: ChatContainerProps) {
    const { refreshSessions } = useChat();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        fetchMessages();
    }, [sessionId]); // Re-fetch when sessionId changes

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const fetchMessages = async () => {
        setLoading(true); // Reset loading state on fetch
        try {
            let data: { question: string, answer: string, createdAt: string }[] = [];

            if (sessionId) {
                // Fetch specific session history
                data = await chat.getMessages(sessionId);
            } else {
                // New chat, maybe clear messages or fetch default empty state
                // For now, let's assume new chat starts empty unless we have a "default" history endpoint
                // data = await chat.getMessages(); // converting this to specific ID based fetch
                setMessages([]);
                setLoading(false);
                return;
            }

            // API returns array of conversation pairs
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
            // setError("Failed to load history");
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        // Optimistic update
        const newMessage: Message = { message: text, isUser: true };
        setMessages((prev) => [...prev, newMessage]);
        setIsTyping(true);

        try {
            console.log(text)
            const response = await chat.sendMessage(text, sessionId);

            // Refresh sessions list in sidebar
            console.log("ChatContainer: refreshing sessions...");
            await refreshSessions();

            // Assuming API returns the bot response or the full message object
            // If response is just the bot's reply text:
            if (response && response.answer) {
                let botMessage = response.answer;
                if (response.disclaimer) {
                    botMessage += `\n\n_${response.disclaimer}_`;
                }
                setMessages((prev) => [...prev, { message: botMessage, isUser: false }]);
            } else if (response && response.message) {
                setMessages((prev) => [...prev, { message: response.message, isUser: false }]);
            } else if (typeof response === 'string') {
                setMessages((prev) => [...prev, { message: response, isUser: false }]);
            }

        } catch (err) {
            console.error("Failed to send message", err);
            setError("Failed to send message");
            // Optionally rollback optimistic update
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-stone-50/10">
            <ChatHeader />

            <div className="flex-1 w-full max-w-3xl mx-auto flex flex-col bg-white shadow-sm border-x border-stone-100 overflow-hidden">
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 bg-stone-50/30">
                    {loading && <p className="text-center text-stone-500">Loading chat history...</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}

                    {messages.map((msg, index) => (
                        <ChatMessage
                            key={index}
                            message={msg.message}
                            isUser={msg.isUser}
                        />
                    ))}
                    {isTyping && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                </div>

                <ChatInput onSend={handleSendMessage} disabled={false} />
            </div>
        </div>
    )
}
