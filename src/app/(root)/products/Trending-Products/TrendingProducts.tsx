
'use client'

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Share2, Link } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const products = [
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

export default function TrendingProduts() {
    return (
        <section className="py-16 flex flex-col items-center">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl  tracking-tight mb-4">
                        Trending Products
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Discover innovative products transforming the way we live, work, and interact. These cutting-edge solutions are addressing global challenges and redefining possibilities.
                    </p>
                </div>
                <div className="flex items-center justify-center gap-5 my-5">
                    {products.map((product) => (
                        <Card key={product.name} className="w-[350px] h-[450px]">
                            <CardHeader className="">
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-full ">
                                        <img
                                            src={product.logo}
                                            alt={`${product.name} logo`}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <h3 className=" text-[14px]">{product.name}</h3>
                                        <div>
                                            <Badge variant="secondary" className="bg-black text-white hover:bg-black/90">
                                                Funding: {product.funding}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm mt-3 text-muted-foreground">{product.description}</p>
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
                                            Volume: {product.volume}
                                        </Badge>
                                    </section>
                                </div>
                            </CardHeader>
                            <div className="flex items-center  border mx-5 rounded-lg justify-between">
                                <CardContent className=" h-[250px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={product.chartData}>
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
                <section className="max-w-[1100px] ">
                    <h1 className="text-xl mb-4 font-medium">
                        Our platform is designed to bring you unparalleled insights into the world of trending e-commerce products. From real-time tracking to advanced analytics, we provide the tools you need to stay ahead in a competitive market.
                    </h1>
                    <p className="text-gray-800">
                        Gain in-depth information on each trending product, including key features, popularity metrics, and sales performance. Our platform organizes product data into easy-to-read formats, helping users make informed decisions quickly.
                    </p>
                    <p className="text-gray-800">
                        Stay on top of market trends with live updates on product performance and consumer interest. Whether it’s a sudden surge in demand or consistent growth, our system ensures you’re always in the loop.
                    </p>
                    <p className="text-gray-800">
                        Our intuitive dashboard presents product data in visually engaging charts, graphs, and comparisons. This makes it easy to identify patterns and uncover insights at a glance..
                    </p>
                    <p className="text-gray-800">
                        Explore products across various categories tailored to your preferences. Whether you’re interested in smart technology, sustainable goods, or lifestyle essentials, our system categorizes products to match your needs.
                    </p>
                    <p className="text-gray-800">
                        Discover the why behind the trends. Our platform leverages advanced analytics to explain what drives product popularity, helping you understand consumer behavior and market dynamics.
                    </p>
                    <p className="text-gray-800">
                        Quickly find specific products using advanced search filters and bookmark your favorites for easy access. These features are designed to streamline your exploration and keep your focus on what matters most.
                    </p>

                </section>
            </div>
        </section>
    )
}

