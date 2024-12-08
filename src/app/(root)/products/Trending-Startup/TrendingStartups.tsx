
'use client'

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Share2, Link } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import Image from "next/image"
const startups = [
    {
        name: "OpenAI",
        description: "Leading AI technology and chatbots",
        funding: "$100B",
        volume: "500K",
        logo: "/placeholder.svg?height=40&width=40",
        chartData: [
            { name: "Jan", value: 30 },
            { name: "Feb", value: 45 },
            { name: "Mar", value: 35 },
            { name: "Apr", value: 20 },
            { name: "May", value: 35 },
            { name: "Jun", value: 30 },
        ]
    },
    {
        name: "GreenTech Solutions",
        description: "Revolutionizing renewable energy storage",
        funding: "$50M",
        volume: "200K",
        logo: "/placeholder.svg?height=40&width=40",
        chartData: [
            { name: "Jan", value: 20 },
            { name: "Feb", value: 35 },
            { name: "Mar", value: 40 },
            { name: "Apr", value: 30 },
            { name: "May", value: 45 },
            { name: "Jun", value: 40 },
        ]
    },
    {
        name: "HealthAI",
        description: "AI-powered disease detection platform",
        funding: "$75M",
        volume: "350K",
        logo: "/placeholder.svg?height=40&width=40",
        chartData: [
            { name: "Jan", value: 25 },
            { name: "Feb", value: 30 },
            { name: "Mar", value: 45 },
            { name: "Apr", value: 35 },
            { name: "May", value: 40 },
            { name: "Jun", value: 35 },
        ]
    },
]

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
                <div className="bg-[#F6F5F4] max-w-[1280px] p-10 flex items-center justify-center gap-5 my-5">
                    {startups.map((startup) => (
                        <Card key={startup.name} className="w-[350px] h-[400px]">
                            <CardHeader className="">
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-full ">
                                        <Image
                                            src={startup.logo}
                                            alt={`${startup.name} logo`}
                                            width={25}
                                            height={25}
                                        />
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <h3 className=" text-[14px]">{startup.name}</h3>
                                        <div>
                                            <Badge variant="secondary" className="bg-black text-white hover:bg-black/90">
                                                Funding: {startup.funding}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm mt-3 text-muted-foreground">{startup.description}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <section className="flex items-center space-x-3">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Bookmark className="h-4 w-4" />
                                            <span className="sr-only">Bookmark</span>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Share2 className="h-4 w-4" />
                                            <span className="sr-only">Share</span>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Link className="h-4 w-4" />
                                            <span className="sr-only">Link</span>
                                        </Button>
                                    </section>
                                    <section className="">
                                        <Badge variant="secondary" className="ml-auto bg-red-100 text-red-600 hover:bg-red-100/90">
                                            Volume: {startup.volume}
                                        </Badge>
                                    </section>
                                </div>
                            </CardHeader>
                            <div className="flex items-center  border mx-5 rounded-lg justify-between">
                                <CardContent className=" h-[250px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={startup.chartData}>
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#2563eb"
                                                strokeWidth={2}
                                                dot={{ r: 4, fill: "#2563eb" }}
                                            />
                                            <XAxis
                                                dataKey="name"
                                                stroke="#888888"
                                                fontSize={9}
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                stroke="#888888"
                                                fontSize={9}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => `${value}K`}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="my-[30px] flex flex-col items-center">
                    <h1 className="text-center max-w-[500px] text-[30px]">See your biggest organization data in Exploding</h1>
                </div>
                <section className=" ">
                    <h1 className="text-xl mb-4 font-medium">
                        Discover the most innovative startups that are shaping the future of technology and business. These companies are at the forefront of their industries, developing groundbreaking solutions to some of the world&apos;s most pressing challenges.
                    </h1>
                    <p className="text-gray-800">
                        The startup ecosystem is constantly evolving, with new players emerging and established ones pivoting to meet changing market demands. In today&apos;s fast-paced business environment, staying informed about the latest trends and innovations is crucial for entrepreneurs, investors, and industry professionals alike.
                    </p>
                    <p className="text-gray-800">
                        In the healthcare industry, HealthAI is leveraging the power of artificial intelligence to revolutionize patient care. Their advanced algorithms are capable of analyzing vast amounts of medical data to detect patterns and anomalies that might be missed by human practitioners. This technology has the potential to significantly improve early diagnosis rates and treatment outcomes, ultimately saving lives and reducing healthcare costs.
                    </p>
                    <p className="text-gray-800">
                        FinRevolution is disrupting the financial services industry by harnessing the power of blockchain technology. Their platform is making complex financial instruments and services accessible to a broader audience, potentially democratizing access to wealth-building opportunities. By using smart contracts, FinRevolution is also increasing transparency and reducing the costs associated with traditional financial transactions.
                    </p>
                    <p className="text-gray-800">
                        These startups represent just a fraction of the innovation happening across various industries. From artificial intelligence and machine learning to biotechnology and space exploration, entrepreneurs are pushing the boundaries of what&apos;s possible. They&apos;re not just creating new products and services; they&apos;re reshaping entire industries and challenging established norms.
                    </p>
                </section>
            </div>
        </section>
    )
}

