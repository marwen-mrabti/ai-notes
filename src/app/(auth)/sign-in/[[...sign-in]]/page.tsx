import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<main className="flex h-screen items-start justify-center py-8">
			<SignIn />
		</main>
	);
}
