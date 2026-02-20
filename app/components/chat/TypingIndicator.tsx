export default function TypingIndicator() {
    return (
        <div className="flex items-center space-x-1 p-4 bg-stone-100 rounded-2xl w-fit rounded-tl-none animate-in fade-in duration-300">
            <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
        </div>
    );
}
