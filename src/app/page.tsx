"use client"; 

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth"; 
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { AnimatedBeamMultipleInputDemo } from "./pages/Data";
import Footer from "@/components/Footer";


// Declare reviews array first to avoid errors
const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

// Now you can use reviews to set firstRow and secondRow
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

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


export default function HomePage() {
  const { isAuthenticated, verfiySession } = useAuthStore();
  const router = useRouter();


  useEffect(() => {
    verfiySession();
    if (isAuthenticated) {
      router.push("/dashboard/insights-hub");
    }
  }, [isAuthenticated, router, verfiySession]);

  const globeConfig = {
    pointSize: 1,
    globeColor: "#1d072e",
    atmosphereColor: "#ffffff",
  };
  
  const data = [
    { order: 1, startLat: 37.7749, startLng: -122.4194, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3, color: "#ff6600" }
  ];
  

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="absolute inset-0 -z-50 h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:5rem_5rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_100%_100px,#4883EF,transparent)]"></div></div>
        <h1 className="text-[70px] text-center">Stay ahead by spotting trends <br /> before they ignite</h1>
        <Button>Get Started</Button>
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg ">
          <Marquee pauseOnHover className="[--duration:20s] ">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s] ">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r  dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l  dark:from-background"></div>
        </div>
        <div className="my-9 flex flex-col items-center">
          <h1 className="text-center mb-3 text-[50px]">Exploding is for Analysis</h1>
          <p className="max-w-[800px] text-center text-[20px] font-normal mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, odit voluptates. Non maiores neque nulla, dignissimos dolorum temporibus fugiat aliquid exercitationem tenetur aliquam eos sapiente quam aut, sequi fuga est.</p>
          <BentoGrid className="lg:grid-rows-3">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>
        <div className="mt-7 ">
          <h1 className="text-[50px] text-center">Our Data for Analytics</h1>
          <p className="max-w-[800px] text-center text-[20px] font-normal mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, odit voluptates. Non maiores neque nulla, dignissimos dolorum temporibus fugiat aliquid exercitationem tenetur aliquam eos sapiente quam aut, sequi fuga est.</p>
         <AnimatedBeamMultipleInputDemo />
        </div>
      </main>
      <Footer />
    </>
  );
}
