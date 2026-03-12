import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { UseCase } from "@shared/application/UseCase.js";
import { TaskNotFoundError } from "@domain/errors/TaskNotFoundError.js";
import {inject, injectable} from "tsyringe";
import {TOKENS} from "@infrastructure/di/tokens.js";

type UpdateTaskRequest = {
    id: number;
    title?: string;
    description?: string;
}

@injectable()
export class UpdateTaskUseCase implements UseCase<UpdateTaskRequest, void> {
    constructor(
        @inject(TOKENS.TASK_REPOSITORY) private readonly _repository: TaskRepository
    ){}

    async execute(input: UpdateTaskRequest): Promise<void> {
        const task = await this._repository.find(input.id);
        if(!task) throw new TaskNotFoundError();

        const {title, description} = task.toPrimitives()
        task.changeTitle(input?.title ?? title);
        task.changeDescription(input?.description ?? description);

        await this._repository.save(task);
    }

}
