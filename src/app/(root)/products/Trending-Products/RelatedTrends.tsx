import Image from "next/image"

export default function RelatedTrends() {
  return (
    <section className="max-w-[1100px] bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl  mb-4">Trending Products</h2>
        <p className="text-md text-gray-500">
          Dive into the latest trends shaping the e-commerce industry. Explore how innovation, sustainability, and technology are influencing consumer preferences and transforming shopping experiences.
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

