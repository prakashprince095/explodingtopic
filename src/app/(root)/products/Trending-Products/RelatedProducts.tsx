

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Star, Cable, TrendingUpDown, ThumbsUp } from "lucide-react"
import { motion } from 'framer-motion'

export default function RelatedProducts() {
    return (
        <motion.div
            className="max-w-[1200px]  bg-background"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}>
            <div className="flex flex-col gap-10 mx-auto">
                <motion.div className="flex flex-col items-center"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}>
                    <h2 className="text-3xl text-center mb-4">Related Products</h2>
                    <p className="text-lg mb-4 text-center text-gray-500">
                        If one product has caught your eye, discover others with similar popularity, style, or demand patterns.
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
                <motion.section className="border-[#D9D9D9] mx-4 lg:mx-0 bg-[#FAFAFA] border-[1px] gap-6 max-w-[1200px] p-7 flex flex-wrap items-center justify-between lg:items-start rounded-lg"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}>
                    <div className="flex flex-col items-start gap-3 max-w-[250px]">
                        <Star className="h-9 w-9" />
                        <h1 className="text-lg">Discover Favorites:</h1>
                        <p className="text-gray-500 text-sm">Unearth products that share popularity, style, or demand, offering you a broader view of market trends.</p>
                    </div>
                    <div className="flex flex-col items-start gap-3 max-w-[250px]">
                        <Cable className="h-9 w-9" />
                        <h1 className="text-lg">Category Connections:</h1>
                        <p className="text-gray-500 text-sm">Explore products tied by category or purpose, ensuring you never miss what’s trending in related spaces.</p>
                    </div>
                    <div className="flex flex-col items-start gap-3 max-w-[250px]">
                        <TrendingUpDown className="h-9 w-9" />
                        <h1 className="text-lg">Growth in Similar Paths:</h1>
                        <p className="text-gray-500 text-sm">Highlight products showing comparable growth rates or sales patterns, helping you identify parallel successes.</p>
                    </div>
                    <div className="flex flex-col items-start gap-3 max-w-[250px]">
                        <ThumbsUp className="h-9 w-9" />
                        <h1 className="text-lg">Customer-Liked Alternatives:</h1>
                        <p className="text-gray-500 text-sm">See products often purchased together or preferred as alternatives by similar audiences.</p>
                    </div>
                </motion.section>
                <motion.div className="border-[#D9D9D9]  bg-[#FAFAFA] border-[1px] w-full p-7 flex flex-col items-center rounded-lg"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}>
                    <Image
                        src="/products/1.svg"
                        alt="Startup Ecosystem Visualization"
                        width={1000}
                        height={850}
                        className="rounded-lg shadow-sm"
                    />
                </motion.div>
            </div>
        </motion.div>
    )
}

