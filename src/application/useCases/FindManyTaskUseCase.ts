import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { UseCase } from "@shared/application/UseCase.js";
import { TaskDto } from "../dto/TaskDto.js";
import { TaskMapper } from "../mappers/TaskMapper.js";
import {inject, injectable} from "tsyringe";
import {TOKENS} from "@infrastructure/di/tokens.js";
import {Logger} from "@shared/application/Logger.js";

@injectable()
export class FindManyTaskUseCase implements UseCase<void, TaskDto[]> {
    constructor(
        @inject(TOKENS.TASK_REPOSITORY) private readonly _repository: TaskRepository,
        @inject(TOKENS.LOGGER) private readonly _logger: Logger
    ){}

    async execute(): Promise<TaskDto[]> {
        this._logger.info(`Executing useCase ${this.constructor.name}`)
        const result = await this._repository.findAll();
        return TaskMapper.toMany(result);
    }
}
