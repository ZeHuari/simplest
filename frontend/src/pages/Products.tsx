import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/products";

import { DataTable } from "@/components/compound/data-table";
import { productsColumns } from "@/components/compound/products-columns";
import type { ProductType } from "@/types/products.types";
import ProducForm from "@/components/compound/product-form";
import AlertDialogCustom from "@/components/compound/alert-dialog-custom";
import { toast } from "sonner";

export default function Products() {
	const [products, setProducts] = useState([]);
	const [open, setOpen] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);
	const [dataEdit, setDataEdit] = useState<ProductType | null>(null);

	const fetchProducts = async () => {
		const data = await getProducts();
		setProducts(data);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchProducts();
	}, []);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>

	const handleDelete = async () => {
		toast.promise(
			deleteProduct(dataEdit?.id).then(() => {
				fetchProducts();
			}),
			{
				loading: "Eliminando producto...",
				success: "Producto eliminado correctamente",
				error: "Hubo un error al eliminar el producto",
			},
		);
	};

	const handleClikAlert = async (dataEdit: ProductType, type: string) => {
		setDataEdit(dataEdit);
		if (type === "delete") {
			setOpen(true);
		} else {
			console.log("HOLAA");
			setOpenEdit(true);
		}
	};

	return (
		<div className="max-w-xl mx-auto mt-10">
			<div className="flex justify-between">
				<p className="text-2xl font-bold ">Productos</p>
				<ProducForm
					refetchFunction={fetchProducts}
					open={openCreate}
					setOpen={setOpenCreate}
				/>
			</div>

			<DataTable
				columns={productsColumns(handleClikAlert)}
				data={products || []}
				identifier="Productos"
				hasFilters
				globalSearch
				customLabel="Buscar"
				hasFiltersDate
			/>

			<AlertDialogCustom
				onClickFunction={handleDelete}
				open={open}
				setOpen={setOpen}
			/>

			<div className="sr-only">
				<ProducForm
					dateEdit={dataEdit as ProductType}
					refetchFunction={fetchProducts}
					open={openEdit}
					setOpen={setOpenEdit}
				/>
			</div>
		</div>
	);
}
