import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed: number = 20, isEnabled: boolean = true) {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (!isEnabled) {
            setDisplayedText(text);
            return;
        }

        setDisplayedText('');
        let i = 0;

        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed, isEnabled]);

    return { displayedText };
}
