"use client";

import { Button } from "@/components/ui/button";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Folder, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: any;
	}[];
}) {
	const location = useLocation();
	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					{items.map((item) => {
						const isActive = location.pathname === item.url;

						return (
							<SidebarMenuItem key={item.title}>
								<Link to={item.url}>
									<SidebarMenuButton
										tooltip={item.title}
										className={`flex gap-2 ${
											isActive
												? "bg-primary text-white hover:bg-primary hover:text-white"
												: "hover:bg-gray-200"
										}`}
									>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
									</SidebarMenuButton>
								</Link>
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
