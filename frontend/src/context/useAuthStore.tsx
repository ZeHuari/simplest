import { create } from "zustand";
import { getToken, removeToken, setToken } from "@/lib/utils";

interface AuthStore {
	user: any | null;
	token: string | null;
	setUser: (user: any) => void;
	setToken: (token: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	token: getToken(),
	setUser: (user) => set({ user }),
	setToken: (token) => {
		set({ token });
		setToken(token);
	},
	logout: () => {
		removeToken();
		set({ user: null, token: null });
	},
}));
