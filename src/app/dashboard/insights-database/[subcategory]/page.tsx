'use client';

import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface CompanyData {
    name: string
    volume: number
    growth: number
    data: { year: string; value: number }[]
}

const defaultCompanies: CompanyData[] = [
    { name: 'CompanyA', volume: 500, growth: 25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 150 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'CompanyB', volume: 500, growth: 25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 150 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'CompanyC', volume: 500, growth: 25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 150 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'CompanyD', volume: 500, growth: 25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 150 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'CompanyE', volume: 500, growth: 25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 150 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'CompanyF', volume: 500, growth: 25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 150 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'CompanyG', volume: 500, growth: 25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 150 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'CompanyH', volume: 500, growth: 25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 150 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'CompanyI', volume: 500, growth: 25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 150 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },
    { name: 'CompanyJ', volume: 500, growth: 25, data: [{ year: '2020', value: 50 }, { year: '2021', value: 100 }, { year: '2022', value: 150 }, { year: '2023', value: 200 }, { year: '2024', value: 250 },] },

];

export default function SubcategoryPage() {
    const params = useParams()
    const router = useRouter()
    const subcategory = params?.subcategory as string

    const handleCompanyClick = (companyName: string) => {
        router.push(`/dashboard/insights-database/${subcategory}/${companyName}`)
    }

    if (!subcategory) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>
    }

    return (
        <div className="p-4 md:p-6 min-h-screen bg-background">
            <h1 className="text-lg md:text-xl  mb-2">{subcategory} Insights</h1>
            <p className="mb-6 text-muted-foreground">Industry-wide trends and insights for {subcategory}.</p>

            <ScrollArea className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-4">
                    {defaultCompanies.map((company) => (
                        <Card
                            key={company.name}
                            className="cursor-pointer transition-shadow hover:shadow-lg"
                            onClick={() => handleCompanyClick(company.name)}
                        >
                            <CardHeader>
                                <CardTitle className='font-normal text-md'>{company.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Volume: {company.volume} | Growth: {company.growth}%
                                </p>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        value: {
                                            label: "Growth",
                                            color: "hsl(var(--primary))",
                                        },
                                    }}
                                    className="h-[100px]"
                                >
                                    <LineChart
                                        data={company.data}
                                        margin={{ left: 12, right: 12 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip content={<ChartTooltipContent />} />
                                        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>


                        </Card>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

