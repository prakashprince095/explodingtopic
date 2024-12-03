'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SimpleSignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', { name, email, password })
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
          <Input 
            id="name"
            type="text" 
            placeholder="John Doe" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
          <Input 
            id="email"
            type="email" 
            placeholder="john@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
          <Input 
            id="password"
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </div>
  )
}

