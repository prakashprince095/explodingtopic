import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChartCandlestick, Telescope, TrendingUpDown, DatabaseZap} from "lucide-react"

export default function RelatedTrends() {
  return (
    <section className="max-w-[1200px]  bg-background">
      <div className="flex flex-col gap-10 mx-auto">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl text-center mb-4">Related Trends</h2>
          <p className="text-lg mb-4 text-center text-gray-500">
            Show relevant market trends related to the selected startup.
          </p>
          <Button>
            <Link href=''>
              Try Exploding
            </Link>
          </Button>
        </div>
        <section className="border-[#D9D9D9] bg-[#FAFAFA] border-[1px] w-[1200px] p-7 flex flex-wrap justify-evenly items-start rounded-lg">
          <div className="flex flex-col items-start gap-3 max-w-[250px]">
            <ChartCandlestick className="h-9 w-9" />
            <h1 className="text-lg">In-Depth Analysis:</h1>
            <p>Dive into the trends shaping industries and emerging opportunities globally.</p>
          </div>
          <div className="flex flex-col items-start gap-3 max-w-[250px]">
            <Telescope className="h-9 w-9" />
            <h1 className="text-lg">Customized Discovery:</h1>
            <p>Explore trends by sector, geography, or timeframe to match your focus.</p>
          </div>
          <div className="flex flex-col items-start gap-3 max-w-[250px]">
            <TrendingUpDown className="h-9 w-9" />
            <h1 className="text-lg">Interactive Visuals:</h1>
            <p>Understand market shifts with intuitive graphs and comparative charts.</p>
          </div>
          <div className="flex flex-col items-start gap-3 max-w-[250px]">
          <DatabaseZap className="h-9 w-9" />
            <h1 className="text-lg">Data You Can Trust:</h1>
            <p>Insights powered by reputable sources and validated industry data.</p>
          </div>
        </section>
        <div className="border-[#D9D9D9]  bg-[#FAFAFA] border-[1px] w-full p-7 flex flex-col items-center rounded-lg">
          <Image
            src="/startups/R-Trends.svg"
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

