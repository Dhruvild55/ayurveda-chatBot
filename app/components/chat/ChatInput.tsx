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
        <div className="sticky bottom-0 bg-cream p-2 border-t">
            <div className="flex gap-2">
                <input
                    className="flex-1 p-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-sage"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                />
                <button
                    onClick={handleSend}
                    disabled={disabled || !input.trim()}
                    className="p-2 bg-sage text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition"
                >
                    <Send size={20} />
                </button>
            </div>
            <p className="text-[10px] text-center mt-1 text-stone-400">
                Ayurveda AI is not medical advice
            </p>
        </div>
    )
}
