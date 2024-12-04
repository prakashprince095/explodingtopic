"use client";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import Image from "next/image";

const features = [
    {
      Icon: () => <Image src='/sidebar/3.svg' alt='Save your files icon' width={50} height={50} />,
      name: "Trending Products",
      description: "We automatically save your files as you type.",
      href: "/",
      cta: "Learn more",
      background: <Image width={300} height={300} src='/Bento/startup.svg' className="absolute -right-0 -top-0 opacity-90" alt="" />,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: () => <Image src='/sidebar/2.svg' alt='Full text search icon' width={50} height={50} />,
      name: "Trending Startups",
      description: "Search through all your files in one place.",
      href: "/",
      cta: "Learn more",
      background: <Image width={200} height={200} src='/Bento/startup.svg' className="absolute  -right-0 -top-0 opacity-90" alt="" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: () => <Image src='/sidebar/5.svg' alt='Multilingual icon' width={50} height={50} />,
      name: "Meta Wave",
      description: "Supports 100+ languages and counting.",
      href: "/",
      cta: "Learn more",
      background: <Image width={200} height={200} src='/Bento/startup.svg' className="absolute  -right-0 -top-0 opacity-90" alt="" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: () => <Image src='/sidebar/6.svg' alt='Calendar icon' width={50} height={50} />,
      name: "Deep Dive Analysis",
      description: "Use the calendar to filter your files by date.",
      href: "/",
      cta: "Learn more",
      background: <Image width={300} height={300} src='/Bento/startup.svg' className="absolute  -right-0 -top-0 opacity-90" alt="" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: () => <Image src='/sidebar/7.svg' alt='Notifications icon' width={50} height={50} />,
      name: "Reports",
      description: "Get notified when someone shares a file or mentions you in a comment.",
      href: "/",
      cta: "Learn more",
      background: <Image width={300} height={300} src='/Bento/startup.svg' className="absolute  -right-0 -top-0 opacity-90" alt="" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];

export default function FeaturesSection() {
    return (
        <div className=" flex flex-col items-center ">
            <h1 className="text-center mb-3 text-[40px]">What&apos;s is <span className="text-gradient"> Exploding GPT?</span></h1>
            <p className="max-w-[800px] text-gray-500 text-center text-[16px] font-normal mb-5">This section provides a breakdown of what the platform offers, highlighting its unique strengths in clear and relatable terms.</p>
            <BentoGrid className="lg:grid-rows-3 my-6">
                {features.map((feature) => (
                    <BentoCard key={feature.name} {...feature} />
                ))}
            </BentoGrid>
        </div>
    );
}
