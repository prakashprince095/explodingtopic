import { TrendingUp, Activity, BarChart2 } from 'lucide-react'

export type KeyIndicator = {
  name: string
  value: number
  icon: React.ElementType
}

export const keyIndicators: KeyIndicator[] = [
  { name: "Growth", value: 75, icon: TrendingUp },
  { name: "Seasonality", value: 60, icon: Activity },
  { name: "Speed", value: 85, icon: BarChart2 },
  { name: "Volatility", value: 45, icon: Activity },
]

