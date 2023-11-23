"user server";
import { revalidatePath } from "next/cache";
import { createNoteSchema, TCreateNote } from "./z.schemas";
import { prisma } from "./prisma";

export const createNote = async (noteData: FormData) => {
	const noteObject = Object.fromEntries(noteData.entries());
	const validatedNote = createNoteSchema.safeParse(noteObject);
	if (!validatedNote.success) {
		const errorMassages = validatedNote.error.flatten().fieldErrors;
		return { error: errorMassages };
	}
	const { title, userId, content } = validatedNote.data;

	try {
		await prisma.note.create({
			data: {
				title,
				userId,
				content
			}
		});
	} catch (error: any) {
		return { error: error.message };
	} finally {
		prisma.$disconnect();
		revalidatePath("/");
	}
};
