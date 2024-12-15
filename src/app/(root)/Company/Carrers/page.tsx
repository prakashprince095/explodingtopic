'use client'

import { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronRight, Briefcase, MapPin, DollarSign, Clock, Search, Users, Zap, Heart } from 'lucide-react'

interface JobOpening {
  id: number
  title: string
  department: string
  location: string
  type: string
  salary: string
  description: string
  responsibilities: string[]
  requirements: string[]
}

const jobOpenings: JobOpening[] = [
  {
    id: 1,
    title: "Senior UX Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    description: "We're looking for a Senior UX Designer to lead design initiatives and mentor junior designers.",
    responsibilities: [
      "Lead the design process from concept to implementation",
      "Conduct user research and usability testing",
      "Collaborate with product managers and engineers",
      "Mentor junior designers and contribute to design system"
    ],
    requirements: [
      "5+ years of experience in UX design",
      "Strong portfolio demonstrating complex problem-solving",
      "Proficiency in design tools (Figma, Sketch, Adobe XD)",
      "Excellent communication and presentation skills"
    ]
  },
  {
    id: 2,
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $130k",
    description: "Join our engineering team to build scalable web applications using modern technologies.",
    responsibilities: [
      "Develop and maintain web applications using React and Node.js",
      "Design and implement database schemas and APIs",
      "Collaborate with the design team to implement UI/UX improvements",
      "Participate in code reviews and contribute to best practices"
    ],
    requirements: [
      "3+ years of experience in full-stack development",
      "Proficiency in React, Node.js, and SQL/NoSQL databases",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Strong problem-solving and debugging skills"
    ]
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Product",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110k - $140k",
    description: "We're seeking a Product Manager to drive product strategy and work closely with cross-functional teams.",
    responsibilities: [
      "Define product vision, strategy, and roadmap",
      "Conduct market research and competitive analysis",
      "Work closely with engineering and design teams",
      "Analyze product metrics and make data-driven decisions"
    ],
    requirements: [
      "4+ years of experience in product management",
      "Strong analytical and problem-solving skills",
      "Excellent communication and stakeholder management abilities",
      "Experience with agile methodologies"
    ]
  },
  {
    id: 4,
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "$70k - $90k",
    description: "Join our marketing team to develop and execute innovative marketing campaigns.",
    responsibilities: [
      "Plan and execute multi-channel marketing campaigns",
      "Manage social media accounts and create engaging content",
      "Analyze campaign performance and optimize strategies",
      "Collaborate with design team on marketing materials"
    ],
    requirements: [
      "2+ years of experience in digital marketing",
      "Proficiency in social media platforms and analytics tools",
      "Strong writing and communication skills",
      "Experience with SEO and content marketing"
    ]
  },
  {
    id: 5,
    title: "Data Scientist",
    department: "Data",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $160k",
    description: "We're looking for a Data Scientist to analyze complex data sets and provide actionable insights.",
    responsibilities: [
      "Develop and implement machine learning models",
      "Analyze large datasets to extract meaningful insights",
      "Create data visualizations and reports for stakeholders",
      "Collaborate with engineering team to implement data-driven features"
    ],
    requirements: [
      "Master's or PhD in Computer Science, Statistics, or related field",
      "3+ years of experience in data science or machine learning",
      "Proficiency in Python, R, and SQL",
      "Experience with big data technologies (Hadoop, Spark)"
    ]
  },
  {
    id: 6,
    title: "Customer Success Manager",
    department: "Customer Support",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$80k - $100k",
    description: "Help our customers achieve their goals and ensure they have a great experience with our products.",
    responsibilities: [
      "Onboard new customers and provide ongoing support",
      "Develop and maintain strong relationships with key accounts",
      "Identify upsell and cross-sell opportunities",
      "Collaborate with product team to communicate customer feedback"
    ],
    requirements: [
      "3+ years of experience in customer success or account management",
      "Strong interpersonal and communication skills",
      "Experience with CRM software (e.g., Salesforce)",
      "Ability to understand and explain technical concepts to non-technical users"
    ]
  }
]

