import { createCache, memoryStore } from "cache-manager";

// Create a memory cache
export const memoryCache = createCache(
	memoryStore({
		max: 1000, // Maximum number of items in cache
		ttl: process.env.NODE_ENV === "production" ? 300000 : 5 * 1000, // Time to live in milliseconds (5 minutes)
	}),
);

// Function to generate a cache key from a request
export const getCacheKey = (request: Request) => {
	return `${request.method}:${request.url}`;
};

// Function to clear the entire cache
export const clearCache = async () => {
	await memoryCache.reset();
	console.log("Entire cache cleared");
};

// Function to delete a specific cache entry
export const deleteCacheEntry = async (request: Request) => {
	const cacheKey = getCacheKey(request);
	await memoryCache.del(cacheKey);
	console.log(`Cache entry deleted for ${cacheKey}`);
};
