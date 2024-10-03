import type { PlayerMatchHistory, Player } from "@/app/types";


// Adjust the import path as needed
interface MatchDetailsProps {
  match: PlayerMatchHistory;
}

const MatchDetails: React.FC<MatchDetailsProps> = ({ match }) => {
    const renderPlayerRow = (player: Player, isPlayerTeam: boolean) => (
      <div key={player?.id} className="flex items-center justify-between py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          {/* <Image src={player?.avatar_url} alt={player?.name} width={24} height={24} className="rounded-full" /> */}
          <span className={isPlayerTeam ? "text-cyan-400" : "text-red-400"}>{player?.saved_player_name}</span>
        </div>
        <div className="flex gap-4">
          <span>{player?.total_damage_done?.toLocaleString()}</span>
          <span>{`${player?.num_kills}/${player?.num_deaths}/${player?.num_assists}`}</span>
        </div>
      </div>
    );
  
    return (
      <div className="mt-4 bg-slate-800 p-4 rounded-md text-white">
        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Team</span>
            <div className="flex gap-4">
              <span>Total Damage</span>
              <span>KDA</span>
            </div>
          </div>
          {(match?.player_team?.players as unknown as Player[])?.sort((a, b) => b?.total_damage_done - a?.total_damage_done)?.map(player => renderPlayerRow(player, true))}
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Enemy Team</span>
            <div className="flex gap-4">
              <span>Total Damage</span>
              <span>KDA</span>
            </div>
          </div>
          {(match?.opponent_team?.players as Player[])?.sort((a, b) => b?.total_damage_done - a?.total_damage_done).map(player => renderPlayerRow(player, false))}
        </div>
      </div>
    );
  };
  
  export default MatchDetails;