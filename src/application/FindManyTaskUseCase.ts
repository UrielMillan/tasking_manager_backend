import { Task } from "@domain/entities/Task.js";
import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { UseCase } from "@shared/application/UseCase.js";

export class FindManyTaskUseCase implements UseCase<void, Task[]> {
    constructor(
        private readonly _repository: TaskRepository
    ){}

    async execute(): Promise<Task[]> {
        return await this._repository.findAll();
    }
}