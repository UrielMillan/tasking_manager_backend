import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { UseCase } from "@shared/application/UseCase.js";
import { TaskDto } from "../dto/TaskDto.js";
import { TaskMapper } from "../mappers/TaskMapper.js";
import { TaskNotFoundError } from "@domain/errors/TaskNotFoundError.js";
import {inject, injectable} from "tsyringe";
import {TOKENS} from "@infrastructure/di/tokens.js";
import {Logger} from "@shared/application/Logger.js";

@injectable()
export class FindTaskUseCase implements UseCase<number, TaskDto> {
    constructor(
        @inject(TOKENS.TASK_REPOSITORY) private readonly _repository: TaskRepository,
        @inject(TOKENS.LOGGER) private readonly _logger: Logger
    ){}


    async execute(input: number): Promise<TaskDto> {
        this._logger.info(`Executing useCase ${this.constructor.name}`, {id: input})
        const task = await this._repository.find(input);
        if(!task) throw new TaskNotFoundError();

        return TaskMapper.toSingle(task);
    }
}
