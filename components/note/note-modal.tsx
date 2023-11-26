"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";

import { Plus, PenLine } from "lucide-react";
import { NoteForm } from "./note-form";
import { useState } from "react";
import { TNote } from "@/lib/z.schemas";

type TNoteDialogProps = {
	type: "add" | "edit";
	note?: TNote;
};

export const NoteDialog = ({ type, note }: TNoteDialogProps) => {
	const [open, setOpen] = useState(false);
	const isAddMode = type === "add";

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="space-x-2 bg-slate-950 capitalize text-slate-50 transition-all duration-150 hover:opacity-95 dark:bg-slate-100 dark:text-slate-900">
					{isAddMode ? <Plus /> : <PenLine />}
					<span>{isAddMode ? "add note" : "edit note"}</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{isAddMode ? "Create New Note" : "Edit Note"}</DialogTitle>
					<DialogDescription>
						{isAddMode
							? "Create your Note. Click save when you're done."
							: "Edit your Note. Click save when you're done."}
					</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<NoteForm setOpen={setOpen} note={note} />
				</div>
			</DialogContent>
		</Dialog>
	);
};
