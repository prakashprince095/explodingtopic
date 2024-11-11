'use client';
import Link from "next/link";
import { useState, ChangeEvent } from "react";
import {
  SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Select
} from "@/components/ui/select"
// Example data for categories with six items in each category
type CategoryItem = {
  name: string;
  description: string;
  volume: string;
  growth: string;
};

type CategoryData = {
  [key: string]: CategoryItem[];
};

// Example data for categories with six items in each category
const categories: CategoryData = {
  Trending: [
    { name: "AI Video Enhancers", description: "AI tools to enhance video quality...", volume: "10.2K", growth: "+5800%" },
    { name: "AI Transcription", description: "Service that provides free, accurate AI-based transcriptions...", volume: "12.1K", growth: "+7600%" },
    { name: "AI in Education", description: "Innovative tools to assist with learning and teaching...", volume: "8.3K", growth: "+4800%" },
    { name: "AI Presentation Makers", description: "Tools to create presentations using AI...", volume: "5.1K", growth: "+3500%" },
    { name: "Text-to-Video Tools", description: "AI that converts text into videos...", volume: "6.4K", growth: "+6200%" },
    { name: "AI-Powered Content Generating Tools", description: "AI tools to generate written content...", volume: "7.8K", growth: "+4200%" },
  ],
  Technology: [
    { name: "DevOps Spinoffs", description: "New trends in the DevOps ecosystem...", volume: "4.5K", growth: "+2700%" },
    { name: "Climate FinTech", description: "FinTech solutions for climate-related issues...", volume: "2.9K", growth: "+1800%" },
    { name: "Accessible Martech", description: "Tools to make marketing technology accessible...", volume: "3.8K", growth: "+3000%" },
    { name: "Workflow Automation Tools", description: "Automating workflows with the latest tools...", volume: "5.4K", growth: "+2100%" },
    { name: "Content Monetization Platforms", description: "Monetization tools for creators and platforms...", volume: "4.1K", growth: "+2900%" },
    { name: "Headless CMS", description: "Content management without the head...", volume: "4.7K", growth: "+2500%" },
  ],
  Wellness: [
    { name: "Electrolyte Supplements", description: "Supplements to replenish electrolytes...", volume: "3.5K", growth: "+1600%" },
    { name: "ADHD Products", description: "Tools to assist individuals with ADHD...", volume: "2.4K", growth: "+1700%" },
    { name: "Focus Supplements", description: "Supplements to enhance focus and clarity...", volume: "3.9K", growth: "+1900%" },
    { name: "Breastfeeding Tech", description: "Tech solutions to assist with breastfeeding...", volume: "4.2K", growth: "+2000%" },
    { name: "Cold Exposure Products", description: "Tools for cold therapy and exposure...", volume: "1.7K", growth: "+900%" },
    { name: "Sleep Tech", description: "Tech products to enhance sleep quality...", volume: "5.6K", growth: "+2200%" },
  ],
  Ai: [
    { name: "AI Transcription", description: "Service that provides AI-based transcriptions...", volume: "12.1K", growth: "+7600%" },
    { name: "AI Presentation Makers", description: "AI-based presentation tools...", volume: "5.1K", growth: "+3500%" },
    { name: "Blog Post to Video", description: "Converting blog posts into videos using AI...", volume: "7.2K", growth: "+4600%" },
    { name: "AI-Assisted Coding", description: "Tools to help developers with coding...", volume: "6.3K", growth: "+5300%" },
    { name: "AI-Enhanced Learning", description: "AI tools to assist with learning...", volume: "4.9K", growth: "+3200%" },
    { name: "Short-Form Video Editors", description: "AI-powered video editing tools...", volume: "5.4K", growth: "+4100%" },
  ],
  Beauty: [
    { name: "Specialty Lotions", description: "Lotions for specialized skincare needs...", volume: "2.4K", growth: "+1300%" },
    { name: "TikTok Hair Care", description: "Hair care trends inspired by TikTok...", volume: "1.8K", growth: "+900%" },
    { name: "Snail Mucin Skincare", description: "Skincare products using snail mucin...", volume: "3.4K", growth: "+2100%" },
    { name: "Rice Water Beauty Routine", description: "Beauty routines using rice water...", volume: "4.2K", growth: "+2700%" },
    { name: "Ceramide Skincare", description: "Skincare products with ceramides...", volume: "3.7K", growth: "+1800%" },
    { name: "Ingredient-Led Skincare", description: "Skincare focused on active ingredients...", volume: "5.1K", growth: "+2400%" },
  ],
};


