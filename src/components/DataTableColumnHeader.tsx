"use client"
// Borrowed from https://ui.shadcn.com/docs/components/data-table#column-header

import type { Column } from "@tanstack/react-table";
import { MenuIcon, SortAscIcon, SortDescIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center", className)}>
      <TooltipProvider>
        <Tooltip delayDuration={200} disableHoverableContent>
          <TooltipTrigger asChild className="w-fit">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 data-[state=open]:bg-accent w-full flex justify-center"
              onClick={() => column.toggleSorting()}
            >
              <p>{title}</p>
              {column.getIsSorted() === "asc" ? (
                <div className="flex">
                  <SortAscIcon className="ml-2 size-4" />
                </div>
              ) : column.getIsSorted() === "desc" ? (
                <div className="flex items-center">
                  <SortDescIcon className="ml-2 size-4" />
                </div>
              ) : (
                <div className="flex items-center">
                  <MenuIcon className="ml-2 size-4" />
                </div>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Click to{" "}
            {(() => {
              switch (column.getNextSortingOrder()) {
                case "asc":
                  return "sort by ascending";
                case "desc":
                  return "sort by descending";
                default:
                  return "clear sorting";
              }
            })()}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
