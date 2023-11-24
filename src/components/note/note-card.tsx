import { TNote } from "@/lib/z.schemas";
import { NoteDialog } from "./note-modal";
import DeleteNote from "./delete-note";

export default function NoteCard({ note }: { note: TNote }) {
	return (
		<>
			<h2 className="text-2xl font-bold">{note.title}</h2>
			<p className="text-gray-500">{note.content}</p>
			<div className="flex w-full items-center justify-between gap-5">
				<NoteDialog type="edit" note={note} />
				<DeleteNote noteId={note.id} />
			</div>
		</>
	);
}
