import { Task } from "@domain/entities/Task.js";
import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { UseCase } from "@shared/application/UseCase.js";
import {inject, injectable} from "tsyringe";
import {TOKENS} from "@infrastructure/di/tokens.js";
import {Logger} from "@shared/application/Logger.js";

type CreateTaskRequest = {
    title: string;
    description: string;
}


@injectable()
export class CreateTaskUseCase implements UseCase<CreateTaskRequest, void> {
    constructor(
        @inject(TOKENS.TASK_REPOSITORY) private readonly _repository: TaskRepository,
        @inject(TOKENS.LOGGER) private readonly _logger: Logger
    ){}


    async execute(input: CreateTaskRequest): Promise<void> {
        this._logger.info(`Executing useCase ${this.constructor.name}`, {title: input.title})
        const task = Task.create(input.title, input.description);
        await this._repository.save(task);
    }
}
