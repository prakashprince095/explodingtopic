import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  description: string
  author: string
  date: string
  image: string
  tags: string[]
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Migrating to Linear 101",
    description: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
    author: "Prashant Bhatt",
    date: "05 Jan 2024",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Product", "Tools", "Tech"]
  },
  {
    id: 2,
    title: "Building your API Stack",
    description: "The complete guide to building a robust API infrastructure.",
    author: "Lisa Miller",
    date: "03 Jan 2024",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Software Development", "Tech"]
  },
  {
    id: 3,
    title: "Bill Walsh leadership",
    description: "A deep dive into the mindset of transforming a 2-14 team into a Super Bowl winning dynasty.",
    author: "Alex Wilson",
    date: "01 Jan 2024",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Design", "Leadership"]
  },
  {
    id: 4,
    title: "PM mental models",
    description: "Mental models help you solve problems and make better decisions.",
    author: "David Peterson",
    date: "29 Dec 2023",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Product", "Strategy", "Framework"]
  },
  {
    id: 5,
    title: "What is Wireframing?",
    description: "Introduction to Wireframing and its Principles plus helpful tips.",
    author: "Caroline Wu",
    date: "28 Dec 2023",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Design", "Research"]
  },
  {
    id: 6,
    title: "How collaboration makes us better designers",
    description: "Collaboration can make our teams stronger and our individual designs better.",
    author: "Rachel Craig",
    date: "26 Dec 2023",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Design", "Research"]
  }
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Writings from our team
          <span className="ml-2 inline-block animate-pulse">✍️</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          The latest industry news, interviews, technologies, and resources.
        </p>
      </div>

      {/* Featured Post */}
      <div className="mb-16">
        <Link href="#" className="group relative block overflow-hidden rounded-lg">
          <div className="relative h-[400px] w-full">
            <Image
              src="/placeholder.svg?height=800&width=1200"
              alt="UX review presentations"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            <div className="absolute bottom-0 p-6 text-white">
              <p className="mb-2 text-sm">David Chen · 10 Jan 2024</p>
              <h2 className="mb-2 text-3xl font-bold">UX review presentations</h2>
              <p className="mb-4 text-lg">
                How do you create compelling presentations that wow your colleagues and impress your managers?
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-white/20 hover:bg-white/30">
                  Design
                </Badge>
                <Badge variant="secondary" className="bg-white/20 hover:bg-white/30">
                  Research
                </Badge>
                <Badge variant="secondary" className="bg-white/20 hover:bg-white/30">
                  Presentation
                </Badge>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            href="#"
            className="group block overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
          >
            <div className="relative h-48">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <p className="mb-2 text-sm text-muted-foreground">
                {post.author} · {post.date}
              </p>
              <h3 className="mb-2 text-xl font-bold tracking-tight">{post.title}</h3>
              <p className="mb-4 text-muted-foreground">{post.description}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
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
        <Button variant="outline" size="sm">
          4
        </Button>
        <Button variant="outline" size="sm">
          5
        </Button>
        <Button variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

