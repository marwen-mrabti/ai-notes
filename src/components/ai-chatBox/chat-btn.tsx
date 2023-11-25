"use client";

import { useState } from "react";
import AIChatBox from "./ai-chatBox";
import { Bot } from "lucide-react";
import { Button } from "../ui/button";

export default function ChatBtn() {
	const [chatBoxOpen, setChatBoxOpen] = useState(false);

	return (
		<>
			<Button
				className="space-x-2 bg-slate-950 capitalize text-slate-50 transition-all duration-150 hover:opacity-95 dark:bg-slate-100 dark:text-slate-900"
				onClick={() => setChatBoxOpen(true)}
			>
				<Bot />
				<span>AI Chat</span>
			</Button>
			<AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
		</>
	);
}
