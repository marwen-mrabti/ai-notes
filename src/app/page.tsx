import { stylish } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
	const { userId } = auth();

	if (userId) {
		redirect("/notes");
	}

	return (
		<main className="flex h-screen flex-col items-center justify-center gap-10  ">
			<div className="flex items-center gap-3">
				<Image
					src="/assets/logo.png"
					alt="ai-notes Logo"
					width={100}
					height={100}
					className="mx-auto"
				/>
				<span
					className={cn(
						stylish.className,
						" bg-gradient-to-br from-emerald-500 to-blue-400 bg-clip-text font-bold text-transparent hover:brightness-125",
						"text-4xl font-extrabold tracking-tight lg:text-5xl"
					)}
				>
					ai-notes
				</span>
			</div>
			<p className="max-w-prose text-center text-base text-emerald-500/95">
				ai-notes is a note taking app with AI integration, built with OpenAI, Nextjs,tailwindcss,
				shadcn UI, Clerk, and more.
			</p>

			<Link
				href="/sign-in"
				className=" w-[20rem] rounded-xl bg-slate-100 px-3 py-2 text-center font-bold text-slate-950 transition-all duration-150 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
			>
				Sign In
			</Link>
		</main>
	);
}
