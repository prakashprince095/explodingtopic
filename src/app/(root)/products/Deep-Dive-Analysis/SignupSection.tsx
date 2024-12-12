import React from 'react';
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
const SignupSection = () => {
    return (
        <motion.div className="relative flex mb-10 bg-[#FAFAFA] flex-col items-center justify-center h-auto w-full max-w-[1200px] px-6 py-12 mx-auto overflow-hidden rounded-lg border bg-background md:h-[300px] md:px-12 lg:flex-row"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }} >
            <section className="z-10 flex  flex-col items-center text-center justify-center">
                <h1 className="text-[28px] leading-tight md:text-[32px] lg:text-[40px]">
                    Join a Thriving Community of{" "}
                    <span className="text-gradient">Innovators</span>
                </h1>
                <p className="mt-4 mb-6 text-sm text-[#666666] md:text-base lg:mt-2 lg:mb-8">
                    Thousands of businesses, investors, and entrepreneurs rely on our platform to stay ahead. Join them today and see the difference!
                </p>
                <div className="flex flex-wrap gap-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <Button>Get Started →</Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <button className="px-4 py-2 text-sm font-medium text-black bg-white border rounded-md shadow-sm hover:bg-gray-100 md:text-base">
                            Try Free ↗
                        </button>
                    </motion.div>
                </div>
            </section>
            <BorderBeam size={300} duration={10} delay={9} className="absolute inset-0" />
        </motion.div>
    );
};

export default SignupSection;
