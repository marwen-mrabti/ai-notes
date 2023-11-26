import Navbar from "@/components/navbar/navbar";

export default function NotesLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative mx-auto flex h-screen w-screen  flex-col items-center justify-start divide-y-2 divide-slate-200 overflow-hidden dark:divide-slate-800">
			<Navbar />
			<main className="flex w-screen flex-col items-center gap-4 overflow-x-hidden px-4 py-4">
				{children}
			</main>
		</div>
	);
}
