"use client"; // Ensure this is a client-side component

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth"; // Assuming you're using Zustand for auth
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
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


export default function HomePage() {
  const { isAuthenticated, verfiySession } = useAuthStore();
  const router = useRouter();


  useEffect(() => {
    verfiySession();
    if (isAuthenticated) {
      router.push("/dashboard/insights-hub");
    }
  }, [isAuthenticated, router, verfiySession]);

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
      <div className="mt-8">

      </div>
    </main>
    </>
  );
}
