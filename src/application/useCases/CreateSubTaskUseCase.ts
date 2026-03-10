import { Task } from "@domain/entities/Task.js";
import { TaskNotFoundError } from "@domain/errors/TaskNotFoundError.js";
import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { UseCase } from "@shared/application/UseCase.js";

type CreateSubTaskRequest = {
    taskId: number;
    title: string;
    description: string;
}

export class CreateSubTaskUseCase implements UseCase<CreateSubTaskRequest, void> {
    constructor(
        private readonly _repository: TaskRepository
    ){}

    async execute(input: CreateSubTaskRequest): Promise<void> {
        const task = await this._repository.findById(input.taskId);
        if(!task) throw new TaskNotFoundError();

        task.addSubTask(input.title, input.description);
        await this._repository.addSubTask(task)        
    }
}