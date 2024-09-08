import ky from "ky";

import { getToken, refreshToken } from "./get-token";
import { getCacheKey, memoryCache } from "./memory-cache";

export const api = ky.extend({
	hooks: {
		beforeRequest: [
			async (request) => {
				// Check if the response is in the cache
				const cacheKey = getCacheKey(request);
				const cachedResponse = await memoryCache.get(cacheKey);
				if (cachedResponse) {
					console.log(`✔️ Cache hit for ${cacheKey}`);

					return new Response(cachedResponse as BodyInit, { status: 200 });
				}
				console.log(`❌ Cache miss for ${cacheKey}`);
			},

			async (request) => {
				request.headers.set("Authorization", `Bearer ${await getToken()}`);
			},
		],

		afterResponse: [
			async (request, _options, response) => {
				if (response.status === 401 || response.status === 403) {
					const token = await refreshToken();
					request.headers.set("Authorization", `Bearer ${token}`);
					return ky(request);
				}

				// Cache the response if it's successful
				if (response.ok) {
					const cacheKey = getCacheKey(request);
					const clonedResponse = response.clone();
					const responseBody = await clonedResponse.text();
					await memoryCache.set(cacheKey, responseBody);
				}

				return response;
			},
		],
	},
});
