const env = {
    appwrite: {
        endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
        projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        apikey: String(process.env.APPWRITE_API_KEY),
    },
    crunchbase: {
        endpoint: String(process.env.NEXT_PUBLIC_CRUNCHBASE_HOST_URL),
        apikey: String(process.env.CRUNCHBASE_API_KEY),
    },
}

export default env