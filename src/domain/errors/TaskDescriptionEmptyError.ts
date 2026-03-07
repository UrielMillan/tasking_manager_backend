import { BaseError } from "@shared/errors/BaseError.js";

export class TaskDescriptionEmptyError extends BaseError {
    constructor(){
        super(
            "The task description cannot be empty",
            'TASK_DESCRIPTION_EMPTY',
            400  
        )
    }
}