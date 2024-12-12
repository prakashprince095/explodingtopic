
'use client';

import { motion } from "framer-motion";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
    return (
        <motion.section
            className="flex flex-col items-center gap-10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            <div className="relative flex flex-col gap-6 h-[500px] w-full items-center justify-center overflow-hidden rounded-lg bg-background p-10">
                <motion.h1
                    className="z-10 whitespace-pre-wrap text-center text-[50px] max-w-[800px] font-semibold tracking-tighter text-black dark:text-white"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                    About us
                </motion.h1>
                <motion.p
                    className="text-xl max-w-[700px] text-center mb-8"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.4, ease: "easeInOut" }}
                >
                    We provide actionable insights and data-driven solutions to help you stay ahead in your industry.                </motion.p>
                <motion.div
                    className="flex gap-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.6, ease: "easeInOut" }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <Button>
                            <Link href="/register">Explore Trends</Link>
                        </Button>
                    </motion.div>
                </motion.div>
                <AnimatedGridPattern
                    numSquares={60}
                    maxOpacity={0.08}
                    duration={1}
                    repeatDelay={1}
                    className={cn(
                        "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                        "inset-x-[0%] inset-y-[0%] h-[60%]"
                    )}
                />
            </div>
        </motion.section>
    );
}