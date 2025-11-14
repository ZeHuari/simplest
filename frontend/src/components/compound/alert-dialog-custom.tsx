import React from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

interface Props {
	onClickFunction: any;
	open: boolean;
	setOpen: any;
}
function AlertDialogCustom({ onClickFunction, open, setOpen }: Props) {
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Estas seguro de quere eliminar este producto?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Esta accion no se podra deshacer, estas absourtamente seguro de
						eliminar ede producto
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={() => onClickFunction()}>
						Si, eliminar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default AlertDialogCustom;
