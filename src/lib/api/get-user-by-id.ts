import { z } from "zod";
import { api } from "./client";
import { notFound } from "next/navigation";

const userSchema = z.object({
	userId: z.string(),
	displayName: z.string(),
});

export async function getUserById({
	token,
	id,
}: {
	token?: string;
	id: string;
}) {
	const r = await api
		.get(
			`https://accounts.projectloki.theorycraftgames.com/iam/v4/public/namespaces/loki/users/${id}`,
		)
		.json();

	return userSchema.parse(r);
}

const heroStatsSchema = z.object({
	GamesPlayed: z.number(),
	Placements: z.record(z.string(), z.number()),
	TimePlayedSeconds: z.number(),
	Kills: z.number(),
	MaxKills: z.number(),
	MaxKillStreak: z.number(),
	Knocks: z.number(),
	MaxKnocks: z.number(),
	Knocked: z.number(),
	Deaths: z.number(),
	Revives: z.number(),
	MaxRevives: z.number(),
	Revived: z.number(),
	Resurrects: z.number(),
	MaxResurrects: z.number(),
	Resurrected: z.number(),
	CreepKills: z.number(),
	GoldEarned: z.number(),
	HeroDamageDealt: z.number(),
	MaxHeroDamageDealt: z.number(),
	HeroDamageTaken: z.number(),
	MaxHeroDamageTaken: z.number(),
	HealingGiven: z.number(),
	MaxHealingGiven: z.number(),
});
export type HeroStats = z.infer<typeof heroStatsSchema>;

export const statsByQueueSchema = z.object({
	ID: z.string(),
	StatsByHero: z.record(z.string(), heroStatsSchema),
});
export type StatsByQueue = z.infer<typeof statsByQueueSchema>;

export const playerStatsSchema = z.object({
	ID: z.string(),
	Version: z.number(),
	StatsByQueue: z.record(z.string(), statsByQueueSchema),
});
export type PlayerStats = z.infer<typeof playerStatsSchema>;

export async function getPlayerStats({
	token,
	id,
}: {
	token?: string;
	id: string;
}) {
	const r = await api
		.get(
			`https://player-stats-jx-prod.prodcluster.awsinfra.theorycraftgames.com/player-stats/players/${id}`,
			{
				hooks: {
					afterResponse: [
						async (request, _options, response) => {
							if (response.status === 404) {
								notFound();
							}

							return response;
						},
					],
				},
			},
		)
		.json<PlayerStats>();

	return playerStatsSchema.parse(r);
}
