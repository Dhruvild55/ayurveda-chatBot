"use client";

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
    isStreaming?: boolean;
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
    }, [sessionId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            let data: { question: string; answer: string; createdAt: string }[] = [];

            if (sessionId) {
                data = await chat.getMessages(sessionId);
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

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        // Add user message
        const newMessage: Message = { message: text, isUser: true };
        setMessages((prev) => [...prev, newMessage]);
        setIsTyping(true);

        // Add empty bot message placeholder with streaming flag
        setMessages((prev) => [
            ...prev,
            { message: "", isUser: false, isStreaming: true },
        ]);

        try {
            const response = await chat.streamChat(text, sessionId);

            // Refresh sidebar sessions
            refreshSessions();

            if (!response.body) {
                throw new Error("ReadableStream not supported in this browser.");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let botMessage = "";
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                // Split buffer into lines
                const lines = buffer.split("\n");

                // Keep last incomplete line in buffer
                buffer = lines.pop() ?? "";

                for (const line of lines) {
                    const trimmed = line.trim();

                    // Skip empty SSE separator lines
                    if (!trimmed) continue;

                    // Parse SSE "data: <content>" format
                    if (trimmed.startsWith("data:")) {
                        const chunk = trimmed.slice(5); // Remove "data:" prefix

                        // Handle end of stream signal
                        if (chunk.trim() === "[DONE]") break;

                        botMessage += chunk;

                        // Update the last bot message in real time
                        setMessages((prev) => {
                            const newMessages = [...prev];
                            const lastMsg = newMessages[newMessages.length - 1];
                            if (lastMsg && !lastMsg.isUser) {
                                lastMsg.message = botMessage;
                            }
                            return newMessages;
                        });
                    }
                }
            }
        } catch (err) {
            console.error("Failed to send message", err);
            setError("Failed to send message. Please try again.");
            // Remove empty failed bot message
            setMessages((prev) =>
                prev.filter((msg) => msg.message !== "" || msg.isUser)
            );
        } finally {
            setIsTyping(false);

            // Turn off streaming flag on last bot message
            setMessages((prev) => {
                const newMessages = [...prev];
                const lastMsg = newMessages[newMessages.length - 1];
                if (lastMsg && !lastMsg.isUser) {
                    lastMsg.isStreaming = false;
                }
                return newMessages;
            });
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-stone-50/20">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
                <div className="max-w-3xl mx-auto w-full space-y-4">
                    {loading && (
                        <p className="text-center text-stone-500">
                            Loading chat history...
                        </p>
                    )}
                    {error && (
                        <p className="text-center text-red-500">{error}</p>
                    )}

                    {!loading && messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-center text-stone-400">
                            <p className="text-4xl mb-3">🌿</p>
                            <p className="text-lg font-medium text-stone-600">
                                Namaste! I&apos;m Veda
                            </p>
                            <p className="text-sm mt-1">
                                Ask me anything about your Ayurvedic wellness journey.
                            </p>
                        </div>
                    )}

                    {messages.map((msg, index) => (
                        <ChatMessage
                            key={index}
                            message={msg.message}
                            isUser={msg.isUser}
                            isStreaming={msg.isStreaming}
                        />
                    ))}

                    {isTyping && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="border-t bg-white p-4">
                <div className="max-w-3xl mx-auto w-full">
                    <ChatInput onSend={handleSendMessage} disabled={isTyping} />
                </div>
            </div>
        </div>
    );
}