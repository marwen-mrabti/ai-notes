import { stylish } from "@/lib/fonts";
import ThemeToggler from "../theme-provider/theme-toggler";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { NoteDialog } from "../note/note-modal";
import ChatBtn from "../ai-chatBox/chat-btn";
import ThemedUserButton from "./user-button";

const Navbar = () => {
	return (
		<header className="sticky z-50 mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-3 rounded-b-lg bg-transparent px-8  py-3 opacity-90 backdrop-blur-xl md:flex-row md:items-center">
			<Link href="/notes" aria-label="logo" className="flex items-center">
				<Image
					src="/assets/logo.png"
					alt="logo"
					width={25}
					height={25}
					className="cursor-pointer "
				/>
				<h1
					className={cn(
						stylish.className,
						" bg-gradient-to-br from-emerald-500 to-blue-400 bg-clip-text text-4xl font-bold text-transparent hover:brightness-125"
					)}
				>
					AINotes
				</h1>
			</Link>

			<nav className="flex w-full flex-col items-start gap-3  px-4 md:w-fit md:flex-row md:items-center md:space-x-10">
				<div className="flex w-full items-center justify-between gap-6 ">
					<NoteDialog type="add" />
					<ChatBtn />
				</div>

				<div className="flex w-full items-center justify-between gap-6 ">
					<ThemedUserButton />
					<ThemeToggler />
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
