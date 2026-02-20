export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Optional: Add a Logo or Header here if needed specifically for onboarding */}
                {children}
            </div>
            <div className="mt-8 text-center text-stone-400 text-xs">
                <p>&copy; {new Date().getFullYear()} Ayurveda AI. All rights reserved.</p>
            </div>
        </div>
    );
}
