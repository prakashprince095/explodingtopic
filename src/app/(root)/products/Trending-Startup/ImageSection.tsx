import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WalletCards, Command, TvMinimalPlay } from 'lucide-react'
import Image from "next/image"
export default function ImageSection() {
  return (
    <div className="max-w-[1280px]  p-6">
      <h1 className="text-2xl font-medium  mb-12 ">
        Why Exploading is the best tool for Organizations details
      </h1>
      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className=" border-[#D9D9D9] h-fit border-[1px] rounded-lg shadow-sm px-2 pt-2 shadow-[#808080]/25 ">
          <CardHeader>
            <WalletCards className="w-10 h-10 " />
            <CardTitle className="text-2xl font-medium">Details</CardTitle>
          </CardHeader>
          <CardContent className="px-3 text-zinc-600">
            <p>
              A logo bright, a name so bold, <br />
              With stories of when their journey told.
            </p>
          </CardContent>
          <div className="">
            <Image src='/startups/detail-box.svg' alt="" height={300} width={400} />
          </div>
        </div>

        <div className=" border-[#D9D9D9] h-fit border-[1px] rounded-lg shadow-sm px-2 pt-2 shadow-[#808080]/25 ">
          <CardHeader>
            <Command className="w-10 h-10 " />
            <CardTitle className="text-2xl font-medium">Key Indicators</CardTitle>
          </CardHeader>
          <CardContent className="px-3 text-zinc-600">
            <p>
              Growth and speed in colors shine, <br />
              Potential and forecast—metrics divine.
            </p>
          </CardContent>
          <div className="">
            <Image src='/startups/indicator-box.svg' alt="" height={300} width={400} />
          </div>
        </div>

        <div className=" border-[#D9D9D9] h-fit border-[1px] rounded-lg shadow-sm px-2 pt-2 shadow-[#808080]/25 ">
          <CardHeader>
            <TvMinimalPlay className="w-10 h-10 " />
            <CardTitle className="text-2xl font-medium">Channels</CardTitle>
          </CardHeader>
          <CardContent className="px-3 text-zinc-600">
            <p>
              Platforms they use, metrics they boast, <br />
              Engagement rates they love the most.
            </p>
          </CardContent>
          <div className="">
            <Image src='/startups/channel-box.svg' alt="" height={300} width={400} />
          </div>
        </div>
      </div>
    </div>
  )
}

