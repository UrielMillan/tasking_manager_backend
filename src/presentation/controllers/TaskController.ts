import { CreateSubTaskUseCase } from "@application/useCases/CreateSubTaskUseCase.js";
import { CreateTaskUseCase } from "@application/useCases/CreateTaskUseCase.js";
import { DeleteSubTaskUseCase } from "@application/useCases/DeleteSubTaskUseCase.js";
import { FindManyTaskUseCase } from "@application/useCases/FindManyTaskUseCase.js";
import { FindTaskUseCase } from "@application/useCases/FindTaskUseCase.js";
import { UpdateSubTaskUseCase } from "@application/useCases/UpdateSubTaskUseCase.js";
import { UpdateTaskUseCase } from "@application/useCases/UpdateTaskUseCase.js";
import { CreateSubTaskRequest, CreateSubTaskSchema } from "@presentation/schemas/CreateSubTaskSchema.js";
import { CreateTaskRequest, CreateTaskSchema } from "@presentation/schemas/CreateTaskSchema.js";
import { UpdateSubTaskRequest, UpdateSubTaskSchema } from "@presentation/schemas/UpdateSubTaskSchema.js";
import { UpdateTaskRequest, UpdateTaskSchema } from "@presentation/schemas/UpdateTaskSchema.js";
import type { Request, Response, NextFunction } from "express";


export class TaskController {
    constructor(
        private readonly _findTasks: FindTaskUseCase,
        private readonly _findManyTasks: FindManyTaskUseCase,
        private readonly _createTask: CreateTaskUseCase,
        private readonly _updateTask: UpdateTaskUseCase,
        private readonly _createSubTask: CreateSubTaskUseCase,
        private readonly _updateSubTask: UpdateSubTaskUseCase,
        private readonly _deleteSubTask: DeleteSubTaskUseCase,
    ){}

    find = async (req: Request<{id: number}>, res: Response, next: NextFunction) => {
        try{
            const { id } = req.params;
            const task = await this._findTasks.execute(Number(id));
            return res.status(200).json(task);
        }catch(err){
            next(err);
        }
    }

    findMany = async(req: Request, res: Response, next: NextFunction) =>{
        try{
            const tasks = await this._findManyTasks.execute();
            console.log(tasks);
            return res.status(200).json(tasks);
        }catch(err){
            next(err);
        }   
    }

    create = async(req: Request<any, any, CreateTaskRequest>, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            const validation = CreateTaskSchema.parse(body);
            await this._createTask.execute(validation);
            return res.status(201).json({ message: "Task created successfully" });
        }catch(err){
            next(err);
        }
    }

    update = async (req: Request<{id: number}, any, UpdateTaskRequest>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const validation = UpdateTaskSchema.parse(body);
            await this._updateTask.execute({id: Number(id), ...validation});
            return res.status(200).json({ message: "Task updated successfully" });
        }catch(err){
            next(err);
        }
    }

    createSubTask = async(req: Request<{id: number}, any, CreateSubTaskRequest>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const {title, description} = CreateSubTaskSchema.parse(req.body);
            await this._createSubTask.execute({taskId: Number(id), title, description})
            return res.status(200).json({message: "subtask created"})
        }catch(err){
            next(err)
        }
    }

    updateSubTask = async (req: Request<{taskId: number, subTaskId: number}, any, UpdateSubTaskRequest>, res: Response, next: NextFunction) => {
        try {
            const {taskId, subTaskId} = req.params
            const {title, description} = UpdateSubTaskSchema.parse(req.body)
            await this._updateSubTask.execute({
                taskId: Number(taskId),
                subTaskId: Number(subTaskId),
                title,
                description
            })
            return res.status(200).json({message: "subtask updated"})
        }catch(err) {
            next(err)
        }
    }

    deleteSubTask = async(req: Request<{taskId: number, subTaskId: number}>,  res: Response, next: NextFunction) => {
        const {taskId, subTaskId} = req.params
        await this._deleteSubTask.execute({ 
            taskId: Number(taskId),
            subTaskId: Number(subTaskId)
        })
        return res.status(200).json({message: "subtask deleted"})
    }
}