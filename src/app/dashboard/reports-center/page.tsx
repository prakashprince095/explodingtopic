"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
// Report Interface
interface Report {
  id: number;
  title: string;
  date: string;
  companies: string[];
  description: string;
}

// Mock Data for Reports (Weekly Reports)
const mockReports: Report[] = [
  {
    id: 1,
    title: "01 Oct 2024",
    date: "2024-10-01",
    companies: ["Cozey", "Hyperscaler", "ScrapingBee", "Creatine Gummies"],
    description: "Detailed report for the week of 01 Oct 2024 goes here. This report provides insights on several companies...",
  },
  {
    id: 2,
    title: "24 Sep 2024",
    date: "2024-09-24",
    companies: ["Cradlewise", "Shilajit Gummies", "Santa Cruz Paleo", "Data Fabric"],
    description: "Detailed report for the week of 24 Sep 2024 goes here. This report provides insights on several companies...",
  },
  {
    id: 3,
    title: "17 Sep 2024",
    date: "2024-09-17",
    companies: ["Plaud AI", "Tranexamic Acid Serum", "Sproud Milk", "Platform Engineering"],
    description: "Detailed report for the week of 17 Sep 2024 goes here. This report provides insights on several companies...",
  },
];

// Main Component
export default function ReportsLibrary() {
  const [reports] = useState<Report[]>(mockReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // 1. Select a report to show its details
  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
  };

  // 2. Close the modal
  const closeReportModal = () => {
    setSelectedReport(null);
  };

  return (
    <div className="min-h-screen bg-white border border-gray-300 p-3 rounded-lg">
      <h2 className="text-3xl mb-6">Reports Library</h2>
      
      {/* Grid Layout for Weekly Reports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="p-6 border border-gray-400  rounded-lg shadow-md">
            <h3 className="text-lg">{report.title}</h3>
            <ul className="list-disc pl-5 mb-2">
              {report.companies.map((company, index) => (
                <li key={index}>{company}</li>
              ))}
            </ul>
            <Button
              onClick={() => handleReportClick(report)}
            >
              Read Report
            </Button>
          </div>
        ))}
      </div>

      {/* Full-Screen Modal for Report Details */}
      {selectedReport && (
        <div className="fixed  inset-0  bg-opacity-75 flex justify-center items-center z-50">
          <div className="border bg-slate-50 shadow-lg p-8 rounded-lg max-w-4xl w-full">
            <h2 className="text-2xl mb-4">{selectedReport.title} Report</h2>
            <p className="mb-4">{selectedReport.description}</p>

            {/* Placeholder for Line Graph */}
            <div className="bg-gray-200 h-64 mb-4 flex items-center justify-center">
              <span className="text-gray-500">Line Graph Placeholder</span>
            </div>

            <Button
              onClick={closeReportModal}
            >
              Close Report
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
