import * as z from 'zod';

export const CreateTaskSchema = z.object({
    title: z.string().trim().nonoptional(),
    description: z.string().trim().nonoptional(),
})

export type CreateTaskRequest = z.infer<typeof CreateTaskSchema>;