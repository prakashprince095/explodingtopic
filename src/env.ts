const env = {
    appwrite: {
        endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
        projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        apikey: String(process.env.APPWRITE_API_KEY),
        databaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
        hubItemCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_HUB_ITEM_COLLECTION_ID),
        productItemCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_ITEM_COLLECTION_ID)
    }
}

export default env