import NotesFallbackSkeleton from "@/components/note/note-skeleton";

export default function loading() {
	return (
		<div className="mx-auto max-w-7xl">
			<NotesFallbackSkeleton />
		</div>
	);
}
