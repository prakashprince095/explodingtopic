import Image from "next/image"

export default function RelatedTrends() {
  return (
    <section className="max-w-[1100px] bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl  mb-4">Related Trends</h2>
        <p className="text-md text-gray-500">
          Explore the cutting-edge trends that are shaping the future of technology and business. These emerging fields are creating new opportunities and transforming industries.
        </p>
        <div className="bg-gray-100 w-full p-7 flex flex-col items-center rounded-lg">
        <Image
              src="/products/2.svg"
              alt="Startup Ecosystem Visualization"
              width={800}
              height={650}
              className="rounded-lg shadow-sm"
            />
        </div>
      </div>
    </section>
  )
}

