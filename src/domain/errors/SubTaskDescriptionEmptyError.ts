import { BaseError } from "@shared/errors/BaseError.js";

export class SubTaskDescriptionEmptyError extends BaseError {
    constructor(){
        super(
            'The subtask description cannot be empty',
            'SUBTASK_DESCRIPTION_EMPTY',
            400
        )
    }
}