import { BaseError } from "@shared/errors/BaseError.js";

export class TaskTitleEmptyError extends BaseError {
    constructor(){
        super(
            'The task title cannot be empty',
            'TASK_TITLE_EMPTY',
            400
        )
    }
}