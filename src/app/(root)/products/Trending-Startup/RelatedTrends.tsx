import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChartCandlestick, Telescope, TrendingUpDown, DatabaseZap } from "lucide-react"
import { motion } from "framer-motion"
export default function RelatedTrends() {
  return (
    <motion.section className="max-w-[1200px]  bg-background"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }} >
      <div className="flex flex-col gap-10 mx-auto">
        <motion.div className="flex flex-col items-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }} >
          <h2 className="text-3xl text-center mb-4">Related Trends</h2>
          <p className="text-lg mb-4 text-center text-gray-500">
            Show relevant market trends related to the selected startup.
          </p>
          <Button>
            <Link href=''>
              Try Exploding
            </Link>
          </Button>
        </motion.div>
        <motion.div className="border-[#D9D9D9]  bg-[#FAFAFA] border-[1px] w-full p-7 flex flex-col items-center rounded-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }} >
          <Image
            src="/startups/R-Trends.svg"
            alt="Startup Ecosystem Visualization"
            width={1000}
            height={850}
            className="rounded-lg shadow-sm"
          />
        </motion.div>
        <motion.section className="border-[#D9D9D9] bg-[#FAFAFA] border-[1px] w-[1200px] p-3 flex flex-wrap justify-evenly items-start rounded-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }} >
          <div className="flex flex-col items-start gap-3 max-w-[250px]">
            <ChartCandlestick className="h-9 w-9" />
            <h1 className="text-lg">In-Depth Analysis:</h1>
            <p className="text-gray-500">Dive into the trends shaping industries and emerging opportunities globally.</p>
          </div>
          <div className="flex flex-col items-start gap-3 max-w-[250px]">
            <Telescope className="h-9 w-9" />
            <h1 className="text-lg">Customized Discovery:</h1>
            <p className="text-gray-500">Explore trends by sector, geography, or timeframe to match your focus.</p>
          </div>
          <div className="flex flex-col items-start gap-3 max-w-[250px]">
            <TrendingUpDown className="h-9 w-9" />
            <h1 className="text-lg">Interactive Visuals:</h1>
            <p className="text-gray-500">Understand market shifts with intuitive graphs and comparative charts.</p>
          </div>
          <div className="flex flex-col items-start gap-3 max-w-[250px]">
            <DatabaseZap className="h-9 w-9" />
            <h1 className="text-lg">Data You Can Trust:</h1>
            <p className="text-gray-500">Insights powered by reputable sources and validated industry data.</p>
          </div>
        </motion.section>
      </div>
    </motion.section>
  )
}

