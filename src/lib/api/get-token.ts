import { memoryCache } from "./memory-cache";
import ky from "ky";

const TOKEN_CACHE_KEY = "access_token";

export async function getToken() {
	// Check if the token is in the cache
	const cachedToken = await memoryCache.get(TOKEN_CACHE_KEY);

	if (cachedToken) {
		console.log("✔️ Token from cache");
		return cachedToken as string;
	}

	const { access_token } = await ky
		.get("https://supervive-web.vercel.app/api/getToken", {
			next: { revalidate: 0 },
		})
		.json<{ access_token: string }>();

	// Cache the token
	await memoryCache.set(TOKEN_CACHE_KEY, access_token);

	return access_token as string;
}

export async function refreshToken() {
	const { access_token } = await ky
		.post("https://supervive-web.vercel.app/api/refreshToken", {
			next: { revalidate: 0 },
		})
		.json<{ access_token: string }>();

	return access_token as string;
}
