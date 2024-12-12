'use client';

import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Features from '../../product-discovery/Features';
interface CompanyData {
    name: string
    volume: number
    growth: number
    data: { year: string; value: number }[]
}

const defaultCompanies: CompanyData[] = [
    { name: 'AI', volume: 500, growth: 25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 50 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'Real-Estate', volume: 500, growth: -25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 50 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'Food', volume: 500, growth: 25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 50 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'Drinks', volume: 500, growth: -25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 50 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'Cars', volume: 500, growth: 25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 50 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'Automobiles', volume: 500, growth: -25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 50 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'Smart Phone', volume: 500, growth: 25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 50 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'Internet', volume: 500, growth: -25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 50 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'E-commerce', volume: 500, growth: 25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 50 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'Transport', volume: 500, growth: -25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 50 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },

];

export default function SubcategoryPage() {
    const params = useParams();
    const router = useRouter();
    const subcategory = params?.subcategory as string;

    const handleCompanyClick = (companyName: string) => {
        router.push(`/dashboard/insights-database/${subcategory}/${companyName}`);
    };

    if (!subcategory) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="p-4 md:p-6 min-h-screen bg-gray-50">
            <h1 className="text-lg md:text-2xl mb-2">{subcategory}</h1>
            <p className="mb-6 text-gray-500">Industry-wide trends and insights for {subcategory}.</p>
            <Features />
            <ScrollArea className="w-full mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-4">
                    {defaultCompanies.map((company) => (
                        <Card key={company.name} className="w-[300px] cursor-pointer hover:shadow-md transition" onClick={() => handleCompanyClick(company.name)}>
                            <CardHeader>
                                <div className="flex items-start gap-2">
                                    <div className="bg-white rounded-md shadow-md h-[60px] border w-[80px]"></div>
                                    <div className="w-full">
                                        <CardTitle className="font-normal text-[18px]">{company.name}</CardTitle>
                                        <div className="bg-black text-white justify-self-end px-2 py-1 text-[12px] rounded-full w-fit">
                                            Volume: {company.volume}
                                        </div>
                                    </div>
                                </div>
                                <CardDescription className={`${company.growth > 0 ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
                                    } font-medium w-fit py-1 px-2 rounded-full`}>
                                    Growth:{" "}
                                    <span>
                                        {company.growth}%
                                    </span>
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <ChartContainer config={{ value: { label: "Growth", color: "hsl(var(--primary))", }, }} className="h-[150px]">
                                    <LineChart
                                        width={300}
                                        height={200}
                                        data={company.data}
                                        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                                    >
                                        <defs>
                                            <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.8} />
                                                <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid stroke="#f5f5f5" />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Line
                                            type="monotone"
                                            dataKey="value" // Correct dataKey
                                            stroke="hsl(217, 91%, 60%)"
                                            fillOpacity={1}
                                            fill="url(#colorDesktop)"
                                            strokeWidth={2}
                                            dot={{ r: 4, fill: "hsl(217, 91%, 60%)" }}
                                        />
                                    </LineChart>

                                </ChartContainer>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}

