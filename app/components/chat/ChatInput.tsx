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
        <div className="w-full">
            <div className="flex gap-2 relative bg-stone-50 rounded-xl border border-stone-200 focus-within:ring-1 focus-within:ring-sage shadow-sm p-1">
                <input
                    className="flex-1 p-3 bg-transparent border-none focus:outline-none text-sm text-stone-700"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                />
                <button
                    onClick={handleSend}
                    disabled={disabled || !input.trim()}
                    className="p-2 bg-sage text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition self-end"
                >
                    <Send size={18} />
                </button>
            </div>
            <p className="text-[10px] text-center mt-2 text-stone-400">
                Ayurveda AI can make mistakes. Consider checking important information.
            </p>
        </div>
    )
}
