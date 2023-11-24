import { stylish } from "@/lib/fonts";
import ThemeToggler from "../theme-provider/theme-toggler";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { NoteDialog } from "../note/note-modal";

const Navbar = () => {
	return (
		<header className="sticky top-0 z-50 mx-auto flex w-screen max-w-7xl  flex-wrap items-center justify-between bg-transparent px-4 py-3 opacity-90 shadow-md backdrop-blur-lg dark:bg-slate-950">
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
			<nav className="flex flex-wrap items-center justify-between space-x-10 ">
				<UserButton
					afterSignOutUrl="/"
					appearance={{
						elements: {
							avatarBox: {
								width: "2rem",
								height: "2rem"
							}
						}
					}}
				/>

				<div className="flex items-center justify-between gap-6">
					<NoteDialog type="add" />
					<Button className="space-x-2 bg-slate-950 capitalize text-slate-50 transition-all duration-150 hover:opacity-95 dark:bg-slate-100 dark:text-slate-900">
						<Bot />
						<span>AI Chat</span>
					</Button>
				</div>

				<ThemeToggler />
			</nav>
		</header>
	);
};

export default Navbar;