// Helper function to convert category name to URL slug


const MetaWavePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'volume' | 'growth'>('volume');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);

  const filteredCategories = Object.entries(categories).map(([categoryName, items]) => ({
    title: categoryName,
    items: items
      .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) =>
        sortOrder === 'volume'
          ? parseFloat(b.volume) - parseFloat(a.volume)
          : parseFloat(b.growth) - parseFloat(a.growth)
      ),
  }));

  const toggleFavorite = (name: string) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((fav) => fav !== name) : [...prev, name]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 border border-gray-300 p-3 rounded-lg">
      <div className="flex  items-center justify-between">
        <h1 className="text-3xl mb-4">Meta Trends</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search trends..."
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 rounded-sm min-w-[300px] border-gray-400"
          />
          <Select>
            <SelectTrigger className="w-[150px] shadow-sm">
              <SelectValue placeholder="Sort by volume" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Sort by volume">Sort by volume</SelectItem>
                <SelectItem value="Sort by Growth">Sort by Growth</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <select
          onChange={(e) => setSortOrder(e.target.value as 'volume' | 'growth')}
          value={sortOrder}
          className="border p-2 rounded-md"
        >
          <option value="volume">Sort by Volume</option>
          <option value="growth">Sort by Growth</option>
        </select> */}
        </div>
      </div>
      {filteredCategories.map(({ title, items }) => (
        <CategorySection key={title} title={title} items={items} toggleFavorite={toggleFavorite} favorites={favorites} />
      ))}

      <style jsx global>{`
        body {
          transition: background-color 0.3s;
        }
      `}</style>
    </div>
  );
};

type CategorySectionProps = {
  title: string;
  items: CategoryItem[];
  toggleFavorite: (name: string) => void;
  favorites: string[];
};

const CategorySection = ({ title, items, toggleFavorite, favorites }: CategorySectionProps) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="mb-8 flex flex-col items-start">
      <h2 className="text-2xl mb-2">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {items.map((category, idx) => (
          <CategoryCard
            key={idx}
            category={category}
            expanded={expanded === idx}
            onToggleExpand={() => setExpanded(expanded === idx ? null : idx)}
            onToggleFavorite={() => toggleFavorite(category.name)}
            isFavorite={favorites.includes(category.name)}
            idx={idx} // Pass idx here
          />
        ))}
      </div>
    </div>
  );
};

type CategoryCardProps = {
  category: CategoryItem;
  expanded: boolean;
  onToggleExpand: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
  idx: number; 
};

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

const CategoryCard = ({ category, expanded, onToggleExpand, onToggleFavorite, isFavorite, idx }: CategoryCardProps) => (
  <div className={`p-6 bg-white border rounded-md transition ${expanded ? '' : 'hover:shadow-md'}`}>
    <Link href={`/dashboard/meta-wave/${toSlug(category.name)}`} passHref>
      <div className="flex justify-between items-start">
        <h3 className="text-lg">{category.name}</h3>
        <button onClick={onToggleFavorite} className="text-red-500">
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <p className="text-gray-500">{category.description}</p>
      <div className="mt-4 text-sm text-gray-500">Volume: {category.volume}</div>
      <div className="mt-1 text-md text-green-500">Growth: {category.growth}</div>
    </Link>
    {expanded && (
      <div className="mt-3 text-sm">
        <p>More details about {category.name}... (e.g., recent news or applications)</p>
      </div>
    )}
    <button onClick={onToggleExpand} className="text-blue-500 text-sm mt-3 underline">
      {expanded ? 'Show Less' : 'Show More'}
    </button>
  </div>
);
export default MetaWavePage;



