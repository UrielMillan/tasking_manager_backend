import { Router } from "express";
import { TaskController } from "@presentation/controllers/TaskController.js";
import { PrismaTaskRepositoryImpl } from "@infrastructure/persistence/PrismaTaskRepositoryImpl.js";
import { prisma } from "@infrastructure/datasources/PrismaDatasource.js";
import { FindManyTaskUseCase } from "@application/useCases/FindManyTaskUseCase.js";
import { FindTaskUseCase } from "@application/useCases/FindTaskUseCase.js";
import { CreateTaskUseCase } from "@application/useCases/CreateTaskUseCase.js";
import { UpdateTaskUseCase } from "@application/useCases/UpdateTaskUseCase.js";
import { CreateSubTaskUseCase } from "@application/useCases/CreateSubTaskUseCase.js";
import { UpdateSubTaskUseCase } from "@application/useCases/UpdateSubTaskUseCase.js";
import { DeleteSubTaskUseCase } from "@application/useCases/DeleteSubTaskUseCase.js";

const router = Router();
const repository = new PrismaTaskRepositoryImpl(prisma);

const controller = new TaskController(
    new FindTaskUseCase(repository),
    new FindManyTaskUseCase(repository),
    new CreateTaskUseCase(repository),
    new UpdateTaskUseCase(repository),
    new CreateSubTaskUseCase(repository),
    new UpdateSubTaskUseCase(repository),
    new DeleteSubTaskUseCase(repository)
);

router.get("/", controller.findMany);
router.post("/", controller.create);
router.get("/:id", controller.find);
router.put("/:id", controller.update);
router.post("/:id/subtask", controller.createSubTask)
router.put("/:taskId/subtask/:subTaskId", controller.updateSubTask)
router.delete("/:taskId/subtask/:subTaskId", controller.deleteSubTask)

export {router}