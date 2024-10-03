import MatchHistory from "./MatchHistory";
import type { PlayerMatchHistory } from "@/app/types";

export default async function Player({params}: {params: {playerId: string}}) {
   
    const player = await fetch(`https://smokeshift-production.up.railway.app/api/v1/player-match-history/${params.playerId}`);

    const PlayerMatchHistory: PlayerMatchHistory[] = await player.json();

    return (
        <div className="flex flex-col items-center justify-center py-10">
            <h1 className="text-2xl font-bold text-center text-white">{PlayerMatchHistory[0].saved_player_name}</h1>
            <MatchHistory PlayerMatchHistory={PlayerMatchHistory} />
        </div>
    )

}