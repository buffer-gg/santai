import { z } from "zod";
import { api } from "./client";

const searchSchema = z.object({
	data: z.array(
		z.object({
			createdAt: z.string(),
			displayName: z.string(),
			namespace: z.string(),
			userId: z.string(),
			userName: z.string(),
		}),
	),
	paging: z.object({
		previous: z.string(),
		next: z.string(),
		first: z.string(),
		last: z.string(),
	}),
});
export type SearchSchema = z.infer<typeof searchSchema>;

export async function getSearchPlayers({
	query,
}: {
	query?: string;
}) {
	const r = await api
		.get(
			`https://accounts.projectloki.theorycraftgames.com/iam/v3/public/namespaces/loki/users?query=${query}&by=displayName&limit=50`,
		)
		.json<SearchSchema>();

	const response = searchSchema.parse(r);

	return {
		...response,
		data: response.data.filter((user) =>
			user.displayName.toLowerCase().startsWith(query?.toLowerCase() ?? ""),
		),
	};
}
