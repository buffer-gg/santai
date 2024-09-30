import type { Leaderboard } from "../types/leaderboard";
import type PlayerStats from "../types/playerStats";
import type { SoloPayload } from "../types/payload";
import noStoreFetch from "./noStoreFetch";

export type LeaderboardId = keyof typeof leaderboards;

export const defaultLeaderboardId: LeaderboardId = "season0";
export const leaderboardIdsToPrefetch: LeaderboardId[] = ["season0"];

export const leaderboards = {
  season0: {
    enabled: true,

    id: "season0",
    name: "Season 0",

    fetchData: async () => {
      const res = await noStoreFetch(
        "https://collective-production.up.railway.app/getLeaderboard/1000/SOLO",
      );
      const data = await res.json();
      const playerStats = (data as SoloPayload).map((d) => {
        return {
          "username": d.username,
          "placement": d.placement,
          "rating": d.rating
        }
      })
      return playerStats as unknown as PlayerStats[];
    },
  },
} satisfies Record<string, Leaderboard>;

