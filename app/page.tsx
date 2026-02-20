"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");
                return;
            }

            try {
                // Ideally, we should have an endpoint to get the current user profile
                // For now, we'll assume valid token means we can go to chat
                // But we should check if they have a dosha.
                // If the backend login response provided user details, we could check localStorage
                // const user = JSON.parse(localStorage.getItem("user") || "{}");
                // if (!user.dosha) router.push("/onboarding");

                router.push("/chat");
            } catch (error) {
                console.error("Auth check failed", error);
                router.push("/login");
            }
        };

        checkAuth();
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-stone-50">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-sage rounded-full mb-4"></div>
                <p className="text-stone-500 font-serif">Loading Ayurveda AI...</p>
            </div>
        </div>
    );
}
