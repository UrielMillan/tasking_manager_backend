import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { UseCase } from "@shared/application/UseCase.js";

export class DeleteTaskUseCase implements UseCase<number, void> {
    constructor(
        private readonly _repository: TaskRepository
    ){}

    async execute(input: number): Promise<void> {
       const task = await this._repository.findById(input);
       if(!task) throw new Error("Task not found");
       
       this._repository.delete(input);
    }

}