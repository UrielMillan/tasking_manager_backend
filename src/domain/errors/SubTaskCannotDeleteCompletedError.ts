import { BaseError } from "@shared/errors/BaseError.js";

export class SubTaskCannotDeleteCompletedError extends BaseError {
    constructor(){
        super(
            'Cannot delete a completed subtask',
            'SUBTASK_CANNOT_DELETE_COMPLETED',
            400
        )
    }
}