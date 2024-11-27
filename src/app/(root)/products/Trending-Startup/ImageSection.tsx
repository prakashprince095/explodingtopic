import Image from 'next/image'

export default function ImageSection() {
  return (
    <section className="max-w-[1100px] ">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-8">
          <div className="bg-gray-100 w-full p-7 flex flex-col items-center rounded-lg">
            <h1 className='text-center text-[30px] mb-5'>See the Visionaries <span className='text-gradient'>Behind the Startups</span></h1>
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
            <h2 className="text-2xl  mb-4">The Global Startup Ecosystem</h2>
            <p className="text-md text-gray-500 mb-4">
              This image provides a comprehensive visualization of the current global startup ecosystem. It highlights the interconnectedness of various industries, the flow of capital, and the hotspots of innovation across different regions.
            </p>
            <p className="text-md text-gray-500 mb-4">
              Key elements depicted in the image include:
            </p>
            <ul className="list-disc list-inside text-gray-500 mb-4">
              <li>Major tech hubs and their specializations</li>
              <li>Emerging markets and their growth trajectories</li>
              <li>Cross-industry collaborations and convergence</li>
              <li>Investment trends and capital flow patterns</li>
              <li>Regulatory landscapes affecting startup growth</li>
            </ul>
            <p className="text-md text-gray-500">
              Understanding this ecosystem is crucial for entrepreneurs, investors, and policymakers alike. It provides insights into where opportunities lie, potential challenges to overcome, and how different elements of the startup world interact and influence each other.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

