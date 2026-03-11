import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { UseCase } from "@shared/application/UseCase.js";
import { TaskDto } from "../dto/TaskDto.js";
import { TaskMapper } from "../mappers/TaskMapper.js";
import { Task } from "@domain/entities/Task.js";
import { TaskNotFoundError } from "@domain/errors/TaskNotFoundError.js";

export class FindTaskUseCase implements UseCase<number, TaskDto> {
    constructor(
        private readonly _repository: TaskRepository
    ){}
    
    async execute(input: number): Promise<TaskDto> {
        const task = await this._repository.find(input);
        if(!task) throw new TaskNotFoundError();
        
        return TaskMapper.toSingle(task);
    }
}