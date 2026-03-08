export enum SubTaskStatus {
    COMPLETE  = "COMPLETE",
    ON_PAUSE = "ON_PAUSE",
    ON_PROCESS = "ON_PROCESS",
    CANCEL = "CANCEL"
}

import { SubTaskTitleEmptyError } from "../errors/SubTaskTitleEmptyError.js"
import { SubTaskDescriptionEmptyError } from "../errors/SubTaskDescriptionEmptyError.js"
import { SubTaskCannotModifyFinalizedOrCanceledError } from "../errors/SubTaskCannotModifyFinalizedOrCanceledError.js"
import { SubTaskCannotDeleteCompletedError } from "../errors/SubTaskCannotDeleteCompletedError.js"

export class SubTask {
    private constructor(
        public readonly id: number,
        private title: string,
        private description: string,
        private status: SubTaskStatus
    ){}

    static create(title: string, description: string) {
        if(!title.trim()) throw new SubTaskTitleEmptyError()
        if(!description.trim()) throw new SubTaskDescriptionEmptyError()

        return new SubTask (
            0,
            title,
            description,
            SubTaskStatus.ON_PAUSE
        )
    }

    static fromPrimitives(data: {
        id: number, 
        title: string, 
        description: string, 
        status: SubTaskStatus
    }) {
        return new SubTask(data.id, data.title, data.description, data.status)
    }

    private ensureIsNotFinalizedOrCanceled() {
        if(this.status === SubTaskStatus.CANCEL || this.status === SubTaskStatus.COMPLETE) {
            throw new SubTaskCannotModifyFinalizedOrCanceledError()
        }
    }

    changeTitle(title: string) {
        this.ensureIsNotFinalizedOrCanceled()
        if(!title.trim()) throw new SubTaskTitleEmptyError()

        this.title = title

    }

    changeDescription(description: string) {
        this.ensureIsNotFinalizedOrCanceled()
        if(!description.trim()) throw new SubTaskDescriptionEmptyError()

        this.description = description
    }

    changeStatus(status: SubTaskStatus) {
        this.ensureIsNotFinalizedOrCanceled()
        this.status = status
    }

    canDelete() {
        if(this.status === SubTaskStatus.COMPLETE) throw new SubTaskCannotDeleteCompletedError()
    }

    getStatus() {
        return this.status
    }

    toPrimitives() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            status: this.status
        }
    }

}
