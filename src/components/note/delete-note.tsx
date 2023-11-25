"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

const DeleteNote = ({ noteId }: { noteId: string }) => {
	const router = useRouter();
	const [processingDelete, setProcessingDelete] = useState(false);

	const handleOnDelete = async () => {
		try {
			setProcessingDelete(true);
			const confirmDelete = confirm("Are you sure you want to delete this note?");
			if (confirmDelete) {
				const res = await fetch(`/api/notes`, {
					body: JSON.stringify({ id: noteId }),
					method: "DELETE"
				});

				if (!res.ok) {
					throw new Error("Something went wrong!");
				}
			} else {
				setProcessingDelete(false);
				return;
			}
		} catch (error: any) {
			console.log(error.message);
			alert("Something went wrong!Couldn't delete note. Please try again later.");
		} finally {
			router.refresh();
			setProcessingDelete(false);
		}
	};

	return (
		<div>
			<Button
				variant="destructive"
				onClick={handleOnDelete}
				disabled={processingDelete}
				className="disabled:cursor-not-allowed disabled:bg-red-100 disabled:text-red-500"
			>
				{processingDelete ? (
					<>
						processing <span className="loading loading-dots">...</span>
					</>
				) : (
					<div className="flex items-center gap-1">
						<Trash className="h-6 w-6" />
						Delete
					</div>
				)}
			</Button>
		</div>
	);
};

export default DeleteNote;
