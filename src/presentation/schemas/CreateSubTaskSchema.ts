import * as z from 'zod';

export const CreateSubTaskSchema = z.object({
    title: z.string().trim().nonoptional(),
    description: z.string().trim().nonoptional(),
})

export type CreateSubTaskRequest = z.infer<typeof CreateSubTaskSchema>;