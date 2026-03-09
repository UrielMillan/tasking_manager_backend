import * as z from 'zod'

export const UpdateTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
})

export type UpdateTaskRequest = z.infer<typeof UpdateTaskSchema>;