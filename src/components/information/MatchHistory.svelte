<script lang="ts">
import { onMount } from "svelte";
import MatchDetails from "./MatchDetails.svelte";
import type { PlayerFullProfile } from "../../utils/types/wavescan.types";

export let playerFullProfile: PlayerFullProfile;

onMount(async () => {
	// In a real implementation, you would fetch data here
	// const response = await fetch(`/api/matchHistory/${playerId}`);
	// const data = await response.json();
	// matches = data.matches;
	// last20Stats = data.last20Stats;
});

// // Make matches reactive
// $: reactiveMatches = matches.map(match => ({
//     ...match,
//     expanded: false
// }));

function toggleMatchDetails(match) {
	match.expanded = !match.expanded;
	// Force update of reactiveMatches
	reactiveMatches = [...reactiveMatches];
}

function getMapName(
	map: string,
): "Commons" | "Metro" | "Mill" | "Skyway" | "Unknown" {
	switch (map.toLowerCase()) {
		case "commons_p":
			return "Commons";
		case "metro_p":
			return "Metro";
		case "greenbelt_p":
			return "Mill";
		case "junction_p":
			return "Skyway";
		default:
			return "Unknown";
	}
}

// export let wins = 11;
// export let defeats = 9;

// $: totalGames = wins + defeats;

let reactiveMatches = playerFullProfile?.matches?.map((match) => ({
	...match,
	expanded: false,
	result:
		match.winner === -1
			? "Draw"
			: match.winner === match.player_team?.team_index
				? "Victory"
				: "Defeat",
}));

const last20Wins =
	playerFullProfile?.extended_stats?.last_20_matches_avg_stats?.total_wins;
const last20Losses =
	playerFullProfile?.extended_stats?.last_20_matches_avg_stats?.total_losses;
const last20Winrate =
	playerFullProfile?.extended_stats?.last_20_matches_avg_stats
		?.average_win_percentage ?? 0;
const last20Kd =
	(playerFullProfile?.extended_stats?.last_20_matches_avg_stats
		?.average_kills_per_round ?? 0) /
	(playerFullProfile?.extended_stats?.last_20_matches_avg_stats
		?.average_deaths_per_round ?? 1);
const last20Adr =
	playerFullProfile?.extended_stats?.last_20_matches_avg_stats
		?.average_damage_per_round ?? 0;
