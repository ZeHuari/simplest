import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuthStore } from "../context/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GalleryVerticalEnd } from "lucide-react";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const setTokenStore = useAuthStore((state) => state.setToken);
	const { setUser } = useAuthStore();
	const navigate = useNavigate();

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		// try {
		// 	console.log(email, password);
		// 	const data = await login(email, password);
		// 	setTokenStore(data.token);
		// 	setUser(data.user);

		// 	navigate("/products");
		// } catch (err) {
		// 	alert(err.response?.data?.message || "Error al iniciar sesión");
		// }
		toast.promise(
			async () => {
				const data = await login(email, password);

				setTokenStore(data.token);
				setUser(data.user);

				navigate("/products");
			},
			{
				loading: "Iniciando sesión...",
				success: "¡Sesión iniciada correctamente!",
				error: (err: any) =>
					err.response?.data?.message ||
					err.message ||
					"Error al iniciar sesión",
			},
		);
	};

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link to="/" className="flex items-center gap-2 font-medium">
						<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
							<GalleryVerticalEnd className="size-4" />
						</div>
						simplest
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<form onSubmit={handleSubmit} className={cn("flex flex-col gap-6")}>
							<FieldGroup>
								<div className="flex flex-col items-center gap-1 text-center">
									<p className="text-3xl font-bold">Ingresa con tu cuenta</p>
									<p className="text-muted-foreground text-sm text-balance">
										Ingresa tu correo para iniciar sesión
									</p>
								</div>
								<Field>
									<FieldLabel htmlFor="email">Correo Electronico</FieldLabel>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										required
										onChange={(e) => setEmail(e.target.value)}
									/>
								</Field>
								<Field>
									<div className="flex items-center">
										<FieldLabel htmlFor="password">Contraseña</FieldLabel>
									</div>
									<Input
										id="password"
										placeholder="********"
										type="password"
										required
										onChange={(e) => setPassword(e.target.value)}
									/>
								</Field>
								<Field>
									<Button type="submit">Iniciar sesión</Button>
								</Field>

								<Field>
									<FieldDescription className="text-center">
										No tienes una cuenta?
										<Link
											to="/register"
											className="underline underline-offset-4"
										>
											Create una cuenta
										</Link>
									</FieldDescription>
								</Field>
							</FieldGroup>
						</form>
					</div>
				</div>
			</div>
			<div
				className="relative hidden lg:flex items-center justify-center h-full w-full
                bg-gradient-to-r from-[#209628] to-[#67a600]"
			>
				<p className="text-white font-bold text-4xl">simplest</p>
			</div>
		</div>
	);
}
