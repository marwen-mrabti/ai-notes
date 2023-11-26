import openai, { getEmbedding } from "@/lib/openai";
import { notesIndex } from "@/lib/pinecone";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const messages: ChatCompletionMessage[] = await body.messages;

		const messagesTruncated = messages.slice(-6);
		const embedding = await getEmbedding(
			messagesTruncated.map((message) => message.content).join("\n")
		);

		const { userId } = auth();
		const vectorQueryResponse = await notesIndex.query({
			vector: embedding,
			topK: 10,
			filter: {
				userId: userId
			}
		});

		const relevantNotes = await prisma.note.findMany({
			where: {
				id: {
					in: vectorQueryResponse.matches.map((match) => match.id)
				}
			}
		});

		const systemMessage: ChatCompletionMessage = {
			role: "assistant",
			content:
				"you are an intelligent note taking app. you answer user's questions based on their existing notes. " +
				"the relevant notes are: " +
				relevantNotes
					.map(
						(note: { title: string; content?: string }) =>
							`Title:${note.title}\n\nContent:\n${note.content}`
					)
					.join("\n\n") +
				"."
		};

		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			stream: true,
			messages: [systemMessage, ...messagesTruncated]
		});

		const stream = OpenAIStream(response);

		return new StreamingTextResponse(stream);
	} catch (error: any) {
		console.error(error.message);
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
}
