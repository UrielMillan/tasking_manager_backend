import { SubTask, SubTaskStatus } from "./SubTask.js"
import { TaskTitleEmptyError } from "../errors/TaskTitleEmptyError.js"
import { TaskDescriptionEmptyError } from "../errors/TaskDescriptionEmptyError.js"
import { SubTaskNotFoundError } from "../errors/SubTaskNotFoundError.js"

export class Task {
    private constructor (
        public readonly id: number,
        private title: string,
        private description: string,
        private subtasks: Array<SubTask>,
        private createdAt: Date,
        private updatedAt: Date,
    ){}

    static create(title: string, description: string) {
        if(!title.trim()) throw new TaskTitleEmptyError()
        if(!description.trim()) throw new TaskDescriptionEmptyError()

        return new Task(
            0,
            title,
            description,
            [],
            new Date(),
            new Date()
        )
    }

    static fromPrimitives(data: {
        id: number,
        title: string,
        description: string,
        subtasks: Array<{
            id: number,
            title: string,
            description: string,
            status: SubTaskStatus
        }>,
        createdAt: Date,
        updatedAt: Date
    }) {
        return new Task(
            data.id,
            data.title,
            data.description,
            data.subtasks.map((i) => SubTask.fromPrimitives(i)),
            data.createdAt,
            data.updatedAt
         )
     }

    private touch(){
        this.updatedAt = new Date()
    }

    getSubTask(id: number) {
        const subTask = this.subtasks.find((i) => i.id === id)
        if (!subTask) throw new SubTaskNotFoundError()
        return subTask
    }

    changeTitle (title: string) {
        if(!title.trim()) throw new TaskTitleEmptyError()

        this.title = title
        this.touch()
    }

    changeDescription(description: string) {
        if(!description.trim()) throw new TaskDescriptionEmptyError()

        this.description = description
        this.touch()
    }

    addSubTask(title: string, description: string) {
        const subTask = SubTask.create(title, description)
        this.subtasks.push(subTask)
        this.touch()
        return subTask.id
    }

    deleteSubTask(id: number) {
        const subTask = this.getSubTask(id)
        subTask.canDelete()
        this.subtasks = this.subtasks.filter((i) => i.id !== subTask.id)
        this.touch()
    }

    /**
     * @deprecated use getSubTask instead of this method
     * @param id
     * @param title
     */
    changeSubTaskTitle(id: number, title: string){
        const subTask = this.getSubTask(id)
        subTask.changeTitle(title)
        this.touch()
    }

    /**
     * @deprecated use getSubTask instead of this method
     * @param id
     * @param description
     */
    changeSubTaskDescription(id: number, description: string) {
        const subTask = this.getSubTask(id)
        subTask.changeDescription(description)
        this.touch()
    }

    /**
     * @deprecated use getSubTask instead of this method
     * @param id
     */
    getSubTaskStatus(id: number) {
        const subTask = this.getSubTask(id)
        return subTask.getStatus()
    }

    /**
     * @deprecated use getSubTask instead of this method
     * @param id
     * @param status
     */
    changeSubTaskStatus(id: number, status: SubTaskStatus) {
        const subTask = this.getSubTask(id)
        subTask.changeStatus(status)
        this.touch()
    }

    getSubTasks() {
        return this.subtasks
    }

    toPrimitives() {
       return {
            id: this.id,
            title: this.title,
            description: this.description,
            subTasks: this.subtasks.map((i) => i.toPrimitives()),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
       }
    }
}
