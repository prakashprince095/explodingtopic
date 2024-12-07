"use client";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import Image from "next/image";

const features = [
    {
        Icon: () => <Image src="/sidebar/3.svg" alt="Trending Products icon" width={50} height={50} />,
        name: "Trending Products",
        description: "We automatically save your files as you type.",
        href: "/",
        cta: "Learn more",
        background: (
            <Image
                width={300}
                height={300}
                src="/Bento/startup.svg"
                className="absolute -right-0 -top-0 opacity-90"
                alt="Decorative background for Trending Products"
            />
        ),
        className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
        Icon: () => <Image src="/sidebar/2.svg" alt="Trending Startups icon" width={50} height={50} />,
        name: "Trending Startups",
        description: "Search through all your files in one place.",
        href: "/",
        cta: "Learn more",
        background: (
            <Image
                width={200}
                height={200}
                src="/Bento/startup.svg"
                className="absolute -right-0 -top-0 opacity-90"
                alt="Decorative background for Trending Startups"
            />
        ),
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
        Icon: () => <Image src="/sidebar/5.svg" alt="Meta Wave icon" width={50} height={50} />,
        name: "Meta Wave",
        description: "Supports 100+ languages and counting.",
        href: "/",
        cta: "Learn more",
        background: (
            <Image
                width={200}
                height={200}
                src="/Bento/startup.svg"
                className="absolute -right-0 -top-0 opacity-90"
                alt="Decorative background for Meta Wave"
            />
        ),
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
        Icon: () => <Image src="/sidebar/6.svg" alt="Deep Dive Analysis icon" width={50} height={50} />,
        name: "Deep Dive Analysis",
        description: "Use the calendar to filter your files by date.",
        href: "/",
        cta: "Learn more",
        background: (
            <Image
                width={300}
                height={300}
                src="/Bento/startup.svg"
                className="absolute -right-0 -top-0 opacity-90"
                alt="Decorative background for Deep Dive Analysis"
            />
        ),
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
        Icon: () => <Image src="/sidebar/7.svg" alt="Reports icon" width={50} height={50} />,
        name: "Reports",
        description: "Get notified when someone shares a file or mentions you in a comment.",
        href: "/",
        cta: "Learn more",
        background: (
            <Image
                width={300}
                height={300}
                src="/Bento/startup.svg"
                className="absolute -right-0 -top-0 opacity-90"
                alt="Decorative background for Reports"
            />
        ),
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
];

export default function FeaturesSection() {
    return (
        <div className="flex flex-col items-center px-4 py-8 sm:px-6 md:px-10 lg:px-12">
            <h1 className="mb-4 text-center text-[28px] font-bold leading-tight sm:text-[32px] lg:text-[40px]">
                What&apos;s <span className="text-gradient">Exploding GPT?</span>
            </h1>
            <p className="mb-6 max-w-3xl text-center text-sm text-gray-500 sm:text-base">
                This section provides a breakdown of what the platform offers, highlighting its unique strengths in clear and relatable terms.
            </p>
            <BentoGrid className="my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3">
                {features.map((feature) => (
                    <BentoCard key={feature.name} {...feature} />
                ))}
            </BentoGrid>
        </div>
    );
}
