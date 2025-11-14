import * as React from "react";

import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	flexRender,
	getCoreRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
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

import { DataTablePagination } from "./data-table-pagination";
import { usePaginationSearchParams } from "@/hooks/pagination";
import { InfoIcon, Loader2 } from "lucide-react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isFetching?: boolean;
	identifier: string;
	hasFilters?: boolean;
	hasPagination?: boolean;
	globalSearch?: boolean;
	customLabel?: string;
	hasFiltersDate?: boolean;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	isFetching = false,
	identifier,
	hasPagination = true,
	hasFilters = false,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] = React.useState({});
	const [{ pageIndex, pageSize }] = usePaginationSearchParams();

	const table = useReactTable({
		data: data,
		columns: columns as ColumnDef<TData, TValue>[],
		initialState: {
			pagination: {
				pageIndex,
				pageSize,
			},
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onRowSelectionChange: setRowSelection,
		getFacetedUniqueValues: getFacetedUniqueValues(),
		state: {
			sorting,
			columnFilters,
			rowSelection,
			columnVisibility,
		},
		onColumnVisibilityChange: setColumnVisibility,
	});

	return (
		<div className="pl-1 w-full">
			{hasFilters && (
				<div className="flex items-center space-x-8 my-8">
					<div className="flex items-center space-x-2">
						{/* <Button variant="outline">
              <FilterIcon />
              <span>Filtrar</span>
            </Button> */}
						{/* <Button
              variant="outline"
              onClick={() => exportData(data as never[], exportType)}
            >
              <DownloadIcon className="min-w-5 min-h-5" />
              <span>Exportar</span>
            </Button> */}
					</div>
				</div>
			)}

			<div className="md:max-w-[90vw] w-full rounded-lg border border-solid border-[#b6b6b6] dark:border-border overflow-hidden">
				<Table className="border-collapse">
					<TableHeader className="bg-[#F9F9F9] dark:bg-background border-b rounded-lg">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
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
					<TableBody>
						{isFetching ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									<div className="flex items-center w-full justify-center">
										<Loader2 className="animate-spin" />
									</div>
								</TableCell>
							</TableRow>
						) : (
							<>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow
											key={row.id}
											data-state={row.getIsSelected() && "selected"}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell
											colSpan={columns.length}
											className="h-24 text-center"
										>
											<div className="flex items-center w-full justify-center">
												<InfoIcon className="mr-2" />
												No existen {identifier}
											</div>
										</TableCell>
									</TableRow>
								)}
							</>
						)}
					</TableBody>
				</Table>
			</div>

			{hasPagination && (
				<div className="flex items-center justify-start space-x-2 py-4">
					<DataTablePagination table={table} identifier={identifier} />
				</div>
			)}
		</div>
	);
}
