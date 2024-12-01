// import { NextPage, useState } from 'next'
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// interface Props {}

// const Extra: NextPage<Props> = ({}) => {
//     const [categoryFilter, setCategoryFilter] = useState('');
//     const [countryFilter, setCountryFilter] = useState('');
//     const [sortBy, setSortBy] = useState('');
//     const [timeFrame, setTimeFrame] = useState('');
//     const [fundingFilter, setFundingFilter] = useState('');
//     const [employeeFilter, setEmployeeFilter] = useState('');
//   return <div>{/* Filter Selects */}
//   <div className="flex items-center justify-between mb-4">
//     <div className='flex items-center gap-3 flex-wrap'>
//       <Select onValueChange={(value) => setCategoryFilter(value)}>
//         <SelectTrigger className="w-[150px] shadow-sm">
//           <SelectValue placeholder="All Categories" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectItem value="Technology">Technology</SelectItem>
//             <SelectItem value="Business">Business</SelectItem>
//             <SelectItem value="Socials">Socials</SelectItem>
//             <SelectItem value="Beauty">Beauty</SelectItem>
//             <SelectItem value="HealthCare">HealthCare</SelectItem>
//             <SelectItem value="Finance">Finance</SelectItem>
//             <SelectItem value="Food">Food</SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>

//       <Select onValueChange={(value) => setCountryFilter(value)}>
//         <SelectTrigger className="w-[150px] shadow-sm">
//           <SelectValue placeholder="Countries" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectItem value="USA">USA</SelectItem>
//             <SelectItem value="Canada">Canada</SelectItem>
//             <SelectItem value="India">India</SelectItem>
//             <SelectItem value="China">China</SelectItem>
//             <SelectItem value="UK">UK</SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>

//       <Select onValueChange={(value) => setSortBy(value)}>
//         <SelectTrigger className="w-[150px] shadow-sm">
//           <SelectValue placeholder="Sort by" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectItem value="Name">Name</SelectItem>
//             <SelectItem value="Volume">Volume</SelectItem>
//             <SelectItem value="Profits">Profits</SelectItem>
//             <SelectItem value="Loss">Loss</SelectItem>
//             <SelectItem value="Searches">Searches</SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>

//       <Select onValueChange={(value) => setTimeFrame(value)}>
//         <SelectTrigger className="w-[150px] shadow-sm">
//           <SelectValue placeholder="TimeFrame" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectItem value="3 months">3 months</SelectItem>
//             <SelectItem value="6 months">6 months</SelectItem>
//             <SelectItem value="1 year">1 year</SelectItem>
//             <SelectItem value="2 years">2 years</SelectItem>
//             <SelectItem value="3 years">3 years</SelectItem>
//             <SelectItem value="4 years">4 years</SelectItem>
//             <SelectItem value="5 years">5 years</SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>

//       <Select onValueChange={(value) => setFundingFilter(value)}>
//         <SelectTrigger className="w-[150px] shadow-sm">
//           <SelectValue placeholder="Total Funding" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectItem value="Less than $1M">Less than $1M</SelectItem>
//             <SelectItem value="$1M - $5M">$1M - $5M</SelectItem>
//             <SelectItem value="$5M - $10M">$5M - $10M</SelectItem>
//             <SelectItem value="More than $10M">More than $10M</SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>

//       <Select onValueChange={(value) => setEmployeeFilter(value)}>
//         <SelectTrigger className="w-[150px] shadow-sm">
//           <SelectValue placeholder="No of employees" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectItem value="1-25">1-25</SelectItem>
//             <SelectItem value="25-50">25-50</SelectItem>
//             <SelectItem value="50-100">50-100</SelectItem>
//             <SelectItem value="100-1000">100-1000</SelectItem>
//             <SelectItem value="1000-5000">1000-5000</SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//     </div>

