import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}

export default function Input({ placeholder, className = "", ...props }: InputProps) {
    return (
        <input
            placeholder={placeholder}
            className={`w-full p-3 border rounded-lg bg-white ${className}`}
            {...props}
        />
    );
}
