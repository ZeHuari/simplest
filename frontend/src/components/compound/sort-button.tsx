import type { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

type Props<T> = {
	column: Column<T, unknown>;
	label: string;
};

function SortButton<T>({ column, label }: Props<T>) {
	return (
		<Button
			className="border-none mx-auto justify-center gap-1.5 bg-transparent px-1 dark:text-foreground text-gray-600 hover:bg-[#edecec] dark:hover:bg-neutral-700 text-sm font-semibold hover:text-gray-950"
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		>
			<ArrowUpDown className="h-4 w-4 stroke-primary" />
			{label}
		</Button>
	);
}

export default SortButton;
