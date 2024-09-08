"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LeaderboardComponent from "./leaderboard";

const queryClient = new QueryClient();

export default function LeaderboardWrapper() {
    return (
        <QueryClientProvider client={queryClient}>
            <LeaderboardComponent/>
        </QueryClientProvider>
    );
}