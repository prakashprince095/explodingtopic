"use client"

import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThumbsUp, ThumbsDown, Clock, CreditCard, Settings, FolderOpen, Database, Smartphone, Globe, HelpCircle, Mail, Users, BarChart, Layout } from 'lucide-react'

const faqData = {
  general: [
    {
      question: "What is this platform, and how does it work?",
      answer: "Our platform provides real-time insights into trending startups and products. Users can track industry innovations, save favorites, and analyze trends to make data-driven decisions.",
      icon: HelpCircle
    },
    {
      question: "Who can benefit from using this platform?",
      answer: "Entrepreneurs, investors, marketers, and e-commerce professionals looking to stay updated on industry trends, analyze data, and discover new opportunities.",
      icon: Users
    },
    {
      question: "Is this platform available worldwide?",
      answer: "Yes, our platform is accessible globally, providing insights into startups and products across various industries and regions.",
      icon: Globe
    },
    {
      question: "How frequently is the data updated?",
      answer: "Data on our platform is updated in real-time to ensure you have the latest and most accurate information.",
      icon: Clock
    },
    {
      question: "Can I access the platform on mobile devices?",
      answer: "Yes, the platform is fully optimized for desktops, tablets, and smartphones, ensuring seamless access wherever you are.",
      icon: Smartphone
    }
  ],
  pricing: [
    {
      question: "What subscription plans are available?",
      answer: "We offer three plans: Free (Basic access to data and bookmarking tools), Pro (Advanced analytics and unlimited saved items), and Enterprise (Tailored solutions for teams and organizations).",
      icon: CreditCard
    },
    {
      question: "Can I switch between plans?",
      answer: "Yes, you can upgrade or downgrade your plan at any time from your account settings.",
      icon: Settings
    },
    {
      question: "Is there a free trial for premium plans?",
      answer: "Yes, we offer a 7-day free trial for the Pro plan.",
      icon: Clock
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription through your account settings. Your premium features will remain active until the end of the billing period.",
      icon: Settings
    },
    {
      question: "Are there discounts for annual subscriptions?",
      answer: "Yes, subscribing annually saves you up to 20% compared to monthly billing.",
      icon: CreditCard
    }
  ],
  dashboard: [
    {
      question: "What is the dashboard, and what can I do there?",
      answer: "The dashboard is your personalized control center for accessing saved startups, products, and insights. It includes tools for trend analysis, bookmarking, and data visualization.",
      icon: Layout
    },
    {
      question: "How do I save startups or products to my dashboard?",
      answer: "Click the save button on any startup or product listing, and it will automatically be added to your Insight Hub within the dashboard.",
      icon: BarChart
    },
    {
      question: "Can I organize saved items into categories?",
      answer: "Yes, the dashboard allows you to create custom folders or tags to organize saved startups and products.",
      icon: FolderOpen
    },
    {
      question: "Is there a limit to how many items I can save?",
      answer: "Free users have a limit of 20 saved items. Upgrading to a premium plan removes this restriction.",
      icon: Database
    },
    {
      question: "Does the dashboard provide insights on saved items?",
      answer: "Yes, the dashboard offers trend analysis, comparative data, and customizable charts for your saved startups and products.",
      icon: BarChart
    }
  ]
}

interface FAQSectionProps {
  category: keyof typeof faqData
}

export function FAQSection({ category }: FAQSectionProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, boolean | null>>({})

  const filteredQuestions = faqData[category].filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleFeedback = (index: number, isHelpful: boolean) => {
    setHelpfulFeedback(prev => ({ ...prev, [index]: isHelpful }))
  }

  return (
    <div className=" ">
      <div className="mb-6">
        <Input 
          type="search" 
          placeholder="Search FAQs..." 
          className="w-full"
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Accordion type="single" collapsible className="w-full">
        {filteredQuestions.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
            <AccordionTrigger className="py-4 text-left">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex-shrink-0 text-muted-foreground">
                  <faq.icon className="h-6 w-6 sm:h-8 sm:w-8 border p-1 sm:p-1.5 rounded-md border-gray-300" />
                </div>
                <span className="text-sm sm:text-base font-medium">{faq.question}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-2">
              <p className="text-sm sm:text-base text-gray-600 mb-4">{faq.answer}</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <span className="text-xs sm:text-sm text-muted-foreground">Was this helpful?</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeedback(index, true)}
                    className={`text-xs sm:text-sm px-2 py-1 ${helpfulFeedback[index] === true ? 'bg-green-100 border-green-300' : ''}`}
                  >
                    <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Yes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeedback(index, false)}
                    className={`text-xs sm:text-sm px-2 py-1 ${helpfulFeedback[index] === false ? 'bg-red-100 border-red-300' : ''}`}
                  >
                    <ThumbsDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    No
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

