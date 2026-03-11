import { SubTaskStatus } from "@domain/entities/SubTask.js";
import { Task } from "@domain/entities/Task.js";
import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { PrismaClient } from "@prisma/client";

export class PrismaTaskRepositoryImpl implements TaskRepository {
    constructor(
        private readonly _client: PrismaClient
    ) {}

    async save(task: Task): Promise<void> {
        try{
            const {id ,title, description, subTasks, createdAt, updatedAt} = task.toPrimitives()
            const deleteTasksId = subTasks.map((item) => item.id).filter((i) => i !== 0)

            await this._client.$transaction(async (tx) => {
                await tx.task.upsert({
                    where: {id},
                    update: {title, description, createdAt, updatedAt},
                    create: {title, description, createdAt, updatedAt},
                })

                await tx.subtask.deleteMany({
                    where: {
                        taskId: id,
                        id: {notIn: deleteTasksId}
                    }
                })

                const subTaskUpsertPromise = subTasks.map((item) => {
                    return tx.subtask.upsert({
                        where: {id: item.id || 0},
                        create: {
                            taskId: id,
                            title: item.title,
                            description: item.description,
                            status: item.status
                        },
                        update: {
                            title: item.title,
                            description: item.description,
                            status: item.status
                        }
                    })
                })

                await Promise.all(subTaskUpsertPromise)
            })
        }catch(error){
            throw error
        }
    }

    async find(id: number): Promise<Task | null> {
        try {
            const result = await this._client.task.findUnique({where: {id}, include:{subtasks: true}})
            if(!result) return null

            const subtasks = result.subtasks.map((i) => ({
                id: i.id,
                title: i.title,
                description: i.description,
                status: i.status as SubTaskStatus
            }))

            const task = Task.fromPrimitives({
                id: result.id,
                title: result.title,
                description: result.description,
                subtasks,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            })

            return task
        }catch(error){
            throw error
        }
    }


    async findAll(): Promise<Task[]> {
        try {
            const tasks:Array<Task> = []
            const result = await this._client.task.findMany({include: {subtasks: true}})

            result.forEach((task) => {

                const subTasks = task.subtasks.map((subTask) =>({
                    id: subTask.id,
                    title: subTask.title,
                    description: subTask.description,
                    status: subTask.status as SubTaskStatus
                }))

                tasks.push(Task.fromPrimitives({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    subtasks: subTasks,
                    createdAt: task.createdAt,
                    updatedAt: task.updatedAt
                }))
            })

            return tasks
        }catch(error){
            throw error
        }
    }

    
    async delete(id: number): Promise<void> {
        try {
            await this._client.task.delete({where: {id}})
        }catch(error){
            throw error
        }
    }
}