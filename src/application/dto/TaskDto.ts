import { SubTaskDto } from "./SubTaskDto.js";

export type TaskDto = {
    id: number;
    title: string;
    description: string;
    subTasks: SubTaskDto[];
    createdAt: Date;
    updatedAt: Date;
}