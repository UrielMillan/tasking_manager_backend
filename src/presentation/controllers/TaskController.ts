import { CreateTaskUseCase } from "@application/CreateTaskUseCase.js";
import { FindManyTaskUseCase } from "@application/FindManyTaskUseCase.js";
import { FindTaskUseCase } from "@application/FindTaskUseCase.js";
import { UpdateTaskUseCase } from "@application/UpdateTaskUseCase.js";
import { CreateTaskRequest, CreateTaskSchema } from "@presentation/schemas/CreateTaskSchema.js";
import { UpdateTaskRequest, UpdateTaskSchema } from "@presentation/schemas/UpdateTaskSchema.js";
import type { Request, Response, NextFunction } from "express";


export class TaskController {
    constructor(
        private readonly _findTasks: FindTaskUseCase,
        private readonly _findManyTasks: FindManyTaskUseCase,
        private readonly _createTask: CreateTaskUseCase,
        private readonly _updateTask: UpdateTaskUseCase
    ){}

    async find(req: Request<{id: number}>, res: Response, next: NextFunction) {
        try{
            const { id } = req.params;
            const task = await this._findTasks.execute(id);
            return res.status(200).json(task);
        }catch(err){
            next(err);
        }
    }

    async findMany(req: Request, res: Response, next: NextFunction) {
        try{
            const tasks = await this._findManyTasks.execute();
            return res.status(200).json(tasks);
        }catch(err){
            next(err);
        }   
    }

    async create(req: Request<any, any, CreateTaskRequest>, res: Response, next: NextFunction){
        try {
            const body = req.body;
            const validation = CreateTaskSchema.parse(body);
            await this._createTask.execute(validation);
            return res.status(201).json({ message: "Task created successfully" });
        }catch(err){
            next(err);
        }
    }

    async update(req: Request<{id: number}, any, UpdateTaskRequest>, res: Response, next: NextFunction){
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

}