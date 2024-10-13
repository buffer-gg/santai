"use client";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

type ChartDataItem = Record<string, number | string | Date>;

interface CardChartProps {
	chartData: ChartDataItem[];
	dataKey: string;
	zoomFactor?: number;
}

export default function CardChart({
	chartData: initialChartData,
	dataKey,
	zoomFactor = 1.1,
}: CardChartProps) {
	const [chartData, setChartData] = useState(initialChartData);
	useEffect(() => {
		const handleChartUpdate = (event: CustomEvent) => {
			console.log("[CardChart] Player data updated", event);
			const updatedPlayerData = event.detail;
			const newChartData = generateChartData(updatedPlayerData, dataKey);
			setChartData(newChartData);
		};

		window.addEventListener("updateCharts", handleChartUpdate as EventListener);

		return () => {
			console.log("[CardChart] Removing updateCharts listener");
			window.removeEventListener(
				"updateCharts",
				handleChartUpdate as EventListener,
			);
		};
	}, [dataKey]);

	function generateChartData(
		playerData: any,
		dataKey: string,
	): ChartDataItem[] {
		return playerData.matches
			.slice(0, 10)
			.map((match: any) => ({
				date: match.match_date,
				[dataKey]: calculateDataValue(match, dataKey),
			}))
			.sort(
				(a: any, b: any) =>
					new Date(a.date).getTime() - new Date(b.date).getTime(),
			);
	}

	function calculateDataValue(match: any, dataKey: string): number {
		// Implement this function based on your data structure
		// For example:
		if (dataKey === "rank_rating") {
			return (
				match.player_team.players.find((p: any) => p.id === match.player_id)
					?.ranked_rating || 0
			);
		}
		if (dataKey === "adr") {
			return (
				match.player_team.players.find((p: any) => p.id === match.player_id)
					?.damage_dealt / match.player_team.rounds_played || 0
			);
		}
		return 0;
	}
	const values = chartData
		.map((item: any) => Number(item[dataKey]))
		.filter((v: number) => !Number.isNaN(v));
	const minValue = Math.min(...values);
	const maxValue = Math.max(...values);
	const padding = ((maxValue - minValue) * (zoomFactor - 1)) / 2;

	return (
		<div className="w-full h-full">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={chartData}>
					<defs>
						<linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#f9c61f" stopOpacity={0.3} />
							<stop offset="95%" stopColor="#f9c61f" stopOpacity={0.05} />
						</linearGradient>
					</defs>
					<YAxis domain={[minValue - padding, maxValue + padding]} hide />
					<Area
						type="linear"
						dataKey={dataKey}
						stroke="#f9c61f"
						strokeWidth={3}
						fillOpacity={1}
						fill="url(#colorDesktop)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
