import { SubTask } from "@domain/entities/SubTask.js";
import { SubTaskDto } from "../dto/SubTaskDto.js";

export class SubTaskMapper {
    static toSingle(input: SubTask): SubTaskDto {
        const data = input.toPrimitives();

        return {
            id: data.id,
            title: data.title,
            description: data.description,
            status: data.status
        }
    }
    
    static toMany(input: SubTask[]): SubTaskDto[] {
        return input.map((subTask) => this.toSingle(subTask));
    }

}