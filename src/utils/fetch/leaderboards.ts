import type { BaseUser, BaseUserWithExtras, LeaderboardPayload } from "@/types";
import noStoreFetch from "./noStoreFetch";
import groupBy from "./groupBy";

export const leaderboards = {
  season0: {
    tabGroup: 1,
    id: "season0",
    enabled: true,
    name: "Season 0",
    nameShort: "S0",
    disableLeagueFilter: true,
    disableRankTypeSelection: false,
    disableStatsPanel: false,
    fetchData: async () => {
      const res = await noStoreFetch(
        "https://collective-production.up.railway.app/getLeaderboard/1000/SOLO",
      );
      const data = await res.json();
      const BaseUser = (data as LeaderboardPayload).map((d) => {
        return {
          "name": d.SpectrePlayer.displayName,
          "rank": d.rank,
          "rankRating": d.currentSoloRank
        }
      })
      return BaseUser as unknown as BaseUser[];
    },
    tableColumns: ["rank", "name", "rankRating"],
  },
} satisfies Record<string, Leaderboard>;

export type Leaderboard = {
  tabGroup: number;
  id: string;
  enabled: boolean;
  name: string;
  nameShort: string;
  tabIcon?: JSX.Element;
  tableColumns: (keyof BaseUserWithExtras)[];
  disableRankTypeSelection: boolean;
  disableStatsPanel: boolean;
  disableLeagueFilter: boolean;
  fetchData: (rankType: string) => Promise<any>;
  transformData?: (data: any[]) => any[];
};

export type LeaderboardId = keyof typeof leaderboards;

export const defaultLeaderboardId: LeaderboardId = "season0";
export const leaderboardIdsToPrefetch: LeaderboardId[] = [
  "season0",
];

export const leaderboardsGroupedByTabGroup = Object.values(
  groupBy(Object.values(leaderboards), x => x.tabGroup),
) as Leaderboard[][];
