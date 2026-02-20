"use client";

import { motion } from "framer-motion";

export default function ChatMessage({
    message,
    isUser,
    isStreaming,
}: {
    message: string;
    isUser: boolean;
    isStreaming?: boolean;
}) {
    return (
        <div className={`flex items-end gap-2 mb-3 ${isUser ? "justify-end" : "justify-start"}`}>

            {/* Bot Avatar */}
            {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-base shadow-sm">
                    🌿
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-xl max-w-[80%] whitespace-pre-wrap ${isUser ? "bg-sage text-white" : "bg-assistant"
                    }`}
            >
                {message}

                {/* Blinking cursor while streaming */}
                {isStreaming && !isUser && (
                    <span
                        className="inline-block w-[2px] h-4 bg-green-600 ml-[2px] align-middle"
                        style={{ animation: "blink 1s step-start infinite" }}
                    />
                )}
            </motion.div>

            {/* User Avatar */}
            {isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sage flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    You
                </div>
            )}

            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
}