import {z} from 'zod';
import {SubTaskStatus} from "@domain/entities/SubTask.js";

const statusEnum = Object.values(SubTaskStatus).join(",")

export const UpdateSubTaskStatusSchema = z.object({
   status: z.enum(SubTaskStatus, {
       error:"Only these values are allowed: " + statusEnum
   })
})

export type UpdateSubTaskStatusRequest = z.infer<typeof UpdateSubTaskStatusSchema>;
