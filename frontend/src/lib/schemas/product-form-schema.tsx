import * as z from "zod";

export const productsFormSchema = z.object({
	id: z.string().optional(),
	price: z.string().nonempty("El precio es requerido"),
	name: z.string().nonempty("El nombre es requerido"),
});
