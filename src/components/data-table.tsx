"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
	type ColumnDef,
	CoreRow,
	type Row,
	type SortingState,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Fragment, useState } from "react";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
	initialSorting = [],
	renderSubComponent = defaultRenderSubComponent,
	uniqueRowKey = "id",
}: DataTableProps<TData, TValue> & {
	initialSorting?: SortingState;
	renderSubComponent?: (props: { row: Row<TData> }) => React.ReactNode;
	uniqueRowKey?: string;
}) {
	const [sorting, setSorting] = useState<SortingState>(initialSorting);

	const [animationParent] = useAutoAnimate();

	const table = useReactTable({
		data,
		columns,
		state: { sorting },
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		getRowCanExpand: () => true,
		getExpandedRowModel: getExpandedRowModel(),
	});

	return (
		<div className="rounded-md border">
			<Table className="bg-muted">
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id} className="bg-black/20">
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody ref={animationParent}>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row, i) => (
							// @ts-ignore
							<Fragment key={row.original[uniqueRowKey] ?? row.id}>
								<TableRow
									// key={row.original.id + row.id}
									data-state={row.getIsSelected() && "selected"}
									// TODO: odd bg color
									className={cn(
										"relative border-b hover:bg-white/5 hover:text-white",
										{
											"border-b-0": row.getIsExpanded(),
										},
									)}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											style={{ width: cell.column.columnDef.size || "auto" }}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
								{row.getIsExpanded() && (
									<TableRow>
										<TableCell colSpan={row.getVisibleCells().length}>
											{renderSubComponent({ row })}
										</TableCell>
									</TableRow>
								)}
							</Fragment>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}

const defaultRenderSubComponent = <TData,>({ row }: { row: Row<TData> }) => {
	return <pre>{JSON.stringify(row.original, null, 2)}</pre>;
};
