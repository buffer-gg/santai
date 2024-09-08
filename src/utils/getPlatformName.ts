import { RANK_TYPES } from "@/types";

export default (platform: RANK_TYPES) => {
  const platforms = {
    [RANK_TYPES.SOLO]: "Crossplay",
    [RANK_TYPES.Steam]: "Steam",
    [RANK_TYPES.Xbox]: "Xbox",
    [RANK_TYPES.PSN]: "PlayStation",
  };

  return platforms[platform] ?? "Unknown";
};
