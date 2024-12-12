import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChartCandlestick, ScanEye, TrendingUpDown, Asterisk } from "lucide-react"
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
          <p className="text-lg mb-4 max-w-[600px] text-center text-gray-500">
            Dive into the broader trends influencing the success of the product. Analyze market shifts, customer behaviors, and category growth.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Button>
              <Link href=''>
                Try Exploding
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        <motion.div className="border-[#D9D9D9]  bg-[#FAFAFA] border-[1px] w-full p-7 flex flex-col items-center rounded-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }} >
          <Image
            src="/products/2.svg"
            alt="Startup Ecosystem Visualization"
            width={1000}
            height={850}
            className="rounded-lg shadow-sm"
          />
        </motion.div>
        <motion.section className="border-[#D9D9D9] bg-[#FAFAFA] mx-4 lg:mx-0 border-[1px] gap-6 max-w-[1200px] p-7 flex flex-wrap items-center justify-between lg:items-start rounded-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }} >
          <div className="flex flex-col items-start gap-3 max-w-[250px]">
            <ChartCandlestick className="h-9 w-9" />
            <h1 className="text-lg">Market Movement Insights:</h1>
            <p className="text-gray-500">Understand the broader shifts driving demand for related product categories and emerging opportunities.</p>
          </div>
          <div className="flex flex-col items-start gap-3 max-w-[250px]">
            <ScanEye className="h-9 w-9" />
            <h1 className="text-lg">Seasonal Surges:</h1>
            <p className="text-gray-500">Track trends that spike during specific times or events, helping you anticipate future demand.</p>
          </div>
          <div className="flex flex-col items-start gap-3 max-w-[250px]">
            <TrendingUpDown className="h-9 w-9" />
            <h1 className="text-lg">Category-Wide Growth:</h1>
            <p className="text-gray-500">Analyze how entire categories are evolving, providing a bigger picture of product popularity.</p>
          </div>
          <div className="flex flex-col items-start gap-3 max-w-[250px]">
            <Asterisk className="h-9 w-9" />
            <h1 className="text-lg">Consumer Behavior Patterns:</h1>
            <p className="text-gray-500">Discover the preferences and behaviors influencing related product trends, enabling smarter decisions.</p>
          </div>
        </motion.section>
      </div>
    </motion.section>
  )
}

