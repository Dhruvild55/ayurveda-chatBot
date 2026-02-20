"use client";

import ChatContainer from "@/app/components/chat/ChatContainer";
import { use } from "react";

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params using React.use() or await in async component
    // Since this is a client component receiving a promise (in Next 15), we use `use`
    const { id } = use(params);

    return (
        <ChatContainer sessionId={id} />
    );
}
