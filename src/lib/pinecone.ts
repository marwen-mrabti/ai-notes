import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY as string;
if (!apiKey) {
	throw new Error("PINECONE_API_KEY is not set");
}

const pinecone = new Pinecone({
	apiKey,
	environment: (process.env.PINECONE_ENVIRONMENT || "gcp-starter") as string
});

export const notesIndex = pinecone.index("nextjs-ai-notes");
