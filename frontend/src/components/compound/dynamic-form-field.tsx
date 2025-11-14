import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { cn, handleWheel } from "@/lib/utils";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface DynamicFormFieldProps<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
> extends Partial<ControllerProps<TFieldValues, TName>> {
	label: string;
	placeholder?: string;
	type?: React.HTMLInputTypeAttribute;
	isTextarea?: boolean;
	required?: boolean;
	invisibleLabel?: boolean;
	inputId?: string;
	srOnly?: boolean;
	socialMedia?: React.ComponentType<{
		size: number;
		"aria-hidden": boolean;
		className: string;
	}>;
}

export function DynamicFormField<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
>({
	control,
	name,
	label,
	placeholder,
	type = "text",
	rules,
	required = false,
	isTextarea = false,
	invisibleLabel,
	inputId = "",
	srOnly = false,
	socialMedia,
	...props
}: DynamicFormFieldProps<TFieldValues, TName>) {
	const [showPassword, setShowPassword] = useState(false);

	const isPasswordType = type === "password";
	const inputType = isPasswordType && showPassword ? "text" : type;

	const Icon = socialMedia;

	return (
		<FormField
			control={control}
			name={name as TName}
			rules={rules}
			render={({ field }) => (
				<FormItem className={cn("w-full", srOnly && "sr-only")}>
					{!invisibleLabel && (
						<FormLabel>
							{label}{" "}
							{required ? (
								<span className="text-destructive">*</span>
							) : (
								<span className="text-disabled-foreground text-xs">
									(opcional)
								</span>
							)}
						</FormLabel>
					)}

					<FormControl>
						<div className="relative">
							{isTextarea ? (
								<Textarea
									placeholder={placeholder}
									className="resize-y"
									{...field}
									{...props}
								/>
							) : (
								<Input
									className={cn(
										srOnly && "sr-only max-h-[1px] max-w-[1px] p-0",
										socialMedia && "ps-9",
									)}
									type={inputType}
									placeholder={placeholder}
									{...field}
									{...props}
									id={inputId}
									onWheel={handleWheel}
								/>
							)}

							{socialMedia && (
								<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
									{Icon && (
										<Icon
											size={16}
											aria-hidden={true}
											className="text-disabled-foreground"
										/>
									)}
								</div>
							)}

							{isPasswordType && (
								<Button
									type="button"
									className="absolute max-h-max right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600 hover:bg-transparent"
									onClick={() => setShowPassword(!showPassword)}
									variant="ghost"
									size="icon"
								>
									{showPassword ? (
										<EyeOffIcon className="min-h-5 min-w-5 text-gray-500" />
									) : (
										<EyeIcon className="min-h-5 min-w-5 text-gray-500" />
									)}
								</Button>
							)}
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
