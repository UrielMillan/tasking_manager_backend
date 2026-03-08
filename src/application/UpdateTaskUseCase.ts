import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { UseCase } from "@shared/application/UseCase.js";

type UpdateTaskRequest = {
    id: number;
    title?: string;
    description?: string;
}

export class UpdateTaskUseCase implements UseCase<UpdateTaskRequest, void> {
    constructor(
        private readonly _repository: TaskRepository
    ){}

    async execute(input: UpdateTaskRequest): Promise<void> {
        const task = await this._repository.findById(input.id);
        if(!task) throw new Error("Task not found");

        const {title, description} = task.toPrimitives()
        task.changeTitle(input.title ?? title); 
        task.changeDescription(input.description ?? description);

        this._repository.update(task);
    }

}