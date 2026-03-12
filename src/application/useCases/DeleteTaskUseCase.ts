import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { UseCase } from "@shared/application/UseCase.js";
import {inject, injectable} from "tsyringe";
import {TOKENS} from "@infrastructure/di/tokens.js";

@injectable()
export class DeleteTaskUseCase implements UseCase<number, void> {
    constructor(
        @inject(TOKENS.TASK_REPOSITORY) private readonly _repository: TaskRepository
    ){}

    async execute(input: number): Promise<void> {
       const task = await this._repository.find(input);
       if(!task) throw new Error("Task not found");

       await this._repository.delete(input);
    }

}
