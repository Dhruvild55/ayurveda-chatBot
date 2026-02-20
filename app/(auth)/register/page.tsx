"use client";

import AuthCard from "@/app/components/auth/AuthCard";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/api";
import axios from "axios";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";


export default function RegisterPage() {
    const [formData, setFormData] = useState({ email: "", password: "", name: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        const handleSocialAuth = async () => {
            if (session?.user) {
                try {
                    setLoading(true);
                    const data = await auth.socialLogin({
                        name: session.user.name,
                        email: session.user.email,
                        provider: (session as any).provider || "google",
                        idToken: (session as any).idToken,
                        providerUserId: (session as any).providerAccountId
                    });

                    localStorage.setItem("token", data.token);
                    if (data.isOnboardingCompleted) {
                        router.push("/chat");
                    } else {
                        router.push("/onboarding");
                    }
                } catch (err) {
                    console.error("Social login sync failed", err);
                    setError("Social login failed. Please try again.");
                } finally {
                    setLoading(false);
                }
            }
        };

        if (session) {
            handleSocialAuth();
        }
    }, [session, router]);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await auth.register(formData.name, formData.email, formData.password);
            localStorage.setItem("token", data.token);
            router.push("/onboarding");
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Registration failed");
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }

    };

    const handleGoogleLogin = () => {
        signIn("google");
    };

    const handleMicrosoftLogin = () => {
        signIn("azure-ad");
    };

    return (
        <AuthCard title="Create Account">
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            <Input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <div className="h-4" />

            <Input
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <div className="h-4" />

            <Input
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <div className="my-6">
                {/* Dosha selection removed */}
            </div>

            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-stone-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-stone-500">Or continue with</span>
                </div>
            </div>

            <div className="space-y-3">
                <Button variant="outline" onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            className="text-[#4285F4]"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            className="text-[#34A853]"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            className="text-[#FBBC05]"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            className="text-[#EA4335]"
                        />
                    </svg>
                    Google
                </Button>
                <Button variant="outline" onClick={handleMicrosoftLogin} className="w-full flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 23 23">
                        <path fill="#f35325" d="M1 1h10v10H1z" />
                        <path fill="#81bc06" d="M12 1h10v10H12z" />
                        <path fill="#05a6f0" d="M1 12h10v10H1z" />
                        <path fill="#ffba08" d="M12 12h10v10H12z" />
                    </svg>
                    Microsoft
                </Button>
            </div>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-stone-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-stone-500">Or continue with</span>
                </div>
            </div>
            <p className="text-center mt-4">
                <Link href="/login">
                    Login
                </Link>
            </p>
        </AuthCard>
    );
}
