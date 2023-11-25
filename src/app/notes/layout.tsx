import Navbar from "@/components/navbar/navbar";

export default function NotesLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className=" mx-auto flex h-screen w-screen  flex-col items-center justify-start overflow-hidden ">
			<Navbar />
			<main className="flex w-screen flex-col items-center gap-4 overflow-x-hidden px-4 py-4">
				{children}
			</main>
		</div>
	);
}
