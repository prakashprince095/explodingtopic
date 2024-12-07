import { Button } from "@/components/ui/button"
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export default function HeroSection() {
    return (
        <section className="w-full flex flex-col items-center gap-10">
            <div className="relative  flex flex-col gap-4 h-[600px] w-full items-center justify-center overflow-hidden rounded-lg bg-background p-10 ">
                <h1 className="z-10 whitespace-pre-wrap text-center text-[50px] max-w-[800px] font-semibold tracking-tighter text-black dark:text-white">
                    Discover Tomorrow&apos;s Innovations Today <span className="text-gradient">before they ignite</span>
                </h1>
                <p className="text-xl max-w-[700px] text-center mb-8">
                    Stay ahead of the curve with real-time insights into the world&apos;s most promising startups and emerging trends.
                </p>
                <div className="flex gap-4">
                    <Button>Explore Trends</Button>
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

