import NoteCard from "@/components/note/note-card";
import { fetchNotes } from "@/lib/data";
import { TNote } from "@/lib/z.schemas";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "aiNotes - notes",
	description: "Notes page"
};

export default async function NotesPage() {
	const notes = await fetchNotes();
	const { userId } = auth();

	if (!userId) {
		throw new Error("No user ID");
	}

	return (
		<main className="flex min-h-screen w-full flex-col items-center gap-4 px-4 py-4 ">
			<Suspense fallback={<div>Loading...</div>}>
				<ul className="mx-auto grid w-full grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
					{notes.map((note: TNote) => (
						<li
							key={note.id}
							className="col-span-1 mx-auto flex w-full flex-col items-center justify-between gap-5 rounded-lg border border-gray-300 p-5 shadow-md md:w-3/4 "
						>
							<NoteCard note={note} />
						</li>
					))}
				</ul>
			</Suspense>
		</main>
	);
}
