import noStoreFetch from "../fetch/noStoreFetch";
import type { SoloPayload } from "./payload";
import type PlayerStats from "./playerStats";
import getSoloRankFromNumber from "./rank";

export type Leaderboard = {
    enabled: boolean;
  
    id: string;
    name: string;
  
    fetchData: () => Promise<any>;
    transformData?: (data: any[]) => any[];
};

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
          "username": d.SpectrePlayer.displayName,
          "placement": d.rank,
          "soloRank": getSoloRankFromNumber(d.currentSoloRank)
        }
      })
      return playerStats as unknown as PlayerStats[];
    },
  },
} satisfies Record<string, Leaderboard>;
