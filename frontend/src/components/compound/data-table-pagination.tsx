import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { usePaginationSearchParams } from "@/hooks/pagination";

import type { Table } from "@tanstack/react-table";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";
import { useEffect } from "react";
import { Button } from "../ui/button";

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
	identifier: string;
}

export function DataTablePagination<TData>({
	table,
	identifier,
}: DataTablePaginationProps<TData>) {
	const [{ pageIndex, pageSize }, setPagination] = usePaginationSearchParams();

	const handlePageSizeChange = (value: string) => {
		const newSize = Number(value);
		setPagination({ pageSize: newSize, pageIndex: 0 });
	};

	const handlePageChange = (newPage: number) => {
		setPagination({ pageIndex: newPage, pageSize });
	};

	useEffect(() => {
		table.setPageIndex(pageIndex);
		table.setPageSize(pageSize);
	}, [table, pageIndex, pageSize]);

	return (
		<div className="flex items-center justify-between px-2 w-full max-w-[60%]">
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium min-w-max text-card-foreground">
						Mostrando
					</p>
					<Select value={`${pageSize}`} onValueChange={handlePageSizeChange}>
						<SelectTrigger className="h-8 w-[70px] border border-solid space-x-1 border-[#b6b6b6] focus-visible:ring-offset-1 focus-visible:ring-[#5a2d97]">
							<SelectValue placeholder={pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							{[10, 20, 30, 40, 50].map((size) => (
								<SelectItem key={size} value={`${size}`}>
									{size}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<p className="text-sm font-medium min-w-max text-card-foreground">
						de {table.getRowCount()} {identifier}
					</p>
				</div>
				<div className="flex w-[100px] items-center justify-center text-sm font-medium min-w-max text-card-foreground">
					Página {pageIndex + 1} de {table.getPageCount()}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex border-none"
						onClick={() => handlePageChange(0)}
						disabled={pageIndex === 0}
					>
						<span className="sr-only">Go to first page</span>
						<ChevronsLeftIcon className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0 border-none"
						onClick={() => handlePageChange(pageIndex - 1)}
						disabled={pageIndex === 0}
					>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeftIcon className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0 border-none"
						onClick={() => handlePageChange(pageIndex + 1)}
						disabled={pageIndex >= table.getPageCount() - 1}
					>
						<span className="sr-only">Go to next page</span>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex border-none"
						onClick={() => handlePageChange(table.getPageCount() - 1)}
						disabled={pageIndex >= table.getPageCount() - 1}
					>
						<span className="sr-only">Go to last page</span>
						<ChevronsRightIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
