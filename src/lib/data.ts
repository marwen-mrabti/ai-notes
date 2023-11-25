import { prisma } from "./prisma";
import { unstable_noStore as noStore } from "next/cache";

export const fetchNotes = async (userId: string) => {
	noStore();
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
