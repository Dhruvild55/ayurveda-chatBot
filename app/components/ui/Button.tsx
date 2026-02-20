"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "outline";
}

export default function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
    const baseStyles = "w-full py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";
    const variants = {
        primary: "bg-sage text-white hover:opacity-90",
        outline: "border border-stone-200 text-stone-700 hover:bg-stone-50"
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
