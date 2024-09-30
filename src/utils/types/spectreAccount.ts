import type SpectreCrew from "./spectreCrew";

export default interface SpectreAccount {
    id: number
    steamId: string
    playerId: string
    username: string
    spectreCrew: SpectreCrew
  }