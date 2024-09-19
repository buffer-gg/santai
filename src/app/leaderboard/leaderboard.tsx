"use client"

import "../index.css";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import {
  BarChartIcon,
  Loader2Icon,
  RefreshCwIcon,
  TableIcon,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Notice from "@/components/Notice";
import CommunityProgress from "@/components/CommunityProgress";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/TableColumns";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Stats from "@/components/Stats";
import ThemeToggle from "@/components/ThemeToggle";
import Icons from "@/components/icons";
import Link from "@/components/Link";
import { cn } from "@/lib/utils";
import { Panels, RANK_TYPES } from "@/app/types";
import { fetchData } from "@/utils/fetchData";
import { communityEvents } from "@/utils/communityEvents";
import {
  type Leaderboard,
  type LeaderboardId,
  defaultLeaderboardId,
  leaderboardIdsToPrefetch,
  leaderboards,
  leaderboardsGroupedByTabGroup,
} from "@/utils/leaderboards";

const LeaderboardComponent = () => {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSearchParams(new URLSearchParams(window.location.search));
    }
  }, []);

  // Initialize state variables with default values
  const [selectedLeaderboardVersion, setSelectedLeaderboardVersion] = useState<LeaderboardId>(defaultLeaderboardId);
  const [selectedRankType, setSelectedRankType] = useState<RANK_TYPES>(RANK_TYPES.SOLO);
  const [selectedPanel, setSelectedPanel] = useState<Panels>(Panels.Table);

  useEffect(() => {
    if (searchParams) {
      const leaderboardSearchParam = searchParams.get("leaderboard");
      const rankTypeSearchParam = searchParams.get("rankType");
      const panelSearchParam = searchParams.get("panel");

      // Set the initial leaderboard version to the query param if:
      // - The query param is set
      // - The query param is a valid leaderboard version
      // - The leaderboard version is enabled
      // Otherwise, use the default leaderboard version
      const initialLeaderboardVersion =
        leaderboardSearchParam &&
        Object.keys(leaderboards).includes(
          leaderboardSearchParam as LeaderboardId,
        ) &&
        leaderboards[leaderboardSearchParam as LeaderboardId].enabled
          ? leaderboardSearchParam
          : defaultLeaderboardId;

      setSelectedLeaderboardVersion(initialLeaderboardVersion as LeaderboardId);

      // Set the initial Rank-Type to the query param if:
      // - The query param is set
      // - The query param is a valid Rank-Type
      // Otherwise, use the default Rank-Type (SOLO)
      const initialRankType =
        rankTypeSearchParam &&
        Object.values(RANK_TYPES).includes(rankTypeSearchParam as RANK_TYPES)
          ? rankTypeSearchParam
          : RANK_TYPES.SOLO;

      setSelectedRankType(initialRankType as RANK_TYPES);

      // Set the initial panel to the query param if:
      // - The query param is set
      // - The query param is a valid panel
      // - The Stats panel is not disabled
      // Otherwise, use the default panel (Table)
      const initialPanel =
        panelSearchParam &&
        Object.values(Panels).includes(panelSearchParam as Panels) &&
        !leaderboards[initialLeaderboardVersion as LeaderboardId].disableStatsPanel
          ? panelSearchParam
          : Panels.Table;

      setSelectedPanel(initialPanel as Panels);
    }
  }, [searchParams]);

  const queryClient = useQueryClient();

  // Use TanStack Query to fetch data
  // This will cache all combinations of leaderboard version and rank-type infinitely
  // Or until the page is refreshed or the cache is invalidated (refresh button is pressed)
  const { isLoading, data, isError, dataUpdatedAt, isRefetching } = useQuery({
    queryKey: ["leaderboard", selectedLeaderboardVersion, selectedRankType],
    queryFn: () => fetchData(selectedLeaderboardVersion, selectedRankType),
    staleTime: Infinity, // Cache the data until the page is refreshed
  });

  // Prefetch data for the other leaderboard version and rank-type
  // User when hovering over the tabs
  // Defaults to the current selected values in state, but can be overridden
  const prefetchData = ({
    leaderboard,
    rankType,
  }: {
    leaderboard?: LeaderboardId;
    rankType?: RANK_TYPES;
  }) => {
    queryClient.prefetchQuery({
      queryKey: [
        "leaderboard",
        leaderboard ?? selectedLeaderboardVersion,
        rankType ?? selectedRankType,
      ],
      queryFn: () =>
        fetchData(
          leaderboard ?? selectedLeaderboardVersion,
          rankType ?? selectedRankType,
        ),
      staleTime: Infinity,
    });
  };

  // On initial render, prefetch data for select leaderboards
  useEffect(() => {
    leaderboardIdsToPrefetch.forEach(leaderboard =>
      prefetchData({ leaderboard }),
    );
  }, []);

  // Store selected leaderboard version and rank-type in URL
  // Perhaps not the best way to do it, but it works
  // Remove the query param if it's the default values
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    selectedLeaderboardVersion === defaultLeaderboardId
      ? searchParams.delete("leaderboard")
      : searchParams.set("leaderboard", selectedLeaderboardVersion);

    selectedRankType === RANK_TYPES.SOLO
      ? searchParams.delete("rankType")
      : searchParams.set("rankType", selectedRankType);

    selectedPanel === Panels.Table
      ? searchParams.delete("panel")
      : searchParams.set("panel", selectedPanel);

    window.history.replaceState(
      null,
      "",
      searchParams.size > 0 ? `?${searchParams.toString()}` : "/leaderboard",
    );
  }, [selectedLeaderboardVersion, selectedRankType, selectedPanel]);

  const updateSelectedLeaderboard = (leaderboard: LeaderboardId) => {
    // Switch to Table panel if the Stats panel is disabled
    if (
      leaderboards[leaderboard as LeaderboardId].disableStatsPanel &&
      selectedPanel === Panels.Stats
    ) {
      setSelectedPanel(Panels.Table);
    }
    setSelectedLeaderboardVersion(leaderboard);
  };

  const disabled = isLoading || isRefetching;

  return (
    <div className="container mb-12 mt-12 font-saira  mr-0 max-sm:px-2 lg::mt-2 ml-0 lg:ml-12 flex flex-col">
      <h5>
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        {/* <button
        id="share-button"
          title="Copy link to clipboard"
          className="w-40 text-left font-semibold hover:underline"
          onClick={() => {
            const shareData = {
              title: document.title,
              text: "Check out the Enhanced Leaderboard for THE FINALS!",
              url: "https://the-finals-leaderboard.com",
            };

            if (
              typeof navigator.canShare === "function" &&
              navigator.canShare(shareData)
            ) {
              navigator.share(shareData);
            } else {
              navigator.clipboard.writeText(shareData.url).then(() => {
                const button = document.getElementById(
                  "share-button",
                ) as HTMLButtonElement;
                button.textContent = "Link copied!";
                button.disabled = true;
                setTimeout(() => {
                  button.textContent = "Share this website!";
                  button.disabled = false;
                }, 1500);
              });
            }
          }}
        >
          Share this website!
        </button> */}
        Solo Leaderboard - Undergoing Maintenance (V2 Update Soon)
      </h5>


      {/* <div className="my-2">
        <CommunityProgress
          eventData={Object.values(communityEvents).find(x => x.active)}
        />
      </div> */}

      <div className="my-4 flex flex-col gap-5 w-full">
        <div className="flex flex-wrap gap-2">
          <div className="block w-full min-[600px]:hidden">
            Leaderboard:{" "}
            <span className="font-medium">
              {leaderboards[selectedLeaderboardVersion].name}
            </span>
          </div>

          {/* LEADERBOARD VERSION */}
          <Tabs
            className="flex select-none flex-wrap gap-2"
            value={selectedLeaderboardVersion}
            onValueChange={e => updateSelectedLeaderboard(e as LeaderboardId)}
          >
            {leaderboardsGroupedByTabGroup.map((group, i) => (
              <TabsList key={i}>
                {group
                  ?.filter(leaderboard => leaderboard.enabled)
                  .toReversed()
                  .map((leaderboard: Leaderboard) => (
                    <TabsTrigger
                      key={leaderboard.id}
                      value={leaderboard.id}
                      onPointerEnter={() =>
                        prefetchData({
                          leaderboard: leaderboard.id as LeaderboardId,
                        })
                      }
                    >
                      <span className="hidden items-center gap-1 min-[600px]:flex">
                        {leaderboard.tabIcon} {leaderboard.name}
                      </span>
                      <span className="flex items-center gap-1 min-[600px]:hidden">
                        {leaderboard.tabIcon} {leaderboard.nameShort}
                      </span>
                    </TabsTrigger>
                  ))}
              </TabsList>
            ))}
          </Tabs>

          {/* LEADERBOARD PLATFORM */}
          <Tabs
            className="select-none"
            defaultValue={selectedRankType}
            onValueChange={e => setSelectedRankType(e as RANK_TYPES)}
          >
            <TabsList>
              {[
                {
                  leaderboardRankType: RANK_TYPES.SOLO,
                  title: "Solo",
                  icon: <Icons.solo className="inline size-5" />,
                },
                {
                  leaderboardRankType: RANK_TYPES.TEAM,
                  title: "Team",
                  icon: <Icons.team className="inline size-5" />,
                  disabled: true
                },
                {
                  leaderboardRankType: RANK_TYPES.CREW,
                  title: "Crew",
                  icon: <Icons.crew className="inline size-5" />,
                  disabled: true
                },
              ].map(({ leaderboardRankType: value, icon, disabled }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  disabled={
                    disabled ||
                    leaderboards[selectedLeaderboardVersion]
                      .disableRankTypeSelection
                  }
                  onPointerEnter={() => prefetchData({ rankType: value })}
                >
                  {icon}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <TooltipProvider disableHoverableContent>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="select-none"
                  onClick={() => queryClient.invalidateQueries()}
                  disabled={
                    disabled ||
                    Object.hasOwn(
                      leaderboards[selectedLeaderboardVersion],
                      "localData",
                    )
                  }
                >
                  <span className="mr-4 hidden min-[600px]:block">Refresh</span>

                  <div className="flex items-center min-[600px]:pr-2">
                    <RefreshCwIcon
                      className={cn(
                        "size-4",
                        (isLoading || isRefetching) && "animate-spin",
                      "block")}
                    />
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Refresh data.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* {isError && (
          <span className="text-lg">
            Error gathering data. Please{" "}
            <Link href="https://x.com/LIMIT_IO">
              contact the developer on Twitter
            </Link>{" "}
            or{" "}
            <Link href="https://discord.gg/CsYUxDj6k6">
              {" "}
              file an issue on Discord
            </Link>{" "}
            if this error persists.
          </span>
        )} */}

        {/* Panel selector and panels */}
        {!isError && (
          <div className="space-y-3">
            {/* <Tabs
              className="select-none"
              value={selectedPanel}
              onValueChange={v => setSelectedPanel(v as Panels)}
            >
              <TabsList>
                <TabsTrigger
                  value={Panels.Table}
                  disabled={isLoading || isRefetching}
                >
                  <TableIcon className="mr-2 inline size-5" />
                  Table
                </TabsTrigger>

                <TabsTrigger
                  value={Panels.Stats}
                  disabled={
                    isLoading ||
                    isRefetching ||
                    leaderboards[selectedLeaderboardVersion].disableStatsPanel
                  }
                >
                  <BarChartIcon className="mr-2 inline size-5" />
                  Stats
                </TabsTrigger>
              </TabsList>
            </Tabs> */}

            {selectedPanel === Panels.Table && (
              <DataTable
                key={selectedLeaderboardVersion}
                leaderboardVersion={selectedLeaderboardVersion}
                queryState={{ isLoading, isRefetching }}
                // https://github.com/TanStack/table/issues/4382#issuecomment-2081153305
                columns={(
                  columns(
                    selectedLeaderboardVersion,
                    selectedRankType,
                  ) as ColumnDef<unknown>[]
                ).filter(col =>
                  leaderboards[
                    selectedLeaderboardVersion
                    // @ts-ignore This does exist because I create it
                  ].tableColumns.includes(col.id),
                )}
                data={data ?? []}
              />
            )}

            {/* {selectedPanel === Panels.Stats && (
              <Stats
                leaderboardVersion={selectedLeaderboardVersion}
                platform={selectedRankType}
                users={data ?? []}
              />
            )} */}
          </div>
        )}
      </div>

      
    </div>
  );
};

export default LeaderboardComponent;