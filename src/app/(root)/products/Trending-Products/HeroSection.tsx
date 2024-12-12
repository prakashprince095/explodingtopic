import { Button } from "@/components/ui/button"
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
export default function HeroSection() {
    return (
        <section className="w-full flex flex-col items-center gap-10">
            <div className="relative  flex flex-col gap-4 h-[500px] w-full items-center justify-center overflow-hidden rounded-lg bg-background p-10 ">
                <h1 className="z-10 whitespace-pre-wrap text-center text-[50px] max-w-[600px] font-semibold tracking-tighter text-black dark:text-white">
                Discover What&apos;s Driving the <span className="text-gradient">Market Today</span>
                </h1>
                <p className="text-xl max-w-[800px] text-center mb-8">
                From everyday essentials to groundbreaking innovations, explore the products capturing the world&apos;s attention. See what&apos;s trending and shape your strategy with insights that matter.
                </p>
                <div className="flex gap-4">
                    <Button><Link href='/register'>Explore Trends</Link></Button>
                </div>
                <AnimatedGridPattern
                    numSquares={60}
                    maxOpacity={0.08}
                    duration={1}
                    repeatDelay={1}
                    className={cn(
                        "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                        "inset-x-[0%] inset-y-[0%] h-[60%]",
                    )}
                />
            </div>
        </section>
    )
}

