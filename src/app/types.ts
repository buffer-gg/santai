export type BaseUser = {
  rank: number;
  rankRatingNumber?: number;
  rankRating: string;
  name: string,
  // change: number;
  // name: string;
  // steamName: string;
  // xboxName: string;
  // psnName: string;
  // xp?: number;
  // level?: number;
  // cashouts?: number;
  // fame?: number;
  // rankScore?: number;
};

/** A type with the base values plus any additional extras (special events, modes) */
export type BaseUserWithExtras = BaseUser & {
  distance?: number;
  gamesWon?: number;
  roundsWon?: number;
  totalRounds?: number;
  eliminations?: number;
  score?: number;
  damageDone?: number;
  tournamentWins?: number;
};

export enum RANK_TYPES {
  SOLO = "SOLO",
  TEAM = "TEAM",
  CREW = "CREW",
}

export enum Panels {
  Table = "table",
  Stats = "stats",
}

export type LeaderboardPayload = LeaderboardPayloadRoot[];

export interface LeaderboardPayloadRoot {
  rank: number
  currentSoloRank: number
  highestTeamRank: number
  SpectrePlayer: SpectrePlayer
}

export interface SpectrePlayer {
  id: number
  steamId: string
  playerId: string
  SpectreCrew: SpectreCrew
  displayName: string
}

export interface SpectreCrew {
  id: number
  crewId: string
  crewName: string
}