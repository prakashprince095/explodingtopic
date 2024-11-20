// import env from "@/app/env";

// const fetchCrunchbaseData = async (organizationId: string) => {
//   try {
//     const url = `${env.crunchbase.endpoint}/organizations/${organizationId}?user_key=${env.crunchbase.apikey}`;
    
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-cb-user-key': env.crunchbase.apikey,
//       },
//     });

//     if (!response.ok) {
//       console.error("API request failed with status:", response.status, response.statusText);
//       throw new Error(`Error fetching data: ${response.statusText}`);
//     }

//     const data = await response.json();

//     return {
//       id: data.uuid,
//       title: data.properties.name,
//       description: data.properties.short_description,
//       foundedDate: data.properties.founded_on,
//       website: data.properties.website,
//       growth: data.properties.growth_score,
//       volume: data.properties.rank,
//       totalFunding: data.properties.total_funding_usd,
//       latestRound: data.properties.last_funding_type,
//       employees: data.properties.num_employees_enum,
//       category: data.categories,
//       location: data.properties.location_city,
//     };
//   } catch (error) {
//     console.error("Failed to fetch Crunchbase data:", error);
//     return null;
//   }
// };

// export default fetchCrunchbaseData;
