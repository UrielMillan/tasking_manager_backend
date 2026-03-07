import { BaseError } from "@shared/errors/BaseError.js";

export class SubTaskNotFoundError extends BaseError {
    constructor(){
        super(
            'Subtask not found',
            'SUBTASK_NOT_FOUND',
            404
        )
    }
}