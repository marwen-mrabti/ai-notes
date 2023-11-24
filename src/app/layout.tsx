import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/lib/fonts";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";

export const metadata: Metadata = {
	title: "aiNotes",
	description: "aiNotes is a note taking app with AI features"
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={`${inter.className}  overflow-x-hidden px-4`}>
					<ThemeProvider attribute="class" defaultTheme="dark">
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
