import { BaseError } from "@shared/errors/BaseError.js";

export class TaskNotFoundError extends BaseError {
    constructor(){
        super(
            'Task not found',
            'TASK_NOT_FOUND',
            404
        )
    }
}