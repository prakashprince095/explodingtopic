
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
const Features = () => {
  return (
    <div>
        {/* 2. Filter Options */}
<div className="flex items-center gap-3">
<Select>
  <SelectTrigger className="w-[150px] shadow-sm">
    <SelectValue placeholder="All Categories" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="Technology">Technology</SelectItem>
      <SelectItem value="Business">Business</SelectItem>
      <SelectItem value="Business">Socials</SelectItem>
      <SelectItem value="Business">Beauty</SelectItem>
      <SelectItem value="Business">HealthCare</SelectItem>
      <SelectItem value="Business">Finance</SelectItem>
      <SelectItem value="Business">Food</SelectItem>
      <SelectItem value="Business">HealthCare</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
<Select>
  <SelectTrigger className="w-[150px] shadow-sm">
    <SelectValue placeholder="Sort By" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="category">USA</SelectItem>
      <SelectItem value="volume">Canada</SelectItem>
      <SelectItem value="volume">India</SelectItem>
      <SelectItem value="volume">China</SelectItem>
      <SelectItem value="volume">UK</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
<Select>
  <SelectTrigger className="w-[150px] shadow-sm">
    <SelectValue placeholder="Sort by" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="category">Name</SelectItem>
      <SelectItem value="volume">Volume</SelectItem>
      <SelectItem value="volume">Profits</SelectItem>
      <SelectItem value="volume">Loss</SelectItem>
      <SelectItem value="volume">Searches</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
<Select>
  <SelectTrigger className="w-[150px] shadow-sm">
    <SelectValue placeholder="TimeFrame" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="category">3 months</SelectItem>
      <SelectItem value="volume">6 months</SelectItem>
      <SelectItem value="volume">1 year</SelectItem>
      <SelectItem value="volume">2 year</SelectItem>
      <SelectItem value="volume">3 year</SelectItem>
      <SelectItem value="volume">4 year</SelectItem>
      <SelectItem value="volume">5 year</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
<Select>
  <SelectTrigger className="w-[150px] shadow-sm">
    <SelectValue placeholder="Total Funding" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="category">USA</SelectItem>
      <SelectItem value="volume">Canada</SelectItem>
      <SelectItem value="volume">India</SelectItem>
      <SelectItem value="volume">China</SelectItem>
      <SelectItem value="volume">UK</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
<Select>
  <SelectTrigger className="w-[150px] shadow-sm">
    <SelectValue placeholder="No of employees" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="category">1-25</SelectItem>
      <SelectItem value="volume">25-50</SelectItem>
      <SelectItem value="volume">50-100</SelectItem>
      <SelectItem value="volume">100-1000</SelectItem>
      <SelectItem value="volume">1000-5000</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
</div>

    </div>
  )
}

export default Features