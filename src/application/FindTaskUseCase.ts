import { Task } from "@domain/entities/Task.js";
import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { UseCase } from "@shared/application/UseCase.js";

export class FindTaskUseCase implements UseCase<number, Task> {
    constructor(
        private readonly _repository: TaskRepository
    ){}
    
    async execute(input: number): Promise<Task> {
        const task = await this._repository.findById(input);
        if(!task) throw new Error("Task not found");
        
        return task;
    }
}