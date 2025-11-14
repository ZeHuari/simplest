import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Paperclip } from "lucide-react";
import { Form } from "../ui/form";
import { DynamicFormField } from "./dynamic-form-field";
import { Button } from "../ui/button";
import { useForm, type FieldErrors } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { productsFormSchema } from "@/lib/schemas/product-form-schema";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { createProduct, updateProduct } from "@/api/products";
import type { ProductType } from "@/types/products.types";

interface ProductFormProps {
	refetchFunction: () => void;
	dateEdit?: ProductType;
	open?: boolean;
	setOpen?: any;
}
function ProducForm({
	refetchFunction,
	dateEdit,
	open,
	setOpen,
}: ProductFormProps) {
	const [isEdit, setIsEdit] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleOpenChange = (open: boolean) => {
		setOpen(open);
	};

	const form = useForm<z.infer<typeof productsFormSchema>>({
		resolver: zodResolver(productsFormSchema),
		defaultValues: {
			name: "",
			price: "",
		},
	});

	async function onSubmit(data: z.infer<typeof productsFormSchema>) {
		toast.promise(
			(async () => {
				try {
					setLoading(true);

					const { name, price } = data;
					isEdit
						? await updateProduct(dateEdit?.id, { name, price })
						: await createProduct({ name, price });
					console.log(data);
					setOpen(false);
					return;
				} catch (error) {
					console.error("Error al enviar los datos:", error);
					throw error;
				} finally {
					setLoading(false);
					refetchFunction();
				}
			})(),
			{
				loading: `${isEdit ? "Actualizando" : "Creando"} liquidacion...`,
				success: (data) => {
					form.reset({
						name: "",
						price: "",
					});
					return `Producto creado con exito`;
				},
				error: (err) => {
					setLoading(false);
					return getErrorMessage(err);
				},
			},
		);
	}

	const onError = (errors: FieldErrors<z.infer<typeof productsFormSchema>>) => {
		console.log(errors);
		toast.error("Llena todos los campos necesarios");
	};
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (dateEdit) {
			setIsEdit(true);
			form.setValue("name", dateEdit?.name);
			form.setValue("price", String(dateEdit?.price));
		}
	}, [dateEdit]);

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				{!isEdit && <Button>Agregar producto</Button>}
			</DialogTrigger>

			<DialogContent className="max-h-[80vh] overflow-y-auto !overflow-x-visible">
				<DialogHeader>
					<div className="flex flex-col justify-center gap-2 mb-[6px]">
						<DialogTitle className="text-xl font-bold">
							{`${isEdit ? "Editar" : "Agregar"} producto`}
						</DialogTitle>
					</div>
					<DialogDescription>
						{isEdit ? "Editar este producto" : "Registra el producto"}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit, onError as never)}
						className="flex flex-col gap-3"
					>
						<DynamicFormField
							control={form.control}
							name="name"
							label="Nombre"
							placeholder="Ingresa el monto aqui"
							required
						/>

						<DynamicFormField
							control={form.control}
							name="price"
							label="Precio"
							type="number"
							required
							placeholder="Nota de liquidación"
						/>
					</form>
				</Form>

				<DialogFooter className="flex items-center gap-2 mt-3 sm:justify-end w-full">
					<DialogClose asChild>
						<Button variant="ghost">Cancelar</Button>
					</DialogClose>

					<DialogClose asChild>
						<Button
							onClick={(e) => {
								e.preventDefault();
								form.handleSubmit(onSubmit, onError)();
							}}
							disabled={loading}
						>
							{isEdit ? "Guardar cambios" : "Agregar liquidación"}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default ProducForm;
