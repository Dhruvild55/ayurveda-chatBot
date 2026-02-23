export default function TypingIndicator() {
    return (
        <div className="flex items-center space-x-2 p-4 glass-card rounded-[1.5rem] w-fit rounded-tl-none border-white shadow-xl shadow-stone-200/50">
            <div className="w-2 h-2 bg-forest rounded-full"></div>
            <div className="w-2 h-2 bg-forest/60 rounded-full"></div>
            <div className="w-2 h-2 bg-forest/30 rounded-full"></div>
        </div>
    );
}

