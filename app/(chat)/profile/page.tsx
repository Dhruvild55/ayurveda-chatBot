"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Wind, Flame, Mountain, Loader2, Leaf, ArrowLeft } from "lucide-react";
import { auth } from "@/lib/api";
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

export default function ProfilePage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        weight: "",
        diet: "",
        dosha: null as Dosha
    });
    const [fetching, setFetching] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setFetching(true);
            const profile = await auth.getProfile();
            if (profile) {
                setFormData({
                    age: profile.age?.toString() || "",
                    gender: profile.gender || "",
                    weight: profile.weight?.toString() || "",
                    diet: profile.diet || "",
                    dosha: (profile.dosha?.name || profile.dosha) as Dosha
                });
            }
        } catch (err) {
            console.error("Failed to fetch profile", err);
        } finally {
            setFetching(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setError("");
            await auth.updateProfile({
                age: Number(formData.age),
                gender: formData.gender,
                weight: formData.weight,
                diet: formData.diet,
                dosha: formData.dosha
            });
            setSuccess(true);
            setTimeout(() => {
                router.push("/chat");
            }, 1000);
        } catch (err) {
            console.error("Update failed", err);
            setError("Failed to update profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const isStepValid = () => {
        if (step === 1) return formData.age && formData.gender && formData.weight;
        if (step === 2) return formData.diet;
        if (step === 3) return formData.dosha;
        return false;
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6">
                <div className="w-12 h-12 border-4 border-forest/20 border-t-forest rounded-full animate-spin mb-4" />
                <p className="text-stone-400 text-xs font-black tracking-wider">Consulting the Archives...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 bg-transparent">
            <div className="w-full max-w-xl">
                {/* Header Navigation */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => router.back()}
                        className="p-3 rounded-2xl bg-white/60 border border-stone-100/60 text-stone-500 hover:text-stone-900 transition-all shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">Your Essence</h1>
                    <div className="w-11" /> {/* Spacer for centering */}
                </div>

                <div className="glass-card w-full rounded-[2.5rem] shadow-2xl border-white overflow-hidden bg-white/70">
                    <div className="p-8 md:p-12">
                        {success ? (
                            <div className="flex flex-col items-center justify-center py-12 text-forest gap-6 text-center">
                                <div className="w-24 h-24 bg-forest rounded-[2rem] flex items-center justify-center shadow-2xl shadow-forest/20">
                                    <Leaf className="w-12 h-12 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-serif font-bold text-stone-900 leading-tight mb-2">Wisdom Integrated.</h3>
                                    <p className="text-stone-500 font-medium max-w-xs mx-auto">Your profile has been aligned with your Ayurvedic essence. Returning to chat...</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Progress Bar */}
                                <div className="flex gap-3 mb-12">
                                    {[1, 2, 3].map((s) => (
                                        <div key={s} className="flex-1">
                                            <div className={`h-2 rounded-full transition-all duration-300 ${s <= step ? 'bg-forest shadow-sm shadow-forest/10' : 'bg-stone-200/50'}`} />
                                            <p className={`text-[10px] font-black tracking-wider mt-2 transition-colors ${s === step ? 'text-forest' : 'text-stone-400'}`}>
                                                {s === 1 ? 'Elemental' : s === 2 ? 'Alignment' : 'Essence'}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {error && (
                                    <div className="bg-red-50 text-red-500 p-4 rounded-2xl border border-red-100 text-xs font-bold tracking-wider mb-6 text-center">
                                        {error}
                                    </div>
                                )}

                                {/* Step Content */}
                                <div className="min-h-[350px]">
                                    {step === 1 && (
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-xl font-serif text-stone-900 font-bold mb-2">Elemental Stats</h3>
                                                <p className="text-stone-500 text-sm mb-6">Your physical presence in this manifestation.</p>
                                            </div>
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-[10px] font-black text-stone-400 tracking-wider mb-2 ml-1">Age</label>
                                                        <input
                                                            type="number"
                                                            className="w-full p-5 bg-white/50 border border-stone-200/40 rounded-2xl focus:ring-2 focus:ring-forest/20 focus:outline-none focus:border-forest/30 transition-all font-medium text-lg"
                                                            value={formData.age}
                                                            placeholder="Years"
                                                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-black text-stone-400 tracking-wider mb-2 ml-1">Weight (kg)</label>
                                                        <input
                                                            type="number"
                                                            className="w-full p-5 bg-white/50 border border-stone-200/40 rounded-2xl focus:ring-2 focus:ring-forest/20 focus:outline-none focus:border-forest/30 transition-all font-medium text-lg"
                                                            value={formData.weight}
                                                            placeholder="kg"
                                                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-black text-stone-400 tracking-wider mb-2 ml-1">Manifested Gender</label>
                                                    <select
                                                        className="w-full p-5 bg-white/50 border border-stone-200/40 rounded-2xl focus:ring-2 focus:ring-forest/20 focus:outline-none focus:border-forest/30 transition-all font-medium text-lg appearance-none"
                                                        value={formData.gender}
                                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                                    >
                                                        <option value="">Balance Focus</option>
                                                        <option value="Male">Vata-Pitta (Male)</option>
                                                        <option value="Female">Pitta-Kapha (Female)</option>
                                                        <option value="Other">Universal (Other)</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-xl font-serif text-stone-900 font-bold mb-2">Dietary Alignment</h3>
                                                <p className="text-stone-500 text-sm mb-6">How you nourish your internal flame.</p>
                                            </div>
                                            <div className="grid grid-cols-1 gap-3">
                                                {["Vegetarian", "Vegan", "Ethical Non-Veg", "Vitalizing Raw"].map((diet) => (
                                                    <button
                                                        key={diet}
                                                        onClick={() => setFormData({ ...formData, diet })}
                                                        className={`p-5 rounded-2xl border transition-all duration-300 text-left font-bold text-base flex items-center justify-between group ${formData.diet === diet
                                                            ? 'border-forest bg-forest/5 text-forest ring-1 ring-forest/10 shadow-lg shadow-forest/5'
                                                            : 'border-stone-100/60 bg-white/40 hover:bg-white text-stone-500 hover:text-stone-800'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-3 h-3 rounded-full transition-all ${formData.diet === diet ? 'bg-forest scale-110' : 'bg-stone-200'}`} />
                                                            {diet}
                                                        </div>
                                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.diet === diet ? 'border-forest bg-forest' : 'border-stone-100 group-hover:border-forest/30'}`}>
                                                            {formData.diet === diet && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-xl font-serif text-stone-900 font-bold mb-2">Your True Essence</h3>
                                                <p className="text-stone-500 text-sm mb-6">The primary energy that flows through you.</p>
                                            </div>
                                            <div className="grid grid-cols-1 gap-3">
                                                {DOSHAS.map((dosha) => {
                                                    const Icon = dosha.icon;
                                                    const isSelected = formData.dosha === dosha.id;

                                                    return (
                                                        <button
                                                            key={dosha.id}
                                                            onClick={() => setFormData({ ...formData, dosha: dosha.id as Dosha })}
                                                            className={`
                                                                relative flex items-center p-6 rounded-[2rem] border transition-all duration-300 text-left
                                                                ${isSelected
                                                                    ? "border-forest bg-white shadow-2xl shadow-forest/10"
                                                                    : "border-stone-100/60 bg-white/40 hover:border-forest/40 hover:bg-white"}
                                                            `}
                                                        >
                                                            <div className={`p-4 rounded-2xl mr-6 shadow-sm transition-colors duration-300 ${isSelected ? dosha.color : 'bg-stone-100 text-stone-400'}`}>
                                                                <Icon size={24} />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className={`font-serif font-bold text-stone-900 text-lg ${isSelected ? 'text-forest' : ''}`}>{dosha.id}</h4>
                                                                <p className="text-xs text-stone-500 leading-relaxed mt-1 font-medium">{dosha.description}</p>
                                                            </div>
                                                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-forest bg-forest' : 'border-stone-100 group-hover:border-forest/30'}`}>
                                                                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Footer actions */}
                                <div className="mt-12 flex gap-4">
                                    {step > 1 && (
                                        <button
                                            onClick={() => setStep(step - 1)}
                                            className="flex-1 py-5 px-8 rounded-[1.5rem] bg-stone-50 border border-stone-100 text-stone-600 font-bold text-sm hover:bg-stone-100 transition-all"
                                        >
                                            Previous Step
                                        </button>
                                    )}
                                    <Button
                                        onClick={step === 3 ? handleSave : () => setStep(step + 1)}
                                        disabled={!isStepValid() || saving}
                                        className="flex-[2] py-5 shadow-2xl shadow-forest/20 text-base"
                                    >
                                        {saving ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                <span>Aligning Your Path...</span>
                                            </div>
                                        ) : step === 3 ? "Align My Essence" : "Continue Journey"}
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <p className="mt-8 text-center text-[10px] font-black text-stone-400 tracking-wider">
                    Veda Protocol &copy; {new Date().getFullYear()} — Wisdom flows through silence
                </p>
            </div>
        </div>
    );
}
