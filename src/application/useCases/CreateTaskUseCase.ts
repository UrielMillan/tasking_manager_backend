import { Task } from "@domain/entities/Task.js";
import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { UseCase } from "@shared/application/UseCase.js";
import {inject, injectable} from "tsyringe";
import {TOKENS} from "@infrastructure/di/tokens.js";

type CreateTaskRequest = {
    title: string;
    description: string;
}


@injectable()
export class CreateTaskUseCase implements UseCase<CreateTaskRequest, void> {
    constructor(
        @inject(TOKENS.TASK_REPOSITORY) private readonly _repository: TaskRepository
    ){}


    async execute(input: CreateTaskRequest): Promise<void> {
        const task = Task.create(input.title, input.description);
        await this._repository.save(task);
    }
}
