"use client";

import { useState } from "react";
import MatchDetails from "./MatchDetails";
import type { PlayerMatchHistory } from "@/app/types";

export default function MatchHistory({PlayerMatchHistory}: {PlayerMatchHistory: PlayerMatchHistory[]}) {
    const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);
    // If the match was played today, return the time, otherwise return the date
    const getDate = (date: string) => {
        const matchDate = new Date(date);
        const now = new Date();
        const diffTime = now.getTime() - matchDate.getTime();
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        if (diffMinutes <= 60) {
            const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
            return rtf.format(-diffMinutes, "minute");
        }if (diffHours <= 24) {
            const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
            return rtf.format(-diffHours, "hour");
        }
        return matchDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }

    const getQueueName = (queueName: string) => {
        switch (queueName) {
            case "custom": 
                return "Custom";
            case "standard_ranked":
                return "Ranked";
            case "standard_casual":
                return "Casual";
            default:
                return queueName;
        }
    }

    const getMapName = (mapName: string) => {
        const lowerCaseMapName = mapName.toLowerCase();
        switch (lowerCaseMapName) {
            case "commons_p":
                return "Commons";
            case "metro_p":
                return "Metro";
            case "junction_p":
                return "Skyway";
            case "greenbelt_p":
                return "Mill";
            default:
                return mapName;
        }
    }

    const getMatchResult = (match: PlayerMatchHistory): 'Win' | 'Loss' | 'Draw' | 'Surrender' => {
        if (match.match.surrendered_team !== -1) {
            if (match.match.surrendered_team === match.player_team.team_index) {
                return 'Surrender';
            }
            return 'Win';
        }
        if (match.player_team.rounds_won > match.opponent_team.rounds_won) {
            return 'Win';
        } if (match.player_team.rounds_won < match.opponent_team.rounds_won) {
            return 'Loss';
        }
        return 'Draw';
    }


    return (
        <ul className="flex flex-col items-center justify-center gap-4 w-full max-w-2xl">
        {PlayerMatchHistory.map((match) => (
            <li key={match.match.id} className="w-full">
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <div 
                    className={`flex flex-row items-center justify-between w-full bg-gradient-to-r from-slate-800 to-slate-900 p-4 rounded-md border-l-4 cursor-pointer ${
                        getMatchResult(match) === 'Win' ? 'border-green-500' : 
                        getMatchResult(match) === 'Loss' ? 'border-red-500' : 
                        getMatchResult(match) === 'Draw' ? 'border-yellow-500' : 'border-slate-500'
                    }`}
                    onClick={() => setExpandedMatchId(expandedMatchId === match.match.id ? null : match.match.id)}
                >
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-white">{getMatchResult(match)}</span>
                            <span className="text-sm text-gray-400">• {getQueueName(match.match.queue_name)}</span>
                            <span className="text-sm text-gray-400">• {getDate(match.match.match_date)}</span>
                        </div>
                        <div className="text-sm text-gray-300">{getMapName(match.match.queue_game_map)}</div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <div className="text-lg font-semibold text-white">{`${match.player_team.rounds_won} - ${match.opponent_team.rounds_won}`}</div>
                            <div className="text-sm text-gray-400">Score</div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-semibold text-white">{(match.num_kills / match.num_deaths).toFixed(2)}</div>
                            <div className="text-sm text-gray-400">KDA</div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-semibold text-white">{match.num_kills}</div>
                            <div className="text-sm text-gray-400">Kills</div>
                        </div>
                    </div>  
                </div>
                {expandedMatchId === match.match.id && (
                    <MatchDetails match={match} />
                )}
            </li>
        ))}
        </ul>
    )
}