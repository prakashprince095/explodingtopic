import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function StartupSpotlight() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Global Startup Spotlight</h2>
        <div className="bg-muted p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <Image
              src="/placeholder.svg?height=200&width=200&text=GreenTech"
              alt="GreenTech Logo"
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
          <div className="md:w-2/3 md:pl-8">
            <h3 className="text-2xl font-semibold mb-4">GreenTech Innovations</h3>
            <p className="text-lg mb-4">
              Based in Stockholm, Sweden, GreenTech Innovations is revolutionizing the renewable energy sector with their cutting-edge wind turbine technology.
            </p>
            <p className="text-lg mb-6">
              Their patented design increases energy output by 40% compared to traditional turbines, making wind power more efficient and accessible globally.
            </p>
            <Button>Read Full Profile</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

