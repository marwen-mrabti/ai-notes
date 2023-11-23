import { SignedIn, UserButton } from "@clerk/nextjs";
import ThemeToggler from "../theme-provider/theme-toggler";
import { Button } from "../ui/button";
import { Plus, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { stylish } from "@/lib/fonts";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
	const { userId } = auth();

	return (
		<header className="sticky top-0 mx-auto  flex w-full items-center justify-around bg-slate-200 py-3 opacity-80 shadow-2xl backdrop-blur-lg dark:bg-slate-900">
			<div aria-label="logo">
				<h1
					className={cn(
						stylish.className,
						"bg-gradient-to-br from-emerald-500 to-blue-400 bg-clip-text text-4xl font-bold text-transparent"
					)}
				>
					AINotes
				</h1>
			</div>
			<nav className="flex items-center justify-between gap-5 ">
				<SignedIn>
					<div className="flex items-center justify-between gap-4">
						<Button className="space-x-2 bg-slate-950 capitalize text-slate-50 transition-all duration-150 hover:opacity-95 dark:bg-slate-100 dark:text-slate-900 ">
							<Plus />
							<span>add note</span>
						</Button>
						<Button className="space-x-2 bg-slate-950 capitalize text-slate-50 transition-all duration-150 hover:opacity-95 dark:bg-slate-100 dark:text-slate-900">
							<Bot />
							<span>AI Chat</span>
						</Button>
					</div>
					<UserButton afterSignOutUrl="/sign-in" />
				</SignedIn>
				<ThemeToggler />
				{userId ? null : (
					<Link
						href="/sign-in"
						className=" hover:opacity-85 rounded-xl bg-slate-100 px-3 py-2 text-slate-950 transition-all duration-150 dark:bg-slate-800 dark:text-slate-200"
					>
						Sign In
					</Link>
				)}
			</nav>
		</header>
	);
};

export default Navbar;
