"use client";

import ReactMarkdown from "react-markdown";

export default function ChatMessage({
    message,
    isUser,
}: {
    message: string;
    isUser: boolean;
}) {
    return (
        <div className={`flex items-end gap-3 mb-6 ${isUser ? "justify-end" : "justify-start"}`}>
            {/* Bot Avatar */}
            {!isUser && (
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-forest flex items-center justify-center text-xl shadow-lg shadow-forest/20 rotate-3 mb-1">
                    🌿
                </div>
            )}

            <div
                className={`p-5 rounded-[2rem] border transition-all duration-300 ${isUser
                    ? "bg-gradient-to-br from-forest to-moss text-white border-white/10 shadow-xl shadow-forest/10 rounded-br-none"
                    : "glass-card text-stone-800 border-white shadow-xl shadow-stone-200/50 rounded-bl-none"
                    } max-w-[80%] relative z-10`}
            >
                {isUser ? (
                    <p className="whitespace-pre-wrap text-[15px] font-medium leading-relaxed">{message}</p>
                ) : (
                    <div className="markdown-body">
                        <ReactMarkdown
                            components={{
                                p: ({ children }) => (
                                    <p className="mb-4 last:mb-0 leading-relaxed text-[15px] font-medium text-stone-800">{children}</p>
                                ),
                                ul: ({ children }) => (
                                    <ul className="my-4 space-y-3 pl-1">{children}</ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="my-4 space-y-3 pl-1 list-decimal list-inside">{children}</ol>
                                ),
                                li: ({ children }) => (
                                    <li className="flex items-start gap-3 text-[15px] font-medium leading-relaxed">
                                        <span className="mt-2 w-2 h-2 rounded-full bg-forest/40 flex-shrink-0 shrink-0" />
                                        <span>{children}</span>
                                    </li>
                                ),
                                strong: ({ children }) => (
                                    <strong className="font-black text-forest">{children}</strong>
                                ),
                                em: ({ children }) => (
                                    <em className="italic text-forest/80 px-1 bg-forest/5 rounded-md">{children}</em>
                                ),
                                h1: ({ children }) => (
                                    <h1 className="text-2xl font-bold text-stone-900 mb-4 mt-2">{children}</h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="text-xl font-bold text-stone-900 mb-3 mt-1 underline decoration-forest/20 decoration-4 underline-offset-4">{children}</h2>
                                ),
                            }}
                        >
                            {message}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            {/* User Avatar */}
            {isUser && (
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-white border border-stone-100 flex items-center justify-center text-forest text-[10px] font-black tracking-wider shadow-lg shadow-stone-200/50 mb-1">
                    Me
                </div>
            )}
        </div>

    );
}