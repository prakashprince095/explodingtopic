import React from 'react'
import { BorderBeam } from "@/components/ui/border-beam";
const SignupSection = () => {
    return (
        <div className="relative flex h-[500px] max-w-[1000px] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                Border Beam
            </span>
            <BorderBeam size={250} duration={12} delay={9} />
        </div>
    )
}

export default SignupSection
