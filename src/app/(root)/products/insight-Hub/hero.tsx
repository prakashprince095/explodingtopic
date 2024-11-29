import { Button } from "@/components/ui/button"

export default function HeroSection() {
    return (
        <section className="">
            <div className="relative flex flex-col gap-4 h-[500px]  w-full items-center justify-center overflow-hidden rounded-lg bg-background p-20 ">
                <h1 className="z-10 whitespace-pre-wrap text-center text-[50px] max-w-[700px] font-medium tracking-tighter text-black dark:text-white">
                Your Personalized Space for <span className="text-gradient">Favorites and Insights</span>
                </h1>
                <p className="text-md max-w-[700px] text-center mb-8">
                Empower your decision-making with a curated, organized space for startups and products.
                </p>
                <div className="flex gap-4">
                    <Button>Get Started</Button>
                </div>
            </div>
        </section>
    )
}

