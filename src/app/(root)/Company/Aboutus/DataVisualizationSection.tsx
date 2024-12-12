'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function DataVisualizationSection() {
  const [activeTab, setActiveTab] = useState("market-trends");

  const marketTrendsData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 4000 },
    { name: 'Aug', value: 3000 },
    { name: 'Sep', value: 2000 },
    { name: 'Oct', value: 2780 },
    { name: 'Nov', value: 1890 },
    { name: 'Dec', value: 2390 },
  ];

  const userGrowthData = [
    { name: 'Q1', value: 5000 },
    { name: 'Q2', value: 7000 },
    { name: 'Q3', value: 9000 },
    { name: 'Q4', value: 12000 },
  ];

  return (
    <section className="flex flex-col items-center py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <h1 className="text-4xl  text-center mb-6 text-gray-800 dark:text-gray-100">
          Bringing Data to Life
        </h1>
        <p className="max-w-2xl text-xl text-gray-600 dark:text-gray-400 text-center mx-auto mb-10">
          Dive into interactive, sleek, and dynamic data visualizations tailored for insights.
        </p>
        <Card className=" border border-gray-200 dark:border-gray-700">
          <CardHeader className=" dark:bg-gray-800 p-4">
            <CardTitle className="text-xl font-medium text-gray-700 dark:text-gray-200">
              Interactive Data Visualization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="flex justify-center space-x-4">
                <TabsTrigger value="market-trends" className="px-6 py-2 w-full text-sm font-medium rounded-md focus:outline-none transition-colors hover:bg-gray-100 ">
                  Market Trends
                </TabsTrigger>
                <TabsTrigger value="user-growth" className="px-6 py-2 w-full text-sm font-medium rounded-md focus:outline-none transition-colors hover:bg-gray-100 ">
                  User Growth
                </TabsTrigger>
              </TabsList>
              <TabsContent value="market-trends">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={marketTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#4b5563" />
                    <YAxis stroke="#4b5563" />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', color: '#fff' }} />
                    <Line type="monotone" dataKey="value" stroke="#3C89F1" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="user-growth">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#4b5563" />
                    <YAxis stroke="#4b5563" />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', color: '#fff' }} />
                    <Line type="monotone" dataKey="value" stroke="#3C89F1" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
