"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/api";
import { Wind, Flame, Mountain } from "lucide-react";
import Button from "@/app/components/ui/Button";

type Dosha = "Vata" | "Pitta" | "Kapha" | null;

const DOSHAS = [
    {
        id: "Vata",
        icon: Wind,
        color: "bg-blue-100 text-blue-600",
        description: "Creative, energetic, but prone to anxiety. Elements: Air + Ether."
    },
    {
        id: "Pitta",
        icon: Flame,
        color: "bg-red-100 text-red-600",
        description: "Intelligent, focused, but prone to anger. Elements: Fire + Water."
    },
    {
        id: "Kapha",
        icon: Mountain,
        color: "bg-green-100 text-green-600",
        description: "Calm, grounded, but prone to lethargy. Elements: Earth + Water."
    }
];

// Basic Details Step
const BASIC_DETAILS = {
    title: "Tell us about yourself",
    subtitle: "To provide personalized Ayurvedic insights.",
    fields: ["age", "gender", "weight"]
};

// Health Profile Step
const HEALTH_PROFILE = {
    title: "Health & Lifestyle",
    subtitle: "Understanding your habits helps us guide you.",
    fields: ["diet"]
};

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        weight: "",
        diet: "",
        dosha: null as Dosha
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleComplete = async () => {
        try {
            setLoading(true);
            setError("");
            await auth.updateProfile({
                age: Number(formData.age),
                gender: formData.gender,
                weight: formData.weight,
                diet: formData.diet,
                dosha: formData.dosha
            });
            router.push("/chat");
        } catch (err) {
            console.error("Onboarding failed", err);
            setError("Failed to save profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const isStepValid = () => {
        if (step === 1) return formData.age && formData.gender && formData.weight;
        if (step === 2) return formData.diet;
        if (step === 3) return formData.dosha;
        return false;
    };

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full transition-all duration-300">

                {/* Progress Bar */}
                <div className="flex gap-2 mb-8">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? 'bg-sage' : 'bg-stone-200'}`} />
                    ))}
                </div>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                {/* Step 1: Basic Details */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h1 className="text-2xl font-serif text-stone-800 mb-2 text-center">{BASIC_DETAILS.title}</h1>
                        <p className="text-stone-500 text-center mb-6">{BASIC_DETAILS.subtitle}</p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Age</label>
                                <input
                                    type="number"
                                    className="w-full p-3 bg-stone-50 border-none rounded-xl focus:ring-2 focus:ring-sage focus:outline-none"
                                    placeholder="e.g. 25"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Gender</label>
                                <select
                                    className="w-full p-3 bg-stone-50 border-none rounded-xl focus:ring-2 focus:ring-sage focus:outline-none"
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Weight (kg)</label>
                                <input
                                    type="number"
                                    className="w-full p-3 bg-stone-50 border-none rounded-xl focus:ring-2 focus:ring-sage focus:outline-none"
                                    placeholder="e.g. 60"
                                    value={formData.weight}
                                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Health Profile */}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h1 className="text-2xl font-serif text-stone-800 mb-2 text-center">{HEALTH_PROFILE.title}</h1>
                        <p className="text-stone-500 text-center mb-6">{HEALTH_PROFILE.subtitle}</p>

                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-3">Dietary Preference</label>
                            <div className="grid grid-cols-1 gap-2">
                                {["Vegetarian", "Vegan", "Eggetarian", "Non-Vegetarian", "Pescatarian"].map((diet) => (
                                    <button
                                        key={diet}
                                        onClick={() => setFormData({ ...formData, diet })}
                                        className={`p-3 rounded-xl border text-left transition-all ${formData.diet === diet ? 'border-sage bg-sage/10 text-sage ring-1 ring-sage' : 'border-stone-200 hover:bg-stone-50'}`}
                                    >
                                        {diet}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Dosha Selection */}
                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h1 className="text-2xl font-serif text-stone-800 mb-2 text-center">Dosha Profile</h1>
                        <p className="text-stone-500 text-center mb-6">Select your dominant energy type.</p>

                        <div className="grid grid-cols-1 gap-3">
                            {DOSHAS.map((dosha) => {
                                const Icon = dosha.icon;
                                const isSelected = formData.dosha === dosha.id;

                                return (
                                    <button
                                        key={dosha.id}
                                        onClick={() => setFormData({ ...formData, dosha: dosha.id as Dosha })}
                                        className={`
                                            relative flex items-center p-3 rounded-xl border-2 transition-all text-left
                                            ${isSelected
                                                ? "border-sage bg-sage/10 ring-1 ring-sage"
                                                : "border-stone-200 hover:border-sage/50 bg-white"}
                                        `}
                                    >
                                        <div className={`p-2 rounded-full mr-3 ${dosha.color}`}>
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-serif font-medium text-stone-800">{dosha.id}</h3>
                                            <p className="text-xs text-stone-500 leading-tight mt-0.5">{dosha.description}</p>
                                        </div>
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-sage" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="mt-8 flex gap-3">
                    {step > 1 && (
                        <Button onClick={handleBack} className="flex-1">
                            Back
                        </Button>
                    )}
                    <Button
                        onClick={step === 3 ? handleComplete : handleNext}
                        disabled={!isStepValid() || loading}
                        className="flex-1"
                    >
                        {loading ? "Saving..." : step === 3 ? "Complete Profile" : "Next"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