export default function EnhancedCareersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')

  const filteredJobs = jobOpenings.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedDepartment === 'all' || job.department === selectedDepartment)
  )


  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight">
          Join Our Team
          <span className="ml-2 inline-block animate-pulse">🚀</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover exciting opportunities and grow your career with us.
        </p>
      </div>

      {/* Featured Section */}
      <div className="mb-16">
        <div className="relative overflow-hidden rounded-lg">
          <div className="relative h-[500px] w-full">
            <Image
              src="/placeholder.svg?height=1000&width=1500"
              alt="Team collaboration"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
            <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
              <h2 className="mb-6 text-5xl font-bold">Why Work With Us?</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col items-center text-center">
                  <Users className="mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-xl font-semibold">Collaborative Culture</h3>
                  <p>Work with passionate individuals in a supportive environment.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Zap className="mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-xl font-semibold">Innovation-Driven</h3>
                  <p>Be at the forefront of technology and shape the future.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Heart className="mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-xl font-semibold">Work-Life Balance</h3>
                  <p>Flexible schedules and generous time-off policies.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <ChevronRight className="mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-xl font-semibold">Growth Opportunities</h3>
                  <p>Continuous learning and career advancement paths.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Culture Section */}
      <div className="mb-16">
        <h2 className="mb-8 text-3xl font-bold">Our Culture</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-bold">Innovation</h3>
              <p className="text-muted-foreground">We encourage creative thinking and embrace new ideas to solve complex problems.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-bold">Diversity & Inclusion</h3>
              <p className="text-muted-foreground">We celebrate diversity and create an inclusive environment where everyone feels valued.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-bold">Continuous Learning</h3>
              <p className="text-muted-foreground">We invest in our employees&apos; growth through training, workshops, and conference attendance.</p>
              </CardContent>
          </Card>
        </div>
      </div>

      {/* Employee Testimonials */}
      <div className="mb-16">
        <h2 className="mb-8 text-3xl font-bold">What Our Employees Say</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Employee 1"
                  width={64}
                  height={64}
                  className="mr-4 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold">Jane Doe</h3>
                  <p className="text-sm text-muted-foreground">Senior Developer</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">&quot;Working here has been an incredible journey. The supportive environment and challenging projects have helped me grow both personally and professionally.&quot;</p>
              </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Employee 2"
                  width={64}
                  height={64}
                  className="mr-4 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold">John Smith</h3>
                  <p className="text-sm text-muted-foreground">Product Manager</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">&quot;The collaborative culture here is unmatched. I&apos;ve had the opportunity to work with brilliant minds and create products that truly make a difference.&quot;</p>
              </CardContent>
          </Card>
        </div>
      </div>

      {/* Job Openings */}
      <div className="mb-16">
        <h2 className="mb-8 text-3xl font-bold">Open Positions</h2>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search jobs..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full sm:w-[200px]">
            <Label htmlFor="department">Department</Label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger id="department">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Data">Data</SelectItem>
                <SelectItem value="Customer Support">Customer Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="overflow-hidden">
              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-bold">{job.title}</h3>
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">{job.department}</Badge>
                  <Badge variant="outline">{job.type}</Badge>
                </div>
                <p className="mb-4 text-muted-foreground">{job.description}</p>
                <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {job.type}
                  </div>
                </div>
                <Accordion type="single" collapsible className="mb-4">
                  <AccordionItem value="responsibilities">
                    <AccordionTrigger>Responsibilities</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-inside list-disc">
                        {job.responsibilities.map((responsibility, index) => (
                          <li key={index}>{responsibility}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="requirements">
                    <AccordionTrigger>Requirements</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-inside list-disc">
                        {job.requirements.map((requirement, index) => (
                          <li key={index}>{requirement}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Button className="w-full">Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="rounded-lg bg-muted p-8 text-center">
      <h2 className="mb-4 text-3xl font-bold">Don&apos;t see the right fit?</h2>
      <p className="mb-6 text-lg text-muted-foreground">
      We&apos;re always looking for talented individuals to join our team. Send us your resume, and we&apos;ll keep you in mind for future opportunities.
      </p>
        <Button size="lg">
          Submit Your Resume
          <Briefcase className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

