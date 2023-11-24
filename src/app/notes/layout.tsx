import Navbar from "@/components/navbar/navbar";

export default function NotesLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative mx-auto flex w-screen max-w-7xl flex-col items-center justify-start ">
			<Navbar />
			{children}
		</div>
	);
}
