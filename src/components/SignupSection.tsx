import React from 'react'
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from './ui/button';

const SignupSection = () => {
    return (
        <div className="relative flex h-[300px] w-[1200px] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background ">
            <section className='flex flex-col items-center'>
                <h1 className='text-[40px]'>Join a Thriving Community of <span className="text-gradient">Innovators</span> </h1>
                <p className='mb-6 text-[#666666]'>Thousands of businesses, investors, and entrepreneurs rely on our platform to stay ahead. Join them today and see the difference!</p>
                <div className="flex gap-4">
                    <Button>Get Started →</Button>
                    <button className="bg-white z-50 border px-4 py-2 rounded-md shadow-sm hover:bg-gray-200">Try Free ↗</button>
                </div>
            </section>
            <BorderBeam size={250} duration={12} delay={9} />
        </div>
    )
}

export default SignupSection
