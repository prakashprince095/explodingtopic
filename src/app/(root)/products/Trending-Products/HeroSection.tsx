import { Button } from "@/components/ui/button"
// import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
// import { cn } from "@/lib/utils";

export default function HeroSection() {
    return (
        <section className="">
            <div className="relative flex flex-col gap-4 h-[400px]  w-full items-center justify-center overflow-hidden rounded-lg bg-background p-20 ">
                <h1 className="z-10 whitespace-pre-wrap text-center text-[50px] max-w-[900px] font-medium tracking-tighter text-black dark:text-white">
                    Discover Tomorrow&apos;s Best-Selling Products Today <span className="text-gradient">Before They Redefine Industries</span>
                </h1>
                <p className="text-md max-w-[700px] text-center mb-8">
                    Stay ahead of the curve with real-time insights into the most trending e-commerce products and emerging consumer preferences.
                </p>
                <div className="flex gap-4">
                    <Button>Explore Products</Button>
                </div>
                {/* <AnimatedGridPattern
                    numSquares={60}
                    maxOpacity={0.3}
                    duration={1}
                    repeatDelay={1}
                    className={cn(
                        "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                        "inset-x-[20%] inset-y-[-10%] h-[100%] ",
                    )}
                /> */}
            </div>
        </section>
    )
}

