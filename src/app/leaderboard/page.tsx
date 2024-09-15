import LeaderboardWrapper from "./wrapper";

export default function Leaderboard() {
    return (
        <div className="flex flex-col items-center">
                <LeaderboardWrapper/>
                <p className="w-full text-center text-xs leading-5 sm:text-sm">
                    This site is <b>not</b> affiliated with <b>Mountaintop Studios</b> and all
                    associated properties “Spectre Divide” are trademarks or registered
                    trademarks of <b>Mountaintop Studios</b>.
                    
                </p>
                <p className="w-full text-center text-xs leading-5 sm:text-sm">Message me on Discord at <b>limitedio</b> if you have any questions or concerns.</p>
        </div>

        
    )
}