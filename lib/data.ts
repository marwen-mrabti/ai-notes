import { prisma } from "./prisma";

export const fetchNotes = async (userId: string) => {
	try {
		const notes = await prisma.note.findMany({
			where: {
				userId: userId
			}
		});

		return notes;
	} catch (error: any) {
		console.log(error.message);
		return error.message;
	} finally {
		await prisma.$disconnect();
	}
};
