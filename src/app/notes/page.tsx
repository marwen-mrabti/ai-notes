import NoteCard from "@/components/note/note-card";
import NotesFallbackSkeleton from "@/components/note/note-skeleton";
import { fetchNotes } from "@/lib/data";
import { TNote } from "@/lib/z.schemas";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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

	return (
		<div className="mx-auto max-w-7xl">
			<Suspense fallback={<NotesFallbackSkeleton />}>
				<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
					{notes.map((note: TNote) => (
						<li key={note.id} className="mx-auto w-[90%]  ">
							<NoteCard note={note} />
						</li>
					))}
				</ul>
			</Suspense>
		</div>
	);
}
