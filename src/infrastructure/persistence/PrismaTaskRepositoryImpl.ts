import { SubTaskStatus } from "@domain/entities/SubTask.js";
import { Task } from "@domain/entities/Task.js";
import { TaskRepository } from "@domain/repositories/TaskRepository.js";
import { PrismaClient } from "@prisma/client";

export class PrismaTaskRepositoryImpl implements TaskRepository {
    constructor(
        private readonly _client: PrismaClient
    ) {}

    async create(task: Task): Promise<void> {
        try{
            const {title, description} = task.toPrimitives()
            await this._client.task.create({
                data: {title, description}
            })
        }catch(error){
            throw error
        }
    }

    async findById(id: number): Promise<Task | null> {
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

    async update(task: Task): Promise<void> {
        try {
            const {id, title, description, updateAt} = task.toPrimitives()
            await this._client.task.update({
                where: {id},
                data: {title, description, updatedAt: updateAt}
            })
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

    async addSubTask(task: Task): Promise<void> {
        try{
           const subtask = task.getSubTask(0)
           const {title, description} = subtask.toPrimitives()
           await this._client.subtask.create({data: {
                title,
                description,
                taskId: task.id
           }})
        }catch(error){
            throw error
        }
    }

    async updateSubTask(task: Task, subTaskId: number): Promise<void> {
        try {
            const subtask = task.getSubTask(subTaskId)
            const {title, description} = subtask.toPrimitives()
            await this._client.subtask.update({
                where: {id: subTaskId},
                data: {title, description}
            })
        }catch(error){
            throw error
        }
    }

}