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
import {UpdateSubTaskStatusUseCase} from "@application/useCases/UpdateSubTaskStatusUseCase.js";
import {
    UpdateSubTaskStatusRequest,
    UpdateSubTaskStatusSchema
} from "@presentation/schemas/UpdateSubTaskStatusSchema.js";
import {inject, injectable} from "tsyringe";
import {Body, Delete, Get, JsonController, Param, Post, Put, Res} from "routing-controllers";


@JsonController("/tasks")
@injectable()
export class TaskController {
    constructor(
        @inject(FindTaskUseCase)
        private readonly _findTasks: FindTaskUseCase,

        @inject(FindManyTaskUseCase)
        private readonly _findManyTasks: FindManyTaskUseCase,

        @inject(CreateTaskUseCase)
        private readonly _createTask: CreateTaskUseCase,

        @inject(UpdateTaskUseCase)
        private readonly _updateTask: UpdateTaskUseCase,

        @inject(CreateSubTaskUseCase)
        private readonly _createSubTask: CreateSubTaskUseCase,

        @inject(UpdateSubTaskUseCase)
        private readonly _updateSubTask: UpdateSubTaskUseCase,

        @inject(DeleteSubTaskUseCase)
        private readonly _deleteSubTask: DeleteSubTaskUseCase,

        @inject(UpdateSubTaskStatusUseCase)
        private readonly _updateSubTaskStatus: UpdateSubTaskStatusUseCase
    ) {}


    @Get("/:id")
    async find(@Param('id') id: number, @Res() res){
        const task = await this._findTasks.execute(Number(id));
        return res.status(200).json(task);
    }

    @Get("/")
    async findMany(@Res() res){
        const tasks = await this._findManyTasks.execute();
        return res.status(200).json(tasks);
    }

    @Post("/")
    async create (
        @Body() body: CreateTaskRequest,
        @Res() res
    ){
        const validation = CreateTaskSchema.parse(body);
        await this._createTask.execute(validation);
        return res.status(201).json({ message: "Task created successfully" });
    }

    @Put("/:id")
    async update(
        @Param('id') id: number,
        @Body() body: UpdateTaskRequest,
        @Res() res
    ){
        const validation = UpdateTaskSchema.parse(body);
        await this._updateTask.execute({id: Number(id), ...validation});
        return res.status(200).json({ message: "Task updated successfully" });
    }

    @Post("/:id/subtask")
    async createSubTask(
        @Param('id') id: number,
        @Body() body: CreateSubTaskRequest,
        @Res() res
    ){
        const {title, description} = CreateSubTaskSchema.parse(body);
        await this._createSubTask.execute({taskId: Number(id), title, description})
        return res.status(200).json({message: "subtask created"})
    }

    @Put("/:taskId/subtask/:subTaskId")
    async updateSubTask(
        @Param("taskId") taskId: number,
        @Param("subTaskId") subTaskId: number,
        @Body() body: UpdateSubTaskRequest,
        @Res() res
    ){
        const {title, description} = UpdateSubTaskSchema.parse(body)
        await this._updateSubTask.execute({
            taskId: Number(taskId),
            subTaskId: Number(subTaskId),
            title,
            description
        })
        return res.status(200).json({message: "subtask updated"})
    }

    @Delete("/:taskId/subtask/:subTaskId")
    async deleteSubTask(
        @Param("taskId") taskId: number,
        @Param("subTaskId") subTaskId: number,
        @Res() res
    ) {
        await this._deleteSubTask.execute({
            taskId: Number(taskId),
            subTaskId: Number(subTaskId)
        })
        return res.status(200).json({message: "subtask deleted"})
    }

    @Put("/:taskId/subtask/:subTaskId/status")
    async updateSubTaskStatus(
        @Param("taskId") taskId: number,
        @Param("subTaskId") subTaskId: number,
        @Body() body: UpdateSubTaskStatusRequest,
        @Res() res
    ){
        const validation = UpdateSubTaskStatusSchema.parse(body)
        await this._updateSubTaskStatus.execute({
            taskId: Number(taskId),
            subTaskId: Number(subTaskId),
            status: validation.status
        })
        return res.status(200).json({message: "subtask status updated"})
    }
}
