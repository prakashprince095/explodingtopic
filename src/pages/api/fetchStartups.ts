import { NextApiRequest, NextApiResponse } from 'next';
import env from "@/app/env";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.body;

    try {
        const response = await fetch(`${env.crunchbase.endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-cb-user-key': env.crunchbase.apikey,
            },
            body: JSON.stringify({
                query,
                collection_ids: ["companies"],
            }),
        });

        console.log("Response Status:", response.status); // Debugging log
        console.log("Response Headers:", response.headers); // Debugging log

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        const startups = data.entities.map((entity: any) => ({
            id: entity.id,
            title: entity.properties.name,
            description: entity.properties.short_description,
            foundedDate: entity.properties.founded_on,
            website: entity.properties.website,
            growth: entity.properties.growth_score,
            volume: entity.properties.rank,
            totalFunding: entity.properties.total_funding_usd,
            latestRound: entity.properties.last_funding_type,
            employees: entity.properties.num_employees_enum,
            category: entity.categories,
            location: entity.properties.location_city,
        }));

        res.status(200).json({ startups });
    } catch (error) {
        console.error("Failed to fetch Crunchbase data:", error);
        res.status(500).json({ error: "Failed to fetch data from Crunchbase" });
    }
}