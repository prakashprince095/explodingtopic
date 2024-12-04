'use client';

import React from 'react';
import { useParams } from 'next/navigation';

const CompanyInsightsPage = () => {
  const params = useParams();
  const subcategory = params?.subcategory;
  const company = params?.company;

  if (!subcategory || !company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-xl mb-4">
        {company}
      </h1>
      <p className="mb-6 text-gray-700">
        Detailed performance data and growth insights for {company} in the {subcategory} subcategory.
      </p>

      <div className="p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-lg mb-2">Performance Overview</h2>
        <p className="text-sm text-gray-500 mb-4">
          Here, you can display detailed analytics and statistics specific to {company}.
        </p>
      </div>
    </div>
  );
};

export default CompanyInsightsPage;
