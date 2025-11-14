import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import { useAuthStore } from "../context/useAuthStore";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/react-router";
import Orders from "@/pages/Orders";

export default function AppRoutes() {
	const { token } = useAuthStore();

	return (
		<NuqsAdapter>
			<BrowserRouter>
				<Routes>
					<Route
						path="/login"
						element={!token ? <Login /> : <Navigate to="/products" />}
					/>
					<Route
						path="/register"
						element={!token ? <Register /> : <Navigate to="/products" />}
					/>

					<Route element={<DashboardLayout />}>
						<Route
							path="/products"
							element={token ? <Products /> : <Navigate to="/login" />}
						/>
						<Route
							path="/orders"
							element={token ? <Orders /> : <Navigate to="/login" />}
						/>
					</Route>
					<Route
						path="*"
						element={<Navigate to={token ? "/products" : "/login"} />}
					/>
				</Routes>
				<Toaster richColors />
			</BrowserRouter>
		</NuqsAdapter>
	);
}
