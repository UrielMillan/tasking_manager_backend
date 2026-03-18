import { TaskNotFoundError } from "@domain/errors/TaskNotFoundError.js";
import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { UseCase } from "@shared/application/UseCase.js";
import {inject, injectable} from "tsyringe";
import {TOKENS} from "@infrastructure/di/tokens.js";
import {Logger} from "@shared/application/Logger.js";

type CreateSubTaskRequest = {
    taskId: number;
    title: string;
    description: string;
}

@injectable()
export class CreateSubTaskUseCase implements UseCase<CreateSubTaskRequest, void> {
    constructor(
        @inject(TOKENS.TASK_REPOSITORY) private readonly _repository: TaskRepository,
        @inject(TOKENS.LOGGER) private readonly _logger: Logger
    ){}

    async execute(input: CreateSubTaskRequest): Promise<void> {
        this._logger.info(`Executing useCase ${this.constructor.name}`, {taskId: input.taskId, title: input.title})
        const task = await this._repository.find(input.taskId);
        if(!task) throw new TaskNotFoundError();

        task.addSubTask(input.title, input.description);
        await this._repository.save(task)
    }
}
