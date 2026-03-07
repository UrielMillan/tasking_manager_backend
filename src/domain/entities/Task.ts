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
        private createAt: Date,
        private updateAt: Date,
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

    private touch(){
        this.updateAt = new Date()
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

    changeSubTaskTitle(id: number, title: string){
        const subTask = this.getSubTask(id)
        subTask.changeTitle(title)
        this.touch()
    }

    changeSubTaskDescription(id: number, description: string) {
        const subTask = this.getSubTask(id)
        subTask.changeDescription(description)
        this.touch()
    }

    getSubTaskStatus(id: number) {
        const subTask = this.getSubTask(id)
        return subTask.getStatus()
    }

    changeSubTaskStatus(id: number, status: SubTaskStatus) {
        const subTask = this.getSubTask(id)
        subTask.changeStatus(status)
        this.touch()
    }


    toPrimitives() {
       return {
            id: this.id,
            title: this.title,
            description: this.description,
            subTasks: this.subtasks.map((i) => i.toPrimitives()),
            createAt: this.createAt,
            updateAt: this.updateAt
       }
    }
}
