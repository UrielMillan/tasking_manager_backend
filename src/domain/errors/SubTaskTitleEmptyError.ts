import { BaseError } from "@shared/errors/BaseError.js";

export class SubTaskTitleEmptyError extends BaseError {
    constructor(){
        super(
            'The subtask title cannot be empty',
            'SUBTASK_TITLE_EMPTY',
            400
        )
    }
}