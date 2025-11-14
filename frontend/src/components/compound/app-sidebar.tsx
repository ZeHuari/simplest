"use client";
import * as React from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavSecondary } from "./nav-secundary";
import {
	Camera,
	CandlestickChart,
	ChartArea,
	Folder,
	HelpCircle,
	LayoutDashboard,
	LifeBuoy,
	Search,
	Settings,
	User,
} from "lucide-react";
import { NavMain } from "./nav-main";
import { Link } from "react-router-dom";
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Productos",
			url: "/products",
			icon: LayoutDashboard,
		},
		{
			title: "Ordenes",
			url: "/orders",
			icon: CandlestickChart,
		},
		// {
		// 	title: "Lifecycle",
		// 	url: "#",
		// 	icon: LifeBuoy,
		// },
		// {
		// 	title: "Analytics",
		// 	url: "#",
		// 	icon: ChartArea,
		// },
		// {
		// 	title: "Projects",
		// 	url: "#",
		// 	icon: Folder,
		// },
		// {
		// 	title: "Team",
		// 	url: "#",
		// 	icon: User,
		// },
	],
	navClouds: [
		{
			title: "Capture",
			icon: Camera,
			isActive: true,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Proposal",
			icon: Folder,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Prompts",
			icon: Folder,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Settings",
			url: "#",
			icon: Settings,
		},
		{
			title: "Get Help",
			url: "#",
			icon: HelpCircle,
		},
		{
			title: "Search",
			url: "#",
			icon: Search,
		},
	],
	documents: [
		{
			name: "Data Library",
			url: "#",
			icon: ChartArea,
		},
		{
			name: "Reports",
			url: "#",
			icon: ChartArea,
		},
		{
			name: "Word Assistant",
			url: "#",
			icon: ChartArea,
		},
	],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<Link to="/products">
								<ChartArea className="!size-5" />
								<span className="text-base font-semibold">Acme Inc.</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				{/* <NavDocuments items={data.documents} /> */}
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
