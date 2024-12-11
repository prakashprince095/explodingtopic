
'use client'

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoveRight } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import Image from "next/image"
import StartupsCards from "./StartupCards"
import Link from "next/link"

export default function TrendingStartups() {
    return (
        <section className="max-w-[1280px] flex flex-col items-center">
            <div className="container mx-auto px-4">
                {/* <div className="max-w-2xl mx-auto text-center mb-12">
                    <h2 className="text-3xl  tracking-tight mb-4">
                        Trending Startups
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Discover innovative startups shaping the future of technology and business.
                        These companies are developing groundbreaking solutions to global challenges.
                    </p>
                </div> */}
                <div className="border-[#D9D9D9]   bg-[#FAFAFA] border-[1px] rounded-lg max-w-[1280px] p-10 flex flex-col items-center justify-center gap-5 my-5">
                    <h1 className="text-center font-medium text-[28px]">Discover the leading startups at a glance </h1>
                    <p className="max-w-[700px] text-center text-md mb-4 text-gray-600 font-medium">Each card reveals key insights like funding, growth trends, and location, offering a snapshot of innovation to help you explore opportunities effortlessly.</p>
                    <StartupsCards />
                    <Button><Link href='/register' className="flex items-center gap-2"><span>See More Trends</span> <MoveRight className="h-10 w-10" /></Link></Button>
                </div>
                <div className="mt-36 mb-10 flex flex-col items-center">
                    <h1 className="text-center border-b pb-10 max-w-[500px] font-medium text-[28px]">See your favourite organizations data in Exploding</h1>
                    <div className='flex border-b gap-14 max-w-[1200px] py-8 flex-wrap items-center justify-center'>
                        <Image src='/landing/Trusted-1.svg' alt='' height={100} width={100} />
                        <Image src='/landing/Trusted-2.svg' alt='' height={100} width={100} />
                        <Image src='/landing/Trusted-3.svg' alt='' height={100} width={100} />
                        <Image src='/landing/Trusted-4.svg' alt='' height={100} width={100} />
                        <Image src='/landing/Trusted-5.svg' alt='' height={100} width={100} />
                        <Image src='/landing/Trusted-6.svg' alt='' height={100} width={100} />
                        <Image src='/landing/Trusted-7.svg' alt='' height={100} width={100} />
                        <Image src='/landing/Trusted-1.svg' alt='' height={100} width={100} />
                        <Image src='/landing/Trusted-2.svg' alt='' height={100} width={100} />
                        <Image src='/landing/Trusted-3.svg' alt='' height={100} width={100} />
                        <Image src='/landing/Trusted-4.svg' alt='' height={100} width={100} />
                        <Image src='/landing/Trusted-5.svg' alt='' height={100} width={100} />
                        <Image src='/landing/Trusted-6.svg' alt='' height={100} width={100} />
                        <Image src='/landing/Trusted-7.svg' alt='' height={100} width={100} />
                    </div>
                </div>
                <section className=" max-w-[400px] ">
                    <h1 className="text-2xl  font-medium">Discover every part of your niche related startup:</h1>
                    <h2 className="text-md mb-4 text-gray-600 font-medium">
                        Discover the most innovative startups that are shaping the future of technology and business. These companies are at the forefront of their industries, developing groundbreaking solutions to some of the world&apos;s most pressing challenges.
                    </h2>
                    
                </section>
            </div>
        </section>
    )
}