</script>
    
    <div class="last-20-stats bg-[#09090b] rounded-lg p-4 mb-4 border-[#131315] border-2">
        <div class="flex flex-col lg:flex-row w-full">
          <div class="flex-grow lg:w-3/4 mb-4 lg:mb-0 lg:mr-4">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div class="flex flex-col">
                <h5 class="text-[#f9c61f] text-sm font-bold">Last 20 Matches</h5>
                <p class="text-light-2 text-sm">{last20Wins}W {last20Losses}L</p>
              </div>
              <div class="flex flex-col">
                <h5 class="text-[#f9c61f] text-sm font-bold">Winrate</h5>
                <p class="text-light-2 text-sm">{last20Winrate.toFixed(2)}%</p>
              </div>
              <div class="flex flex-col">
                <h5 class="text-[#f9c61f] text-sm font-bold">K/D</h5>
                <p class="text-light-2 text-sm">{last20Kd.toFixed(2)}</p>
              </div>
              <div class="flex flex-col">
                <h5 class="text-[#f9c61f] text-sm font-bold">ADR</h5>
                <p class="text-light-2 text-sm">{last20Adr.toFixed(2)}</p>
              </div>
            </div>
            <!-- Dynamic W/L bar -->
            <div class="w-full h-1 rounded-full overflow-hidden flex">
              {#if last20Wins > 0}
                <div
                  class="h-full bg-valid transition-all duration-500 bg-green-500"
                  style="width: {(last20Wins / (last20Wins + last20Losses) * 100)}%"
                ></div>
              {/if}
              {#if last20Losses > 0}
                <div
                  class="h-full bg-wrong transition-all duration-500 bg-red-500"
                  style="width: {(last20Losses / (last20Wins + last20Losses) * 100)}%"
                ></div>
              {/if}
            </div>
          </div>
          <!-- <div class="lg:w-1/4 flex items-center">
            <div class="flex flex-row justify-between w-full">
              <div class="flex flex-col items-center">
                <img src="/images/sponsor-logos/Morrgen.png" alt="Morrgen" class="w-12 h-12 rounded-lg border-2 border-[#131315] bg-[#e6b824]" />
                <p class="text-light-2 text-sm font-bold mt-1">55%</p>
              </div>
              <div class="flex flex-col items-center">
                <img src="/images/sponsor-logos/Pinnacle.png" alt="Pinnacle" class="w-12 h-12 rounded-lg border-2 border-[#131315] bg-[#e6b824]" />
                <p class="text-light-2 text-sm font-bold mt-1">55%</p>
              </div>
              <div class="flex flex-col items-center">
                <img src="/images/sponsor-logos/Vector.png" alt="Vector" class="w-12 h-12 rounded-lg border-2 border-[#131315] bg-[#e6b824]" />
                <p class="text-light-2 text-sm font-bold mt-1">55%</p>
              </div>
            </div>
          </div> -->
        </div>
      </div>

  <div class="matches space-y-2">
    {#each reactiveMatches as match (match.id)}
    <div
      class="bg-[#09090b] relative border-2 border-neutral-600/[0.15] border-solid rounded-lg mb-4"
      on:click={() => toggleMatchDetails(match)}
      on:keydown={(e) => e.key === 'Enter' && toggleMatchDetails(match)}
      tabindex="0"
      role="button"
    >
      <div class="grid grid-cols-[6px_1fr_auto] w-full max-w-[63.50rem] m-auto">
        <!-- Colored border based on match result -->
        <div class={`${match.result === 'Victory' ? 'bg-green-700' : match.result === 'Defeat' ? 'bg-red-700' : 'bg-neutral-700'}`}></div>
        
        <div class="relative flex p-4">
          <!-- Updated gradient effect -->
          <div class={`absolute inset-0 opacity-10 bg-gradient-to-r ${match.result === 'Victory' ? 'from-green-700' : match.result === 'Defeat' ? 'from-red-700' : 'from-neutral-700'} to-transparent`}></div>
          
          <div class="grid grid-cols-[auto_1fr_auto] gap-4 w-full relative z-10">
            <div class="cursor-pointer w-12 h-12">
              <img src={`/images/sponsor-logos/${match?.player_team?.players?.find(player => player.id === playerFullProfile?.id)?.sponsor_name}.png`} alt={match?.player_team?.players?.find(player => player.id === playerFullProfile?.id)?.sponsor_name} class="object-cover w-full h-full" />
            </div>
            <div class="cursor-pointer flex-grow">
              <h5 class="text-neutral-400 text-sm font-bold flex gap-[0.38rem] capitalize mb-2 items-center">
                <span class={`font-semibold ${match.result === 'Victory' ? 'text-green-500' : match.result === 'Defeat' ? 'text-red-500' : 'text-neutral-500'}`}>{match.result}</span>
                <span class="text-xs opacity-50">•</span>
                <span class={`font-medium text-xs ${match?.player_team?.players?.find(player => player.id === playerFullProfile?.id)?.ranked_rating_delta >= 0 ? 'text-green-500' : 'text-red-500'}`}>{match?.player_team?.players?.find(player => player.id === playerFullProfile?.id)?.ranked_rating_delta ? match?.player_team?.players?.find(player => player.id === playerFullProfile?.id)?.ranked_rating_delta > 0 ? `+${match?.player_team?.players?.find(player => player.id === playerFullProfile?.id)?.ranked_rating_delta}` : `${match?.player_team?.players?.find(player => player.id === playerFullProfile?.id)?.ranked_rating_delta}` : ''}</span>
                <span class="text-xs opacity-50">•</span>
                <span class="text-xs">{match.queue_name}</span>
                <span class="text-xs opacity-50">•</span>
                <span class="text-xs">{new Date(match.match_date).toLocaleDateString()}</span>
              </h5>
              <div class="grid grid-cols-4 gap-2">
                <div class="flex flex-col gap-2">
                  <div class="text-sm font-semibold text-light-1">{match?.player_team?.rounds_won} - {match?.opponent_team?.rounds_won}</div>
                  <div class="text-neutral-400 text-xs">{getMapName(match.map)}</div>
                </div>
                <div class="flex flex-col gap-2">
                  <div class="text-sm font-semibold text-light-1">{match?.player_team?.players?.find(player => player.id === playerFullProfile?.id)?.kills} / {match?.player_team?.players?.find(player => player.id === playerFullProfile?.id)?.deaths} / {match?.player_team?.players?.find(player => player.id === playerFullProfile?.id)?.assists}</div>
                  <div class="text-neutral-400 text-xs">KDA</div>
                </div>
                <div class="flex flex-col gap-2">
                  <div class="text-sm font-semibold text-light-1">{(match?.player_team?.players?.find(player => player.id === playerFullProfile?.id)?.kills / match?.player_team?.rounds_played).toFixed(2) || '0.00'}</div>
                  <div class="text-neutral-400 text-xs">KPR</div>
                </div>
                <div class="flex flex-col gap-2">
                  <div class="text-sm font-semibold text-light-1">{(match?.player_team?.players?.find(player => player.id === playerFullProfile?.id)?.damage_dealt / match?.player_team?.rounds_played).toFixed(2) || '0.00'}</div>
                  <div class="text-neutral-400 text-xs">ADR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="border-l-neutral-600/[0.15] border-l-2 flex-col justify-between text-gray-200/[0.5] hidden md:flex">
            <button on:click|stopPropagation={() => toggleMatchDetails(match)} class="cursor-pointer flex-grow justify-center pt-1.5 flex w-7 h-20 items-end">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 320 512" fill="rgba(235, 236, 240, 0.5)" class="w-6 h-6 transition-transform duration-300 {match.expanded ? 'rotate-180' : ''}">
                  <path fill="rgba(235, 236, 240, 0.5)" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                </svg>
              </button>
        </div>

      </div>
      {#if match.expanded}
        <MatchDetails {match} />
      {/if}
    </div>
  {/each}
  </div>

<style>
  /* Add any additional styles here */
</style>

  