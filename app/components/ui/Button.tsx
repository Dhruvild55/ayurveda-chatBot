"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "outline" | "ghost" | "forest";
}

export default function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
    const baseStyles = "w-full py-3.5 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium active:scale-[0.98]";

    const variants = {
        primary: "bg-sage text-white hover:bg-sage/90 shadow-lg shadow-sage/20",
        outline: "border border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300 bg-white/50 backdrop-blur-sm",
        ghost: "text-stone-600 hover:bg-stone-100/50",
        forest: "bg-forest text-white hover:bg-forest/90 shadow-xl shadow-forest/10"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

