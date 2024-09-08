import { z } from "zod";
import type { QueueId } from "../utils";
import { api } from "./client";

const rankedLeaderboardSchema = z.object({
	Start: z.number(),
	End: z.number(),
	QueueID: z.string(),
	Entries: z.array(
		z.object({
			PlayerID: z.string(),
			Rank: z.string(),
			Rating: z.number(),
			Placement: z.number(),
		}),
	),
});

export type RankedLeaderboard = z.infer<typeof rankedLeaderboardSchema>;
export type RankedLeaderboardEntry = RankedLeaderboard["Entries"][number];

async function getRankedLeaderboard({
	token,
	start = 1,
	end = 50,
	queueId = "default",
}: {
	token?: string;
	start?: number;
	end?: number;
	queueId?: QueueId;
}) {
	const maxLength = 50;

	if (end - start + 1 > maxLength) {
		throw new Error("The maximum number of entries per request is 50");
	}

	const r = await api
		.get(
			`https://mmr-jx-prod.prodcluster.awsinfra.theorycraftgames.com/mmr/leaderboard?start=${start}&end=${end}&queueId=${queueId}`,
			{ next: { revalidate: 60 } },
		)
		.json<RankedLeaderboard>();

	return rankedLeaderboardSchema.parse(r);
}

export async function getRanking({
	end = 50,
	queueId,
}: {
	end?: number;
	queueId: QueueId;
}): Promise<RankedLeaderboard> {
	const batchSize = 50;

	const leaderboards = await Promise.all(
		Array.from({ length: Math.ceil(end / batchSize) }, async (_, i) => {
			return await getRankedLeaderboard({
				start: i * batchSize + 1,
				end: Math.min((i + 1) * batchSize, end),
				queueId,
			});
		}),
	);

	return leaderboards.reduce(
		(acc, lb) => {
			acc.Entries = [...acc.Entries, ...lb.Entries];

			return acc;
		},
		{
			Start: 1,
			End: end,
			QueueID: queueId,
			Entries: [],
		} as RankedLeaderboard,
	);
}
