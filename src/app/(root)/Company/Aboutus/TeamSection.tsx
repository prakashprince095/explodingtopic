import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TeamSection() {
  const team = [
    {
      name: "Dr. Jane Smith",
      role: "Chief Data Scientist",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "With over 15 years of experience in machine learning and AI, Dr. Smith leads our data science initiatives."
    },
    {
      name: "John Doe",
      role: "Head of Analytics",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "John's expertise in business intelligence helps our clients turn data into strategic decisions."
    },
    {
      name: "Emily Chen",
      role: "Senior Data Engineer",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Emily ensures our data infrastructure is robust, scalable, and secure."
    },
    {
      name: "Michael Johnson",
      role: "UX Research Lead",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Michael bridges the gap between data insights and user-centric design."
    }
  ]

  return (
    <section className="flex mt-7 flex-col items-center">
      <div className="container px-4 md:px-6">
        <h1 className="text-3xl text-center mb-4">Our Team</h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 text-center mx-auto mb-12">
          Our diverse team of data scientists, analysts, and industry experts work together to deliver unparalleled insights.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card key={index}>
              <CardHeader>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
                <CardTitle className="text-center mt-4">{member.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-2">{member.role}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

