import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { UseCase } from "@shared/application/UseCase.js";
import {inject, injectable} from "tsyringe";
import {TOKENS} from "@infrastructure/di/tokens.js";
import {Logger} from "@shared/application/Logger.js";

@injectable()
export class DeleteTaskUseCase implements UseCase<number, void> {
    constructor(
        @inject(TOKENS.TASK_REPOSITORY) private readonly _repository: TaskRepository,
        @inject(TOKENS.LOGGER) private readonly _logger: Logger
    ){}

    async execute(input: number): Promise<void> {
        this._logger.info(`Executing useCase ${this.constructor.name}`, {id: input})
        const task = await this._repository.find(input);
        if(!task) throw new Error("Task not found");

        await this._repository.delete(input);
    }

}
