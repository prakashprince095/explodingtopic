

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookCheck, Telescope, TrendingUpDown, Globe } from "lucide-react"
export default function Relatedstartups() {
    return (
        <section className="max-w-[1200px]  bg-background">
            <div className="flex flex-col gap-10 mx-auto">
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl text-center mb-4">Related Startups</h2>
                    <p className="text-lg mb-4 text-center text-gray-500">
                        Suggest other startups similar to the selected organization.
                    </p>
                    <Button>
                        <Link href=''>
                            Try Exploding
                        </Link>
                    </Button>
                </div>
                <section className="border-[#D9D9D9] bg-[#FAFAFA] border-[1px] w-[1200px] p-7 flex flex-wrap justify-evenly items-start rounded-lg">
                    <div className="flex flex-col items-start gap-3 max-w-[250px]">
                        <BookCheck className="h-9 w-9" />
                        <h1 className="text-lg">Comprehensive Insights:</h1>
                        <p>Access detailed data on funding, growth, and trends to uncover opportunities.</p>
                    </div>
                    <div className="flex flex-col items-start gap-3 max-w-[250px]">
                        <Telescope className="h-9 w-9" />
                        <h1 className="text-lg">Personalized Exploration:</h1>
                        <p>Use filters to find startups by industry, region, or funding stage.</p>
                    </div>
                    <div className="flex flex-col items-start gap-3 max-w-[250px]">
                        <TrendingUpDown className="h-9 w-9" />
                        <h1 className="text-lg">Visualized Trends:</h1>
                        <p>Track performance with interactive graphs and easy-to-read metrics.</p>
                    </div>
                    <div className="flex flex-col items-start gap-3 max-w-[250px]">
                        <Globe className="h-9 w-9" />
                        <h1 className="text-lg">Trusted by Leaders:</h1>
                        <p>Rely on insights backed by top global brands.</p>
                    </div>
                </section>
                <div className="border-[#D9D9D9]  bg-[#FAFAFA] border-[1px] w-full p-7 flex flex-col items-center rounded-lg">
                    <Image
                        src="/startups/R-startups.svg"
                        alt="Startup Ecosystem Visualization"
                        width={1000}
                        height={850}
                        className="rounded-lg shadow-sm"
                    />
                </div>
            </div>
        </section>
    )
}

