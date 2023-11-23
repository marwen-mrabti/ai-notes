"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggler = () => {
	const { theme, setTheme } = useTheme();

	return (
		<div className=" flex items-center justify-center rounded-full  bg-transparent p-[2px] text-slate-950 transition-all  dark:text-slate-50 ">
			<label className="grid cursor-pointer place-items-center">
				<input
					type="checkbox"
					checked={theme === "dark"}
					className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1 bg-indigo-600/60"
					onChange={(e) => {
						setTheme(e.target.checked ? "dark" : "light");
					}}
				/>

				<Sun
					key="sun-icon"
					width="14"
					height="14"
					className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
				/>
				<Moon
					key="moon-icon"
					width="14"
					height="14"
					className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
				/>
			</label>
		</div>
	);
};

export default ThemeToggler;
