"use client";

import { motion } from "framer-motion";

export default function ChatMessage({
    message,
    isUser
}: {
    message: string;
    isUser: boolean;
}) {

    return (

        <motion.div

            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-xl max-w-[80%] mb-3 whitespace-pre-wrap

${isUser
                    ? "bg-sage text-white ml-auto"
                    : "bg-assistant"}

`}

        >

            {message}

        </motion.div>

    )

}
