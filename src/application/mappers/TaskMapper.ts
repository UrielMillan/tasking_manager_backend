
import { Task } from "@domain/entities/Task.js";
import { TaskDto } from "../dto/TaskDto.js";
import { SubTaskMapper } from "./SubTaskMapper.js";


export class TaskMapper {
    static toSingle(input: Task): TaskDto {
        const data = input.toPrimitives();

        return {
            id: data.id,
            title: data.title,
            description: data.description,
            subTasks: SubTaskMapper.toMany(input.getSubTasks()),
            createdAt: data.createAt,
            updatedAt: data.updateAt
        }
    }

    static toMany(input: Task[]): TaskDto[] {
        return input.map((task) => this.toSingle(task));
    }

}