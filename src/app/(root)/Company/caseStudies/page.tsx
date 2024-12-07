import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

interface CaseStudy {
  id: number
  title: string
  description: string
  client: string
  date: string
  image: string
  tags: string[]
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Revolutionizing E-commerce UX",
    description: "How we improved conversion rates by 40% through innovative design solutions.",
    client: "TechMart Inc.",
    date: "January 2024",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["E-commerce", "UX Design", "Conversion Optimization"]
  },
  {
    id: 2,
    title: "Streamlining Healthcare Operations",
    description: "Implementing an AI-driven system to reduce patient wait times and improve care quality.",
    client: "HealthFirst Network",
    date: "December 2023",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Healthcare", "AI", "Process Optimization"]
  },
  {
    id: 3,
    title: "Reimagining Urban Transportation",
    description: "Designing a sustainable and efficient public transit system for a growing metropolis.",
    client: "MetroCity Council",
    date: "November 2023",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Urban Planning", "Sustainability", "Transportation"]
  },
  {
    id: 4,
    title: "Transforming Financial Services",
    description: "Creating a user-friendly mobile banking app that increased customer engagement by 200%.",
    client: "GlobalBank",
    date: "October 2023",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["FinTech", "Mobile App", "User Engagement"]
  },
  {
    id: 5,
    title: "Elevating Online Education",
    description: "Developing an interactive learning platform that improved student performance and retention.",
    client: "EduTech Solutions",
    date: "September 2023",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["EdTech", "E-learning", "User Experience"]
  },
  {
    id: 6,
    title: "Optimizing Supply Chain Management",
    description: "Implementing blockchain technology to enhance transparency and efficiency in global logistics.",
    client: "LogiTech Global",
    date: "August 2023",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Supply Chain", "Blockchain", "Logistics"]
  }
]

export default function CaseStudiesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Our Case Studies
          <span className="ml-2 inline-block animate-pulse">📊</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore how we've helped businesses transform and succeed.
        </p>
      </div>

      {/* Featured Case Study */}
      <div className="mb-16">
        <Link href="#" className="group relative block overflow-hidden rounded-lg">
          <div className="relative h-[500px] w-full">
            <Image
              src="/placeholder.svg?height=1000&width=1500"
              alt="Featured Case Study"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
            <div className="absolute bottom-0 p-8 text-white">
              <p className="mb-2 text-sm">TechMart Inc. · January 2024</p>
              <h2 className="mb-2 text-4xl font-bold">Revolutionizing E-commerce UX</h2>
              <p className="mb-4 text-xl">
                How we improved conversion rates by 40% through innovative design solutions.
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-white/20 hover:bg-white/30">
                  E-commerce
                </Badge>
                <Badge variant="secondary" className="bg-white/20 hover:bg-white/30">
                  UX Design
                </Badge>
                <Badge variant="secondary" className="bg-white/20 hover:bg-white/30">
                  Conversion Optimization
                </Badge>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Case Studies Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.slice(1).map((study) => (
          <Link
            key={study.id}
            href="#"
            className="group block overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
          >
            <div className="relative h-56">
              <Image
                src={study.image}
                alt={study.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <p className="mb-2 text-sm text-muted-foreground">
                {study.client} · {study.date}
              </p>
              <h3 className="mb-2 text-xl font-bold tracking-tight">{study.title}</h3>
              <p className="mb-4 text-muted-foreground">{study.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {study.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" className="group">
                Read Case Study
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex items-center justify-center gap-2">
        <Button variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

