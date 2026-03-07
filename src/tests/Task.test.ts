import {describe, expect, it} from "vitest";
import { Task } from "@domain/entities/Task.js";
import { SubTaskStatus } from "@domain/entities/SubTask.js";
import { TaskTitleEmptyError } from "@domain/errors/TaskTitleEmptyError.js";
import { TaskDescriptionEmptyError } from "@domain/errors/TaskDescriptionEmptyError.js";
import { SubTaskTitleEmptyError } from "@domain/errors/SubTaskTitleEmptyError.js";
import { SubTaskDescriptionEmptyError } from "@domain/errors/SubTaskDescriptionEmptyError.js";
import { SubTaskCannotModifyFinalizedOrCanceledError } from "@domain/errors/SubTaskCannotModifyFinalizedOrCanceledError.js";
import { SubTaskCannotDeleteCompletedError } from "@domain/errors/SubTaskCannotDeleteCompletedError.js";
import { SubTaskNotFoundError } from "@domain/errors/SubTaskNotFoundError.js";

describe("Task Aggregate", () => {

    describe("Creation", () => {
        it("Should create a new Task with valid title and description", () => {
            const title = "Learning DDD"
            const description = "Learn about aggregate and entities"
            const task = Task.create(title, description)

            expect(task.id).toBe(0)
            expect(task.toPrimitives().title).toBe(title)
            expect(task.toPrimitives().description).toBe(description)
            expect(task.toPrimitives().subTasks).toHaveLength(0)
        })

        it("Should throw TaskTitleEmptyError when creating Task with empty title", () => {
            expect(() => Task.create("", "description")).toThrow(TaskTitleEmptyError)
        })

        it("Should throw TaskDescriptionEmptyError when creating Task with empty description", () => {
            expect(() => Task.create("title", "")).toThrow(TaskDescriptionEmptyError)
        })

        it("Should throw SubTaskTitleEmptyError when adding SubTask with empty title", () => {
            const title = "Learning DDD"
            const description = "Learn about aggregate and entities"
            const task = Task.create(title, description)
            expect(() => task.addSubTask("", "Description")).toThrow(SubTaskTitleEmptyError)
        })

        it("Should throw SubTaskDescriptionEmptyError when adding SubTask with empty description", () => {
            const title = "Learning DDD"
            const description = "Learn about aggregate and entities"
            const task = Task.create(title, description)
            expect(() => task.addSubTask("Title", "")).toThrow(SubTaskDescriptionEmptyError)
        })
    });

    describe("Update", () => {
        it("Should update Task title and updateAt timestamp when changing title", async() => {
            const task = Task.create("title", "description")
            const initialDate = task.toPrimitives().updateAt.getTime()

            await new Promise(resolve => setTimeout(resolve, 10))

            task.changeTitle("new Title")
            const finalUpdate = task.toPrimitives().updateAt.getTime()
            expect(finalUpdate).toBeGreaterThan(initialDate)
        })

        it("Should update Task description and updateAt timestamp when changing description", async() => {
            const task = Task.create("title", "description")
            const initialDate = task.toPrimitives().updateAt.getTime()

            await new Promise(resolve => setTimeout(resolve, 10))

            task.changeDescription("new description")
            const finalUpdate = task.toPrimitives().updateAt.getTime()
            expect(finalUpdate).toBeGreaterThan(initialDate)
        })

        it("Should throw SubTaskTitleEmptyError when changing SubTask title to empty", () => {
            const task = Task.create("title", "description")
            const id = task.addSubTask("Subtask 1", "Description")
            expect(() =>  task.changeSubTaskTitle(id, "")).toThrow(SubTaskTitleEmptyError)
        })

        it("Should throw SubTaskDescriptionEmptyError when changing SubTask description to empty", () => {
            const task = Task.create("title", "description")
            const id = task.addSubTask("Subtask 1", "Description")
            expect(() => task.changeSubTaskDescription(id, "")).toThrow(SubTaskDescriptionEmptyError)
        })

        it("Should change SubTask status successfully", () => {
            const task = Task.create("title", "description")
            const id = task.addSubTask("Subtask 1", "Description")
            task.changeSubTaskStatus(id, SubTaskStatus.COMPLETE)
            expect(task.getSubTaskStatus(id)).toBe(SubTaskStatus.COMPLETE)
        })

        it("Should throw SubTaskCannotModifyFinalizedOrCanceledError when trying to change status of completed SubTask", () => {
            const task = Task.create("title", "description")
            const id = task.addSubTask("Subtask 1", "Description")
            task.changeSubTaskStatus(id, SubTaskStatus.COMPLETE)
            expect(() => task.changeSubTaskStatus(id, SubTaskStatus.CANCEL)).toThrow(SubTaskCannotModifyFinalizedOrCanceledError)
        })
    })

    describe("Delete subtask", () => {
        it("Should delete SubTask successfully", () => {
            const title = "Learning DDD"
            const description = "Learn about aggregate and entities"
            const task = Task.create(title, description)
            const id = task.addSubTask("Subtask 1", "Description")
            task.deleteSubTask(id)
            expect(task.toPrimitives().subTasks).toHaveLength(0)
        })

        it("Should throw SubTaskNotFoundError when trying to delete non-existent SubTask", () => {
            const task = Task.create("title", "description")
            expect(() => task.deleteSubTask(999)).toThrow(SubTaskNotFoundError)
        })

        it("Should throw SubTaskCannotDeleteCompletedError when trying to delete completed SubTask", () => {
            const task = Task.create("title", "description")
            const id = task.addSubTask("Subtask 1", "Description")
            task.changeSubTaskStatus(id, SubTaskStatus.COMPLETE)
            expect(() => task.deleteSubTask(id)).toThrow(SubTaskCannotDeleteCompletedError)
        })
    })
})
