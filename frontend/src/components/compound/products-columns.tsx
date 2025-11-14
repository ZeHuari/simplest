// import SortButton from '@/components/compound/SortButton'

import type { ProductType } from "@/types/products.types";
import NumberFlow from "@number-flow/react";
import type { ColumnDef } from "@tanstack/react-table";

import SortButton from "./sort-button";
import { SquarePen, Trash } from "lucide-react";

// export const productsColumns: ColumnDef<ProductType>[] = [
export const productsColumns = (
	onClickFunction: any,
): ColumnDef<ProductType>[] => [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<div className="w-full flex justify-center mx-auto">
					<SortButton label="Nombre" column={column} />
				</div>
			);
		},
		cell: ({ row }) => {
			const data = row.original as ProductType;
			return (
				<div className="flex items-center space-x-2 justify-center">
					<p className="text-primary underline underline-offset-1">
						{data?.name}
					</p>
				</div>
			);
		},
	},

	{
		accessorKey: "totalFee",
		header: ({ column }) => {
			return (
				<div className="w-full flex justify-center mx-auto">
					<SortButton label="Precio" column={column} />
				</div>
			);
		},
		cell: ({ row }) => {
			const data = row.original as ProductType;
			return (
				<div className="text-center">
					<p>
						<NumberFlow
							value={data?.price || 0}
							locales={["es-BO"]}
							format={{ style: "currency", currency: "BOB" }}
						/>
					</p>
				</div>
			);
		},
	},

	{
		accessorKey: "allSettlementPending",
		header: ({ column }) => {
			return <div className="w-full flex justify-center mx-auto">Acciones</div>;
		},
		cell: ({ row }) => {
			const data = row.original as ProductType;

			return (
				<div className="flex justify-center gap-3 mx-auto w-full min-w-max">
					<div className="p-1 px-2 rounded-full border border-gray-300">
						<SquarePen
							onClick={() => {
								onClickFunction(data, "edit");
							}}
							className="text-primary w-4"
						/>
					</div>
					<div className="p-1 px-2 rounded-full border border-gray-300">
						<Trash
							onClick={() => {
								onClickFunction(data, "delete");
							}}
							className="text-destructive w-4"
						/>
					</div>

					{/* <LiquidationForm
            dataEdit={{
              ...data?.proof,
              id: data?.id,
            }}
            isAmount={data?.settlement}
          /> */}
				</div>
			);
		},
	},
];
