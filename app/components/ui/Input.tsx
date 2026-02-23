import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}

export default function Input({ placeholder, className = "", ...props }: InputProps) {
    return (
        <input
            placeholder={placeholder}
            className={`w-full p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-stone-200 outline-none transition-all focus:border-forest/30 focus:ring-4 focus:ring-forest/5 text-stone-700 placeholder:text-stone-400 font-medium ${className}`}
            {...props}
        />
    );
}

