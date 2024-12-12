'use client'

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WalletCards, Command, TvMinimalPlay } from 'lucide-react'
import Image from "next/image"
import { motion } from "framer-motion";

export default function ImageSection() {
  return (
    <motion.div
      className="max-w-[1280px]  p-6"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}>
      <h1 className="text-2xl font-medium  mb-12 ">
        Why Exploading is the best tool for Organizations details
      </h1>
      
      <div className="flex flex-wrap items-center justify-center gap-6 max-w-7xl mx-auto">
        <motion.div className=" border-[#D9D9D9]  h-fit  bg-[#FAFAFA] border-[1px] rounded-lg shadow-sm px-2 pt-2 shadow-[#808080]/25 " initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}>
          <CardHeader>
            <WalletCards className="w-8 h-8 " />
            <CardTitle className="text-xl font-medium">Details</CardTitle>
          </CardHeader>
          <CardContent className="px-3 text-zinc-600">
            <p>
              A logo bright, a name so bold, <br />
              With stories of when their journey told.
            </p>
          </CardContent>
          <div className="">
            <Image src='/startups/detail-box.svg' alt="" height={350} width={350} />
          </div>
        </motion.div>

        <motion.div className=" border-[#D9D9D9]  h-fit bg-[#FAFAFA] border-[1px] rounded-lg shadow-sm px-2 pt-2 shadow-[#808080]/25 " initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}>
          <CardHeader>
            <Command className="w-8 h-8 " />
            <CardTitle className="text-xl font-medium">Key Indicators</CardTitle>
          </CardHeader>
          <CardContent className="px-3 text-zinc-600">
            <p>
              Growth and speed in colors shine, <br />
              Potential and forecast—metrics divine.
            </p>
          </CardContent>
          <div className="">
            <Image src='/startups/indicator-box.svg' alt="" height={350} width={350} />
          </div>
        </motion.div>

        <motion.div className=" border-[#D9D9D9]  h-fit bg-[#FAFAFA] border-[1px] rounded-lg shadow-sm px-2 pt-2 shadow-[#808080]/25 " initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}>
          <CardHeader>
            <TvMinimalPlay className="w-8 h-8 " />
            <CardTitle className="text-xl font-medium">Channels</CardTitle>
          </CardHeader>
          <CardContent className="px-3 text-zinc-600">
            <p>
              Platforms they use, metrics they boast, <br />
              Engagement rates they love the most.
            </p>
          </CardContent>
          <div className="">
            <Image src='/startups/channel-box.svg' alt="" height={350} width={350} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

