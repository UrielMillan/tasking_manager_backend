import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { UseCase } from "@shared/application/UseCase.js";
import { TaskDto } from "../dto/TaskDto.js";
import { TaskMapper } from "../mappers/TaskMapper.js";
import {inject, injectable} from "tsyringe";
import {TOKENS} from "@infrastructure/di/tokens.js";

@injectable()
export class FindManyTaskUseCase implements UseCase<void, TaskDto[]> {
    constructor(
        @inject(TOKENS.TASK_REPOSITORY) private readonly _repository: TaskRepository
    ){}

    async execute(): Promise<TaskDto[]> {
        const result = await this._repository.findAll();
        return TaskMapper.toMany(result);
    }
}
