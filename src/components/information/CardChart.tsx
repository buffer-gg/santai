"use client";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

type ChartDataItem = Record<string, number | string>;

interface CardChartProps {
	chartData: ChartDataItem[];
	dataKey: string;
	zoomFactor?: number;
}

export default function CardChart({
	chartData,
	dataKey,
	zoomFactor = 1.1,
}: CardChartProps) {
	const values = chartData
		.map((item) => Number(item[dataKey]))
		.filter((v) => !isNaN(v));
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
