import env from "@/app/env";

const fetchCrunchbaseData = async (query: string) => {
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

        if (!response.ok) {
            console.error("API request failed with status:", response.status, response.statusText);
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        return data.entities.map((entity: any) => ({
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
    } catch (error) {
        console.error("Failed to fetch Crunchbase data:", error);
        return [];
    }
};

export default fetchCrunchbaseData;

