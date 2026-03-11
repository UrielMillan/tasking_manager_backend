import { TaskNotFoundError } from "@domain/errors/TaskNotFoundError.js"
import { TaskRepository } from "@domain/repositories/TaskRepository.js"
import { UseCase } from "@shared/application/UseCase.js"

type UpdateSubTaskRequest = {
    taskId: number,
    subTaskId: number
    title?: string,
    description?: string
}

export class UpdateSubTaskUseCase implements UseCase<UpdateSubTaskRequest, void> {
    constructor(
        private readonly _repository: TaskRepository
    ){}

    async execute(input: UpdateSubTaskRequest): Promise<void> {
        const task = await this._repository.find(input.taskId)
        if(!task) throw new TaskNotFoundError()
        
        const subTask = task.getSubTask(input.subTaskId)
        task.changeSubTaskTitle(input.subTaskId, input?.title ?? subTask.toPrimitives().title)
        task.changeSubTaskDescription(input.subTaskId ,input?.description ?? subTask.toPrimitives().description)
        
        await this._repository.save(task)
    }
}