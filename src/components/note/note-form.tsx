"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { TCreateNote, TNote, createNoteSchema } from "@/lib/z.schemas";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { useRouter } from "next/navigation";

type TNoteFormProps = {
	note?: TNote;
	setOpen: (open: boolean) => void;
};

export const NoteForm = ({ setOpen, note }: TNoteFormProps) => {
	const router = useRouter();
	const form = useForm<TCreateNote>({
		resolver: zodResolver(createNoteSchema),
		defaultValues: {
			title: note ? note.title : "",
			content: note ? note.content : ""
		}
	});

	const onSubmitHandler = async (data: TCreateNote) => {
		try {
			//*****!add note
			if (!note?.id) {
				const res = await fetch("/api/notes", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(data)
				});
				if (!res.ok) {
					throw new Error("Something went wrong!");
				}
			} else {
				//****!edit note
				const res = await fetch("/api/notes", {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ ...data, id: note.id })
				});
				if (!res.ok) {
					throw new Error("Something went wrong!");
				}
			}

			form.reset();
			router.refresh();
			setOpen(false);
		} catch (error: any) {
			console.log(error.message);
			alert("Something went wrong!Couldn't delete note. Please try again later.");
		}
	};

	return (
		<div className="flex w-full flex-col gap-4">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmitHandler)}
					className="flex w-full flex-col justify-between "
				>
					<div className="flex w-full flex-col justify-between gap-6">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>title</FormLabel>
									<FormControl>
										<Input id="title" placeholder="note title..." className="" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem>
									<FormLabel>content</FormLabel>
									<FormControl>
										<Textarea id="content" placeholder="note content..." className="" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					<DialogFooter className="mt-4 flex w-full">
						<DialogClose asChild>
							<Button type="button" variant="secondary" className="mr-auto">
								Close
							</Button>
						</DialogClose>
						<SubmitButton isSubmitting={form.formState.isSubmitting} />
					</DialogFooter>
				</form>
			</Form>
		</div>
	);
};

const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
	return (
		<Button
			type="submit"
			disabled={isSubmitting}
			className=" bg-slate-900 text-slate-50 disabled:cursor-not-allowed dark:bg-slate-200 dark:text-slate-900  dark:disabled:bg-slate-500 dark:disabled:text-slate-100 "
		>
			{isSubmitting ? (
				<>
					Processing <span className="loading loading-dots">...</span>
				</>
			) : (
				"Save"
			)}
		</Button>
	);
};
