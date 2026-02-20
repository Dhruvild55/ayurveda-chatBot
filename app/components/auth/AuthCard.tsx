"use client";

import { motion } from "framer-motion";

export default function AuthCard({
title,
children
}:{
title:string;
children:React.ReactNode
}){

return(

<div className="min-h-screen flex items-center justify-center">

<motion.div

initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="bg-white p-8 rounded-xl shadow-md w-[90%] max-w-md"
>

<h1 className="font-serif text-3xl mb-6 text-center">

{title}

</h1>

{children}

</motion.div>

</div>

)

}
