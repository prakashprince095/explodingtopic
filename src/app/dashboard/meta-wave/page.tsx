'use client';
import Link from "next/link";

// Example data for categories with six items in each category
const categories = {
  trending: [
    { name: "AI Video Enhancers", description: "AI tools to enhance video quality...", volume: "10.2K", growth: "+5800%" },
    { name: "AI Transcription", description: "Service that provides free, accurate AI-based transcriptions...", volume: "12.1K", growth: "+7600%" },
    { name: "AI in Education", description: "Innovative tools to assist with learning and teaching...", volume: "8.3K", growth: "+4800%" },
    { name: "AI Presentation Makers", description: "Tools to create presentations using AI...", volume: "5.1K", growth: "+3500%" },
    { name: "Text-to-Video Tools", description: "AI that converts text into videos...", volume: "6.4K", growth: "+6200%" },
    { name: "AI-Powered Content Generating Tools", description: "AI tools to generate written content...", volume: "7.8K", growth: "+4200%" },
  ],
  technology: [
    { name: "DevOps Spinoffs", description: "New trends in the DevOps ecosystem...", volume: "4.5K", growth: "+2700%" },
    { name: "Climate FinTech", description: "FinTech solutions for climate-related issues...", volume: "2.9K", growth: "+1800%" },
    { name: "Accessible Martech", description: "Tools to make marketing technology accessible...", volume: "3.8K", growth: "+3000%" },
    { name: "Workflow Automation Tools", description: "Automating workflows with the latest tools...", volume: "5.4K", growth: "+2100%" },
    { name: "Content Monetization Platforms", description: "Monetization tools for creators and platforms...", volume: "4.1K", growth: "+2900%" },
    { name: "Headless CMS", description: "Content management without the head...", volume: "4.7K", growth: "+2500%" },
  ],
  wellness: [
    { name: "Electrolyte Supplements", description: "Supplements to replenish electrolytes...", volume: "3.5K", growth: "+1600%" },
    { name: "ADHD Products", description: "Tools to assist individuals with ADHD...", volume: "2.4K", growth: "+1700%" },
    { name: "Focus Supplements", description: "Supplements to enhance focus and clarity...", volume: "3.9K", growth: "+1900%" },
    { name: "Breastfeeding Tech", description: "Tech solutions to assist with breastfeeding...", volume: "4.2K", growth: "+2000%" },
    { name: "Cold Exposure Products", description: "Tools for cold therapy and exposure...", volume: "1.7K", growth: "+900%" },
    { name: "Sleep Tech", description: "Tech products to enhance sleep quality...", volume: "5.6K", growth: "+2200%" },
  ],
  ai: [
    { name: "AI Transcription", description: "Service that provides AI-based transcriptions...", volume: "12.1K", growth: "+7600%" },
    { name: "AI Presentation Makers", description: "AI-based presentation tools...", volume: "5.1K", growth: "+3500%" },
    { name: "Blog Post to Video", description: "Converting blog posts into videos using AI...", volume: "7.2K", growth: "+4600%" },
    { name: "AI-Assisted Coding", description: "Tools to help developers with coding...", volume: "6.3K", growth: "+5300%" },
    { name: "AI-Enhanced Learning", description: "AI tools to assist with learning...", volume: "4.9K", growth: "+3200%" },
    { name: "Short-Form Video Editors", description: "AI-powered video editing tools...", volume: "5.4K", growth: "+4100%" },
  ],
  beauty: [
    { name: "Specialty Lotions", description: "Lotions for specialized skincare needs...", volume: "2.4K", growth: "+1300%" },
    { name: "TikTok Hair Care", description: "Hair care trends inspired by TikTok...", volume: "1.8K", growth: "+900%" },
    { name: "Snail Mucin Skincare", description: "Skincare products using snail mucin...", volume: "3.4K", growth: "+2100%" },
    { name: "Rice Water Beauty Routine", description: "Beauty routines using rice water...", volume: "4.2K", growth: "+2700%" },
    { name: "Ceramide Skincare", description: "Skincare products with ceramides...", volume: "3.7K", growth: "+1800%" },
    { name: "Ingredient-Led Skincare", description: "Skincare focused on active ingredients...", volume: "5.1K", growth: "+2400%" },
  ],
};

// Helper function to convert category name to URL slug
const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

const CategorySection = ({ title, items }: { title: string; items: any[] }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-3 gap-6">
      {items.map((category, idx) => (
        <Link key={idx} href={`/dashboard/meta-wave/${toSlug(category.name)}`} passHref>
          <div className="p-6 bg-white shadow-md rounded-md cursor-pointer hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">{category.name}</h3>
            <p className="text-gray-600 mt-2">{category.description}</p>
            <p className="mt-4 text-sm text-gray-500">Volume: {category.volume}</p>
            <p className="mt-1 text-sm text-green-500">Growth: {category.growth}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

const MetaWavePage = () => {
  return (
    <div className="min-h-screen bg-white border border-gray-300 p-3 rounded-lg">
      <h1 className="text-3xl font-bold mb-12">Meta Trends</h1>
      
      <CategorySection title="Trending" items={categories.trending} />
      <CategorySection title="Technology" items={categories.technology} />
      <CategorySection title="Wellness" items={categories.wellness} />
      <CategorySection title="AI" items={categories.ai} />
      <CategorySection title="Beauty" items={categories.beauty} />
      
      {/* Add more sections here like B2B, Food & Beverage, etc. */}
    </div>
  );
};

export default MetaWavePage;
