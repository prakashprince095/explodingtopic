import Image from 'next/image'

export default function ImageSection() {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <Image
              src="/placeholder.svg?height=800&width=800&text=Startup+Ecosystem"
              alt="Startup Ecosystem Visualization"
              width={800}
              height={800}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">The Global Startup Ecosystem</h2>
            <p className="text-lg mb-4">
              This image provides a comprehensive visualization of the current global startup ecosystem. It highlights the interconnectedness of various industries, the flow of capital, and the hotspots of innovation across different regions.
            </p>
            <p className="text-lg mb-4">
              Key elements depicted in the image include:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Major tech hubs and their specializations</li>
              <li>Emerging markets and their growth trajectories</li>
              <li>Cross-industry collaborations and convergence</li>
              <li>Investment trends and capital flow patterns</li>
              <li>Regulatory landscapes affecting startup growth</li>
            </ul>
            <p className="text-lg">
              Understanding this ecosystem is crucial for entrepreneurs, investors, and policymakers alike. It provides insights into where opportunities lie, potential challenges to overcome, and how different elements of the startup world interact and influence each other.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

