import { SignIn } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "aiNotes - Sign In",
	description: "Notes page"
};
export default function SignInPage() {
	return (
		<main className="flex h-screen w-full flex-col items-start justify-start gap-4  py-2">
			<Link
				className="group text-xl text-emerald-400  transition-all duration-150 hover:underline"
				href="/"
			>
				<ArrowLeft className="inline-block group-hover:-translate-x-2" />
				<span>ai-notes</span>
			</Link>
			<div className="flex w-full items-center justify-center">
				<SignIn appearance={{ variables: { colorPrimary: "#0f172a" } }} />
			</div>
		</main>
	);
}
