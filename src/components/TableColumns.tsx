"use client"

import { createColumnHelper } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Minus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Icons from "./icons";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import type { BaseUser, RANK_TYPES, BaseUserWithExtras } from "@/types";
import { type LeaderboardId, leaderboards } from "@/utils/leaderboards";
import leagueToImage from "@/utils/leagueToImage";
import getRankNameFromRating from "@/utils/getRankNameFromRating";

const columnHelper = createColumnHelper<BaseUserWithExtras>();

export const columns = (
  leaderboardId: LeaderboardId,
  selectedPlatform: RANK_TYPES,
) => [
  // Rank
  columnHelper.accessor("rank", {
    id: "rank",
    invertSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rank" />
    ),
    cell: ({ getValue }) => getValue().toLocaleString("en"),
  }),

  // Change
  columnHelper.accessor("change", {
    id: "change",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="24h change" />
    ),
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <span
          className={cn(
            value > 0 ? "text-green-700" : value === 0 ? "" : "text-red-600",
          )}
        >
          {value > 0 ? (
            <span className="inline-flex items-center">
              {<ChevronUp className="inline h-6" />}
              {value.toLocaleString("en")}
            </span>
          ) : value < 0 ? (
            <span className="inline-flex items-center">
              {<ChevronDown className="inline h-6" />}
              {Math.abs(value).toLocaleString("en")}
            </span>
          ) : (
            <span className="inline-flex items-center">
              {<Minus className="inline h-5" />}
              {value.toLocaleString("en")}
            </span>
          )}
        </span>
      );
    },
  }),

  // Name
  columnHelper.accessor(
    user =>
      `${user.name} ${user.steamName ?? ""} ${user.xboxName ?? ""} ${
        user.psnName ?? ""
      }`.toLowerCase(),
    {
      id: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row: { original: user } }) => {
        // If user has a non-empty platform name, show it in a tooltip
        // If no platform names are present, show just the Embark name
        return user.steamName || user.xboxName || user.psnName ? (
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild className="w-fit">
                {platformNamesInline(user)}
              </TooltipTrigger>
              <TooltipContent>{namePopoverContent(user)}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <span className="inline-flex gap-1">
            {/* If platform selection is not disabled, add the selected platform icon before the name */}
            {!leaderboards[leaderboardId].disableRankTypeSelection && (
              <>
                {selectedPlatform === "steam" && (
                  <Icons.steam className="inline size-5 opacity-60" />
                )}
                {selectedPlatform === "xbox" && (
                  <Icons.xbox className="inline size-5 opacity-60" />
                )}
                {selectedPlatform === "psn" && (
                  <Icons.playstation className="inline size-5 opacity-60" />
                )}
              </>
            )}
            {user.name}
          </span>
        );
      },
    },
  ),

  // XP
  columnHelper.accessor("xp", {
    id: "xp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="XP" />
    ),
    cell: ({ getValue }) => (getValue() ?? 0).toLocaleString("en"),
  }),

  columnHelper.accessor("level", {
    id: "level",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Level" />
    ),
    cell: ({ getValue }) => (getValue() ?? 0).toLocaleString("en"),
  }),

  // Cashouts
  columnHelper.accessor("cashouts", {
    id: "cashouts",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cashouts" />
    ),
    cell: ({ getValue }) =>
      (getValue() ?? 0).toLocaleString("en", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
  }),

  // Rank Rating
  columnHelper.accessor(
    user => ({
      rankRating: user.rankRating,
    }),
    {
      id: "rankRating",
      filterFn: (value, _, filterValue: string[]) =>
        !filterValue.length || filterValue.includes(value.original.rankRating),
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Rank Rating" />;
      },
      cell: ({ getValue }) => {
        const { rankRating } = getValue();
        const rankName = getRankNameFromRating(rankRating, "SOLO")
        return (
          <div>
            <div className="flex items-center gap-2 rounded px-1 transition-colors  hover:bg-neutral-800">
              <div className="size-[50px]">
                {rankName && leagueToImage(rankName, 50)}
              </div>

              <div className="flex flex-col items-start">
                <span>{rankName}</span>
                {/* {(fame || rankScore) && (
                  <span>{(fame ?? rankScore ?? 0).toLocaleString("en")}</span>
                )} */}
              </div>
            </div>

          </div>
        );
      },
    },
  ),

  // Distance
  columnHelper.accessor("distance", {
    id: "distance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Distance" />
    ),
    cell: ({ getValue }) =>
      `${(getValue() ?? 0).toLocaleString("en", {
        style: "decimal",
        maximumFractionDigits: 2,
      })} km`,
  }),

  // Games Won
  columnHelper.accessor("gamesWon", {
    id: "gamesWon",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Games Won" />
    ),
    cell: ({ getValue }) => (getValue() ?? 0).toLocaleString("en"),
  }),

  // Rounds Won
  columnHelper.accessor("roundsWon", {
    id: "roundsWon",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rounds Won" />
    ),
    cell: ({ getValue }) => (getValue() ?? 0).toLocaleString("en"),
  }),

  // Total Rounds
  columnHelper.accessor("totalRounds", {
    id: "totalRounds",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Rounds" />
    ),
    cell: ({ getValue }) => (getValue() ?? 0).toLocaleString("en"),
  }),

  // Eliminations
  columnHelper.accessor("eliminations", {
    id: "eliminations",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Eliminations" />
    ),
    cell: ({ getValue }) => (getValue() ?? 0).toLocaleString("en"),
  }),

  // Score
  columnHelper.accessor("score", {
    id: "score" as const,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Score" />
    ),
    cell: ({ getValue }) => (getValue() ?? 0).toLocaleString("en"),
  }),

  // Score
  columnHelper.accessor("damageDone", {
    id: "damageDone" as const,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Damage Done" />
    ),
    cell: ({ getValue }) => (getValue() ?? 0).toLocaleString("en"),
  }),

  // Tournament Wins
  columnHelper.accessor("tournamentWins", {
    id: "tournamentWins",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tournament Wins" />
    ),
    cell: ({ getValue }) => (getValue() ?? 0).toLocaleString("en"),
  }),
];

