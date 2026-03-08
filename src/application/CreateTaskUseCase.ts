import { Task } from "@domain/entities/Task.js";
import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { UseCase } from "@shared/application/UseCase.js";

type CreateTaskRequest = {
    title: string;
    description: string;
}

export class CreateTaskUseCase implements UseCase<CreateTaskRequest, void> {
    constructor(
        private readonly _repository: TaskRepository
    ){}

    async execute(input: CreateTaskRequest): Promise<void> {
        const task = Task.create(input.title, input.description);
        this._repository.create(task);        
    }
}