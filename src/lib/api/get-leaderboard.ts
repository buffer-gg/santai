import { z } from "zod";
import type { HunterId } from "../utils";
import { api } from "./client";

export const LeaderboardEntrySchema = z.object({
	PlayerID: z.string(),
	Rank: z.number(),
	Value: z.number(),
	HeroName: z.string().optional(),
	HeroCounts: z.record(z.number()).optional(),
});
export type LeaderboardEntry = z.infer<typeof LeaderboardEntrySchema>;

export const LeaderboardSchema = z.object({
	Period: z.string(),
	StatCode: z.string(),
	HeroName: z.string(),
	QueueID: z.string(),
	Entries: z.array(LeaderboardEntrySchema),
});
export type Leaderboard = z.infer<typeof LeaderboardSchema>;

export async function getLeaderboard({
	start = 1,
	end = 50,
	queueId = "default",
	period = "weekly",
	statCode = "wins",
	heroId = "Hero:All",
}: {
	token?: string;
	start?: number;
	end?: number;
	queueId?: string;
	period?: string;
	statCode?: string;
	heroId?: `Hero:${HunterId}` | "Hero:All";
}) {
	const url = new URL(
		"https://player-stats-jx-prod.prodcluster.awsinfra.theorycraftgames.com/player-stats/leaderboard",
	);
	const query = new URLSearchParams({
		queueId,
		period,
		statCode,
		heroId,
		start: start.toString(),
		end: end.toString(),
	});

	url.search = query.toString();

	const d = await api.get(url).json();

	// return d;
	return LeaderboardSchema.parse(d);
}
