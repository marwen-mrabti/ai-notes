import { SignUp } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Notes - Sign Up",
	description: "Notes page",
};

export default function SignUpPage() {
	return (
		<main className="flex flex-col h-screen items-start justify-start py-2 gap-4  w-full">
			<Link className="group text-xl text-emerald-400  hover:underline transition-all duration-150" href="/">
				<ArrowLeft className="inline-block group-hover:-translate-x-2" />
				<span>
					ai-notes
				</span>
			</Link>
			<div className="flex items-center justify-center w-full">
				<SignUp appearance={{ variables: { colorPrimary: "#0f172a" } }} />
			</div>
		</main>
	);
}
