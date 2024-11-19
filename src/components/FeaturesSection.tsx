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
      background: <Image width={50} height={50} src='/sidebar/1.svg' className="absolute -right-20 -top-20 opacity-60" alt="" />,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: () => <Image src='/sidebar/2.svg' alt='Full text search icon' width={50} height={50} />,
      name: "Trending Startups",
      description: "Search through all your files in one place.",
      href: "/",
      cta: "Learn more",
      background: <Image width={50} height={50} src='/sidebar/2.svg' className="absolute -right-20 -top-20 opacity-60" alt="" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: () => <Image src='/sidebar/5.svg' alt='Multilingual icon' width={50} height={50} />,
      name: "Meta Wave",
      description: "Supports 100+ languages and counting.",
      href: "/",
      cta: "Learn more",
      background: <Image width={50} height={50} src='/sidebar/3.svg' className="absolute -right-20 -top-20 opacity-60" alt="" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: () => <Image src='/sidebar/6.svg' alt='Calendar icon' width={50} height={50} />,
      name: "Deep Dive Analysis",
      description: "Use the calendar to filter your files by date.",
      href: "/",
      cta: "Learn more",
      background: <Image width={50} height={50} src='/sidebar/4.svg' className="absolute -right-20 -top-20 opacity-60" alt="" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: () => <Image src='/sidebar/7.svg' alt='Notifications icon' width={50} height={50} />,
      name: "Reports",
      description: "Get notified when someone shares a file or mentions you in a comment.",
      href: "/",
      cta: "Learn more",
      background: <Image width={50} height={50} src='/sidebar/5.svg' className="absolute -right-20 -top-20 opacity-60" alt="" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];

export default function FeaturesSection() {
    return (
        <div className="my-9 flex flex-col items-center">
            <h1 className="text-center mb-3 text-[50px]">Exploding is for Analysis</h1>
            <p className="max-w-[800px] text-center text-[20px] font-normal mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, odit voluptates. Non maiores neque nulla, dignissimos dolorum temporibus fugiat aliquid exercitationem tenetur aliquam eos sapiente quam aut, sequi fuga est.</p>
            <BentoGrid className="lg:grid-rows-3">
                {features.map((feature) => (
                    <BentoCard key={feature.name} {...feature} />
                ))}
            </BentoGrid>
        </div>
    );
}
