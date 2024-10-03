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

export interface Player {
  id: number;
  player: string;
  team: string;
  saved_player_name: string;
  selected_banner_catalog_id: string;
  saved_sponsor_name: string;
  selected_sponsor: string;
  is_anonymous_player: boolean;
  teammate_index: number;
  num_kills: number;
  num_assists: number;
  num_deaths: number;
  total_damage_done: number;
  current_rank_id: number;
  previous_rank_id: number;
  current_ranked_rating: number;
  previous_ranked_rating: number;
  crew_score: number;
  crew: string;
  division: string;
  num_ranked_matches: number;
  created_at: string;
  updated_at: any;
}

export interface PlayerMatchHistory {
  id: number;
  player: string;
  team: string;
  saved_player_name: string;
  selected_banner_catalog_id: string;
  saved_sponsor_name: string;
  selected_sponsor: string;
  is_anonymous_player: boolean;
  teammate_index: number;
  num_kills: number;
  num_assists: number;
  num_deaths: number;
  total_damage_done: number;
  current_rank_id: number;
  previous_rank_id: number;
  current_ranked_rating: number;
  previous_ranked_rating: number;
  crew_score: number;
  crew: string;
  division: string;
  num_ranked_matches: number;
  created_at: string;
  updated_at: any;
  spectre_match_team: {
      id: string;
      rounds_won: number;
      team_index: number;
      xp_per_round: number;
      rounds_played: number;
      spectre_match: {
          id: string;
          teams: {
              id: string;
              team: string;
              match: string;
              created_at: string;
              rounds_won: number;
              team_index: number;
              updated_at: any;
              xp_per_round: number;
              rounds_played: number;
              fans_per_round: number;
              used_team_rank: boolean;
              current_rank_id: number;
              previous_rank_id: number;
              xp_per_round_won: number;
              fans_per_round_won: number;
              num_ranked_matches: number;
              ranked_rating_delta: number;
              current_ranked_rating: number;
              is_full_team_in_party: boolean;
              previous_ranked_rating: number;
          }[];
          region: string;
          is_ranked: boolean;
          created_at: string;
          match_date: string;
          queue_name: string;
          updated_at: any;
          queue_game_map: string;
          queue_game_mode: string;
          surrendered_team: number;
          is_abandoned_match: boolean;
      };
      fans_per_round: number;
      used_team_rank: boolean;
      current_rank_id: number;
      previous_rank_id: number;
      xp_per_round_won: number;
      fans_per_round_won: number;
      num_ranked_matches: number;
      ranked_rating_delta: number;
      current_ranked_rating: number;
      is_full_team_in_party: boolean;
      previous_ranked_rating: number;
  };
  player_team: {
      id: string;
      rounds_won: number;
      team_index: number;
      xp_per_round: number;
      rounds_played: number;
      spectre_match: {
          id: string;
          teams: {
              id: string;
              team: string;
              match: string;
              created_at: string;
              rounds_won: number;
              team_index: number;
              updated_at: any;
              xp_per_round: number;
              rounds_played: number;
              fans_per_round: number;
              used_team_rank: boolean;
              current_rank_id: number;
              previous_rank_id: number;
              xp_per_round_won: number;
              fans_per_round_won: number;
              num_ranked_matches: number;
              ranked_rating_delta: number;
              current_ranked_rating: number;
              is_full_team_in_party: boolean;
              previous_ranked_rating: number;
          }[];
          region: string;
          is_ranked: boolean;
          created_at: string;
          match_date: string;
          queue_name: string;
          updated_at: any;
          queue_game_map: string;
          queue_game_mode: string;
          surrendered_team: number;
          is_abandoned_match: boolean;
      };
      fans_per_round: number;
      used_team_rank: boolean;
      current_rank_id: number;
      previous_rank_id: number;
      xp_per_round_won: number;
      fans_per_round_won: number;
      num_ranked_matches: number;
      ranked_rating_delta: number;
      current_ranked_rating: number;
      is_full_team_in_party: boolean;
      previous_ranked_rating: number;
      players: Player[];
  };
  opponent_team: {
      id: string;
      team: string;
      match: string;
      created_at: string;
      rounds_won: number;
      team_index: number;
      updated_at: any;
      xp_per_round: number;
      rounds_played: number;
      fans_per_round: number;
      used_team_rank: boolean;
      current_rank_id: number;
      previous_rank_id: number;
      xp_per_round_won: number;
      fans_per_round_won: number;
      num_ranked_matches: number;
      ranked_rating_delta: number;
      current_ranked_rating: number;
      is_full_team_in_party: boolean;
      previous_ranked_rating: number;
      players: Player[];
  };
  match: {
      id: string;
      region: string;
      is_ranked: boolean;
      created_at: string;
      match_date: string;
      queue_name: string;
      updated_at: any;
      queue_game_map: string;
      queue_game_mode: string;
      surrendered_team: number;
      is_abandoned_match: boolean;
  };
}