export type RelatedTrend = {
    name: string
    growth: number
    volume: string
    data: { value: number }[]
    logo: string
  }
  
  export const relatedStartups: RelatedTrend[] = [
    {
      name: "OpenAI",
      growth: 15,
      volume: "74K",
      logo: "/placeholder.svg?height=40&width=40",
      data: Array(7)
        .fill(0)
        .map(() => ({ value: Math.random() * 100 })),
    },
    {
      name: "Microsoft Corporation",
      growth: -10,
      volume: "64K",
      logo: "/placeholder.svg?height=40&width=40",
      data: Array(7)
        .fill(0)
        .map(() => ({ value: Math.random() * 100 })),
    },
    // ... (repeat the above two objects three times to match the original data)
  ]
  
  