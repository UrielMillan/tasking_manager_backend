import {UseCase} from "@shared/application/UseCase.js";
import {SubTaskStatus} from "@domain/entities/SubTask.js";
import {TaskRepository} from "@domain/repositories/TaskRepository.js";
import {TaskNotFoundError} from "@domain/errors/TaskNotFoundError.js";
import {inject, injectable} from "tsyringe";
import {TOKENS} from "@infrastructure/di/tokens.js";

type UpdateSubTaskStatusRequest = {
    taskId: number,
    subTaskId: number,
    status: SubTaskStatus
}

@injectable()
export class UpdateSubTaskStatusUseCase implements UseCase<UpdateSubTaskStatusRequest, void> {
    constructor(
        @inject(TOKENS.TASK_REPOSITORY) private readonly _repository: TaskRepository
    ){}

    async execute(input: UpdateSubTaskStatusRequest): Promise<void> {
        const task = await this._repository.find(input.taskId)
        if(!task) throw new TaskNotFoundError()

        const subTask = task.getSubTask(input.subTaskId)
        subTask.changeStatus(input.status)
        await this._repository.save(task)
    }
}
