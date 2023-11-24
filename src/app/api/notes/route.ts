import { prisma } from "@/lib/prisma";
import { TCreateNote, TUpdateNote, createNoteSchema, updateNoteSchema } from "@/lib/z.schemas";
import { auth } from "@clerk/nextjs";

//*********!create note */
export async function POST(req: Request) {
	try {
		const { userId } = auth();
		if (!userId) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = (await req.json()) as TCreateNote;

		const validatedNote = createNoteSchema.safeParse({ ...body });
		if (!validatedNote.success) {
			const errorMessages = validatedNote.error.flatten().fieldErrors;
			console.log(errorMessages);
			return Response.json({ error: "Invalid input" }, { status: 400 });
		}

		const { title, content } = validatedNote.data;

		const note = await prisma.note.create({
			data: {
				title,
				content,
				userId
			}
		});

		return Response.json(note, { status: 201 });
	} catch (error: any) {
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}

//*********!edit note */
export async function PATCH(req: Request) {
	try {
		const { userId } = auth();
		if (!userId) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = (await req.json()) as TUpdateNote;

		const validatedNote = updateNoteSchema.safeParse({ ...body });
		if (!validatedNote.success) {
			const errorMessages = validatedNote.error.flatten().fieldErrors;
			console.log(errorMessages);
			return Response.json({ error: "Invalid input" }, { status: 400 });
		}

		const { id, title, content } = validatedNote.data;

		const note = await prisma.note.findUnique({
			where: {
				id
			}
		});

		if (!note) {
			return Response.json({ error: "Note not found" }, { status: 404 });
		}

		if (note.userId !== userId) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		await prisma.note.update({
			where: {
				id
			},
			data: {
				title,
				content
			}
		});

		return Response.json({ message: "Note updated" }, { status: 200 });
	} catch (error: any) {
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}

//*********!delete note */
export async function DELETE(req: Request) {
	try {
		const { userId } = auth();
		if (!userId) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = await req.json();
		if (!id) {
			return Response.json({ error: "Invalid input" }, { status: 400 });
		}

		const note = await prisma.note.findUnique({
			where: {
				id
			}
		});

		if (!note) {
			return Response.json({ error: "Note not found" }, { status: 404 });
		}

		if (note.userId !== userId) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		await prisma.note.delete({
			where: {
				id
			}
		});

		return Response.json({ message: "Note deleted" }, { status: 200 });
	} catch (error: any) {
		return Response.json({ error: "Internal Server Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
