import NoteCard from "@/components/note/note-card";
import { fetchNotes } from "@/lib/data";
import { TNote } from "@/lib/z.schemas";
import { auth } from "@clerk/nextjs";
import { ArrowUp } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "aiNotes - notes",
	description: "Notes page"
};

export default async function NotesPage() {
	const { userId } = auth();
	if (!userId) {
		redirect("/");
	}

	const notes = await fetchNotes(userId);

	if (!notes.length) {
		return (
			<div className="flex flex-col items-center justify-start">
				<h2 className="flex text-xl text-emerald-200">
					you don&apos;t have any notes yet. do you like to create one ?
					<ArrowUp className="scale-0 lg:scale-100" />
				</h2>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-7xl">
			<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				{notes.map((note: TNote) => (
					<li key={note.id} className="mx-auto w-[90%]  ">
						<NoteCard note={note} />
					</li>
				))}
			</ul>
		</div>
	);
}
