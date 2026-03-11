import { TaskNotFoundError } from "@domain/errors/TaskNotFoundError.js";
import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { UseCase } from "@shared/application/UseCase.js";


type DeleteSubTaskRequest = {
    taskId: number,
    subTaskId: number
}

export class DeleteSubTaskUseCase implements UseCase<DeleteSubTaskRequest, void>{
    constructor(
        private readonly _repository: TaskRepository
    ){}

    async execute(input: DeleteSubTaskRequest): Promise<void> {
        const task = await this._repository.find(input.taskId);
        if(!task) throw new TaskNotFoundError();

        task.deleteSubTask(input.subTaskId)
        await this._repository.save(task)
    }
}