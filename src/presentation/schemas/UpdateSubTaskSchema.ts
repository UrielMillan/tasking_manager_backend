import * as z from 'zod'

export const UpdateSubTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
})

export type UpdateSubTaskRequest = z.infer<typeof UpdateSubTaskSchema>;