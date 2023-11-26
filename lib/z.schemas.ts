import { z } from "zod";

export const noteSchema = z.object({
	id: z.string(),
	userId: z.string(),
	title: z.string().trim().min(5, { message: "Title must be at least 5 characters long" }),
	content: z.string().trim().optional(),
	createdAt: z.string().default(() => new Date().toISOString()),
	updatedAt: z.string().default(() => new Date().toISOString())
});

export const createNoteSchema = noteSchema.omit({
	id: true,
	userId: true,
	createdAt: true,
	updatedAt: true
});

export const updateNoteSchema = noteSchema.omit({
	userId: true,
	createdAt: true,
	updatedAt: true
});

export type TNote = z.infer<typeof noteSchema>;
export type TCreateNote = z.infer<typeof createNoteSchema>;
export type TUpdateNote = z.infer<typeof updateNoteSchema>;