const platformNamesInline = (user: BaseUser) => {
  return (
    <div className="flex flex-col gap-1">
      <div>
        <span className="font-medium">{user.name.split("#")[0]}</span>
        <span className="text-neutral-500">#{user.name.split("#")[1]}</span>
      </div>

      {user.steamName && (
        <span className="inline-flex items-center gap-1">
          <Icons.steam className="inline size-5 opacity-60" />
          <span>{user.steamName}</span>
        </span>
      )}

      {user.xboxName && (
        <span className="inline-flex items-center gap-1">
          <Icons.xbox className="inline size-5 opacity-60" />
          <span>{user.xboxName}</span>
        </span>
      )}

      {user.psnName && (
        <span className="inline-flex items-center gap-1">
          <Icons.playstation className="inline size-5 opacity-60" />
          <span>{user.psnName}</span>
        </span>
      )}
    </div>
  );
};

const namePopoverContent = (user: BaseUser) => {
  if (!user.steamName && !user.xboxName && !user.psnName) return;
  return (
    <div className="flex flex-col gap-2">
      <span className="inline-flex gap-1">
        <img src="/images/Embark.png" className="inline size-5 dark:hidden" />
        <img
          src="/images/Embark-White.png"
          className="hidden size-5 dark:inline"
        />
        <span className="font-semibold">Embark ID:</span>
        <span>{user.name}</span>
      </span>

      {user.steamName && (
        <span className="inline-flex gap-1">
          <Icons.steam className="inline size-5" />
          <span className="font-semibold">Steam:</span>
          <span>{user.steamName}</span>
        </span>
      )}

      {user.xboxName && (
        <span className="inline-flex gap-1">
          <Icons.xbox className="inline size-5" />
          <span className="font-semibold">Xbox:</span>
          <span>{user.xboxName}</span>
        </span>
      )}

      {user.psnName && (
        <span className="inline-flex gap-1">
          <Icons.playstation className="inline size-5" />
          <span className="font-semibold">PlayStation:</span>
          <span>{user.psnName}</span>
        </span>
      )}
    </div>
  );
};
