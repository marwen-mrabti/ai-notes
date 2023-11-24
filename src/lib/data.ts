import { TNote } from "./z.schemas";
import { prisma } from "./prisma";

export const fetchNotes = async () => {
	try {
		const notes = await prisma.note.findMany({});

		return notes;
	} catch (error: any) {
		console.log(error.message);
		return error.message;
	} finally {
		await prisma.$disconnect();
	}
};
