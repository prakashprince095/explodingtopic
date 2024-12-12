import { Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react'
import { PinIcon as Pinterest } from 'lucide-react'

export type Channel = {
  name: string
  percentage: number
  icon: React.ElementType
}

export const channels: Channel[] = [
  { name: "LinkedIn", percentage: 85, icon: Linkedin },
  { name: "Instagram", percentage: 70, icon: Instagram },
  { name: "Facebook", percentage: 65, icon: Facebook },
  { name: "Twitter", percentage: 55, icon: Twitter },
  { name: "YouTube", percentage: 45, icon: Youtube },
  { name: "Pinterest", percentage: 35, icon: Pinterest },
]

