import type { QueueId } from "../utils";
import { getRanking } from "./get-ranked-leaderboard";

export async function getUserRanking({
	token,
	id,
	queueId = "default",
}: {
	token?: string;
	id: string;
	queueId?: QueueId;
}): Promise<{
	Rating: number;
	Rank: string;
	Placement: number;
} | null> {
	const r = await getRanking({ queueId, end: 100 });

	const user = r.Entries.findIndex((entry) => entry.PlayerID === id);

	return user === -1 ? null : r.Entries[user];
}
