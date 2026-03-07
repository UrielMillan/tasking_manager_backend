import { BaseError } from "@shared/errors/BaseError.js";

export class SubTaskCannotModifyFinalizedOrCanceledError extends BaseError {
    constructor(){
        super(
            'Cannot modify a subtask that is finalized or canceled',
            'SUBTASK_CANNOT_MODIFY_FINALIZED_OR_CANCELED',
            400
        )
    }
}