//     {/* Grid/List view toggle */}
//     <div className="flex border border-gray-400 p-[2px] rounded-sm">
//       <button
//         onClick={() => setIsGridView(true)}
//         className={`p-1 ${isGridView ? 'bg-[#3985ED] rounded-sm' : ''}`}
//       >
//         <Image src="/startups/grid.svg" width={20} height={25} alt="Grid View" />
//       </button>
//       <button
//         onClick={() => setIsGridView(false)}
//         className={`p-1 ${!isGridView ? 'bg-[#3985ED] rounded-sm' : ''}`}
//       >
//         <Image src="/startups/list.svg" width={20} height={25} alt="List View" />
//       </button>
//     </div>
//   </div></div>
// }

// export default Extra

import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

const Features = () => {
const [categoryFilter, setCategoryFilter] = useState('');
const [countryFilter, setCountryFilter] = useState('');
const [sortBy, setSortBy] = useState('');
const [timeFrame, setTimeFrame] = useState('');
const [fundingFilter, setFundingFilter] = useState('');
const [employeeFilter, setEmployeeFilter] = useState('');

return (
    <div className="flex items-center justify-between mb-4">
        <div className='flex items-center gap-3 flex-wrap'>
            <Select onValueChange={(value) => setCategoryFilter(value)}>
                <SelectTrigger className="w-[150px] shadow-sm">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Socials">Socials</SelectItem>
                        <SelectItem value="Beauty">Beauty</SelectItem>
                        <SelectItem value="HealthCare">HealthCare</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Food">Food</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => setCountryFilter(value)}>
                <SelectTrigger className="w-[150px] shadow-sm">
                    <SelectValue placeholder="Countries" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="USA">USA</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="China">China</SelectItem>
                        <SelectItem value="UK">UK</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => setSortBy(value)}>
                <SelectTrigger className="w-[150px] shadow-sm">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="Name">Name</SelectItem>
                        <SelectItem value="Volume">Volume</SelectItem>
                        <SelectItem value="Profits">Profits</SelectItem>
                        <SelectItem value="Loss">Loss</SelectItem>
                        <SelectItem value="Searches">Searches</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => setTimeFrame(value)}>
                <SelectTrigger className="w-[150px] shadow-sm">
                    <SelectValue placeholder="TimeFrame" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="3 months">3 months</SelectItem>
                        <SelectItem value="6 months">6 months</SelectItem>
                        <SelectItem value="1 year">1 year</SelectItem>
                        <SelectItem value="2 years">2 years</SelectItem>
                        <SelectItem value="3 years">3 years</SelectItem>
                        <SelectItem value="4 years">4 years</SelectItem>
                        <SelectItem value="5 years">5 years</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => setFundingFilter(value)}>
                <SelectTrigger className="w-[150px] shadow-sm">
                    <SelectValue placeholder="Total Funding" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="Less than $1M">Less than $1M</SelectItem>
                        <SelectItem value="$1M - $5M">$1M - $5M</SelectItem>
                        <SelectItem value="$5M - $10M">$5M - $10M</SelectItem>
                        <SelectItem value="More than $10M">More than $10M</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => setEmployeeFilter(value)}>
                <SelectTrigger className="w-[150px] shadow-sm">
                    <SelectValue placeholder="No of employees" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="1-25">1-25</SelectItem>
                        <SelectItem value="25-50">25-50</SelectItem>
                        <SelectItem value="50-100">50-100</SelectItem>
                        <SelectItem value="100-1000">100-1000</SelectItem>
                        <SelectItem value="1000-5000">1000-5000</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>

        {/* Grid/List view toggle */}
        <div className="flex border border-gray-400 p-[2px] rounded-sm">
            <button
                className="p-1 bg-[#3985ED] rounded-sm"
            >
                <Image src="/startups/grid.svg" width={20} height={25} alt="Grid View" />
            </button>
            <button
                className="p-1 bg-[#3985ED] rounded-sm"
            >
                <Image src="/startups/list.svg" width={20} height={25} alt="Grid View" />
            </button>
        </div>
    </div>
)}

export default Features
