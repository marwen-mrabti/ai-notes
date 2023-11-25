"use client";

import { UserButton } from "@clerk/nextjs";
import { dark, shadesOfPurple } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";

const ThemedUserButton = () => {
	const { theme } = useTheme();

	return (
		<UserButton
			afterSignOutUrl="/"
			appearance={{
				baseTheme: theme === "dark" ? dark : undefined,
				elements: {
					avatarBox: {
						width: "2rem",
						height: "2rem"
					}
				}
			}}
		/>
	);
};

export default ThemedUserButton;
