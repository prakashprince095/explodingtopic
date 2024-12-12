import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Zap, Shield, TrendingUp } from "lucide-react";

export function AboutSection() {
  const features = [
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Access data from around the world to uncover trends, expand into new markets, and understand global audiences.",
    },
    {
      icon: Zap,
      title: "Real-time Insights",
      description:
        "Leverage cutting-edge analytics to stay ahead with up-to-the-minute insights and data-driven decision-making.",
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description:
        "Your data is safe with us. We employ top-notch encryption and adhere to strict privacy standards to protect your information.",
    },
    {
      icon: TrendingUp,
      title: "Actionable Analytics",
      description:
        "Transform raw data into meaningful insights that fuel growth, efficiency, and innovation for your business.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl text-center mb-4">
            Who We Are
          </h2>
          <p className="text-lg mb-4 text-center text-gray-500">
            At Global Data Insights, we harness the power of data to inspire innovation and empower businesses to achieve new heights.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="gap-5 p-3 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-transform transform hover:scale-105 rounded-xl flex flex-col items-start" >
              <feature.icon className="w-10 h-10" />
              <h1 className="text-xl  text-gray-800 dark:text-white">
                {feature.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
