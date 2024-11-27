import Image from 'next/image'

export default function ImageSection() {
  return (
    <section className="max-w-[1100px] ">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-8">
          <div className="bg-gray-100 w-full p-7 flex flex-col items-center rounded-lg">
            <h1 className='text-center text-[30px] mb-5'>Category Highlights <span className='text-gradient'>Top Categories for Trending Products</span></h1>
            <Image
              src="/products/1.svg"
              alt="Startup Ecosystem Visualization"
              width={800}
              height={650}
              className="rounded-lg shadow-sm"
            />
            <h1 className='text-center text-[24px] my-5'>Are you Enterprise?</h1>
            <p className='text-center text-[16px] mb-'>Get Unlimited access, Custom Support, Unlimited Reports →</p>
          </div>
          <div className="">
            <h2 className="text-2xl  mb-4">The Global Product Ecosystem</h2>
            <p className="text-md text-gray-500 mb-4">
              This visualization offers an in-depth look at the interconnected world of trending e-commerce products, highlighting consumer preferences and growth patterns across regions.
            </p>
            <p className="text-md text-gray-500 mb-4">
              Key elements depicted in the image include:
            </p>
            <ul className="list-disc list-inside text-gray-500 mb-4">
              <li>Category Leaders: Smart devices, sustainability solutions, and wearable tech</li>
              <li>Emerging Markets: Regions showing rapid adoption of trending products</li>
              <li>Consumer Insights: Key factors driving demand and repeat purchases</li>
              <li>Growth Trends: Products with rising popularity across diverse demographics</li>
            </ul>
            <p className="text-md text-gray-500">
              Understanding this ecosystem is essential for e-commerce professionals, enabling them to identify opportunities and adapt to shifting market dynamics.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

