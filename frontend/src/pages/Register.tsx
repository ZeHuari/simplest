import { useState } from "react";
import { register } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			await register(email, password);
			alert("Usuario creado correctamente");
			navigate("/login");
		} catch (err) {
			alert(err.response?.data?.message || "Error al registrar");
		}
	};

	return (
		// <div className="max-w-md mx-auto mt-10">
		// 	<h1 className="text-2xl font-bold mb-4">Login</h1>
		// 	<form onSubmit={handleSubmit}>
		// 		<Input
		// 			placeholder="Email"
		// 			type="email"
		// 			value={email}
		// 			onChange={(e) => setEmail(e.target.value)}
		// 		/>
		// 		<Input
		// 			placeholder="Password"
		// 			type="password"
		// 			value={password}
		// 			onChange={(e) => setPassword(e.target.value)}
		// 		/>
		// 		<Button type="submit">Login</Button>
		// 	</form>
		// 	<div>
		// 		ya tienes una cuenta? <Link to="/register">Registrate</Link>
		// 	</div>
		// </div>
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
						{/* <form onSubmit={handleSubmit}>
							<Input
								placeholder="Email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Input
								placeholder="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Button type="submit">Login</Button>
						</form> */}
						<form onSubmit={handleSubmit} className={cn("flex flex-col gap-6")}>
							<FieldGroup>
								<div className="flex flex-col items-center gap-1 text-center">
									<p className="text-3xl font-bold">Create una cuenta</p>
									<p className="text-muted-foreground text-sm text-balance">
										Ingresa los datos de tu cuenta
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
									<Button type="submit">Crear cuenta</Button>
								</Field>

								<Field>
									<FieldDescription className="text-center">
										Ya tienes una cuenta?
										<Link to="/login" className="underline underline-offset-4">
											Inicia sesión
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
