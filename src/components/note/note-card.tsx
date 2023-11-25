import { TNote } from "@/lib/z.schemas";
import { NoteDialog } from "./note-modal";
import DeleteNote from "./delete-note";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function NoteCard({ note }: { note: TNote }) {
	return (
		<Card className=" mx-auto flex h-fit w-full flex-col justify-between md:min-h-[45dvh]  ">
			<>
				<CardHeader>
					<CardTitle>{note.title}</CardTitle>
					<CardDescription> {format(new Date(note.createdAt), "MM/dd/yyyy")}</CardDescription>
				</CardHeader>

				<CardContent className="mx-auto w-[80%]">
					<p className="whitespace-pre-line break-all">{note.content}</p>
				</CardContent>
			</>

			<CardFooter className="flex w-full flex-wrap items-center justify-around gap-2 md:flex-nowrap">
				<NoteDialog type="edit" note={note} />
				<DeleteNote noteId={note.id} />
			</CardFooter>
		</Card>
	);
}
