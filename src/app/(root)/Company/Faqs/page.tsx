"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FAQSection } from './faq-section'
import { ContactForm } from './contact-form'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Mail } from 'lucide-react'
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from '@/lib/utils'
import SignupSection from "@/components/SignupSection";

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState('general')

  return (
    <div className="w-full flex flex-col items-center gap-10">
      <div className="relative  flex flex-col gap-4 h-[400px] w-full items-center justify-center overflow-hidden rounded-lg bg-background p-10 ">
        <h1 className="z-10 whitespace-pre-wrap text-center text-[40px] max-w-[800px] font-semibold tracking-tighter text-black dark:text-white">
          FAQs: <br /> Frequently Asked Question
        </h1>
        <p className="text-md max-w-[800px] text-center mb-8">
          Welcome to our FAQ page! Below you’ll find answers to a wide range of questions about our platform, including general usage, pricing, features, and dashboard functionality.
        </p>
        <AnimatedGridPattern
            numSquares={60}
            maxOpacity={0.08}
            duration={1}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              "inset-x-[0%] inset-y-[0%] h-[60%]",
            )}
          />
      </div>

      <Tabs defaultValue="general" className="mb-12" onValueChange={(value) => setActiveTab(value as 'general' | 'pricing' | 'dashboard')}>
        <TabsList className="grid w-full grid-cols-3  mx-auto mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <FAQSection category="general" />
        </TabsContent>
        <TabsContent value="pricing">
          <FAQSection category="pricing" />
        </TabsContent>
        <TabsContent value="dashboard">
          <FAQSection category="dashboard" />
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <h2 className="text-2xl  mb-4">Still Have Questions?</h2>
        <p className="text-muted-foreground mb-6">
          If you didn't find the answer you're looking for, our support team is here to help!
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Contact Support</DialogTitle>
              <DialogDescription>
                Fill out this form and we'll get back to you as soon as possible.
              </DialogDescription>
            </DialogHeader>
            <ContactForm />
          </DialogContent>
        </Dialog>
      </div>
      <SignupSection />
    </div>
  )
}

