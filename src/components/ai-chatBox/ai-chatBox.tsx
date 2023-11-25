"use client";

import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { Bot, Send, Trash, XCircle } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Message } from "ai";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Input } from "../ui/input";
import { useEffect, useRef } from "react";

type AIChatBoxProps = {
	open: boolean;
	onClose: () => void;
};

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
	const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading, error } =
		useChat({
			api: "/api/chat"
		});

	const inputRef = useRef<HTMLInputElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages]);

	useEffect(() => {
		if (open) {
			inputRef.current?.focus();
		}
	}, [open]);

	const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

	return (
		<div
			className={cn(
				"-bottom-[90dvh] right-0 z-50 w-full max-w-[400px] p-1 xl:right-10",
				open ? "absolute" : "hidden"
			)}
		>
			<button className="mb-1 ms-auto block" onClick={onClose}>
				<XCircle className="h-6 w-6" />
			</button>
			<div className="flex h-[80dvh] flex-col rounded border bg-background shadow-xl">
				<div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
					{messages.map((message) => (
						<ChatMessage message={message} key={message.id} />
					))}
					{isLoading && lastMessageIsUser && (
						<ChatMessage
							message={{
								id: "loading",
								role: "assistant",
								content: "Thinking..."
							}}
						/>
					)}
					{error && (
						<ChatMessage
							message={{
								id: "error",
								role: "assistant",
								content: "Something went wrong. Please try again."
							}}
						/>
					)}
					{!error && messages.length === 0 && (
						<div className="flex h-full items-center justify-center gap-3">
							<Bot />
							Ask the AI a question about your notes
						</div>
					)}
				</div>
				<form onSubmit={handleSubmit} className="m-3 flex gap-1">
					<Button
						title="Clear chat"
						variant="outline"
						size="icon"
						className="shrink-0"
						type="button"
						onClick={() => setMessages([])}
					>
						<Trash />
					</Button>
					<Input
						value={input}
						onChange={handleInputChange}
						placeholder="Say something..."
						ref={inputRef}
					/>
					<Button type="submit">Send</Button>
				</form>
			</div>
		</div>
	);
}

const ChatMessage = ({ message: { role, content } }: { message: Message }) => {
	const { user } = useUser();
	const isAiMessage = role === "assistant";

	return (
		<div
			className={cn(
				"mb-3 flex items-center",
				isAiMessage ? "me-10 justify-start" : "ms-10 justify-end"
			)}
		>
			{isAiMessage && <Bot className="mr-2 shrink-0" />}
			<p
				className={cn(
					"w-full whitespace-pre-line rounded-md border px-3 py-2",
					isAiMessage ? "bg-background" : "bg-primary text-primary-foreground"
				)}
			>
				{content}
			</p>
			{!isAiMessage && user?.imageUrl && (
				<Image
					src={user.imageUrl}
					alt="User image"
					width={100}
					height={100}
					className="ml-2 h-10 w-10 rounded-full object-cover"
				/>
			)}
		</div>
	);
};
