import { Send } from "lucide-react";
import { useState, KeyboardEvent } from "react";

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() && !disabled) {
            onSend(input);
            setInput("");
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="w-full relative group">
            <div className="glass-card flex items-center gap-3 p-2 rounded-[2rem] border-white/60 focus-within:border-forest/30 focus-within:shadow-2xl focus-within:shadow-forest/5 transition-all duration-500">
                <input
                    className="flex-1 py-4 px-6 bg-transparent border-none focus:outline-none text-[15px] font-medium text-stone-800 placeholder:text-stone-400"
                    placeholder="Whisper to Veda..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                />

                <button
                    onClick={handleSend}
                    disabled={disabled || !input.trim()}
                    className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-forest to-moss text-white rounded-2xl shadow-lg shadow-forest/20 hover:shadow-forest/30 disabled:opacity-30 disabled:grayscale transition-all"
                >
                    <Send size={18} strokeWidth={2.5} />
                </button>
            </div>

            <p
                className="text-center mt-4 text-[9px] font-black text-stone-900 tracking-wider opacity-40"
            >
                Veda may whisper inaccuracies. Consult with a practitioner for medical paths.
            </p>
        </div>
    )
}
